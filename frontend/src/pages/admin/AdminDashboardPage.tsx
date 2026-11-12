import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

interface RecentInquiryRow {
  id: string;
  customer: string;
  company: string;
  countryCode: string;
  country: string;
  email: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
}

interface RecentProductItem {
  id: string;
  name: string;
  category: string;
  status: 'Published' | 'Draft Review';
  imageUrl: string;
  imageAlt: string;
}

const RECENT_INQUIRIES: RecentInquiryRow[] = [
  {
    id: 'inq-1',
    customer: 'Dr. Julian Vogel',
    company: 'Charité Universitätsmedizin',
    countryCode: 'DE',
    country: 'Germany',
    email: 'j.vogel@charite.de',
    date: 'Oct 25, 2024',
    status: 'New',
  },
  {
    id: 'inq-2',
    customer: 'Sarah Jenkins',
    company: 'Barts Health NHS Trust',
    countryCode: 'GB',
    country: 'United Kingdom',
    email: 's.jenkins@bartshealth.nhs.uk',
    date: 'Oct 24, 2024',
    status: 'New',
  },
  {
    id: 'inq-3',
    customer: 'Khalid Al-Mansoor',
    company: 'MedSupply Gulf Trading',
    countryCode: 'AE',
    country: 'UAE',
    email: 'procurement@medsupplygulf.ae',
    date: 'Oct 23, 2024',
    status: 'Read',
  },
  {
    id: 'inq-4',
    customer: 'Dr. Marcella Rossi',
    company: 'Ospedale San Raffaele',
    countryCode: 'IT',
    country: 'Italy',
    email: 'm.rossi@sanraffaele.it',
    date: 'Oct 22, 2024',
    status: 'Replied',
  },
  {
    id: 'inq-5',
    customer: 'Arthur Lindqvist',
    company: 'Nordic Surgical AB',
    countryCode: 'SE',
    country: 'Sweden',
    email: 'a.lindqvist@nordicsurgical.se',
    date: 'Oct 20, 2024',
    status: 'Replied',
  },
];

const RECENT_PRODUCTS: RecentProductItem[] = [
  {
    id: 'prod-1',
    name: 'Metzenbaum-Nelson TC Scissors (180mm)',
    category: 'Surgical Instruments',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeOCOE9wSrArSXfpkSf14NUafsVRHFInPk4cTEul5iSGqt3GVVXCrX8EMpoAuYeyreOppBJfb1_Uw48Ri_qKNtQ0gLyKL3DY-uSmfUBSzWaZRYapCfIuLv-UDywBMOBbwPkeYOC9fNhrDe4WAnVkeICY_PuHc9kmSqXTFwujJ-olEuhkH2Da8Oa5UHmM5QQ9j5mMgJUmBqJFQBX9Hpsl89kAYstb9pnLyN-mv6Tg4',
    imageAlt: 'Close up shot of stainless steel Metzenbaum-Nelson surgical scissors',
  },
  {
    id: 'prod-2',
    name: 'Halsted Mosquito Forceps Curved (12.5cm)',
    category: 'Hemostats',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVGrDoKuAvB8HgIvjWCIfkVsE0_DKVH5MKvbS7IErkY6sRK9IZcWjPbuyllC02Egmi_R-tunOp97k88FWH-KxN_r33ZuhxbSEwO-DBu4EIx45SAVGqYw7B635Ni1iGaDOrtZ8lDqusrFJbh9kG1UH7luK7KakXuXcvkhqlM2TCUF4NTEvID6w7gm34bnC1sd7Z_CstOTNWg-3N4CQ29nBXmgftjIN5SFP1IyoGLg',
    imageAlt: 'High precision stainless steel Halsted Mosquito Forceps',
  },
  {
    id: 'prod-3',
    name: 'Crile-Wood TC Needle Holder (Gold Handle)',
    category: 'Suturing & Ligation',
    status: 'Published',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvJtWO7P1ChDcChxVOsKwt4vrUiq5DO0-8_jV-A7nIpohTL705ziNBHyuOp2IN0IzU8Oll3VlZs989TLcZN-8RygfIF-xWWPRdV221d5m_jRkesvRB8UNC5mf2Bb-fPnLoISkxhwkJhFu13RogpWY4KbDAGsdJIj9r4SaO7Yl_pJaOmolBZZopq9n7uQ7b7foCcbyjf-8dR_xMtVt97ltX3Z-u7bmDKhUB9Fmt9ik',
    imageAlt: 'Crile-Wood surgical needle holder with gold-plated ring handles',
  },
  {
    id: 'prod-4',
    name: 'Beyer Bone Rongeur Double-Action',
    category: 'Orthopedic',
    status: 'Draft Review',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZP3dkaN0IN7-LqeZdfBUR6VzKWdLWRgEeZ0Yunio_keuoSmGGx9BnFluoa7oILUVugzL7CVAuUOnUVmxW3LsVgZHVHJXUIexVRy14FVDiGgNGijJ36djW1706ud1OkTTGSfvX1_FfFP2bZi2ZZTB0Rvi7Jmkou2QdXVBe8hPwY4r1TohCYlLrYT24MS0d49uI3d_Ywyij5_F3b6UFKSWkO7y_kuQD0J-dVyUaGg',
    imageAlt: 'Heavy duty Beyer bone rongeur double action orthopedic surgical tool',
  },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { globalSearch } = useAdminContext();
  const [downloadingReport, setDownloadingReport] = useState(false);

  const handleExportReport = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      const csvContent =
        'data:text/csv;charset=utf-8,KPI,Metric,Value\nTotal Products,Active SKUs,2480\nCatalog Published,Compliance,96.5%\nTaxonomy,Divisions,12\nInquiries,Pending,14\n';
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `blueneedle_enterprise_summary_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  const filteredInquiries = RECENT_INQUIRIES.filter((row) => {
    if (!globalSearch.trim()) return true;
    const q = globalSearch.toLowerCase();
    return (
      row.customer.toLowerCase().includes(q) ||
      row.company.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.country.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-gutter py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
        {/* Top Action / Context Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Dashboard
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-caption-bold font-caption-bold bg-secondary-container text-on-secondary-fixed">
                Surgical ERP v4.12
              </span>
            </div>
            <p className="font-body-default text-body-default text-secondary mt-1">
              Manage your products, catalog taxonomies, and international B2B inquiries.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              onClick={handleExportReport}
              disabled={downloadingReport}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-button-text text-button-text shadow-sm border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-lg text-secondary">
                {downloadingReport ? 'hourglass_top' : 'download'}
              </span>
              <span>{downloadingReport ? 'Exporting...' : 'Export Summary Report'}</span>
            </button>

            <Link
              to="/admin/email"
              className="inline-flex items-center justify-center gap-1.5 h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-button-text text-button-text shadow-sm border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-lg text-secondary">
                outgoing_mail
              </span>
              <span>Send Quick Email</span>
            </Link>

            <Link
              to="/admin/products/new"
              className="inline-flex items-center justify-center gap-1.5 h-10 px-space-lg rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-button-text text-button-text shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>+ Add New Product</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI / Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-table-header text-table-header text-secondary uppercase tracking-wider">
                Total Products
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-lg">inventory_2</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg text-primary tracking-tight leading-none">
                2,480
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="inline-flex items-center gap-0.5 text-caption-bold font-caption-bold text-on-secondary px-1.5 py-0.5 rounded bg-secondary">
                  <span className="material-symbols-outlined text-xs">trending_up</span>+14
                </span>
                <span className="font-caption text-caption text-secondary">this month</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-table-header text-table-header text-secondary uppercase tracking-wider">
                Active Products
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-lg">verified</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg text-primary tracking-tight leading-none">
                2,394
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="font-body-strong text-body-strong text-primary">96.5%</span>
                <span className="font-caption text-caption text-secondary">published in catalog</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-table-header text-table-header text-secondary uppercase tracking-wider">
                Total Categories
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-lg">category</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg text-primary tracking-tight leading-none">
                12
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="font-caption-bold text-caption-bold text-secondary">48</span>
                <span className="font-caption text-caption text-secondary">sub-specialties mapped</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-table-header text-table-header text-secondary uppercase tracking-wider">
                New Inquiries
              </span>
              <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
                <span className="material-symbols-outlined text-lg">mark_email_unread</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg text-primary tracking-tight leading-none">
                14
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                <span className="font-caption text-caption text-secondary">Unread, requiring response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left Column: Inquiries Table (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-lg border border-surface-container-high shadow-sm overflow-hidden flex flex-col">
              {/* Table Header / Title Row */}
              <div className="p-space-md flex items-center justify-between border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <h2 className="font-headline-md text-headline-md text-primary">
                    Recent Inquiries
                  </h2>
                  <span className="px-2 py-0.5 rounded text-caption-bold font-caption-bold bg-surface-container-high text-on-surface-variant">
                    {filteredInquiries.length} Latest
                  </span>
                </div>
                <Link
                  to="/admin/inquiries"
                  className="font-nav-label text-nav-label text-secondary hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>View All Inquiries</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-surface-container-high">
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Company
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Country
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-4 font-table-header text-table-header text-secondary uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {filteredInquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-surface-container-low transition-colors group"
                      >
                        <td className="py-3 px-4 font-body-strong text-body-strong text-primary whitespace-nowrap">
                          {inq.customer}
                        </td>
                        <td className="py-3 px-4 font-body-default text-body-default text-secondary whitespace-nowrap">
                          {inq.company}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 font-caption text-caption text-on-surface">
                            <span className="w-4 h-3 bg-slate-200 rounded-sm flex items-center justify-center font-bold text-[9px] leading-none text-slate-700">
                              {inq.countryCode}
                            </span>
                            <span>{inq.country}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-caption text-caption text-secondary font-mono whitespace-nowrap">
                          {inq.email}
                        </td>
                        <td className="py-3 px-4 font-caption text-caption text-on-surface-variant whitespace-nowrap">
                          {inq.date}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {inq.status === 'New' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-caption-bold text-caption-bold bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim">
                              New
                            </span>
                          )}
                          {inq.status === 'Read' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-caption-bold text-caption-bold bg-secondary-container text-on-secondary-container">
                              Read
                            </span>
                          )}
                          {inq.status === 'Replied' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-caption-bold text-caption-bold bg-primary-fixed text-on-primary-fixed border border-outline-variant">
                              Replied
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => navigate('/admin/inquiries')}
                            className="h-8 px-3 rounded bg-surface-container-low text-primary hover:bg-surface-container hover:text-primary-container font-button-text text-button-text transition-colors border border-surface-container-high"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Info */}
              <div className="px-space-md py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-caption text-secondary">
                <span>Showing latest 5 of 14 active wholesale inquiries</span>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Updated 3 mins ago</span>
                </div>
              </div>
            </div>

            {/* Manufacturing QA Status Banner */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-2xl">medical_services</span>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    German Medical Grade Steel Alloy (DIN 1.4021)
                  </div>
                  <p className="font-caption text-caption text-secondary">
                    Quality inspection batch compliance rating for current catalog
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-md w-full md:w-auto justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-body-strong text-body-strong text-primary">
                    99.8% Passed
                  </span>
                  <span className="font-caption text-caption text-secondary">
                    ISO 13485:2016 Certified
                  </span>
                </div>
                <div className="w-16 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '99.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & Recently Added Products (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Card A: Quick Actions */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col">
              <h2 className="font-headline-md text-headline-md text-primary mb-space-sm">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-space-sm">
                <Link
                  to="/admin/products/new"
                  className="flex flex-col items-start p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container hover:shadow-sm transition-all border border-surface-container-high group"
                >
                  <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform mb-1">
                    add_box
                  </span>
                  <span className="font-button-text text-button-text text-primary">
                    Add Product
                  </span>
                  <span className="font-caption text-caption text-secondary text-xs">
                    Direct catalog add
                  </span>
                </Link>

                <Link
                  to="/admin/categories"
                  className="flex flex-col items-start p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container hover:shadow-sm transition-all border border-surface-container-high group"
                >
                  <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform mb-1">
                    account_tree
                  </span>
                  <span className="font-button-text text-button-text text-primary">
                    Categories
                  </span>
                  <span className="font-caption text-caption text-secondary text-xs">
                    Organize taxonomy
                  </span>
                </Link>

                <Link
                  to="/admin/inquiries"
                  className="flex flex-col items-start p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container hover:shadow-sm transition-all border border-surface-container-high group"
                >
                  <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform mb-1">
                    mark_chat_unread
                  </span>
                  <span className="font-button-text text-button-text text-primary">
                    Inquiries
                  </span>
                  <span className="font-caption text-caption text-secondary text-xs">
                    Triage lead queue
                  </span>
                </Link>

                <Link
                  to="/admin/email"
                  className="flex flex-col items-start p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container hover:shadow-sm transition-all border border-surface-container-high group"
                >
                  <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform mb-1">
                    forward_to_inbox
                  </span>
                  <span className="font-button-text text-button-text text-primary">
                    Send Email
                  </span>
                  <span className="font-caption text-caption text-secondary text-xs">
                    Open email sender
                  </span>
                </Link>
              </div>
            </div>

            {/* Card B: Recently Added Products */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-sm pb-space-xs border-b border-surface-container-high">
                  <h2 className="font-headline-md text-headline-md text-primary">
                    Recently Added Products
                  </h2>
                  <span className="font-caption text-caption text-secondary">
                    Catalog Feed
                  </span>
                </div>

                {/* List of items */}
                <div className="flex flex-col divide-y divide-surface-container-high">
                  {RECENT_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      className="py-2.5 flex items-center justify-between gap-space-sm"
                    >
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-10 h-10 rounded bg-surface-container-low border border-surface-container-high overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            className="w-full h-full object-cover"
                            src={prod.imageUrl}
                            alt={prod.imageAlt}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-strong text-body-strong text-primary truncate">
                            {prod.name}
                          </span>
                          <span className="font-caption text-caption text-secondary truncate">
                            {prod.category}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-caption-bold font-caption-bold shrink-0 ${
                          prod.status === 'Published'
                            ? 'bg-primary-fixed text-on-primary-fixed border border-outline-variant'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim'
                        }`}
                      >
                        {prod.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom link */}
              <div className="mt-space-md pt-space-xs border-t border-surface-container-high">
                <Link
                  to="/admin/products"
                  className="font-nav-label text-nav-label text-primary hover:text-secondary transition-colors flex items-center justify-center gap-1 w-full py-1.5"
                >
                  <span>View All 2,480 Products</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
