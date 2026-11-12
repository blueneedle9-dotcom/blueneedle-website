import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface QuoteItem {
  id: string;
  catalogNo: string;
  description: string;
  qty: number;
  unitPriceEur: number;
  incoterms: string;
  leadTime: string;
}

interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  type: string;
  tag: string;
  icon: string;
}

const INITIAL_ITEMS: QuoteItem[] = [
  {
    id: 'item-1',
    catalogNo: 'BN-TC-8812',
    description: 'TC Mayo-Stille Dissecting Scissors, 17cm Straight, Gold-plated ring grips',
    qty: 800,
    unitPriceEur: 34.5,
    incoterms: 'CIP Berlin TXL',
    leadTime: '14 Days',
  },
  {
    id: 'item-2',
    catalogNo: 'BN-TC-8816',
    description: 'TC Metzenbaum-Nelson Scissors, 20cm Curved, Micro-serrated bevel',
    qty: 400,
    unitPriceEur: 38.2,
    incoterms: 'CIP Berlin TXL',
    leadTime: '14 Days',
  },
  {
    id: 'item-3',
    catalogNo: 'BN-MIC-3301',
    description: 'Adson Micro Tissue Forceps 1x2 Teeth, 12cm (Evaluation Batch)',
    qty: 50,
    unitPriceEur: 0,
    incoterms: 'CIP Berlin TXL',
    leadTime: 'Immediate',
  },
];

const INITIAL_ATTACHMENTS: AttachmentFile[] = [
  {
    id: 'att-1',
    name: 'BLUENEEDLE_Quotation_RFQ_2025_0891.pdf',
    size: '1.2 MB',
    type: 'Signed Commercial Quote',
    tag: 'Verified',
    icon: 'picture_as_pdf',
  },
  {
    id: 'att-2',
    name: 'Material_Test_Report_EN10204_3.1_Lot_9921.pdf',
    size: '840 KB',
    type: 'Metallurgical Passivation Test',
    tag: 'EN 10204',
    icon: 'description',
  },
];

export const AdminEmailSenderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTo = searchParams.get('to') || 'Dr. Julian Vogel <j.vogel@charite.de>';
  const initialSubject =
    searchParams.get('subject') ||
    'Re: Institutional Quotation & Technical Dossier — 1,200x TC Mayo Scissors [RFQ-2025-0891]';

  const [toEmail, setToEmail] = useState(initialTo);
  const [stakeholder, setStakeholder] = useState(
    'Dr. Julian Vogel — Lead Procurement Surgeon, Central Operating Theatre Services, Charité Berlin'
  );
  const [subject, setSubject] = useState(initialSubject);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('wholesale');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const [quoteItems] = useState<QuoteItem[]>(INITIAL_ITEMS);
  const [attachments, setAttachments] = useState<AttachmentFile[]>(INITIAL_ATTACHMENTS);

  const insertTag = (tag: string) => {
    setSubject((prev) => `${prev} ${tag}`);
  };

  const handleApplyTemplate = (type: string) => {
    setSelectedTemplate(type);
    if (type === 'wholesale') {
      setSubject('Re: Institutional Quotation & Technical Dossier — 1,200x TC Mayo Scissors [RFQ-2025-0891]');
    } else if (type === 'techspec') {
      setSubject('Technical Specification Dossier: German DIN 1.4021 Compliance & Passivation Audit');
    } else if (type === 'sample') {
      setSubject('Courier Dispatch Advice: Complimentary Surgical Sample Batch [AWB-992182]');
    } else if (type === 'en10204') {
      setSubject('Certified Material Test Report EN 10204 Type 3.1 — Melt Heat Analysis & Hardness HRC');
    }
  };

  const handleSend = () => {
    setDispatchStatus('sending');
    setTimeout(() => {
      setDispatchStatus('sent');
      setTimeout(() => setDispatchStatus(null), 4000);
    }, 1000);
  };

  const totalEur = quoteItems.reduce((acc, it) => acc + it.qty * it.unitPriceEur, 0);

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility Context Bar / Breadcrumbs & Global Page Actions */}
      <section className="w-full bg-surface-container-lowest px-gutter py-space-md shadow-sm border-b border-surface-container-high">
        <div className="max-w-[1680px] mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-md">
          {/* Titles & Breadcrumb */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption flex-wrap">
              <Link to="/admin" className="hover:text-primary transition-colors">
                Communications
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-secondary">Direct Institutional Dispatch</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-caption-bold text-caption-bold">Compose</span>
              <span className="inline-flex items-center gap-1 ml-space-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-caption text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                SMTP Ready (Node 01)
              </span>
            </div>
            <div className="flex items-baseline gap-space-sm mt-0.5">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Email Sender &amp; Quotation Dispatch
              </h1>
              <span className="hidden sm:inline-block font-caption text-caption text-on-surface-variant">
                | EU MDR 2017/745 Class Ir Compliant
              </span>
            </div>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-4xl line-clamp-1">
              Compose and transmit certified technical specifications, wholesale price schedules, and institutional replies to hospital procurement leads.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
            <div className="relative">
              <select
                aria-label="Load Requisition Draft"
                className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-nav-label text-nav-label focus:outline-none appearance-none cursor-pointer border border-surface-container-high"
              >
                <option>Load Requisition Draft: RFQ-2025-0891 (Charité)</option>
                <option>Load Requisition Draft: TEN-2025-0144 (AP-HP Paris)</option>
                <option>Load Requisition Draft: PRQ-2025-1033 (NHS Greater Glasgow)</option>
              </select>
              <span className="material-symbols-outlined text-base text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                expand_more
              </span>
            </div>
            <button
              className="h-10 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-button-text text-button-text transition-colors flex items-center gap-1.5 border border-surface-container-high"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">library_books</span>
              <span>Manage Templates</span>
            </button>
            <Link
              to="/admin/inquiries"
              className="h-10 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-button-text text-button-text transition-colors flex items-center gap-1.5 border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>View Sent History</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Work Area (Two Columns) */}
      <div className="max-w-[1680px] w-full mx-auto px-gutter py-space-xl">
        {dispatchStatus === 'sent' && (
          <div className="mb-space-md p-4 rounded-xl bg-secondary-container text-on-secondary-fixed border border-secondary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-secondary">
                check_circle
              </span>
              <div>
                <p className="font-body-strong font-bold">
                  Quotation and Dossier Transmitted Successfully!
                </p>
                <p className="text-xs">
                  Official RFQ dispatch email queued to Dr. Julian Vogel &lt;j.vogel@charite.de&gt;. Hospital Tender Audit log entry created.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDispatchStatus(null)}
              className="material-symbols-outlined text-sm hover:opacity-75"
            >
              close
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* ================= LEFT COLUMN: COMPOSER (65% on Desktop) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-lg">
            {/* Recipient & Routing Specs Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">
                    outgoing_mail
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    Dispatch Routing &amp; Recipient
                  </span>
                </div>
                <div className="flex items-center gap-space-sm text-on-surface-variant font-caption text-caption">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-low text-secondary font-caption-bold text-caption-bold">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Verified Recipient Domain
                  </span>
                  <button
                    className="text-secondary hover:text-primary underline"
                    onClick={() => setShowCcBcc(!showCcBcc)}
                    type="button"
                  >
                    {showCcBcc ? 'Hide CC/BCC' : 'Show CC/BCC'}
                  </button>
                </div>
              </div>

              {/* To Field & Recipient Full Identity */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
                <label className="md:col-span-2 font-body-strong text-body-strong text-on-surface">
                  To (Primary):
                </label>
                <div className="md:col-span-10 flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-container-low rounded-lg min-h-[44px] border border-surface-container-high">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest text-primary font-caption-bold text-caption-bold shadow-sm">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      account_circle
                    </span>
                    <span>{toEmail}</span>
                  </span>
                  <input
                    className="bg-transparent text-on-surface font-body-default text-body-default placeholder:text-outline flex-1 min-w-[180px] px-2 focus:outline-none"
                    placeholder="Add additional hospital recipient email..."
                    type="text"
                    onChange={(e) => setToEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* CC / BCC Row */}
              {showCcBcc && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center pt-1">
                  <label className="md:col-span-2 font-caption text-caption text-on-surface-variant">
                    CC / BCC:
                  </label>
                  <div className="md:col-span-10 flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-container-low rounded-lg min-h-[40px] border border-surface-container-high">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-caption text-caption">
                      tender.desk@charite.de
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant cursor-pointer">
                        close
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-caption text-caption">
                      compliance-audit@blueneedle.com (BCC)
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant cursor-pointer">
                        close
                      </span>
                    </span>
                  </div>
                </div>
              )}

              {/* Recipient Stakeholder Title */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
                <label className="md:col-span-2 font-body-strong text-body-strong text-on-surface">
                  Stakeholder:
                </label>
                <div className="md:col-span-10">
                  <input
                    className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface font-body-default text-body-default rounded-lg focus:outline-none border border-surface-container-high"
                    type="text"
                    value={stakeholder}
                    onChange={(e) => setStakeholder(e.target.value)}
                  />
                </div>
              </div>

              {/* Subject Line with Dynamic Merge Tags */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-start">
                <label className="md:col-span-2 pt-2.5 font-body-strong text-body-strong text-on-surface">
                  Subject:
                </label>
                <div className="md:col-span-10 flex flex-col gap-2">
                  <div className="relative">
                    <input
                      className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface font-body-strong text-body-strong rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary border border-surface-container-high"
                      id="subjectInput"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  {/* Quick Merge Insertion Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-caption text-caption text-on-surface-variant mr-1">
                      Insert Dynamic Tokens:
                    </span>
                    <button
                      className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-caption-bold text-[11px] transition-colors"
                      onClick={() => insertTag('[RFQ-ID]')}
                      type="button"
                    >
                      + Tender Ref
                    </button>
                    <button
                      className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-caption-bold text-[11px] transition-colors"
                      onClick={() => insertTag('[SKU-TC-MAYO]')}
                      type="button"
                    >
                      + SKU Code
                    </button>
                    <button
                      className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-caption-bold text-[11px] transition-colors"
                      onClick={() => insertTag('[LOT-9921-25]')}
                      type="button"
                    >
                      + Lot Number
                    </button>
                    <button
                      className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-caption-bold text-[11px] transition-colors"
                      onClick={() => insertTag('[VALIDITY-30D]')}
                      type="button"
                    >
                      + 30-Day Validity
                    </button>
                  </div>
                </div>
              </div>

              {/* Institutional Template Quick-Pick Pills */}
              <div className="pt-space-xs mt-1 bg-surface-container-low/50 p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center gap-2 border border-surface-container-high">
                <span className="font-caption-bold text-caption-bold text-primary shrink-0 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
                  Apply Template:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    className={`px-2.5 py-1 rounded-md font-caption-bold text-caption-bold shadow-xs transition-colors ${
                      selectedTemplate === 'wholesale'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                    onClick={() => handleApplyTemplate('wholesale')}
                    type="button"
                  >
                    Standard Wholesale RFQ Dispatch
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded-md font-caption-bold text-caption-bold shadow-xs transition-colors ${
                      selectedTemplate === 'techspec'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                    onClick={() => handleApplyTemplate('techspec')}
                    type="button"
                  >
                    Technical Spec Verification
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded-md font-caption-bold text-caption-bold shadow-xs transition-colors ${
                      selectedTemplate === 'sample'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                    onClick={() => handleApplyTemplate('sample')}
                    type="button"
                  >
                    Sample Dispatch Notification
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded-md font-caption-bold text-caption-bold shadow-xs transition-colors ${
                      selectedTemplate === 'en10204'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                    onClick={() => handleApplyTemplate('en10204')}
                    type="button"
                  >
                    Material Certificate EN 10204 3.1
                  </button>
                </div>
              </div>
            </div>

            {/* Rich Text Editor Container */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col overflow-hidden border border-surface-container-high">
              {/* Editor Toolbar */}
              <div className="bg-surface-container-low px-space-md py-2 flex flex-wrap items-center gap-1 border-b border-surface-container-high">
                {/* Format Group: Typography */}
                <div className="flex items-center bg-surface-container-lowest rounded-md p-0.5 shadow-xs border border-surface-container-high">
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Bold"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Italic"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_italic</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Underline"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Strikethrough"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">strikethrough_s</span>
                  </button>
                </div>

                <div className="w-px h-6 bg-surface-container-high mx-1 hidden sm:block"></div>

                {/* Format Group: Headings */}
                <div className="flex items-center bg-surface-container-lowest rounded-md p-0.5 shadow-xs border border-surface-container-high">
                  <button
                    className="px-2 h-8 rounded flex items-center gap-1 text-on-surface hover:bg-surface-container font-caption-bold text-caption-bold"
                    title="Heading Level"
                    type="button"
                  >
                    <span>H3 (Institutional)</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                </div>

                <div className="w-px h-6 bg-surface-container-high mx-1 hidden sm:block"></div>

                {/* Format Group: Lists */}
                <div className="flex items-center bg-surface-container-lowest rounded-md p-0.5 shadow-xs border border-surface-container-high">
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Bullet List"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Numbered List"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                  </button>
                </div>

                <div className="w-px h-6 bg-surface-container-high mx-1 hidden sm:block"></div>

                {/* Format Group: Elements */}
                <div className="flex items-center bg-surface-container-lowest rounded-md p-0.5 shadow-xs border border-surface-container-high">
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-secondary hover:bg-surface-container transition-colors"
                    title="Insert Medical Spec Table"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">table_chart</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Insert Link"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">link</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                    title="Insert Technical Code / Lot Tag"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">code</span>
                  </button>
                </div>

                {/* Auto-Save Indicator */}
                <div className="ml-auto hidden xl:flex items-center gap-1.5 text-on-surface-variant font-caption text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Draft auto-saved 14:02 CET</span>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="p-space-lg min-h-[440px] bg-surface-container-lowest text-on-surface focus:outline-none flex flex-col gap-4 font-body-default text-body-default leading-relaxed">
                <p>Dear Dr. Vogel,</p>
                <p>
                  Thank you for forwarding your formal clinical procurement requisition regarding the operating theatre modernization program at Charité – Universitätsmedizin Berlin (Reference: <strong className="font-body-strong text-primary">RFQ-2025-0891</strong>).
                </p>
                <p>
                  We are pleased to submit our formal institutional quotation and regulatory compliance dossier for the requested surgical scissor assemblies. All instruments listed herein are hot-forged from medical-grade AISI 420B and German-sourced Tungsten Carbide (TC) inserts in accordance with <strong className="font-body-strong text-primary">DIN EN ISO 7153-1</strong>.
                </p>

                {/* Embedded Pricing & Technical Matrix Table */}
                <div className="my-2 overflow-x-auto rounded-lg bg-surface-container-low p-1 shadow-xs border border-surface-container-high">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high/60 text-on-surface font-table-header text-table-header uppercase">
                        <th className="py-2.5 px-3">Item / Catalog #</th>
                        <th className="py-2.5 px-3">Description &amp; Metallurgy</th>
                        <th className="py-2.5 px-3 text-right">Qty</th>
                        <th className="py-2.5 px-3 text-right">Unit Price (EUR)</th>
                        <th className="py-2.5 px-3">Incoterms</th>
                        <th className="py-2.5 px-3">Lead Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-high/40 text-on-surface font-body-default text-[13px]">
                      {quoteItems.map((item) => (
                        <tr key={item.id} className="bg-surface-container-lowest">
                          <td className="py-2.5 px-3 font-body-strong text-primary">
                            {item.catalogNo}
                          </td>
                          <td className="py-2.5 px-3">{item.description}</td>
                          <td className="py-2.5 px-3 text-right font-caption-bold">
                            {item.qty} pcs
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {item.unitPriceEur === 0
                              ? 'Complimentary'
                              : `€ ${item.unitPriceEur.toFixed(2)}`}
                          </td>
                          <td className="py-2.5 px-3 font-caption text-caption">
                            {item.incoterms}
                          </td>
                          <td className="py-2.5 px-3 text-secondary font-caption-bold">
                            {item.leadTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-surface-container-high/40 font-caption-bold text-caption-bold text-primary">
                        <td colSpan={2} className="py-2 px-3 text-right">
                          Grand Total (Excl. VAT):
                        </td>
                        <td className="py-2 px-3 text-right">
                          {quoteItems.reduce((acc, it) => acc + it.qty, 0)} pcs
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-sm text-secondary">
                          € {totalEur.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td colSpan={2} className="py-2 px-3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Regulatory Assurance */}
                <p>
                  <strong className="font-body-strong text-primary">Regulatory &amp; Quality Guarantee:</strong> Every single batch is validated via passivation testing (ASTM A967M) and laser-marked with GS1-compliant DataMatrix Unique Device Identifiers (UDI) ensuring lifetime traceability under <strong className="font-body-strong text-primary">EU MDR 2017/745 Class Ir</strong>. The certified Inspection Certificate EN 10204 Type 3.1 is attached for chemical composition review.
                </p>
                <p>
                  Please find our official stamped commercial pro-forma quotation, autoclave lifecycle test reports, and certificate of conformity attached below. This formal quote remains valid for 45 calendar days.
                </p>

                {/* Formal Institutional Sign-off */}
                <div className="mt-4 pt-4 bg-surface-container-low/40 p-4 rounded-lg flex flex-col gap-1 border border-surface-container-high">
                  <span className="font-caption text-caption text-on-surface-variant">
                    Respectfully submitted,
                  </span>
                  <span className="font-body-strong text-body-strong text-primary">
                    Eng. Tariq Mehmood
                  </span>
                  <span className="font-caption-bold text-caption-bold text-secondary">
                    Chief Metallurgist &amp; Lead Regulatory Administrator
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    BLUENEEDLE Surgical Instruments Mfg. Co. | Sialkot Industrial Zone, Pakistan
                  </span>
                  <span className="font-caption text-[11px] text-on-surface-variant">
                    Accredited: ISO 13485:2016 | FDA Establishment Reg. #3008914022 | CE 0123
                  </span>
                </div>
              </div>

              {/* Technical Attachment Tray */}
              <div className="bg-surface-container-low/60 p-space-md flex flex-col gap-3 border-t border-surface-container-high">
                <div className="flex items-center justify-between">
                  <span className="font-caption-bold text-caption-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      attach_file
                    </span>
                    Attached Technical &amp; Commercial Dossiers ({attachments.length} Files, 2.04 MB)
                  </span>
                  <button
                    className="text-secondary hover:text-primary font-caption-bold text-caption-bold flex items-center gap-1"
                    type="button"
                    onClick={() => {
                      const newFile: AttachmentFile = {
                        id: `att-${Date.now()}`,
                        name: 'Certificate_of_Origin_Form_A_Signed.pdf',
                        size: '512 KB',
                        type: 'Customs Clearance Cert',
                        tag: 'Verified',
                        icon: 'picture_as_pdf',
                      };
                      setAttachments((prev) => [...prev, newFile]);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Add Technical Attachment</span>
                  </button>
                </div>

                {/* Attached Items Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="bg-surface-container-lowest p-3 rounded-lg shadow-xs flex items-center justify-between border border-surface-container-high"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">
                            {att.icon}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-strong text-[13px] text-primary truncate">
                            {att.name}
                          </span>
                          <span className="font-caption text-[11px] text-on-surface-variant">
                            {att.size} • {att.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-caption-bold text-[10px]">
                          {att.tag}
                        </span>
                        <button
                          className="p-1 text-on-surface-variant hover:text-error transition-colors"
                          title="Remove attachment"
                          type="button"
                          onClick={() => setAttachments(attachments.filter((a) => a.id !== att.id))}
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar & Regulatory Checkboxes */}
              <div className="bg-surface-container-low px-space-lg py-space-md flex flex-col gap-space-md border-t border-surface-container-high">
                {/* Regulatory Checkboxes */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-caption text-caption">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      defaultChecked
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Attach ISO 13485 &amp; CE Compliance Certificate dossier automatically</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      defaultChecked
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Log in Hospital Tender Audit Vault</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      defaultChecked
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span>Copy export@blueneedle.com</span>
                  </label>
                </div>

                {/* Execution Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    to="/admin/inquiries"
                    className="h-10 px-space-md rounded-lg text-error hover:bg-error-container/40 font-button-text text-button-text transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    <span>Discard Draft</span>
                  </Link>

                  <div className="flex items-center gap-space-sm">
                    <button
                      className="h-10 px-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-button-text text-button-text transition-colors shadow-xs border border-surface-container-high"
                      type="button"
                      onClick={() => {
                        setDispatchStatus('Draft saved locally in session cache.');
                        setTimeout(() => setDispatchStatus(null), 3000);
                      }}
                    >
                      Save Draft
                    </button>
                    <button
                      className="h-10 px-space-xl rounded-lg bg-primary-container text-on-primary hover:bg-primary font-button-text text-button-text shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
                      type="button"
                      disabled={dispatchStatus === 'sending'}
                      onClick={handleSend}
                    >
                      <span>
                        {dispatchStatus === 'sending'
                          ? 'Transmitting...'
                          : 'Send Email & Dispatch Quotation'}
                      </span>
                      <span className="material-symbols-outlined text-base">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: LIVE PREVIEW & TELEMETRY (35% on Desktop) ================= */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-space-lg">
            {/* Live Recipient View Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-surface-container-high">
              {/* Card Header with View Switcher */}
              <div className="bg-surface-container-low px-space-md py-3 flex items-center justify-between border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">preview</span>
                  <span className="font-headline-sm text-[14px] text-primary">
                    Live Recipient View
                  </span>
                </div>
                {/* Preview Toggle Buttons */}
                <div className="flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-xs border border-surface-container-high">
                  <button
                    className={`px-2.5 py-1 rounded font-caption-bold text-[11px] flex items-center gap-1 transition-colors ${
                      previewMode === 'desktop'
                        ? 'bg-surface-container text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={() => setPreviewMode('desktop')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      desktop_windows
                    </span>
                    <span>Desktop</span>
                  </button>
                  <button
                    className={`px-2.5 py-1 rounded font-caption-bold text-[11px] flex items-center gap-1 transition-colors ${
                      previewMode === 'mobile'
                        ? 'bg-surface-container text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={() => setPreviewMode('mobile')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">smartphone</span>
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Email Client Simulation Canvas */}
              <div
                className={`p-space-md bg-surface-container-low/40 flex flex-col gap-3 transition-all ${
                  previewMode === 'mobile' ? 'max-w-[340px] mx-auto' : ''
                }`}
              >
                {/* Email Security & Sender Banner */}
                <div className="bg-surface-container-lowest p-3.5 rounded-lg shadow-xs flex flex-col gap-2 border border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs tracking-wider">
                        BN
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-strong text-[13px] text-primary leading-tight">
                          BLUENEEDLE Export Dispatch
                        </span>
                        <span className="font-caption text-[11px] text-on-surface-variant">
                          &lt;export@blueneedle.com&gt;
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-caption-bold text-[10px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                      TLS 1.3 / DKIM
                    </span>
                  </div>
                  <div className="text-on-surface-variant font-caption text-[11px] pt-1">
                    <span className="font-caption-bold">To:</span> {toEmail}
                  </div>
                  <div className="text-primary font-body-strong text-[13px] line-clamp-2">
                    {subject}
                  </div>
                </div>

                {/* Email Inner Rendered Document */}
                <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs flex flex-col gap-3 font-body-default text-[13px] leading-relaxed text-on-surface border border-surface-container-high">
                  <div className="flex items-center justify-between pb-3 bg-surface-container-low/50 px-3 py-2 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 bg-primary rounded-xs"></div>
                      <span className="font-headline-sm text-xs text-primary font-bold tracking-widest uppercase">
                        BLUENEEDLE SURGICAL
                      </span>
                    </div>
                    <span className="font-caption text-[10px] text-on-surface-variant">
                      ISO 13485 CERTIFIED
                    </span>
                  </div>

                  <p className="mt-1">Dear Dr. Vogel,</p>
                  <p>
                    Thank you for submitting RFQ-2025-0891 for Charité Berlin Operating Theatre services. Quoted pricing conforms to surgical grade AISI 420B with sintered TC inserts.
                  </p>

                  {/* Mini Summary Table in Recipient Preview */}
                  <div className="rounded bg-surface-container-low p-2 border border-surface-container-high">
                    <div className="flex justify-between font-caption-bold text-[11px] text-primary pb-1">
                      <span>Items</span>
                      <span>Qty / Rate</span>
                    </div>
                    {quoteItems.slice(0, 2).map((it) => (
                      <div
                        key={it.id}
                        className="flex justify-between font-caption text-[11px] text-on-surface-variant py-0.5"
                      >
                        <span className="truncate pr-2">{it.description.split(',')[0]}</span>
                        <span className="shrink-0 font-mono">
                          {it.qty}x • €{it.unitPriceEur.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="font-caption text-caption text-on-surface-variant">
                    Official technical quotation and EN 10204 3.1 passivated test certificates are appended as secure PDF attachments.
                  </p>

                  <div className="pt-2 flex flex-col font-caption text-[11px] text-on-surface-variant">
                    <span className="font-caption-bold text-primary">Tariq Mehmood</span>
                    <span>Chief Metallurgist | BLUENEEDLE Sialkot</span>
                  </div>
                </div>

                {/* Recipient Attachments Preview Strip */}
                <div className="bg-surface-container-lowest p-3 rounded-lg shadow-xs flex items-center justify-between text-on-surface font-caption text-[11px] border border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">
                      attach_file
                    </span>
                    <span>{attachments.length} Files Attached (Signed Dossier)</span>
                  </div>
                  <span className="text-secondary font-caption-bold">Direct Secure Download</span>
                </div>
              </div>
            </div>

            {/* Institutional Lead Context Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-3 border border-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary">
                  Hospital Tender Context
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-caption-bold text-[11px]">
                  Active RFQ
                </span>
              </div>
              <div className="flex flex-col gap-2 text-caption font-caption text-on-surface-variant">
                <div className="flex justify-between py-1 border-b border-surface-container-high">
                  <span>Institution:</span>
                  <span className="font-body-strong text-primary">
                    Charité Universitätsmedizin Berlin
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-container-high">
                  <span>Department:</span>
                  <span className="font-body-strong text-primary">
                    Central Operating Theatres
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-container-high">
                  <span>Jurisdiction:</span>
                  <span className="font-body-strong text-primary">
                    Germany (BfArM / EU MDR)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-container-high">
                  <span>Procurement Tier:</span>
                  <span className="font-body-strong text-primary">
                    Tier 1 Direct Wholesale
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Payment Terms:</span>
                  <span className="font-body-strong text-primary">
                    Net 30 Days CAD / Letter of Credit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmailSenderPage;
