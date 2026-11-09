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
      <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 mb-3.5 shadow-inner">
        <Search className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1.5">
        No applications found
      </h3>
      <p className="text-xs text-zinc-400 max-w-xs mb-5">
        {search
          ? `No applications matching "${search}" in ${selectedCategory === 'All' ? 'any category' : selectedCategory}.`
          : `No applications listed under ${selectedCategory}.`}
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
      >
        Clear filters
      </button>
    </div>
  )
}
