'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../Dashboard.module.css';
import { ShieldAlert, CheckCircle2, MoreHorizontal, ArrowRight } from 'lucide-react';

export default function DisputesPage() {
  const disputes = [
    { id: 1, project: 'SEO Optimization', parties: 'Emma → John Doe', status: 'Dispute', statusClass: styles.badgeDispute, type: 'Payment Delay' },
    { id: 2, project: 'Website Redesign', parties: 'Alice → James Carter', status: 'In Review', statusClass: styles.badgeInProgress, type: 'Scope Creep' },
    { id: 3, project: 'Blockchain Integration', parties: 'Michael → Alex Smith', status: 'Resolved', statusClass: styles.badgeActive, type: 'Technical Bug' },
  ];

  return (
    <div className="animate-fade-in">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Arbitration Center</h1>
          <p className={styles.pageSubtitle}>Manage and resolve project disputes through decentralized governance.</p>
        </div>
        <button className={styles.primaryButton}>Open New Case</button>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Project</div>
          <div>Involved Parties</div>
          <div>Case Type</div>
          <div>Status</div>
          <div style={{ textAlign: 'right' }}>Action</div>
        </div>

        {disputes.map((caseItem, index) => (
          <div key={index} style={{ 
            display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr', gap: '16px', 
            padding: '24px 0', borderBottom: index === disputes.length - 1 ? 'none' : '1px solid var(--surface-border)',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{caseItem.project}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{caseItem.parties}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{caseItem.type}</div>
            <div>
              <span className={`${styles.badge} ${caseItem.statusClass}`}>{caseItem.status}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Link href={`/disputes/${caseItem.id}`} className={styles.detailsButton} style={{ textDecoration: 'none', display: 'inline-flex', width: 'auto' }}>
                View Case
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
         <div className={styles.metricCard} style={{ padding: '20px', gap: '16px' }}>
            <ShieldAlert size={20} color="var(--accent-danger)" />
            <div style={{ fontSize: '14px' }}>
               <strong>Active Cases: 2</strong>
               <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>Awaiting evidence from parties.</p>
            </div>
         </div>
         <div className={styles.metricCard} style={{ padding: '20px', gap: '16px' }}>
            <CheckCircle2 size={20} color="var(--accent-success)" />
            <div style={{ fontSize: '14px' }}>
               <strong>Resolved: 14</strong>
               <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>Successfully arbitrated this month.</p>
            </div>
         </div>
         <div className={styles.metricCard} style={{ padding: '20px', gap: '16px' }}>
            <MoreHorizontal size={20} color="var(--primary)" />
            <div style={{ fontSize: '14px' }}>
               <strong>Avg. Resolution: 4.2d</strong>
               <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>Improving speed by 12% MoM.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
