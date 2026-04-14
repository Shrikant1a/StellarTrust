'use client';

import React from 'react';
import styles from '@/app/Dashboard.module.css';
import { 
  Briefcase,
  Lock,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import TrustBadge from '../components/TrustBadge';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back! Here's an overview of your secure workspace.</p>
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
            <Briefcase size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Projects</span>
            <span className={styles.metricValue}>42</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.fundsIconBox}`}>
            <Lock size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Funds Locked</span>
            <span className={styles.metricValue}>24,500 <span className={styles.unit}>XLM</span></span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.earningsIconBox}`}>
            <Users size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Verified Users</span>
            <span className={styles.metricValue}>34</span>
          </div>
        </div>
      </section>

      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '32px'}}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className={styles.subSectionTitle} style={{ marginBottom: 0 }}>Active Projects</h2>
            <Link href="/projects" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>

          {/* Active Projects Grid */}
          <section className={styles.projectsGrid}>
            {[
              { title: 'Website Redesign', users: 'Alice → James Carter', progress: 50, milestones: '2 / 4', status: 'Active', badgeClass: styles.badgeActive, barClass: styles.active },
              { title: 'Mobile App Dev', users: 'David → Sarah Lee', progress: 33, milestones: '1 / 3', status: 'In Progress', badgeClass: styles.badgeInProgress, barClass: styles.inProgress },
              { title: 'Blockchain Integration', users: 'Michael → Alex Smith', progress: 66, milestones: '4 / 6', status: 'Active', badgeClass: styles.badgeActive, barClass: styles.active },
              { title: 'SEO Optimization', users: 'Emma → John Doe', progress: 60, milestones: '3 / 5', status: 'Dispute', badgeClass: styles.badgeDispute, barClass: styles.dispute }
            ].map((project, index) => (
              <div key={index} className={styles.projectCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.projectHeader}>
                  <div>
                    <h3 className={project.title}>{project.title}</h3>
                    <span className={styles.projectUsers}>{project.users}</span>
                  </div>
                  <span className={`${styles.badge} ${project.badgeClass}`}>{project.status}</span>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Milestones: <strong style={{ color: 'var(--text-primary)' }}>{project.milestones}</strong></span>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{project.progress}%</span>
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div className={`${styles.progressBar} ${project.barClass}`} style={{ width: `${project.progress}%`, backgroundColor: 'var(--primary)' }}></div>
                  </div>
                </div>
                
                <Link href={`/projects/${index + 1}`} className={styles.detailsButton} style={{textDecoration: 'none'}}>
                  View Details
                </Link>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar Activity */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.tableContainer} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TrustBadge score={94} level="Elite Candidate" verified={true} />
            
            <div>
              <h2 className={styles.subSectionTitle} style={{ fontSize: '16px', marginBottom: '16px' }}>Recent Activity</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: 'Milestone Approved', desc: "Client approved 'User Login' for Website Redesign", time: 'Just now' },
                  { title: 'Funded Project', desc: "New project 'E-commerce UI' funded with 500 XLM", time: '12 mins ago' },
                  { title: 'Raised Dispute', desc: "Freelancer raised dispute on 'API Connectivity'", time: '2 hours ago' }
                ].map((activity, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '2px', backgroundColor: 'var(--surface-border)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: '-4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: i === 0 ? 'var(--primary)' : 'var(--surface-border)' }}></div>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{activity.title}</p>
                      <p style={{ margin: '4px 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{activity.desc}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.metricCard} style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.02) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '24px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px' }}>
                <TrendingUp size={20} style={{color: 'var(--primary)'}} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Impact Growth</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              Your trust score increased by <strong>5.2%</strong> this week. Keep up the great work!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
