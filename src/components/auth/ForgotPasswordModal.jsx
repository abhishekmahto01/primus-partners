import React, { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [resetInput, setResetInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetInput.trim()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setResetInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <h2 className="text-xl font-bold text-[#2A2421] mb-1">Forgot Password?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter your registered User ID or email address to request a reset.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  User ID / Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={resetInput}
                    onChange={(e) => setResetInput(e.target.value)}
                    placeholder="Enter User ID or email"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C4A32] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/2 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#8C4A32] hover:bg-[#723b27] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#8C4A32]/20 transition-all"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Request Received</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Password reset functionality will be connected to the authentication service in the next phase.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-[#2A2421] text-white rounded-xl text-sm font-semibold hover:bg-[#38302B] transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
