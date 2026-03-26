'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import styles from '../../Dashboard.module.css';

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projectTitle, setProjectTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [freelancerName, setFreelancerName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const param = searchParams.get('freelancer');
    if (param) {
      setFreelancerName(decodeURIComponent(param));
    }
  }, [searchParams]);

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Create Project</h1>
          <p className={styles.pageSubtitle}>Home / Create Project</p>
        </div>
      </div>

      <div className={styles.formContainer}>
        {/* Row 1: Project Title */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Project Title</label>
          <input
            type="text"
            placeholder="Project Title"
            className={styles.formInput}
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>

        {/* Row 2: Client & Freelancer */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Client</label>
            <input 
              type="text" 
              className={styles.formInput} 
              placeholder="Type Client Name" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Freelancer</label>
            <input 
              type="text" 
              className={styles.formInput} 
              placeholder="Type Freelancer Name" 
              value={freelancerName}
              onChange={(e) => setFreelancerName(e.target.value)}
            />
          </div>
        </div>

        {/* Row 3: Budget Details */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Budget</label>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Total Milestones"
              className={styles.formInput}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Total Value"
                className={styles.formInput}
                style={{ flex: 1 }}
              />
              <select className={styles.formSelect} style={{ width: '100px' }} defaultValue="USD">
                <option value="USD">USD</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Milestone Details */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Milestone Details</label>
          <div className={`${styles.formInput}`} style={{ display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: '#1a1a24' }}>
            <input
              type="text"
              placeholder="Title, Amt"
              className={styles.formInput}
              style={{ flex: 1.5, backgroundColor: 'transparent', border: 'none', padding: '0' }}
            />
            <input
              type="text"
              placeholder="Payment..."
              className={styles.formInput}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', padding: '0' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#a0a0b2' }}>
              <span>+</span>
              <span style={{ fontSize: '13px' }}>00d</span>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.secondaryButton} onClick={() => router.back()}>Cancel</button>
          <button 
            className={styles.primaryButton} 
            onClick={() => {
              setIsCreating(true);
              
              const newId = Date.now().toString();
              const newProject = {
                id: newId,
                name: projectTitle || 'My New Project',
                client: clientName || 'Anonymous Client',
                freelancer: freelancerName || 'Unknown Freelancer',
                status: 'Active',
                statusClass: 'badgeActive',
                linkId: newId
              };
              
              const existing = JSON.parse(localStorage.getItem('trustlance_projects') || '[]');
              localStorage.setItem('trustlance_projects', JSON.stringify([newProject, ...existing]));

              setTimeout(() => {
                router.push('/projects');
              }, 1500);
            }}
            disabled={isCreating}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              minWidth: '140px', opacity: isCreating ? 0.7 : 1, cursor: isCreating ? 'not-allowed' : 'pointer'
            }}
          >
            {isCreating ? (
              <>
                <Loader2 size={16} className={`${styles.spinner} animate-spin`} style={{ animation: 'spin 1s linear infinite' }} />
                Deploying...
              </>
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
