'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Target, Wallet2, Calendar, Plus, Trash2 } from 'lucide-react';
import styles from '../../Dashboard.module.css';

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [projectTitle, setProjectTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [freelancerName, setFreelancerName] = useState('');
  const [budget, setBudget] = useState('500');
  const [currency, setCurrency] = useState('XLM');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const param = searchParams.get('freelancer');
    if (param) {
      setFreelancerName(decodeURIComponent(param));
    }
  }, [searchParams]);

  return (
    <div className="animate-fade-in">
      <div className={styles.pageHeader}>
        <div>
           <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', marginBottom: '12px', padding: 0 }}>
             <ArrowLeft size={16} /> Back
           </button>
          <h1 className={styles.sectionTitle}>Smart Contract Deployment</h1>
          <p className={styles.pageSubtitle}>Configure your milestone-based escrow contract on Stellar.</p>
        </div>
      </div>

      <div style={{ maxWidth: '900px' }}>
        <div className={styles.tableContainer} style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ opacity: 0.7, fontSize: '12px', textTransform: 'uppercase' }}>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Website Redesign 2026"
                  className={styles.formInput}
                  style={{ height: '52px', fontSize: '15px' }}
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ opacity: 0.7, fontSize: '12px', textTransform: 'uppercase' }}>Client</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    style={{ height: '52px' }}
                    placeholder="Alice Cooper" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ opacity: 0.7, fontSize: '12px', textTransform: 'uppercase' }}>Freelancer</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    style={{ height: '52px' }}
                    placeholder="James Carter" 
                    value={freelancerName}
                    onChange={(e) => setFreelancerName(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} style={{ opacity: 0.7, fontSize: '12px', textTransform: 'uppercase' }}>Initial Escrow Funding</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Wallet2 size={16} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-muted)' }} />
                    <input
                      type="number"
                      placeholder="0.00"
                      className={styles.formInput}
                      style={{ height: '52px', paddingLeft: '44px' }}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <select 
                    className={styles.formSelect} 
                    style={{ width: '120px', height: '52px' }} 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="XLM">XLM</option>
                    <option value="USDC">USDC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Side: Milestones */}
            <div>
               <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Target size={16} /> Milestones
               </h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { title: 'Project Initiation', amt: '25%' },
                    { title: 'Alpha Release', amt: '50%' }
                  ].map((m, i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                          <div style={{ fontSize: '13px', fontWeight: 700 }}>{m.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Release on approval</div>
                       </div>
                       <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>{m.amt}</div>
                    </div>
                  ))}
                  
                  <button style={{ 
                    padding: '16px', border: '1px dashed var(--surface-border)', background: 'none', 
                    color: 'var(--text-muted)', borderRadius: '16px', cursor: 'pointer', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px',
                    transition: 'all 0.2s'
                  }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-border)'}>
                    <Plus size={14} /> Add Milestone
                  </button>
               </div>
            </div>

          </div>

          <div className={styles.formActions} style={{ marginTop: '48px', paddingTop: '32px' }}>
            <button className={styles.secondaryButton} style={{ height: '52px', padding: '0 32px' }} onClick={() => router.back()}>Discard</button>
            <button 
              className={styles.primaryButton} 
              style={{ height: '52px', padding: '0 40px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}
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
                  linkId: newId,
                  budget: budget || '0',
                  currency: currency || 'XLM',
                  createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                };
                
                const existing = JSON.parse(localStorage.getItem('trustlance_projects') || '[]');
                localStorage.setItem('trustlance_projects', JSON.stringify([newProject, ...existing]));

                setTimeout(() => {
                  router.push('/projects');
                }, 1500);
              }}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deploying On-Chain...
                </>
              ) : (
                'Deploy Escrow Contract'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
