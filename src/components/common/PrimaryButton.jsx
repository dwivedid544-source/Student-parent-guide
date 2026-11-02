import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PrimaryButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  showArrow = true,
  variant = 'forest', // 'forest', 'outline', 'secondary'
}) => {
  const sizeClasses = {
    sm: 'py-2 px-5 text-xs sm:text-sm',
    md: 'py-3 px-6 text-sm font-semibold',
    lg: 'py-3.5 px-8 text-base font-semibold',
  }[size] || 'py-3 px-6 text-sm font-semibold';

  const variantClasses = {
    forest: 'bg-gradient-to-r from-primary via-[#6f56d1] to-secondary-container hover:from-primary/95 hover:to-secondary-container/95 text-white shadow-[0_4px_20px_rgba(95,72,185,0.28)] hover:shadow-[0_6px_25px_rgba(95,72,185,0.38)] hover:scale-[1.01] active:scale-[0.99] border border-white/20',
    primary: 'bg-gradient-to-r from-primary via-[#6f56d1] to-secondary-container hover:from-primary/95 hover:to-secondary-container/95 text-white shadow-[0_4px_20px_rgba(95,72,185,0.28)] hover:shadow-[0_6px_25px_rgba(95,72,185,0.38)] hover:scale-[1.01] active:scale-[0.99] border border-white/20',
    orange: 'bg-gradient-to-r from-secondary-container to-secondary hover:opacity-95 text-white shadow-md',
    outline: 'bg-white/80 hover:bg-white text-on-surface border border-white/90 hover:border-primary/40 shadow-sm backdrop-blur-md',
    secondary: 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-white/60',
  }[variant] || 'bg-gradient-to-r from-primary via-[#6f56d1] to-secondary-container text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full 
        transition-all duration-200 cursor-pointer select-none
        ${sizeClasses}
        ${variantClasses}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : ''}
        ${className}
      `}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 text-white/90" />
      )}
    </button>
  );
};

export default PrimaryButton;
