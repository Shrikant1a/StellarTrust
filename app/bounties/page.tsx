'use client';

import React from 'react';
import styles from '../Dashboard.module.css';
import { Search, ExternalLink, Clock } from 'lucide-react';

export default function BountiesPage() {
  const mockBounties = [
    { id: 1, title: 'Implement Soroban Smart Contract for Escrow', reward: '5,000 XLM', priority: 'High', deadline: '3 days left', tags: ['Backend', 'Rust', 'Stellar'] },
    { id: 2, title: 'Design Landing Page for DeFi Protocol', reward: '1,200 XLM', priority: 'Medium', deadline: '1 week left', tags: ['Design', 'Figma', 'Web'] },
    { id: 3, title: 'Audit Tokenomics Model', reward: '3,000 XLM', priority: 'High', deadline: '5 days left', tags: ['Research', 'Finance'] },
    { id: 4, title: 'Fix React Native Navigation Bug', reward: '500 XLM', priority: 'Low', deadline: '12 hours left', tags: ['Mobile', 'React Native'] },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Open Bounties</h1>
          <p className={styles.pageSubtitle}>Home / Bounties</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className={styles.searchContainer} style={{ width: '300px' }}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search bounties..." className={styles.searchInput} />
          </div>
          <button className={styles.primaryButton}>Post a Bounty</button>
        </div>
      </div>

      <div className={styles.projectsTableContainer}>
        <table className={styles.projectsTable}>
          <thead>
            <tr>
              <th>Bounty Title</th>
              <th>Reward</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockBounties.map((bounty) => (
              <tr key={bounty.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 500, color: '#fff' }}>{bounty.title}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {bounty.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '11px', color: '#a0a0b2', backgroundColor: '#1e1e2d', padding: '2px 6px', borderRadius: '4px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>{bounty.reward}</td>
                <td>
                  <span className={`${styles.statusBadge} ${bounty.priority === 'High' ? styles.statusDisputed : bounty.priority === 'Medium' ? styles.statusActive : styles.statusCompleted}`}>
                    {bounty.priority}
                  </span>
                </td>
                <td style={{ color: '#a0a0b2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {bounty.deadline}
                  </div>
                </td>
                <td>
                  <button className={styles.actionButton}>
                    Apply <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
