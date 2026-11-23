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
        <span className="tracking-tight">
          <span className="text-zinc-400 font-normal">another.</span>
          <span className="text-white font-semibold">{suffix}</span>
        </span>
      )
    }
    return <span className="text-white font-semibold tracking-tight">{name}</span>
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      title={`${app.name} — ${app.description}`}
      aria-label={app.name}
    >
      {/* Ambient Specular Glow on Hover */}
      <div
        className="absolute top-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full opacity-0 group-hover:opacity-35 blur-2xl transition-all duration-500 pointer-events-none bg-gradient-to-tr from-white/20 via-blue-400/20 to-purple-500/20"
        aria-hidden="true"
      />

      {/* Large Apple Squircle Icon */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 apple-squircle overflow-hidden shadow-[0_16px_36px_-6px_rgba(0,0,0,0.65)] border border-white/15 bg-zinc-900/60 flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-2 group-hover:border-white/35 group-hover:shadow-[0_28px_54px_-8px_rgba(0,0,0,0.85),inset_0_1px_rgba(255,255,255,0.4)]">
        {!imgError ? (
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover select-none pointer-events-none rounded-[22px] sm:rounded-[26px] md:rounded-[30px]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-white flex items-center justify-center font-bold text-2xl select-none rounded-[22px] sm:rounded-[26px] md:rounded-[30px] border border-white/10">
            {app.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* App Name */}
      <span className="mt-3.5 sm:mt-4 text-sm sm:text-base transition-transform duration-300 group-hover:-translate-y-0.5">
        {renderTitle(app.name)}
      </span>
    </a>
  )
}
