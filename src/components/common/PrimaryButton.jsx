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
    forest: 'bg-[#183B2B] hover:bg-[#112D20] text-white shadow-[0_4px_20px_rgba(24,59,43,0.18)] hover:shadow-[0_6px_25px_rgba(24,59,43,0.25)] hover:scale-[1.01] active:scale-[0.99]',
    orange: 'bg-[#183B2B] hover:bg-[#112D20] text-white shadow-[0_4px_20px_rgba(24,59,43,0.18)]',
    outline: 'bg-white hover:bg-[#FBF9F5] text-[#18221D] border border-[#DCD6C8] hover:border-[#183B2B]',
    secondary: 'bg-[#EFECE4] hover:bg-[#E5E0D5] text-[#18221D] border border-[#D5CFBF]/60',
  }[variant] || 'bg-[#183B2B] text-white';

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
