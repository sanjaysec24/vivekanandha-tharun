import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export interface StepItem {
  id: number;
  title: string;
  titleTa?: string;
  shortTitle?: string;
  icon?: React.ReactNode;
}

interface ProgressIndicatorProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full space-y-3 select-none">
      {/* Mobile Mini Header */}
      <div className="flex items-center justify-between md:hidden text-xs font-semibold text-[#3A2318]">
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full bg-[#E78F68] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {currentStep}
          </span>
          <span className="font-serif font-bold text-sm text-[#3A2318]">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <span className="text-xs text-[#3A2318]/60 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Visual Stepper for Desktop & Tablets */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-[#3A2318]/10 rounded-full z-0" />
        
        {/* Active colored progress fill */}
        <motion.div 
          className="absolute top-1/2 left-4 h-1 -translate-y-1/2 bg-[#E78F68] rounded-full z-0 origin-left transition-all duration-300"
          style={{ width: `calc(${progressPercent}% - 8px)` }}
        />

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isPending = stepNum > currentStep;
          const canClick = isCompleted && onStepClick;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onStepClick(stepNum)}
              className={`
                relative z-10 flex flex-col items-center group transition-all duration-200 outline-hidden
                ${canClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
              `}
            >
              {/* Circle Badge */}
              <div 
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-xs
                  ${isCompleted 
                    ? 'bg-[#5BB35A] text-white ring-4 ring-[#5BB35A]/15' 
                    : isCurrent
                    ? 'bg-[#E78F68] text-white ring-4 ring-[#E78F68]/25 scale-110'
                    : 'bg-[#F4F0EA] border border-[#3A2318]/20 text-[#3A2318]/50'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center max-w-[110px]">
                <p 
                  className={`
                    text-[11px] font-bold tracking-tight transition-colors leading-tight
                    ${isCurrent ? 'text-[#3A2318]' : isCompleted ? 'text-[#3A2318]/80' : 'text-[#3A2318]/40'}
                  `}
                >
                  {step.shortTitle || step.title}
                </p>
                {step.titleTa && (
                  <p className="text-[9px] text-[#3A2318]/40 font-normal leading-none mt-0.5">
                    {step.titleTa}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Slim Progress Bar for Mobile */}
      <div className="md:hidden w-full bg-[#3A2318]/10 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          className="bg-[#E78F68] h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
