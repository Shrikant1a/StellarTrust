'use client';

import React from 'react';
import styles from '../Dashboard.module.css';
import { Download, Upload, Filter } from 'lucide-react';

export default function WalletPage() {
  return (
    <>
      <div className={styles.pageHeader} style={{ marginBottom: '24px' }}>
        <h1 className={styles.sectionTitle}>Wallet</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div className={styles.tabsContainer}>
          <button className={`${styles.tabItem} ${styles.tabItemActive}`}>ETH</button>
          <button className={styles.tabItem}>ETH</button>
          <button className={styles.tabItem}>USD</button>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className={styles.secondaryButton} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}>
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
          <h2 className={styles.balanceAmount}>4.2 ETH</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.balanceSubtext}>Transactions</p>
          <h2 className={styles.balanceAmount} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            + 1.2 ETH
            <span style={{ fontSize: '16px', color: '#6c6c80' }}>›</span>
          </h2>
        </div>
      </div>

      <div className={styles.tableContainer} style={{ background: 'transparent', border: 'none', padding: '0 8px' }}>
        <div className={styles.tableHeader} style={{ gridTemplateColumns: '1.5fr 1fr 1fr', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', backgroundColor: '#2b2b3f', padding: '4px 8px', borderRadius: '4px' }}>ETH</span>
            <span style={{ color: '#3d3d52' }}>|</span>
            <span>USD</span>
            <span style={{ color: '#3d3d52' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Transactions <Filter size={12} /></span>
          </div>
          <div></div>
          <div></div>
        </div>

        {/* Tx 1 */}
        <div className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div className={styles.cellSubtext}>• Apr 21, 2024</div>
          <div className={styles.cellText}>Deposit</div>
          <div className={styles.txAmountCol}><span className={styles.txPositive}>+ 1.2 ETH</span></div>
        </div>

        {/* Tx 2 */}
        <div className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div className={styles.cellSubtext}>• Apr 18, 2024</div>
          <div className={styles.cellText}>Withdraw</div>
          <div className={styles.txAmountCol}><span className={styles.txNegative}>- 0.5 ETH</span></div>
        </div>

        {/* Tx 3 */}
        <div className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div className={styles.cellSubtext}>• Apr 16, 2024</div>
          <div className={styles.cellText}>Withdraw</div>
          <div className={styles.txAmountCol}><span className={styles.cellText} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>$1,200 <span style={{ color: '#6c6c80', fontSize: '12px' }}>›</span></span></div>
        </div>

        {/* Tx 4 */}
        <div className={styles.tableRow} style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div className={styles.cellSubtext}>• Apr 14, 2024</div>
          <div className={styles.cellText}>Deposit</div>
          <div className={styles.txAmountCol}><span className={styles.txPositive}>+ 0.3 ETH</span></div>
        </div>

      </div>
    </>
  );
}
