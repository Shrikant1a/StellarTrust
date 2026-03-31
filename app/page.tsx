'use client';

import React from 'react';
import styles from './Dashboard.module.css';
import { 
  Briefcase,
  Lock,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import TrustBadge from '../components/TrustBadge';

export default function Dashboard() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back! Here's what's happening today.</p>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
          <Link href="/monitoring" className={styles.secondaryButton} style={{textDecoration: 'none'}}>
            System Health
          </Link>
          <Link href="/projects/create" className={styles.primaryButton} style={{textDecoration: 'none'}}>
            New Project
          </Link>
        </div>
      </div>

      {/* Top Cards */}
      <section className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.projectsIconBox}`}>
            <Briefcase size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Projects</span>
            <span className={styles.metricValue}>42</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.fundsIconBox}`}>
            <Lock size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Funds Locked</span>
            <span className={styles.metricValue}>24,500 <span className={styles.unit}>XLM</span></span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.earningsIconBox}`}>
            <Users size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Verified Active Users</span>
            <span className={styles.metricValue}>34</span>
          </div>
        </div>
      </section>

      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '32px'}}>
        <div>
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
        </div>

        {/* Sidebar Activity */}
        <aside>
          <div className={styles.tableContainer} style={{padding: '20px', gap: '20px', display: 'flex', flexDirection: 'column'}}>
            <TrustBadge score={94} level="Elite" verified={true} />
            
            <h2 className={styles.subSectionTitle} style={{marginTop: '10px', marginBottom: '0'}}>Recent Activity</h2>
            <div className={styles.cellSubtext}>
              <Clock size={16} />
              <span>Just now</span>
            </div>
            <div style={{fontSize: '14px'}}>
              <strong>Milestone Approved</strong>
              <p style={{margin: '4px 0 0 0', color: '#a0a0b2'}}>Client approved 'User Login' for Website Redesign</p>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #2d2d3d', margin: 0}} />
            
            <div className={styles.cellSubtext}>
              <Clock size={16} />
              <span>12 mins ago</span>
            </div>
            <div style={{fontSize: '14px'}}>
              <strong>Funded Project</strong>
              <p style={{margin: '4px 0 0 0', color: '#a0a0b2'}}>New project 'E-commerce UI' funded with 500 XLM</p>
            </div>
            <hr style={{border: 'none', borderTop: '1px solid #2d2d3d', margin: 0}} />

            <div className={styles.cellSubtext}>
              <Clock size={16} />
              <span>2 hours ago</span>
            </div>
            <div style={{fontSize: '14px'}}>
              <strong>Raised Dispute</strong>
              <p style={{margin: '4px 0 0 0', color: '#a0a0b2'}}>Freelancer raised dispute on 'API Connectivity' milestone</p>
            </div>
          </div>
          
          <div className={styles.metricCard} style={{marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 100%)'}}>
            <TrendingUp size={24} style={{color: '#818cf8'}} />
            <div style={{fontSize: '13px', color: '#a0a0b2'}}>
              Your trust score increased by <strong>5%</strong> this week!
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
