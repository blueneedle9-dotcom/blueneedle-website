import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type WorkflowTabKey = 'forge' | 'milling' | 'finishing' | 'passivation';

interface WorkflowSpec {
  key: WorkflowTabKey;
  label: string;
  code: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  checks: string[];
}

const WORKFLOW_TABS: WorkflowSpec[] = [
  {
    key: 'forge',
    label: 'Forging & Annealing',
    code: 'DEPT-01 // THERMO-FORGE',
    title: 'Closed-Die Drop Forging & Vacuum Heat Treatment',
    description:
      'High-tonnage friction screw presses align martensitic grain flow along the longitudinal stress axis of scissor blades, hemostats, and needle holders before controlled vacuum annealing.',
    specs: [
      { label: 'Billet Temperature', value: '1,050 °C — 1,100 °C' },
      { label: 'Vacuum Harden', value: '1,020 °C Oil / Gas Quench' },
      { label: 'Grain Alignment', value: 'ASTM E112 Fine Equiaxed' },
      { label: 'Target Hardness', value: '48 — 56 HRC (±1.0)' },
    ],
    checks: [
      'Spectrometric chemical verification of incoming bar stock',
      'Sub-zero cryogenic stabilization to eliminate retained austenite',
      '100% Rockwell C durometer logging per autoclave batch',
    ],
  },
  {
    key: 'milling',
    label: 'Wire-EDM & CNC',
    code: 'DEPT-02 // MICRO-MACHINING',
    title: '5-Axis CNC Grinding & Wire-EDM Ratchet Profiling',
    description:
      'Box-locks, serration geometry, and Tungsten Carbide (TC) jaw recesses are cut using submerged Wire-EDM and 5-axis CNC grinding centers to achieve repeatable inter-jaw engagement.',
    specs: [
      { label: 'Linear Tolerance', value: '±0.02 mm' },
      { label: 'Box-Lock Clearance', value: '0.015 mm — 0.025 mm' },
      { label: 'TC Insert Pitch', value: '0.4 mm / 0.5 mm Pyramid' },
      { label: 'Surface Ra (Milled)', value: '< 0.4 µm' },
    ],
    checks: [
      'Coordinate Measuring Machine (CMM) first-article validation',
      'Optical profile projector check on delicate atraumatic serrations',
      'Gold-standard master gauge verification for box-lock alignment',
    ],
  },
  {
    key: 'finishing',
    label: 'Finishing & Polish',
    code: 'DEPT-03 // ARTISAN BENCH',
    title: 'Artisan Hand-Filing, Balancing & Anti-Glare Satin Finish',
    description:
      'Master guild technicians calibrate blade tension, hone SuperCut micro-serrations, and apply medical-grade glass-bead satin matte or mirror finishes to eliminate OR overhead glare.',
    specs: [
      { label: 'Satin Reflectance', value: 'EN ISO 7153-1 Anti-Glare' },
      { label: 'Scissor Tension', value: 'Single-Layer Wet Tissue Test' },
      { label: 'Joint Torque', value: 'Calibrated Smooth Actuation' },
      { label: 'Edge Geometry', value: 'Micro-Bevel / Razor Honed' },
    ],
    checks: [
      '50x stereo-microscope inspection of tip approximation and symmetry',
      'Suture pull-test and silicone membrane cutting verification',
      'Laser UDI DataMatrix & LOT etching without thermal sensitization',
    ],
  },
  {
    key: 'passivation',
    label: 'Sterility & Passivation',
    code: 'DEPT-04 // PASSIVATION LAB',
    title: 'Ultrasonic Cleanroom Wash & ASTM A967 Passivation',
    description:
      'Every finished instrument undergoes multi-tank ultrasonic detergent cavitation followed by nitric/citric passivation to establish a uniform chromium-oxide barrier against autoclave corrosion.',
    specs: [
      { label: 'Passivation Std', value: 'ASTM A967 / ISO 13485' },
      { label: 'Salt Spray / Boil', value: 'Copper Sulfate & Boil Test' },
      { label: 'Rinse Water', value: 'Deionized < 5 µS/cm' },
      { label: 'Final Dispatch', value: 'Vacuum HDPE / Tyvek Pouches' },
    ],
    checks: [
      'Free-iron detection testing on sampled lot batches',
      'Automated ultrasonic cleaning validation for hinged box-locks',
      'Full Material Test Report (MTR) & Certificate of Conformity archival',
    ],
  },
];

const HERO_TRAY_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Uz30jwyOb8f-PBRDLWhUQ_e0682jn5lX--8JgFUt16O5NAHE0yMYXl1NvIUoZ9GUqvIQmWoVdgZr1l0l2B8-pyD4Ytb28JAZaEAzvJrwqL3QL0MutllhwOr61yCvgHD3YRll6jFh_cBGSCi1rrxImjYlvY-ca_dd0X1GX8d76edPGddOIpGBdWoteSNFIUbwnWuLMdk-UkwcnVN5-0LagYV9YK8iSWR_3E4yfC0';

const SIALKOT_FACILITY_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCdCWzNTViMXi30sBdpylAKi7JqqZVAP7hIQc4GOl8VwELlhhTEfZoj80r8Lsr0beCRjEwJ9x00bI6CSaB4FjEG6lGFk-gsFGVwe1IRNaqXV-Q8ojVx9VoEmtvOrVI8afMdPNmEpUOtvUyFTNvX29NMgBvgOBqKf2fM3ftUtZrZTBtUfjUnlL7HrHiSVRU5n2PHX3jQuKHewHUiE5lxR0bWOqBQ-Eaeuo2glPETac0';

export const AboutUsPage: React.FC<{
  onOpenRfq: (targetLabel?: string) => void;
}> = ({ onOpenRfq }) => {
  const [activeTab, setActiveTab] = useState<WorkflowTabKey>('forge');
  const currentWorkflow =
    WORKFLOW_TABS.find((t) => t.key === activeTab) ?? WORKFLOW_TABS[0];

  return (
    <div className="bg-surface text-on-surface">
      {/* Breadcrumb & Compliance Strip */}
      <div className="bg-surface-container-low border-b border-outline-variant/20 py-3 px-6 lg:px-gutter-desktop">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant"
          >
            <Link to="/" className="hover:text-secondary transition-colors">
              BLUENEEDLE
            </Link>
            <span>/</span>
            <span>Corporate &amp; Facility Profile</span>
            <span>/</span>
            <span className="text-on-surface font-semibold">About Us</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-on-surface-variant">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ISO 13485:2016 Compliant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              EU MDR (EU) 2017/745 Prepared
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              US FDA Establishment Reg. #3018442
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 px-6 lg:px-gutter-desktop border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container border border-outline-variant/30 rounded text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
              <span className="material-symbols-outlined text-[15px]">
                precision_manufacturing
              </span>
              Industrial Estate Sialkot • Est. 1994
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.05] text-on-surface">
              Crafting Precision. Empowering Surgeons Worldwide.
            </h1>

            <p className="text-base lg:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              BLUENEEDLE engineers reusable surgical, microsurgical, and dental
              instruments from certified German &amp; Japanese martensitic steel—built for
              repeatable autoclave longevity, tactile fidelity, and hospital procurement
              compliance across 160+ nations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenRfq('Factory Capability Deck & Facility Dossier')}
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-on-primary px-6 py-3.5 rounded font-semibold text-sm transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  description
                </span>
                Request Factory Capability Deck
              </button>
              <a
                href="#metallurgy"
                className="inline-flex items-center gap-2.5 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface px-6 py-3.5 rounded font-semibold text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  science
                </span>
                Explore Metallurgy Matrix
              </a>
            </div>

            {/* 3 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-surface-container-lowest border border-outline-variant/25 rounded p-4">
                <div className="font-headline text-2xl font-bold text-primary">
                  80%+
                </div>
                <div className="text-xs font-semibold text-on-surface mt-1">
                  Global OEM Share
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant mt-0.5">
                  Private-Label Export Volume
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/25 rounded p-4">
                <div className="font-headline text-2xl font-bold text-secondary">
                  50–56
                </div>
                <div className="text-xs font-semibold text-on-surface mt-1">
                  Rockwell HRC Window
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant mt-0.5">
                  AISI 420B / 440C Tempered
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/25 rounded p-4">
                <div className="font-headline text-2xl font-bold text-primary">
                  100%
                </div>
                <div className="text-xs font-semibold text-on-surface mt-1">
                  Lot Traceable QA
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant mt-0.5">
                  UDI Laser + MTR Certified
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden">
                <img
                  src={HERO_TRAY_IMAGE}
                  alt="BLUENEEDLE stainless surgical instrument inspection tray"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-primary text-on-primary flex items-center justify-between gap-4 border-t border-outline-variant/20">
                <div>
                  <div className="text-xs font-mono text-on-primary-container uppercase tracking-wider">
                    Batch Spec: AISI 420B Martensitic
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    Passivated ASTM A967
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                  verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Institutional Mission */}
      <section className="py-16 lg:py-20 px-6 lg:px-gutter-desktop bg-surface-container-low border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-semibold">
              01 // CORPORATE ARCHITECTURE
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface leading-tight">
              Engineered on Principles of Metallurgical Integrity
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Operating from Sialkot&apos;s Small Industrial Estate, BLUENEEDLE bridges
              three generations of hand-forging mastery with CNC automation, Wire-EDM
              precision, and cleanroom passivation. Each instrument is conceived as a
              calibrated mechanical system rather than a commodity casting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="bg-surface-container-lowest border border-outline-variant/25 rounded p-5 space-y-2">
                <span className="material-symbols-outlined text-secondary">
                  straighten
                </span>
                <h3 className="font-headline font-bold text-base text-on-surface">
                  Dimensional Accuracy
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  CMM-verified box-lock alignment and ±0.02 mm profile tolerance
                  prevent scissor blade splaying after thousands of steam cycles.
                </p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/25 rounded p-5 space-y-2">
                <span className="material-symbols-outlined text-secondary">
                  touch_app
                </span>
                <h3 className="font-headline font-bold text-base text-on-surface">
                  Tactile Kinematics
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Balanced shank weight distribution and calibrated ratchet ergonomics
                  reduce surgeon hand fatigue during multi-hour microsurgical procedures.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="bg-primary text-on-primary rounded-lg p-7 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-primary-container uppercase tracking-widest">
                <span>DOCTRINE // CLINICAL RELIABILITY</span>
                <span className="material-symbols-outlined text-[18px]">
                  shield_with_heart
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold">
                Our Institutional Mission
              </h3>
              <p className="text-sm text-on-primary-container leading-relaxed">
                To equip hospitals, ambulatory surgical centers, and global OEM brands
                with instruments whose metallurgical consistency, surface passivation,
                and regulatory traceability hold up inside every sterile processing
                department worldwide.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                  Facility Footprint
                </div>
                <div className="font-headline text-3xl font-bold text-on-surface mt-1">
                  42,000 sq. ft.
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Vertical integration: Forge, CNC Hall, Vacuum Heat-Treat, Cleanroom
                  QA
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-secondary">
                domain
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sialkot Context Section */}
      <section className="py-16 lg:py-20 px-6 lg:px-gutter-desktop bg-primary-container text-on-primary">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary-fixed font-semibold">
              02 // REGIONAL CLUSTER HERITAGE
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold leading-tight">
              Sialkot, Pakistan — The World Capital of Surgical Instruments
            </h2>
            <p className="text-on-primary-container leading-relaxed max-w-2xl">
              Since the late nineteenth century, Sialkot has evolved into the world&apos;s
              preeminent surgical metallurgy cluster, supplying leading German, Swiss,
              British, and North American medical device houses under rigorous OEM
              technical files.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <div className="font-headline text-2xl font-bold text-white">
                  120+ Years
                </div>
                <div className="text-xs text-on-primary-container mt-1">
                  Guild Craftsmanship Lineage
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <div className="font-headline text-2xl font-bold text-secondary-fixed">
                  160+ Nations
                </div>
                <div className="text-xs text-on-primary-container mt-1">
                  Approved Export Corridors
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <div className="font-headline text-2xl font-bold text-white">
                  In-House QA
                </div>
                <div className="text-xs text-on-primary-container mt-1">
                  Metallography &amp; Salt Spray
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-white/15 bg-black/20">
              <img
                src={SIALKOT_FACILITY_IMAGE}
                alt="BLUENEEDLE Sialkot cleanroom QA & manufacturing hall"
                className="w-full h-80 object-cover"
              />
              <div className="px-4 py-3 text-[11px] font-mono text-on-primary-container flex items-center justify-between bg-black/30">
                <span>CLUSTER NODE: SMALL INDUSTRIAL ESTATE, SIALKOT</span>
                <span>SKT-PK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Metallurgy Stages */}
      <section
        id="metallurgy"
        className="py-16 lg:py-20 px-6 lg:px-gutter-desktop border-b border-outline-variant/15 scroll-mt-28"
      >
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-semibold">
                03 // METALLURGICAL WORKFLOW
              </div>
              <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface">
                Four-Stage Vertical Metallurgy Protocol
              </h2>
            </div>
            <div className="text-xs font-mono text-on-surface-variant bg-surface-container px-3 py-1.5 rounded border border-outline-variant/30">
              DIN 1.4021 • 1.4034 • TI-6AL-4V ELI
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'STAGE 01',
                title: 'Certified Raw Materials',
                icon: 'inventory_2',
                bullets: [
                  'German & Japanese AISI 410 / 420 / 440C',
                  'ASTM F136 Grade 5 Titanium bar stock',
                  'Heat-number optical emission spectroscopy',
                  'Zero recycled or uncertified scrap alloys',
                ],
                badge: 'ISO 7153-1 Feedstock',
              },
              {
                step: 'STAGE 02',
                title: 'Tooling & Drop Forging',
                icon: 'hardware',
                bullets: [
                  'Custom H13 hardened impression dies',
                  'Controlled fiber-flow grain alignment',
                  'Vacuum furnace quench & double temper',
                  'Sub-zero cryogenic stress equalization',
                ],
                badge: 'HRC 48–56 Verified',
              },
              {
                step: 'STAGE 03',
                title: 'Artisan Hand-Filing',
                icon: 'build',
                bullets: [
                  'Wire-EDM ratchet & box-lock fitting',
                  'Microscopic tip approximation calibration',
                  'Silver-brazed Tungsten Carbide inserts',
                  'Glare-free bead-blasted satin finishes',
                ],
                badge: '50x Optical Check',
              },
              {
                step: 'STAGE 04',
                title: 'Passivation & Testing',
                icon: 'biotech',
                bullets: [
                  'Multi-stage ultrasonic detergent wash',
                  'ASTM A967 citric & nitric passivation',
                  'Copper sulfate & autoclave boil testing',
                  'Permanent UDI laser DataMatrix marking',
                ],
                badge: 'ASTM A967 Certified',
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-secondary">
                      {stage.step}
                    </span>
                    <span className="material-symbols-outlined text-primary">
                      {stage.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    {stage.title}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-on-surface-variant">
                    {stage.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 shrink-0">
                          check_circle
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 text-[11px] font-mono text-on-surface-variant">
                  {stage.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance & Global Standards */}
      <section className="py-16 lg:py-20 px-6 lg:px-gutter-desktop bg-surface-container-low border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-5">
              <div className="text-[11px] font-mono text-secondary uppercase tracking-wider">
                50x MAGNIFICATION
              </div>
              <div className="font-headline text-lg font-bold text-on-surface mt-1">
                Optical Micro-Inspection
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Every fine tip forceps, Castroviejo needle holder, and micro-scissor
                jaw alignment is inspected for burrs, cracks, and gap symmetry.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-5">
              <div className="text-[11px] font-mono text-secondary uppercase tracking-wider">
                HRC 48 — 56
              </div>
              <div className="font-headline text-lg font-bold text-on-surface mt-1">
                Rockwell Hardness (HRC)
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Hardness windows are tailored by anatomy: 42–46 HRC for resilient
                clamps, 50–56 HRC for scissor edges, and 70+ HRC for TC jaw inserts.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-5">
              <div className="text-[11px] font-mono text-secondary uppercase tracking-wider">
                100% OPERATIONAL TEST
              </div>
              <div className="font-headline text-lg font-bold text-on-surface mt-1">
                Functional Cut &amp; Grip Verification
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Scissors undergo wet synthetic tissue membrane cut tests down to the
                extreme distal tip; needle holders pass calibrated suture retention tests.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-semibold">
              04 // QUALITY &amp; REGULATORY INFRASTRUCTURE
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface leading-tight">
              Uncompromising Compliance With Global Hospital Procurement Standards
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Our Quality Management System maintains full lot traceability from steel
              foundry heat number through vacuum tempering, passivation tank logs, and
              signed Certificate of Conformity packets required for hospital tenders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  code: 'ISO 13485',
                  title: 'Medical Device QMS',
                  desc: 'Audited design control, supplier qualification, and CAPA traceability.',
                },
                {
                  code: 'ISO 7153-1',
                  title: 'Surgical Stainless Grades',
                  desc: 'Strict chemical and ferrite limits for reusable surgical steel.',
                },
                {
                  code: 'ASTM A967',
                  title: 'Chemical Passivation',
                  desc: 'Verified salt-spray & copper-sulfate corrosion resistance.',
                },
                {
                  code: 'CE Marking',
                  title: 'EU MDR Class I Reusable',
                  desc: 'Technical Documentation, GSPR checklists, and UDI registration.',
                },
              ].map((std) => (
                <div
                  key={std.code}
                  className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-5 space-y-1.5"
                >
                  <div className="text-xs font-mono font-bold text-secondary">
                    {std.code}
                  </div>
                  <div className="font-headline font-bold text-base text-on-surface">
                    {std.title}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Export & OEM Logistics */}
      <section className="py-16 lg:py-20 px-6 lg:px-gutter-desktop border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-semibold">
              05 // GLOBAL OEM &amp; LOGISTICS
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface">
              Private-Label Contracting &amp; Export Fulfillment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: 'branding_watermark',
                title: 'Private Labeling',
                desc: 'Precision fiber-laser branding, distributor catalog SKU encoding, and GS1 UDI DataMatrix etching.',
              },
              {
                icon: 'architecture',
                title: 'Custom Pattern Tooling',
                desc: 'CAD-to-forge prototyping for surgeon-modified jaws, handles, and specialized procedural sets.',
              },
              {
                icon: 'inventory',
                title: 'Contract Batch Packaging',
                desc: 'Hospital peel pouches, custom-die foam trays, and autoclave-ready stainless cassettes.',
              },
              {
                icon: 'local_shipping',
                title: 'Containerized Logistics',
                desc: 'Door-to-warehouse air freight, FCL/LCL ocean dispatch, EUR.1 and commercial invoice clearing.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-5 space-y-2.5"
              >
                <span className="material-symbols-outlined text-secondary">
                  {item.icon}
                </span>
                <h3 className="font-headline font-bold text-base text-on-surface">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-secondary font-semibold">
                EXPORT GATEWAY INFRASTRUCTURE
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Sialkot International Airport (SKT) &amp; Sambrial Dry Port
              </h3>
              <p className="text-sm text-on-surface-variant">
                Direct air-cargo customs clearance 18 km from our production gate with
                end-to-end DHL Express, FedEx Priority, and Maersk sea lanes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-mono text-xs">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded px-4 py-3">
                <div className="text-on-surface-variant">Standard Air Dispatch</div>
                <div className="font-bold text-on-surface mt-0.5">
                  3–5 Days Worldwide
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded px-4 py-3">
                <div className="text-on-surface-variant">Ocean FCL / LCL</div>
                <div className="font-bold text-on-surface mt-0.5">
                  18–24 Days Europe / US
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Departmental Manufacturing Workflows */}
      <section className="py-16 lg:py-20 px-6 lg:px-gutter-desktop bg-surface-container-low border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary font-semibold">
              06 // FACILITY DOSSIER
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface">
              Departmental Manufacturing Workflows
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Manufacturing Departments"
            className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3"
          >
            {WORKFLOW_TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono text-secondary font-bold">
                {currentWorkflow.code}
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface">
                {currentWorkflow.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {currentWorkflow.description}
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-on-surface font-semibold">
                  Mandatory Verification Gates
                </div>
                {currentWorkflow.checks.map((check) => (
                  <div
                    key={check}
                    className="flex items-start gap-2.5 text-sm text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">
                      verified
                    </span>
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/25 rounded-lg p-5 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                Department Control Telemetry
              </div>
              <div className="divide-y divide-outline-variant/20">
                {currentWorkflow.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-3 flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-on-surface-variant">{spec.label}</span>
                    <span className="font-mono font-semibold text-on-surface text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 px-6 lg:px-gutter-desktop bg-surface">
        <div className="max-w-[1440px] mx-auto bg-primary text-on-primary rounded-lg p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-secondary-fixed">
              DIRECT FACTORY CONTRACTING
            </div>
            <h2 className="font-headline text-2xl lg:text-3xl font-bold">
              Discuss an OEM Project or Request Our Capability Profile
            </h2>
            <p className="text-sm text-on-primary-container leading-relaxed">
              Connect directly with our Sialkot metallurgical engineering desk for
              custom instrument drawings, hospital tender documentation, or sample kit
              evaluation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenRfq('OEM Project Inquiry')}
              className="bg-secondary hover:bg-secondary/90 text-on-secondary px-6 py-3.5 rounded font-semibold text-sm transition-colors"
            >
              Contact BLUENEEDLE
            </button>
            <button
              type="button"
              onClick={() => onOpenRfq('OEM Capability PDF & MTR Dossier')}
              className="bg-white/10 hover:bg-white/15 border border-white/25 text-white px-6 py-3.5 rounded font-semibold text-sm transition-colors"
            >
              OEM Capability PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
