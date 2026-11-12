import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

interface InquiryItem {
  id: string;
  ref: string;
  name: string;
  email: string;
  hospital: string;
  city: string;
  country: string;
  subject: string;
  scopeSummary: string;
  timestamp: string;
  tenderDeadline?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'REPLIED' | 'CLOSED';
  priority?: 'HIGH' | 'NORMAL';
  discipline: string;
  region: string;
  units: number;
  message: string;
  specLines: { qty: string; item: string }[];
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-1',
    ref: '#INQ-8842',
    name: 'Dr. Arthur Lindqvist',
    email: 'arthur.l@karolinska.se',
    hospital: 'Karolinska University Hospital',
    city: 'Stockholm',
    country: 'Sweden',
    subject: 'RFQ: 150x Metzenbaum-Fino TC Scissors & DeBakey Forceps',
    scopeSummary: 'Cardiovascular Suite Renewal (Batch of 300 surgical units)',
    timestamp: 'Today, 09:42 AM',
    tenderDeadline: 'Tender closes Nov 15',
    status: 'NEW',
    priority: 'HIGH',
    discipline: 'Cardiovascular',
    region: 'Europe',
    units: 300,
    message: 'We are expanding our thoracic operating theaters and require certified DIN EN ISO 7153-1 tungsten carbide instruments with gold-ring visual identification. Autoclave tolerance must reach 134°C with zero pitting across 500 validated cycles.',
    specLines: [
      { qty: '150 units', item: 'Metzenbaum-Fino TC Dissecting Scissors 180mm Curved (DIN 1.4021 / AISI 420B)' },
      { qty: '150 units', item: 'DeBakey Atraumatic Vascular Forceps 2.0mm tip, 200mm working length' }
    ]
  },
  {
    id: 'inq-2',
    ref: '#INQ-8840',
    name: 'Sister Beatrice Renaud',
    email: 'b.renaud@hug.ch',
    hospital: 'Hôpital Universitaire Genève',
    city: 'Geneva',
    country: 'Switzerland',
    subject: 'Custom Laser Marking & 2D DataMatrix Etch Requirements',
    scopeSummary: '400x Hemostatic micro-forceps trace validation',
    timestamp: 'Yesterday, 14:15 PM',
    status: 'IN_PROGRESS',
    discipline: 'Microsurgery',
    region: 'Europe',
    units: 400,
    message: 'In compliance with MDR 2017/745 Article 27, all requested micro-forceps must carry laser-annealed UDI DataMatrix codes compliant with GS1 standards on the instrument shank without degrading surface passivation.',
    specLines: [
      { qty: '400 units', item: 'Castroviejo Micro Forceps 0.3mm Straight with GS1 2D DataMatrix' }
    ]
  },
  {
    id: 'inq-3',
    ref: '#INQ-8837',
    name: 'Klaus Bergmann',
    email: 'k.bergmann@medizintechnik-berlin.de',
    hospital: 'Medizintechnik Berlin GmbH',
    city: 'Berlin',
    country: 'Germany',
    subject: 'Bulk Order Specification: Grade 5 Ti-6Al-4V Castroviejo Micro Needle Holders',
    scopeSummary: 'Distributor procurement contract renewal for Q1 2026',
    timestamp: 'Oct 22, 2025',
    status: 'REPLIED',
    discipline: 'Microsurgery',
    region: 'Europe',
    units: 250,
    message: 'Renewing our annual framework contract for German regional surgical centers. Requesting factory test certificates DIN 50049 3.1B with batch metallurgy spectrometer breakdowns.',
    specLines: [
      { qty: '250 units', item: 'Castroviejo Micro Needle Holder 140mm straight with TC jaw inserts' }
    ]
  },
  {
    id: 'inq-4',
    ref: '#INQ-8835',
    name: 'Dr. Sofia Rossi',
    email: 'sofia.rossi@maggiore.milano.it',
    hospital: 'Ospedale Maggiore Milano',
    city: 'Milan',
    country: 'Italy',
    subject: 'Request for DIN EN ISO 13485:2016 Conformity Certificate & Autoclave Log',
    scopeSummary: 'Autoclave 134°C sterilization compatibility validation',
    timestamp: 'Oct 21, 2025',
    status: 'REPLIED',
    discipline: 'General Surgery',
    region: 'Europe',
    units: 120,
    message: 'Hospital CSSD audit is reviewing all supplier dossiers. Please dispatch the CE 0123 / ISO 13485:2016 Annex II declaration along with corrosion test reports ASTM F1089.',
    specLines: [
      { qty: '120 units', item: 'Standard Crile-Wood & Mayo Instrumentation Sets' }
    ]
  },
  {
    id: 'inq-5',
    ref: '#INQ-8829',
    name: 'Prof. Alistair MacIntyre',
    email: 'a.macintyre@nhslothian.scot.nhs.uk',
    hospital: 'Royal Edinburgh Infirmary',
    city: 'Edinburgh',
    country: 'United Kingdom',
    subject: 'Tender Specification: 80x Kerrison Bone Rongeurs (40° Up-Biting)',
    scopeSummary: 'Diamond-Like Carbon (DLC) coating durability review',
    timestamp: 'Oct 20, 2025',
    status: 'IN_PROGRESS',
    discipline: 'Orthopedic DLC',
    region: 'Europe',
    units: 80,
    message: 'Evaluating DLC ceramic coating for spinal decompression procedures. We require micro-hardness specifications exceeding 2,200 HV and zero chip rate under high-frequency sonic cleaning.',
    specLines: [
      { qty: '40 units', item: 'Kerrison Bone Rongeur 40° Up-Biting 2mm thin footplate (DLC Black)' },
      { qty: '40 units', item: 'Kerrison Bone Rongeur 40° Up-Biting 3mm standard footplate (DLC Black)' }
    ]
  },
  {
    id: 'inq-6',
    ref: '#INQ-8822',
    name: 'Elena Varga',
    email: 'e.varga@semmelweis.hu',
    hospital: 'Semmelweis Clinical Centre',
    city: 'Budapest',
    country: 'Hungary',
    subject: 'Annual Orthopedic Instrumentation Supply Contract Evaluation',
    scopeSummary: 'Master framework signed for 2026-2027 fiscal term',
    timestamp: 'Oct 19, 2025',
    status: 'CLOSED',
    discipline: 'Orthopedic DLC',
    region: 'Europe',
    units: 500,
    message: 'Formal contract award following European Union public tender procurement notice. Signed purchase order PO-8192 attached for execution.',
    specLines: [
      { qty: '500 units', item: 'Standardized Bone Curettes, Elevators, and Weitlaner Retractors' }
    ]
  }
];

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [disciplineFilter, setDisciplineFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [selectedId, setSelectedId] = useState<string>('inq-1');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>({ 'inq-1': true });

  const activeInquiry = useMemo(() => {
    return inquiries.find((i) => i.id === selectedId) || inquiries[0];
  }, [inquiries, selectedId]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
      if (disciplineFilter !== 'ALL' && item.discipline !== disciplineFilter) return false;
      if (regionFilter !== 'ALL' && item.region !== regionFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.ref.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.hospital.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [inquiries, searchQuery, statusFilter, disciplineFilter, regionFilter]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const next: Record<string, boolean> = {};
    if (checked) {
      filteredInquiries.forEach((item) => {
        next[item.id] = true;
      });
    }
    setSelectedCheckboxes(next);
  };

  const toggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const updateStatus = (id: string, newStatus: InquiryItem['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg lg:p-margin flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
        {/* Top Breadcrumb & Page Header */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline tracking-wider uppercase mb-1">
                <span>Hospital Logistics</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span>Tenders & Procurements</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Customer Inquiries
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-0.5">
                Manage institutional procurement tenders, hospital quotes, and global surgical distribution requests submitted via public showcase.
              </p>
            </div>

            {/* Quick Actions Group */}
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded transition-colors shadow-sm"
                type="button"
                onClick={() => alert('Filtering by current quarter tenders (Q4 2025)')}
              >
                <span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
                <span>Date Range</span>
              </button>
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded transition-colors shadow-sm"
                type="button"
                onClick={() => {
                  setInquiries((prev) => prev.map((item) => ({ ...item, status: item.status === 'NEW' ? 'IN_PROGRESS' : item.status })));
                  alert('Marked all new tenders as In Progress.');
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-outline">done_all</span>
                <span>Batch Mark as Reviewed</span>
              </button>
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md rounded transition-all shadow-sm"
                type="button"
                onClick={() => alert('Exporting tenders to Vanguard_Tenders_Registry_2025.csv')}
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export Inquiries (.CSV)</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-md">
          {/* Total Inquiries */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Total Inquiries</span>
              <span className="material-symbols-outlined text-outline text-[20px]">inventory</span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">148</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">All-time recorded tenders</p>
            </div>
          </div>

          {/* Action Required */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-2 h-full bg-error"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                Action Required
              </span>
              <span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Priority</span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-headline-lg font-bold text-error leading-none">28</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Awaiting initial review</p>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">In Progress</span>
              <span className="material-symbols-outlined text-outline text-[20px]">engineering</span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">18</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Metallurgy / pricing review</p>
            </div>
          </div>

          {/* Replied */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Replied</span>
              <span className="material-symbols-outlined text-outline text-[20px]">mark_email_read</span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">86</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Formal quotes dispatched</p>
            </div>
          </div>

          {/* Closed / Won */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Closed / Won</span>
              <span className="material-symbols-outlined text-primary-container text-[20px]">verified</span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">16</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Converted to purchase orders</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls Panel */}
        <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center justify-between">
          {/* Search Input Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm rounded focus:bg-surface-container-lowest outline-none transition-all"
              placeholder="Search by customer name, hospital / institution, inquiry ID, or subject..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters & Sorting Bar */}
          <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded">
              <span className="font-label-sm text-label-sm text-outline uppercase pl-1">Status:</span>
              <select
                className="bg-transparent font-label-md text-label-md text-on-surface outline-none cursor-pointer pr-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New (Action Required)</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REPLIED">Replied</option>
                <option value="CLOSED">Closed / Won</option>
              </select>
            </div>

            {/* Discipline Filter */}
            <div className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded">
              <span className="font-label-sm text-label-sm text-outline uppercase pl-1">Discipline:</span>
              <select
                className="bg-transparent font-label-md text-label-md text-on-surface outline-none cursor-pointer pr-1"
                value={disciplineFilter}
                onChange={(e) => setDisciplineFilter(e.target.value)}
              >
                <option value="ALL">All Disciplines</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Microsurgery">Microsurgery</option>
                <option value="Orthopedic DLC">Orthopedic DLC</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded">
              <span className="font-label-sm text-label-sm text-outline uppercase pl-1">Region:</span>
              <select
                className="bg-transparent font-label-md text-label-md text-on-surface outline-none cursor-pointer pr-1"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="ALL">All Regions</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Middle East">Middle East</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Inquiries Table Container */}
        <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">
                    <input
                      className="rounded-sm accent-primary-container cursor-pointer w-4 h-4"
                      type="checkbox"
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4">Inquiry Ref & Contact</th>
                  <th className="py-3 px-4">Hospital / Entity</th>
                  <th className="py-3 px-4">Subject & Scope Summary</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Status & Priority</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface">
                {filteredInquiries.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary-fixed/20 hover:bg-primary-fixed/30' : 'hover:bg-surface-container-low'
                      }`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <td
                        className="py-4 px-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          checked={!!selectedCheckboxes[item.id]}
                          className="rounded-sm accent-primary-container cursor-pointer w-4 h-4"
                          type="checkbox"
                          onChange={() => toggleCheckbox(item.id)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface">{item.ref}</span>
                            {item.status === 'NEW' && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                          </div>
                          <span className="font-semibold text-primary">{item.name}</span>
                          <span className="font-label-sm text-label-sm text-outline">{item.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface">{item.hospital}</span>
                          <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                            {item.city}, {item.country}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-sm">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface truncate">{item.subject}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant truncate">{item.scopeSummary}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface">{item.timestamp}</span>
                          {item.tenderDeadline && (
                            <span className="font-label-sm text-label-sm text-error font-medium">{item.tenderDeadline}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {item.status === 'NEW' && (
                            <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                              NEW
                            </span>
                          )}
                          {item.status === 'IN_PROGRESS' && (
                            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold uppercase">
                              IN PROGRESS
                            </span>
                          )}
                          {item.status === 'REPLIED' && (
                            <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold uppercase">
                              REPLIED
                            </span>
                          )}
                          {item.status === 'CLOSED' && (
                            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold uppercase">
                              CLOSED / WON
                            </span>
                          )}
                          {item.priority === 'HIGH' && (
                            <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                              URGENT TENDER
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="py-4 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            className={`px-2.5 py-1 font-label-md text-label-md rounded transition-colors shadow-sm ${
                              isSelected ? 'bg-primary text-on-primary hover:bg-primary-container' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                            }`}
                            type="button"
                            onClick={() => setSelectedId(item.id)}
                          >
                            Inspect
                          </button>
                          <Link
                            to={`/admin/email-compose?to=${encodeURIComponent(item.email)}&subject=${encodeURIComponent('RE: ' + item.subject)}&ref=${item.ref}`}
                            className="p-1 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container"
                            title="Reply via Email Sender"
                          >
                            <span className="material-symbols-outlined text-[18px]">reply</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm font-label-md text-label-md text-on-surface-variant">
            <span>
              Showing <strong>1 - {filteredInquiries.length}</strong> of <strong>148</strong> total tenders
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-outline disabled:opacity-40 cursor-not-allowed" disabled type="button">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <span className="px-2.5 py-1 bg-primary text-on-primary font-bold rounded">1</span>
              <button className="px-2.5 py-1 hover:bg-surface-container-high rounded text-on-surface" type="button">2</button>
              <button className="px-2.5 py-1 hover:bg-surface-container-high rounded text-on-surface" type="button">3</button>
              <span className="px-1 text-outline">...</span>
              <button className="px-2.5 py-1 hover:bg-surface-container-high rounded text-on-surface" type="button">25</button>
              <button className="p-1 rounded hover:bg-surface-container-high text-on-surface" type="button">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Inquiry Inspection Workspace (High-Fidelity Slideout/Modal Inspector) */}
        {activeInquiry && (
          <div className="bg-surface-container-lowest rounded-lg shadow-xl overflow-hidden flex flex-col mt-space-sm border border-surface-container-high">
            {/* Inspector Header Banner */}
            <div className="bg-primary px-space-lg py-space-md text-on-primary flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm font-bold tracking-tight">
                      Inquiry {activeInquiry.ref}
                    </span>
                    {activeInquiry.status === 'NEW' && (
                      <span className="px-2.5 py-0.5 bg-error text-on-error rounded font-label-sm text-label-sm uppercase tracking-wider font-bold">
                        NEW - High Priority
                      </span>
                    )}
                    {activeInquiry.tenderDeadline && (
                      <span className="px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded font-label-sm text-label-sm font-semibold">
                        {activeInquiry.tenderDeadline}
                      </span>
                    )}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-primary-container">
                    {activeInquiry.subject}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-space-xs">
                <button
                  className="p-2 rounded hover:bg-primary-container transition-colors text-on-primary"
                  title="Print Technical Summary"
                  type="button"
                  onClick={() => window.print()}
                >
                  <span className="material-symbols-outlined text-[20px]">print</span>
                </button>
                <div className="h-6 w-[1px] bg-primary-container"></div>
                <Link
                  to={`/admin/email-compose?to=${encodeURIComponent(activeInquiry.email)}&subject=${encodeURIComponent('RE: ' + activeInquiry.subject)}&ref=${activeInquiry.ref}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-container hover:bg-primary-fixed hover:text-on-primary-fixed rounded text-on-primary font-label-md text-label-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                  <span>Dispatch Quote</span>
                </Link>
              </div>
            </div>

            {/* Inspector Details Grid */}
            <div className="p-space-lg grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              {/* Left 2 Cols: Details & Scope */}
              <div className="lg:col-span-2 flex flex-col gap-space-md">
                <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Client Procurement Dossier
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">Received: {activeInquiry.timestamp}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <div className="font-label-sm text-label-sm text-outline">Surgeon / Contact</div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface">{activeInquiry.name}</div>
                      <div className="font-body-sm text-body-sm text-primary">{activeInquiry.email}</div>
                    </div>
                    <div>
                      <div className="font-label-sm text-label-sm text-outline">Healthcare Entity</div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface">{activeInquiry.hospital}</div>
                      <div className="font-body-sm text-body-sm text-outline">{activeInquiry.city}, {activeInquiry.country}</div>
                    </div>
                    <div>
                      <div className="font-label-sm text-label-sm text-outline">Discipline & Volume</div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface">{activeInquiry.discipline}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant font-medium">{activeInquiry.units} Instruments Required</div>
                    </div>
                  </div>
                </div>

                {/* Tender Specification Lines */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-label-md text-label-md uppercase tracking-wider font-semibold text-on-surface">
                    Specified Surgical Configurations & Metallurgy
                  </h4>
                  <div className="space-y-2">
                    {activeInquiry.specLines.map((line, idx) => (
                      <div key={idx} className="p-space-sm bg-surface-container-lowest border border-surface-container-high rounded flex items-start gap-3">
                        <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm font-bold text-primary whitespace-nowrap">
                          {line.qty}
                        </span>
                        <div className="font-body-sm text-body-sm text-on-surface">{line.item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Note / Message */}
                <div className="flex flex-col gap-1.5 p-space-md bg-surface-container-lowest border border-surface-container-high rounded-lg">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                    Client RFP Direct Message & Notes
                  </span>
                  <p className="font-body-md text-body-md text-on-surface italic">
                    "{activeInquiry.message}"
                  </p>
                </div>
              </div>

              {/* Right Col: Triage Actions & Workflow */}
              <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-lg">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                  Triage Status Control
                </span>

                <div className="space-y-2">
                  {(['NEW', 'IN_PROGRESS', 'REPLIED', 'CLOSED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateStatus(activeInquiry.id, st)}
                      className={`w-full py-2 px-3 rounded flex items-center justify-between font-label-md text-label-md transition-all ${
                        activeInquiry.status === st
                          ? 'bg-primary text-on-primary font-bold shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span>
                        {st === 'NEW' && 'Mark as New (Action Required)'}
                        {st === 'IN_PROGRESS' && 'Set In Progress (Engineering)'}
                        {st === 'REPLIED' && 'Set as Replied (Formal Quote)'}
                        {st === 'CLOSED' && 'Mark as Closed / Won (PO)'}
                      </span>
                      {activeInquiry.status === st && (
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="h-[1px] bg-surface-container-highest my-1"></div>

                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                    Compliance & QA Attachments
                  </span>
                  <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-container-high flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                      <div className="flex flex-col text-left">
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">DIN_ISO_13485_Conformity.pdf</span>
                        <span className="font-label-sm text-label-sm text-outline">1.4 MB • Auto-attached</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px] cursor-pointer hover:text-on-surface">download</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest rounded border border-surface-container-high flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                      <div className="flex flex-col text-left">
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">ASTM_F1089_Boil_Test_Pass.pdf</span>
                        <span className="font-label-sm text-label-sm text-outline">890 KB • Metallurgical Lab</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px] cursor-pointer hover:text-on-surface">download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
