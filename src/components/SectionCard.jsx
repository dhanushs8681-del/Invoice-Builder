export default function SectionCard({ icon: Icon, title, accent = 'from-brand-500 to-purple-600', action, children }) {
  return (
    <section className="card p-5 sm:p-6 transition-all duration-300 hover:shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-sm`}
          >
            {Icon && <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />}
          </div>
          <h2 className="text-base font-display font-bold text-slate-900">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
