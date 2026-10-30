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
        <label className="text-[#18221D] text-xs sm:text-sm font-semibold tracking-wide pl-1">
          {label} {required && <span className="text-[#4B735F]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-[#5C665F] pointer-events-none">
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
          className={`w-full py-2.5 px-4 text-sm font-medium rounded-full text-[#18221D] placeholder-[#9CA3AF] 
            bg-white border border-[#DCD6C8] 
            hover:border-[#183B2B]/60 
            focus:outline-none focus:border-[#183B2B] focus:ring-2 focus:ring-[#183B2B]/15
            transition-all duration-200 shadow-xs
            ${Icon ? 'pl-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${error ? 'border-red-500 ring-2 ring-red-500/15 bg-red-50/40' : ''}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-[#5C665F] hover:text-[#18221D] transition-colors p-1 cursor-pointer"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-red-600 text-xs pl-3 font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
