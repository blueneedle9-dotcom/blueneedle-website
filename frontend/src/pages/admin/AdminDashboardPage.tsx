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
  status: "PENDING" | "IN REVIEW" | "QUOTED" | "CLOSED";
}

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    initials: "AV",
    name: "Dr. Arthur Vance",
    institution: "St. Thomas Health Trust",
    email: "arthur.vance@st-thomas.nhs.uk",
    subject: "RFQ: 500x Kelly Hemostatic Forceps 5.5 inch (Tender 2026-UK)",
    date: "Today, 14:20",
    status: "PENDING",
  },
  {
    id: "inq-2",
    initials: "HM",
    name: "Heinrich Mueller",
    institution: "Asklepios Kliniken Hamburg",
    email: "h.mueller@asklepios.de",
    subject: "Bulk Order: Stille-Luer Bone Rongeurs & Mayo-Hegar TC Needle Holders",
    date: "Today, 11:45",
    status: "IN REVIEW",
  },
  {
    id: "inq-3",
    initials: "FA",
    name: "Fatima Al-Mansoor",
    institution: "Sheikh Khalifa Medical City",
    email: "f.mansoor@skmc.ae",
    subject: "Custom Laser Marking & 2D DataMatrix Atraumatic Forceps Specs",
    date: "Yesterday",
    status: "QUOTED",
  },
  {
    id: "inq-4",
    initials: "JP",
    name: "Jean-Luc Picard",
    institution: "Centre Hospitalier Universitaire de Lyon",
    email: "jl.picard@chu-lyon.fr",
    subject: "Full Operating Suite Surgical Scissors & Micro Hemostats",
    date: "2 days ago",
    status: "CLOSED",
  },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { globalSearch } = useAdminContext();
  const [inquiries] = useState<InquiryRecord[]>(INITIAL_INQUIRIES);
  const [activeTimeframe, setActiveTimeframe] = useState<"30D" | "90D" | "1Y">("30D");

  const filteredInquiries = inquiries.filter((inq) => {
    if (!globalSearch.trim()) return true;
    const q = globalSearch.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.institution.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.subject.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-6">
      {/* ==========================================
          Top Operational Banner
          ========================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#006877] font-semibold uppercase tracking-wider mb-1">
            <span>Sialkot Technical Headquarters</span>
            <span>/</span>
            <span>Live Operative Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-[#006877] animate-pulse" />
            <span className="text-[#43474f]">Connected</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">
            Hospital Procurement & Production Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="bg-[#00274c] hover:bg-[#0f3d6c] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Create Product</span>
          </Link>
          <Link
            to="/admin/inquiries"
            className="bg-white hover:bg-[#eff4ff] text-[#00274c] border border-[#e5eeff] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>View All RFQs</span>
          </Link>
        </div>
      </div>

      {/* ==========================================
          5-Col Key Metric Matrix
          ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-[#737780] font-semibold tracking-wider">Catalog Index</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00274c]">
              <span className="material-symbols-outlined text-base">medical_services</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">54</span>
              <span className="text-xs text-[#006877] font-semibold">+6 this month</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#43474f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006877]" />
              <span><strong>50</strong> Active / 4 Draft</span>
            </div>
          </div>
          <div className="w-full bg-[#eff4ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#006877] h-full rounded-full" style={{ width: "92%" }} />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-[#737780] font-semibold tracking-wider">Disciplines</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006877]">
              <span className="material-symbols-outlined text-base">category</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">8</span>
              <span className="text-xs text-[#737780] font-medium">Core Lines</span>
            </div>
            <p className="text-xs text-[#43474f] mt-1 truncate">Orthopedic, Artery, Dental, Shears</p>
          </div>
          <span className="text-[11px] text-[#006877] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span> All ISO 13485
          </span>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-[#737780] font-semibold tracking-wider">Inquiries & RFQs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#00274c]">
              <span className="material-symbols-outlined text-base">mark_chat_unread</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">28</span>
              <span className="text-xs text-[#006877] font-semibold bg-[#a3eeff]/40 px-1.5 py-0.5 rounded">+14% wk</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>4 Require Response</span>
            </div>
          </div>
          <Link to="/admin/inquiries" className="text-xs text-[#00274c] hover:text-[#006877] font-semibold flex items-center gap-1">
            <span>Open Inquiry Desk</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-[#737780] font-semibold tracking-wider">Dispatch Relay</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006877]">
              <span className="material-symbols-outlined text-base">forward_to_inbox</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">142</span>
              <span className="text-xs text-[#737780] font-medium">Formal Quotes</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#43474f]">
              <span className="material-symbols-outlined text-sm text-[#006877]">check_circle</span>
              <span>99.2% SMTP Delivery</span>
            </div>
          </div>
          <div className="w-full bg-[#eff4ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#006877] h-full rounded-full" style={{ width: "99.2%" }} />
          </div>
        </div>

        {/* Stat 5 */}
        <div className="bg-[#00274c] text-white p-5 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-white/70 font-semibold tracking-wider">Export Pipeline</span>
            <span className="px-2 py-0.5 rounded-full bg-[#006877] text-white text-[10px] font-bold">USD</span>
          </div>
          <div className="my-3">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold tracking-tight">$340,000</span>
            <p className="text-xs text-white/70 mt-1">Active tenders across 35+ countries</p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/10">
            <span>EU: 48% • US: 32%</span>
            <span className="material-symbols-outlined text-sm text-[#a3eeff]">public</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          Analytics Grid (8 Col / 4 Col)
          ========================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Main Interactive Chart: Quote & RFQ Regional Trajectory (8 Col) */}
        <div className="xl:col-span-8 bg-white p-6 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase text-[#006877] font-bold tracking-wider">Volume Analytics</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#00274c]">RFQ Regional Trajectory (H1)</h2>
              <p className="text-xs text-[#43474f]">Comparative analysis of received inquiries vs. formalized commercial quotes</p>
            </div>
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg">
              {(["30D", "90D", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeTimeframe === tf ? "bg-[#00274c] text-white shadow-sm" : "text-[#43474f] hover:text-[#00274c]"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="w-full h-64 relative bg-[#f8f9ff] rounded-lg p-4 border border-[#eff4ff] flex flex-col justify-end">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006877" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#006877" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#e5eeff" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#e5eeff" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#e5eeff" strokeDasharray="3 3" />
              <line x1="0" y1="190" x2="700" y2="190" stroke="#e5eeff" />

              {/* Area */}
              <polygon
                points="0,180 80,150 160,165 240,110 320,130 400,85 480,95 560,50 640,65 700,30 700,190 0,190"
                fill="url(#areaGradient)"
              />

              {/* Line 1 (Inquiries) */}
              <polyline
                fill="none"
                stroke="#006877"
                strokeWidth="3"
                points="0,180 80,150 160,165 240,110 320,130 400,85 480,95 560,50 640,65 700,30"
              />

              {/* Line 2 (Quotes) */}
              <polyline
                fill="none"
                stroke="#00274c"
                strokeWidth="2"
                strokeDasharray="4 4"
                points="0,190 80,170 160,175 240,135 320,150 400,115 480,120 560,80 640,90 700,55"
              />

              {/* Points */}
              <circle cx="560" cy="50" r="5" fill="#006877" />
              <circle cx="700" cy="30" r="5" fill="#006877" />
            </svg>

            {/* Legend & Month Labels */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff] text-[10px] text-[#737780]">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <div className="flex items-center gap-4 ml-6">
                <span className="flex items-center gap-1.5 text-xs text-[#006877] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006877]" /> Inquiries Received
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#00274c] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00274c]" /> Quotes Formalized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Discipline Share Breakdown (4 Col) */}
        <div className="xl:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-[#e5eeff] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase text-[#006877] font-bold tracking-wider">Demand Share</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#00274c]">Inquiries by Discipline</h2>
            </div>
            <span className="material-symbols-outlined text-[#737780]">pie_chart</span>
          </div>

          {/* Donut Chart SVG */}
          <div className="flex items-center justify-center relative py-2">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#eff4ff" strokeWidth="14" />
              {/* Orthopedic: 32% */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#00274c"
                strokeWidth="14"
                strokeDasharray="90.5 282.7"
                strokeDashoffset="0"
              />
              {/* Artery & Hemostatic: 28% */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#006877"
                strokeWidth="14"
                strokeDasharray="79.1 282.7"
                strokeDashoffset="-90.5"
              />
              {/* Dental: 18% */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#0f3d6c"
                strokeWidth="14"
                strokeDasharray="50.8 282.7"
                strokeDashoffset="-169.6"
              />
              {/* Scissors & Others: 22% */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#a3eeff"
                strokeWidth="14"
                strokeDasharray="62.3 282.7"
                strokeDashoffset="-220.4"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c]">100%</span>
              <span className="text-[10px] text-[#43474f] uppercase font-semibold">Hospital Share</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00274c]" />
                <span className="text-[#00274c] font-medium">Orthopedic Instruments</span>
              </div>
              <span className="font-bold text-[#00274c]">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006877]" />
                <span className="text-[#00274c] font-medium">Artery & Hemostatic Forceps</span>
              </div>
              <span className="font-bold text-[#00274c]">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f3d6c]" />
                <span className="text-[#00274c] font-medium">Dental & Maxillofacial</span>
              </div>
              <span className="font-bold text-[#00274c]">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3eeff]" />
                <span className="text-[#00274c] font-medium">Scissors & Needle Holders</span>
              </div>
              <span className="font-bold text-[#00274c]">22%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Recent Inquiries & RFQs Table
          ========================================== */}
      <div className="bg-white rounded-xl shadow-sm border border-[#e5eeff] overflow-hidden">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#eff4ff]/40 border-b border-[#e5eeff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00274c] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">move_to_inbox</span>
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00274c]">
                Recent Inquiries & Direct Tender RFQs
              </h3>
              <span className="text-xs text-[#43474f]">
                4 priority tenders require clearance by Export Compliance Team
              </span>
            </div>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs text-[#006877] hover:text-[#00274c] font-semibold flex items-center gap-1"
          >
            <span>Open Inquiries Console</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8f9ff] text-[#43474f] font-semibold uppercase tracking-wider text-[11px] border-b border-[#eff4ff]">
                <th className="py-3 px-4">Procurement Contact</th>
                <th className="py-3 px-4">Hospital / Entity</th>
                <th className="py-3 px-4">Subject & Instrument Line</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#eff4ff] text-[#00274c] flex items-center justify-center font-bold text-xs border border-[#e5eeff]">
                        {inq.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[#00274c]">{inq.name}</div>
                        <div className="text-[11px] text-[#737780]">{inq.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#00274c]">{inq.institution}</td>
                  <td className="py-3.5 px-4 text-[#43474f] max-w-xs truncate">{inq.subject}</td>
                  <td className="py-3.5 px-4 text-[#737780]">{inq.date}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inq.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : inq.status === "IN REVIEW"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : inq.status === "QUOTED"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigate("/admin/inquiries")}
                      className="text-xs text-[#006877] hover:underline font-semibold"
                    >
                      Process RFQ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
