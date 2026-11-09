import React, { useState } from 'react'
import { AppItem } from '../types'

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
      className="group flex flex-col items-center text-center w-24 sm:w-28 p-2.5 sm:p-3 rounded-2xl hover:bg-white/[0.08] transition-all duration-200 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e599]"
      title={`${app.name} — ${app.description}`}
      aria-label={`${app.name} (${app.category})`}
    >
      {/* App Squircle Icon */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 apple-squircle overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-white/15 bg-black/40 flex items-center justify-center transition-all duration-200 ease-out group-hover:scale-105 group-hover:border-[#00e599]/60 group-hover:shadow-[0_12px_28px_rgba(0,229,153,0.3)]">
        {!imgError ? (
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover select-none pointer-events-none rounded-[15px]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00e599] to-[#2997ff] text-black flex items-center justify-center font-bold text-xl select-none rounded-[15px]">
            {app.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* App Name */}
      <span className="mt-2.5 text-xs sm:text-[13px] font-medium text-white/90 group-hover:text-white tracking-tight truncate max-w-full leading-tight">
        {renderTitle(app.name)}
      </span>

      {/* Sub-label Category */}
      <span className="mt-0.5 text-[10px] text-zinc-500 group-hover:text-zinc-400 tracking-wide font-normal truncate max-w-full">
        {app.category}
      </span>
    </a>
  )
}
