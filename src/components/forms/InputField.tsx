import React, { ReactNode } from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelTa?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  required?: boolean;
  isValid?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  labelTa,
  error,
  helperText,
  icon,
  required,
  isValid,
  className = '',
  id,
  value,
  ...rest
}) => {
  const inputId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-[#3A2318]/90 flex items-center gap-1"
        >
          <span>{label}</span>
          {labelTa && <span className="text-[11px] font-normal text-[#3A2318]/50 lowercase">({labelTa})</span>}
          {required && <span className="text-[#E74C3C] text-sm leading-none" title="Required">*</span>}
        </label>
        {!required && (
          <span className="text-[10px] uppercase tracking-wider text-[#3A2318]/40 font-medium">Optional</span>
        )}
      </div>

      <div className="relative rounded-xl shadow-xs transition-all duration-200">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#3A2318]/40">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          value={value}
          {...rest}
          className={`
            w-full rounded-xl bg-white border text-sm text-[#3A2318] placeholder:text-[#3A2318]/30
            py-3 ${icon ? 'pl-10' : 'pl-3.5'} pr-10 outline-hidden transition-all duration-200
            ${error 
              ? 'border-[#E74C3C] bg-red-50/20 focus:border-[#E74C3C] focus:ring-2 focus:ring-red-100' 
              : isValid && value
              ? 'border-[#5BB35A]/60 focus:border-[#5BB35A] focus:ring-2 focus:ring-emerald-50'
              : 'border-[#3A2318]/15 hover:border-[#3A2318]/30 focus:border-[#E78F68] focus:ring-2 focus:ring-[#E78F68]/15'
            }
            ${className}
          `}
        />

        {/* Validation Status Indicator */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          {error ? (
            <AlertCircle className="w-4 h-4 text-[#E74C3C] animate-in fade-in" />
          ) : isValid && value ? (
            <Check className="w-4 h-4 text-[#5BB35A] animate-in fade-in" />
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="text-xs text-[#E74C3C] font-medium flex items-center gap-1 pt-0.5">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[#3A2318]/60 leading-tight pt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
