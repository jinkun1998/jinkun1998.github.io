import React from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  search: string
  selectedCategory: string
  onReset: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ search, selectedCategory, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-4 shadow-inner">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
        No applications found
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
        {search
          ? `No applications matching "${search}" in ${selectedCategory === 'All' ? 'any category' : selectedCategory}.`
          : `No applications currently listed under ${selectedCategory}.`}
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0071e3] dark:bg-[#2997ff] text-white hover:opacity-90 transition-opacity shadow-sm"
      >
        Reset filters
      </button>
    </div>
  )
}
