import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  Sparkles,
  Check,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useStudent } from '../../context/StudentContext';

const routeTitleMap = {
  '/child/dashboard': 'Dashboard Overview',
  '/child/assignments': 'My Assignments',
  '/child/activities': 'My Activities & Habit Routine',
  '/child/self-assessment': 'Self-Assessment & Mindset',
  '/child/personality': 'My Personality & Strengths',
  '/child/wellness': 'Focus & Wellness Studio',
  '/child/growth': 'My Growth & Milestones',
  '/child/achievements': 'My Achievements & Badges',
  '/child/ai-studio': 'AI Learning Studio',
  '/child/notifications': 'Notifications & Mentor Notes',
  '/child/profile': 'My Student Profile',
  '/child/settings': 'Account & Privacy Settings',
  '/child/help': 'Help & Support Center',
};

export const StudentHeader = ({ onToggleSidebar, onOpenExitParent }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeChild, logout } = useOnboarding();
  const { notifications, unreadCount, markAllNotificationsRead, markNotificationRead, deleteNotification } = useStudent();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const currentPath = location.pathname;
  const currentTitle = routeTitleMap[currentPath] || 'Student Sanctuary';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/80 backdrop-blur-xl border-b border-[#E6DEFF] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile Menu Toggle + Title & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#1b1831] hover:bg-[#F3EFFF] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6A6678]">
            <Link to="/child/dashboard" className="hover:text-primary transition-colors">
              Student
            </Link>
            <ChevronRight className="w-3 h-3 text-[#6A6678]" />
            <span className="text-[#1b1831] font-semibold">{currentTitle}</span>
          </div>

          {/* Current Page Title */}
          <h1 className="text-lg sm:text-xl font-extrabold text-[#1b1831] tracking-tight leading-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right: Notifications, Student Avatar, Profile Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="p-2 rounded-full text-[#6A6678] hover:text-primary hover:bg-[#F3EFFF] transition-all relative cursor-pointer"
            aria-label="Open notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#E6DEFF] shadow-xl py-3 z-50 animate-fadeIn">
              <div className="px-4 pb-2 border-b border-[#E6DEFF] flex items-center justify-between">
                <span className="text-sm font-bold text-[#1b1831]">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-black/20">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#6A6678]">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 transition-colors cursor-pointer flex flex-col gap-1 hover:bg-[#F8F7F2] ${
                        !n.read ? 'bg-[#F3EFFF]/50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1b1831]">{n.title}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#6A6678]">{n.time}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(n.id);
                            }}
                            className="p-1 rounded text-[#6A6678] hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete notification"
                            aria-label={`Delete notification ${n.title}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#6A6678] leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 px-4 border-t border-[#E6DEFF] text-center">
                <Link
                  to="/child/notifications"
                  onClick={() => setNotifDropdownOpen(false)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View all updates →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Student Avatar & Display Name Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#F3EFFF] border border-transparent hover:border-[#E6DEFF] transition-all cursor-pointer"
          >
            {/* Student Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              {activeChild?.nickname?.charAt(0) || activeChild?.name?.charAt(0) || 'S'}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#1b1831] leading-tight truncate max-w-[120px]">
                {activeChild?.nickname || activeChild?.name || 'Explorer'}
              </span>
              <span className="text-[10px] text-[#6A6678] leading-none">
                Student Mode
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#6A6678]" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E6DEFF] shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-[#E6DEFF]">
                <p className="text-xs font-bold text-[#1b1831] truncate">
                  {activeChild?.name || 'Explorer'}
                </p>
                <p className="text-[11px] text-[#6A6678]">
                  Grade: {activeChild?.grade || 'High School'}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/child/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1b1831] hover:bg-[#F3EFFF] hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4 text-[#6A6678]" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/child/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1b1831] hover:bg-[#F3EFFF] hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#6A6678]" />
                  <span>Settings</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenExitParent();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#1b1831] hover:bg-[#F3EFFF] hover:text-primary transition-colors text-left cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Exit to Parent Hub</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#E6DEFF]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default StudentHeader;
