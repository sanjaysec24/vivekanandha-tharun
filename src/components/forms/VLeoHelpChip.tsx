import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface VLeoHelpChipProps {
  text?: string;
  query?: string;
  className?: string;
  variant?: 'inline' | 'card' | 'badge';
}

export const VLeoHelpChip: React.FC<VLeoHelpChipProps> = ({
  text = 'Need help or have questions? Ask V-Leo AI Assistant',
  query = 'Tell me about the admission criteria and process for Vivekanandha School',
  className = '',
  variant = 'inline'
}) => {
  const handleOpenVLeo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Dispatch custom event listened by VLeoChatbot
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-vleo-chat', {
          detail: { query }
        })
      );
    }
  };

  if (variant === 'card') {
    return (
      <div className={`p-3.5 rounded-2xl bg-linear-to-r from-[#FFF9E6] to-[#FFF3EB] border border-[#EAB308]/30 flex items-center justify-between gap-3 text-left ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EAB308]/20 flex items-center justify-center text-[#3A2318] shrink-0">
            <span className="text-base leading-none">🦁</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#3A2318]">V-Leo Admissions Guide</p>
            <p className="text-[11px] text-[#3A2318]/70 leading-tight">{text}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenVLeo}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-[#3A2318] hover:bg-[#E78F68] text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3 h-3 text-[#EAB308]" />
          <span>Ask V-Leo</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleOpenVLeo}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F0EA] hover:bg-[#FFF3EB] border border-[#3A2318]/15 hover:border-[#E78F68]/40
        text-xs font-medium text-[#3A2318] transition-all duration-200 cursor-pointer text-left
        ${className}
      `}
    >
      <span className="text-sm leading-none">🦁</span>
      <span className="text-[11px] text-[#3A2318]/80">{text}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E78F68] bg-white px-2 py-0.5 rounded-full border border-[#E78F68]/20 shrink-0">
        Chat
      </span>
    </button>
  );
};
