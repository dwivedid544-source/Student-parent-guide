import React, { useState } from 'react';
import { Bell, CheckCircle2, Check, Sparkles, Filter } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const StudentNotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useStudent();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filtered = filter === 'all'
    ? notifications
    : notifications.filter((n) => !n.read);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
            Notifications & Mentor Notes
          </h2>
          <p className="text-xs sm:text-sm text-[#737A73] mt-1">
            Stay updated on Parent Bridge comments, milestone badges, and task due dates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="py-2 px-4 rounded-full text-xs font-semibold text-[#193F30] bg-[#EDF2EC] hover:bg-[#E5E0D5] border border-black/30 hover:border-black/50 transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-black/30 shadow-xs space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#9CCDB0] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#202923]">Inbox zero</h3>
            <p className="text-xs text-[#737A73]">You have seen all your notifications.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start justify-between gap-4 shadow-2xs ${
                !n.read
                  ? 'bg-white border-black/40 hover:border-black/60 shadow-xs'
                  : 'bg-[#F8F7F2] border-black/25 opacity-85 hover:border-black/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border border-black/20 ${
                    !n.read ? 'bg-[#EDF2EC] text-[#193F30]' : 'bg-[#E5E0D5] text-[#737A73]'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#202923]">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#193F30]" />
                    )}
                  </div>
                  <p className="text-xs text-[#737A73] leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#737A73] shrink-0 font-medium">
                {n.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotificationsPage;
