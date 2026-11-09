import { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header'
import { AppTile } from './components/AppTile'
import { SearchFilter } from './components/SearchFilter'
import { EmptyState } from './components/EmptyState'
import { Footer } from './components/Footer'
import { AppItem } from './types'

// Default fallback apps if fetch fails or running in offline environment
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
    name: 'Gemini CLI UI',
    description: 'Responsive web interface for Google\'s Gemini CLI with interactive session management.',
    url: 'https://github.com/jinkun1998/Gemini-CLI-UI',
    icon: 'icons/gemini-cli.svg',
    category: 'AI & ML',
    featured: true,
  },
  {
    name: 'ONNX Workbench',
    description: 'Interactive ONNX model inspection, tensor benchmarking, and execution workbench.',
    url: 'https://github.com/jinkun1998/onnx-workbench',
    icon: 'icons/onnx-workbench.svg',
    category: 'AI & ML',
    featured: false,
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
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
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
        // Fallback already pre-loaded
      })
  }, [])

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
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
    <div className="min-h-screen flex flex-col bg-[radial-gradient(120%_120%_at_50%_0%,#eaf0fb_0%,#f4f6fb_45%,#eef1f6_100%)] dark:bg-[radial-gradient(120%_120%_at_50%_0%,#1e2433_0%,#111319_50%,#0a0c10_100%)] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
        {/* Welcome Section */}
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            {greeting}, jinkun.
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Open-source applications and projects hosted on GitHub.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="w-full max-w-2xl mb-10">
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Application Grid */}
        <div className="w-full">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-5 justify-center">
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
