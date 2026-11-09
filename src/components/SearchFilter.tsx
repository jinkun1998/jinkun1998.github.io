import React, { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

interface SearchFilterProps {
  search: string
  onSearchChange: (value: string) => void
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== inputRef.current &&
        !['input', 'textarea'].includes((document.activeElement?.tagName || '').toLowerCase())
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter applications... (press /)"
          className="w-full pl-11 pr-10 py-3 rounded-full text-sm bg-white/[0.07] text-white placeholder-zinc-500 border border-white/15 focus:border-[#00e599] focus:bg-black/50 focus:outline-none focus:ring-2 focus:ring-[#00e599]/25 shadow-inner transition-all"
          aria-label="Search applications"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e599] ${
                isActive
                  ? 'bg-[#00e599] text-black border border-[#00e599] shadow-[0_4px_16px_rgba(0,229,153,0.35)] scale-105'
                  : 'bg-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.12] border border-white/10'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
