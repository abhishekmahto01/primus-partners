import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, RotateCcw, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const { verifyOtp, logout } = useAuth();
  const navigate = useNavigate();

  // Focus first input on mount & start countdown timer
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = verifyOtp(fullOtp);
      setLoading(false);

      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError(result.message || 'Wrong OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 500);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#14100E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        backgroundColor: '#8C4A32',
        borderRadius: '50%',
        filter: 'blur(140px)',
        opacity: 0.2,
        pointerEvents: 'none'
      }} />

      {/* Main Card */}
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '36px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Back to Login
          </button>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#8C4A32',
            backgroundColor: 'rgba(140, 74, 50, 0.1)',
            padding: '4px 10px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Step 2 of 2
          </span>
        </div>

        {/* Title & Icon */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(140, 74, 50, 0.08)',
            border: '1px solid rgba(140, 74, 50, 0.15)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: '#8C4A32'
          }}>
            <ShieldCheck style={{ width: '28px', height: '28px' }} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: '0 0 6px 0' }}>
            Two-Factor Authentication
          </h2>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>
            Enter the 6-digit verification code sent to your registered contact.
          </p>
          <div style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: '600',
            color: '#8C4A32',
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            padding: '4px 12px',
            borderRadius: '8px',
            marginTop: '12px'
          }}>
            Static OTP for Demo: 123456
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            fontSize: '13px',
            fontWeight: '500',
            padding: '12px 14px',
            borderRadius: '12px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit}>
          <div 
            onPaste={handlePaste} 
            style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '24px' }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: '46px',
                  height: '54px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: digit ? '2px solid #8C4A32' : '1px solid #d1d5db',
                  backgroundColor: digit ? 'rgba(140, 74, 50, 0.04)' : '#f9fafb',
                  color: '#1f2937',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            ))}
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
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(140, 74, 50, 0.25)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Verifying OTP...' : 'Verify & Continue'}
            {!loading && <ArrowRight style={{ width: '16px', height: '16px' }} />}
          </button>
        </form>

        {/* Resend Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              style={{
                fontWeight: '700',
                color: '#8C4A32',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw style={{ width: '12px', height: '12px' }} /> Resend OTP
            </button>
          ) : (
            <span style={{ fontWeight: '600', color: '#9ca3af' }}>
              Resend in {resendTimer}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
