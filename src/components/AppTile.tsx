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
          <span className="text-zinc-400 font-normal">another.</span>
          <span className="text-white font-semibold">{suffix}</span>
        </span>
      )
    }
    return <span className="text-white font-semibold">{name}</span>
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center text-center w-24 sm:w-28 p-2.5 sm:p-3 rounded-2xl hover:bg-white/[0.07] border border-transparent hover:border-white/10 transition-all duration-250 ease-out hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      title={`${app.name} — ${app.description}`}
      aria-label={`${app.name} (${app.category})`}
    >
      {/* App Squircle Icon with Apple Liquid Polish */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 apple-squircle overflow-hidden shadow-[0_10px_24px_-4px_rgba(0,0,0,0.6)] border border-white/15 bg-black/40 flex items-center justify-center transition-all duration-250 ease-out group-hover:scale-105 group-hover:border-white/30 group-hover:shadow-[0_16px_32px_-4px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.4)]">
        {!imgError ? (
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover select-none pointer-events-none rounded-[15px]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-white flex items-center justify-center font-bold text-xl select-none rounded-[15px] border border-white/10">
            {app.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* App Name */}
      <span className="mt-2.5 text-xs sm:text-[13px] tracking-tight truncate max-w-full leading-tight">
        {renderTitle(app.name)}
      </span>

      {/* Category Sub-label */}
      <span className="mt-0.5 text-[10px] text-zinc-500 group-hover:text-zinc-400 tracking-wide font-normal truncate max-w-full">
        {app.category}
      </span>
    </a>
  )
}
