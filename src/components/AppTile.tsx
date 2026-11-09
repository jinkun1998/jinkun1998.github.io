import React, { useState } from 'react'
import { AppItem } from '../types'
import { ExternalLink } from 'lucide-react'

interface AppTileProps {
  app: AppItem
}

export const AppTile: React.FC<AppTileProps> = ({ app }) => {
  const [imgError, setImgError] = useState(false)

  // Format "another.xxx" with signature another.* branding
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
      className="group relative flex flex-col items-center text-center w-full max-w-[320px] sm:max-w-[340px] p-7 sm:p-8 rounded-[28px] border border-white/15 hover:border-[#00e599]/60 bg-gradient-to-br from-white/[0.09] via-[#1d1d1f]/90 to-white/[0.04] shadow-[inset_0_1px_rgba(255,255,255,0.25),inset_0_-1px_rgba(255,255,255,0.04),0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_rgba(255,255,255,0.4),0_24px_60px_rgba(0,229,153,0.18)] another-glass transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] focus:outline-none focus-visible:ring-3 focus-visible:ring-[#2997ff]"
      aria-label={`${app.name} (${app.category})`}
    >
      {/* Category Eyebrow Pill */}
      <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase text-zinc-300 border border-white/15 bg-white/[0.06] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]" />
        <span>{app.category}</span>
      </div>

      {/* App Squircle Icon (Centered & Prominent) */}
      <div className="relative mb-5">
        <div className="w-20 h-20 sm:w-22 sm:h-22 apple-squircle overflow-hidden p-1 shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-white/20 bg-black/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {!imgError ? (
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover select-none pointer-events-none rounded-[18px]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00e599] to-[#2997ff] text-black flex items-center justify-center font-bold text-2xl select-none rounded-[18px]">
              {app.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* App Name */}
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5 leading-snug">
        {renderTitle(app.name)}
      </h3>

      {/* Short Description */}
      <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-6 flex-1 px-1">
        {app.description}
      </p>

      {/* Action Button (Signature another.* Apple Pill) */}
      <div
        className={`w-full py-2.5 px-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
          app.featured
            ? 'bg-gradient-to-r from-[#00e599] via-[#00c782] to-[#00aa6e] text-black border border-[#00e599]/80 shadow-[inset_0_1px_rgba(255,255,255,0.6),0_8px_24px_rgba(0,229,153,0.35)] group-hover:shadow-[0_12px_30px_rgba(0,229,153,0.5)] group-hover:brightness-105'
            : 'bg-gradient-to-br from-white/15 via-white/[0.06] to-white/10 text-white border border-white/20 shadow-[inset_0_1px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.4)] group-hover:bg-white/20'
        }`}
      >
        <span>Open Application</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </a>
  )
}
