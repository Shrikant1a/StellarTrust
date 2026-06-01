'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ConnectWalletScreen from './ConnectWalletScreen';
import styles from '@/app/Dashboard.module.css';
import { FEEDBACK_FORM_LINK } from '@/lib/constants';
import { 
  LayoutDashboard, 
  FolderIcon, 
  CalendarPlus, 
  CheckSquare, 
  Wallet, 
  Search, 
  Bell, 
  Compass, 
  Hexagon,
  ChevronRight,
  Zap,
  Camera,
  Menu,
  Users,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [profilePicture, setProfilePicture] = useState('https://i.pravatar.cc/150?img=11');
  const [userName, setUserName] = useState('James Carter');
  const [tempUserName, setTempUserName] = useState('James Carter');
  const [walletAddress, setWalletAddress] = useState('0x1234...5678');
  const [fullWalletAddress, setFullWalletAddress] = useState('0x1234567890abcdef1234567890abcdef12345678');

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Simple persistence for demo purposes
  useEffect(() => {
    const connected = localStorage.getItem('walletConnected');
    if (connected === 'true') {
      setIsWalletConnected(true);
      const address = localStorage.getItem('walletAddress');
      if (address) {
        setFullWalletAddress(address);
        setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
      }
    }
  }, []);

  const handleConnect = () => {
    setIsWalletConnected(true);
    // Address is set in ConnectWalletScreen, so we sync it here
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setFullWalletAddress(address);
      setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
    }
  };

  const handleDisconnect = () => {
    setIsWalletConnected(false);
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBrand');
    setWalletAddress('0x1234...5678');
    setFullWalletAddress('0x1234567890abcdef1234567890abcdef12345678');
  };

  if (!isWalletConnected) {
    return <ConnectWalletScreen onConnect={handleConnect} />;
  }

  return (
    <div className={styles.container}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logoContainer}>
          <Zap className={styles.logoIcon} fill="currentColor" size={24} />
          <span>Trustlance</span>
        </div>

        <nav className={styles.navMenu}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
            <LayoutDashboard size={20} className={styles.navIcon} />
            Dashboard
          </Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname.startsWith('/projects') && pathname !== '/projects/create' ? styles.active : ''}`}>
            <FolderIcon size={20} className={styles.navIcon} />
            Projects
          </Link>
          <Link href="/projects/create" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/projects/create' ? styles.active : ''}`}>
            <CalendarPlus size={20} className={styles.navIcon} />
            Create Project
          </Link>
          <Link href="/disputes" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/disputes' ? styles.active : ''}`}>
            <CheckSquare size={20} className={styles.navIcon} />
            Disputes
          </Link>
          <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/wallet' ? styles.active : ''}`}>
            <Wallet size={20} className={styles.navIcon} />
            Wallet
          </Link>
          <Link href="/monitoring" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/monitoring' ? styles.active : ''}`}>
             <Search size={20} className={styles.navIcon} />
             Monitoring
          </Link>
        </nav>

        <div style={{ padding: '20px' }}>
          {/* User Profile Trigger */}
          <div className={styles.userProfile} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <img src={profilePicture} alt="User avatar" className={styles.avatar} />
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userAddress}>{walletAddress}</p>
            </div>
            <ChevronRight className={styles.chevron} style={{ transform: isUserMenuOpen ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </div>
          
          {/* On-Chain Contract Info */}
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'rgba(129, 140, 248, 0.03)',
            border: '1px solid rgba(129, 140, 248, 0.15)',
            borderRadius: '16px',
            boxShadow: 'inset 0 0 12px rgba(129, 140, 248, 0.02)'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-success)', boxShadow: '0 0 6px var(--accent-success)' }}></span>
              Soroban Escrow
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <code style={{ fontSize: '11px', color: 'var(--primary)', opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', fontFamily: 'monospace' }}>
                CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y
              </code>
              <a 
                href="https://stellar.expert/explorer/testnet/contract/CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '11px', color: '#ffffff', textDecoration: 'none', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px',
                  opacity: 0.8
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
              >
                View Explorer ↗
              </a>
            </div>
          </div>
        </div>

        {/* User Menu Modal (simplified style for now, can be further refined) */}
        {isUserMenuOpen && (
           <div style={{
             position: 'absolute', bottom: '100px', left: '20px', width: '240px',
             backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)',
             borderRadius: '16px', padding: '12px', boxShadow: 'var(--shadow-lg)', zIndex: 100,
             backdropFilter: 'blur(20px)', animation: 'slideUp 0.3s ease-out'
           }}>
             <button className={styles.navItem} style={{ width: '100%', marginBottom: '4px' }} onClick={() => { setIsSettingsModalOpen(true); setIsUserMenuOpen(false); }}>Profile Settings</button>
             <button className={styles.navItem} style={{ width: '100%', color: 'var(--accent-danger)' }} onClick={handleDisconnect}>Disconnect</button>
           </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Global On-Chain Sticky Alert Banner */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(129, 140, 248, 0.12), rgba(192, 132, 252, 0.03))',
          border: '1px solid rgba(129, 140, 248, 0.22)',
          borderRadius: '16px',
          padding: '12px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          animation: 'slideUp 0.4s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              display: 'inline-flex', padding: '4px 8px', borderRadius: '8px', 
              background: 'rgba(52, 211, 153, 0.15)', color: 'var(--accent-success)', 
              fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' 
            }}>
              Testnet Active
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Stellar Escrow Contract: <strong style={{ color: '#ffffff', fontFamily: 'monospace' }}>CBYNQF3RPZ...524SF6Y6Y</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y');
                alert('Contract address copied!');
              }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#ffffff', padding: '6px 12px', borderRadius: '10px', fontSize: '11px',
                fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            >
              <Copy size={12} />
              Copy
            </button>
            <a 
              href="https://stellar.expert/explorer/testnet/contract/CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                color: '#ffffff', padding: '6px 14px', borderRadius: '10px', fontSize: '11px',
                fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'flex',
                alignItems: 'center', gap: '6px', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ExternalLink size={12} />
              Explorer
            </a>
          </div>
        </div>

        {/* Header */}
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <button className={styles.menuButton} onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input type="text" placeholder="Search projects or transactions..." className={styles.searchInput} />
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <Bell size={20} />
            </button>
            <button className={styles.iconButton}>
              <Compass size={20} />
            </button>
            <a href={FEEDBACK_FORM_LINK} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton} style={{ textDecoration: 'none' }}>
              Feedback
            </a>
            <button className={styles.connectButton} onClick={() => {
              navigator.clipboard.writeText(fullWalletAddress);
              alert('Wallet address copied to clipboard!');
            }}>
               <Hexagon size={18} />
               {walletAddress}
            </button>
          </div>
        </header>

        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Settings Modal (Minimalist version) */}
      {isSettingsModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', zIndex: 1000
        }} onClick={() => setIsSettingsModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)',
            padding: '40px', borderRadius: '32px', width: '500px', maxWidth: '90%',
            animation: 'slideUp 0.4s ease-out'
          }} onClick={e => e.stopPropagation()}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <p className={styles.pageSubtitle}>Manage your public identity and settings.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={profilePicture} style={{ width: '80px', height: '80px', borderRadius: '24px' }} />
                <button className={styles.detailsButton}>Change Photo</button>
              </div>
              <input className={styles.searchInput} style={{ width: '100%' }} defaultValue={userName} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button className={styles.detailsButton} onClick={() => setIsSettingsModalOpen(false)}>Close</button>
                <button className={styles.connectButton}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
