'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/Dashboard.module.css';
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
      // 1. Start with simulated data or defaults
      let currentBalanceValue = parseFloat(localStorage.getItem('trustlance_mvp_balance') || '2500.00');
      let simulatedTransactions = JSON.parse(localStorage.getItem('trustlance_mvp_transactions') || '[]');
      
      // Save it if it didn't exist
      if (!localStorage.getItem('trustlance_mvp_balance')) {
        localStorage.setItem('trustlance_mvp_balance', currentBalanceValue.toString());
      }
      
      setBalance(currentBalanceValue.toFixed(2));
      setTransactions(simulatedTransactions);
      
      // 2. Fetch real data from Horizon
      console.log(`Connecting to Horizon for address: ${address}...`);
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}`);
      if (res.ok) {
        const data = await res.json();
        const nativeBalance = data.balances.find((b: any) => b.asset_type === 'native');
        if (nativeBalance) {
           // We'll merge real balance with our simulation for a more "filled" look
           const horizonBal = parseFloat(nativeBalance.balance);
           setBalance((currentBalanceValue + horizonBal).toFixed(2));
        }
        
        const otherBalance = data.balances.find((b: any) => b.asset_type !== 'native');
        if (otherBalance) {
           setUsdcBalance(parseFloat(otherBalance.balance).toFixed(2));
        }
      }
      
      const txRes = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}/payments?order=desc&limit=6`);
      if (txRes.ok) {
         const txData = await txRes.json();
         const horizonTxs = txData._embedded?.records || [];
         
         // Merge and sort all transactions by date
         let allTxs = [...simulatedTransactions, ...horizonTxs].sort((a,b) => 
           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
         );
         setTransactions(allTxs.slice(0, 8)); // Limit to last 8
      }
    } catch (error) {
      console.error("Error fetching wallet data, using simulated data instead.");
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
            // Robust display logic for real testnet and internal simulation
            const isInternal = !!tx.status;
            const isReceived = !isInternal && tx.to === walletAddress;
            const amount = tx.amount ? parseFloat(tx.amount).toFixed(2) : '0.00';
            
            // Labels and assets
            const displayType = isInternal ? tx.type : (isReceived ? 'Receive' : 'Send');
            const assetName = isInternal ? tx.asset : (tx.asset_type === 'native' ? 'XLM' : 'Token');
            const date = new Date(tx.created_at).toLocaleDateString();

            return (
              <div key={idx} className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
                <div className={styles.cellSubtext}>• {date}</div>
                <div className={styles.cellText}>
                  {displayType} {isInternal && <span style={{ fontSize: '10px', color: '#6366f1' }}>({tx.project})</span>}
                </div>
                <div className={styles.txAmountCol}>
                  <span className={(isReceived || (isInternal && tx.type === 'Refund')) ? styles.txPositive : styles.txNegative}>
                    {(isReceived || (isInternal && tx.type === 'Refund')) ? '+' : '-'} {amount} {assetName}
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
