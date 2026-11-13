import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../components/AdminLayout";

interface InquiryRecord {
  id: string;
  initials: string;
  name: string;
  institution: string;
  email: string;
  subject: string;
  date: string;
  status: "NEW" | "IN PROGRESS" | "REPLIED" | "CLOSED";
}

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    initials: "AL",
    name: "Dr. Arthur Lindqvist",
    institution: "Karolinska University Hospital",
    email: "arthur.l@karolinska.se",
    subject: "RFQ: 150x Metzenbaum-Fino & Atraumatic Forceps (Tender 2025-EU)",
    date: "Oct 24, 10:14",
    status: "NEW",
  },
  {
    id: "inq-2",
    initials: "BR",
    name: "Sister Beatrice Renaud",
    institution: "Hôpital Universitaire Genève",
    email: "b.renaud@hug.ch",
    subject: "Custom Laser Marking & 2D DataMatrix requirements",
    date: "Oct 23, 16:30",
    status: "IN PROGRESS",
  },
  {
    id: "inq-3",
    initials: "KB",
    name: "Klaus Bergmann",
    institution: "Medizintechnik Berlin GmbH",
    email: "k.bergmann@mt-berlin.de",
    subject: "Bulk Order: Weitlaner Retractors & Crile-Wood Needle Holders",
    date: "Oct 23, 11:20",
    status: "REPLIED",
  },
  {
    id: "inq-4",
    initials: "SR",
    name: "Dr. Sofia Rossi",
    institution: "Ospedale Maggiore Milano",
    email: "s.rossi@policlinico.it",
    subject: "Request for Metallurgical Certificates ISO 13485 / ASTM F899",
    date: "Oct 22, 14:05",
    status: "NEW",
  },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { adminUser } = useAdminContext();

  const [inquiries] = useState<InquiryRecord[]>(INITIAL_INQUIRIES);
  const [filterTab, setFilterTab] = useState<"All" | "NEW" | "IN PROGRESS" | "CLOSED">("All");
  const [inquirySearch, setInquirySearch] = useState("");

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  // Email form state
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailSentNotice, setEmailSentNotice] = useState(false);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchFilter = filterTab === "All" || inq.status === filterTab;
    const matchSearch =
      !inquirySearch.trim() ||
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.institution.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSentNotice(true);
    setTimeout(() => {
      setEmailSentNotice(false);
      setEmailModalOpen(false);
      setEmailTo("");
      setEmailSubject("");
      setEmailBody("");
    }, 1500);
  };

  const displayName = adminUser?.fullName || "Dr. Erik Vance";

  return (
    <div className="w-full bg-surface min-h-[calc(100vh-4rem)]">
      <div className="relative w-full overflow-hidden px-space-md lg:px-margin py-space-lg flex flex-col gap-space-xl">
        {/* Hero / Welcome Command Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_24px_-4px_rgba(36,61,58,0.04)] border border-outline-variant/20">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container bg-tertiary-fixed/30 px-space-xs py-0.5 rounded font-semibold">
                Executive Control Plane
              </span>
              <span className="w-1 h-1 rounded-full bg-outline"></span>
              <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-mono">
                Swiss Master Node #01
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
              Welcome Back, {displayName}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Here is what's happening across Vanguard's international catalog, inquiries, and tender dispatches today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Date Selector Filter */}
            <div className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low rounded-lg text-on-surface shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-outline">
                calendar_today
              </span>
              <span className="font-label-md text-label-md font-semibold text-primary">
                Current Quarter 2025
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                | Zurich HQ Time
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <button
                type="button"
                onClick={() => setProductModalOpen(true)}
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-all shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">add_box</span>
                <span>+ Add New Product</span>
              </button>
              <Link
                to="/admin/categories"
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">category</span>
                <span>Categories</span>
              </Link>
              <Link
                to="/admin/inquiries"
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">contact_support</span>
                <span>View Inquiries</span>
              </Link>
              <button
                type="button"
                onClick={() => setEmailModalOpen(true)}
                className="flex items-center gap-space-xs px-space-md py-space-sm bg-secondary-container hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Compose Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Summary Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
          {/* Metric 1 */}
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(36,61,58,0.03)] border border-outline-variant/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wide text-outline">
                Total Products
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
                1,842
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs">
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-semibold">
                  +18 this month
                </span>
                <span className="font-label-sm text-label-sm text-outline">98.4% Active</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(36,61,58,0.03)] border border-outline-variant/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wide text-outline">
                Categories
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-[18px]">category</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
                14
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs">
                <span className="font-label-sm text-label-sm text-outline">
                  Across 10 clinical disciplines
                </span>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(36,61,58,0.03)] border border-outline-variant/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wide text-outline">
                New Inquiries
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">mark_chat_unread</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
                28
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  From 9 tender countries
                </span>
              </div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(36,61,58,0.03)] border border-outline-variant/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wide text-outline">
                Pending Review
              </span>
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg font-bold text-tertiary tracking-tight">
                12
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs">
                <span className="font-label-sm text-label-sm text-outline">
                  Awaiting metallurgical spec
                </span>
              </div>
            </div>
          </div>

          {/* Metric 5 */}
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_rgba(36,61,58,0.03)] border border-outline-variant/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md uppercase tracking-wide text-outline">
                Emails Sent
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              </div>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
                1,420
              </div>
              <div className="flex items-center gap-space-xs mt-space-xs">
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-primary-fixed text-primary font-semibold">
                  99.2% Delivery
                </span>
                <span className="font-label-sm text-label-sm text-outline">Procurement desks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Workspace (8 cols + 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Central & Left Column: 8 Columns */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Inquiry Analytics & Tender Pipeline Chart */}
            <div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(36,61,58,0.04)] border border-outline-variant/20 flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Clinical Tenders &amp; Inquiries
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Inquiry Analytics &amp; Tender Pipeline
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3 h-3 rounded-sm bg-primary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">General Surgery</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3 h-3 rounded-sm bg-on-tertiary-container"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">Orthopedic DLC</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3 h-3 rounded-sm bg-outline-variant"></span>
                    <span className="font-label-sm text-label-sm text-on-surface">Microsurgery</span>
                  </div>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container font-medium text-outline">
                    2025 YTD
                  </span>
                </div>
              </div>

              {/* Crisp Inline SVG Data Visualization */}
              <div className="w-full bg-surface-container-low rounded-lg p-space-md">
                <svg className="w-full h-56" fill="none" preserveAspectRatio="none" viewBox="0 0 760 210">
                  <line stroke="#dee4e0" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="740" y1="20" y2="20" />
                  <line stroke="#dee4e0" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="740" y1="70" y2="70" />
                  <line stroke="#dee4e0" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="740" y1="120" y2="120" />
                  <line stroke="#dee4e0" strokeWidth="1" x1="40" x2="740" y1="170" y2="170" />

                  <text className="font-label-sm" fill="#727877" fontSize="10" x="12" y="24">800</text>
                  <text className="font-label-sm" fill="#727877" fontSize="10" x="12" y="74">500</text>
                  <text className="font-label-sm" fill="#727877" fontSize="10" x="12" y="124">250</text>
                  <text className="font-label-sm" fill="#727877" fontSize="10" x="24" y="174">0</text>

                  {/* May */}
                  <rect fill="#243d3a" height="80" opacity="0.85" rx="2" width="18" x="70" y="90" />
                  <rect fill="#b0a085" height="60" opacity="0.9" rx="2" width="18" x="92" y="110" />
                  <rect fill="#c1c8c6" height="30" rx="2" width="18" x="114" y="140" />

                  {/* Jun */}
                  <rect fill="#243d3a" height="95" opacity="0.85" rx="2" width="18" x="180" y="75" />
                  <rect fill="#b0a085" height="72" opacity="0.9" rx="2" width="18" x="202" y="98" />
                  <rect fill="#c1c8c6" height="40" rx="2" width="18" x="224" y="130" />

                  {/* Jul */}
                  <rect fill="#243d3a" height="110" opacity="0.85" rx="2" width="18" x="290" y="60" />
                  <rect fill="#b0a085" height="85" opacity="0.9" rx="2" width="18" x="312" y="85" />
                  <rect fill="#c1c8c6" height="48" rx="2" width="18" x="334" y="122" />

                  {/* Aug */}
                  <rect fill="#243d3a" height="125" opacity="0.85" rx="2" width="18" x="400" y="45" />
                  <rect fill="#b0a085" height="100" opacity="0.9" rx="2" width="18" x="422" y="70" />
                  <rect fill="#c1c8c6" height="55" rx="2" width="18" x="444" y="115" />

                  {/* Sep */}
                  <rect fill="#243d3a" height="135" opacity="0.85" rx="2" width="18" x="510" y="35" />
                  <rect fill="#b0a085" height="110" opacity="0.9" rx="2" width="18" x="532" y="60" />
                  <rect fill="#c1c8c6" height="75" rx="2" width="18" x="554" y="95" />

                  {/* Oct */}
                  <rect fill="#0d2725" height="145" rx="2" width="18" x="620" y="25" />
                  <rect fill="#b0a085" height="122" rx="2" width="18" x="642" y="48" />
                  <rect fill="#c1c8c6" height="90" rx="2" width="18" x="664" y="80" />

                  {/* Dispatched Quote Polyline Overlay */}
                  <path
                    d="M100 115 L 210 95 L 320 80 L 430 65 L 540 45 L 650 35"
                    fill="none"
                    stroke="#051f1d"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="100" cy="115" fill="#f5fbf7" r="3.5" stroke="#051f1d" strokeWidth="2" />
                  <circle cx="210" cy="95" fill="#f5fbf7" r="3.5" stroke="#051f1d" strokeWidth="2" />
                  <circle cx="320" cy="80" fill="#f5fbf7" r="3.5" stroke="#051f1d" strokeWidth="2" />
                  <circle cx="430" cy="65" fill="#f5fbf7" r="3.5" stroke="#051f1d" strokeWidth="2" />
                  <circle cx="540" cy="45" fill="#f5fbf7" r="3.5" stroke="#051f1d" strokeWidth="2" />
                  <circle cx="650" cy="35" fill="#b0ccc8" r="4.5" stroke="#0d2725" strokeWidth="2" />

                  <text className="font-label-sm" fill="#727877" fontSize="11" x="96" y="192">MAY</text>
                  <text className="font-label-sm" fill="#727877" fontSize="11" x="206" y="192">JUN</text>
                  <text className="font-label-sm" fill="#727877" fontSize="11" x="318" y="192">JUL</text>
                  <text className="font-label-sm" fill="#727877" fontSize="11" x="428" y="192">AUG</text>
                  <text className="font-label-sm" fill="#727877" fontSize="11" x="538" y="192">SEP</text>
                  <text className="font-label-sm" fill="#0d2725" fontSize="11" fontWeight="600" x="646" y="192">OCT (CUR)</text>
                </svg>
              </div>

              <div className="flex flex-wrap items-center justify-between text-on-surface-variant pt-space-xs">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>Conversion Efficiency to Purchase Order: <strong className="text-primary">44.8%</strong> (Target &gt; 40%)</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/admin/inquiries")}
                  className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5"
                >
                  <span>Full Analytics &amp; Inquiries Queue</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Recent Inquiries Data Table Container */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(36,61,58,0.04)] border border-outline-variant/20 flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Direct Clinical Correspondence
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Recent Inquiries &amp; Tenders
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-space-xs">
                  <div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg text-outline border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[16px]">search</span>
                    <input
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="bg-transparent border-0 outline-none text-on-surface font-body-sm text-body-sm pl-space-xs w-28 md:w-36"
                      placeholder="Filter inquiries..."
                      type="text"
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center bg-surface-container-low p-1 rounded-lg gap-1 border border-outline-variant/20">
                    {(["All", "NEW", "IN PROGRESS", "CLOSED"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setFilterTab(tab)}
                        className={`px-space-xs py-1 rounded font-label-sm text-label-sm ${
                          filterTab === tab
                            ? "bg-surface-container-lowest font-bold text-primary shadow-xs"
                            : "text-outline hover:text-on-surface"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Grid Table */}
              <div className="overflow-x-auto w-full -mx-space-lg px-space-lg">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-surface-container-low font-label-md text-label-md uppercase tracking-wider text-outline">
                      <th className="py-space-sm px-space-md rounded-l-lg">Customer / Institution</th>
                      <th className="py-space-sm px-space-md">Email Contact</th>
                      <th className="py-space-sm px-space-md">Subject / RFQ Scope</th>
                      <th className="py-space-sm px-space-md">Date</th>
                      <th className="py-space-sm px-space-md">Status</th>
                      <th className="py-space-sm px-space-md text-right rounded-r-lg">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="py-space-md px-space-md">
                          <div className="flex items-center gap-space-xs">
                            <div className="w-7 h-7 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs shrink-0">
                              {inq.initials}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-primary truncate">{inq.name}</span>
                              <span className="text-outline font-label-sm text-label-sm truncate">
                                {inq.institution}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md text-outline truncate">{inq.email}</td>
                        <td className="py-space-md px-space-md">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">
                              description
                            </span>
                            <span className="font-medium text-on-surface truncate max-w-xs">
                              {inq.subject}
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md whitespace-nowrap text-outline font-mono text-xs">
                          {inq.date}
                        </td>
                        <td className="py-space-md px-space-md">
                          <span
                            className={`inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold ${
                              inq.status === "NEW"
                                ? "bg-primary-fixed text-primary"
                                : inq.status === "IN PROGRESS"
                                ? "bg-tertiary-fixed text-tertiary"
                                : "bg-surface-container-high text-on-surface-variant"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-space-md px-space-md text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => navigate("/admin/inquiries")}
                              className="p-1 hover:bg-surface-container-high rounded text-outline hover:text-primary transition-colors"
                              title="View Details"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEmailTo(inq.email);
                                setEmailSubject(`RE: ${inq.subject}`);
                                setEmailModalOpen(true);
                              }}
                              className="p-1 hover:bg-surface-container-high rounded text-outline hover:text-primary transition-colors"
                              title="Reply Tender"
                            >
                              <span className="material-symbols-outlined text-[18px]">reply</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-outline">
                  Showing {filteredInquiries.length} of 28 open hospital correspondence records
                </span>
                <Link
                  to="/admin/inquiries"
                  className="font-label-sm text-label-sm font-semibold text-primary hover:underline"
                >
                  Open Full Inquiries Manager →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Columns */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Recently Added Products List */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_-2px_rgba(36,61,58,0.04)] border border-outline-variant/20 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Catalog Inventory
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Recently Added Products
                  </h2>
                </div>
                <Link
                  to="/admin/products"
                  className="p-1 hover:bg-surface-container rounded text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </Link>
              </div>

              {/* Product 1 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-16 h-16 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0 relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="Metzenbaum-Fino scissors"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV7GbdzK-B6PBCfQ55tPCqAi76CwWmbnXVTg92qD8k_rFFyn0CbR4rQ4fjcUaQ7UTifafQkmJLywJnDA3-pqPgy93J_Okr05tlN-TcRZfwbCKorPf_WBK_heLLoIF_lzwUd_2QVsNgZSd2md8owRXGJ3l9MMhgZyLYdiAZIoxSQXStn4r79YDOJ0j8ZaeBa1eEGpvUs1y9c3QS0GX2wdUcDoZTd0vULoml51XYPDb6"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-tertiary-container tracking-wider">
                      VSP-2044-TC
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-semibold">
                      Active
                    </span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-primary truncate mt-0.5">
                    Metzenbaum-Fino Dissecting Scissors 180mm
                  </h3>
                  <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mt-1">
                    <span>General &amp; Plastics</span>
                    <span className="font-mono text-[11px]">DIN 1.4117</span>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-16 h-16 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0 relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="Kerrison bone rongeur"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeD1KSakOS2OlqTDH9l38QPAk6YdquDRcfurx8rgTvA6DA0QVt_FNvKLx-AyD-UBqnUEFoibJVmC2tiZccBMhYoywJtgj8rRcWOEKeKVb87Qd2KnbiDMsC0RFafykNQQS45RXWadFj7xPU0JKtfInRow2OaVOlRxZzjUHdnZBBj3QdHlGuxVCIvro8pgQglu5XyJ-5ifNvXXKLC524mKEda1_1Whg7qkThA6EJ3rQ4"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-tertiary-container tracking-wider">
                      VSP-5501-KR
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-semibold">
                      Active
                    </span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-primary truncate mt-0.5">
                    Kerrison Bone Rongeur 40° Up-Biting DLC
                  </h3>
                  <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mt-1">
                    <span>Neurosurgery / Spine</span>
                    <span className="font-mono text-[11px]">DLC Black</span>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group">
                <div className="w-16 h-16 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0 relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="Adson-Graefe fine tissue forceps"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS3v-cZea-dXFtYZwWgE_EM1rkMncKW60ZqqLrTrKvjQ1OFk3hjUzbSCCuL4qNRPtlUGXclhsyL9uAHuJZRgga1AUbLSLO3T7cjOnezFMA4iOKIoengSo3LVUzFQoWvRGubClixMtW-33r0q726iM_QIz0ZF1MXXWDAmfp8mTrgUqOp33DTIc5hBpW3MHaCHBvd4nRw9MyAOxHboM2U3OIPUvmzG6WhkIBekKOdXfU"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-tertiary-container tracking-wider">
                      VSP-1204-AG
                    </span>
                    <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-semibold">
                      Active
                    </span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-primary truncate mt-0.5">
                    Adson-Graefe Tissue Forceps 1x2 Teeth
                  </h3>
                  <div className="flex items-center justify-between text-outline font-label-sm text-label-sm mt-1">
                    <span>Microsurgery</span>
                    <span className="font-mono text-[11px]">Titanium Gr5</span>
                  </div>
                </div>
              </div>

              <Link
                to="/admin/products"
                className="w-full text-center py-space-sm bg-surface-container-low hover:bg-surface-container rounded-lg font-label-md text-label-md font-semibold text-primary transition-colors flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[18px]">list_alt</span>
                <span>View All 1,842 Catalog Items</span>
              </Link>
            </div>

            {/* System Health & Compliance Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_-2px_rgba(36,61,58,0.04)] border border-outline-variant/20 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Compliance &amp; Telemetry
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    System Infrastructure
                  </h2>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              </div>

              <div className="flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      ISO 13485:2016 Audit Readiness
                    </span>
                    <span className="font-label-sm text-label-sm font-bold text-primary px-space-xs py-0.5 bg-primary-fixed rounded">
                      100% Verified
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-full"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    MDR Annex IX &amp; FDA 21 CFR Part 820 compliant
                  </span>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">dns</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Server &amp; Catalog API
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        Zurich Node (Latency: 9ms)
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-fixed text-primary font-bold">
                    Operational
                  </span>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                      lock
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        SMTP Tender Gateway
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-mono truncate max-w-[170px]">
                        tls://smtp.vanguard-surgical.com
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">
                    Connected
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-outline font-label-sm text-label-sm pt-space-xs border-t border-outline-variant/20">
                <span>Last automated node sync: 2m ago</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Modal: Add New Surgical Product */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Instrument Master Creation
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  Catalog Instrument Registration
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="p-1 hover:bg-surface-container-high rounded text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Advanced Product Editor with Multi-Images &amp; Size Variations</p>
                <p className="text-xs text-outline">Manage multiple sizes (lengths/widths) &amp; bulk file uploader in Products console</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProductModalOpen(false);
                  navigate('/admin/products');
                }}
                className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container shrink-0"
              >
                Open Full Editor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md font-medium text-on-surface">
                  Product Title / Master Name
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container"
                  placeholder="e.g. Crile-Wood Needle Holder 150mm"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md font-medium text-on-surface">
                  SKU / Global Code
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container font-mono"
                  placeholder="e.g. VSP-9920-CW"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md font-medium text-on-surface">
                  Surgical Category
                </label>
                <select className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container">
                  <option>General Surgery</option>
                  <option>Orthopedic &amp; Trauma</option>
                  <option>Cardiovascular / Thoracic</option>
                  <option>Neurosurgery &amp; Spine</option>
                  <option>Ophthalmology / Microsurgery</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md font-medium text-on-surface">
                  Metallurgy Grade &amp; Finish
                </label>
                <select className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container">
                  <option>AISI 420 Stainless (Satin Matte)</option>
                  <option>Grade 5 Titanium (Ti-6Al-4V)</option>
                  <option>Tungsten Carbide Inlays (TC Gold Ring)</option>
                  <option>Diamond-Like Carbon (DLC Anti-Glare)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md font-medium text-on-surface">
                Clinical Specification &amp; Dimensions
              </label>
              <textarea
                className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container resize-none"
                placeholder="Working tip geometry, hinge mechanism, total weight in grams, CE / FDA regulatory clearance classification..."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-outline">
                Will be published immediately to global procurement desks
              </span>
              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md text-label-md font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Instrument recorded successfully in Swiss node catalog.");
                    setProductModalOpen(false);
                  }}
                  className="px-space-lg py-space-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md font-semibold"
                >
                  Commit Product to Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Modal: Compose Email */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Dispatch Dispatcher
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  Compose Procurement Notice
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="p-1 hover:bg-surface-container-high rounded text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {emailSentNotice ? (
              <div className="py-8 flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-[36px] text-emerald-600">
                  check_circle
                </span>
                <p className="font-semibold text-primary">Tender Email Dispatched</p>
                <p className="text-xs text-outline">Sent via TLS Swiss SMTP node to {emailTo}</p>
              </div>
            ) : (
              <form className="flex flex-col gap-space-sm" onSubmit={handleSendEmail}>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md font-medium text-on-surface">
                    Hospital / Buyer Recipient
                  </label>
                  <input
                    required
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container"
                    placeholder="e.g. tenders@karolinska.se"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md font-medium text-on-surface">
                    Subject Header
                  </label>
                  <input
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container"
                    placeholder="e.g. Vanguard Surgical - Quotation Ref VSP-QUOTE-2025-0881"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md font-medium text-on-surface">
                    Message &amp; Tender Scope
                  </label>
                  <textarea
                    required
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary-container resize-none"
                    placeholder="Draft specification details, lot availability, delivery times to central sterilisation department..."
                    rows={4}
                  />
                </div>
                <div className="flex items-center justify-between p-space-xs bg-surface-container-low rounded-lg text-outline font-label-sm text-label-sm border border-outline-variant/20">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    Attach ISO Certification / DIN EN ISO 13485 (PDF)
                  </span>
                  <button type="button" className="font-label-sm text-label-sm text-primary font-semibold hover:underline">
                    Selected
                  </button>
                </div>

                <div className="flex items-center justify-end gap-space-xs pt-space-xs border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md text-label-md"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-space-xs px-space-lg py-space-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Dispatch Tender Notice</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
