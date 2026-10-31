import React, { useState } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentHeader } from './StudentHeader';
import { ExitParentModal } from './ExitParentModal';

export const StudentLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [exitParentModalOpen, setExitParentModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-full bg-[#F8F7F2] text-[#202923] font-sans flex overflow-hidden selection:bg-[#193F30] selection:text-white">
      {/* 1. Left Sidebar - Permanently full height */}
      <StudentSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onOpenExitParent={() => setExitParentModalOpen(true)}
        collapsed={sidebarCollapsed}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <StudentHeader
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenExitParent={() => setExitParentModalOpen(true)}
        />

        {/* Scrollable Page Body with Hidden Scrollbar */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between">
          <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
            {children}
          </main>

          {/* Calm HighOrbit Footer */}
          <footer className="w-full py-4 text-center text-xs text-[#737A73] border-t border-black/40 bg-[#F8F7F2] shrink-0">
            <span>HighOrbit Student Sanctuary • Mindful self-discovery & personal leadership</span>
          </footer>
        </div>
      </div>

      {/* 3. Parent Exit PIN Modal */}
      <ExitParentModal
        isOpen={exitParentModalOpen}
        onClose={() => setExitParentModalOpen(false)}
      />
    </div>
  );
};

export default StudentLayout;
