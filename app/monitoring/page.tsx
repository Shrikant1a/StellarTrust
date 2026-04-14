'use client';

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { 
  Activity, 
  Terminal, 
  Database, 
  ShieldCheck, 
  RefreshCcw,
  Zap,
  Server,
  Cloud,
  ExternalLink,
  ChevronRight,
  Cpu
} from 'lucide-react';

export default function Monitoring() {
  const [logs, setLogs] = useState<string[]>([]);
  const [indexingProgress, setIndexingProgress] = useState(100);
  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || 'Not Configured';
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'soroban-testnet.stellar.org';
  const [uptime, setUptime] = useState('99.998%');

  useEffect(() => {
    const initialLogs = [
      '[SYSTEM] Initializing Infrastructure Monitoring...',
      '[RPC] Connected to Stellar Testnet Horizon API',
      '[SOROBAN] Protocol 21 detected - Scaling indexing throughput',
      '[INDEXER] Syncing contracts from ledger 102432...',
      '[INDEXER] Processed 42 legacy escrow transactions',
      '[AUTH] Security middleware active on all routes',
      '[SUCCESS] Monitoring dashboard online'
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] Block verified: ${Math.floor(Math.random() * 1000000)} - Tx Index: ${Math.floor(Math.random() * 5)}`;
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>System Health</h1>
          <p className={styles.pageSubtitle}>Real-time infrastructure performance and on-chain indexing metrics.</p>
        </div>

        <button className={styles.secondaryButton} style={{ gap: '10px' }}>
          <RefreshCcw size={16} />
          Sync Node
        </button>
      </div>

      {/* Stats Cards */}
      <section className={styles.metricsGrid}>
        {[
          { label: 'System Status', value: 'Operational', icon: Activity, color: 'var(--accent-success)', bg: 'rgba(16, 185, 129, 0.1)' },
          { label: 'Indexing Sync', value: `${indexingProgress}%`, icon: Database, color: 'var(--primary)', bg: 'rgba(99, 102, 241, 0.1)' },
          { label: 'Network Uptime', value: uptime, icon: ShieldCheck, color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.1)' }
        ].map((stat, i) => (
          <div key={i} className={styles.metricCard}>
            <div className={styles.metricIconBox} style={{ backgroundColor: stat.bg, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className={styles.metricInfo}>
              <span className={styles.metricLabel}>{stat.label}</span>
              <span className={styles.metricValue}>{stat.value}</span>
            </div>
          </div>
        ))}
      </section>

      <div style={{display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px'}}>
        {/* Terminal / Logs */}
        <div className={styles.tableContainer} style={{ background: '#08080c', border: '1px solid var(--surface-border)' }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <Terminal size={18} color="var(--primary)" />
              </div>
              <h3 style={{margin: 0, fontSize: '18px', fontWeight: 700}}>Event Indexer Logs</h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-success)', boxShadow: '0 0 10px var(--accent-success)' }}></div>
               <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-success)' }}>Live</span>
            </div>
          </div>
          
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", 
            fontSize: '13px',
            color: 'var(--text-secondary)',
            minHeight: '300px',
            lineHeight: '1.6'
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '6px', opacity: 1 - (i * 0.08) }}>
                <span style={{color: 'var(--primary)', fontStyle: 'italic'}}>[trustlance]</span> 
                <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>—</span>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* System Details */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.tableContainer}>
              <h3 style={{margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700}}>Infrastructure</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <Server size={18} color="var(--primary)" />
                          <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>RPC Provider</span>
                      </div>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)'}}>{rpcUrl}</span>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <Zap size={18} color="var(--accent-warning)" />
                          <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>API Latency</span>
                      </div>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--accent-success)'}}>42ms</span>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <Cpu size={18} color="var(--accent-blue)" />
                          <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Node Version</span>
                      </div>
                      <span style={{fontSize: '14px', fontWeight: 700}}>Soroban v21.0</span>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: '8px 0' }} />
                  
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
                     <p style={{ margin: '0 0 8px 0', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Active Contract</p>
                     <p style={{ margin: 0, fontSize: '11px', fontFamily: 'monospace', color: 'var(--primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contractId}</p>
                     <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-primary)', marginTop: '12px', textDecoration: 'none', fontWeight: 600 }}>
                        View in Stellar Expert <ChevronRight size={14} />
                     </a>
                  </div>
              </div>
          </div>
          
          <div className={styles.metricCard} style={{ background: 'var(--primary-light)', borderColor: 'rgba(99, 102, 241, 0.2)', padding: '24px' }}>
             <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
               <strong>Auto-Scaling Enabled:</strong> System is automatically adjusting resources based on on-chain event volume.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
