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
    <div className="relative min-h-screen flex flex-col bg-[#050506] text-[#f5f5f7] overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Apple Liquid Ambient Specular Glow */}
      <div className="liquid-ambient" aria-hidden="true" />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center">
        {/* Apple Clean Title */}
        <h1 className="text-center text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8 sm:mb-10 leading-[1.08]">
          another.<span className="font-semibold text-zinc-400">apps</span>
        </h1>

        {/* Liquid Glass Search & Category Filter */}
        <div className="w-full max-w-md mb-12 sm:mb-16">
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Centered Application Grid with Apple Liquid Glass Polish */}
        <div className="w-full flex-1 flex flex-col items-center">
          {filteredApps.length > 0 ? (
            <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-12 md:gap-14 max-w-3xl w-full">
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
