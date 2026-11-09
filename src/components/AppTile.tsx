import React, { useState } from 'react'
import { AppItem } from '../types'
import { ExternalLink, Sparkles } from 'lucide-react'

interface AppTileProps {
  app: AppItem
}

export const AppTile: React.FC<AppTileProps> = ({ app }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-[#1a1e27]/70 hover:bg-white/95 dark:hover:bg-[#222733]/90 border border-black/[0.05] dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/20 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_18px_36px_-6px_rgba(0,0,0,0.6)] glass-tile transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] dark:focus-visible:ring-[#2997ff]"
      aria-label={`${app.name} (${app.category})`}
    >
      {/* Featured Badge */}
      {app.featured && (
        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">
          <Sparkles className="w-2.5 h-2.5 fill-current" />
        </span>
      )}

      {/* App Icon (Apple Squircle) */}
      <div className="relative my-1">
        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 apple-squircle overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.45)] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          {!imgError ? (
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0071e3] to-[#42a5f5] text-white flex items-center justify-center font-bold text-xl select-none">
              {app.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* App Name */}
      <h3 className="mt-3 text-sm sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors truncate max-w-full">
        {app.name}
      </h3>

      {/* Category Pill */}
      <span className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
        {app.category}
      </span>

      {/* Short Description */}
      {app.description && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed px-1">
          {app.description}
        </p>
      )}

      {/* Subtle Launch Indicator on Hover */}
      <div className="mt-auto pt-3 flex items-center gap-1 text-[11px] font-semibold text-[#0071e3] dark:text-[#2997ff] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <span>Launch</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  )
}
