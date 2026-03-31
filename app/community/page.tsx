'use client';

import React from 'react';
import styles from '../Dashboard.module.css';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  ExternalLink,
  Award,
  Heart
} from 'lucide-react';

const COMMUNITY_MEMBERS = [
  { name: 'Stellar_Dev_42', role: 'Security Reviewer', impact: 'Implemented Escrow Guard' },
  { name: 'USDC_Master', role: 'Token Advisor', impact: 'Asset Integration' },
  { name: 'Soroban_Fan', role: 'Lead Architect', impact: 'Contract Optimization' }
];

export default function CommunityHub() {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Community Hub</h1>
          <p className={styles.pageSubtitle}>Connecting Trustlance with the broader Stellar ecosystem.</p>
        </div>
        <button 
          className={styles.primaryButton}
          onClick={() => openLink('https://discord.gg/stellar')}
        >
          <MessageSquare size={16} style={{marginRight: '8px'}} />
          Join Discussion
        </button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '32px'}}>
        <div>
          <h2 className={styles.subSectionTitle}>Verified Community Contributors</h2>
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <span>Contributor</span>
              <span>Role</span>
              <span>Key Impact</span>
            </div>
            {COMMUNITY_MEMBERS.map((member, i) => (
              <div key={i} className={styles.tableRow}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2d2d3d', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Users size={16} color="#818cf8" />
                  </div>
                  <span className={styles.cellText}>{member.name}</span>
                </div>
                <span className={styles.cellText}>{member.role}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <Award size={14} color="#facc15" />
                  <span className={styles.cellSubtext}>{member.impact}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop: '40px'}}>
            <h2 className={styles.subSectionTitle}>Latest Ecosystem News</h2>
            <div className={styles.projectsGrid}>
              <div 
                className={styles.projectCard} 
                style={{cursor: 'pointer'}}
                onClick={() => openLink('https://developers.stellar.org/docs/smart-contracts/changelog')}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', color: '#6366f1', fontWeight: 600}}>CHANGELOG</span>
                  <ExternalLink size={14} color="#a0a0b2" />
                </div>
                <h3 className={styles.projectTitle}>Soroban Protocol Updates</h3>
                <p style={{fontSize: '13px', color: '#a0a0b2', margin: '8px 0'}}>Stay updated with the latest smart contract protocol changes and features.</p>
              </div>
              <div 
                className={styles.projectCard} 
                style={{cursor: 'pointer'}}
                onClick={() => openLink('https://stellar.org/blog')}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                  <span style={{fontSize: '12px', color: '#4ade80', fontWeight: 600}}>ECOSYSTEM</span>
                  <ExternalLink size={14} color="#a0a0b2" />
                </div>
                <h3 className={styles.projectTitle}>Stellar Network Blog</h3>
                <p style={{fontSize: '13px', color: '#a0a0b2', margin: '8px 0'}}>The latest news on USDC integrations and network expansions.</p>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className={styles.tableContainer} style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
              <Heart size={48} color="#ef4444" fill="#ef4444" style={{opacity: 0.2}} />
              <h3 style={{margin: 0}}>Community Impact</h3>
              <p style={{fontSize: '14px', color: '#a0a0b2'}}>Your contributions are helping build a more transparent freelance economy on Stellar.</p>
            </div>
            
            <hr style={{border: 'none', borderTop: '1px solid #2d2d3d', width: '100%'}} />
            
            <div>
              <h4 style={{margin: '0 0 12px 0', fontSize: '13px', color: '#a0a0b2'}}>RESOURCES</h4>
              <nav style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <button 
                  onClick={() => openLink('https://developers.stellar.org/docs/smart-contracts')}
                  style={{background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#6366f1', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s'}}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Share2 size={14} /> Documentation
                </button>
                <button 
                  onClick={() => openLink('https://discord.gg/stellar')}
                  style={{background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#6366f1', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s'}}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Share2 size={14} /> Stellar Dev Discord
                </button>
                <button 
                  onClick={() => openLink('https://docs.google.com/forms/d/e/1FAIpQLSepMqJtazGZSnUZBheIrc317sPruttgwyP5c3iMeTjFKcLtyw/viewform?usp=sf_link')}
                  style={{background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#6366f1', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s'}}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Share2 size={14} /> Feedback Form
                </button>
              </nav>
            </div>

            <div style={{marginTop: '20px', padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)'}}>
              <p style={{fontSize: '12px', color: '#818cf8', margin: 0, lineHeight: 1.5}}>
                <strong>Did you know?</strong> 1 community contribution can be simply implementing specific feedback from the Stellar development community!
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
