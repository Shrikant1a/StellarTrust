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
  Users
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
            background: 'rgba(99, 102, 241, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Contract ID</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <code style={{ fontSize: '11px', color: 'var(--primary)', opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {process.env.NEXT_PUBLIC_CONTRACT_ID || 'CBYN...6Y6Y'}
              </code>
              <Search size={14} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
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
