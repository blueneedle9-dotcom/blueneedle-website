import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

const DEFAULT_CONTENT = {
  headline: 'Precision in Every Instrument.',
  tagline:
    'Professional Surgical, Medical, Dental & Orthopedic Instruments. Engineered from certified European martensitic stainless steel alloys with micron-level tolerances.',
  cta1Text: 'Explore Our Products',
  cta1Url: '/products',
  cta2Text: 'Contact Us',
  cta2Url: '/about-us#contact',
  narrativeTitle: 'Crafting Precision. Empowering Surgeons Worldwide.',
  sialkotNarrative:
    "Rooted in the century-old metallurgical legacy of Sialkot—responsible for over 80% of the world's handheld surgical production—BLUENEEDLE bridges master artisan tactile finishing with sub-micron 5-axis CNC machining centers. Every instrument is forged from certified DIN 1.4021 and AISI 420B martensitic blanks, rigorously vacuum heat-treated, and repeatedly passivated to ensure supreme corrosion resistance under aggressive autoclave cycles.",
  metric1: '80%+ Global Market Supply Sourced from Sialkot',
  metric2: '50-56 Rockwell Hardness (HRC) Controlled Range',
  metric3: '100% Single-Piece Tactile & Bevel QA Inspected',
  primaryEmail: 'info@blueneedle.com',
  urgentEmail: 'export@blueneedle.com',
  factoryAddress: 'Small Industrial Estate, Sialkot 51310, Punjab, Pakistan',
  exportHub: 'Sialkot International Airport (SKT) & Sambrial Dry Port',
  hotline: '+92 52 4589201',
  disclaimer:
    '© BLUENEEDLE Surgical Instruments. All specifications subject to international medical standards. No retail sales.',
  badgeIso: true,
  badgeCe: true,
  badgeCgmp: true,
};

type TabId = 'panel-hero' | 'panel-about' | 'panel-media' | 'panel-contact' | 'panel-footer';

const TABS: { id: TabId; label: string; icon: string; scrollTarget: string }[] = [
  { id: 'panel-hero', label: 'Homepage Hero', icon: 'view_carousel', scrollTarget: 'panel-hero' },
  { id: 'panel-about', label: 'About Us Page', icon: 'history_edu', scrollTarget: 'panel-about' },
  { id: 'panel-media', label: 'Company Images & Media', icon: 'perm_media', scrollTarget: 'panel-hero' },
  { id: 'panel-contact', label: 'Contact & Office Info', icon: 'corporate_fare', scrollTarget: 'panel-contact' },
  { id: 'panel-footer', label: 'Footer & Legal', icon: 'policy', scrollTarget: 'panel-footer' },
];

export const AdminContentPage: React.FC = () => {
  const { adminUser } = useAdminContext();

  const [savedSnapshot, setSavedSnapshot] = useState(DEFAULT_CONTENT);
  const [form, setForm] = useState(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState<TabId>('panel-hero');
  const [highlightedPanel, setHighlightedPanel] = useState<string | null>(null);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');
  const [revision, setRevision] = useState(184);

  const hasUnsavedChanges = JSON.stringify(form) !== JSON.stringify(savedSnapshot);

  const handleFieldChange = <K extends keyof typeof DEFAULT_CONTENT>(
    key: K,
    value: (typeof DEFAULT_CONTENT)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTabClick = (tab: (typeof TABS)[number]) => {
    setActiveTab(tab.id);
    const el = document.getElementById(tab.scrollTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedPanel(tab.scrollTarget);
      setTimeout(() => setHighlightedPanel(null), 1000);
    }
  };

  const handleDeploy = () => {
    setDeployStatus('deploying');
    setTimeout(() => {
      setSavedSnapshot(form);
      setRevision((prev) => prev + 1);
      setDeployStatus('deployed');
      setTimeout(() => setDeployStatus('idle'), 3000);
    }, 1000);
  };

  const handleDiscard = () => {
    setForm(savedSnapshot);
  };

  const publisherName = adminUser?.fullName || 'Tariq Mehmood';

  return (
    <div className="flex flex-col w-full">
      {/* Top Control Bar / Editorial Breadcrumb Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-technical text-label-technical text-secondary uppercase tracking-wider">
              CMS Master Workspace
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-code text-label-code text-on-surface-variant uppercase">
              Storefront Localized v3.1
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Website Content Management
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
            Edit public website copy, hero banners, corporate narratives, and contact information
            without touching code.
          </p>
        </div>

        <div className="flex items-center gap-space-sm shrink-0">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container-high transition-colors font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              open_in_new
            </span>
            <span>Preview Live Website</span>
          </Link>
          <button
            type="button"
            onClick={handleDeploy}
            disabled={deployStatus === 'deploying'}
            className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary shadow-sm hover:bg-tertiary-container transition-all font-label-lg text-label-lg font-medium disabled:opacity-70"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Publish All Changes</span>
          </button>
        </div>
      </div>

      {/* Faceted Content Nav Tabs */}
      <div className="flex items-center gap-1 p-1 mb-space-xl bg-surface-container-low rounded-lg overflow-x-auto shadow-sm">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`flex items-center gap-2 px-space-md py-2 rounded-lg transition-all font-label-lg text-label-lg whitespace-nowrap ${
                isActive
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isActive ? 'text-secondary' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.id === 'panel-hero' && hasUnsavedChanges && (
                <span className="w-2 h-2 rounded-full bg-error" title="Unsaved changes present" />
              )}
            </button>
          );
        })}
      </div>

      {/* Primary Edit Space: Asymmetric Dual Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-xl">
        {/* LEFT 7 COLS: Form Controls */}
        <div className="xl:col-span-7 flex flex-col gap-space-xl">
          {/* SECTION 1: Homepage Hero */}
          <div
            id="panel-hero"
            className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg relative overflow-hidden transition-all ${
              highlightedPanel === 'panel-hero' ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-label-code text-label-code font-bold">
                  01
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Homepage Hero Section
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Primary B2B institutional landing banner &amp; viewport positioning.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-label-code text-label-code uppercase font-semibold">
                Active Live
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-primary font-semibold">
                  Primary Headline
                </label>
                <span className="font-label-code text-label-code text-secondary font-medium">
                  {form.headline.length}/80
                </span>
              </div>
              <input
                type="text"
                maxLength={80}
                value={form.headline}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
                className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner transition-all"
              />
              <span className="font-label-technical text-label-technical text-on-surface-variant">
                Visible in high-contrast Swiss typography on viewport load.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-label-lg text-primary font-semibold">
                  Supporting Tagline / Subtitle
                </label>
                <span className="font-label-code text-label-code text-on-surface-variant">
                  {form.tagline.length}/220 chars
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={220}
                value={form.tagline}
                onChange={(e) => handleFieldChange('tagline', e.target.value)}
                className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner resize-none transition-all"
              />
            </div>

            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-md">
              <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                Institutional Call-to-Action Controls
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-primary font-semibold">
                    Primary CTA (Filled Solid)
                  </span>
                  <input
                    type="text"
                    value={form.cta1Text}
                    onChange={(e) => handleFieldChange('cta1Text', e.target.value)}
                    placeholder="Label"
                    className="px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                  <input
                    type="text"
                    value={form.cta1Url}
                    onChange={(e) => handleFieldChange('cta1Url', e.target.value)}
                    placeholder="Destination Path"
                    className="px-3 py-2 rounded bg-surface-container-lowest text-secondary font-label-code text-label-code focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-primary font-semibold">
                    Secondary CTA (Technical Outline)
                  </span>
                  <input
                    type="text"
                    value={form.cta2Text}
                    onChange={(e) => handleFieldChange('cta2Text', e.target.value)}
                    placeholder="Label"
                    className="px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                  <input
                    type="text"
                    value={form.cta2Url}
                    onChange={(e) => handleFieldChange('cta2Url', e.target.value)}
                    placeholder="Destination Path"
                    className="px-3 py-2 rounded bg-surface-container-lowest text-secondary font-label-code text-label-code focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-primary font-semibold">
                  Hero Master Media Asset
                </span>
                <span className="font-label-code text-label-code text-secondary">
                  2400 x 1350px • WebP / AVIF
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-space-md items-start sm:items-center p-space-md rounded-lg bg-surface-container-low">
                <div className="relative w-40 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm bg-surface-container-highest">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI5EGyw9yJqR12QvMhpZ0UY2EZv-20G4Wej9HAPoCO-t4wkOTtJ2OFxiAlFPTuu9R8DvntGRfQhUkPau38eczCFAFyOMvoQO_mYwH1Bn2Gm6A_cC3Cj6rL18K3d2rzHRp1UcxmrkJNiKrSEVPKP5DVsyz8PEgn1DQPC5xVEL-GEF0idD_VuLv8ZxpJS34fXENIEDZBOAJOUOxiR53migAk17YLchILnloEuZGv_KQ"
                    alt="Clinical overhead photograph of sterile surgical instruments on stainless steel tray"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-label-code text-[10px] leading-tight font-medium">
                    LIVE
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-tertiary-container transition-colors font-label-technical text-label-technical font-medium"
                    >
                      <span className="material-symbols-outlined text-[16px]">file_upload</span>
                      <span>Replace Hero Image</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-technical text-label-technical shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">crop</span>
                      <span>Crop &amp; Re-align</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-error transition-colors font-label-technical text-label-technical"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>Reset to Default</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Calibrated for sterile ambient tone (#F5F7F9 substrate with cool surgical grade
                    contrast).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: About Us & Manufacturing Narrative */}
          <div
            id="panel-about"
            className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg transition-all ${
              highlightedPanel === 'panel-about' ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-label-code text-label-code font-bold">
                02
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  About Us &amp; Manufacturing Narrative
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Sialkot metallurgical heritage, DIN compliance, and robotic forging proof points.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-primary font-semibold">
                Narrative Lead Headline
              </label>
              <input
                type="text"
                value={form.narrativeTitle}
                onChange={(e) => handleFieldChange('narrativeTitle', e.target.value)}
                className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-primary font-semibold">
                Sialkot Heritage &amp; Cold Forging Story
              </label>
              <textarea
                rows={5}
                value={form.sialkotNarrative}
                onChange={(e) => handleFieldChange('sialkotNarrative', e.target.value)}
                className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner resize-none transition-all leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                Manufacturing Verification Metrics
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5 shadow-sm">
                  <span className="font-label-code text-label-code text-secondary font-medium">
                    METRIC #1
                  </span>
                  <input
                    type="text"
                    value={form.metric1}
                    onChange={(e) => handleFieldChange('metric1', e.target.value)}
                    className="px-2 py-1.5 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="font-label-technical text-label-technical text-on-surface-variant">
                    Global footprint anchor
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5 shadow-sm">
                  <span className="font-label-code text-label-code text-secondary font-medium">
                    METRIC #2
                  </span>
                  <input
                    type="text"
                    value={form.metric2}
                    onChange={(e) => handleFieldChange('metric2', e.target.value)}
                    className="px-2 py-1.5 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="font-label-technical text-label-technical text-on-surface-variant">
                    Metallurgical hardness rating
                  </span>
                </div>

                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5 shadow-sm">
                  <span className="font-label-code text-label-code text-secondary font-medium">
                    METRIC #3
                  </span>
                  <input
                    type="text"
                    value={form.metric3}
                    onChange={(e) => handleFieldChange('metric3', e.target.value)}
                    className="px-2 py-1.5 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="font-label-technical text-label-technical text-on-surface-variant">
                    Manual micrometer calibration
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Contact Desk */}
          <div
            id="panel-contact"
            className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg transition-all ${
              highlightedPanel === 'panel-contact' ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-label-code text-label-code font-bold">
                03
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Contact Desk &amp; Global Exporter Info
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Institutional direct contacts, freight terminals, and plant location.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                  Primary Inquiry Email
                </label>
                <input
                  type="email"
                  value={form.primaryEmail}
                  onChange={(e) => handleFieldChange('primaryEmail', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                  Urgent Procurement Desk Email
                </label>
                <input
                  type="email"
                  value={form.urgentEmail}
                  onChange={(e) => handleFieldChange('urgentEmail', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                Factory Physical Address
              </label>
              <input
                type="text"
                value={form.factoryAddress}
                onChange={(e) => handleFieldChange('factoryAddress', e.target.value)}
                className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                  Global Export Hub &amp; Dry Port
                </label>
                <input
                  type="text"
                  value={form.exportHub}
                  onChange={(e) => handleFieldChange('exportHub', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                  Official Phone / Direct Hotline
                </label>
                <input
                  type="text"
                  value={form.hotline}
                  onChange={(e) => handleFieldChange('hotline', e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Footer & Compliance */}
          <div
            id="panel-footer"
            className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg transition-all ${
              highlightedPanel === 'panel-footer' ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-label-code text-label-code font-bold">
                04
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Footer Content &amp; International Compliance
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Legal ownership declarations, non-retail B2B disclaimers, and EU certifications.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                Copyright &amp; Statutory Disclaimer
              </label>
              <textarea
                rows={2}
                value={form.disclaimer}
                onChange={(e) => handleFieldChange('disclaimer', e.target.value)}
                className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner resize-none"
              />
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                Active Regulatory Compliance Badges
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    checked={form.badgeIso}
                    onChange={(e) => handleFieldChange('badgeIso', e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-primary font-semibold">
                      ISO 13485:2016
                    </span>
                    <span className="font-label-technical text-label-technical text-on-surface-variant">
                      Certified Facility
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    checked={form.badgeCe}
                    onChange={(e) => handleFieldChange('badgeCe', e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-primary font-semibold">
                      CE MDR 2017/745
                    </span>
                    <span className="font-label-technical text-label-technical text-on-surface-variant">
                      EU Ready &amp; Audited
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    checked={form.badgeCgmp}
                    onChange={(e) => handleFieldChange('badgeCgmp', e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-primary font-semibold">
                      cGMP Compliant
                    </span>
                    <span className="font-label-technical text-label-technical text-on-surface-variant">
                      Sterile Protocol Ready
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: Real-Time Storefront Mirror */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          <div className="xl:sticky xl:top-20 flex flex-col gap-space-md">
            <div className="bg-primary-container text-on-primary rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse" />
                  <span className="font-label-technical text-label-technical text-primary-fixed uppercase tracking-widest font-semibold">
                    Real-Time Storefront Mirror
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-lowest/10 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[16px] text-surface-container">
                    devices
                  </span>
                  <span className="font-label-code text-label-code text-surface-container">
                    Desktop 1440px
                  </span>
                </div>
              </div>

              {/* Mini Browser Frame Mockup */}
              <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-xl text-on-surface flex flex-col">
                <div className="bg-surface-container-low px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-outline-variant" />
                    <span className="w-2 h-2 rounded-full bg-outline-variant" />
                    <span className="w-2 h-2 rounded-full bg-outline-variant" />
                  </div>
                  <span className="font-label-code text-[10px] text-on-surface-variant">
                    https://blueneedle.com/
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                </div>

                <div className="px-space-md py-2.5 bg-surface-container-lowest flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-fixed text-[12px]">
                        precision_manufacturing
                      </span>
                    </div>
                    <span className="font-headline-sm text-[12px] font-bold tracking-tight text-primary leading-none uppercase">
                      BLUENEEDLE
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-label-technical text-[10px] text-secondary">
                    <span>PRODUCTS</span>
                    <span>METALLURGY</span>
                    <span>RFQ MANIFEST</span>
                  </div>
                </div>

                {/* Live-Synced Mini Hero */}
                <div className="relative bg-surface-container-low p-space-md flex flex-col gap-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSlU0J_dY9fAGuUHurw4TMi5bbXoy2DqR8YLT4TP_FwDKwH-mlibXx20tibinn-5cM2xK8SgwUWH5uDu7DSvT_BNHq1SyYadr7H_3_zKWlRLg6ta9Jp6JvMC3_qn7fuDclQ0CsJpr8skduvRbZZ5AGoJ9usI0iwS5dRhYZEMzEupjmCLAuxsSFHABjZkRLUI0RNFeteKN0tHYB14CuJ6Vmk28IHMAbegClx0F3X6I"
                      alt="Monochrome German stainless steel surgical instruments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <span className="font-label-code text-[9px] uppercase tracking-wider text-secondary font-semibold">
                      SWISS-GERMAN CALIBER SURGICAL
                    </span>
                    <div className="font-headline-md text-headline-sm text-primary font-bold leading-tight">
                      {form.headline || 'Precision in Every Instrument.'}
                    </div>
                    <p className="font-body-sm text-[11px] text-on-surface-variant leading-snug line-clamp-3">
                      {form.tagline}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-technical text-[10px] font-semibold">
                        {form.cta1Text || 'Explore'}
                      </div>
                      <div className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary font-label-technical text-[10px] shadow-sm">
                        {form.cta2Text || 'Contact'}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-1 pt-2 mt-2 bg-surface-container-lowest/80 p-1.5 rounded backdrop-blur-sm">
                    <div className="flex flex-col">
                      <span className="font-label-code text-[8px] text-secondary uppercase font-semibold">
                        Sialkot Hub
                      </span>
                      <span className="font-label-technical text-[9px] text-primary font-bold truncate">
                        80%+ Global
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-code text-[8px] text-secondary uppercase font-semibold">
                        Metallurgy
                      </span>
                      <span className="font-label-technical text-[9px] text-primary font-bold truncate">
                        50-56 HRC
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-code text-[8px] text-secondary uppercase font-semibold">
                        QA Inspection
                      </span>
                      <span className="font-label-technical text-[9px] text-primary font-bold truncate">
                        100% Bevel
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Live Footer Disclaimer */}
                <div className="p-2 bg-surface-container-high flex flex-col gap-1 text-[9px] text-on-surface-variant font-label-technical">
                  <span className="leading-tight">{form.disclaimer}</span>
                  <div className="flex items-center gap-2 pt-0.5 text-[8px] font-label-code text-secondary">
                    {form.badgeIso && <span>[ISO 13485]</span>}
                    {form.badgeCe && <span>[CE MDR 2017/745]</span>}
                    {form.badgeCgmp && <span>[cGMP]</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Deploy Audit Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-technical text-label-technical text-secondary uppercase font-semibold">
                  Editorial Audit History
                </span>
                <span className="font-label-code text-label-code text-on-surface-variant">
                  Revision #{revision}
                </span>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-primary font-semibold">
                    Last Published by {publisherName}
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    Today at 10:42 AM PKT (UTC+5)
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-1">
                    Changes applied: European port logistics routing and DIN alloy hardness ranges
                    updated.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-label-technical text-label-technical px-1">
                <span>CDN Distribution Status:</span>
                <span className="text-primary font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />9 Edge Regions Synced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Persistent Save / Deploy Bar */}
      <div className="sticky bottom-4 z-30 w-full mt-auto">
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-space-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-3 h-3 rounded-full ${
                hasUnsavedChanges ? 'bg-error animate-ping' : 'bg-emerald-500'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary font-bold">
                {hasUnsavedChanges
                  ? 'Unsaved changes detected in Content Workspace'
                  : 'All Storefront Sections Synchronized'}
              </span>
              <span className="font-label-technical text-label-technical text-on-surface-variant">
                {hasUnsavedChanges
                  ? 'Modifications have not yet compiled to the edge CDN.'
                  : 'Live production copy matches Revision #' + revision + '.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges}
              className="px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-lg text-label-lg font-medium disabled:opacity-50"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={handleDeploy}
              disabled={deployStatus === 'deploying'}
              className={`flex items-center gap-2 px-space-lg py-2.5 rounded-lg text-on-primary shadow-md transition-all font-label-lg text-label-lg font-semibold ${
                deployStatus === 'deployed'
                  ? 'bg-secondary'
                  : 'bg-primary-container hover:bg-tertiary-container'
              }`}
            >
              {deployStatus === 'deploying' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    refresh
                  </span>
                  <span>Deploying to 9 CDN Edges...</span>
                </>
              ) : deployStatus === 'deployed' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>Changes Deployed Successfully!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Save &amp; Deploy to Live Website</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
