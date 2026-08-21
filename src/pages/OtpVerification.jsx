import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CosmicParticleCanvas } from '../components/common/CosmicParticleCanvas';
import { WarpPortalOverlay } from '../components/common/WarpPortalOverlay';
import { sound } from '../utils/soundEffects';

export const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const { verifyOtp, logout } = useAuth();
  const { themeColor, themeAccent } = useTheme();
  const navigate = useNavigate();

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

    sound.playClick();
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
      sound.playClick();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      sound.playScan();
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
      setError('Please enter all 6 digits.');
      return;
    }

    sound.playClick();
    setLoading(true);

    setTimeout(() => {
      const result = verifyOtp(fullOtp);
      setLoading(false);

      if (result.success) {
        sound.playSuccess();
        setIsWarping(true);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1200);
      } else {
        setError(result.message || 'Invalid code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 400);
  };

  const handleResend = () => {
    if (!canResend) return;
    sound.playClick();
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-sans select-none">
      {/* Subtle Cosmic Background */}
      <CosmicParticleCanvas density={60} accentColor={themeColor} secondaryColor={themeAccent} />

      {/* Warp Transition */}
      <WarpPortalOverlay
        isWarping={isWarping}
        title="VERIFYING ACCESS"
        subtitle="Opening Dashboard Workspace..."
      />

      {/* Main 2FA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          borderColor: 'var(--primary-border)',
          boxShadow: `0 25px 80px rgba(0,0,0,0.8), 0 0 40px var(--primary-glow)`
        }}
        className="relative z-20 w-full max-w-md bg-[#0f1420]/85 backdrop-blur-2xl rounded-3xl border p-8 md:p-10 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => { sound.playClick(); logout(); }}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" style={{ color: 'var(--primary-accent)' }} />
            Back
          </button>
          <span
            className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border"
            style={{
              backgroundColor: 'var(--primary-subtle)',
              borderColor: 'var(--primary-border)',
              color: 'var(--primary-accent)'
            }}
          >
            Verification
          </span>
        </div>

        {/* Center Icon & Title */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
              boxShadow: `0 0 25px var(--primary-glow)`
            }}
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold font-display text-white mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Enter the 6-digit verification code to access your account.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </motion.div>
        )}

        {/* 6-Digit Matrix Input Grid */}
        <form onSubmit={handleSubmit}>
          <div
            onPaste={handlePaste}
            className="grid grid-cols-6 gap-2 sm:gap-3 mb-8"
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
                style={
                  digit
                    ? {
                        backgroundColor: 'var(--primary-subtle)',
                        borderColor: themeAccent,
                        boxShadow: `0 0 15px var(--primary-glow)`
                      }
                    : {}
                }
                className={`w-full h-13 sm:h-15 text-center text-xl font-mono font-bold rounded-2xl outline-none transition-all ${
                  digit
                    ? 'border-2 text-white'
                    : 'bg-[#080a0f] border border-white/15 focus:border-white text-white'
                }`}
              />
            ))}
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || isWarping}
            onMouseEnter={() => sound.playHover()}
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeAccent})`,
              boxShadow: `0 4px 25px var(--primary-glow)`
            }}
            className="w-full py-3.5 px-6 rounded-2xl text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : isWarping ? (
              <span>Entering...</span>
            ) : (
              <>
                <span>Verify & Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Resend Code Section */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              className="font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              style={{ color: 'var(--primary-accent)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Resend
            </button>
          ) : (
            <span className="text-slate-500 font-semibold">
              Resend in {resendTimer}s
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
