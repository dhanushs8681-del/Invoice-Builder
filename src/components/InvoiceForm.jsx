import { Building2, Hash, Percent, Plus, Receipt, Send, StickyNote, User } from 'lucide-react'
import SectionCard from './SectionCard.jsx'
import LineItemsTable from './LineItemsTable.jsx'
import { CURRENCIES, formatCurrency } from '../utils/format'

export default function InvoiceForm({
  invoice,
  totals,
  updateField,
  addItem,
  updateItem,
  removeItem,
  duplicateItem
}) {
  return (
    <div className="space-y-6">
      {/* Invoice meta */}
      <SectionCard icon={Hash} title="Invoice details" accent="from-brand-500 to-indigo-600">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Invoice number</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className="field-input"
              placeholder="INV-2026-0001"
            />
          </div>
          <div>
            <label className="field-label">Currency</label>
            <select
              value={invoice.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="field-input appearance-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code} — {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Issue date</label>
            <input
              type="date"
              value={invoice.issueDate}
              onChange={(e) => updateField('issueDate', e.target.value)}
              className="field-input"
            />
          </div>
          <div>
            <label className="field-label">Due date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="field-input"
            />
          </div>
        </div>
      </SectionCard>

      {/* From / To */}
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard icon={Building2} title="From" accent="from-emerald-500 to-teal-600">
          <div className="space-y-3">
            <div>
              <label className="field-label">Business name</label>
              <input
                type="text"
                value={invoice.from.name}
                onChange={(e) => updateField('from.name', e.target.value)}
                className="field-input"
                placeholder="Your Company Inc."
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                value={invoice.from.email}
                onChange={(e) => updateField('from.email', e.target.value)}
                className="field-input"
                placeholder="hello@yourcompany.com"
              />
            </div>
            <div>
              <label className="field-label">Address</label>
              <textarea
                rows={2}
                value={invoice.from.address}
                onChange={(e) => updateField('from.address', e.target.value)}
                className="field-input resize-none"
                placeholder="Street, City, State ZIP"
              />
            </div>
            <div>
              <label className="field-label">Phone</label>
              <input
                type="tel"
                value={invoice.from.phone}
                onChange={(e) => updateField('from.phone', e.target.value)}
                className="field-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={User} title="Bill to" accent="from-purple-500 to-pink-600">
          <div className="space-y-3">
            <div>
              <label className="field-label">Client name</label>
              <input
                type="text"
                value={invoice.to.name}
                onChange={(e) => updateField('to.name', e.target.value)}
                className="field-input"
                placeholder="Client Company LLC"
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                value={invoice.to.email}
                onChange={(e) => updateField('to.email', e.target.value)}
                className="field-input"
                placeholder="billing@client.com"
              />
            </div>
            <div>
              <label className="field-label">Address</label>
              <textarea
                rows={2}
                value={invoice.to.address}
                onChange={(e) => updateField('to.address', e.target.value)}
                className="field-input resize-none"
                placeholder="Street, City, State ZIP"
              />
            </div>
            <div>
              <label className="field-label">Phone</label>
              <input
                type="tel"
                value={invoice.to.phone}
                onChange={(e) => updateField('to.phone', e.target.value)}
                className="field-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Line items */}
      <SectionCard
        icon={Receipt}
        title="Line items"
        accent="from-amber-500 to-orange-600"
        action={
          <button onClick={addItem} className="btn-primary">
            <Plus className="w-4 h-4" />
            Add item
          </button>
        }
      >
        <LineItemsTable
          items={invoice.items}
          currency={invoice.currency}
          updateItem={updateItem}
          removeItem={removeItem}
          duplicateItem={duplicateItem}
        />
      </SectionCard>

      {/* Tax & discount */}
      <SectionCard icon={Percent} title="Tax & adjustments" accent="from-rose-500 to-red-600">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="field-label">Tax rate (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={invoice.taxRate}
              onChange={(e) => updateField('taxRate', e.target.value)}
              className="field-input"
              placeholder="0"
            />
          </div>
          <div>
            <label className="field-label">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={invoice.discount}
              onChange={(e) => updateField('discount', e.target.value)}
              className="field-input"
              placeholder="0"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 space-y-2.5">
          <Row label="Subtotal" value={formatCurrency(totals.subtotal, invoice.currency)} />
          {totals.discountAmount > 0 && (
            <Row
              label={`Discount (${invoice.discount}%)`}
              value={`− ${formatCurrency(totals.discountAmount, invoice.currency)}`}
              muted
            />
          )}
          <Row
            label={`Tax (${invoice.taxRate}%)`}
            value={formatCurrency(totals.taxAmount, invoice.currency)}
          />
          <div className="h-px bg-slate-200 my-1" />
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-semibold text-slate-700">Grand total</span>
            <span className="text-2xl font-display font-extrabold gradient-text">
              {formatCurrency(totals.grandTotal, invoice.currency)}
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Notes & terms */}
      <SectionCard icon={StickyNote} title="Notes & terms" accent="from-cyan-500 to-blue-600">
        <div className="space-y-3">
          <div>
            <label className="field-label">Notes</label>
            <textarea
              rows={2}
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="field-input resize-none"
              placeholder="Any additional notes to the client..."
            />
          </div>
          <div>
            <label className="field-label">Terms & conditions</label>
            <textarea
              rows={2}
              value={invoice.terms}
              onChange={(e) => updateField('terms', e.target.value)}
              className="field-input resize-none"
              placeholder="Payment terms..."
            />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

function Row({ label, value, muted }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${muted ? 'text-slate-500' : 'text-slate-600'}`}>{label}</span>
      <span className={`text-sm font-semibold ${muted ? 'text-slate-500' : 'text-slate-800'}`}>
        {value}
      </span>
    </div>
  )
}
