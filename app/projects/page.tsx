'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Dashboard.module.css';
import { Search, Filter, Plus, LayoutGrid, List, MoreVertical } from 'lucide-react';

export default function ProjectsPage() {
  const defaultProjects = [
    { id: 'default-1', name: 'Website Redesign', client: 'Alice', freelancer: 'James Carter', status: 'Active', statusClass: 'badgeActive', linkId: '1', budget: '4500', currency: 'XLM', deadline: '24 Apr 2026' },
    { id: 'default-2', name: 'Mobile App Development', client: 'David', freelancer: 'Sarah Lee', status: 'In Progress', statusClass: 'badgeInProgress', linkId: '2', budget: '8000', currency: 'XLM', deadline: '12 May 2026' },
    { id: 'default-3', name: 'Blockchain Integration', client: 'Michael', freelancer: 'Alex Smith', status: 'Active', statusClass: 'badgeActive', linkId: '3', budget: '12000', currency: 'XLM', deadline: '05 Jun 2026' },
    { id: 'default-4', name: 'SEO Optimization', client: 'Emma', freelancer: 'John Doe', status: 'Dispute', statusClass: 'badgeDispute', linkId: '4', budget: '1500', currency: 'XLM', deadline: 'Expired' },
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const saved = localStorage.getItem('trustlance_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setProjects([...parsed, ...defaultProjects]);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Project Portfolio</h1>
          <p className={styles.pageSubtitle}>Manage and monitor all active smart-contract backed projects.</p>
        </div>
        <Link href="/projects/create" style={{ textDecoration: 'none' }}>
          <button className={styles.primaryButton}>
            <Plus size={18} />
            Create Project
          </button>
        </Link>
      </div>

      {/* Filters & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', gap: '16px' }}>
         <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
            <div className={styles.searchContainer} style={{ flex: 1, maxWidth: '400px' }}>
               <Search className={styles.searchIcon} size={16} />
               <input type="text" placeholder="Filter by name, client, or status..." className={styles.searchInput} style={{ width: '100%' }} />
            </div>
            <button className={styles.iconButton} title="Filters">
               <Filter size={18} />
            </button>
         </div>
         <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: '12px', padding: '4px', border: '1px solid var(--surface-border)' }}>
            <button className={styles.iconButton} style={{ border: 'none', background: 'var(--surface-hover)', width: '36px', height: '36px' }}><List size={18} /></button>
            <button className={styles.iconButton} style={{ border: 'none', background: 'transparent', width: '36px', height: '36px' }}><LayoutGrid size={18} /></button>
         </div>
      </div>

      <div className={styles.tableContainer}>
        <div style={{ 
          display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr', 
          gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--surface-border)',
          color: 'var(--text-muted)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>
          <div>Project Name</div>
          <div>Counterparty</div>
          <div>Budget</div>
          <div>Deadline</div>
          <div>Status</div>
          <div style={{ textAlign: 'right' }}></div>
        </div>

        {projects.map((proj, index) => (
          <div key={proj.id} style={{ 
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr', 
            gap: '16px', padding: '24px 0', borderBottom: index === projects.length - 1 ? 'none' : '1px solid var(--surface-border)',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{proj.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: #{proj.id.slice(0, 8)}</div>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {proj.client} <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>→</span> {proj.freelancer}
            </div>
            <div style={{ fontWeight: 600 }}>
              {proj.budget} <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{proj.currency}</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {proj.deadline || 'No Date'}
            </div>
            <div>
              <span className={`${styles.badge} ${styles[proj.statusClass]}`}>{proj.status}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
               <Link href={`/projects/${proj.linkId}`} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                  <MoreVertical size={20} />
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
