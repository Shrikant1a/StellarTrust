'use client';

import React from 'react';
import styles from '../Dashboard.module.css';
import { Search, Star, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FreelancersPage() {
  const router = useRouter();
  const mockFreelancers = [
    { id: 1, name: 'Sarah Lee', role: 'Full Stack Web3 Developer', rating: 4.9, jobs: 42, hourly: '$85/hr', tags: ['React', 'Solidity', 'Rust'] },
    { id: 2, name: 'David Chen', role: 'Smart Contract Auditor', rating: 5.0, jobs: 18, hourly: '$120/hr', tags: ['Security', 'Soroban', 'Stellar'] },
    { id: 3, name: 'Emma Watson', role: 'UX/UI Designer', rating: 4.8, jobs: 56, hourly: '$65/hr', tags: ['Figma', 'Web Design', 'Branding'] },
    { id: 4, name: 'Alex Miller', role: 'DeFi Strategist', rating: 4.7, jobs: 31, hourly: '$95/hr', tags: ['Tokenomics', 'DeFi', 'Analytics'] },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Browse Freelancers</h1>
          <p className={styles.pageSubtitle}>Home / Freelancers</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className={styles.searchContainer} style={{ width: '300px' }}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search by skills or name..." className={styles.searchInput} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {mockFreelancers.map((freelancer) => (
          <div key={freelancer.id} className={styles.statCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={`https://i.pravatar.cc/150?img=${freelancer.id + 20}`} alt={freelancer.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>{freelancer.name}</h3>
                <p style={{ margin: '4px 0 0 0', color: '#a0a0b2', fontSize: '13px' }}>{freelancer.role}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #2d2d3d', borderBottom: '1px solid #2d2d3d' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', color: '#fff', fontWeight: 600 }}>{freelancer.hourly}</span>
                <span style={{ fontSize: '12px', color: '#a0a0b2' }}>Rate</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#fff', fontWeight: 600 }}><Star size={14} fill="#facc15" color="#facc15" /> {freelancer.rating}</span>
                <span style={{ fontSize: '12px', color: '#a0a0b2' }}>Rating</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', color: '#fff', fontWeight: 600 }}>{freelancer.jobs}</span>
                <span style={{ fontSize: '12px', color: '#a0a0b2' }}>Jobs</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {freelancer.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 8px', backgroundColor: '#1e1e2d', border: '1px solid #2d2d3d', borderRadius: '12px', fontSize: '12px', color: '#818cf8' }}>
                  {tag}
                </span>
              ))}
            </div>

            <button 
              className={styles.primaryButton} 
              style={{ width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => router.push(`/projects/create?freelancer=${encodeURIComponent(freelancer.name)}`)}
            >
              <MessageSquare size={16} /> Hire {freelancer.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
