'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ConnectWalletScreen from './ConnectWalletScreen';
import styles from '../app/Dashboard.module.css';
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
          <span>StellarTrust</span>
        </div>
        
        <nav className={styles.navMenu}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
            <LayoutDashboard size={20} className={pathname === '/' ? styles.activeIcon : ''} />
            Dashboard
          </Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname.startsWith('/projects') && pathname !== '/projects/create' ? styles.active : ''}`}>
            <FolderIcon size={20} className={pathname.startsWith('/projects') && pathname !== '/projects/create' ? styles.activeIcon : ''} />
            Projects
          </Link>
          <Link href="/projects/create" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/projects/create' ? styles.active : ''}`}>
            <CalendarPlus size={20} className={pathname === '/projects/create' ? styles.activeIcon : ''} />
            Create Project
          </Link>
          <Link href="/disputes" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/disputes' ? styles.active : ''}`}>
            <CheckSquare size={20} className={pathname === '/disputes' ? styles.activeIcon : ''} />
            Disputes
          </Link>
          <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/wallet' ? styles.active : ''}`}>
            <Wallet size={20} className={pathname === '/wallet' ? styles.activeIcon : ''} />
            Wallet
          </Link>
          <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/community' ? styles.active : ''}`}>
            <Users size={20} className={pathname === '/community' ? styles.activeIcon : ''} />
            Community
          </Link>
          <Link href="/monitoring" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.navItem} ${pathname === '/monitoring' ? styles.active : ''}`}>
             <Search size={20} className={pathname === '/monitoring' ? styles.activeIcon : ''} />
             Monitoring
          </Link>
        </nav>

        <div style={{ position: 'relative' }}>
          {isUserMenuOpen && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '16px',
              width: 'calc(100% - 32px)',
              marginBottom: '8px',
              backgroundColor: '#1e1e2d',
              border: '1px solid #2d2d3d',
              borderRadius: '12px',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              zIndex: 50,
              animation: 'slideUp 0.2s ease-out'
            }}>
              <div style={{ padding: '8px 12px', color: '#a0a0b2', fontSize: '13px', borderBottom: '1px solid #2d2d3d', marginBottom: '4px' }}>
                Connected as<br/>
                <strong style={{ color: '#ffffff', fontSize: '14px' }}>{walletAddress}</strong>
              </div>
              <button 
                className={styles.navItem} 
                style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', padding: '10px 12px', width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(false);
                  setTempUserName(userName);
                  setIsSettingsModalOpen(true);
                }}
              >
                Profile Settings
              </button>
              <button 
                 className={styles.navItem} 
                 style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', padding: '10px 12px', color: '#ef4444', width: '100%' }}
                 onClick={(e) => {
                   e.stopPropagation();
                   setIsUserMenuOpen(false);
                   handleDisconnect();
                 }}
              >
                Disconnect Wallet
              </button>
            </div>
          )}
          <div className={styles.userProfile} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <img 
              src={profilePicture} 
              alt="User avatar" 
              className={styles.avatar} 
            />
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userAddress}>{walletAddress}</p>
            </div>
            <ChevronRight className={styles.chevron} style={{ transform: isUserMenuOpen ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </div>
        </div>

        {/* Settings Modal Overlay */}
        {isSettingsModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(11, 11, 20, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
          }} onClick={() => setIsSettingsModalOpen(false)}>
            <div style={{
              backgroundColor: '#1a1a24', border: '1px solid #2d2d3d', borderRadius: '16px',
              padding: '32px', width: '500px', maxWidth: '90%', position: 'relative',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>
              <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: 600 }}>Profile Settings</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ position: 'relative', width: '88px', height: '88px' }}>
                  <img src={profilePicture} alt="Avatar" style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2d2d3d' }} />
                  <label style={{
                    position: 'absolute', bottom: -4, right: -4, width: '32px', height: '32px', 
                    backgroundColor: '#6366f1', border: '2px solid #1a1a24', borderRadius: '50%', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)', transition: 'transform 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <Camera size={16} color="#ffffff" />
                    <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleProfilePictureChange} />
                  </label>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '24px', color: '#fff', fontWeight: 600 }}>{userName}</h3>
                  <p style={{ margin: '4px 0 0 0', color: '#a0a0b2', fontSize: '15px' }}>Senior Frontend Engineer</p>
                  <label style={{ cursor: 'pointer', color: '#818cf8', fontSize: '13px', fontWeight: 500, marginTop: '8px', display: 'inline-block', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'} onMouseLeave={(e) => e.currentTarget.style.color = '#818cf8'}>
                    Upload new picture
                    <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleProfilePictureChange} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#a0a0b2', fontSize: '13px', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={tempUserName} onChange={e => setTempUserName(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#151521', border: '1px solid #2d2d3d', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#a0a0b2', fontSize: '13px', marginBottom: '6px' }}>Wallet Address</label>
                  <input type="text" readOnly value={fullWalletAddress} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#151521', border: '1px solid #2d2d3d', borderRadius: '8px', color: '#fff', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#a0a0b2', fontSize: '13px', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" defaultValue="james.carter@example.com" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#151521', border: '1px solid #2d2d3d', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#a0a0b2', fontSize: '13px', marginBottom: '6px' }}>Timezone</label>
                    <select style={{ width: '100%', padding: '10px 14px', backgroundColor: '#151521', border: '1px solid #2d2d3d', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}>
                      <option>UTC -8 (Pacific Time)</option>
                      <option>UTC +0 (London)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#a0a0b2', fontSize: '13px', marginBottom: '6px' }}>Base Currency</label>
                    <select style={{ width: '100%', padding: '10px 14px', backgroundColor: '#151521', border: '1px solid #2d2d3d', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}>
                      <option>ETH / USD</option>
                      <option>BTC / USD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button 
                  onClick={() => setIsSettingsModalOpen(false)}
                  style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #3d3d52', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setUserName(tempUserName);
                    setIsSettingsModalOpen(false);
                  }}
                  style={{ padding: '10px 20px', backgroundColor: '#6366f1', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTopMobile} style={{ display: 'flex', width: '100%', gap: '16px' }}>
            <button className={styles.menuButton} onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className={styles.searchContainer} style={{ flex: 1 }}>
              <Search className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search..." 
                className={styles.searchInput} 
              />
            </div>
          </div>
          <div className={styles.headerActions}>
            <div style={{ position: 'relative' }}>
              <button 
                className={styles.iconButton} 
                onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsExploreOpen(false); setIsUserMenuOpen(false); }}
              >
                 <Bell size={20} />
                 {hasUnreadNotifications && <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>}
              </button>
              {isNotificationsOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: '-40px', marginTop: '16px', width: '320px',
                  backgroundColor: '#1e1e2d', border: '1px solid #2d2d3d', borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 100, padding: '16px',
                  animation: 'slideUp 0.2s ease-out'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#fff' }}>Notifications</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#1a1a24', borderRadius: '8px', opacity: hasUnreadNotifications ? 1 : 0.6 }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', marginTop: '6px', opacity: hasUnreadNotifications ? 1 : 0 }}></div>
                      <div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 500 }}>Payment Released</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a0a0b2' }}>1.0 ETH received from Alice for Website Redesign.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#1a1a24', borderRadius: '8px', opacity: hasUnreadNotifications ? 1 : 0.6 }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#facc15', borderRadius: '50%', marginTop: '6px', opacity: hasUnreadNotifications ? 1 : 0 }}></div>
                      <div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: 500 }}>Milestone Action Required</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a0a0b2' }}>Please review Milestone 3 for Blockchain Integration.</p>
                      </div>
                    </div>
                  </div>
                  {hasUnreadNotifications && (
                    <button 
                      onClick={() => setHasUnreadNotifications(false)} 
                      style={{ width: '100%', marginTop: '12px', padding: '8px', background: 'none', border: 'none', color: '#818cf8', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div style={{ position: 'relative' }}>
              <button 
                className={styles.iconButton} 
                onClick={() => { setIsExploreOpen(!isExploreOpen); setIsNotificationsOpen(false); setIsUserMenuOpen(false); }}
              >
                 <Compass size={20} />
              </button>
              {isExploreOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: '-40px', marginTop: '16px', width: '220px',
                  backgroundColor: '#1e1e2d', border: '1px solid #2d2d3d', borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 100, padding: '8px',
                  animation: 'slideUp 0.2s ease-out'
                }}>
                  <div style={{ padding: '8px 12px', color: '#a0a0b2', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Explore</div>
                  <Link 
                    href="/freelancers"
                    className={styles.navItem} 
                    style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', padding: '10px 12px', width: '100%', display: 'block', textDecoration: 'none' }}
                    onClick={() => setIsExploreOpen(false)}
                  >
                    Browse Freelancers
                  </Link>
                  <Link 
                    href="/bounties"
                    className={styles.navItem} 
                    style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', padding: '10px 12px', width: '100%', display: 'block', textDecoration: 'none' }}
                    onClick={() => setIsExploreOpen(false)}
                  >
                    Open Bounties
                  </Link>
                  <a 
                    href="https://developers.stellar.org/docs/smart-contracts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navItem} 
                    style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', padding: '10px 12px', width: '100%', display: 'block', textDecoration: 'none' }}
                    onClick={() => setIsExploreOpen(false)}
                  >
                    Documentation
                  </a>
                </div>
              )}
            </div>
            <button className={styles.connectButton} onClick={handleDisconnect} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' }}>
               <Hexagon size={18} className={styles.connectIcon} />
               {walletAddress}
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
