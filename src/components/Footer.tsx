import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/[0.08] py-10 text-center text-xs text-zinc-500 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          Copyright &copy; {new Date().getFullYear()} jinkun1998. Part of the another.* ecosystem.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://jinkun1998.github.io/another.notch/"
            className="hover:text-white transition-colors"
          >
            another.notch
          </a>
          <span className="text-zinc-700">&middot;</span>
          <a
            href="https://jinkun1998.github.io/another.MQTT/"
            className="hover:text-white transition-colors"
          >
            another.MQTT
          </a>
          <span className="text-zinc-700">&middot;</span>
          <a
            href="https://github.com/jinkun1998"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e599] hover:underline font-semibold"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
