import React, { useState } from 'react';

const MICROGRAPH_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYPO6SE0IWwxjodB8iy6vMVVxm9LMCDqBvYKW8QqT94KQDnFVe8GqrB9Ei8bBrNqerwETh51ejgwWiUWsy2F258ywFMTuizPTGEQybj8TPdZEgc6Pr7RT0WUPOb7WdqpRYwOXTGsjUp6mw11gTpxxOCvOAGZaUVcxMddcLTnZqyMTinBSDUgsxusPLAZ2udiY4tIFZl4LZQ8haDxQdq4Niuow5J-ttBy2O-Gfl2zY';

const PASSIVATION_CHAMBER_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuChdCyRs3YxAWiSq1y2F1-s3yJfNKAHzmL5OFkuba-B0PGcxWQAdZG4KI1l_SBaUPnlVyuFdeuhNl5G0IxtSMx97tTFQUg91nHZkZCfozLZ9a7G_61JEBAb4xPCivRWWi3ekoFL4TrOlswKPMSVNcw2GY7WItnbCpLhJDfafj4dvLzMNme_2aS3sjI1CBxjPOPlRVJtV20n37AK6OJJ8g31b6GhoCcztibrC8zci8Y';

const HARDNESS_INDENTER_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8AcfgISjSC9xNZnXOIwdq2_l82g8DfCmgKBmieX9PGUu_L6chH2qWav3VBrKoUbAVkI9VXyQG7abu5I-LmsQwzpTijJei-mry73OY-76QFOSZTpu6MbDPvS1ANI82piqUjeE0qMLqEOMyLceljsh0dzCERDozlpipnf1lAx1HbVVHXPLhs3ZjZyJNBo7RwUmCJn6rReBKzMRHxqIrupnpgCUfRR8akay7B08PBD0';

export const AdminQaPage: React.FC = () => {
  const [scanVerified, setScanVerified] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Page Context & Action Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md mb-space-lg pb-space-md">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-space-xs text-secondary mb-1">
            <span className="font-label-technical text-label-technical uppercase tracking-wider">
              Quality Assurance &amp; Metallurgical Division
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              DIN EN ISO 13485:2016
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
            Quality Assurance &amp; Metallurgical Compliance Desk
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            Factory-floor inspection logs, spectrometer alloy analysis,
            passivation verification, and MDR EU 2017/745 / US FDA audit trails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm self-start xl:self-end">
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
            <span>Regulatory Audit Vault</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              document_scanner
            </span>
            <span>Generate EN 10204 3.1 MTR</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-primary-container hover:bg-tertiary text-on-primary font-label-lg text-label-lg tracking-wide uppercase transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_task
            </span>
            <span>Log New QA Batch</span>
          </button>
        </div>
      </div>

      {/* Regulatory Compliance Telemetry Strips */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
        <div className="p-space-md bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical uppercase text-secondary">
                Certification Status
              </span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                ISO 13485:2016
              </span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                award_star
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs">
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span className="text-on-surface-variant">TÜV SÜD Validated</span>
              <span className="text-primary font-medium">
                Valid thru Nov 2026
              </span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1 mt-2">
              <div
                className="bg-secondary h-full rounded-full"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>

        <div className="p-space-md bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical uppercase text-secondary">
                Notified Body Readiness
              </span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                EU MDR 2017/745
              </span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                fact_check
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs">
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span className="text-on-surface-variant">
                Class Ir / IIa Dossiers
              </span>
              <span className="text-primary font-bold">100% Complete</span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-1 mt-2">
              <div
                className="bg-primary-container h-full rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <div className="p-space-md bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical uppercase text-secondary">
                Surface Treatment
              </span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                ASTM A967 Citric/Nitric
              </span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                science
              </span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs">
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span className="text-on-surface-variant">Free Iron Test</span>
              <span className="text-secondary font-medium">
                CuSO4 Non-reactive
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-label-technical text-label-technical text-on-surface">
                Zero Oxidation in 24h Salt Spray
              </span>
            </div>
          </div>
        </div>

        <div className="p-space-md bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-technical text-label-technical uppercase text-secondary">
                XRF Metallurgy Lab
              </span>
              <span className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                Olympus Vanta XRF
              </span>
            </div>
            <div className="w-8 h-8 rounded bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs">
            <div className="flex items-center justify-between font-label-code text-label-code">
              <span className="text-on-surface-variant">
                Last Cal Standard (316L)
              </span>
              <span className="text-secondary font-medium">Today 06:00 PKT</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-technical text-label-technical text-primary font-semibold">
                Active Baseline: Drift &lt; 0.02%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Working Sections: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
        {/* LEFT: Active Heat Lots & Spectrometer Chemistry Analysis */}
        <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded shadow-sm overflow-hidden">
          <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px]">
                blur_on
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  Raw Material Ingot Heat Lots &amp; Spectrometer Chemistry
                </h2>
                <span className="font-label-code text-label-code text-secondary">
                  Verified Optical Emission Spectroscopy (OES) / XRF Elemental Assays
                </span>
              </div>
            </div>
            <span className="font-label-code text-label-code px-2 py-1 bg-surface-container-highest text-primary font-medium rounded self-start sm:self-auto">
              3 Master Batches In-Vault
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/60 font-label-code text-label-code text-on-surface uppercase tracking-wider">
                  <th className="py-3 px-space-md font-semibold">Heat Lot ID</th>
                  <th className="py-3 px-space-md font-semibold">
                    Surgical Alloy / Spec
                  </th>
                  <th className="py-3 px-space-md font-semibold">
                    Ingot Provenance
                  </th>
                  <th className="py-3 px-space-md font-semibold">
                    Chemical Composition
                  </th>
                  <th className="py-3 px-space-md font-semibold">
                    Hardness / Yield
                  </th>
                  <th className="py-3 px-space-md font-semibold text-right">
                    MTR Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                {[
                  {
                    lot: 'HT-2025-092',
                    cast: 'Cast: 28-JAN-25',
                    alloy: 'AISI 420B Martensitic',
                    din: 'DIN 1.4028 / X30Cr13',
                    mill: 'Outokumpu Specialty',
                    origin: 'Tornio, Finland (EU)',
                    elements: ['C: 0.32%', 'Cr: 13.4%', 'Si: 0.45%'],
                    hrc: '54.8 HRC',
                    temper: 'Quenched / Cryo -80°C',
                  },
                  {
                    lot: 'HT-2025-088',
                    cast: 'Cast: 14-JAN-25',
                    alloy: 'AISI 440C High-Carbon',
                    din: 'DIN 1.4125 / X105CrMo17',
                    mill: 'Sandvik Materials Tech',
                    origin: 'Sandviken, Sweden',
                    elements: ['C: 1.05%', 'Cr: 17.2%', 'Mo: 0.75%'],
                    hrc: '58.4 HRC',
                    temper: 'Double Tempered',
                  },
                  {
                    lot: 'HT-2025-084',
                    cast: 'Cast: 03-JAN-25',
                    alloy: 'Ti-6Al-4V Grade 5 ELI',
                    din: 'ASTM F136 Implant Spec',
                    mill: 'VDM Metals GmbH',
                    origin: 'Werdohl, Germany',
                    elements: ['Al: 6.1%', 'V: 4.02%', 'Fe < 0.12%'],
                    hrc: '950 MPa Tensile',
                    temper: 'Yield: 880 MPa',
                  },
                ].map((lot) => (
                  <tr
                    key={lot.lot}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="py-3.5 px-space-md">
                      <span className="font-label-code text-label-code font-bold text-primary">
                        {lot.lot}
                      </span>
                      <span className="block font-label-technical text-label-technical text-secondary">
                        {lot.cast}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="font-semibold text-primary">{lot.alloy}</div>
                      <div className="font-label-code text-label-code text-secondary">
                        {lot.din}
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <span className="text-on-surface">{lot.mill}</span>
                      <span className="block font-label-technical text-label-technical text-on-surface-variant">
                        {lot.origin}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-wrap items-center gap-space-xs font-label-code text-label-code">
                        {lot.elements.map((el) => (
                          <span
                            key={el}
                            className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-medium"
                          >
                            {el}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <span className="font-label-code text-label-code font-semibold text-primary">
                        {lot.hrc}
                      </span>
                      <span className="block font-label-technical text-label-technical text-secondary">
                        {lot.temper}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-technical text-label-technical font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          check_circle
                        </span>
                        PASS 3.1
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm text-secondary">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
              <span className="font-label-technical text-label-technical">
                Certificates digitally countersigned pursuant to DIN EN 10204 3.1
                with chemical spectrum annex.
              </span>
            </div>
            <button
              type="button"
              className="font-label-code text-label-code text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>Inspect Spectral Curve Logs</span>
              <span className="material-symbols-outlined text-[14px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT: UDI / MDR Serialization */}
        <div className="lg:col-span-4 flex flex-col bg-surface-container-lowest rounded shadow-sm overflow-hidden">
          <div className="px-space-md py-space-md bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">
                qr_code_2
              </span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                UDI / MDR Serialization
              </h2>
            </div>
            <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container text-primary font-semibold">
              GS1 HRI
            </span>
          </div>

          <div className="p-space-md flex flex-col gap-space-md flex-1 justify-between">
            <div className="p-space-md rounded bg-surface-container-low flex flex-col items-center justify-center text-center relative">
              <div className="w-full flex items-center justify-center gap-space-md py-2">
                <div className="p-2 bg-surface-container-lowest rounded shadow-sm">
                  <svg
                    className="text-primary"
                    fill="none"
                    height="72"
                    viewBox="0 0 72 72"
                    width="72"
                  >
                    <rect fill="currentColor" height="6" width="60" x="6" y="6" />
                    <rect fill="currentColor" height="60" width="6" x="6" y="6" />
                    <rect fill="currentColor" height="6" width="6" x="18" y="60" />
                    <rect fill="currentColor" height="6" width="6" x="30" y="60" />
                    <rect fill="currentColor" height="6" width="6" x="42" y="60" />
                    <rect fill="currentColor" height="6" width="6" x="54" y="60" />
                    <rect fill="currentColor" height="6" width="6" x="60" y="18" />
                    <rect fill="currentColor" height="6" width="6" x="60" y="30" />
                    <rect fill="currentColor" height="6" width="6" x="60" y="42" />
                    <rect fill="currentColor" height="6" width="6" x="60" y="54" />
                    <rect fill="currentColor" height="12" width="12" x="18" y="18" />
                    <rect fill="currentColor" height="6" width="6" x="36" y="18" />
                    <rect fill="currentColor" height="12" width="6" x="48" y="18" />
                    <rect fill="currentColor" height="12" width="6" x="18" y="36" />
                    <rect fill="currentColor" height="12" width="12" x="30" y="30" />
                    <rect fill="currentColor" height="6" width="6" x="48" y="36" />
                    <rect fill="currentColor" height="6" width="6" x="30" y="48" />
                    <rect fill="currentColor" height="6" width="12" x="42" y="48" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    UDI-DI (Device ID):
                  </span>
                  <span className="font-label-code text-label-code font-bold text-primary">
                    (01)00850029381024
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant mt-1.5">
                    UDI-PI (Batch &amp; Expiry):
                  </span>
                  <span className="font-label-code text-label-code font-semibold text-secondary">
                    (10)BN-B25-412
                  </span>
                  <span className="font-label-code text-label-code font-semibold text-secondary">
                    (17)300131
                  </span>
                </div>
              </div>
              <span className="font-label-technical text-label-technical text-on-surface-variant mt-2">
                Fiber Laser Marking: Depth 0.012mm • Passivation Resist Verified
              </span>
            </div>

            <div className="space-y-space-xs font-label-technical text-label-technical">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">EUDAMED Actor ID:</span>
                <span className="font-label-code text-label-code text-on-surface font-semibold">
                  PK-MF-000021481
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">FDA GUDID Status:</span>
                <span className="font-label-code text-label-code text-primary font-medium">
                  Published / Synchronized
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-secondary">Marking Standard:</span>
                <span className="font-label-code text-label-code text-on-surface">
                  ISO/IEC 16022 GS1-2D
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-secondary">Serial Range:</span>
                <span className="font-label-code text-label-code text-on-surface">
                  412-0001 through 412-1500
                </span>
              </div>
            </div>

            {scanVerified && (
              <div className="p-2 rounded bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-950">
                GS1-2D Verification Grade A (ISO/IEC 15415) confirmed.
              </div>
            )}

            <div className="flex gap-space-xs pt-space-xs">
              <button
                type="button"
                className="flex-1 py-2 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  print
                </span>
                <span>Batch Labeler</span>
              </button>
              <button
                type="button"
                onClick={() => setScanVerified(true)}
                className="flex-1 py-2 rounded bg-primary-container text-on-primary hover:bg-tertiary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  fingerprint
                </span>
                <span>Validate Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Stage Floor Inspection Ledger + CAPA/NCR Panel */}
      <div
        id="audit-vault"
        className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg scroll-mt-20"
      >
        <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded shadow-sm overflow-hidden">
          <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px]">
                flaky
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  Factory Floor 4-Stage Inspection Ledger
                </h2>
                <span className="font-label-code text-label-code text-secondary">
                  Physical, Dimensional, Passivation &amp; Tactile Cutting QA
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-xs font-label-technical text-label-technical">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-on-surface font-semibold">
                Live Sk-Plant Floor Feed
              </span>
            </div>
          </div>

          <div className="p-space-lg border-b border-surface-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    content_cut
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">
                      Batch #BN-B25-412
                    </span>
                    <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-high text-primary font-medium">
                      1,500 Units
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">
                    Mayo Dissecting Scissors, Straight 170mm (AISI 420B Heat Lot
                    HT-2025-092)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs font-label-code text-label-code text-right">
                <div>
                  <span className="text-on-surface-variant block">Sign-off:</span>
                  <span className="text-primary font-semibold">
                    T. Mehmood, Chief QA
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  verified
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-sm">
              <div className="p-space-sm bg-surface-container-low rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-code text-label-code text-secondary font-semibold">
                      STAGE 01
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      task_alt
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg font-semibold text-primary block leading-tight">
                    Forging Grain Continuity
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">
                    Microstructure etched; no micro-voids in shank.
                  </span>
                </div>
                <span className="font-label-technical text-label-technical text-primary font-medium mt-3 block">
                  100% Passed
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-code text-label-code text-secondary font-semibold">
                      STAGE 02
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      task_alt
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg font-semibold text-primary block leading-tight">
                    CNC Box-Lock Pivot
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">
                    Torque spec 0.45 Nm. Axial play &lt; 0.03mm.
                  </span>
                </div>
                <span className="font-label-technical text-label-technical text-primary font-medium mt-3 block">
                  Tolerance 0.02mm
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-code text-label-code text-secondary font-semibold">
                      STAGE 03
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      task_alt
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg font-semibold text-primary block leading-tight">
                    Citric Passivation
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">
                    ASTM A967 bath. Copper Sulfate immersion test.
                  </span>
                </div>
                <span className="font-label-technical text-label-technical text-primary font-medium mt-3 block">
                  Zero Pitting / Rust
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-high rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-code text-label-code text-secondary font-semibold">
                      STAGE 04
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      task_alt
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg font-semibold text-primary block leading-tight">
                    Double-Wet-Tissue Cut
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">
                    Full tip snip across 4 plies wet test tissue.
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-label-technical text-label-technical text-primary font-bold">
                    0 Rejects / 1,500
                  </span>
                  <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px]">
                    CERTIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    architecture
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">
                      Batch #BN-B25-409
                    </span>
                    <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-high text-primary font-medium">
                      800 Units
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary">
                    Crile-Wood Needle Holders, Tungsten Carbide Jaw Inserts 150mm
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs font-label-code text-label-code text-right">
                <div>
                  <span className="text-on-surface-variant block">
                    Braze Verification:
                  </span>
                  <span className="text-primary font-semibold">
                    NDT Ultrasonic Shear
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  verified
                </span>
              </div>
            </div>

            <div className="p-space-md rounded bg-surface-container-low flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="p-2.5 rounded bg-surface-container-highest text-primary">
                  <span className="material-symbols-outlined text-[22px]">
                    health_and_safety
                  </span>
                </div>
                <div>
                  <span className="font-label-lg text-label-lg font-semibold text-primary">
                    Gold Ring TC Braze Inspection (Vacuum Silver-Copper Solder)
                  </span>
                  <div className="font-label-technical text-label-technical text-secondary mt-0.5">
                    Ultrasonic shear stress measured at 120 N/mm² (DIN EN ISO
                    7153-1 minimum requirement: 80 N/mm²).
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-md self-end md:self-auto">
                <div className="flex flex-col text-right">
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    Measured Joint Shear:
                  </span>
                  <span className="font-label-code text-label-code font-bold text-primary">
                    120 N/mm² (+50% Safety)
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-technical text-label-technical font-semibold">
                  PASSED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: NCR & CAPA Oversight */}
        <div className="lg:col-span-4 flex flex-col bg-surface-container-lowest rounded shadow-sm overflow-hidden">
          <div className="px-space-md py-space-md bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">
                assignment_late
              </span>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-primary">
                NCR &amp; CAPA Oversight
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-code text-label-code font-semibold">
                0 Critical
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-code text-label-code font-semibold">
                1 Minor
              </span>
            </div>
          </div>

          <div className="p-space-md flex flex-col gap-space-md flex-1 justify-between">
            <div className="p-space-md rounded bg-surface-container-low">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-code text-label-code font-bold text-primary">
                  NCR-2025-014
                </span>
                <span className="font-label-technical text-label-technical px-2 py-0.5 rounded bg-surface-container-high text-secondary font-semibold">
                  Minor Pre-Polish
                </span>
              </div>
              <span className="font-label-lg text-label-lg font-semibold text-primary block leading-snug">
                Micro-burr detected on distal jaw edge
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Inspection revealed hairline 0.04mm extrusion post-milling on
                Batch BN-B25-415 (Iris Scissors). Non-functional, zero blade
                damage.
              </p>
              <div className="mt-space-sm pt-space-xs border-t border-surface-container space-y-1">
                <div className="flex justify-between font-label-technical text-label-technical">
                  <span className="text-secondary">Disposition:</span>
                  <span className="text-primary font-semibold">
                    Routed to Manual Re-honing
                  </span>
                </div>
                <div className="flex justify-between font-label-technical text-label-technical">
                  <span className="text-secondary">Assigned Bench:</span>
                  <span className="text-on-surface">
                    Bench #04 (Master Honer A. Rasheed)
                  </span>
                </div>
                <div className="flex justify-between font-label-technical text-label-technical">
                  <span className="text-secondary">Root Cause:</span>
                  <span className="text-on-surface">
                    Carbide Milling Tool wear at 420 hrs
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-technical text-label-technical uppercase text-secondary">
                  Preventative Maintenance (CAPA-44)
                </span>
                <span className="font-label-code text-label-code text-primary font-medium">
                  92% Execution
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">
                CNC Milling cutter replacement threshold reduced from 450 hrs to
                380 hrs to prevent burr recurrence.
              </p>
              <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: '92%' }}
                />
              </div>
            </div>

            <div className="p-space-sm rounded bg-surface-container-high/60 flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">
                lock
              </span>
              <div className="flex flex-col font-label-technical text-label-technical">
                <span className="text-primary font-semibold">
                  FDA 21 CFR Part 11 Electronic Signature
                </span>
                <span className="text-secondary">
                  Audit Trail Immutable Logged via Sialkot SecOps Node
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">
                history_edu
              </span>
              <span>Open Full ISO Audit Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Production Metallurgical Micrograph & Passivation Assay Stream */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {[
          {
            title: 'Etched Metallographic Analysis',
            chip: '500x Mag',
            img: MICROGRAPH_IMAGE,
            alt: 'Metallurgical cross-section electron microscope grain boundaries',
            overlay: 'ASTM E112 Grain Size: No. 8.5',
            desc: 'Evenly dispersed chromium carbides ensure edge retention without embrittlement under autoclave cycling.',
            left: 'Specimen: HT-2025-092-B',
            right: 'ASTM A892 Confirmed',
          },
          {
            title: 'Corrosion Test Validation',
            chip: 'ASTM A967',
            img: PASSIVATION_CHAMBER_IMAGE,
            alt: 'Passivated surgical instruments inside neutral salt fog test chamber',
            overlay: '5% Neutral Salt Fog: 24h',
            desc: 'Citric acid bath removes free surface iron molecules, creating a durable 2.5nm chromium-oxide passive layer.',
            left: 'Chamber #02 (35°C ± 1.5°)',
            right: 'Zero Pitting Detected',
          },
          {
            title: 'Rockwell C Diamond Indentation',
            chip: 'HRC-150kgf',
            img: HARDNESS_INDENTER_IMAGE,
            alt: 'Digital metallurgical Rockwell hardness diamond indenter testing surgical steel',
            overlay: 'Target: 54.0 - 56.0 HRC',
            desc: 'Automated multi-point test confirms optimal hardness gradient from cutting shear edge through resilient hinge pin.',
            left: 'Variance: σ = 0.22 HRC',
            right: 'Calibration Certified',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-code text-label-code uppercase text-secondary">
                  {card.title}
                </span>
                <span className="font-label-code text-label-code px-1.5 py-0.5 rounded bg-surface-container text-primary">
                  {card.chip}
                </span>
              </div>
              <div className="w-full h-36 bg-surface-container-low rounded overflow-hidden relative flex items-center justify-center">
                <img
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  src={card.img}
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary/80 text-on-primary font-label-code text-label-code text-[10px] backdrop-blur-sm">
                  {card.overlay}
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-sm">
                {card.desc}
              </p>
            </div>
            <div className="pt-space-xs mt-space-xs border-t border-surface-container flex items-center justify-between font-label-technical text-label-technical text-on-surface">
              <span>{card.left}</span>
              <span className="text-primary font-bold">{card.right}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
