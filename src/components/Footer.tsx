import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-8 text-center text-xs text-zinc-500 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-3">
        <span>&copy; {new Date().getFullYear()} jinkun1998</span>
        <span className="text-zinc-700">&middot;</span>
        <a
          href="https://github.com/jinkun1998"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
