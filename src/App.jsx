import { useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import { FileDown, Printer, RotateCcw, Sparkles, Eye, Pencil } from 'lucide-react'
import Header from './components/Header.jsx'
import InvoiceForm from './components/InvoiceForm.jsx'
import InvoicePreview from './components/InvoicePreview.jsx'
import Toast from './components/Toast.jsx'
import { useInvoice } from './hooks/useInvoice.js'

export default function App() {
  const {
    invoice,
    totals,
    updateField,
    addItem,
    updateItem,
    removeItem,
    duplicateItem,
    resetInvoice
  } = useInvoice()

  const previewRef = useRef(null)
  const [toast, setToast] = useState(null)
  const [mobileView, setMobileView] = useState('form') // 'form' | 'preview'
  const [isExporting, setIsExporting] = useState(false)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }

  const handleExportPDF = async () => {
    if (!previewRef.current || isExporting) return
    setIsExporting(true)

    const element = previewRef.current
    const filename = `${invoice.invoiceNumber || 'invoice'}.pdf`

    const opt = {
      margin: [0.4, 0.4, 0.4, 0.4],
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    try {
      await html2pdf().set(opt).from(element).save()
      showToast('PDF downloaded successfully')
    } catch (err) {
      console.error(err)
      showToast('Failed to export PDF', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    if (window.confirm('Reset all invoice data? This cannot be undone.')) {
      resetInvoice()
      showToast('Invoice reset')
    }
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Header />

      <main className="app-main max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Action bar */}
        <div className="no-print sticky top-4 z-30 mb-6 animate-slide-down">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-soft">
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-100">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span className="text-xs font-semibold text-brand-700">Live preview enabled</span>
              </div>

              {/* Mobile toggle */}
              <div className="lg:hidden flex items-center p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setMobileView('form')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    mobileView === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  <Pencil className="w-3.5 h-3.5 inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setMobileView('preview')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    mobileView === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 inline mr-1" />
                  Preview
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="btn-ghost" title="Reset invoice">
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button onClick={handlePrint} className="btn-secondary" title="Print invoice">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                title="Download as PDF"
              >
                <FileDown className={`w-4 h-4 ${isExporting ? 'animate-pulse' : ''}`} />
                <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">
          <div
            className={`no-print animate-slide-up ${
              mobileView === 'form' ? 'block' : 'hidden lg:block'
            }`}
          >
            <InvoiceForm
              invoice={invoice}
              totals={totals}
              updateField={updateField}
              addItem={addItem}
              updateItem={updateItem}
              removeItem={removeItem}
              duplicateItem={duplicateItem}
            />
          </div>

          <div
            className={`print-area animate-slide-up ${mobileView === 'preview' ? 'block' : 'hidden lg:block'}`}
            style={{ animationDelay: '80ms' }}
          >
            <div className="preview-wrap lg:sticky lg:top-28">
              <InvoicePreview ref={previewRef} invoice={invoice} totals={totals} />
            </div>
          </div>
        </div>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
