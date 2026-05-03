import { useMemo, useState } from 'react'
import { addDaysISO, generateInvoiceNumber, todayISO, uid } from '../utils/format'

const createEmptyItem = () => ({
  id: uid(),
  description: '',
  quantity: 1,
  rate: 0
})

const createInitialInvoice = () => ({
  invoiceNumber: generateInvoiceNumber(),
  issueDate: todayISO(),
  dueDate: addDaysISO(14),
  currency: 'USD',
  from: {
    name: '',
    email: '',
    address: '',
    phone: ''
  },
  to: {
    name: '',
    email: '',
    address: '',
    phone: ''
  },
  items: [createEmptyItem()],
  taxRate: 10,
  discount: 0,
  notes: 'Thank you for your business! Payment is due within the terms listed above.',
  terms: 'Late payments are subject to a 1.5% monthly service charge.'
})

export const useInvoice = () => {
  const [invoice, setInvoice] = useState(createInitialInvoice)

  const updateField = (path, value) => {
    setInvoice((prev) => {
      const next = { ...prev }
      const keys = path.split('.')
      let cursor = next
      for (let i = 0; i < keys.length - 1; i++) {
        cursor[keys[i]] = { ...cursor[keys[i]] }
        cursor = cursor[keys[i]]
      }
      cursor[keys[keys.length - 1]] = value
      return next
    })
  }

  const addItem = () => {
    setInvoice((prev) => ({ ...prev, items: [...prev.items, createEmptyItem()] }))
  }

  const updateItem = (id, patch) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item))
    }))
  }

  const removeItem = (id) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items
    }))
  }

  const duplicateItem = (id) => {
    setInvoice((prev) => {
      const index = prev.items.findIndex((item) => item.id === id)
      if (index === -1) return prev
      const original = prev.items[index]
      const copy = { ...original, id: uid() }
      const next = [...prev.items]
      next.splice(index + 1, 0, copy)
      return { ...prev, items: next }
    })
  }

  const resetInvoice = () => setInvoice(createInitialInvoice())

  const totals = useMemo(() => {
    const subtotal = invoice.items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0
      const rate = Number(item.rate) || 0
      return sum + qty * rate
    }, 0)

    const discountAmount = (subtotal * (Number(invoice.discount) || 0)) / 100
    const taxableAmount = subtotal - discountAmount
    const taxAmount = (taxableAmount * (Number(invoice.taxRate) || 0)) / 100
    const grandTotal = taxableAmount + taxAmount

    return {
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal
    }
  }, [invoice.items, invoice.taxRate, invoice.discount])

  return {
    invoice,
    totals,
    updateField,
    addItem,
    updateItem,
    removeItem,
    duplicateItem,
    resetInvoice
  }
}
