'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProjectDetails.module.css';
import { 
  CheckCircle, 
  CircleDashed,
  ArrowRight,
  ShieldAlert,
  Wallet
} from 'lucide-react';
import globalStyles from '../../Dashboard.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailsPage({ params }: PageProps) {
  // Required in Next.js 15+ when using dynamic route segments
  const resolvedParams = use(params);

  // States to make the buttons workable
  const [milestone3Status, setMilestone3Status] = useState<'active' | 'processing' | 'completed'>('active');
  const [milestone4Status, setMilestone4Status] = useState<'pending' | 'active' | 'completed'>('pending');
  const [projectStatus, setProjectStatus] = useState<'Active' | 'Disputed' | 'Completed'>('Active');
  
  const [projectData, setProjectData] = useState({
    title: 'Website Redesign',
    client: 'Alice',
    freelancer: 'James Carter'
  });

  useEffect(() => {
    const saved = localStorage.getItem('trustlance_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const customProj = parsed.find((p: any) => p.linkId === resolvedParams.id || p.id === resolvedParams.id);
        if (customProj) {
          setProjectData({
            title: customProj.name,
            client: customProj.client,
            freelancer: customProj.freelancer
          });
        }
      } catch (e) {}
    }
  }, [resolvedParams.id]);

  const completedCount = 2 + (milestone3Status === 'completed' ? 1 : 0) + (milestone4Status === 'completed' ? 1 : 0);

  const handleApprove = () => {
    setMilestone3Status('processing');
    setTimeout(() => {
      setMilestone3Status('completed');
      if (milestone4Status === 'pending') {
        setMilestone4Status('active');
      }
    }, 1500);
  };

  const handleDispute = () => {
    setProjectStatus('Disputed');
  };

  const handleCompleteProject = () => {
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
            <Link href="/projects" style={{ color: '#a0a0b2', textDecoration: 'none' }}>Projects</Link> / {resolvedParams.id}
          </p>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        {/* Header Summary Card */}
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
              Created on: Mar 15, 2026 • Escrow ID: 0x8a92...f21b
            </p>
          </div>
          <div className={styles.financeSection}>
            <p className={styles.budgetLabel}>Total Value Locked</p>
            <h2 className={styles.budgetAmount}>
              <Wallet size={24} /> 4.5 ETH
            </h2>
            <p className={styles.budgetLabel} style={{ marginTop: '4px' }}>≈ $12,500 USD</p>
          </div>
        </div>

        {/* Milestones Area */}
        <div className={styles.milestonesCard}>
          <h3 className={styles.sectionHeading}>
            Milestones Breakdown ({completedCount}/4 Completed)
          </h3>
          
          <div className={styles.milestoneList}>
            {/* Milestone 1: Done */}
            <div className={`${styles.milestoneItem} ${styles.completed}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>1. Wireframes & Design System</h4>
                <p className={styles.mDesc}>Figma files, color palette, and initial UI/UX flows.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>1.0 ETH</span>
                <span className={styles.badgeActive} style={{ backgroundColor: 'transparent', border: '1px solid #4ade80' }}>
                   Paid
                </span>
                <CheckCircle color="#4ade80" size={24} />
              </div>
            </div>

            {/* Milestone 2: Done */}
            <div className={`${styles.milestoneItem} ${styles.completed}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>2. Frontend Development (React)</h4>
                <p className={styles.mDesc}>Implement pixel-perfect designs in React with Next.js.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>1.5 ETH</span>
                <span className={styles.badgeActive} style={{ backgroundColor: 'transparent', border: '1px solid #4ade80' }}>
                   Paid
                </span>
                <CheckCircle color="#4ade80" size={24} />
              </div>
            </div>

            {/* Milestone 3: Dynamic */}
            <div className={`${styles.milestoneItem} ${styles[milestone3Status === 'processing' ? 'active' : milestone3Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>3. Smart Contract Integration</h4>
                <p className={styles.mDesc}>Web3 wallet hookups and smart contract execution.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>1.0 ETH</span>
                {milestone3Status === 'completed' ? (
                  <>
                    <span className={styles.badgeActive} style={{ backgroundColor: 'transparent', border: '1px solid #4ade80' }}>
                       Paid
                    </span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleApprove}
                      className={styles.primaryButton}
                      disabled={milestone3Status === 'processing'}
                    >
                       {milestone3Status === 'processing' ? 'Processing Transaction...' : 'Approve & Release'}
                    </button>
                    <CircleDashed color="#6366f1" size={24} className={milestone3Status === 'processing' ? 'animate-spin' : ''} style={milestone3Status === 'processing' ? { animationDuration: '1s' } : undefined} />
                  </>
                )}
              </div>
            </div>

            {/* Milestone 4: Dynamic */}
            <div className={`${styles.milestoneItem} ${styles[milestone4Status]}`}>
              <div className={styles.mLeft}>
                <h4 className={styles.mTitle}>4. Final QA & Launch</h4>
                <p className={styles.mDesc}>Performance optimization, final bug fixes, deployment.</p>
              </div>
              <div className={styles.mRight}>
                <span className={styles.mAmount}>1.0 ETH</span>
                {milestone4Status === 'completed' ? (
                  <>
                    <span className={styles.badgeActive} style={{ backgroundColor: 'transparent', border: '1px solid #4ade80' }}>
                       Paid
                    </span>
                    <CheckCircle color="#4ade80" size={24} />
                  </>
                ) : milestone4Status === 'active' ? (
                  <>
                    <button 
                      onClick={() => setMilestone4Status('completed')}
                      className={styles.primaryButton}
                    >
                       Approve & Release
                    </button>
                    <CircleDashed color="#6366f1" size={24} />
                  </>
                ) : (
                  <CircleDashed color="#6c6c80" size={24} />
                )}
              </div>
            </div>
          </div>

          <div className={styles.actionRow}>
            {projectStatus !== 'Disputed' && (
              <button className={styles.dangerButton} onClick={handleDispute}>
                <ShieldAlert size={18} />
                Raise Dispute
              </button>
            )}
            {projectStatus === 'Disputed' && (
              <Link href="/disputes/1" style={{ textDecoration: 'none' }}>
                <button className={styles.dangerButton} style={{ backgroundColor: '#ef4444', color: '#fff' }}>
                  <ShieldAlert size={18} />
                  View Dispute Case
                </button>
              </Link>
            )}
            {projectStatus !== 'Completed' && (
               <button className={styles.successButton} onClick={handleCompleteProject}>
                 <CheckCircle size={18} />
                 Mark Entire Project Complete
               </button>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
