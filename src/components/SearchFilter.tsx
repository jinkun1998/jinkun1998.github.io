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
    <div className="w-full space-y-3.5">
      {/* Liquid Glass Search Input */}
      <div className="relative max-w-sm mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search applications... (press /)"
          className="w-full pl-10 pr-9 py-2 rounded-full text-xs sm:text-sm bg-white/[0.07] text-white placeholder-zinc-400 border border-white/15 focus:border-white/30 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.15)] transition-all"
          aria-label="Search applications"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-zinc-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Apple Liquid Glass Category Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.25)] scale-[1.02]'
                  : 'bg-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.12] border border-white/10 font-normal'
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
