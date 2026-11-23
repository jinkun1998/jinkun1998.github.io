import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { AppTile } from './components/AppTile'
import { Footer } from './components/Footer'
import { AppItem } from './types'

const DEFAULT_APPS: AppItem[] = [
  {
    name: 'another.Notch',
    description: 'macOS Dynamic Island utility with music controls, HUD, calendar, quick notes, and AirDrop shelf.',
    url: 'https://jinkun1998.github.io/another.notch/',
    icon: 'icons/another-notch.png',
    category: 'Utilities',
    featured: true,
  },
  {
    name: 'another.Music',
    description: 'Native music player for macOS & Android with intelligent AutoMix, turntable vinyl UI, and synced lyrics.',
    url: 'https://jinkun1998.github.io/another.Music/',
    icon: 'icons/another-music.png',
    category: 'Media',
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
    name: 'another.Messenger',
    description: 'Every chat in one place. Fast, private, protected by Touch ID.',
    url: 'https://jinkun1998.github.io/another.Messenger/',
    icon: 'icons/another-messenger.png',
    category: 'Communication',
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

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#06070a] text-[#f5f5f7] overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* macOS Dynamic Aurora Mesh Wallpaper */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
        <div className="aurora-blob-3" />
      </div>
      <div className="liquid-ambient" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <Header />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 py-12 sm:py-20 flex flex-col justify-center items-center">
        {/* Centered Modern Launchpad Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 justify-items-center items-center w-full my-auto">
          {apps.map((app) => (
            <AppTile key={app.name} app={app} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
