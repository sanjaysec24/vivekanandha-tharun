import React, { ReactNode } from 'react';
import { Edit2 } from 'lucide-react';

export interface ReviewSection {
  title: string;
  stepIndex?: number;
  onEdit?: () => void;
  items: Array<{
    label: string;
    value: string | ReactNode;
    highlight?: boolean;
  }>;
}

interface ReviewCardProps {
  sections: ReviewSection[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  sections,
  title = 'Review Your Information',
  subtitle = 'Please verify all details carefully before submitting.',
  className = ''
}) => {
  return (
    <div className={`space-y-5 text-left ${className}`}>
      {/* Review Header */}
      <div className="pb-2 border-b border-[#3A2318]/10">
        <h4 className="font-serif text-lg font-bold text-[#3A2318]">{title}</h4>
        <p className="text-xs text-[#3A2318]/60 mt-0.5">{subtitle}</p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, sIdx) => (
          <div 
            key={sIdx} 
            className="p-4 rounded-2xl bg-white border border-[#3A2318]/10 shadow-xs space-y-3 relative group"
          >
            {/* Section Title + Jump-to-Edit Button */}
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2318]/5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#E78F68] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E78F68]" />
                <span>{section.title}</span>
              </h5>
              {section.onEdit && (
                <button
                  type="button"
                  onClick={section.onEdit}
                  className="text-[11px] font-bold text-[#3A2318]/60 hover:text-[#E78F68] flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-[#F4F0EA] cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              {section.items.map((item, iIdx) => {
                if (item.value === undefined || item.value === null || item.value === '') {
                  return null;
                }
                return (
                  <div key={iIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1 border-b border-[#3A2318]/5 last:border-0">
                    <span className="text-[#3A2318]/60 font-medium">{item.label}</span>
                    <span className={`font-semibold text-right ${item.highlight ? 'text-[#E78F68]' : 'text-[#3A2318]'}`}>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
