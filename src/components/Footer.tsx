import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-black/[0.06] dark:border-white/[0.08] py-8 text-center text-xs text-zinc-500 dark:text-zinc-400 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          Copyright &copy; {new Date().getFullYear()} jinkun1998.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jinkun1998/jinkun1998.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-800 dark:hover:text-zinc-200 hover:underline"
          >
            Source Code
          </a>
          <span>&middot;</span>
          <a
            href="https://github.com/jinkun1998"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-800 dark:hover:text-zinc-200 hover:underline"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </footer>
  )
}
