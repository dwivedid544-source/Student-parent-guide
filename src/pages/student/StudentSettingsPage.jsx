import React, { useState } from 'react';
import { Settings, Lock, ShieldCheck, Bell, Eye, EyeOff, Check } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export const StudentSettingsPage = () => {
  const { activeChild, updateChild } = useOnboarding();

  const [currentPin, setCurrentPin] = useState(activeChild?.pin || '1234');
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [pinError, setPinError] = useState('');

  // Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [shareMilestones, setShareMilestones] = useState(true);

  const handleUpdatePin = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setPinError('PIN must be exactly 4 numeric digits');
      return;
    }
    updateChild(activeChild.id, { pin: newPin });
    setCurrentPin(newPin);
    setNewPin('');
    setPinError('');
    setPinSuccess(true);
    setTimeout(() => setPinSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
          Account & Privacy Settings
        </h2>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1">
          Control your access security, notification preferences, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Security PIN Change */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-black/20">
            <div className="w-10 h-10 rounded-2xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#202923]">
                Student Access PIN
              </h3>
              <p className="text-xs text-[#737A73]">
                This 4-digit code is used to unlock your Student Sanctuary from the login screen.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePin} className="max-w-md space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-[#202923] block mb-1">
                  Active PIN
                </label>
                <div className="py-2.5 px-4 rounded-full bg-[#F8F7F2] border border-black/30 text-xs font-mono font-bold text-[#202923] shadow-2xs">
                  •••• ({currentPin})
                </div>
              </div>

              <div className="flex-1">
                <label className="text-xs font-semibold text-[#202923] block mb-1">
                  New 4-Digit PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  className="w-full py-2.5 px-4 text-xs font-mono font-bold tracking-widest rounded-full bg-[#F8F7F2] border border-black/30 hover:border-black/50 text-[#202923] focus:outline-none focus:border-black shadow-2xs transition-all"
                />
              </div>
            </div>

            {pinError && (
              <p className="text-xs text-red-600 font-medium">{pinError}</p>
            )}

            {pinSuccess && (
              <div className="p-2.5 rounded-xl bg-[#EDF2EC] border border-black/30 text-[#193F30] text-xs font-semibold flex items-center gap-2 shadow-2xs">
                <Check className="w-4 h-4" />
                <span>Security PIN updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!newPin}
              className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-[#193F30] hover:bg-[#204936] border border-black/30 hover:border-black/50 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            >
              Update PIN
            </button>
          </form>
        </div>

        {/* Privacy & Consent Transparency */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs transition-all space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-black/20">
            <div className="w-10 h-10 rounded-2xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#202923]">
                Privacy & Data Consent
              </h3>
              <p className="text-xs text-[#737A73]">
                HighOrbit guarantees complete student autonomy and non-punitive transparency.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#202923]">
            <label className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 flex items-center justify-between cursor-pointer shadow-2xs transition-all">
              <div className="space-y-0.5">
                <span className="font-bold block">Private Daily Reflection Journaling</span>
                <span className="text-[#737A73] text-[11px] block">
                  Your private reflection text is 100% confidential and is never shared with third parties or advertisers.
                </span>
              </div>
              <span className="text-xs font-bold text-[#193F30] bg-[#EDF2EC] border border-black/20 px-3 py-1 rounded-full shadow-2xs">
                Encrypted
              </span>
            </label>

            <label className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 flex items-center justify-between cursor-pointer shadow-2xs transition-all">
              <div className="space-y-0.5">
                <span className="font-bold block">Parent Bridge Summary Sharing</span>
                <span className="text-[#737A73] text-[11px] block">
                  Allow your parent portal to celebrate completed milestones, habit streaks, and task completions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={shareMilestones}
                onChange={(e) => setShareMilestones(e.target.checked)}
                className="w-4 h-4 rounded text-[#193F30] accent-[#193F30] cursor-pointer"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-black/30 hover:border-black/50 flex items-center justify-between cursor-pointer shadow-2xs transition-all">
              <div className="space-y-0.5">
                <span className="font-bold block">Daily Growth Routine Reminders</span>
                <span className="text-[#737A73] text-[11px] block">
                  Receive gentle morning and evening prompts for mindful habit check-ins.
                </span>
              </div>
              <input
                type="checkbox"
                checked={dailyReminders}
                onChange={(e) => setDailyReminders(e.target.checked)}
                className="w-4 h-4 rounded text-[#193F30] accent-[#193F30] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettingsPage;
