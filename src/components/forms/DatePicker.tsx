import React from 'react';
import { Calendar, AlertCircle, Check } from 'lucide-react';
import { calculateSchoolAge } from '../../services/smartFormsService';

interface DatePickerProps {
  label: string;
  labelTa?: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  min?: string;
  max?: string;
  showAgeCalculator?: boolean;
  id?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  labelTa,
  value,
  onChange,
  error,
  helperText,
  required = true,
  min,
  max,
  showAgeCalculator = false,
  id
}) => {
  const dateId = id || `date-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const isSelected = Boolean(value);
  const calculatedAge = showAgeCalculator && value ? calculateSchoolAge(value) : null;

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={dateId}
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
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#3A2318]/40">
          <Calendar className="w-4 h-4" />
        </div>

        <input
          id={dateId}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className={`
            w-full rounded-xl bg-white border text-sm text-[#3A2318]
            py-3 pl-10 pr-10 outline-hidden transition-all duration-200 cursor-pointer
            ${error 
              ? 'border-[#E74C3C] bg-red-50/20 focus:border-[#E74C3C] focus:ring-2 focus:ring-red-100' 
              : isSelected
              ? 'border-[#5BB35A]/60 focus:border-[#5BB35A] focus:ring-2 focus:ring-emerald-50'
              : 'border-[#3A2318]/15 hover:border-[#3A2318]/30 focus:border-[#E78F68] focus:ring-2 focus:ring-[#E78F68]/15'
            }
          `}
        />

        {/* Validation Status Indicator */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          {error ? (
            <AlertCircle className="w-4 h-4 text-[#E74C3C] animate-in fade-in" />
          ) : isSelected ? (
            <Check className="w-4 h-4 text-[#5BB35A] animate-in fade-in" />
          ) : null}
        </div>
      </div>

      {/* Calculated Age Helper Pill */}
      {calculatedAge && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#5BB35A]/10 border border-[#5BB35A]/20 text-xs text-[#198C52] font-medium animate-in fade-in">
          <span>👶 Child Age:</span>
          <span className="font-bold">{calculatedAge.readable}</span>
        </div>
      )}

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
