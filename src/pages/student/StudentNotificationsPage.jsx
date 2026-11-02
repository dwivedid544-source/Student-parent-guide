import React, { useState } from 'react';
import { Bell, CheckCircle2, Check, Sparkles, Filter, Trash2 } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const StudentNotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount
  } = useStudent();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter((n) => !n.read);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className=" text-2xl sm:text-3xl font-bold text-[#1b1831] tracking-tight">
            Notifications & Mentor Notes
          </h2>
          <p className="text-xs sm:text-sm text-[#6A6678] mt-1">
            Stay updated on Parent Bridge comments, milestone badges, and task due dates.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="py-2 px-4 rounded-full text-xs font-semibold text-primary bg-[#EBE5FF] hover:bg-[#E6DEFF] border border-[#E6DEFF] hover:border-primary/40 transition-colors cursor-pointer shadow-xs"
            >
              Mark all as read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAllNotifications}
              className="py-2 px-3.5 rounded-full text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Delete all notifications"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete all</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#E6DEFF] shadow-xs space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#8bcefe] mx-auto" />
            <h3 className=" text-lg font-bold text-[#1b1831]">Inbox zero</h3>
            <p className="text-xs text-[#6A6678]">You have seen all your notifications.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start justify-between gap-4 shadow-2xs group ${
                !n.read
                  ? 'bg-white border-[#E6DEFF] hover:border-black/60 shadow-xs'
                  : 'bg-[#FCF8FF] border-[#E6DEFF] opacity-85 hover:border-[#E6DEFF]'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border border-[#E6DEFF] ${
                    !n.read ? 'bg-[#EBE5FF] text-primary' : 'bg-[#E6DEFF] text-[#6A6678]'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1b1831]">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-[#6A6678] leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-[#6A6678] font-medium">
                  {n.time}
                </span>

                {/* Working Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  className="p-1.5 rounded-lg text-[#6A6678] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                  title="Delete notification"
                  aria-label={`Delete notification ${n.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotificationsPage;
