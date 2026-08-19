import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Globe,
  LogOut,
  ArrowLeft,
  UserCheck,
  Save,
  Maximize,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Only Onboarding Menu
export const HRMS_MENU_ITEMS = [
  {
    id: 'onboarding',
    title: 'Onboarding',
    icon: UserCheck,
    isPrimary: true,
    badge: 'Work Area',
    path: '/hrms/onboarding',
    subItems: [
      { id: 'candidate-pipeline', title: 'Candidate Pipeline', path: '/hrms/onboarding' },
      { id: 'new-hire-registration', title: 'New Hire Registration', path: '/hrms/onboarding' },
      { id: 'document-verification', title: 'Document Verification', path: '/hrms/onboarding' },
      { id: 'asset-allocation', title: 'Asset Allocation', path: '/hrms/onboarding' },
      { id: 'induction-checklist', title: 'Induction Checklist', path: '/hrms/onboarding' },
    ]
  }
];

export const HrmsLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenu, setExpandedMenu] = useState({ onboarding: true });
  const [selectedUnit, setSelectedUnit] = useState('Unit-2');
  const [timeStr, setTimeStr] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync expanded menu with current route
  useEffect(() => {
    HRMS_MENU_ITEMS.forEach(item => {
      if (location.pathname.includes(item.id) || (item.id === 'onboarding' && location.pathname === '/hrms')) {
        setExpandedMenu(prev => ({ ...prev, [item.id]: true }));
      }
    });
  }, [location.pathname]);

  const toggleMenu = (menuId) => {
    setExpandedMenu(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSaveState = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Filter menu items by search query
  const filteredMenuItems = HRMS_MENU_ITEMS.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = item.title.toLowerCase().includes(query);
    const matchesSub = item.subItems?.some(sub => sub.title.toLowerCase().includes(query));
    return matchesTitle || matchesSub;
  });

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      {/* TOP NAVBAR HEADER */}
      <header style={{
        height: '64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}>
        {/* Left: Hamburger & Clean HRMS Brand Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Hamburger Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '6px 8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              transition: 'all 0.15s ease'
            }}
            title="Toggle Sidebar Menu"
          >
            <Menu style={{ width: '20px', height: '20px' }} />
          </button>

          {/* Clean Portal Badge */}
          <div
            onClick={() => navigate('/hrms/onboarding')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              border: '1.5px solid #8C4A32',
              borderRadius: '10px',
              backgroundColor: 'rgba(140, 74, 50, 0.05)',
              cursor: 'pointer'
            }}
          >
            <span style={{
              fontSize: '15px',
              fontWeight: '800',
              color: '#8C4A32',
              letterSpacing: '-0.2px'
            }}>
              Primus Partners
            </span>
            <span style={{
              fontSize: '10px',
              fontWeight: '700',
              backgroundColor: '#8C4A32',
              color: '#ffffff',
              padding: '2px 6px',
              borderRadius: '6px',
              letterSpacing: '0.4px'
            }}>
              HRMS
            </span>
          </div>
        </div>

        {/* Center: Clean Spacer */}
        <div style={{ flex: 1 }} />

        {/* Right: Time, Unit Dropdown, Profile, Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Live Clock */}
          <div style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#334155',
            padding: '4px 10px',
            backgroundColor: '#f1f5f9',
            borderRadius: '6px',
            letterSpacing: '0.2px'
          }}>
            {timeStr || '8:30 PM'}
          </div>

          {/* Unit Dropdown Selector */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              style={{
                appearance: 'none',
                backgroundColor: '#ffffff',
                border: '1.5px solid #8C4A32',
                borderRadius: '20px',
                padding: '6px 30px 6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#8C4A32',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="Unit-1">Unit-1</option>
              <option value="Unit-2">Unit-2</option>
              <option value="Unit-3">Unit-3</option>
              <option value="Unit-4">Unit-4</option>
              <option value="HQ-Central">HQ Central</option>
            </select>
            <ChevronDown style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: '#8C4A32',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Globe / Language Icon */}
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer'
            }}
            title="Switch Language / Region"
          >
            <Globe style={{ width: '16px', height: '16px' }} />
          </button>

          {/* User Profile Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            padding: '3px 10px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#8C4A32',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', lineHeight: '1' }}>
                {user?.name || user?.username || 'Admin User'}
              </div>
            </div>
          </div>

          {/* Back to Portal / Main Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
            title="Return to Main Portal Dashboard"
          >
            <ArrowLeft style={{ width: '13px', height: '13px' }} />
            Main Portal
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#e11d48',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e11d48',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <LogOut style={{ width: '13px', height: '13px' }} />
            Logout
          </button>
        </div>
      </header>

      {/* BODY LAYOUT: SIDEBAR + MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* SIDEBAR NAVIGATION */}
        <aside style={{
          width: sidebarOpen ? '260px' : '0px',
          minWidth: sidebarOpen ? '260px' : '0px',
          backgroundColor: '#ffffff',
          borderRight: sidebarOpen ? '1px solid #e2e8f0' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
          boxShadow: '1px 0 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ width: '260px', padding: '16px 12px', boxSizing: 'border-box', height: '100%', overflowY: 'auto' }}>
            {/* Search menu... Input */}
            <div style={{
              position: 'relative',
              marginBottom: '16px'
            }}>
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#1e293b',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#8C4A32'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
              />
              <Search style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '15px',
                height: '15px',
                color: '#94a3b8'
              }} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    padding: 0
                  }}
                >
                  <X style={{ width: '14px', height: '14px' }} />
                </button>
              )}
            </div>

            {/* Menu List - Only Onboarding */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredMenuItems.map((item) => {
                const IconComponent = item.icon;
                const isExpanded = expandedMenu[item.id];
                const isActive = location.pathname.startsWith(item.path.split('?')[0]);
                const isPrimary = item.isPrimary;

                return (
                  <div key={item.id} style={{ marginBottom: '2px' }}>
                    {/* Menu Item Button */}
                    <div
                      onClick={() => {
                        toggleMenu(item.id);
                        if (item.path) {
                          navigate(item.path);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: isActive
                          ? (isPrimary ? 'rgba(140, 74, 50, 0.08)' : '#f1f5f9')
                          : 'transparent',
                        color: isActive
                          ? (isPrimary ? '#8C4A32' : '#0f172a')
                          : '#475569',
                        fontWeight: isActive ? '700' : '600',
                        fontSize: '13.5px',
                        transition: 'all 0.15s ease',
                        border: isPrimary && isActive ? '1px solid rgba(140, 74, 50, 0.2)' : '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconComponent style={{
                          width: '18px',
                          height: '18px',
                          color: isActive
                            ? (isPrimary ? '#8C4A32' : '#334155')
                            : '#64748b'
                        }} />
                        <span>{item.title}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.badge && (
                          <span style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            backgroundColor: '#8C4A32',
                            color: '#ffffff',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            letterSpacing: '0.2px'
                          }}>
                            {item.badge}
                          </span>
                        )}
                        {item.subItems && (
                          isExpanded ? (
                            <ChevronDown style={{ width: '15px', height: '15px', color: '#94a3b8' }} />
                          ) : (
                            <ChevronRight style={{ width: '15px', height: '15px', color: '#94a3b8' }} />
                          )
                        )}
                      </div>
                    </div>

                    {/* Submenu Items */}
                    {item.subItems && isExpanded && (
                      <div style={{
                        marginLeft: '26px',
                        paddingLeft: '10px',
                        borderLeft: '2px solid #e2e8f0',
                        marginTop: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}>
                        {item.subItems.map(sub => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <div
                              key={sub.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(sub.path);
                              }}
                              style={{
                                padding: '7px 10px',
                                borderRadius: '6px',
                                fontSize: '12.5px',
                                color: isSubActive ? '#8C4A32' : '#64748b',
                                fontWeight: isSubActive ? '700' : '500',
                                backgroundColor: isSubActive ? 'rgba(140, 74, 50, 0.08)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (!isSubActive) {
                                  e.currentTarget.style.color = '#1e293b';
                                  e.currentTarget.style.backgroundColor = '#f8fafc';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSubActive) {
                                  e.currentTarget.style.color = '#64748b';
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              {sub.title}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN OUTLET CONTAINER */}
        <main style={{
          flex: 1,
          padding: '24px 30px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Action Toolbar (Save, Fullscreen, Reload) */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              backgroundColor: '#ffffff',
              padding: '6px 18px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              {/* Save State Action */}
              <button
                onClick={handleSaveState}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  padding: '2px 4px'
                }}
                title="Save"
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#f3e8ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9333ea'
                }}>
                  <Save style={{ width: '13px', height: '13px' }} />
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#6b7280' }}>
                  {isSavedNotice ? 'Saved!' : 'Save'}
                </span>
              </button>

              {/* Fullscreen Action */}
              <button
                onClick={handleFullscreenToggle}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  padding: '2px 4px'
                }}
                title="Fullscreen"
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}>
                  <Maximize style={{ width: '13px', height: '13px' }} />
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#6b7280' }}>
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </span>
              </button>

              {/* Reload Action */}
              <button
                onClick={handleReload}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  padding: '2px 4px'
                }}
                title="Reload"
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#e0f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7'
                }}>
                  <RefreshCw style={{ width: '13px', height: '13px' }} />
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#6b7280' }}>
                  Reload
                </span>
              </button>
            </div>
          </div>

          {/* Blank Page Content Area */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
