import React, { useState } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentHeader } from './StudentHeader';
import { ExitParentModal } from './ExitParentModal';

export const StudentLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [exitParentModalOpen, setExitParentModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-full bg-[#FCF8FF] text-[#1b1831] font-sans flex overflow-hidden selection:bg-primary selection:text-white relative">
      
      {/* Pastel Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-primary-container/15 via-[#c9e6ff]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-secondary-container/20 via-primary/10 to-transparent blur-3xl" />
      </div>

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
          <footer className="w-full py-4 text-center text-xs text-[#6A6678] border-t border-[#E6DEFF] bg-white/60 backdrop-blur-md shrink-0">
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
