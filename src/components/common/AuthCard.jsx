import React from 'react';

export const AuthCard = ({ title, children, className = '' }) => {
  return (
    <div
      className={`w-full max-w-md mx-auto rounded-3xl p-6 sm:p-8 md:p-9 
        bg-white/15 backdrop-blur-xl border border-white/30 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
        transition-all duration-300 ${className}`}
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center md:text-left mb-6 drop-shadow-sm font-poppins">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

