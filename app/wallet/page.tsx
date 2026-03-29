'use client';

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { Download, Upload, Filter, RefreshCw, ExternalLink } from 'lucide-react';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('XLM');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0.00');
  const [usdcBalance, setUsdcBalance] = useState<string>('0.00');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
      fetchWalletData(address);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchWalletData = async (address: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}`);
      if (res.ok) {
        const data = await res.json();
        const nativeBalance = data.balances.find((b: any) => b.asset_type === 'native');
        if (nativeBalance) {
           setBalance(parseFloat(nativeBalance.balance).toFixed(2));
        }
        
        // Search for USDC or generic credit balances
        const otherBalance = data.balances.find((b: any) => b.asset_type !== 'native');
        if (otherBalance) {
           setUsdcBalance(parseFloat(otherBalance.balance).toFixed(2));
        }
      }
      
      const txRes = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}/payments?order=desc&limit=4`);
      if (txRes.ok) {
         const txData = await txRes.json();
         setTransactions(txData._embedded?.records || []);
      }
    } catch (error) {
      console.error("Error fetching wallet data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = () => {
    if (walletAddress) {
      window.open(`https://stellar.expert/explorer/testnet/account/${walletAddress}`, '_blank');
    } else {
      alert("Please connect your wallet first.");
    }
  };

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const currentDisplayedBalance = activeTab === 'XLM' ? balance : usdcBalance;

  return (
    <>
      <div className={styles.pageHeader} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className={styles.sectionTitle}>Wallet</h1>
        {walletAddress && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a0a0b2', fontSize: '13px' }}>
            <span>Connected: {truncateAddress(walletAddress)}</span>
            <button 
              onClick={() => fetchWalletData(walletAddress)} 
              style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Refresh Balance"
            >
              <RefreshCw size={14} className={loading ? styles.spin : ''} />
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabItem} ${activeTab === 'XLM' ? styles.tabItemActive : ''}`}
            onClick={() => setActiveTab('XLM')}
          >
            XLM
          </button>
          <button 
            className={`${styles.tabItem} ${activeTab === 'USDC' ? styles.tabItemActive : ''}`}
            onClick={() => setActiveTab('USDC')}
          >
            USDC
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={handleDeposit} className={styles.secondaryButton} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}>
            <Download size={16} />
            Deposit
          </button>
          <button className={styles.secondaryButton} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}>
            <Upload size={16} />
            Withdraw
          </button>
        </div>
      </div>

      <div className={styles.balanceCard}>
        <div>
          <p className={styles.balanceSubtext}>Current Balance</p>
          <h2 className={styles.balanceAmount}>
            {loading ? '...' : currentDisplayedBalance} {activeTab}
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.balanceSubtext}>Recent Activity</p>
          <h2 className={styles.balanceAmount} style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end', fontSize: '20px' }}>
            {transactions.length} Transactions
            <ExternalLink size={16} style={{ color: '#6c6c80', cursor: 'pointer' }} onClick={handleDeposit} />
          </h2>
        </div>
      </div>

      <div className={styles.tableContainer} style={{ background: 'transparent', border: 'none', padding: '0 8px' }}>
        <div className={styles.tableHeader} style={{ gridTemplateColumns: '1.5fr 1fr 1fr', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', backgroundColor: '#2b2b3f', padding: '4px 8px', borderRadius: '4px' }}>Date</span>
            <span style={{ color: '#3d3d52' }}>|</span>
            <span>Type</span>
            <span style={{ color: '#3d3d52' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Amount <Filter size={12} /></span>
          </div>
          <div></div>
          <div></div>
        </div>

        {loading ? (
           <div style={{ padding: '24px', textAlign: 'center', color: '#a0a0b2' }}>Loading transactions...</div>
        ) : transactions.length > 0 ? (
          transactions.map((tx, idx) => {
            // Simplified display logic
            const isReceived = tx.to === walletAddress;
            const amount = tx.amount ? parseFloat(tx.amount).toFixed(2) : '0.00';
            const asset = tx.asset_type === 'native' ? 'XLM' : 'Token';
            const date = new Date(tx.created_at).toLocaleDateString();

            return (
              <div key={idx} className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
                <div className={styles.cellSubtext}>• {date}</div>
                <div className={styles.cellText}>{isReceived ? 'Receive' : 'Send'}</div>
                <div className={styles.txAmountCol}>
                  <span className={isReceived ? styles.txPositive : styles.txNegative}>
                    {isReceived ? '+' : '-'} {amount} {asset}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
           <div style={{ padding: '24px', textAlign: 'center', color: '#a0a0b2' }}>
             {walletAddress ? 'No recent transactions found.' : 'Connect wallet to view transactions.'}
           </div>
        )}

      </div>
    </>
  );
}
