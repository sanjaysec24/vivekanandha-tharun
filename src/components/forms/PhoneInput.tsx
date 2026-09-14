import React from 'react';
import { Phone, AlertCircle, Check } from 'lucide-react';
import { isValidIndianMobile } from '../../services/smartFormsService';

interface PhoneInputProps {
  label?: string;
  labelTa?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string;
  placeholder?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Mobile Number',
  labelTa = 'கைப்பேசி எண்',
  value,
  onChange,
  error,
  helperText = 'We will send SMS updates and call to confirm your request.',
  required = true,
  id = 'field-mobile-number',
  placeholder = '98765 43210'
}) => {
  const isValid = isValidIndianMobile(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    // Allow digits, spaces, hyphens
    const digitsOnly = raw.replace(/\D/g, '').slice(0, 10);
    onChange(digitsOnly);
  };

  // Format value for display if 10 digits (e.g. 98765 43210)
  const formatDisplay = (val: string) => {
    if (val.length <= 5) return val;
    return `${val.slice(0, 5)} ${val.slice(5, 10)}`;
  };

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={id}
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

      <div className="relative flex rounded-xl shadow-xs transition-all duration-200">
        {/* Country Code Prefix Badge */}
        <div className="flex items-center gap-1.5 px-3 py-3 rounded-l-xl bg-[#F4F0EA] border border-r-0 border-[#3A2318]/15 text-xs font-bold text-[#3A2318] shrink-0 select-none">
          <span className="text-base leading-none">🇮🇳</span>
          <span>+91</span>
        </div>

        <div className="relative w-full">
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            value={formatDisplay(value)}
            onChange={handleInputChange}
            placeholder={placeholder}
            maxLength={11}
            className={`
              w-full rounded-r-xl bg-white border text-sm font-medium text-[#3A2318] placeholder:text-[#3A2318]/30
              py-3 pl-3 pr-10 outline-hidden transition-all duration-200
              ${error 
                ? 'border-[#E74C3C] bg-red-50/20 focus:border-[#E74C3C] focus:ring-2 focus:ring-red-100' 
                : isValid
                ? 'border-[#5BB35A]/60 focus:border-[#5BB35A] focus:ring-2 focus:ring-emerald-50'
                : 'border-[#3A2318]/15 hover:border-[#3A2318]/30 focus:border-[#E78F68] focus:ring-2 focus:ring-[#E78F68]/15'
              }
            `}
          />

          {/* Validation Status Indicator */}
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            {error ? (
              <AlertCircle className="w-4 h-4 text-[#E74C3C] animate-in fade-in" />
            ) : isValid ? (
              <Check className="w-4 h-4 text-[#5BB35A] animate-in fade-in" />
            ) : null}
          </div>
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
