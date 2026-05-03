import { useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(t)
  }, [toast, onClose])

  if (!toast) return null

  const isError = toast.type === 'error'

  return (
    <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-xl border ${
          isError
            ? 'bg-rose-50/95 border-rose-200 text-rose-900'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        {isError ? (
          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        )}
        <p className="text-sm font-semibold pr-2">{toast.message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
