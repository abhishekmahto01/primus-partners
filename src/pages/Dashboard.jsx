import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [timeStr, setTimeStr] = useState('');

  // Real-time Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).toLowerCase();
      setTimeStr(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f4f6f8',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Navbar Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left: Brand Badge */}
        <div style={{
          border: '2px solid #8C4A32',
          color: '#8C4A32',
          fontWeight: '700',
          fontSize: '16px',
          padding: '6px 18px',
          borderRadius: '12px',
          backgroundColor: 'rgba(140, 74, 50, 0.06)'
        }}>
          Primus Partners
        </div>

        {/* Right: Actions & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Real-time Clock */}
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#374151' }}>
            {timeStr || '01:26:21 am'}
          </div>

          {/* User Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#f3f4f6',
            padding: '4px 14px 4px 6px',
            borderRadius: '50px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#8C4A32',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#1f2937', lineHeight: '1.2' }}>
                {user?.username || 'admin'}
              </div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '500' }}>
                Logged In
              </div>
            </div>
          </div>

          {/* Change Password Button */}
          <button style={{
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#374151',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Key style={{ width: '14px', height: '14px', color: '#6b7280' }} />
            Change Password
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: '#e11d48',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)'
            }}
          >
            <LogOut style={{ width: '14px', height: '14px' }} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {/* HRMS Module Card */}
          <div
            onClick={() => navigate('/hrms')}
            style={{
              width: '220px',
              height: '220px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              padding: '24px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Users style={{ width: '40px', height: '40px' }} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
              HRMS Module
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
