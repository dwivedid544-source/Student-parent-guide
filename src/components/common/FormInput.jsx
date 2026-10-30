import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const FormInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  name,
  required = false,
  icon: Icon,
  className = '',
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-white text-xs md:text-sm font-semibold tracking-wide pl-1">
          {label} {required && <span className="text-[#FFD66B]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4.5 text-white/60 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full py-2.5 px-4 text-sm font-medium rounded-full text-white placeholder-white/70 
            bg-[#65BDEB]/30 border border-white/40 
            hover:bg-[#65BDEB]/40 
            focus:outline-none focus:bg-[#65BDEB]/50 focus:border-white focus:ring-2 focus:ring-[#65BDEB]/60
            backdrop-blur-md transition-all duration-200
            ${Icon ? 'pl-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${error ? 'border-red-400 ring-2 ring-red-400/40 bg-red-500/20' : ''}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-white/70 hover:text-white transition-colors p-1"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-red-300 text-xs pl-3 font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

