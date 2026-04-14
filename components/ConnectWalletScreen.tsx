'use client';

import React, { useState } from 'react';
import { Hexagon, Zap, Shield, Globe, ArrowRight, X } from 'lucide-react';
import styles from './ConnectWallet.module.css';
import { isConnected, requestAccess } from '@stellar/freighter-api';

interface ConnectWalletScreenProps {
  onConnect: () => void;
}

export default function ConnectWalletScreen({ onConnect }: ConnectWalletScreenProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleWalletSelect = async (walletName: string) => {
    setSelectedWallet(walletName);
    
    if (walletName === 'Freighter') {
      try {
        const checkInstalled = await isConnected();
        if (checkInstalled.isConnected) {
          const access = await requestAccess();
          if (access.address) {
            localStorage.setItem('walletAddress', access.address);
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletBrand', 'Freighter');
            onConnect();
          } else {
            alert('Failed to obtain access to Freighter.');
            setSelectedWallet(null);
          }
        } else {
          alert('Freighter wallet is not installed.');
          setSelectedWallet(null);
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        setSelectedWallet(null);
      }
    } else {
      // Mock for others
      setTimeout(() => {
        localStorage.setItem('walletAddress', 'G...RDY');
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletBrand', walletName);
        onConnect();
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>

      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <Hexagon size={48} className={styles.icon} strokeWidth={1} fill="currentColor" />
        </div>

        <h1 className={styles.title}>Trustlance</h1>
        <p className={styles.subtitle}>
          The institutional-grade milestone escrow protocol powering the future of decentralized work.
        </p>

        <div className={styles.features}>
          <div className={styles.featureTag}>
            <Shield size={14} className={styles.featureIcon} />
            On-Chain Arbitration
          </div>
          <div className={styles.featureTag}>
            <Zap size={14} className={styles.featureIcon} />
            Soroban Powered
          </div>
          <div className={styles.featureTag}>
            <Globe size={14} className={styles.featureIcon} />
            Zero Settlement Risk
          </div>
        </div>

        <button
          className={styles.connectButton}
          onClick={() => setShowWalletModal(true)}
        >
          Initialize Protocol <ArrowRight size={18} />
        </button>

        <div className={styles.footer}>
          <span>Governed by Stellar.</span>
          <a href="#" className={styles.link}>Read the Docs</a>
        </div>
      </div>

      {showWalletModal && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(20px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out'
        }} onClick={() => setShowWalletModal(false)}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '32px',
            padding: '40px', width: '440px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '24px',
            boxShadow: 'var(--shadow-glass)', animation: 'slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Connect Wallet</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-muted)' }}>Securely authenticate with your provider.</p>
              </div>
              <button 
                onClick={() => setShowWalletModal(false)}
                style={{ background: 'var(--surface-hover)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '10px', borderRadius: '12px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Freighter', icon: '⚓', color: '#000', label: 'Recommended' },
                { name: 'Albedo', icon: 'A', color: '#fff', label: 'Web-based' },
                { name: 'Stellar Wallet Kit', icon: 'W', color: 'var(--primary)', label: 'Multi-wallet' }
              ].map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletSelect(wallet.name)}
                  disabled={selectedWallet !== null}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                    background: selectedWallet === wallet.name ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${selectedWallet === wallet.name ? 'var(--primary)' : 'var(--surface-border)'}`,
                    borderRadius: '20px', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600,
                    cursor: selectedWallet ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                    opacity: selectedWallet && selectedWallet !== wallet.name ? 0.3 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {wallet.icon}
                    </div>
                    <span>{wallet.name}</span>
                  </div>
                  {selectedWallet === wallet.name ? (
                    <div className={styles.loader}></div>
                  ) : <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>{wallet.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
