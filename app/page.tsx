'use client';

import React, { useState } from 'react';
import styles from '@/app/Dashboard.module.css';
import { 
  Briefcase,
  Lock,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Activity,
  Zap,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import TrustBadge from '../components/TrustBadge';

export default function Dashboard() {
  const contractId = 'CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* Background Ambient Glow Blobs */}
      <div className="ambient-blob" style={{ top: '-100px', left: '-50px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, transparent 70%)' }}></div>
      <div className="ambient-blob" style={{ bottom: '200px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(192, 132, 252, 0.1) 0%, transparent 70%)' }}></div>

      <div className={styles.pageHeader}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--primary)' }}>Secure Decentralized Escrow</span>
          </div>
          <h1 className={styles.sectionTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle} style={{ marginBottom: 0 }}>Welcome back! Track your projects, release secure milestones, and monitor reputation.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/monitoring" className={styles.secondaryButton} style={{ textDecoration: 'none' }}>
            <Activity size={16} />
            System Health
          </Link>
          <Link href="/projects/create" className={styles.primaryButton} style={{ textDecoration: 'none' }}>
            <Zap size={16} fill="currentColor" />
            New Project
          </Link>
        </div>
      </div>

      {/* On-Chain Soroban Contract HUD Banner */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.8) 0%, rgba(129, 140, 248, 0.05) 100%)',
        border: '1px solid rgba(129, 140, 248, 0.2)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '32px',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(129, 140, 248, 0.05)'
      }}>
        {/* Decorative subtle pulse element */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '150px', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.03))',
          pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-success)', boxShadow: '0 0 10px var(--accent-success)', animation: 'spin 2s linear infinite' }}></div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Soroban Smart Contract Active</span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>Stellar Escrow Network Address</h2>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', 
              background: 'rgba(3, 3, 7, 0.6)', padding: '12px 16px', borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.04)'
            }}>
              <code style={{ fontSize: '13px', color: 'var(--primary)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {contractId}
              </code>
              <button 
                onClick={handleCopy} 
                title="Copy Address"
                style={{ 
                  background: 'transparent', border: 'none', color: copied ? 'var(--accent-success)' : 'var(--text-muted)', 
                  cursor: 'pointer', transition: 'color 0.2s', padding: '4px', display: 'flex', alignItems: 'center' 
                }}
                onMouseEnter={e => !copied && (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => !copied && (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href={`https://stellar.expert/explorer/testnet/contract/${contractId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.secondaryButton}
              style={{ textDecoration: 'none', background: 'rgba(129, 140, 248, 0.1)', borderColor: 'rgba(129, 140, 248, 0.25)', color: '#ffffff' }}
            >
              <ExternalLink size={16} />
              View On-Chain Activity
            </a>
          </div>
        </div>
      </section>

      {/* Top Metrics Grid */}
      <section className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.projectsIconBox}`}>
            <Briefcase size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Projects</span>
            <span className={styles.metricValue}>42</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.fundsIconBox}`}>
            <Lock size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Funds Locked</span>
            <span className={styles.metricValue}>24,500 <span className={styles.unit}>XLM</span></span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={`${styles.metricIconBox} ${styles.earningsIconBox}`}>
            <Users size={22} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Verified Users</span>
            <span className={styles.metricValue}>34</span>
          </div>
        </div>
      </section>

      {/* Interactive Main Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '32px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '20px', margin: 0 }}>Active Portfolios</h2>
            <Link href="/projects" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--primary)')}>
              View portfolio list <ChevronRight size={14} />
            </Link>
          </div>

          {/* Active Projects Grid */}
          <section className={styles.projectsGrid}>
            {[
              { title: 'Website Redesign', users: 'Alice (Client) → James Carter (Freelancer)', progress: 50, milestones: '2 / 4', status: 'Active', badgeClass: styles.badgeActive, barColor: 'var(--accent-success)' },
              { title: 'Mobile App Dev', users: 'David (Client) → Sarah Lee (Freelancer)', progress: 33, milestones: '1 / 3', status: 'In Progress', badgeClass: styles.badgeInProgress, barColor: 'var(--accent-warning)' },
              { title: 'Blockchain Integration', users: 'Michael (Client) → Alex Smith (Freelancer)', progress: 66, milestones: '4 / 6', status: 'Active', badgeClass: styles.badgeActive, barColor: 'var(--accent-success)' },
              { title: 'SEO Optimization', users: 'Emma (Client) → John Doe (Freelancer)', progress: 60, milestones: '3 / 5', status: 'Dispute', badgeClass: styles.badgeDispute, barColor: 'var(--accent-danger)' }
            ].map((project, index) => (
              <div key={index} className={styles.projectCard} style={{ animationDelay: `${index * 0.08}s` }}>
                <div className={styles.projectHeader}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</h3>
                    <span className={styles.projectUsers}>{project.users}</span>
                  </div>
                  <span className={`${styles.badge} ${project.badgeClass}`}>{project.status}</span>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Milestones: <strong style={{ color: '#ffffff' }}>{project.milestones}</strong></span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{project.progress}%</span>
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ 
                        width: `${project.progress}%`, 
                        background: `linear-gradient(90deg, var(--primary) 0%, ${project.barColor} 100%)`,
                        boxShadow: `0 0 8px ${project.barColor}40`
                      }}
                    ></div>
                  </div>
                </div>
                
                <Link href={`/projects/${index + 1}`} className={styles.detailsButton} style={{ textDecoration: 'none' }}>
                  Manage Contract
                </Link>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar Activity */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.tableContainer} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <TrustBadge score={98} level="Elite Creator" verified={true} />
            
            <div>
              <h2 className={styles.sectionTitle} style={{ fontSize: '16px', marginBottom: '16px' }}>Recent Ledger Events</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: 'Milestone Approved', desc: "Client approved 'User Login' for Website Redesign", time: 'Just now', dotColor: 'var(--accent-success)' },
                  { title: 'Funded Project', desc: "New project 'E-commerce UI' funded with 500 XLM", time: '12 mins ago', dotColor: 'var(--primary)' },
                  { title: 'Raised Dispute', desc: "Freelancer raised dispute on 'API Connectivity'", time: '2 hours ago', dotColor: 'var(--accent-danger)' }
                ].map((activity, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ width: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)', position: 'relative', marginTop: '4px' }}>
                      <div style={{ 
                        position: 'absolute', top: 0, left: '-4px', width: '10px', height: '10px', 
                        borderRadius: '50%', backgroundColor: activity.dotColor, 
                        boxShadow: `0 0 8px ${activity.dotColor}80` 
                      }}></div>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{activity.title}</p>
                      <p style={{ margin: '4px 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{activity.desc}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={10} /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.metricCard} style={{ 
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(129, 140, 248, 0.02) 100%)',
            border: '1px solid rgba(129, 140, 248, 0.18)',
            padding: '24px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: 'rgba(129, 140, 248, 0.1)', borderRadius: '10px' }}>
                <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.2px', color: '#ffffff' }}>Reputation Boost</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              Your trust reputation score surged by **5.2%** this week due to fast dispute arbitration.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

