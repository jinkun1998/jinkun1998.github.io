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

  // Keyboard shortcut: '/' focuses search input
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
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search apps, tools, categories... (press /)"
          className="w-full pl-10 pr-9 py-2.5 rounded-full text-sm bg-black/[0.04] dark:bg-white/[0.08] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border border-transparent focus:border-[#0071e3] dark:focus:border-[#2997ff] focus:bg-white dark:focus:bg-[#1a1e27] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 dark:focus:ring-[#2997ff]/20 transition-all shadow-inner"
          aria-label="Search applications"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
                isActive
                  ? 'bg-[#0071e3] dark:bg-[#2997ff] text-white shadow-sm shadow-[#0071e3]/30 scale-[1.02]'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
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
