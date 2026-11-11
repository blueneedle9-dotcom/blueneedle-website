import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type AccountType = 'hospital' | 'distributor' | 'oem';

const JURISDICTIONS = [
  'European Union (EU MDR / EUDAMED)',
  'United States (FDA 510(k) / 21 CFR 820)',
  'United Kingdom (UKCA / MHRA)',
  'Switzerland (Swissmedic)',
  'Canada (Health Canada MDEL)',
  'Australia & New Zealand (TGA / Medsafe)',
  'United Arab Emirates & GCC (MOHAP / SFDA)',
  'Japan (PMDA)',
  'South Korea (MFDS)',
  'Singapore & ASEAN (HSA)',
  'Latin America (ANVISA / COFEPRIS)',
  'South Africa (SAHPRA)',
  'Other Sovereign Jurisdiction',
];

const FACILITY_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkFRg0dqSrIaIV3GTFzmp6GQlHgzyhmI9wLm0speg4QAse_7e72Ir5crBzW73ontTc05rrzoVI6DVZITygiJsoELQl4oqbjvege1S6FjGO5U4YjzezWOLlnzGJ2hOoZS7n1gu1ZsSKZrVycI22_gbrXk7nK8GKSOKmNZ5c4WSiHiYCGpaVrnC3n2fdlYTAJFhNkX4IVgppGiDW9JzaEl7g2m-vYoPUtJ-397a6vBI';

export const CreateAccountPage: React.FC = () => {
  const [accountType, setAccountType] = useState<AccountType>('hospital');
  const [fullName, setFullName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState(JURISDICTIONS[0]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authorityAttested, setAuthorityAttested] = useState(false);
  const [metallurgyUpdates, setMetallurgyUpdates] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(() => {
    const hasLength = password.length >= 8;
    const hasUpperAndDigit = /[A-Z]/.test(password) && /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const score = (hasLength ? 1 : 0) + (hasUpperAndDigit ? 1 : 0) + (hasSymbol ? 1 : 0);

    let label = 'AWAITING INPUT';
    let colorClass = 'text-on-surface-variant';
    let barColor = 'bg-outline-variant/40';
    if (password.length > 0 && score <= 1) {
      label = 'WEAK // INSUFFICIENT';
      colorClass = 'text-red-600';
      barColor = 'bg-red-500';
    } else if (score === 2) {
      label = 'MODERATE // ACCEPTABLE';
      colorClass = 'text-amber-600';
      barColor = 'bg-amber-500';
    } else if (score === 3) {
      label = 'STRONG // SURGICAL-GRADE';
      colorClass = 'text-emerald-600';
      barColor = 'bg-emerald-500';
    }

    return { hasLength, hasUpperAndDigit, hasSymbol, score, label, colorClass, barColor };
  }, [password]);

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorityAttested || passwordsMismatch || !password) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-surface text-on-surface pb-16">
      {/* Top Gateway Strip */}
      <div className="bg-surface-container-low border-b border-outline-variant/25 py-2.5 px-6 lg:px-gutter-desktop">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2 font-semibold text-on-surface">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              verified_user
            </span>
            SECURE PROTOCOL // DIN-ISO COMPLIANCE GATEWAY
          </div>
          <div className="flex items-center gap-5">
            <span>Tier-1 Export Verification</span>
            <span className="text-secondary font-semibold">24h Desk Turnaround</span>
          </div>
        </div>
      </div>

      {/* Main 12-Col Layout */}
      <section className="py-10 lg:py-14 px-6 lg:px-gutter-desktop">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 5-col Sticky Dossier */}
          <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-6 space-y-5">
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
                  B2B PROVISIONING DOSSIER
                </div>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                  Institutional &amp; OEM Global Portal
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Verified accounts gain wholesale matrix pricing, GS1 UDI batch
                  histories, and direct CAD/MTR engineering downloads.
                </p>
              </div>

              {/* Metallurgy Audit Chart Card */}
              <div className="bg-surface-container-low border border-outline-variant/25 rounded p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>METALLURGY AUDIT STATUS / BATCH 2024.09-EU</span>
                  <span className="text-emerald-700 font-bold">99.94% PASS</span>
                </div>
                <svg
                  viewBox="0 0 320 55"
                  className="w-full h-14 text-secondary"
                  fill="none"
                >
                  <path
                    d="M 0,45 L 50,45 L 80,25 L 140,25 L 180,15 L 240,15 L 280,8 L 320,8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="80" cy="25" r="3" fill="currentColor" />
                  <circle cx="180" cy="15" r="3" fill="currentColor" />
                  <circle cx="280" cy="8" r="3.5" fill="#10b981" />
                </svg>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-[11px] font-mono">
                  <div>
                    <div className="text-on-surface-variant">AISI 420</div>
                    <div className="font-bold text-on-surface">52 HRC</div>
                  </div>
                  <div>
                    <div className="text-on-surface-variant">ASTM A967</div>
                    <div className="font-bold text-on-surface">0% Pit</div>
                  </div>
                  <div>
                    <div className="text-on-surface-variant">Tolerance</div>
                    <div className="font-bold text-on-surface">±0.02mm</div>
                  </div>
                </div>
              </div>

              {/* Facility Card */}
              <div className="relative rounded overflow-hidden border border-outline-variant/25">
                <img
                  src={FACILITY_IMAGE}
                  alt="BLUENEEDLE Sialkot SKT-MNF-704 cGMP Facility"
                  className="w-full h-44 object-cover"
                />
                <div className="bg-primary text-on-primary px-4 py-2.5 flex items-center justify-between text-[11px] font-mono">
                  <span>FACILITY ID: SKT-MNF-704</span>
                  <span className="text-secondary-fixed font-semibold">
                    CGMP COMPLIANT
                  </span>
                </div>
              </div>

              {/* Export Support Box */}
              <div className="bg-surface-container border border-outline-variant/30 rounded p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                    Export Credential Desk
                  </div>
                  <a
                    href="mailto:export@blueneedle.com"
                    className="text-sm font-mono font-semibold text-secondary hover:underline"
                  >
                    export@blueneedle.com
                  </a>
                </div>
                <span className="material-symbols-outlined text-primary">
                  support_agent
                </span>
              </div>
            </div>
          </aside>

          {/* Right 7-col Application Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="space-y-1.5 border-b border-outline-variant/20 pb-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
                INSTITUTIONAL REGISTRATION // TIER-1
              </div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">
                Apply for a BLUENEEDLE Account
              </h1>
              <p className="text-sm text-on-surface-variant">
                Complete institutional verification to unlock wholesale unit economics
                and regulatory documentation packs.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-700 text-2xl">
                    task_alt
                  </span>
                  <div className="space-y-1">
                    <h2 className="font-headline text-xl font-bold text-emerald-950">
                      Application Queued for Verification
                    </h2>
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      Dossier received for{' '}
                      <span className="font-semibold">{orgName || 'your organization'}</span>{' '}
                      ({accountType.toUpperCase()} tier • {jurisdiction}). Our Sialkot
                      export compliance desk will dispatch portal activation credentials
                      to <span className="font-mono font-semibold">{email}</span> within
                      24 business hours.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/login"
                    className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    Proceed to Sign In Gateway
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="bg-white border border-emerald-300 text-emerald-900 px-5 py-2.5 rounded text-xs font-semibold hover:bg-emerald-100/50 transition-colors"
                  >
                    Edit Submission Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 3 Radio Pill Cards */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                    Organization Classification
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: 'hospital',
                          icon: 'local_hospital',
                          title: 'Hospital System',
                          sub: 'SPD / Central Procurement',
                        },
                        {
                          id: 'distributor',
                          icon: 'hub',
                          title: 'Distributor',
                          sub: 'Regional Medical Stockist',
                        },
                        {
                          id: 'oem',
                          icon: 'precision_manufacturing',
                          title: 'Private Label OEM',
                          sub: 'Custom Brand / Contract',
                        },
                      ] as const
                    ).map((option) => {
                      const active = accountType === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setAccountType(option.id)}
                          aria-pressed={active}
                          className={`text-left p-4 rounded border transition-all ${
                            active
                              ? 'bg-primary text-on-primary border-primary shadow-sm'
                              : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:border-secondary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`material-symbols-outlined text-[20px] ${
                                active ? 'text-secondary-fixed' : 'text-secondary'
                              }`}
                            >
                              {option.icon}
                            </span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                active ? 'border-white' : 'border-outline-variant'
                              }`}
                            >
                              {active && (
                                <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                              )}
                            </span>
                          </div>
                          <div className="font-headline font-bold text-sm mt-2.5">
                            {option.title}
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              active ? 'text-on-primary-container' : 'text-on-surface-variant'
                            }`}
                          >
                            {option.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legal Name & Professional Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Full Legal Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Elena Vance"
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="roleTitle"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Professional Role
                    </label>
                    <input
                      id="roleTitle"
                      type="text"
                      required
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      placeholder="Director of Surgical Procurement"
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Organization & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="orgName"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Organization Name
                    </label>
                    <input
                      id="orgName"
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Nordic Surgical Supply GmbH"
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instEmail"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Institutional Email
                    </label>
                    <input
                      id="instEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@nordicsurgical.de"
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Jurisdiction Select */}
                <div>
                  <label
                    htmlFor="jurisdiction"
                    className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                  >
                    Target Export Jurisdiction
                  </label>
                  <select
                    id="jurisdiction"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                  >
                    {JURISDICTIONS.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password + Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="createPassword"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Create Passphrase
                    </label>
                    <div className="relative">
                      <input
                        id="createPassword"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="w-full pl-3.5 pr-10 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded text-sm focus:outline-none focus:border-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Confirm Passphrase
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter passphrase"
                        className={`w-full pl-3.5 pr-10 py-2.5 bg-surface-container-low rounded text-sm focus:outline-none ${
                          passwordsMismatch
                            ? 'border-2 border-red-500 ring-1 ring-red-400'
                            : 'border border-outline-variant/40 focus:border-secondary'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        aria-label={
                          showConfirm ? 'Hide confirm password' : 'Show confirm password'
                        }
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showConfirm ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {passwordsMismatch && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">
                        Passphrases do not match.
                      </p>
                    )}
                  </div>
                </div>

                {/* Live Password Strength Meter */}
                <div className="bg-surface-container-low border border-outline-variant/25 rounded p-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-on-surface-variant">
                      CRYPTOGRAPHIC STRENGTH
                    </span>
                    <span className={`font-bold ${strength.colorClass}`}>
                      {strength.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-colors ${
                          strength.score >= idx
                            ? strength.barColor
                            : 'bg-outline-variant/30'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                    <div
                      className={`flex items-center gap-1.5 ${
                        strength.hasLength ? 'text-emerald-700' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {strength.hasLength ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      8+ Characters
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        strength.hasUpperAndDigit
                          ? 'text-emerald-700'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {strength.hasUpperAndDigit
                          ? 'check_circle'
                          : 'radio_button_unchecked'}
                      </span>
                      Uppercase &amp; Digit
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        strength.hasSymbol ? 'text-emerald-700' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {strength.hasSymbol ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      Special Symbol (!@#)
                    </div>
                  </div>
                </div>

                {/* Attestations */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-on-surface-variant">
                    <input
                      type="checkbox"
                      required
                      checked={authorityAttested}
                      onChange={(e) => setAuthorityAttested(e.target.checked)}
                      className="mt-0.5 rounded border-outline-variant text-secondary focus:ring-secondary"
                    />
                    <span>
                      <strong className="text-on-surface">
                        Institutional Authority Attestation:
                      </strong>{' '}
                      I certify that I am authorized to request medical-grade B2B
                      procurement pricing and regulatory documentation on behalf of the
                      named entity.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer text-xs text-on-surface-variant">
                    <input
                      type="checkbox"
                      checked={metallurgyUpdates}
                      onChange={(e) => setMetallurgyUpdates(e.target.checked)}
                      className="mt-0.5 rounded border-outline-variant text-secondary focus:ring-secondary"
                    />
                    <span>
                      <strong className="text-on-surface">
                        Metallurgical Releases:
                      </strong>{' '}
                      Receive quarterly AISI alloy updates, EU MDR technical advisories,
                      and new instrument pattern additions.
                    </span>
                  </label>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting || passwordsMismatch}
                    className="w-full bg-primary hover:bg-primary-container disabled:opacity-70 text-on-primary py-3.5 px-6 rounded font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                        Encrypting Institutional Dossier...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">
                          how_to_reg
                        </span>
                        Submit Institutional Application
                      </>
                    )}
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-on-surface-variant pt-1">
                    <span className="font-mono text-[11px]">
                      SLA: Credential vetting completed within 24 business hours.
                    </span>
                    <Link
                      to="/login"
                      className="font-semibold text-secondary hover:underline"
                    >
                      Already Verified? Sign In to Wholesale Portal →
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom 3-Step Institutional Account Governance */}
      <section className="px-6 lg:px-gutter-desktop pt-4">
        <div className="max-w-[1440px] mx-auto space-y-5">
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
            INSTITUTIONAL ACCOUNT GOVERNANCE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: 'STEP 01',
                title: 'Corporate Tax & Facility Registry',
                desc: 'Cross-verification of hospital establishment number, VAT/EIN registry, or regional medical device distribution license.',
              },
              {
                step: 'STEP 02',
                title: 'Customs & EORI Authorization',
                desc: 'Assignment of EU MDR / FDA import classification codes, HS 9018 tariff mapping, and approved freight corridor terms.',
              },
              {
                step: 'STEP 03',
                title: 'Wholesale Pricing Vault Access',
                desc: 'Activation of tiered MOQ pricing, editable RFQ manifests, and direct downloads for CAD blueprints and MTR batch files.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg p-6 space-y-2"
              >
                <div className="text-[11px] font-mono font-bold text-secondary">
                  {item.step}
                </div>
                <h3 className="font-headline font-bold text-base text-on-surface">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
