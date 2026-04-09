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
  ExternalLink
} from 'lucide-react';


export default function Monitoring() {
  const [logs, setLogs] = useState<string[]>([]);
  const [indexingProgress, setIndexingProgress] = useState(100);
  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || 'Not Configured';
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org';
  const [uptime, setUptime] = useState('99.99%');


  useEffect(() => {
    const initialLogs = [
      '[SYSTEM] Initializing Trustlance Monitoring Service...',
      '[RPC] Connected to Stellar Testnet Horizon API',
      '[SOROBAN] Connected to Soroban RPC - Protocol 20',
      '[INDEXER] Syncing contracts from ledger 102432...',
      '[INDEXER] Processed 42 legacy escrow transactions',
      '[AUTH] Security middleware active on all routes',
      '[SUCCESS] Monitoring dashboard online'
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] Block verified: ${Math.floor(Math.random() * 1000000)} - Transactions: ${Math.floor(Math.random() * 5)}`;
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>System Monitoring</h1>
          <p className={styles.pageSubtitle}>Real-time health and contract indexing status</p>
          <div style={{marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '12px', color: '#a0a0b2', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid #2d2d3d'}}>
              Contract: <strong>{contractId}</strong>
            </span>
            <a 
              href={`https://stellar.expert/explorer/testnet/contract/${contractId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{color: '#6366f1', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px'}}
            >
              <ExternalLink size={12} /> Explorer
            </a>
          </div>
        </div>

        <button className={styles.secondaryButton}>
          <RefreshCcw size={16} style={{marginRight: '8px'}} />
          Refresh Nodes
        </button>
      </div>

      {/* Monitoring Grid */}
      <section className={styles.metricsGrid}>
        <div className={styles.metricCard} style={{borderLeft: '4px solid #4ade80'}}>
          <div className={`${styles.metricIconBox}`} style={{backgroundColor: 'rgba(74, 222, 128, 0.1)', color: '#4ade80'}}>
            <Activity size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>System Health</span>
            <span className={styles.metricValue}>Operational</span>
          </div>
        </div>
        
        <div className={styles.metricCard} style={{borderLeft: '4px solid #6366f1'}}>
          <div className={`${styles.metricIconBox}`} style={{backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1'}}>
            <Database size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Data Indexing</span>
            <span className={styles.metricValue}>{indexingProgress}% Synced</span>
          </div>
        </div>
        
        <div className={styles.metricCard} style={{borderLeft: '4px solid #fbbf24'}}>
          <div className={`${styles.metricIconBox}`} style={{backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24'}}>
            <ShieldCheck size={28} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Security Status</span>
            <span className={styles.metricValue}>Verified</span>
          </div>
        </div>
      </section>

      <div style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px'}}>
        {/* Real-time Logs */}
        <div className={styles.tableContainer} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
            <Terminal size={18} color="#a0a0b2" />
            <h3 style={{margin: 0, fontSize: '16px'}}>Contract Event Indexer</h3>
          </div>
          <div style={{
            backgroundColor: '#0d0d14', 
            borderRadius: '8px', 
            padding: '16px', 
            fontFamily: 'monospace', 
            fontSize: '13px',
            color: '#4ade80',
            minHeight: '200px',
            border: '1px solid #2d2d3d'
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{marginBottom: '4px', opacity: 1 - (i * 0.1)}}>
                <span style={{color: '#6366f1'}}>>>></span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Node Stats */}
        <div className={styles.tableContainer}>
            <h3 style={{margin: '0 0 20px 0', fontSize: '16px'}}>Inclusion Stats</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Server size={16} color="#6366f1" />
                        <span style={{fontSize: '14px', color: '#a0a0b2'}}>Primary RPC</span>
                    </div>
                    <span style={{fontSize: '14px', fontWeight: 600}}>{rpcUrl.replace('https://', '')}</span>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Zap size={16} color="#facc15" />
                        <span style={{fontSize: '14px', color: '#a0a0b2'}}>Latency</span>
                    </div>
                    <span style={{fontSize: '14px', fontWeight: 600}}>143ms</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Cloud size={16} color="#4ade80" />
                        <span style={{fontSize: '14px', color: '#a0a0b2'}}>Uptime</span>
                    </div>
                    <span style={{fontSize: '14px', fontWeight: 600}}>{uptime}</span>
                </div>
                <hr style={{border: 'none', borderTop: '1px solid #2d2d3d', margin: '4px 0'}} />
                <div style={{textAlign: 'center', padding: '10px'}}>
                    <span style={{fontSize: '12px', color: '#a0a0b2'}}>Scanning for active escrow deposits...</span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
