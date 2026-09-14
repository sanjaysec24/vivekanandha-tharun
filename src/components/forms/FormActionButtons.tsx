import React from 'react';
import { ArrowRight, ArrowLeft, Send, Loader2, RotateCcw } from 'lucide-react';

interface FormActionButtonsProps {
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  submitLabel?: string;
  showPrev?: boolean;
  showReset?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  currentStep = 1,
  totalSteps = 1,
  onNext,
  onPrev,
  onReset,
  isSubmitting = false,
  nextLabel = 'Continue to Next Step',
  prevLabel = 'Go Back',
  submitLabel = 'Submit Application',
  showPrev = true,
  showReset = false,
  nextDisabled = false,
  className = ''
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={`pt-6 border-t border-[#3A2318]/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 ${className}`}>
      {/* Left side actions: Back or Reset */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {currentStep > 1 && showPrev && onPrev && (
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#3A2318]/20 bg-white hover:bg-[#F4F0EA] text-[#3A2318] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{prevLabel}</span>
          </button>
        )}

        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            disabled={isSubmitting}
            className="px-3 py-2.5 text-[#3A2318]/50 hover:text-[#E74C3C] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Clear Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Right side primary action: Next or Submit */}
      <div className="w-full sm:w-auto flex items-center justify-end">
        {isLastStep ? (
          <button
            type="submit"
            disabled={isSubmitting || nextDisabled}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#5BB35A] hover:bg-[#4ea04d] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Submission...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{submitLabel}</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled || isSubmitting}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E78F68] hover:bg-[#d97c54] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
