import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Key,
  Lock,
  Zap,
  Radio,
  Cpu,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
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

  const handleQuickFillDemo = () => {
    sound.playScan();
    const demoCode = ['1', '2', '3', '4', '5', '6'];
    setOtp(demoCode);
    setError('');
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter all 6 digits of the Quantum 2FA Key.');
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
        }, 1400);
      } else {
        setError(result.message || 'Quantum signature mismatch. Key expired or invalid.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 500);
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
      {/* 60FPS Cosmic Background */}
      <CosmicParticleCanvas density={75} accentColor="#8C4A32" secondaryColor="#38bdf8" />

      {/* Fullscreen Warp Speed Portal to Dashboard */}
      <WarpPortalOverlay
        isWarping={isWarping}
        title="ACCESS GRANTED • WARPING TO UNIVERSE"
        subtitle="Unlocking Quantum Command Matrix • Personnel Clearance Confirmed"
      />

      {/* Main 2FA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 w-full max-w-lg bg-[#0f1420]/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(140,74,50,0.25)] p-8 md:p-10 overflow-hidden"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8C4A32] via-[#f97316] to-transparent animate-pulse" />

        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => { sound.playClick(); logout(); }}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#f97316]" />
            Abort & Return
          </button>
          <span className="text-[10px] font-mono font-bold uppercase bg-[#8C4A32]/25 text-[#f97316] border border-[#8C4A32]/50 px-3 py-1 rounded-full shadow-inner">
            Quantum Gate 2 of 2
          </span>
        </div>

        {/* Center Quantum Security Ring & Glyph */}
        <div className="text-center mb-8 relative">
          <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            {/* Spinning Neon Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#8C4A32]/60 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute -inset-1 rounded-full border border-[#f97316]/30 animate-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8C4A32] to-[#b45309] flex items-center justify-center text-white shadow-[0_0_25px_rgba(140,74,50,0.6)]">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black font-display text-white mb-2">
            Quantum 2FA Gateway
          </h2>
          <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
            Input the 6-digit dynamic cryptographic key generated for your security profile.
          </p>

          {/* Quick Demo Bypass Chip */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleQuickFillDemo}
              onMouseEnter={() => sound.playHover()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold hover:bg-amber-500/20 transition-all cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              Auto-Fill Demo Code (123456)
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono mb-6 flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </motion.div>
        )}

        {/* 6-Digit Matrix Input Grid */}
        <form onSubmit={handleSubmit}>
          <div
            onPaste={handlePaste}
            className="grid grid-cols-6 gap-2.5 sm:gap-3.5 mb-8"
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
                className={`w-full h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-extrabold rounded-2xl outline-none transition-all ${
                  digit
                    ? 'bg-[#8C4A32]/25 border-2 border-[#f97316] text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                    : 'bg-[#080a0f] border border-white/15 focus:border-[#f97316] text-white'
                }`}
              />
            ))}
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || isWarping}
            onMouseEnter={() => sound.playHover()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8C4A32] via-[#b45309] to-[#f97316] hover:from-[#9d5339] hover:to-[#ea580c] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(140,74,50,0.5)] hover:shadow-[0_4px_35px_rgba(249,115,22,0.7)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span>Validating 2FA Matrix...</span>
            ) : isWarping ? (
              <span>Unlocking Universe...</span>
            ) : (
              <>
                <span>Verify & Enter Universe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Resend Code Section */}
        <div className="mt-6 text-center text-xs font-mono text-slate-400">
          Didn't receive the quantum token?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              className="font-bold text-[#f97316] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-transmit Code
            </button>
          ) : (
            <span className="text-slate-500 font-semibold">
              Re-transmit available in {resendTimer}s
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
