<div align="center">

# 🧾 Invoice Builder

### Craft pixel-perfect invoices in seconds — no signup, no backend, no nonsense.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![html2pdf](https://img.shields.io/badge/html2pdf.js-PDF_Export-FF4757?style=for-the-badge)](https://ekoopmans.github.io/html2pdf.js/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

**A responsive, blazingly fast invoice generator that turns raw data into professional, print-ready invoices with a single click.**


</div>

---

## 💡 About the project

Invoice Builder is a fully client-side web app designed for freelancers, small businesses, and indie hackers who need a **clean, fast, and beautiful** way to generate invoices. No accounts. No data leaves your browser. Just open, fill, download.

Every interaction is crafted with care — smooth animations, live preview, real-time math, and a PDF export that actually looks good. The UI is built around a two-pane editor where your edits reflect on the invoice preview instantly.

> **Built for speed.** The entire app boots in under 100ms and generates PDFs in the blink of an eye.

---

## ✨ Features

### 📝 Invoice Creation
- **Full client & business details** — name, email, address, phone for both parties
- **Editable invoice number and dates** — with smart auto-generated defaults
- **7 currency options** out of the box (USD, EUR, GBP, INR, JPY, AUD, CAD)
- **Dynamic line items** — add unlimited items with description, quantity, and rate

### 🧮 Smart Calculations
- **Real-time math** — subtotal, discount, tax, and grand total update the moment you type
- **Configurable tax rate** — apply any percentage
- **Percentage-based discount** — applied before tax for accurate billing
- **Per-line amount auto-calculation** — quantity × rate, computed on the fly

### 🪄 Item Management
- **Add items** with a single click
- **Duplicate items** to save typing on repeated services
- **Delete items** with a clean confirmation guard (can't delete the last one)
- **Edit any field** before final export — invoice number, dates, all of it

### 📄 PDF Export & Print
- **One-click PDF download** via html2pdf.js — filename auto-named from the invoice number
- **Browser print** — native print dialog with a print-optimized layout
- **Layout integrity preserved** — the PDF matches the preview pixel-for-pixel
- **Letter-format output** with proper margins, ready for any printer

### 🎨 Polished UX
- **Live split-view editor** — form on the left, invoice preview on the right
- **Mobile-first design** — Edit / Preview toggle on smaller screens
- **Toast notifications** — clean feedback on successful exports
- **Mesh-gradient backdrop** — subtle, modern, premium feel
- **Microinteractions everywhere** — every button, hover, and focus is animated

### ⚡ Engineered for performance
- **Sub-100ms boot time** with Vite's dev server
- **Zero external state libraries** — pure React Hooks (`useState`, `useMemo`, `useRef`)
- **Tree-shaken bundle** — only ships what you use
- **100% client-side** — no API calls, no tracking, no data leaks

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 with Hooks |
| **Styling** | Tailwind CSS 3 + custom keyframe animations |
| **State** | `useState`, `useMemo`, `useRef` (no Redux, no Zustand, no nothing) |
| **PDF Export** | [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Build Tool** | Vite 5 |
| **Fonts** | Inter + Plus Jakarta Sans (via Google Fonts) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Lokesh-web16/Invoice-Builder.git
cd Invoice-Builder

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be live at **http://localhost:5173** 🎉

### Other scripts

```bash
npm run build     # Production build → ./dist
npm run preview   # Preview the production build locally
```


---

## 🗂️ Project Structure

```
Invoice-Builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top nav with animated gradient orb
│   │   ├── InvoiceForm.jsx      # Left-side form (all inputs)
│   │   ├── InvoicePreview.jsx   # Right-side preview (PDF source)
│   │   ├── LineItemsTable.jsx   # Editable line items
│   │   ├── SectionCard.jsx      # Reusable section wrapper
│   │   └── Toast.jsx            # Toast notifications
│   ├── hooks/
│   │   └── useInvoice.js        # Invoice state + derived totals
│   ├── utils/
│   │   └── format.js            # Currency, date, ID helpers
│   ├── App.jsx                  # App shell + PDF export logic
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + custom styles
├── index.html
├── netlify.toml                 # Netlify deploy config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🧠 How it works

### State management
All invoice state lives in a single `useInvoice` custom hook. It exposes:

- `invoice` — the full invoice object (meta, parties, items, tax, notes)
- `totals` — derived values (`subtotal`, `discountAmount`, `taxAmount`, `grandTotal`) computed via `useMemo`
- `updateField(path, value)` — deep-path updater (e.g. `updateField('from.name', 'Acme')`)
- `addItem`, `updateItem`, `removeItem`, `duplicateItem` — line item actions
- `resetInvoice` — full reset with confirmation

### PDF export
The invoice preview lives inside a `forwardRef`'d component. When you hit **Download PDF**, the app passes the DOM node to `html2pdf.js` with:
- `scale: 2` for crisp retina-quality rendering
- Letter format, portrait orientation
- Clean 0.4-inch margins
- `avoid-all` page-break mode to keep sections together

### Print mode
Tailwind's `print:` utilities combined with a global `.no-print` class hide all UI chrome (sticky nav, buttons, form pane) during print, leaving just the invoice.




---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more info.

---

<div align="center">

### ⭐ If you found this useful, consider giving it a star!

**Built with ❤️ and lots of coffee ☕**

</div>
