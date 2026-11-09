import { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header'
import { AppTile } from './components/AppTile'
import { SearchFilter } from './components/SearchFilter'
import { EmptyState } from './components/EmptyState'
import { Footer } from './components/Footer'
import { AppItem } from './types'

const DEFAULT_APPS: AppItem[] = [
  {
    name: 'another.notch',
    description: 'macOS Dynamic Island utility with music controls, HUD, calendar, quick notes, and AirDrop shelf.',
    url: 'https://jinkun1998.github.io/another.notch/',
    icon: 'icons/another-notch.png',
    category: 'Utilities',
    featured: true,
  },
  {
    name: 'another.MQTT',
    description: 'Modern cross-platform MQTT 5.0 desktop client with topic isolation and payload collection tools.',
    url: 'https://jinkun1998.github.io/another.MQTT/',
    icon: 'icons/another-mqtt.png',
    category: 'Developer Tools',
    featured: true,
  },
  {
    name: 'file-sync',
    description: 'Cross-platform background file synchronization server and client daemon.',
    url: 'https://github.com/jinkun1998/file-sync',
    icon: 'icons/file-sync.svg',
    category: 'Utilities',
    featured: false,
  },
  {
    name: 'Foldable.Maui',
    description: 'Dual-screen and foldable device components for .NET MAUI applications.',
    url: 'https://github.com/jinkun1998/Foldable.Maui',
    icon: 'icons/foldable-maui.svg',
    category: 'Mobile',
    featured: false,
  },
]

export default function App() {
  const [apps, setApps] = useState<AppItem[]>(DEFAULT_APPS)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    }
    return 'dark'
  })

  // Theme synchronization
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Load apps.json dynamically
  useEffect(() => {
    fetch('apps.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load apps.json')
        return res.json()
      })
      .then((data: AppItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setApps(data)
        }
      })
      .catch(() => {
        // Fallback pre-loaded
      })
  }, [])

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    apps.forEach((a) => set.add(a.category))
    return ['All', ...Array.from(set)]
  }, [apps])

  // Filtered applications
  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase()
    return apps.filter((app) => {
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
      if (!matchesCategory) return false
      if (!q) return true
      return (
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q)
      )
    })
  }, [apps, search, selectedCategory])

  const handleResetFilters = () => {
    setSearch('')
    setSelectedCategory('All')
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#000] text-[#f5f5f7] overflow-x-hidden selection:bg-[#00e599] selection:text-black">
      {/* another.* ambient atmosphere and grid overlays */}
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grid-lines" aria-hidden="true" />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center">
        {/* Hero Title */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60 mb-3 leading-[1.08]">
          another.<strong className="font-extrabold text-[#00e599]">apps</strong>
        </h1>

        <p className="text-center text-sm sm:text-base text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
          Open-source desktop tools, macOS utilities, and cross-platform clients by <strong className="text-zinc-200 font-semibold">jinkun1998</strong>.
        </p>

        {/* Search & Category Filter */}
        <div className="w-full max-w-lg mb-10 sm:mb-12">
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Centered Application Grid with Balanced Spacing */}
        <div className="w-full flex-1 flex flex-col items-center">
          {filteredApps.length > 0 ? (
            <div className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-7 md:gap-8 w-full max-w-4xl">
              {filteredApps.map((app) => (
                <AppTile key={app.name} app={app} />
              ))}
            </div>
          ) : (
            <EmptyState
              search={search}
              selectedCategory={selectedCategory}
              onReset={handleResetFilters}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
