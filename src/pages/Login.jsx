import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login(userId, password);
      setLoading(false);

      if (result.success) {
        navigate('/otp-verification');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#14100E',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        backgroundColor: '#8C4A32',
        borderRadius: '50%',
        filter: 'blur(160px)',
        opacity: 0.2,
        pointerEvents: 'none'
      }} />

      {/* Main Container Card */}
      <div style={{
        maxWidth: '1100px',
        width: '100%',
        backgroundColor: '#211B18',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Hero Section */}
        <div style={{
          flex: '1',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#8C4A32',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '20px',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(140, 74, 50, 0.4)'
              }}>
                PP
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '0.5px', color: '#ffffff', margin: 0 }}>
                  PRIMUS PARTNERS
                </h1>
                <p style={{ fontSize: '10px', color: '#8C4A32', fontWeight: '700', tracking: '2px', textTransform: 'uppercase', margin: 0 }}>
                  Solutions for Tomorrow
                </p>
              </div>
            </div>

            {/* Platform Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(140, 74, 50, 0.15)',
              border: '1px solid rgba(140, 74, 50, 0.3)',
              color: '#E09F87',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} />
              HRMS Platform
            </div>

            {/* Description */}
            <h2 style={{ fontSize: '32px', fontWeight: '700', lineHeight: '1.2', color: '#ffffff', marginBottom: '16px' }}>
              Enterprise Human Resource Management
            </h2>
            <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', maxWidth: '420px' }}>
              Streamline employee operations, attendance, recruitment, and organizational workflows in one unified dashboard.
            </p>
          </div>

          <div style={{ fontSize: '12px', color: '#71717a', marginTop: '40px' }}>
            © 2026 Primus Partners HRMS • v1.0
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{
          width: '460px',
          padding: '56px 48px',
          backgroundColor: '#1C1715',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
              Sign In
            </h3>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
              Welcome back. Enter your credentials to access your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(225, 29, 72, 0.1)',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              color: '#fb7185',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User ID Field */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                User ID / Email
              </label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#71717a' }} />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    backgroundColor: '#14100E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#71717a' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 42px',
                    backgroundColor: '#14100E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#71717a',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#8C4A32',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(140, 74, 50, 0.3)',
                marginTop: '10px'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight style={{ width: '16px', height: '16px' }} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
