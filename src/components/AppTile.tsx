import React, { useState } from 'react'
import { AppItem } from '../types'
import { ExternalLink } from 'lucide-react'

interface AppTileProps {
  app: AppItem
}

export const AppTile: React.FC<AppTileProps> = ({ app }) => {
  const [imgError, setImgError] = useState(false)

  const renderTitle = (name: string) => {
    if (name.startsWith('another.')) {
      const suffix = name.slice(8)
      return (
        <span>
          another.<strong className="text-[#00e599] font-bold">{suffix}</strong>
        </span>
      )
    }
    return <span>{name}</span>
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center text-center w-[210px] sm:w-[230px] p-4 sm:p-5 rounded-2xl border border-white/15 hover:border-[#00e599]/60 bg-gradient-to-br from-white/[0.08] via-[#1d1d1f]/90 to-white/[0.03] shadow-[inset_0_1px_rgba(255,255,255,0.2),inset_0_-1px_rgba(255,255,255,0.03),0_12px_28px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_rgba(255,255,255,0.35),0_16px_36px_rgba(0,229,153,0.18)] another-glass transition-all duration-250 ease-out hover:-translate-y-1.5 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e599]"
      aria-label={`${app.name} (${app.category})`}
    >
      {/* Category Eyebrow Pill */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase text-zinc-300 border border-white/10 bg-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]" />
        <span>{app.category}</span>
      </div>

      {/* App Squircle Icon */}
      <div className="relative mb-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 apple-squircle overflow-hidden p-0.5 shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-white/20 bg-black/40 flex items-center justify-center transition-transform duration-250 group-hover:scale-105">
          {!imgError ? (
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover select-none pointer-events-none rounded-[13px]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00e599] to-[#2997ff] text-black flex items-center justify-center font-bold text-lg select-none rounded-[13px]">
              {app.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* App Name */}
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-1.5 leading-snug">
        {renderTitle(app.name)}
      </h3>

      {/* Short Description */}
      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1 px-0.5">
        {app.description}
      </p>

      {/* Compact Action Button */}
      <div
        className={`w-full py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
          app.featured
            ? 'bg-gradient-to-r from-[#00e599] to-[#00aa6e] text-black border border-[#00e599]/80 shadow-[inset_0_1px_rgba(255,255,255,0.5),0_4px_16px_rgba(0,229,153,0.3)] group-hover:brightness-105'
            : 'bg-gradient-to-br from-white/15 to-white/5 text-white border border-white/20 shadow-sm group-hover:bg-white/20'
        }`}
      >
        <span>Open</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  )
}
