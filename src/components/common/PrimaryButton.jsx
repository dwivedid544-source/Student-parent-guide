import React from 'react';
import { Sparkles } from 'lucide-react';

export const PrimaryButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  showSparkle = true,
  variant = 'orange', // 'orange', 'outline', 'secondary'
}) => {
  const sizeClasses = {
    sm: 'py-2 px-5 text-xs md:text-sm',
    md: 'py-3 px-7 text-sm md:text-base',
    lg: 'py-3.5 px-8 text-base md:text-lg',
  }[size] || 'py-3 px-7 text-base';

  const variantClasses = {
    orange: 'bg-[#F45124] hover:bg-[#e04216] text-white shadow-lg shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.01] active:scale-[0.99]',
    outline: 'bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white/70 backdrop-blur-md',
    secondary: 'bg-[#65BDEB] hover:bg-[#52a9d6] text-[#19324D] font-bold shadow-md shadow-sky-500/25',
  }[variant] || 'bg-[#F45124] text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 font-bold rounded-full 
        transition-all duration-200 cursor-pointer select-none
        ${sizeClasses}
        ${variantClasses}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : ''}
        ${className}
      `}
    >
      <span>{children}</span>
      {showSparkle && (
        <Sparkles className="w-4 h-4 text-white/90 animate-sparkle" />
      )}
    </button>
  );
};

