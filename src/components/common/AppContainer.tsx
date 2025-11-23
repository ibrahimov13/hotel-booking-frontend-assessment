import type { ReactNode } from 'react'

export const AppContainer = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
  </div>
)

