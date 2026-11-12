import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

interface QuoteItem {
  sku: string;
  name: string;
  qty: number;
  spec: string;
  lot: string;
  image: string;
  badge: string;
}

const DEFAULT_QUOTE_ITEMS: QuoteItem[] = [
  {
    sku: 'VSP-2044-TC',
    name: 'Metzenbaum-Fino TC 180mm',
    qty: 150,
    spec: 'DIN 1.4117 Cryo-treated Martensitic',
    lot: 'Lot #8402',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVyY1gDTeXuPMOkqP10wMF72yXXf4VKiNrJOynVK6u-qAL1465YostkEt3a9ZuAqa69bs0pVJnk-Q71HnXD134sr0bZhm30MRLeGaEXHqXA1jv0EIeNk4M8cmErErHK9mmU2lCOYXqzuF05_iPrZ3cgXJDJ4UDqGkHmh8wWFofSXW-alxsxiQr5wV0zSivHvD3sUNLvnl-Rrjf-53USBXFDBfBa4JFYgceig8m7O4X',
    badge: 'TC Insert'
  },
  {
    sku: 'VSP-1190-DB',
    name: 'DeBakey Atraumatic Forceps 200mm',
    qty: 150,
    spec: 'AISI 420 Non-Pinching Ribbed Jaws',
    lot: 'Lot #7921',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVw2x31bN-aZlhEw5Z2qY2k-0aV5w9G4sF1a94s3e2d-3q0eF2s-6a4eF2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7q8w9e0r1t2y3u4i5o6p',
    badge: 'Atraumatic'
  }
];

export const AdminEmailSenderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const toParam = searchParams.get('to') || 'arthur.l@karolinska.se';
  const subjectParam = searchParams.get('subject') || 'Formal Quotation & Technical Dossier: RFQ #INQ-8842 — Cardiovascular Operating Theatre Renewal (Karolinska University Hospital)';
  const refParam = searchParams.get('ref') || '#INQ-8842';

  const [toEmail, setToEmail] = useState(toParam);
  const [recipientName] = useState('Dr. Arthur Lindqvist');
  const [recipientHospital] = useState('Karolinska University Hospital, Stockholm');
  const [subject, setSubject] = useState(subjectParam);
  const [showBcc, setShowBcc] = useState(false);
  const [bccEmail, setBccEmail] = useState('');
  const [template, setTemplate] = useState('Institutional Quotation Response & Technical Dossier (ISO 13485)');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const [body, setBody] = useState(`Dear Dr. Lindqvist,

Thank you for reaching out regarding the renewal of surgical instrumentation for Karolinska University Hospital’s Cardiovascular Operating Theatres.

In response to your inquiry (${refParam}), our metallurgical engineering desk has prepared the formal technical dossier and institutional volume quote for the requested batch of surgical instruments:

1. Metzenbaum-Fino TC Dissecting Scissors (Curved, 180mm Standard)
   - SKU: VSP-2044-TC | DIN 1.4117 Cryogenic Martensitic Stainless Steel
   - Specification: Vacuum-brazed micro-grain Tungsten Carbide inserts (70 HRC), micro-serrated lower blade, gold-plated ring verification.
   - Batch Quantity: 150 units
   - Lot Sterilization: Validated for 134°C pre-vac steam autoclaving (>1,200 cycles).

2. DeBakey Atraumatic Vascular Tissue Forceps (200mm OAL, 1.5mm Jaw)
   - SKU: VSP-1190-DB | AISI 420 Surgical Alloy, Anti-Glare Satin Bead-Blast
   - Specification: Patented non-pinching interlocking vascular serrations, calibrated spring tension.
   - Batch Quantity: 150 units

Attachments included in this secure dispatch:
- Formal Commercial Quotation & Tiered Discount Schedule (PDF)
- ISO 13485:2016 & EU MDR 2017/745 Class IIa Declarations of Conformity
- 2D DataMatrix Laser Etch & Custom Hospital Marking Schematic

Delivery terms: CIP Stockholm Arlanda (Incoterms 2020), lead time 14 business days from PO confirmation.

Please let us know if you require sample units dispatched to Solna Campus for theatre evaluation prior to final tender submission on November 15, 2025.

Sincerely,

Dr. Erik Vance
Chief Operating Officer & Head of Technical Logistics
Vanguard Surgical Precision AG | Zurich & Tuttlingen`);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg max-w-[1440px] mx-auto w-full space-y-space-md">
        {/* Top Action Bar & Page Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm">
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                Compose Hospital Quotation & Correspondence
              </h1>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                SMTP Ready
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Direct clinical tender response, batch quotation dispatch, and encrypted hospital communications via Vanguard SMTP Gateway.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="hidden 2xl:flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary-container">lock</span>
              <span>smtp.vanguard-surgical.ch (TLS 1.3 | ISO 27001 Encrypted)</span>
            </div>
            <button
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              type="button"
              onClick={() => alert('Draft saved to Vanguard Server Local Cache.')}
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save Draft</span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              type="button"
              onClick={() => {
                setBody('');
                alert('Composer cleared.');
              }}
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Clear Form</span>
            </button>
            <button
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container-highest hover:bg-surface-dim text-on-surface font-label-md text-label-md transition-colors shadow-sm"
              type="button"
              onClick={() => alert('Opening Formal PDF Quote Preview (Vanguard_Quote_Karolinska.pdf)...')}
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Preview Formal PDF Quote</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {sendSuccess && (
          <div className="rounded-xl bg-primary text-on-primary p-space-md flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <div>
                <div className="font-semibold text-body-md">Quotation Successfully Dispatched</div>
                <div className="text-body-sm text-on-primary-container">Message queued and delivered to {toEmail} with 3 verified attachments.</div>
              </div>
            </div>
            <button onClick={() => setSendSuccess(false)} className="text-on-primary-container hover:text-on-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        {/* Context Alert Banner: Linked Tender RFQ */}
        <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-start md:items-center gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">medical_services</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary-container font-semibold">Tender Context Linked:</span>
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">Customer Inquiry {refParam}</span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{recipientHospital}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Scope: <span className="font-semibold text-on-surface">150x</span> Metzenbaum-Fino TC (VSP-2044-TC) & <span className="font-semibold text-on-surface">150x</span> DeBakey Vascular Forceps (VSP-1190-DB). Contact: <span className="font-semibold text-on-surface">{recipientName}</span>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-end md:self-auto shrink-0">
            <Link
              to="/admin/inquiries"
              className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-highest hover:bg-surface-dim text-on-surface font-label-sm text-label-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              <span>View Original RFQ Inspector</span>
            </Link>
          </div>
        </div>

        {/* Main Composer Work Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Rich Email Composer Form (8 Columns) */}
          <section className="lg:col-span-8 space-y-space-md">
            <form className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              {/* Dispatch Headers Card */}
              <div className="space-y-space-sm bg-surface-container-low p-space-md rounded-lg">
                {/* From Field */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm">
                  <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">From Gateway</label>
                  <div className="md:col-span-10 flex items-center justify-between px-space-md py-space-xs rounded bg-surface-container text-on-surface font-body-sm text-body-sm cursor-not-allowed">
                    <div className="flex items-center gap-space-xs truncate">
                      <span className="material-symbols-outlined text-[18px] text-primary-container">verified_user</span>
                      <span className="font-semibold text-on-surface truncate">Vanguard Surgical Export Desk</span>
                      <span className="text-outline truncate">&lt;export@vanguard-surgical.com&gt;</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline px-space-xs py-0.5 rounded bg-surface-container-high shrink-0">DKIM / SPF Validated</span>
                  </div>
                </div>

                {/* To Field */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm">
                  <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Recipient (To)</label>
                  <div className="md:col-span-10 flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary-container transition-all">
                    <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary-container">local_hospital</span>
                      <span className="font-semibold">{recipientName}</span>
                      <span className="text-on-surface-variant">&lt;{toEmail}&gt;</span>
                    </span>
                    <input
                      className="flex-1 bg-transparent px-space-xs font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none min-w-[140px]"
                      placeholder="Add or update email..."
                      type="text"
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                    />
                    <button
                      className="font-label-sm text-label-sm text-outline hover:text-on-surface px-space-xs py-1 rounded hover:bg-surface-container transition-colors"
                      type="button"
                      onClick={() => setShowBcc(!showBcc)}
                    >
                      {showBcc ? 'Hide BCC' : 'Toggle BCC'}
                    </button>
                  </div>
                </div>

                {/* CC Field */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm">
                  <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Carbon Copy (CC)</label>
                  <div className="md:col-span-10 flex flex-wrap items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary-container transition-all">
                    <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      <span>procurement.surgical@karolinska.se</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      <span>tender-office@vanguard-surgical.com</span>
                    </span>
                  </div>
                </div>

                {/* BCC Field */}
                {showBcc && (
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm">
                    <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Blind CC (BCC)</label>
                    <div className="md:col-span-10 flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary-container">
                      <input
                        className="w-full bg-transparent px-space-xs font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                        placeholder="Confidential legal or compliance BCC..."
                        type="text"
                        value={bccEmail}
                        onChange={(e) => setBccEmail(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Template Selector */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm pt-space-xs">
                  <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Template Scope</label>
                  <div className="md:col-span-10 relative">
                    <select
                      className="w-full appearance-none bg-surface-container-lowest text-on-surface font-label-lg text-label-lg px-space-md py-space-xs pr-10 rounded focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer transition-shadow"
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                    >
                      <option>Institutional Quotation Response & Technical Dossier (ISO 13485)</option>
                      <option>General Clinical Inquiry</option>
                      <option>Product Metallurgical Spec Sheet Dispatch</option>
                      <option>Metallurgy & Autoclave Protocol (134°C Steam Cycle)</option>
                      <option>Custom Laser Etch & DataMatrix Scope</option>
                      <option>Follow-up Tender Correspondence</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">unfold_more</span>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-space-sm pt-space-xs">
                  <label className="md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email Subject</label>
                  <div className="md:col-span-10">
                    <input
                      className="w-full bg-surface-container-lowest px-space-md py-space-xs rounded text-on-surface font-label-lg text-label-lg focus:outline-none focus:ring-1 focus:ring-primary-container"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Rich Text Formatting Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-space-xs bg-surface-container p-space-xs rounded-lg text-on-surface-variant">
                <div className="flex flex-wrap items-center gap-0.5">
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Bold" type="button">
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Italic" type="button">
                    <span className="material-symbols-outlined text-[18px]">format_italic</span>
                  </button>
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Underline" type="button">
                    <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                  </button>
                  <div className="h-4 w-[1px] bg-surface-container-highest mx-space-xs"></div>
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Bullet List" type="button">
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                  </button>
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Numbered List" type="button">
                    <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                  </button>
                  <button className="p-space-xs rounded hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Specification Table" type="button">
                    <span className="material-symbols-outlined text-[18px]">table_chart</span>
                  </button>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button
                    className="flex items-center gap-space-xs px-space-xs py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-colors"
                    type="button"
                    onClick={() => setBody((prev) => prev + '\n\n[ISO 13485:2016 Compliant Surgical Grade Instrument - Batch #8402]')}
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">data_object</span>
                    <span>Insert Tender Tag</span>
                  </button>
                </div>
              </div>

              {/* Email Body Area */}
              <div className="relative">
                <textarea
                  className="w-full bg-surface-container-lowest p-space-md rounded-lg font-body-md text-body-md text-on-surface leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary-container resize-y selection:bg-primary-container selection:text-on-primary min-h-[360px]"
                  rows={14}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              {/* Attachments Panel */}
              <div className="space-y-space-xs pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    <span>Verified Regulatory Attachments (3 files, 9.3 MB)</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Max dispatch limit: 25.0 MB</span>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span>
                    <span className="font-medium">Quotation_INQ-8842_Karolinska.pdf</span>
                    <span className="text-outline text-[11px]">(2.4 MB)</span>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span>
                    <span className="font-medium">Metzenbaum_DeBakey_SpecDossier.pdf</span>
                    <span className="text-outline text-[11px]">(5.8 MB)</span>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">verified</span>
                    <span className="font-medium">ISO13485_MDR_Conformity_Cert.pdf</span>
                    <span className="text-outline text-[11px]">(1.1 MB)</span>
                  </div>
                  <button
                    className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-colors"
                    type="button"
                    onClick={() => alert('CAD file browser opened. Supported: .step, .dxf, .pdf')}
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Attach CAD / Spec File</span>
                  </button>
                </div>
              </div>

              {/* Action Dispatch Footer */}
              <div className="pt-space-md flex flex-wrap items-center justify-between gap-space-md border-t border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <button
                    className="px-space-md py-space-xs rounded bg-transparent hover:bg-error-container text-error font-label-md text-label-md transition-colors"
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to discard this draft?')) {
                        setBody('');
                      }
                    }}
                  >
                    Discard Draft
                  </button>
                  <button
                    className="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                    type="button"
                    onClick={() => alert('Draft saved successfully.')}
                  >
                    Save as Draft
                  </button>
                </div>

                <div className="flex items-center gap-space-sm">
                  <button
                    className="flex items-center gap-space-xs px-space-lg py-2.5 rounded bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-colors shadow-sm"
                    type="submit"
                    disabled={isSending}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isSending ? 'sync' : 'send'}
                    </span>
                    <span>{isSending ? 'Dispatching via SMTP...' : 'Send Quotation & Disconnect Tender'}</span>
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Right Column: Tender Dossier Inspector & Recipient Telemetry (4 Columns) */}
          <aside className="lg:col-span-4 space-y-space-md">
            {/* Live Client Preview Snippet */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">preview</span>
                  <span>Client Outlook / Mobile Preview</span>
                </span>
                <span className="font-label-sm text-label-sm text-outline">Render: Sanitized HTML</span>
              </div>
              <div className="p-space-sm rounded bg-surface-container-low space-y-space-xs">
                <div className="flex items-center gap-space-xs pb-space-xs">
                  <div className="w-6 h-6 rounded bg-primary-container text-on-primary flex items-center justify-center text-[12px] font-bold">V</div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">Vanguard Surgical Precision AG</span>
                    <span className="font-label-sm text-[11px] text-outline">export@vanguard-surgical.com</span>
                  </div>
                </div>
                <div className="text-[12px] text-on-surface font-semibold truncate">
                  {subject}
                </div>
                <p className="text-[12px] text-on-surface-variant line-clamp-3 leading-relaxed">
                  {body}
                </p>
                <div className="pt-space-xs flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px] text-outline">attachment</span>
                  <span className="text-[11px] text-outline">3 institutional attachments included</span>
                </div>
              </div>
            </div>

            {/* Tender Specification Inspector Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Tender Quick Reference</h2>
                <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary-container font-label-sm text-label-sm font-semibold">Active RFQ</span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-space-xs bg-surface-container p-space-sm rounded-lg">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Hospital Authority</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">{recipientHospital}</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Tender Ref ID</span>
                  <span className="font-label-md text-label-md font-semibold text-primary block truncate">{refParam}</span>
                </div>
                <div className="pt-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Tender Deadline</span>
                  <span className="font-label-md text-label-md font-semibold text-error block">Nov 15, 2025</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">18 Days Remaining</span>
                </div>
                <div className="pt-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Verified Port</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface block">Stockholm, Sweden</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">CIP Incoterms 2020</span>
                </div>
              </div>

              {/* Selected SKUs Mini-Cards */}
              <div className="space-y-space-xs">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant block font-semibold">
                  Requested Instrumentation Scope
                </span>
                {DEFAULT_QUOTE_ITEMS.map((sku) => (
                  <div key={sku.sku} className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <img className="w-12 h-12 rounded object-cover bg-surface-container shrink-0" alt={sku.name} src={sku.image} />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">{sku.sku}</span>
                          <span className="font-label-sm text-[10px] px-1 bg-tertiary-fixed text-on-tertiary-fixed rounded">{sku.badge}</span>
                        </div>
                        <span className="font-body-sm text-[12px] text-on-surface truncate">{sku.name}</span>
                        <span className="font-label-sm text-[10px] text-outline">{sku.spec}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-label-md text-label-md font-bold text-on-surface block">{sku.qty} pcs</span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">{sku.lot}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
