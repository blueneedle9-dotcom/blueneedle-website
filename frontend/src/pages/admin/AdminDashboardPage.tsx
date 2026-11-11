import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    window.setTimeout(() => setActionNotice(null), 3200);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {actionNotice && (
        <div className="bg-primary text-on-primary px-space-md py-2.5 rounded-lg text-xs font-mono flex items-center justify-between shadow-md">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
              check_circle
            </span>
            {actionNotice}
          </span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-on-primary-container hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TOP CONTEXT / OPERATIONAL HEADER STRIP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">biotech</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                SKT Plant Master Console
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-code text-label-code text-on-surface-variant">
                DIN EN ISO 13485:2016 Certified
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-semibold">
              Sialkot Surgical Precision Foundry &amp; Export Dispatch
            </h1>
          </div>
        </div>

        {/* QUICK ACTION TOOLBAR */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            type="button"
            onClick={() => navigate('/admin/patterns')}
            className="flex items-center gap-space-xs px-3.5 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_circle
            </span>
            <span>New Instrument SKU</span>
          </button>
          <button
            type="button"
            onClick={() =>
              triggerNotice('MTR EN 10204 3.1 batch export queued for Heat Lots HT-8829 & HT-8840.')
            }
            className="flex items-center gap-space-xs px-3.5 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              description
            </span>
            <span>Export MTR (EN 10204 3.1)</span>
          </button>
          <button
            type="button"
            onClick={() =>
              triggerNotice('Sambrial Dry Port booking slot reserved for Container SKT-0994.')
            }
            className="flex items-center gap-space-xs px-3.5 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              rv_hookup
            </span>
            <span>Schedule Dry Port Sambrial</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/rfq')}
            className="flex items-center gap-space-xs px-4 py-2 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Issue Tender Quotation</span>
          </button>
        </div>
      </div>

      {/* KPI SUMMARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-surface-container-low rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center justify-between mb-space-xs relative">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
                Active Production Floor
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                precision_manufacturing
              </span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-mobile text-display-mobile font-semibold text-primary">
                142
              </span>
              <span className="font-label-lg text-label-lg font-medium text-secondary">
                Batches
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-label-code text-label-code bg-surface-container-low p-2 rounded">
            <span className="text-secondary flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[14px]">
                trending_up
              </span>{' '}
              +8.4% WoW
            </span>
            <span className="text-on-surface">Forging, CNC, Passivation, QA</span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-surface-container-low rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center justify-between mb-space-xs relative">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
                B2B Hospital Tenders
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                assignment
              </span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-mobile text-display-mobile font-semibold text-primary">
                38
              </span>
              <span className="font-label-lg text-label-lg font-medium text-secondary">
                Inquiries
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-label-code text-label-code bg-surface-container-low p-2 rounded">
            <span className="text-on-surface font-semibold">$1.42M Valuation</span>
            <span className="text-secondary flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">
                arrow_upward
              </span>{' '}
              12 EU MDR Lots
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-surface-container-low rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center justify-between mb-space-xs relative">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
                Ready for Dispatch
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                outbox
              </span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-mobile text-display-mobile font-semibold text-primary">
                18,450
              </span>
              <span className="font-label-lg text-label-lg font-medium text-secondary">
                Units
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-label-code text-label-code bg-surface-container-low p-2 rounded">
            <span className="text-on-surface font-medium truncate">
              Sambrial Dry Port / SKT Air
            </span>
            <span className="text-primary font-semibold">9 Pallets</span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-surface-container-low rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center justify-between mb-space-xs relative">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">
                QA Tolerance (ISO 7153-1)
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-mobile text-display-mobile font-semibold text-primary">
                99.4%
              </span>
              <span className="font-label-lg text-label-lg font-medium text-secondary">
                Verified
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-label-code text-label-code bg-surface-container-low p-2 rounded">
            <span className="text-secondary font-medium">3 lots re-passivating</span>
            <span className="text-on-surface font-semibold">0.00% Micro-Crack</span>
          </div>
        </div>
      </div>

      {/* SECTION A: SIALKOT PLANT PIPELINE & LOAD */}
      <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm gap-space-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-sm">
            <span className="w-3 h-3 rounded-sm bg-primary" />
            <h2 className="font-headline-sm text-headline-sm text-primary">
              Sialkot Plant Floor: Precision Production Pipeline
            </h2>
            <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container text-on-surface">
              Unit-1 &amp; Unit-2 Interlink
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-technical text-label-technical text-secondary">
                Plant Capacity Load:
              </span>
              <span className="font-label-technical text-label-technical font-semibold text-primary">
                84% Operating Capacity
              </span>
            </div>
            <div className="w-28 bg-surface-container rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: '84%' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm">
          {[
            {
              stage: 'STAGE 01',
              badge: '32,000 kg',
              title: 'Raw Billets & Ingot Prep',
              sub: 'AISI 420B, 440C, TC Inserts',
              left: 'Vacuum Stock',
              right: 'Spectro Checked',
              darkBadge: false,
            },
            {
              stage: 'STAGE 02',
              badge: '28 Batches',
              title: 'Drop Forging & Anneal',
              sub: 'Hydraulic Hammer Units 1-4',
              left: 'Heat Treatment',
              right: '1050°C Quenched',
              darkBadge: false,
            },
            {
              stage: 'STAGE 03',
              badge: '44 Batches',
              title: '5-Axis CNC & Box-Lock',
              sub: 'Micro-truing, serration cutter',
              left: 'Tolerance Spec',
              right: '±0.005mm DIN',
              darkBadge: false,
            },
            {
              stage: 'STAGE 04',
              badge: '39 Batches',
              title: 'Citric / Nitric Passivation',
              sub: 'ASTM A967 Ultrasonic baths',
              left: 'Boil Test Tank',
              right: 'Free Iron: 0 ppm',
              darkBadge: false,
            },
            {
              stage: 'STAGE 05',
              badge: '31 Batches',
              title: '100% Optical QA & UDI',
              sub: 'GS1 DataMatrix Laser Etch',
              left: 'HRC Verification',
              right: '54-56 HRC Pass',
              darkBadge: true,
            },
          ].map((s) => (
            <div
              key={s.stage}
              className="flex flex-col bg-surface-container-low p-space-sm rounded-lg relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-code text-label-code text-secondary font-semibold">
                  {s.stage}
                </span>
                <span
                  className={`font-label-code text-label-code px-1.5 py-0.5 rounded ${
                    s.darkBadge
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest text-primary'
                  }`}
                >
                  {s.badge}
                </span>
              </div>
              <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                {s.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {s.sub}
              </span>
              <div className="mt-space-sm pt-space-xs flex items-center justify-between text-secondary font-label-code text-label-code">
                <span>{s.left}</span>
                <span className="text-on-surface font-medium">{s.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DUAL COLUMN LAYOUT: SECTION B + SECTION C */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* SECTION B: PRIORITY INSTITUTIONAL RFQS & TENDERS (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-space-md pb-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  request_quote
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Hospital Tender Matrix &amp; OEM Enquiries
                </h3>
                <span className="font-label-code text-label-code text-secondary">
                  European &amp; US Clinical Procurement Gateways
                </span>
              </div>
            </div>
            <span className="font-label-code text-label-code px-2 py-1 rounded bg-surface-container-low text-secondary font-medium">
              Sorted by: Lead Priority
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-label-technical text-label-technical">
                  <th className="py-2.5 px-3">Institution &amp; Region</th>
                  <th className="py-2.5 px-3">Requisition Payload</th>
                  <th className="py-2.5 px-3">Valuation</th>
                  <th className="py-2.5 px-3">Workflow State</th>
                  <th className="py-2.5 px-3 text-right">Action Directives</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    org: 'Charité Universitätsmedizin Berlin',
                    region: 'Germany (DE-BER)',
                    code: 'RFQ-2024-8841',
                    item1: '1,200x Mayo Scissors TC (Gold Ring)',
                    item2: '800x Crile Hemostats 140mm curved',
                    val: '$86,400',
                    port: 'FOB Sambrial',
                    state: 'Review Specs',
                    stateCls: 'bg-surface-container-highest text-primary',
                    shaded: false,
                  },
                  {
                    org: 'NHS Supply Chain',
                    region: 'United Kingdom (UK-LON)',
                    code: 'TEN-MDR-0943',
                    item1: '3,500x General Surgical Sets',
                    item2: 'Suture, Metzenbaum & Tray Cassettes',
                    val: '$412,000',
                    port: 'CIF Felixstowe',
                    state: 'MDR Packet Attached',
                    stateCls: 'bg-surface-container text-secondary',
                    shaded: true,
                  },
                  {
                    org: 'MedSupply Gulf Trading',
                    region: 'Dubai, UAE (AE-DXB)',
                    code: 'RFQ-2024-9104',
                    item1: '600x Orthopedic Kerrison Rongeurs',
                    item2: '40° Up-Bite, 2mm-5mm thin footplate',
                    val: '$138,000',
                    port: 'Air SKT-DXB',
                    state: 'Sample Batch Approved',
                    stateCls: 'bg-surface-container-highest text-primary',
                    shaded: false,
                  },
                  {
                    org: 'Johns Hopkins Procurement',
                    region: 'Baltimore, USA (US-BWI)',
                    code: 'OEM-2024-411',
                    item1: '450x Castroviejo Micro Holders',
                    item2: 'Straight 0.4mm jaws, TC flat grip',
                    val: '$72,900',
                    port: 'DAP Baltimore',
                    state: 'Pricing Matrix Generated',
                    stateCls: 'bg-surface-container text-on-surface',
                    shaded: true,
                  },
                ].map((row) => (
                  <tr
                    key={row.code}
                    className={`hover:bg-surface-container-low/60 transition-colors ${
                      row.shaded ? 'bg-surface-container-low/30' : ''
                    }`}
                  >
                    <td className="py-3 px-3 align-top">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-primary">
                          {row.org}
                        </span>
                        <div className="flex items-center gap-1 text-secondary font-label-code text-label-code">
                          <span>{row.region}</span>
                          <span>•</span>
                          <span>{row.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="flex flex-col font-body-sm text-body-sm text-on-surface">
                        <span className="font-medium text-primary">{row.item1}</span>
                        <span className="text-on-surface-variant font-label-code text-label-code">
                          {row.item2}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-primary">
                          {row.val}
                        </span>
                        <span className="font-label-code text-label-code text-secondary">
                          {row.port}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top">
                      <span
                        className={`font-label-code text-label-code px-2 py-0.5 rounded font-medium ${row.stateCls}`}
                      >
                        {row.state}
                      </span>
                    </td>
                    <td className="py-3 px-3 align-top text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => navigate('/admin/rfq')}
                          className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-primary"
                          title="View RFQ Spec"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            visibility
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/admin/rfq')}
                          className="p-1 rounded bg-primary-container hover:bg-primary text-on-primary"
                          title="Generate Quote"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            calculate
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            triggerNotice(`Technical metallurgist assigned to ${row.code}.`)
                          }
                          className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-secondary"
                          title="Assign Technical Metallurgist"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            person_add
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-space-md pt-space-xs flex flex-wrap items-center justify-between text-secondary font-label-code text-label-code bg-surface-container-low p-2 rounded">
            <span>Displaying 4 of 38 Active Institutional Requests</span>
            <Link
              className="text-primary font-semibold hover:underline flex items-center gap-1"
              to="/admin/rfq"
            >
              Open Complete Tender Matrix
              <span className="material-symbols-outlined text-[14px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* SECTION C: METALLURGICAL QA & COMPLIANCE ALERTS (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-space-sm pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  science
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Metallurgical Heat Lots
                </h3>
              </div>
              <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container text-on-surface">
                DIN 1.4021 / 1.4125
              </span>
            </div>
            <div className="flex flex-col gap-space-xs">
              <div className="p-space-sm bg-surface-container-low rounded flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-technical text-label-technical font-semibold text-primary">
                    HEAT LOT #HT-8829-AISI420B
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-highest text-primary">
                    ASTM A967: Passed
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                  <span>Spectro: Cr 13.2% | C 0.22% | Si 0.4%</span>
                  <span className="text-primary font-semibold">
                    Rockwell HRC 54.2
                  </span>
                </div>
                <div className="text-secondary font-label-code text-label-code">
                  Applicable: Metzenbaum Dissecting Series &amp; Adson Forceps
                </div>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-technical text-label-technical font-semibold text-primary">
                    HEAT LOT #HT-8840-AISI440C
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container-highest text-primary">
                    ASTM A967: Passed
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                  <span>Spectro: Cr 17.4% | C 1.05% | Mo 0.75%</span>
                  <span className="text-primary font-semibold">
                    Rockwell HRC 58.1
                  </span>
                </div>
                <div className="text-secondary font-label-code text-label-code">
                  Applicable: Micro-Vascular Needle Holders &amp; Osteotomes
                </div>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-technical text-label-technical font-semibold text-primary">
                    HEAT LOT #HT-8815-TC
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container text-on-surface">
                    Re-Passivation Test
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                  <span>Tungsten Carbide Braze Joint Audit</span>
                  <span className="text-secondary font-semibold">
                    Silver Braze ISO 17672
                  </span>
                </div>
                <div className="text-secondary font-label-code text-label-code">
                  Status: Vacuum furnace batch #3 re-check in Tank 4
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-space-sm pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  fact_check
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Export Regulatory &amp; UDI Verification
                </h3>
              </div>
              <span className="font-label-code text-label-code text-secondary font-medium">
                EU MDR 2017/745
              </span>
            </div>
            <div className="flex flex-col gap-space-xs">
              {[
                {
                  title: 'GS1 DataMatrix Direct Part Marking (DPM)',
                  desc: 'Laser annealing depth validated (0.015mm, corrosion-free passivated surface).',
                },
                {
                  title: 'Class Ir Surgical Reusable Dossier',
                  desc: 'Notified body documentation (TÜV SÜD) synched with shipment container SKT-0994.',
                },
                {
                  title: 'Sialkot Dry Port Customs & Certificate of Origin',
                  desc: 'Form A / SCCI Verification stamped for direct air passage to Frankfurt & London Heathrow.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-space-sm p-2 bg-surface-container-low rounded"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">
                    check_circle
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-technical text-label-technical font-semibold text-primary">
                      {item.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM METRIC VISUALIZATION & FACILITY TELEMETRY FOOTER */}
      <div
        id="logistics"
        className="grid grid-cols-1 md:grid-cols-3 gap-space-md scroll-mt-20"
      >
        <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              thermostat
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Atmosphere Furnace Q-1
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              1,048 °C
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              Inert Argon Shield: Optimal (0.02% O₂)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              water_drop
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              RO Deionized Passivation Water
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              0.05 µS/cm
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              ASTM A380 High-Purity Compliance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              flight_takeoff
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              Next Cargo Departure
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              03:45 AM PKT
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              SKT Sialkot International -&gt; FRA Cargo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
