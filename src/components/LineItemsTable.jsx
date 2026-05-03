import { Copy, GripVertical, Trash2 } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export default function LineItemsTable({ items, currency, updateItem, removeItem, duplicateItem }) {
  return (
    <div className="space-y-2">
      {/* Header (desktop) */}
      <div className="hidden md:grid grid-cols-[28px_1fr_90px_120px_110px_80px] gap-3 px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span />
        <span>Description</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Rate</span>
        <span className="text-right">Amount</span>
        <span />
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const amount = (Number(item.quantity) || 0) * (Number(item.rate) || 0)
          return (
            <div
              key={item.id}
              className="group relative p-3 md:p-0 rounded-xl md:rounded-lg bg-slate-50/50 md:bg-transparent border border-slate-100 md:border-0 transition-all hover:bg-slate-50 animate-scale-in"
            >
              <div className="md:grid md:grid-cols-[28px_1fr_90px_120px_110px_80px] md:gap-3 md:items-center space-y-2 md:space-y-0">
                {/* Index / drag handle */}
                <div className="hidden md:flex items-center justify-center text-xs font-bold text-slate-300 group-hover:text-slate-400">
                  <span className="md:group-hover:hidden">{index + 1}</span>
                  <GripVertical className="w-4 h-4 hidden md:group-hover:block" />
                </div>

                <div>
                  <label className="md:hidden field-label">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    className="field-input-sm"
                    placeholder="Item or service description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 md:contents">
                  <div className="md:block">
                    <label className="md:hidden field-label">Qty</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: e.target.value })}
                      className="field-input-sm md:text-right"
                      placeholder="1"
                    />
                  </div>

                  <div className="md:block">
                    <label className="md:hidden field-label">Rate</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, { rate: e.target.value })}
                      className="field-input-sm md:text-right"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="md:block">
                    <label className="md:hidden field-label">Amount</label>
                    <div className="h-[38px] flex items-center justify-end px-3 text-sm font-semibold text-slate-800 tabular-nums">
                      {formatCurrency(amount, currency)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 md:justify-center">
                  <button
                    onClick={() => duplicateItem(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                    title="Duplicate item"
                    aria-label="Duplicate item"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 1}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-sm text-slate-400">
          No items yet. Click <strong>Add item</strong> to get started.
        </div>
      )}
    </div>
  )
}
