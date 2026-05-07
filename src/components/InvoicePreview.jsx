import { forwardRef } from 'react'
import { formatCurrency, formatDate } from '../utils/format'

const InvoicePreview = forwardRef(function InvoicePreview({ invoice, totals }, ref) {
  return (
    <div className="relative">
      {/* Decorative backdrop */}
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-200/20 via-purple-200/20 to-pink-200/20 blur-2xl rounded-3xl no-print" />

      <div
        ref={ref}
        className="pdf-capture relative bg-white rounded-2xl shadow-card overflow-hidden border border-slate-200/70"
      >
        {/* Header band */}
        <div className="preview-header relative px-8 pt-8 pb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.5) 0%, transparent 50%)'
            }}
          />
          <div className="relative flex justify-between items-start gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-200/80 font-semibold mb-2">
                Invoice
              </p>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                {invoice.from.name || 'Your Business'}
              </h1>
              {invoice.from.email && (
                <p className="text-sm text-slate-300 mt-1">{invoice.from.email}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs font-bold tracking-wider">#{invoice.invoiceNumber || '—'}</p>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Issued {formatDate(invoice.issueDate) || '—'}
              </p>
              <p className="text-xs text-slate-300">Due {formatDate(invoice.dueDate) || '—'}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {/* Parties */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Party label="From" party={invoice.from} fallback="Your Business" />
            <Party label="Bill to" party={invoice.to} fallback="Client name" align="right" />
          </div>

          {/* Items table */}
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Description
                  </th>
                  <th className="text-right px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-16">
                    Qty
                  </th>
                  <th className="text-right px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-24">
                    Rate
                  </th>
                  <th className="text-right px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-28">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => {
                  const qty = Number(item.quantity) || 0
                  const rate = Number(item.rate) || 0
                  const amount = qty * rate
                  return (
                    <tr
                      key={item.id}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}
                    >
                      <td className="px-4 py-3 text-slate-800 align-top">
                        <p className="font-medium">
                          {item.description || <span className="text-slate-300">—</span>}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-right text-slate-700 tabular-nums align-top">
                        {qty}
                      </td>
                      <td className="px-3 py-3 text-right text-slate-700 tabular-nums align-top">
                        {formatCurrency(rate, invoice.currency)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 tabular-nums align-top">
                        {formatCurrency(amount, invoice.currency)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-6">
            <div className="w-full max-w-xs space-y-2">
              <TotalRow
                label="Subtotal"
                value={formatCurrency(totals.subtotal, invoice.currency)}
              />
              {totals.discountAmount > 0 && (
                <TotalRow
                  label={`Discount (${invoice.discount}%)`}
                  value={`− ${formatCurrency(totals.discountAmount, invoice.currency)}`}
                  muted
                />
              )}
              <TotalRow
                label={`Tax (${invoice.taxRate}%)`}
                value={formatCurrency(totals.taxAmount, invoice.currency)}
              />
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex items-baseline justify-between px-3 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white">
                <span className="text-sm font-semibold">Total due</span>
                <span className="text-lg font-display font-extrabold tabular-nums">
                  {formatCurrency(totals.grandTotal, invoice.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes & terms */}
          {(invoice.notes || invoice.terms) && (
            <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-200">
              {invoice.notes && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Notes
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Terms
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {invoice.terms}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <p className="text-[11px] text-slate-400">
              Generated on {formatDate(new Date().toISOString())}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wider">
              THANK YOU
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

function Party({ label, party, fallback, align = 'left' }) {
  const alignClass = align === 'right' ? 'text-right' : 'text-left'
  return (
    <div className={alignClass}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</p>
      <p className="text-sm font-bold text-slate-900">{party.name || fallback}</p>
      {party.email && <p className="text-xs text-slate-600 mt-0.5">{party.email}</p>}
      {party.address && (
        <p className="text-xs text-slate-600 mt-0.5 whitespace-pre-line leading-relaxed">
          {party.address}
        </p>
      )}
      {party.phone && <p className="text-xs text-slate-600 mt-0.5">{party.phone}</p>}
    </div>
  )
}

function TotalRow({ label, value, muted }) {
  return (
    <div className="flex justify-between items-center px-3">
      <span className={`text-xs ${muted ? 'text-slate-500' : 'text-slate-600'}`}>{label}</span>
      <span
        className={`text-sm tabular-nums ${
          muted ? 'text-slate-500' : 'font-semibold text-slate-900'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

export default InvoicePreview
