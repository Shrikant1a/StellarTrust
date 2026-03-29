'use client';

import React from 'react';
import styles from './Dashboard.module.css';
import { 
  Briefcase,
  Lock,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <h1 className={styles.sectionTitle}>Dashboard</h1>

      {/* Top Cards */}
      <section className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.projectsIconBox}`}>
            <Briefcase size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Projects</span>
            <span className={styles.metricValue}>12</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.fundsIconBox}`}>
            <Lock size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Funds Locked</span>
            <span className={styles.metricValue}>3.5 <span className={styles.unit}>ETH</span></span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.earningsIconBox}`}>
            <DollarSign size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Your Earnings</span>
            <span className={styles.metricValue}>$4,200</span>
          </div>
        </div>
      </section>

      <h2 className={styles.subSectionTitle}>Active Projects</h2>

      {/* Active Projects Grid */}
      <section className={styles.projectsGrid}>
        {/* Project 1 */}
        <div className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>Website Redesign</h3>
            <span className={styles.projectUsers}>Alice <span className={styles.arrow}>→</span> James Carter</span>
          </div>
          
          <div className={styles.milestonesRow}>
            <span className={styles.milestonesText}>Milestones: <span className={styles.milestonesBold}>2 / 4</span></span>
            <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>
          </div>
          
          <div className={styles.progressRow}>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.active}`} style={{ width: '50%' }}></div>
            </div>
            <Link href="/projects/1" className={styles.detailsButton} style={{textDecoration: 'none'}}>View Details</Link>
          </div>
        </div>

        {/* Project 2 */}
        <div className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>Mobile App Development</h3>
            <span className={styles.projectUsers}>David <span className={styles.arrow}>→</span> Sarah Lee</span>
          </div>
          
          <div className={styles.milestonesRow}>
            <span className={styles.milestonesText}>Milestones: <span className={styles.milestonesBold}>1 / 3</span></span>
            <span className={`${styles.badge} ${styles.badgeInProgress}`}>In Progress</span>
          </div>
          
          <div className={styles.progressRow}>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.inProgress}`} style={{ width: '33%' }}></div>
            </div>
            <Link href="/projects/2" className={styles.detailsButton} style={{textDecoration: 'none'}}>View Details</Link>
          </div>
        </div>

        {/* Project 3 */}
        <div className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>Blockchain Integration</h3>
            <span className={styles.projectUsers}>Michael <span className={styles.arrow}>→</span> Alex Smith</span>
          </div>
          
          <div className={styles.milestonesRow}>
            <span className={styles.milestonesText}>Milestones: <span className={styles.milestonesBold}>4 / 6</span></span>
            <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>
          </div>
          
          <div className={styles.progressRow}>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.active}`} style={{ width: '66%' }}></div>
            </div>
            <Link href="/projects/3" className={styles.detailsButton} style={{textDecoration: 'none'}}>View Details</Link>
          </div>
        </div>

        {/* Project 4 */}
        <div className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectTitle}>SEO Optimization</h3>
            <span className={styles.projectUsers}>Emma <span className={styles.arrow}>→</span> John Doe</span>
          </div>
          
          <div className={styles.milestonesRow}>
            <span className={styles.milestonesText}>Milestones: <span className={styles.milestonesBold}>3 / 5</span></span>
            <span className={`${styles.badge} ${styles.badgeDispute}`}>Dispute</span>
          </div>
          
          <div className={styles.progressRow}>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.dispute}`} style={{ width: '60%' }}></div>
            </div>
            <Link href="/projects/4" className={styles.detailsButton} style={{textDecoration: 'none'}}>View Details</Link>
          </div>
        </div>
      </section>
    </>
  );
}
