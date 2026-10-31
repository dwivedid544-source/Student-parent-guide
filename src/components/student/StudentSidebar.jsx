import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Target,
  Sparkles,
  HeartPulse,
  TrendingUp,
  Award,
  Cpu,
  Bell,
  User,
  Settings,
  HelpCircle,
  ShieldAlert,
  X,
  LogOut
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useOnboarding } from '../../context/OnboardingContext';

export const StudentSidebar = ({ isOpen, onClose, onOpenExitParent, collapsed = false }) => {
  const { unreadCount } = useStudent();
  const { activeChild, parentAccount } = useOnboarding();

  const navItems = [
    { name: 'Dashboard', path: '/child/dashboard', icon: LayoutDashboard },
    { name: 'My Assignments', path: '/child/assignments', icon: CheckSquare },
    { name: 'My Activities', path: '/child/activities', icon: ListTodo },
    { name: 'Self-Assessment', path: '/child/self-assessment', icon: Target },
    { name: 'My Personality', path: '/child/personality', icon: Sparkles },
    { name: 'Focus & Wellness', path: '/child/wellness', icon: HeartPulse },
    { name: 'My Growth', path: '/child/growth', icon: TrendingUp },
    { name: 'My Achievements', path: '/child/achievements', icon: Award },
    { name: 'AI Learning Studio', path: '/child/ai-studio', icon: Cpu },
    { name: 'Notifications', path: '/child/notifications', icon: Bell, badge: unreadCount },
    { name: 'My Profile', path: '/child/profile', icon: User },
    { name: 'Settings', path: '/child/settings', icon: Settings },
    { name: 'Help & Support', path: '/child/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#F8F7F2] border-r border-black/40 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'w-20' : 'w-64 sm:w-72'}
        `}
      >
        {/* Top Header / Branding */}
        <div className="h-16 px-4 sm:px-5 flex items-center justify-between bg-[#F8F7F2]">
          <Link
            to="/child/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group overflow-hidden"
          >
            <div className="w-9 h-9 rounded-full bg-[#193F30] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#204936] transition-colors">
              <Compass className="w-5 h-5 text-[#EDF2EC]" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#202923] leading-none">
                  HighOrbit
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#737A73] mt-1">
                  Student Sanctuary
                </span>
              </div>
            )}
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-[#737A73] hover:text-[#202923] hover:bg-[#E5E0D5] transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 no-scrollbar">
          {!collapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-[#737A73]">
              Workspace
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group relative
                  ${isActive
                    ? 'bg-[#193F30] text-white font-semibold shadow-xs'
                    : 'text-[#202923] hover:bg-[#EDF2EC] hover:text-[#193F30]'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-[#737A73] group-hover:text-[#193F30]'
                      }`}
                    />

                    {!collapsed && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}

                    {!collapsed && item.badge > 0 && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#9CCDB0] text-[#193F30]'
                            : 'bg-[#193F30] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {collapsed && item.badge > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#193F30]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section: Active Student Card & Parent Exit */}
        <div className="p-3 border-t border-black/40 space-y-2 bg-[#F8F7F2]">
          {!collapsed ? (
            <div className="p-2.5 rounded-2xl bg-white border border-black/30 hover:border-black/50 flex items-center justify-between gap-2 shadow-xs transition-all">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center font-bold text-xs shrink-0">
                  {activeChild?.nickname?.charAt(0) || activeChild?.name?.charAt(0) || 'S'}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-[#202923] truncate">
                    {activeChild?.nickname || activeChild?.name || 'Explorer'}
                  </span>
                  <span className="text-[10px] text-[#737A73] truncate">
                    Student Active
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenExitParent}
                className="p-1.5 rounded-lg text-[#737A73] hover:text-[#193F30] hover:bg-[#EDF2EC] transition-colors shrink-0"
                title="Exit to Parent Portal (PIN Protected)"
              >
                <ShieldAlert className="w-4 h-4 text-[#193F30]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenExitParent}
              className="w-full py-2 flex justify-center text-[#737A73] hover:text-[#193F30]"
              title="Parent Exit Gate"
            >
              <ShieldAlert className="w-5 h-5 text-[#193F30]" />
            </button>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={onOpenExitParent}
              className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-[#737A73] hover:text-[#193F30] hover:bg-[#EDF2EC] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#193F30]" />
              <span>Parent Control Gate</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
