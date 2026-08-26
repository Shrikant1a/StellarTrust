'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProjectDetails.module.css';
import { 
  CheckCircle, 
  CircleDashed,
  ArrowRight,
  ShieldAlert,
  Wallet,
  X
} from 'lucide-react';
import globalStyles from '../../Dashboard.module.css';

interface PageProps {
  params: { id: string };
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const [projectData, setProjectData] = useState({
    title: 'Website Redesign',
    client: 'Alice',
    freelancer: 'James Carter',
    budget: '4.5',
    currency: 'XLM',
    createdAt: 'Mar 15, 2026',
    isCustom: false
  });

  const [milestone1Status, setMilestone1Status] = useState<'active' | 'processing' | 'completed'>('completed');
  const [milestone2Status, setMilestone2Status] = useState<'pending' | 'active' | 'completed'>('completed');
  const [milestone3Status, setMilestone3Status] = useState<'pending' | 'active' | 'processing' | 'completed'>('active');
  const [milestone4Status, setMilestone4Status] = useState<'pending' | 'active' | 'completed'>('pending');
  const [projectStatus, setProjectStatus] = useState<'Active' | 'Disputed' | 'Completed'>('Active');
  
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [txDetails, setTxDetails] = useState<any>(null);

  const handleOpenTxDetails = (milestoneTitle: string, amount: string) => {
    setTxDetails({
      hash: 'eb3a1f827d9c...8f1a', // Mock mainnet hash
      amount: amount,
      currency: projectData.currency,
      timestamp: new Date().toLocaleString(),
      to: projectData.freelancer,
      milestone: milestoneTitle,
      fee: '0.00001 XLM',
      network: 'Stellar Mainnet'
    });
    setTxModalOpen(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem('trustlance_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const customProj = parsed.find((p: any) => p.linkId === params.id || p.id === params.id);
        if (customProj) {
          setProjectData({
            title: customProj.name,
            client: customProj.client,
            freelancer: customProj.freelancer,
            budget: customProj.budget || '500',
            currency: customProj.currency || 'XLM',
            createdAt: customProj.createdAt || 'Mar 30, 2026',
            isCustom: true
          });
          
          if (customProj.isCustom) {
            setMilestone1Status('active');
            setMilestone2Status('pending');
            setMilestone3Status('pending');
            setMilestone4Status('pending');
          }
        }
      } catch (e) {}
    }
  }, [params.id]);

  const completedCount = 
    (milestone1Status === 'completed' ? 1 : 0) + 
    (milestone2Status === 'completed' ? 1 : 0) + 
    (milestone3Status === 'completed' ? 1 : 0) + 
    (milestone4Status === 'completed' ? 1 : 0);

  const logTransaction = (amount: string, type: 'Send' | 'Release', receiver: string) => {
    const balance = localStorage.getItem('trustlance_mvp_balance') || '1000.00';
    const newBalance = (parseFloat(balance) - parseFloat(amount)).toFixed(2);
    localStorage.setItem('trustlance_mvp_balance', newBalance);

    const txs = JSON.parse(localStorage.getItem('trustlance_mvp_transactions') || '[]');
    const newTx = {
      id: `tx-${Date.now()}`,
      created_at: new Date().toISOString(),
      type: type,
      amount: amount,
      asset: projectData.currency,
      to: receiver,
      project: projectData.title,
      status: 'Success'
    };
    localStorage.setItem('trustlance_mvp_transactions', JSON.stringify([newTx, ...txs]));
    
    // Also notify the user
    console.log(`Transaction logged: ${amount} ${projectData.currency} sent to ${receiver}`);
  };

  const handleApproveM1 = () => {
    setMilestone1Status('processing');
    const amount = (Number(projectData.budget) * 0.2).toFixed(1);
    
    setTimeout(() => {
      setMilestone1Status('completed');
      setMilestone2Status('active');
      logTransaction(amount, 'Release', projectData.freelancer);
    }, 1500);
  };

  const handleApproveM2 = () => {
    setMilestone2Status('completed');
    setMilestone3Status('active');
    const amount = (Number(projectData.budget) * 0.3).toFixed(1);
    logTransaction(amount, 'Release', projectData.freelancer);
  };

  const handleApproveM3 = () => {
    setMilestone3Status('processing');
    const amount = (Number(projectData.budget) * 0.3).toFixed(1);
    
    setTimeout(() => {
      setMilestone3Status('completed');
      setMilestone4Status('active');
      logTransaction(amount, 'Release', projectData.freelancer);
    }, 1500);
  };

  const handleDispute = () => setProjectStatus('Disputed');
  
  const handleCompleteProject = () => {
    setMilestone1Status('completed');
    setMilestone2Status('completed');
    setMilestone3Status('completed');
    setMilestone4Status('completed');
    setProjectStatus('Completed');
  };

  return (
    <>
      <div className={globalStyles.pageHeader}>
        <div>
          <h1 className={globalStyles.sectionTitle}>Project Details</h1>
          <p className={globalStyles.pageSubtitle}>
            <Link href="/projects" style={{ color: '#a0a0b2', textDecoration: 'none' }}>Projects</Link> / {params.id}
          </p>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.headerCard}>
          <div className={styles.leftSection}>
            <div className={styles.projectTitleRow}>
              <h1 className={styles.title}>{projectData.title}</h1>
              {projectStatus === 'Active' && <span className={styles.badgeActive}>Active</span>}
              {projectStatus === 'Disputed' && <span className={globalStyles.badgeDispute}>Disputed</span>}
              {projectStatus === 'Completed' && <span className={styles.badgeActive} style={{ backgroundColor: '#1b4733', color: '#4ade80' }}>Completed</span>}
            </div>
            <div className={styles.usersInfo}>
              <span>Client: <strong>{projectData.client}</strong></span>
              <ArrowRight size={14} color="#6c6c80" />
              <span>Freelancer: <strong>{projectData.freelancer}</strong></span>
            </div>
            <p className={globalStyles.pageSubtitle} style={{ marginTop: '12px', marginBottom: 0 }}>
              Created on: {projectData.createdAt} • Escrow ID: 0x8a92...f21b
            </p>
          </div>
          <div className={styles.financeSection}>
            <p className={styles.budgetLabel}>Total Value Locked</p>
            <h2 className={styles.budgetAmount}>
              <Wallet size={24} /> {projectData.budget} {projectData.currency}
            </h2>
            <p className={styles.budgetLabel} style={{ marginTop: '4px' }}>Secure Escrow</p>
          </div>
        </div>

        <div className={styles.milestonesCard}>
          <h3 className={styles.sectionHeading}>
            Milestones Breakdown ({completedCount}/4 Completed)
          </h3>
          
          <div className={styles.milestoneList}>
            {/* Milestone 1 */}
            <div className={`${styles.milestoneItem} ${styles[milestone1Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>1. Wireframes & Design System</h4>
                <p className={styles.mDesc}>Figma files, color palette, and initial UI/UX flows.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>{(Number(projectData.budget) * 0.2).toFixed(1)} {projectData.currency}</span>
                {milestone1Status === 'completed' ? (
                  <>
                    <span onClick={() => handleOpenTxDetails('1. Wireframes & Design System', (Number(projectData.budget) * 0.2).toFixed(1))} className={`${styles.badgeActive} ${styles.clickableBadge}`} style={{ border: '1px solid #4ade80', background: 'none' }}>Paid</span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : milestone1Status === 'active' ? (
                  <button onClick={handleApproveM1} className={styles.primaryButton}>Approve & Release</button>
                ) : <CircleDashed size={24} color="#6c6c80" />}
              </div>
            </div>

            {/* Milestone 2 */}
            <div className={`${styles.milestoneItem} ${styles[milestone2Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>2. Frontend Development</h4>
                <p className={styles.mDesc}>Implement pixel-perfect designs in React.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>{(Number(projectData.budget) * 0.3).toFixed(1)} {projectData.currency}</span>
                {milestone2Status === 'completed' ? (
                  <>
                    <span onClick={() => handleOpenTxDetails('2. Frontend Development', (Number(projectData.budget) * 0.3).toFixed(1))} className={`${styles.badgeActive} ${styles.clickableBadge}`} style={{ border: '1px solid #4ade80', background: 'none' }}>Paid</span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : milestone2Status === 'active' ? (
                  <button onClick={handleApproveM2} className={styles.primaryButton}>Approve & Release</button>
                ) : <CircleDashed size={24} color="#6c6c80" />}
              </div>
            </div>

            {/* Milestone 3 */}
            <div className={`${styles.milestoneItem} ${styles[milestone3Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>3. Smart Contract Integration</h4>
                <p className={styles.mDesc}>Soroban smart contract execution and wallet hooks.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>{(Number(projectData.budget) * 0.3).toFixed(1)} {projectData.currency}</span>
                {milestone3Status === 'completed' ? (
                  <>
                    <span onClick={() => handleOpenTxDetails('3. Smart Contract Integration', (Number(projectData.budget) * 0.3).toFixed(1))} className={`${styles.badgeActive} ${styles.clickableBadge}`} style={{ border: '1px solid #4ade80', background: 'none' }}>Paid</span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : milestone3Status === 'active' ? (
                  <button onClick={handleApproveM3} className={styles.primaryButton}>Approve & Release</button>
                ) : <CircleDashed size={24} color="#6c6c80" />}
              </div>
            </div>

            {/* Milestone 4 */}
            <div className={`${styles.milestoneItem} ${styles[milestone4Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>4. Final QA & Launch</h4>
                <p className={styles.mDesc}>Performance optimization and deployment.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>{(Number(projectData.budget) * 0.2).toFixed(1)} {projectData.currency}</span>
                {milestone4Status === 'completed' ? (
                  <>
                    <span onClick={() => handleOpenTxDetails('4. Final QA & Launch', (Number(projectData.budget) * 0.2).toFixed(1))} className={`${styles.badgeActive} ${styles.clickableBadge}`} style={{ border: '1px solid #4ade80', background: 'none' }}>Paid</span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : milestone4Status === 'active' ? (
                  <button onClick={() => setMilestone4Status('completed')} className={styles.primaryButton}>Approve & Release</button>
                ) : <CircleDashed size={24} color="#6c6c80" />}
              </div>
            </div>
          </div>

          <div className={styles.actionRow}>
            {projectStatus !== 'Disputed' && (
              <button className={styles.dangerButton} onClick={handleDispute}>
                <ShieldAlert size={18} /> Raise Dispute
              </button>
            )}
            {projectStatus !== 'Completed' && (
               <button className={styles.successButton} onClick={handleCompleteProject}>
                 <CheckCircle size={18} /> Mark Complete
               </button>
            )}
          </div>
        </div>
      </div>

      {txModalOpen && txDetails && (
        <div className={styles.modalOverlay} onClick={() => setTxModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Transaction Details</h3>
              <button className={styles.closeButton} onClick={() => setTxModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Milestone</span>
              <span className={styles.txDetailValue}>{txDetails.milestone}</span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Transaction Hash</span>
              <span className={styles.txDetailValue}>{txDetails.hash}</span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Network</span>
              <span className={styles.txDetailValue}>{txDetails.network}</span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Amount Released</span>
              <span className={styles.txDetailValueSuccess}>
                {txDetails.amount} {txDetails.currency}
              </span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Network Fee</span>
              <span className={styles.txDetailValue}>{txDetails.fee}</span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Timestamp</span>
              <span className={styles.txDetailValue}>{txDetails.timestamp}</span>
            </div>
            <div className={styles.txDetailRow}>
              <span className={styles.txDetailLabel}>Recipient</span>
              <span className={styles.txDetailValue}>{txDetails.to}</span>
            </div>

            <a href="https://stellar.expert/explorer/public" target="_blank" rel="noopener noreferrer" className={styles.explorerLink}>
              View on Stellar Expert
            </a>
          </div>
        </div>
      )}
    </>
  );
}
