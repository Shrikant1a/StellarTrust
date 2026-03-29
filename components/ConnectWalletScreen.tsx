'use client';

import React, { useState } from 'react';
import { Hexagon, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
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
            localStorage.setItem('walletBrand', 'Freighter');
            onConnect();
          } else {
            alert('Failed to obtain access to Freighter. Please try again.');
            setSelectedWallet(null);
          }
        } else {
          alert('Freighter wallet is not installed. Please install the Freighter extension first to connect.');
          setSelectedWallet(null);
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        alert('An error occurred during wallet connection.');
        setSelectedWallet(null);
      }
    } else if (walletName === 'Albedo') {
      try {
        const albedo = (await import('@albedo-link/intent')).default;
        const result = await albedo.publicKey({});
        if (result.pubkey) {
          localStorage.setItem('walletAddress', result.pubkey);
          localStorage.setItem('walletBrand', 'Albedo');
          onConnect();
        } else {
          alert('Failed to authenticate with Albedo.');
          setSelectedWallet(null);
        }
      } catch (error) {
        console.error('Albedo connection error:', error);
        alert('An error occurred or connection was cancelled.');
        setSelectedWallet(null);
      }
    } else {
      // WalletConnect or fallback
      setTimeout(() => {
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
          <Hexagon size={40} className={styles.icon} strokeWidth={1.5} />
        </div>

        <h1 className={styles.title}>Welcome to StellarTrust</h1>
        <p className={styles.subtitle}>
          Connect your wallet to access decentralized escrow, seamless project management, and global freelancing.
        </p>

        <div className={styles.features}>
          <div className={styles.featureTag}>
            <Shield size={14} className={styles.featureIcon} />
            Secure Escrow
          </div>
          <div className={styles.featureTag}>
            <Zap size={14} className={styles.featureIcon} />
            Gasless TXs
          </div>
          <div className={styles.featureTag}>
            <Globe size={14} className={styles.featureIcon} />
            Cross-border
          </div>
        </div>

        <button
          className={styles.connectButton}
          onClick={() => setShowWalletModal(true)}
        >
          Connect Wallet <ArrowRight size={18} />
        </button>

        <div className={styles.footer}>
          <span>New to StellarTrust?</span>
          <a href="#" className={styles.link}>Learn how it works</a>
        </div>
      </div>

      {showWalletModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(11, 11, 20, 0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }} onClick={() => setShowWalletModal(false)}>
          <div style={{
            background: '#1a1a24', border: '1px solid #2d2d3d', borderRadius: '24px',
            padding: '32px', width: '400px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.5)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Connect a Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                style={{ background: 'none', border: 'none', color: '#a0a0b2', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            <button
              onClick={() => handleWalletSelect('Freighter')}
              disabled={selectedWallet !== null}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',
                background: selectedWallet === 'Freighter' ? 'rgba(99, 102, 241, 0.1)' : '#1e1e2d',
                border: `1px solid ${selectedWallet === 'Freighter' ? '#6366f1' : '#2d2d3d'}`,
                borderRadius: '12px', color: '#fff', fontSize: '16px', cursor: selectedWallet ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', opacity: selectedWallet && selectedWallet !== 'Freighter' ? 0.5 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⚓</div>
                <span style={{ fontWeight: 500 }}>Freighter</span>
              </div>
              {selectedWallet === 'Freighter' ? (
                <div className={styles.loader} style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
              ) : <span style={{ color: '#6366f1', fontSize: '13px', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '12px' }}>Popular</span>}
            </button>

            <button
              onClick={() => handleWalletSelect('Albedo')}
              disabled={selectedWallet !== null}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',
                background: selectedWallet === 'Albedo' ? 'rgba(99, 102, 241, 0.1)' : '#1e1e2d',
                border: `1px solid ${selectedWallet === 'Albedo' ? '#6366f1' : '#2d2d3d'}`,
                borderRadius: '12px', color: '#fff', fontSize: '16px', cursor: selectedWallet ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', opacity: selectedWallet && selectedWallet !== 'Albedo' ? 0.5 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#fff', color: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>A</div>
                <span style={{ fontWeight: 500 }}>Albedo</span>
              </div>
              {selectedWallet === 'Albedo' && <div className={styles.loader} style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>}
            </button>

            <button
              onClick={() => handleWalletSelect('WalletConnect')}
              disabled={selectedWallet !== null}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px',
                background: selectedWallet === 'WalletConnect' ? 'rgba(99, 102, 241, 0.1)' : '#1e1e2d',
                border: `1px solid ${selectedWallet === 'WalletConnect' ? '#6366f1' : '#2d2d3d'}`,
                borderRadius: '12px', color: '#fff', fontSize: '16px', cursor: selectedWallet ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', opacity: selectedWallet && selectedWallet !== 'WalletConnect' ? 0.5 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#fff' }}>W</div>
                <span style={{ fontWeight: 500 }}>WalletConnect</span>
              </div>
              {selectedWallet === 'WalletConnect' && <div className={styles.loader} style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
