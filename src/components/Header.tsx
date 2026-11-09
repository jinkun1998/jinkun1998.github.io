import React from 'react'
import { Sun, Moon } from 'lucide-react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-nav bg-white/70 dark:bg-[#14171e]/75 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 hover:opacity-85 transition-opacity group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-lg px-1.5 py-1"
          aria-label="iCloud Apps Home"
        >
          {/* Apple iCloud Cloud Glyph */}
          <svg
            className="w-6 h-6 fill-current text-[#0071e3] dark:text-[#2997ff]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="font-semibold text-base tracking-tight">iCloud</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-normal text-sm ml-0.5">Apps</span>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4.5 h-4.5" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            )}
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/jinkun1998"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            aria-label="GitHub Profile"
            title="View on GitHub"
          >
            <svg
              className="w-4.5 h-4.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* User Monogram Avatar */}
          <div
            className="w-7.5 h-7.5 rounded-full bg-gradient-to-tr from-[#0071e3] to-[#42a5f5] text-white flex items-center justify-center font-semibold text-xs tracking-wider shadow-sm select-none"
            title="jinkun1998"
          >
            JK
          </div>
        </div>
      </div>
    </header>
  )
}
