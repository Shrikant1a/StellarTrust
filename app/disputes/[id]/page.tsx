'use client';

import React from 'react';
import Link from 'next/link';
import styles from './DisputeDetails.module.css';
import { 
  AlertTriangle, 
  MessageCircle, 
  FileText, 
  Gavel, 
  ArrowRight,
  Download,
  Wallet
} from 'lucide-react';
import globalStyles from '../../Dashboard.module.css';

interface PageProps {
  params: { id: string };
}

export default function DisputeDetailsPage({ params }: PageProps) {

  
  return (
    <>
      <div className={globalStyles.pageHeader}>
        <div>
          <h1 className={globalStyles.sectionTitle}>Dispute Details</h1>
          <p className={globalStyles.pageSubtitle}>
            <Link href="/disputes" style={{ color: '#a0a0b2', textDecoration: 'none' }}>Disputes</Link> / #{params.id}
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Header Summary Card */}
        <div className={styles.headerCard}>
          <div>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>SEO Optimization</h1>
              <span className={styles.badgeDispute}>Dispute Under Review</span>
            </div>
            <div className={styles.usersInfo}>
              <span>Client: <strong>Emma</strong></span>
              <ArrowRight size={14} color="#6c6c80" />
              <span>Freelancer: <strong>John Doe</strong></span>
            </div>
            <p className={globalStyles.pageSubtitle} style={{ marginTop: '12px', marginBottom: 0 }}>
              Raised on: Mar 18, 2026 • Contract: 0x44f2...a19c
            </p>
          </div>
          <div className={styles.amountBox}>
            <p className={styles.amountLabel}>Disputed Amount</p>
            <h2 className={styles.amountValue}>
              <Wallet size={24} /> 1.2 ETH
            </h2>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Left Column: Discussion & Evidence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <MessageCircle size={20} color="#818cf8" />
                Discussion Thread
              </h2>
              
              <div className={styles.chatBox}>
                <div className={`${styles.chatMessage} ${styles.sender}`}>
                  <div className={styles.chatBubble}>
                    The freelancer did not deliver the final list of backlinks as clearly stated in Milestone 3. They went unresponsive for 5 days.
                  </div>
                  <div className={styles.chatMeta}>
                    <span>Client (Emma)</span>
                    <span>Mar 18, 2:30 PM</span>
                  </div>
                </div>

                <div className={`${styles.chatMessage} ${styles.receiver}`}>
                  <div className={styles.chatBubble}>
                    I delivered the initial list, but the client arbitrarily changed the requirements and demanded another 50 backlinks free of charge! This is scope creep.
                  </div>
                  <div className={styles.chatMeta}>
                    <span>Mar 19, 9:15 AM</span>
                    <span>Freelancer (John Doe)</span>
                  </div>
                </div>

                <div className={`${styles.chatMessage} ${styles.sender}`}>
                  <div className={styles.chatBubble}>
                    The original contract specified "quality backlinks," the ones delivered had DA &lt; 10. I reject this submission.
                  </div>
                  <div className={styles.chatMeta}>
                    <span>Client (Emma)</span>
                    <span>Mar 19, 10:45 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Sub-panel */}
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <FileText size={20} color="#facc15" />
                Submitted Evidence
              </h2>
              <div className={styles.documentList}>
                <div className={styles.documentItem}>
                  <FileText size={16} />
                  <span style={{ flex: 1 }}>Original_Scope_Agereement.pdf</span>
                  <Download size={16} />
                </div>
                <div className={styles.documentItem}>
                  <FileText size={16} />
                  <span style={{ flex: 1 }}>Email_Correspondence_Log.zip</span>
                  <Download size={16} />
                </div>
                <div className={styles.documentItem}>
                  <FileText size={16} />
                  <span style={{ flex: 1 }}>Backlink_Report_V1.xlsx</span>
                  <Download size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Arbiter Actions */}
          <div className={styles.panel} style={{ height: 'fit-content' }}>
            <h2 className={styles.panelTitle}>
              <Gavel size={20} color="#ef4444" />
              Resolution Actions
            </h2>
            
            <p style={{ fontSize: '14px', color: '#a0a0b2', lineHeight: 1.5, marginBottom: '24px' }}>
              As the Decentralized Arbitrator, you must vote on the final distribution of the escrowed funds associated with this active milestone.
            </p>

            <div className={styles.actionPanel}>
              <button className={`${styles.actionButton} ${styles.actionClient}`}>
                Refund Client (100%)
              </button>
              <button className={`${styles.actionButton} ${styles.actionFreelancer}`}>
                Release to Freelancer (100%)
              </button>
              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', gap: '8px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#2d2d3d' }}></div>
                <span style={{ fontSize: '12px', color: '#6c6c80', fontWeight: 'bold' }}>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#2d2d3d' }}></div>
              </div>
              <button className={`${styles.actionButton} ${styles.actionSplit}`}>
                Propose 50/50 Split
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
