import { FileText } from 'lucide-react'

export default function Header() {
  return (
    <header className="no-print relative overflow-hidden">
      {/* Animated gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400 opacity-20 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl blur-lg opacity-50 animate-float" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-glow">
              <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900">
              Invoice <span className="gradient-text">Builder</span>
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Craft beautiful invoices in seconds
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
