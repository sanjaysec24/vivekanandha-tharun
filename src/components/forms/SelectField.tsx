import React, { ReactNode } from 'react';
import { ChevronDown, AlertCircle, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  labelTa?: string;
  disabled?: boolean;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  labelTa?: string;
  options: (string | SelectOption)[];
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  required?: boolean;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  labelTa,
  options,
  error,
  helperText,
  icon,
  required,
  placeholder = 'Select an option',
  className = '',
  id,
  value,
  ...rest
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const isSelected = Boolean(value);

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={selectId}
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

        <select
          id={selectId}
          value={value}
          {...rest}
          className={`
            w-full rounded-xl bg-white border text-sm text-[#3A2318]
            py-3 ${icon ? 'pl-10' : 'pl-3.5'} pr-10 outline-hidden transition-all duration-200 appearance-none cursor-pointer
            ${error 
              ? 'border-[#E74C3C] bg-red-50/20 focus:border-[#E74C3C] focus:ring-2 focus:ring-red-100' 
              : isSelected
              ? 'border-[#5BB35A]/60 focus:border-[#5BB35A] focus:ring-2 focus:ring-emerald-50'
              : 'border-[#3A2318]/15 hover:border-[#3A2318]/30 focus:border-[#E78F68] focus:ring-2 focus:ring-[#E78F68]/15'
            }
            ${!isSelected ? 'text-[#3A2318]/40' : 'text-[#3A2318]'}
            ${className}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, idx) => {
            if (typeof opt === 'string') {
              return (
                <option key={idx} value={opt} className="text-[#3A2318]">
                  {opt}
                </option>
              );
            }
            return (
              <option 
                key={idx} 
                value={opt.value} 
                disabled={opt.disabled}
                className="text-[#3A2318]"
              >
                {opt.label} {opt.labelTa ? `(${opt.labelTa})` : ''}
              </option>
            );
          })}
        </select>

        {/* Custom Chevron Indicator */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#3A2318]/50">
          <ChevronDown className="w-4 h-4" />
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
