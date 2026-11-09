import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] py-8 text-center text-xs text-zinc-500 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          Copyright &copy; {new Date().getFullYear()} jinkun1998.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://jinkun1998.github.io/another.notch/"
            className="hover:text-zinc-300 transition-colors"
          >
            another.notch
          </a>
          <span className="text-zinc-700">&middot;</span>
          <a
            href="https://jinkun1998.github.io/another.MQTT/"
            className="hover:text-zinc-300 transition-colors"
          >
            another.MQTT
          </a>
          <span className="text-zinc-700">&middot;</span>
          <a
            href="https://github.com/jinkun1998"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
