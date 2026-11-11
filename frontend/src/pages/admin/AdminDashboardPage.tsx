import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

interface RecentInquiryRow {
  initials: string;
  contact: string;
  subLabel: string;
  institution: string;
  countryCode: string;
  location: string;
  subject: string;
  specNote: string;
  submitted: string;
  status: 'NEW' | 'READ' | 'REPLIED';
}

interface RecentProductItem {
  name: string;
  specLine: string;
  addedLabel: string;
  status: 'Published' | 'Draft Review';
  imageUrl: string;
  imageAlt: string;
}

const RECENT_INQUIRIES: RecentInquiryRow[] = [
  {
    initials: 'JV',
    contact: 'Dr. Julian Vogel',
    subLabel: 'jvogel@charite.de',
    institution: 'Charité Universitätsmedizin',
    countryCode: 'DE',
    location: 'Berlin, Germany',
    subject: 'Bulk Requisition for TC Mayo Scissors & Adson Forceps',
    specNote: 'Target: 350 Units DIN 1.4021',
    submitted: 'Today, 10:24 AM',
    status: 'NEW',
  },
  {
    initials: 'SJ',
    contact: 'Sarah Jenkins',
    subLabel: 'Head Nurse / Lead OR',
    institution: 'Barts Health NHS Trust',
    countryCode: 'GB',
    location: 'London, UK',
    subject: 'Orthopedic Rongeur & Kerrison Punch Specifications',
    specNote: 'Tender Spec Verification',
    submitted: 'Yesterday, 04:15 PM',
    status: 'NEW',
  },
  {
    initials: 'KM',
    contact: 'Khalid Al-Mansoor',
    subLabel: 'Managing Director',
    institution: 'MedSupply Gulf Trading LLC',
    countryCode: 'AE',
    location: 'Dubai, UAE',
    subject: 'Annual Distributor Agreement & CE Technical Dossier',
    specNote: 'MDR 2017/745 Class I Re-file',
    submitted: 'Oct 24, 2024',
    status: 'READ',
  },
  {
    initials: 'MR',
    contact: 'Dr. Marcella Rossi',
    subLabel: 'Head of Ophthalmic Surgery',
    institution: 'Ospedale San Raffaele Milano',
    countryCode: 'IT',
    location: 'Milan, Italy',
    subject: 'Castroviejo Micro Caliper & Ophthalmic Sets',
    specNote: 'Titanium Alloy Specs Required',
    submitted: 'Oct 23, 2024',
    status: 'REPLIED',
  },
  {
    initials: 'AL',
    contact: 'Arthur Lindqvist',
    subLabel: 'Head of Sourcing',
    institution: 'Nordic Surgical AB',
    countryCode: 'SE',
    location: 'Stockholm, Sweden',
    subject: 'Private Label OEM Stamping for Crile-Wood Needle Holders',
    specNote: 'Laser Etched EAN-128 Batching',
    submitted: 'Oct 22, 2024',
    status: 'REPLIED',
  },
];

const RECENT_PRODUCTS: RecentProductItem[] = [
  {
    name: 'Mayo Dissecting Scissors',
    specLine: 'Straight 170mm, TC • BN-SC-1021',
    addedLabel: 'Added Today',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCi2JEk-jBlhyKbXvVrtTkcWrO8degpzLGsNZ8xqCxRjDdcFqq0RDF6TabwBfRDoW4CvgGXVTz4jMORVjOy_e9LA-95Vrx8YU3f9eNBVivbOCoiqTC1-BjvBWPMuIW31FqJLNKVNH59gV-5vDkR6An0lNJR0hWP_2cCk2PgKyWKT70SQzUOqqjDij1YZXSfqxNgsQdh2BUNask-8iHQIvHbi-EpcPVC9-ewEHkmeQo',
    imageAlt:
      'High precision close-up of surgical stainless steel Mayo Dissecting Scissors with gold plated tungsten carbide finger rings',
  },
  {
    name: 'Adson Micro Tissue Forceps',
    specLine: '1x2 Teeth, 120mm • BN-FC-2180',
    addedLabel: 'Added Yesterday',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6XfuijZzLuyTzmXbUsBSiZB157i3OmGAvhmRgHoy_u4_6xan-9h0b7C1hwj8s8UXnF2a9RaXbIzY4e5ho6SVirFCmXFmKiX1Stt5GhqbsxoItRvzLFs4xZQTddP0UWaf7waO7Nd42K2IPmk9cFIzTkcnmACrfatGiqD4fa2DuGM2H2YCQYwMan-Q0O22nRWGLmr9pvQjuzz2z0_eoRdxXRNWpQTDTeR-oVhmSA7o',
    imageAlt:
      'Macro product photo of medical grade Adson Micro Tissue Forceps with fine 1x2 teeth tips',
  },
  {
    name: 'Kerrison Bone Rongeur',
    specLine: 'Up-Cut 40° 4mm • BN-OR-6120',
    addedLabel: 'Oct 21, 2024',
    status: 'Draft Review',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCM7HaVvz8HnHE1Zmfk8UbUkaQodTp9J7hNhCIQL9EWBFH35zCyGPrdyodBZ1QHA6BdoGjTbaWvqs1FW0Nprui_7qWQRZN-0h-V4bhxUlGsW-eZw08xC5UEh2KLnhzqcXYTS_AHtIlG0RgEJSR1DHxMzOP8iur1PuBCnlKcRVbHsGSYiS78LIuw0wcDN6fDwsE56bwyyHpXYjl0YG-Q5MMlmXSYt9JBL1FUmYKgWvY',
    imageAlt:
      'Orthopedic Kerrison Bone Rongeur heavy surgical instrument angled view',
  },
  {
    name: 'Castroviejo Needle Holder',
    specLine: 'Micro Straight, Lock • BN-OP-7005',
    addedLabel: 'Oct 19, 2024',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDS1HwqPaQZojTw37R5PdHn2KE0O7w5u9c5d9MjZT-X8MqLnvf6l8GtUoQ5EQ6gl177-3uxVxdcaPI48Qj2P9ICM4Ct6LSEVj4MQEkHF8KSMbKwd8gicetD-U09gpoeDxjYPZbxs60m77M-alQjXC_MWF6977UeJGkpayNg612O4RrCgMWQ_sh7lx7CnwtMsxs4Ko0747HTF9DVMjq1dCnQo6A7VEDGGYqquBLZWPo',
    imageAlt:
      'Micro Castroviejo Needle Holder with intricate knurled handle and micro jaws',
  },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { adminUser } = useAdminContext();
  const [reindexing, setReindexing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(
    'Synchronized (Last updated 12 mins ago by Tariq M.)'
  );

  const handleForceReindex = () => {
    setReindexing(true);
    setTimeout(() => {
      setReindexing(false);
      setSyncMessage('Synchronized (Re-indexed just now across CLUSTER-FRANKFURT-04)');
    }, 800);
  };

  const welcomeName = adminUser?.fullName || 'Eng. Tariq Mehmood';

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      {/* Operational Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
              Operational Command
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-code text-label-code text-on-surface-variant">
              NODE-EU-CENTRAL-1
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
            Operations &amp; Catalog Overview
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Welcome back, <span className="font-semibold text-primary">{welcomeName}</span>. Here is the
            operational summary of your catalogue and institutional customer inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center shrink-0">
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-low text-secondary hover:bg-surface-container-high hover:text-primary transition-colors font-label-lg text-label-lg shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              mark_email_unread
            </span>
            <span>Review Inquiries</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-code text-label-code font-semibold">
              14 Unread
            </span>
          </Link>
          <button
            type="button"
            onClick={() => navigate('/admin/products?new=1')}
            className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-lg text-label-lg shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              SKU Master Count
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-display text-primary font-semibold leading-none tracking-tight">
                2,480
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-primary-fixed-variant font-label-code text-label-code">
                Active in Catalogue
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                trending_up
              </span>
              <span className="font-medium text-primary">+18</span> registered this month
            </p>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-4/5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Clinical Disciplines
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">folder_copy</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-display text-primary font-semibold leading-none tracking-tight">
                12
              </span>
              <span className="font-label-code text-label-code text-on-surface-variant">
                Taxonomy Nodes
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate pt-1">
              Surgical, Dental, Orthopedic, Ophthalmic &amp; Micro
            </p>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-secondary-container h-full rounded-full w-full" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Institutional Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined text-[20px]">
                mark_email_unread
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-display text-primary font-semibold leading-none tracking-tight">
                14
              </span>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-code text-label-code font-bold">
                Urgent Attention
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">
              <span className="font-semibold text-primary">8</span> EU/US Hospitals,{' '}
              <span className="font-semibold text-primary">6</span> Distributors
            </p>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-error h-full rounded-full w-3/5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between space-y-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              B2B Public Gateway
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-display text-primary font-semibold leading-none tracking-tight">
                2,415
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-secondary-container font-label-code text-label-code font-semibold">
                97.4% Live
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">
              <span className="font-medium text-primary">65</span> Pending QA / Metallurgical Review
            </p>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full rounded-full w-[97%]" />
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* Recent Institutional Inquiries Table (8 cols) */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                    Recent Institutional Inquiries
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-code text-label-code font-medium">
                    B2B Tender Log
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Validated hospital procurement directors and private label RFQ drafts.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="font-label-code text-label-code text-secondary">
                  Auto-sync 30s
                </span>
                <div className="w-2 h-2 rounded-full bg-secondary" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-technical text-label-technical uppercase tracking-wider">
                    <th className="py-3 px-space-md">Procurement Contact</th>
                    <th className="py-3 px-space-md">Institution &amp; Region</th>
                    <th className="py-3 px-space-md">Subject / Requisition Scope</th>
                    <th className="py-3 px-space-md">Submitted</th>
                    <th className="py-3 px-space-md">Status</th>
                    <th className="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {RECENT_INQUIRIES.map((row) => (
                    <tr
                      key={row.contact}
                      className="hover:bg-surface-container-low/50 transition-colors"
                    >
                      <td className="py-3.5 px-space-md font-semibold text-primary">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-code text-label-code font-bold shrink-0">
                            {row.initials}
                          </div>
                          <div className="flex flex-col">
                            <span>{row.contact}</span>
                            <span className="font-label-code text-label-code text-on-surface-variant font-normal">
                              {row.subLabel}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col">
                          <span className="font-medium text-primary">{row.institution}</span>
                          <span className="font-label-code text-label-code text-on-surface-variant flex items-center gap-1">
                            <span className="px-1 py-0.2 rounded bg-surface-container font-bold text-[10px]">
                              {row.countryCode}
                            </span>{' '}
                            {row.location}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md max-w-xs">
                        <p className="truncate font-medium text-primary" title={row.subject}>
                          {row.subject}
                        </p>
                        <span className="font-label-code text-label-code text-secondary">
                          {row.specNote}
                        </span>
                      </td>
                      <td className="py-3.5 px-space-md font-label-code text-label-code text-on-surface-variant whitespace-nowrap">
                        {row.submitted}
                      </td>
                      <td className="py-3.5 px-space-md whitespace-nowrap">
                        {row.status === 'NEW' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-technical text-label-technical font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> NEW
                          </span>
                        )}
                        {row.status === 'READ' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-primary-fixed-variant font-label-technical text-label-technical">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> READ
                          </span>
                        )}
                        {row.status === 'REPLIED' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-technical text-label-technical font-medium">
                            <span className="material-symbols-outlined text-[14px]">done_all</span> REPLIED
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-space-md text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => navigate('/admin/inquiries')}
                            className="p-1 rounded text-secondary hover:text-primary hover:bg-surface-container-high transition-colors"
                            title="View Dossier"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate('/admin/inquiries')}
                            className="p-1 rounded text-secondary hover:text-primary hover:bg-surface-container-high transition-colors"
                            title="Dispatch Quotation"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {row.status === 'REPLIED' ? 'history' : 'reply'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-space-md bg-surface-container-low flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-on-surface-variant">
              Showing latest 5 of 14 outstanding inquiries
            </span>
            <Link
              to="/admin/inquiries"
              className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-secondary font-semibold transition-colors"
            >
              <span>View All Inquiries</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Recently Added Products Panel (4 cols) */}
        <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-space-lg flex items-center justify-between bg-surface-container-lowest">
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                  Recently Added Products
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Engineering catalogue additions &amp; revisions.
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary text-[22px]">
                precision_manufacturing
              </span>
            </div>

            <div className="divide-y divide-surface-container">
              {RECENT_PRODUCTS.map((item) => (
                <div
                  key={item.name}
                  className="p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex-shrink-0 flex items-center justify-center text-secondary relative overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-primary font-semibold truncate">
                        {item.name}
                      </span>
                      <span className="font-label-code text-label-code text-secondary truncate">
                        {item.specLine}
                      </span>
                      <span className="font-label-technical text-label-technical text-on-surface-variant mt-0.5">
                        {item.addedLabel}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={
                        item.status === 'Published'
                          ? 'px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-technical text-label-technical font-semibold'
                          : 'px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-technical text-label-technical'
                      }
                    >
                      {item.status}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="p-1 rounded text-secondary hover:text-primary hover:bg-surface-container-high transition-colors"
                        title="Edit Spec Sheet"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="p-1 rounded text-secondary hover:text-primary hover:bg-surface-container-high transition-colors"
                        title="Inspect"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-space-md bg-surface-container-low flex items-center justify-between">
            <span className="font-label-technical text-label-technical text-on-surface-variant">
              2,480 items in repository
            </span>
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-secondary font-semibold transition-colors"
            >
              <span>Manage Full Catalogue</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Public Website Sync Telemetry Footer */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-x-space-lg gap-y-2 text-on-surface-variant font-label-technical text-label-technical">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="text-primary font-semibold">Public Website Sync:</span>
            <span>{syncMessage}</span>
          </div>
          <div className="hidden sm:inline-block text-outline-variant">•</div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[16px]">speed</span>
            <span>
              Database Latency: <strong className="text-primary font-label-code">24ms</strong>
            </span>
          </div>
          <div className="hidden sm:inline-block text-outline-variant">•</div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              cloud_queue
            </span>
            <span>
              Catalog Asset Storage:{' '}
              <strong className="text-primary font-label-code">4.2 GB / 50 GB</strong> (8.4%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={handleForceReindex}
            disabled={reindexing}
            className="px-2.5 py-1 rounded bg-surface-container text-secondary hover:text-primary text-label-code font-label-code transition-colors flex items-center gap-1 disabled:opacity-60"
          >
            <span
              className={`material-symbols-outlined text-[14px] ${
                reindexing ? 'animate-spin' : ''
              }`}
            >
              refresh
            </span>
            <span>{reindexing ? 'Re-indexing...' : 'Force Re-index'}</span>
          </button>
          <span className="font-label-code text-[11px] text-outline font-medium">
            CLUSTER-FRANKFURT-04
          </span>
        </div>
      </div>
    </div>
  );
};
