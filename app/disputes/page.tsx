'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../Dashboard.module.css';

export default function DisputesPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Disputes</h1>
          <p className={styles.pageSubtitle}>Home / Disputes</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>Project Name</div>
          <div>Client → Freelancer</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Row 1 */}
        <div className={styles.tableRow}>
          <div className={styles.cellText}>SEO Optimization</div>
          <div className={styles.cellSubtext}>Emma <span className={styles.arrow}>→</span> John Doe</div>
          <div><span className={`${styles.badge} ${styles.badgeDispute}`}>Dispute</span></div>
          <div><Link href="/disputes/1" className={styles.detailsButton} style={{ textDecoration: 'none' }}>View ›</Link></div>
        </div>

        {/* Row 2 */}
        <div className={styles.tableRow}>
          <div className={styles.cellText}>Website Redesign</div>
          <div className={styles.cellSubtext}>Alice <span className={styles.arrow}>→</span> James Carter</div>
          <div><span className={`${styles.badge} ${styles.badgeDispute}`}>Dispute</span></div>
          <div><Link href="/disputes/2" className={styles.detailsButton} style={{ textDecoration: 'none' }}>View ›</Link></div>
        </div>

        {/* Row 3 */}
        <div className={styles.tableRow}>
          <div className={styles.cellText}>Blockchain Integration</div>
          <div className={styles.cellSubtext}>Michael <span className={styles.arrow}>→</span> Alex Smith</div>
          <div><span className={`${styles.badge} ${styles.badgeResolved}`}>Resolved</span></div>
          <div><Link href="/disputes/3" className={styles.detailsButton} style={{ textDecoration: 'none' }}>View ›</Link></div>
        </div>

      </div>
    </>
  );
}
