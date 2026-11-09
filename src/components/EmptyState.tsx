import React from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  search: string
  selectedCategory: string
  onReset: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ search, selectedCategory, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-400 mb-4 shadow-inner">
        <Search className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">
        No applications found
      </h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6">
        {search
          ? `No applications matching "${search}" in ${selectedCategory === 'All' ? 'any category' : selectedCategory}.`
          : `No applications listed under ${selectedCategory}.`}
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#00e599] text-black hover:brightness-110 transition-all shadow-[0_4px_16px_rgba(0,229,153,0.3)]"
      >
        Clear filters
      </button>
    </div>
  )
}
