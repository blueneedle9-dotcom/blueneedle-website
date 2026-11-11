import React, { useMemo, useState } from 'react';
import { useAdminContext } from '../../components/AdminLayout';

interface InquiryItem {
  id: string;
  tenderId: string;
  name: string;
  roleTitle: string;
  flag: string;
  countryCode: string;
  institution: string;
  shortInstitution: string;
  email: string;
  phone: string;
  facilityId: string;
  deliveryLogistics: string;
  subject: string;
  previewText: string;
  submittedAt: string;
  submittedRelative: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  attachmentName: string;
  attachmentMeta: string;
  specLines: { qty: string; item: string }[];
  closingBody: string;
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-1',
    tenderId: 'BN-RFQ-2024-0894',
    name: 'Dr. Julian Vogel',
    roleTitle: 'Lead Procurement Surgeon',
    flag: '🇩🇪',
    countryCode: 'Germany (DE)',
    institution: 'Charité Universitätsmedizin Berlin',
    shortInstitution: 'Charité Universitätsmedizin (Berlin)',
    email: 'j.vogel@charite-berlin.de',
    phone: '+49 30 450 50',
    facilityId: 'DE-CHARITE-CSSD-04 (Mitte Campus)',
    deliveryLogistics: 'Hamburg (DEHAM) / BER Cargo CIP',
    subject: 'Institutional Tender Quote for 1,200x TC Mayo Scissors & Adson Forceps',
    previewText:
      'We are revising our central sterile surgical tray supply for Q1 2025. Please provide institutional wholesale pricing for DIN ISO standard batches...',
    submittedAt: 'October 25, 2024 — 10:24:18 CET',
    submittedRelative: '2 hours ago',
    status: 'NEW',
    attachmentName: 'Charite_Tender_Spec_Mayo_Adson_2025.xlsx',
    attachmentMeta: '384 KB • Uploaded with inquiry form',
    specLines: [
      {
        qty: '800 units:',
        item: 'Mayo Dissecting Scissors, Straight & Curved (170mm), Tungsten Carbide Gold Rings, DIN EN ISO 7153-1 (Martensitic AISI 420B).',
      },
      {
        qty: '400 units:',
        item: 'Adson Micro Tissue Forceps (120mm, 1x2 Teeth), Satin Finish anti-glare, Rockwell Hardness 50-54 HRC.',
      },
    ],
    closingBody:
      'Please confirm that instruments comply with EU Medical Device Regulation (EU MDR 2017/745) Class Ir standards. Furthermore, we require 2 pre-production sample specimens sent to our central decontamination and CSSD facility in Berlin prior to final tender signoff.',
  },
  {
    id: 'inq-2',
    tenderId: 'BN-RFQ-2024-0891',
    name: 'Sarah Jenkins',
    roleTitle: 'Head Nurse / Lead OR Sourcing',
    flag: '🇬🇧',
    countryCode: 'United Kingdom (UK)',
    institution: 'Barts Health NHS Trust',
    shortInstitution: 'Barts Health NHS Trust, London',
    email: 's.jenkins@bartshealth.nhs.uk',
    phone: '+44 20 7377 7000',
    facilityId: 'UK-BARTS-OR-09 (Whitechapel)',
    deliveryLogistics: 'Felixstowe (GBFXT) / LHR Air Freight',
    subject: 'Orthopedic Kerrison Rongeur 40° & Bone Punch Requisition',
    previewText:
      'NHS Framework renewal: requesting batch quotes on detachable Kerrison punches (2mm, 3mm, 4mm, thin footplate) with satin non-reflective finish...',
    submittedAt: 'October 24, 2024 — 16:15:02 GMT',
    submittedRelative: 'Yesterday, 04:15 PM',
    status: 'NEW',
    attachmentName: 'NHS_Barts_Orthopedic_Lot4_2025.pdf',
    attachmentMeta: '612 KB • Framework tender schedule',
    specLines: [
      {
        qty: '180 units:',
        item: 'Detachable Kerrison Bone Rongeur Up-Cut 40°, 2mm/3mm/4mm Thin Footplate, Cryogenic Tempered AISI 440C.',
      },
      {
        qty: '90 units:',
        item: 'Beyer Double-Action Rongeur 180mm, Satin Anti-Glare Passivated Finish.',
      },
    ],
    closingBody:
      'NHS Supply Chain framework renewal closes November 12. Please include UKCA declaration availability and sterilization cycle warranty documentation.',
  },
  {
    id: 'inq-3',
    tenderId: 'BN-RFQ-2024-0887',
    name: 'Khalid Al-Mansoor',
    roleTitle: 'Managing Director',
    flag: '🇦🇪',
    countryCode: 'United Arab Emirates (UAE)',
    institution: 'MedSupply Gulf Trading LLC',
    shortInstitution: 'MedSupply Gulf Trading, Dubai',
    email: 'procurement@medsupplygulf.ae',
    phone: '+971 4 321 9040',
    facilityId: 'AE-DXB-DIST-12 (Al Quoz Hub)',
    deliveryLogistics: 'Jebel Ali (AEJEA) CIF Cold Chain',
    subject: 'Sole Regional Distribution Agreement & CE Technical Dossier',
    previewText:
      'Looking to extend exclusive distributor rights in GCC healthcare zone for cardiovascular clamp lines. Requesting complete regulatory audit trail...',
    submittedAt: 'October 24, 2024 — 09:42:11 GST',
    submittedRelative: 'Oct 24, 2024',
    status: 'READ',
    attachmentName: 'GCC_Distributor_Compliance_Checklist.pdf',
    attachmentMeta: '920 KB • UAE MOHAP registration dossier',
    specLines: [
      {
        qty: '2,500 units:',
        item: 'Full-spectrum DeBakey Atraumatic Vascular Clamps & Satinsky Tangential Anastomosis Clamps.',
      },
      {
        qty: '500 sets:',
        item: 'Cardiovascular Micro Vessel Dilators with anodized sterilization containers.',
      },
    ],
    closingBody:
      'Kindly dispatch your ISO 13485:2016 certificate, Free Sale Certificate, and proposed annual MOQ schedule for UAE + Saudi Arabia territory coverage.',
  },
  {
    id: 'inq-4',
    tenderId: 'BN-RFQ-2024-0879',
    name: 'Dr. Marcella Rossi',
    roleTitle: 'Head of Ophthalmic Surgery',
    flag: '🇮🇹',
    countryCode: 'Italy (IT)',
    institution: 'Ospedale San Raffaele Milano',
    shortInstitution: 'Ospedale San Raffaele, Milan',
    email: 'm.rossi@sanraffaele.it',
    phone: '+39 02 2643 1',
    facilityId: 'IT-OSR-MICRO-02 (Milano)',
    deliveryLogistics: 'DHL Express Biomedical MXP',
    subject: 'Castroviejo Titanium Micro Forceps & Needle Holder Inquiries',
    previewText:
      'Quotation delivered with Lot Inspection Certificate EN 10204 3.1. Sample kit dispatched via DHL Express AWB #8491024820...',
    submittedAt: 'October 23, 2024 — 14:08:50 CET',
    submittedRelative: 'Oct 23, 2024',
    status: 'REPLIED',
    attachmentName: 'SanRaffaele_Ophthalmic_MicroSets.xlsx',
    attachmentMeta: '210 KB • Ophthalmic tray matrix',
    specLines: [
      {
        qty: '120 units:',
        item: 'Castroviejo Needle Holder Curved Micro 140mm Titanium Gr.5 Blue Anodized.',
      },
      {
        qty: '80 units:',
        item: 'Castroviejo Precision Caliper 0-20mm laser graduated.',
      },
    ],
    closingBody:
      'Evaluation samples confirmed in surgical CSSD review. Awaiting purchase order release by regional Lombardy procurement board.',
  },
  {
    id: 'inq-5',
    tenderId: 'BN-RFQ-2024-0872',
    name: 'Arthur Lindqvist',
    roleTitle: 'Head of Sourcing',
    flag: '🇸🇪',
    countryCode: 'Sweden (SE)',
    institution: 'Nordic Surgical AB',
    shortInstitution: 'Nordic Surgical AB, Gothenburg',
    email: 'a.lindqvist@nordicsurgical.se',
    phone: '+46 31 700 4210',
    facilityId: 'SE-GOT-OEM-07',
    deliveryLogistics: 'Gothenburg Port (SEGOT) / Air',
    subject: 'Private Label Laser Stamping & Custom Die Tooling',
    previewText:
      'MDR technical file validation completed. OEM micro-stamping schematics approved for initial production run of 3,500 scalpel handles...',
    submittedAt: 'October 22, 2024 — 11:55:00 CET',
    submittedRelative: 'Oct 22, 2024',
    status: 'REPLIED',
    attachmentName: 'NordicSurgical_OEM_UDI_Artwork_v3.pdf',
    attachmentMeta: '1.4 MB • GS1 UDI DataMatrix vectors',
    specLines: [
      {
        qty: '3,500 units:',
        item: 'OEM Laser-Etched Crile-Wood TC Needle Holders & No. 3/4 Scalpel Handles with EAN-128 Batch Coding.',
      },
    ],
    closingBody:
      'Artwork proof signed by regulatory officer. First production batch scheduled for ultrasonic passivation.',
  },
];

const QUICK_PRESETS = [
  {
    id: 'rfq',
    label: 'Standard Wholesale RFQ Dispatch',
    buildBody: (inq: InquiryItem) =>
      `Dear ${inq.name},\n\nThank you for reaching out to the BLUENEEDLE surgical instrument engineering team regarding the ${inq.institution} procurement request (${inq.tenderId}).\n\nAll requested instrument series are manufactured under DIN EN ISO 7153-1 and carry CE MDR Class Ir Technical Documentation certified by our European Notified Body.\n\nAttached please find our official Tier-1 Institutional Procurement Quotation and the corresponding Material Test Reports (EN 10204 3.1). Sample evaluation units can ship via express courier within 72 hours.\n\nSincerely,\nTariq Mehmood\nChief Metallurgist & Catalog Lead\nBLUENEEDLE Surgical Instruments`,
  },
  {
    id: 'specs',
    label: 'Request More Clinical Specs',
    buildBody: (inq: InquiryItem) =>
      `Dear ${inq.name},\n\nThank you for your tender inquiry (${inq.tenderId}). To finalize our metallurgical and dimensional tolerance sheet for ${inq.institution}, kindly confirm:\n1. Preferred alloy grade (AISI 420B DIN 1.4021 vs Titanium Gr. 5)\n2. Surface finish requirement (Anti-glare Satin Matte vs Mirror Polish)\n3. Required UDI/DataMatrix laser etching conventions.\n\nBest regards,\nTariq Mehmood\nBLUENEEDLE Engineering Desk`,
  },
  {
    id: 'call',
    label: 'Invite to Technical Engineering Call',
    buildBody: (inq: InquiryItem) =>
      `Dear ${inq.name},\n\nOur lead metallurgical engineer would welcome a 20-minute technical briefing regarding ${inq.subject}. Please let us know your preferred time slot (CET/GMT) so we can walk through sample validation and batch testing certificates.\n\nWarm regards,\nTariq Mehmood\nBLUENEEDLE Surgical Instruments`,
  },
  {
    id: 'mdr',
    label: 'MDR Class Ir Dossier Dispatch',
    buildBody: (inq: InquiryItem) =>
      `Dear ${inq.name},\n\nAttached is our complete EU MDR 2017/745 Class Ir Technical Documentation summary, ISO 13485:2016 Quality Management certificate, and ASTM A967 passivation verification package for ${inq.institution}.\n\nSincerely,\nTariq Mehmood\nQuality Assurance & Regulatory Lead\nBLUENEEDLE Surgical Instruments`,
  },
];

export const AdminInquiriesPage: React.FC = () => {
  const { adminUser } = useAdminContext();

  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_INQUIRIES[0].id);
  const [statusTab, setStatusTab] = useState<'ALL' | 'NEW' | 'REPLIED' | 'ARCHIVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL');
  const [activePreset, setActivePreset] = useState('rfq');
  const [replySubject, setReplySubject] = useState(
    'Re: Institutional Tender Quote for 1,200x TC Mayo Scissors — BLUENEEDLE Sialkot Export & Quality Engineering Desk'
  );
  const [replyBody, setReplyBody] = useState(QUICK_PRESETS[0].buildBody(INITIAL_INQUIRIES[0]));
  const [archiveOnSend, setArchiveOnSend] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const selectedInquiry = useMemo(
    () => inquiries.find((i) => i.id === selectedId) || inquiries[0],
    [inquiries, selectedId]
  );

  const selectInquiry = (inq: InquiryItem) => {
    setSelectedId(inq.id);
    setReplySubject(
      `Re: ${inq.subject} — BLUENEEDLE Sialkot Export & Quality Engineering Desk`
    );
    const preset = QUICK_PRESETS.find((p) => p.id === activePreset) || QUICK_PRESETS[0];
    setReplyBody(preset.buildBody(inq));
  };

  const handlePresetClick = (presetId: string) => {
    setActivePreset(presetId);
    const preset = QUICK_PRESETS.find((p) => p.id === presetId);
    if (preset && selectedInquiry) {
      setReplyBody(preset.buildBody(selectedInquiry));
    }
  };

  const updateSelectedStatus = (newStatus: InquiryItem['status']) => {
    if (!selectedInquiry) return;
    setInquiries((prev) =>
      prev.map((item) => (item.id === selectedInquiry.id ? { ...item, status: newStatus } : item))
    );
    showToast(`${selectedInquiry.tenderId} status updated to ${newStatus}.`);
  };

  const handleMarkAllRead = () => {
    setInquiries((prev) =>
      prev.map((item) => (item.status === 'NEW' ? { ...item, status: 'READ' } : item))
    );
    showToast('All unread institutional inquiries marked as READ.');
  };

  const handleSendDispatch = () => {
    if (!selectedInquiry) return;
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === selectedInquiry.id
          ? { ...item, status: archiveOnSend ? 'REPLIED' : 'READ' }
          : item
      )
    );
    showToast(`Official RFQ response dispatched to ${selectedInquiry.email}.`);
  };

  const filteredInquiries = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return inquiries.filter((inq) => {
      if (statusTab === 'NEW' && inq.status !== 'NEW') return false;
      if (statusTab === 'REPLIED' && inq.status !== 'REPLIED') return false;
      if (statusTab === 'ARCHIVED' && inq.status !== 'ARCHIVED') return false;
      if (countryFilter !== 'ALL' && inq.countryCode !== countryFilter) return false;
      if (!q) return true;
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.institution.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.tenderId.toLowerCase().includes(q)
      );
    });
  }, [inquiries, statusTab, searchTerm, countryFilter]);

  const counts = useMemo(
    () => ({
      all: inquiries.length,
      unread: inquiries.filter((i) => i.status === 'NEW').length,
      replied: inquiries.filter((i) => i.status === 'REPLIED').length,
      archived: inquiries.filter((i) => i.status === 'ARCHIVED').length,
    }),
    [inquiries]
  );

  const operatorName = adminUser?.fullName || 'Tariq Mehmood';

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Top Command Banner / Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-label-code text-label-code text-secondary tracking-widest uppercase">
              REGULATORY &amp; B2B DESK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-technical text-label-technical text-on-surface-variant">
              DIN EN ISO 13485:2016 COMPLIANT
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
            Customer Inquiry Management
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Review, triage, and reply to international hospital tenders, procurement requests, and
            distributor inquiries across regulated health systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            type="button"
            onClick={() => showToast('Exported B2B inquiry log to CSV.')}
            className="flex items-center gap-2 px-space-md py-2.5 rounded bg-surface-container-low text-secondary hover:bg-surface-container hover:text-primary transition-all font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export Inquiries Log (CSV)</span>
          </button>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-space-md py-2.5 rounded bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all font-label-lg text-label-lg font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Operational Metric Strips */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
        <div className="flex flex-col p-space-md bg-surface-container-lowest rounded-xl shadow-sm justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Pending Tenders
            </span>
            <span className="p-1 rounded bg-secondary-container text-on-secondary-container material-symbols-outlined text-[16px]">
              receipt_long
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-headline-md text-headline-md text-primary font-bold">14</span>
            <span className="font-label-code text-label-code text-error font-medium">
              +3 since 08:00 CET
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '32%' }} />
          </div>
        </div>

        <div className="flex flex-col p-space-md bg-surface-container-lowest rounded-xl shadow-sm justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Avg First Response
            </span>
            <span className="p-1 rounded bg-surface-container text-secondary material-symbols-outlined text-[16px]">
              timer
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-headline-md text-headline-md text-primary font-bold">1.4h</span>
            <span className="font-label-code text-label-code text-secondary">
              Target: &lt; 4.0h
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full" style={{ width: '78%' }} />
          </div>
        </div>

        <div className="flex flex-col p-space-md bg-surface-container-lowest rounded-xl shadow-sm justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Territories Active
            </span>
            <span className="p-1 rounded bg-surface-container text-secondary material-symbols-outlined text-[16px]">
              public
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-headline-md text-headline-md text-primary font-bold">21</span>
            <span className="font-label-code text-label-code text-secondary font-medium">
              DACH / NHS / GCC lead
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary-container h-full" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="flex flex-col p-space-md bg-surface-container-lowest rounded-xl shadow-sm justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              RFQ Conversion
            </span>
            <span className="p-1 rounded bg-secondary-container text-on-secondary-container material-symbols-outlined text-[16px]">
              verified
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-headline-md text-headline-md text-primary font-bold">42.8%</span>
            <span className="font-label-code text-label-code text-secondary">MDR Grade Ir items</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary-fixed-dim h-full" style={{ width: '64%' }} />
          </div>
        </div>
      </div>

      {/* Filter, Segment & Parameter Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusTab('ALL')}
            className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-colors whitespace-nowrap ${
              statusTab === 'ALL'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Inquiries{' '}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-code text-label-code">
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusTab('NEW')}
            className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              statusTab === 'NEW'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            New / Unread{' '}
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-code text-label-code font-semibold">
              {counts.unread}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusTab('REPLIED')}
            className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-colors whitespace-nowrap ${
              statusTab === 'REPLIED'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Replied{' '}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-code text-label-code">
              {counts.replied}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusTab('ARCHIVED')}
            className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-colors whitespace-nowrap ${
              statusTab === 'ARCHIVED'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Archived{' '}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-surface-container text-secondary font-label-code text-label-code">
              {counts.archived}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm flex-1 lg:max-w-2xl justify-end">
          <div className="relative flex-1 min-w-[240px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name, hospital, country, or email..."
              className="w-full pl-9 pr-4 py-2 rounded bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
            >
              <option value="ALL">All Countries (DE, UK, UAE, IT, SE)</option>
              <option value="Germany (DE)">Germany (DE)</option>
              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
              <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
              <option value="Italy (IT)">Italy (IT)</option>
              <option value="Sweden (SE)">Sweden (SE)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-secondary pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Primary Two-Column Work Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Inquiry Stream (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <div className="flex items-center gap-2">
              <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                Inquiry Queue
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant">
                (Showing {filteredInquiries.length} of 46)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1 rounded text-secondary hover:bg-surface-container"
                title="Sort by Newest"
              >
                <span className="material-symbols-outlined text-[18px]">swap_vert</span>
              </button>
              <button
                type="button"
                className="p-1 rounded text-secondary hover:bg-surface-container"
                title="Filter Critical"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            {filteredInquiries.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => selectInquiry(inq)}
                  className={`flex flex-col p-space-md rounded-xl bg-surface-container-lowest transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'shadow-md ring-2 ring-primary'
                      : 'shadow-sm hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                  )}

                  <div className={`flex items-start justify-between gap-2 ${isSelected ? 'pl-2' : ''}`}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          {inq.name}
                        </span>
                        <span className="text-[14px]" title={inq.countryCode}>
                          {inq.flag}
                        </span>
                      </div>
                      <span className="font-label-technical text-label-technical text-secondary truncate max-w-[280px]">
                        {inq.shortInstitution}
                      </span>
                    </div>

                    {inq.status === 'NEW' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-code text-label-code font-bold tracking-wider">
                        NEW
                      </span>
                    )}
                    {inq.status === 'READ' && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-code text-label-code font-semibold tracking-wider">
                        READ
                      </span>
                    )}
                    {inq.status === 'REPLIED' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-label-code text-label-code font-semibold tracking-wider">
                        REPLIED
                      </span>
                    )}
                    {inq.status === 'ARCHIVED' && (
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-code text-label-code font-semibold tracking-wider">
                        ARCHIVED
                      </span>
                    )}
                  </div>

                  <div className={`mt-space-sm ${isSelected ? 'pl-2' : ''}`}>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-1">
                      {inq.subject}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                      {inq.previewText}
                    </p>
                  </div>

                  <div
                    className={`mt-space-sm pt-space-xs flex items-center justify-between ${
                      isSelected
                        ? 'pl-2 bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-sm rounded-b-xl'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span className="font-label-code text-label-code">
                        {inq.submittedRelative}
                      </span>
                    </div>
                    <span
                      className={`font-label-code text-label-code ${
                        isSelected ? 'text-primary font-medium' : 'text-on-surface-variant'
                      }`}
                    >
                      {inq.email}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
            <span className="font-label-code text-label-code text-secondary">Page 1 of 10</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="p-1 rounded text-outline hover:bg-surface-container disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-code text-label-code"
              >
                1
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                2
              </button>
              <button
                type="button"
                className="px-2 py-0.5 rounded hover:bg-surface-container text-on-surface font-label-code text-label-code"
              >
                3
              </button>
              <button
                type="button"
                className="p-1 rounded text-secondary hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Detailed Inquiry Dossier & Direct Reply Console (7 cols) */}
        {selectedInquiry && (
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Dossier Panel */}
            <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md p-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-code text-label-code font-bold tracking-wider">
                      {selectedInquiry.status} / {selectedInquiry.status === 'NEW' ? 'AWAITING RESPONSE' : 'DOSSIER ACTIVE'}
                    </span>
                    <span className="font-label-code text-label-code text-secondary">
                      TENDER ID: {selectedInquiry.tenderId}
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-primary font-bold mt-1">
                    {selectedInquiry.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
                      {selectedInquiry.roleTitle}
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-label-lg text-label-lg text-secondary">
                      {selectedInquiry.institution}
                    </span>
                    <span className="text-[16px]">{selectedInquiry.flag}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-emerald-800">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span className="font-label-technical text-label-technical font-medium">
                      Verified Institutional Hospital Domain
                    </span>
                  </div>
                </div>

                {/* Dossier Triage Actions */}
                <div className="flex items-center gap-1.5 self-start bg-surface-container-low p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => updateSelectedStatus('READ')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-surface-container-lowest text-secondary hover:text-primary transition-colors font-label-md text-label-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      mark_email_read
                    </span>
                    <span>Mark Read</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSelectedStatus('REPLIED')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-surface-container-lowest text-secondary hover:text-primary transition-colors font-label-md text-label-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Mark Replied</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSelectedStatus('ARCHIVED')}
                    className="p-1.5 rounded text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
                    title="Archive Inquiry"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              <div className="mt-space-md py-space-xs px-space-sm bg-surface-container-low rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">
                    schedule
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    Submitted: {selectedInquiry.submittedAt}
                  </span>
                </div>
                <span className="font-label-technical text-label-technical text-secondary font-medium">
                  {selectedInquiry.submittedRelative}
                </span>
              </div>

              {/* Clinical Logistics Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-md">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between">
                  <span className="font-label-technical text-label-technical text-secondary uppercase">
                    Direct Institutional Email
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-label-code text-label-code text-primary font-semibold select-all">
                      {selectedInquiry.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(selectedInquiry.email);
                        showToast(`Copied ${selectedInquiry.email} to clipboard.`);
                      }}
                      className="p-1 hover:bg-surface-container rounded text-secondary"
                      title="Copy email"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between">
                  <span className="font-label-technical text-label-technical text-secondary uppercase">
                    Direct Phone / Comms
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-label-code text-label-code text-primary font-semibold">
                      {selectedInquiry.phone}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-label-code text-label-code font-bold">
                      WhatsApp OK
                    </span>
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between">
                  <span className="font-label-technical text-label-technical text-secondary uppercase">
                    Hospital Facility ID
                  </span>
                  <span className="font-label-code text-label-code text-primary font-semibold mt-1">
                    {selectedInquiry.facilityId}
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col justify-between">
                  <span className="font-label-technical text-label-technical text-secondary uppercase">
                    Target Delivery Logistics
                  </span>
                  <span className="font-label-code text-label-code text-primary font-semibold mt-1">
                    {selectedInquiry.deliveryLogistics}
                  </span>
                </div>
              </div>

              {/* Inquiry Body */}
              <div className="mt-space-lg flex flex-col gap-space-xs">
                <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
                  Inquiry Body &amp; Clinical Specification
                </span>
                <div className="p-space-md rounded-lg bg-surface-container-low text-on-surface">
                  <div className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    Subject: {selectedInquiry.subject}
                  </div>
                  <div className="font-body-md text-body-md space-y-3 leading-relaxed">
                    <p>Dear BLUENEEDLE Catalog &amp; Technical Sales Team,</p>
                    <p>{selectedInquiry.previewText}</p>
                    <ul className="list-disc pl-5 space-y-1 font-label-code text-label-code text-on-surface">
                      {selectedInquiry.specLines.map((line) => (
                        <li key={line.item}>
                          <strong className="text-primary font-bold">{line.qty}</strong> {line.item}
                        </li>
                      ))}
                    </ul>
                    <p>{selectedInquiry.closingBody}</p>
                    <p className="font-label-technical text-label-technical text-secondary pt-2">
                      With surgical regards,
                      <br />
                      <strong>{selectedInquiry.name}</strong>
                      <br />
                      {selectedInquiry.roleTitle}
                      <br />
                      {selectedInquiry.institution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachment Strip */}
              <div className="mt-space-md p-space-sm bg-surface-container rounded-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                    attachment
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-primary font-medium truncate">
                      {selectedInquiry.attachmentName}
                    </span>
                    <span className="font-label-code text-label-code text-secondary">
                      {selectedInquiry.attachmentMeta}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Downloading ${selectedInquiry.attachmentName}...`)}
                  className="px-space-sm py-1 rounded bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-technical text-label-technical font-semibold flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Download Spec</span>
                </button>
              </div>
            </div>

            {/* QUICK REPLY CONSOLE */}
            <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md p-space-lg">
              <div className="flex items-center justify-between pb-space-sm flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">reply</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    Direct Institutional Dispatch Console
                  </span>
                </div>
                <span className="font-label-code text-label-code text-secondary">
                  Authenticated Operator: {operatorName}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mt-space-sm">
                <label className="font-label-technical text-label-technical text-secondary uppercase">
                  Quick Response Pre-Sets
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {QUICK_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetClick(preset.id)}
                      className={`px-3 py-1.5 rounded font-label-md text-label-md transition-all ${
                        activePreset === preset.id
                          ? 'bg-primary text-on-primary font-semibold'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-space-md">
                <label className="font-label-technical text-label-technical text-secondary uppercase">
                  Outgoing Subject Line
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="flex flex-col mt-space-md bg-surface-container-low rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 p-2 bg-surface-container flex-wrap">
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-surface-container-lowest text-secondary"
                    title="Bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-surface-container-lowest text-secondary"
                    title="Italic"
                  >
                    <span className="material-symbols-outlined text-[18px]">format_italic</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-surface-container-lowest text-secondary"
                    title="Bulleted List"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      format_list_bulleted
                    </span>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-surface-container-lowest text-secondary"
                    title="Table Insert"
                  >
                    <span className="material-symbols-outlined text-[18px]">table</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-surface-container-lowest text-secondary"
                    title="Attach DIN Spec Link"
                  >
                    <span className="material-symbols-outlined text-[18px]">link</span>
                  </button>
                  <span className="w-px h-4 bg-outline-variant mx-1" />
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    Signature: {operatorName} (Chief Metallurgist / QA Lead)
                  </span>
                </div>
                <textarea
                  rows={7}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full p-space-md bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none leading-relaxed resize-y"
                />
              </div>

              <div className="mt-space-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    picture_as_pdf
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-technical text-label-technical text-primary font-semibold">
                      Attach Quotation PDF / Material Test Report (EN 10204 3.1)
                    </span>
                    <span className="font-label-code text-label-code text-secondary">
                      Auto-attaching: BLUENEEDLE_RFQ_{selectedInquiry.tenderId}.pdf (1.2 MB)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Standard EN 10204 3.1 test packet verified.')}
                  className="px-space-md py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-technical text-label-technical transition-colors"
                >
                  Change File
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-lg pt-space-md">
                <label className="flex items-center gap-2 text-secondary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={archiveOnSend}
                    onChange={(e) => setArchiveOnSend(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                  />
                  <span className="font-label-md text-label-md">
                    Send copy to procurement portal &amp; mark replied in ERP
                  </span>
                </label>

                <div className="flex items-center gap-space-sm w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => showToast(`Draft response saved for ${selectedInquiry.tenderId}.`)}
                    className="px-space-md py-2.5 rounded bg-surface-container-low text-secondary hover:bg-surface-container font-label-lg text-label-lg transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={handleSendDispatch}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-space-lg py-2.5 rounded bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg font-semibold tracking-wide shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Send Official Response &amp; Dispatch RFQ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-space-md py-3 rounded-xl shadow-xl flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          <span className="font-label-lg text-label-lg font-medium">{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
