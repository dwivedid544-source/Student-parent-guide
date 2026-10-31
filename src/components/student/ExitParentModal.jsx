import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, X } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export const ExitParentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { switchRole } = useOnboarding();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '0000' || pin.length === 4) {
      switchRole('PARENT');
      onClose();
      navigate('/parent/dashboard');
    } else {
      setError('Please enter a valid 4-digit Parent PIN (Demo code: 0000)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-black/30 hover:border-black/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative transition-all">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#737A73] hover:text-[#202923] hover:bg-[#F1EDE2] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center mb-4 shadow-2xs">
          <ShieldCheck className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#202923] tracking-tight">
          Parent Security Gate
        </h3>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1 leading-relaxed">
          Enter your 4-digit Parent PIN to safely exit Student Mode and access the Parent Control Hub.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[#202923] block mb-1.5 pl-1">
              Security PIN
            </label>
            <input
              type="password"
              maxLength={4}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••"
              className="w-full py-3 px-4 text-center text-2xl font-bold tracking-widest rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 focus:border-black/60 text-[#202923] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all shadow-xs"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium pl-1">{error}</p>
          )}

          <div className="p-2.5 rounded-xl bg-[#F1EDE2] border border-black/20 text-[#737A73] text-[11px] text-center shadow-2xs">
            Demo Security Code: <strong className="text-[#193F30]">0000</strong> or any 4 digits
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-[#202923] bg-white border border-black/30 hover:border-black/50 hover:bg-[#F1EDE2] transition-all cursor-pointer shadow-xs"
            >
              Stay in Student Mode
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 hover:border-black/50 transition-all shadow-xs cursor-pointer"
            >
              Unlock Parent Hub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExitParentModal;
