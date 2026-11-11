import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../components/AdminLayout';

export const AdminSettingsPage: React.FC = () => {
  const { adminUser } = useAdminContext();

  const [fullName, setFullName] = useState(adminUser?.fullName || 'Tariq Mehmood');
  const [email, setEmail] = useState(adminUser?.email || 't.mehmood@blueneedle.com');
  const [designation, setDesignation] = useState('Chief Metallurgist / QA Lead');
  const [phone, setPhone] = useState('+92 52 4589201 (Ext: 104)');
  const [timezone, setTimezone] = useState('(GMT+05:00) Islamabad, Karachi (PKT)');
  const [language, setLanguage] = useState('English (UK / Clinical Standard)');

  const [currPass, setCurrPass] = useState('SurgicalSteel2024!');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [showCurr, setShowCurr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [alertInquiries, setAlertInquiries] = useState(true);
  const [alertSyncReport, setAlertSyncReport] = useState(true);
  const [alertNcr, setAlertNcr] = useState(true);

  const [toastText, setToastText] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2800);
  };

  const initials = useMemo(() => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase() || 'BN';
  }, [fullName]);

  const entropyScore = useMemo(() => {
    if (!newPass) return 92;
    let score = 20;
    if (newPass.length >= 8) score += 20;
    if (newPass.length >= 12) score += 20;
    if (/[A-Z]/.test(newPass) && /[a-z]/.test(newPass)) score += 15;
    if (/\d/.test(newPass)) score += 15;
    if (/[^A-Za-z0-9]/.test(newPass)) score += 10;
    return Math.min(100, score);
  }, [newPass]);

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-code text-label-code text-secondary tracking-widest uppercase">
              SECURITY CONSOLE // NODE-01
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-semibold">
            Admin Profile &amp; System Settings
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Manage personal administrative credentials, multi-factor authentication, security
            policies, and system preferences.
          </p>
        </div>

        <div className="flex items-center gap-space-sm self-start lg:self-center">
          <button
            type="button"
            onClick={() => triggerToast('Loaded last 30 days Sialkot Audit Trail.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high hover:text-on-surface transition-all font-label-lg text-label-lg shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>Audit Activity Log</span>
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Changes successfully saved to cluster.')}
            className="flex items-center gap-1.5 px-5 py-2 rounded bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Identity Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-surface-container-high/40 to-transparent pointer-events-none rounded-bl-full" />

            <div className="flex items-start gap-space-md">
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm tracking-wider font-semibold shadow-md">
                  {initials}
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary-container p-0.5 flex items-center justify-center shadow">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                </span>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-sm text-headline-sm text-primary truncate font-semibold">
                    {fullName}
                  </h2>
                  <span
                    className="material-symbols-outlined text-secondary text-[18px]"
                    title="Cryptographically Verified Officer"
                  >
                    verified
                  </span>
                </div>
                <p className="font-label-technical text-label-technical text-secondary mt-0.5 leading-snug">
                  {designation} &amp; Master Catalog Administrator
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-primary font-label-code text-[11px] self-start">
                  <span className="material-symbols-outlined text-[14px]">apartment</span>
                  <span>SKT-FAC-01</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider">
                    Facility Node
                  </span>
                  <span className="font-label-code text-[11px] text-secondary">ACTIVE CLUSTER</span>
                </div>
                <span className="font-body-sm text-body-sm text-primary font-medium">
                  Sialkot Manufacturing Complex (SKT-FAC-01)
                </span>
              </div>

              <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider">
                    Security Clearance
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-primary font-label-code text-[10px] font-semibold">
                    ISO 13485
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-primary font-medium">
                  Level 4 — Full Catalog &amp; Compliance Authority
                </span>
              </div>

              <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider">
                    Last Telemetry Session
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                </div>
                <span className="font-label-technical text-label-technical text-primary font-normal">
                  Today at 08:30 AM PKT from IP 182.185.14.92
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">badge</span>
                <span className="font-label-code text-label-code text-on-surface-variant">
                  SERIAL // DIN-BN-90812
                </span>
              </div>
              <span className="font-label-code text-[10px] text-secondary tracking-widest uppercase">
                ENCRYPTED HSM
              </span>
            </div>
          </div>

          {/* Quick Security Status */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    security
                  </span>
                </div>
                <h3 className="font-headline-sm text-[16px] text-primary font-semibold">
                  Quick Security Status
                </h3>
              </div>
              <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container text-secondary font-medium">
                HEALTH 98%
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">lock_clock</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-primary font-medium">
                      Two-Factor Authentication
                    </span>
                    <span className="font-label-code text-[11px] text-on-surface-variant">
                      Authenticator App (TOTP RFC 6238)
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-code text-label-code font-semibold">
                  Active
                </span>
              </div>

              <div className="p-3 rounded bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">key</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-primary font-medium">
                      Password Last Changed
                    </span>
                    <span className="font-label-code text-[11px] text-on-surface-variant">
                      18 days ago (Rotation: 90 days)
                    </span>
                  </div>
                </div>
                <span className="font-label-code text-label-code text-secondary font-medium">
                  72d Left
                </span>
              </div>

              <div className="p-3 rounded bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-primary font-medium">
                      Session Idle Timeout
                    </span>
                    <span className="font-label-code text-[11px] text-on-surface-variant">
                      Strict terminal auto-lock
                    </span>
                  </div>
                </div>
                <span className="font-label-code text-label-code text-primary font-semibold">
                  30 min
                </span>
              </div>
            </div>

            <div className="p-3 rounded bg-surface-container-high/40 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                info
              </span>
              <p className="font-label-technical text-label-technical text-on-surface-variant leading-relaxed">
                All administrative privileges comply with MDR 2017/745 surgical instruments
                manufacturing audit trail standards.
              </p>
            </div>
          </div>

          {/* Active Product Workspace Shortcut */}
          <Link
            to="/admin/products"
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3MD3vu0OqamPTMOXrhxT9opkg4rhb-PGIP5mqEtpN72EUODme2tTSgJymVx3iv5W7W2Tlrh-8kliPrrU8N9adbLlXzYojssBfEewQgB0m-un43EY2CFZDOxt0HnoPQ8iKlvNK7P9jkGQWYb-bPAwoZYnfD4780iW3p3uuHZZWhduLnuzFPd5cA9GQUjJ0g5WvXMdDY8DBq6R0LJtVl8nd8UKAtO0ZBP8Xl_t0r78"
                alt="Metzenbaum-Nelson TC 180mm surgical scissor"
                className="w-12 h-12 object-cover rounded shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-label-code text-[11px] text-secondary">
                  ACTIVE PRODUCT WORKSPACE
                </span>
                <span className="font-body-sm text-body-sm font-semibold text-primary">
                  Metzenbaum-Nelson TC 180mm
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* Right Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Personal Information */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary font-semibold">
                  Personal Information
                </h3>
              </div>
              <span className="font-label-code text-label-code text-on-surface-variant uppercase">
                SEC-RECORD-04
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast('Profile details updated successfully');
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-space-md"
            >
              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                    Corporate Email Address
                  </label>
                  <span className="inline-flex items-center gap-1 font-label-code text-[10px] text-secondary">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>{' '}
                    Verified
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Professional Designation
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                  >
                    <option value="(GMT+05:00) Islamabad, Karachi (PKT)">
                      (GMT+05:00) Islamabad, Karachi (PKT)
                    </option>
                    <option value="(GMT+00:00) London, Western European Time (UTC)">
                      (GMT+00:00) London, Western European Time (UTC)
                    </option>
                    <option value="(GMT+01:00) Berlin, Zurich, Solingen (CET)">
                      (GMT+01:00) Berlin, Zurich, Solingen (CET)
                    </option>
                    <option value="(GMT-05:00) New York, Eastern Standard Time (EST)">
                      (GMT-05:00) New York, Eastern Standard Time (EST)
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Language Standard
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                  >
                    <option value="English (UK / Clinical Standard)">
                      English (UK / Clinical Standard)
                    </option>
                    <option value="Deutsch (Medizinprodukte DIN Spec)">
                      Deutsch (Medizinprodukte DIN Spec)
                    </option>
                    <option value="Français (Médical Standard)">
                      Français (Médical Standard)
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-surface-container-high hover:bg-surface-container text-primary font-label-lg text-label-lg transition-colors"
                >
                  Update Profile Details
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    password
                  </span>
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary font-semibold">
                  Change Password
                </h3>
              </div>
              <span className="font-label-code text-label-code text-on-surface-variant">
                ROTATION INTERVAL: 90D
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newPass && newPass !== confPass) {
                  triggerToast('New password and confirmation do not match.');
                  return;
                }
                triggerToast('Password credentials changed');
              }}
              className="flex flex-col gap-space-md"
            >
              <div className="flex flex-col gap-1.5">
                <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurr ? 'text' : 'password'}
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurr((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showCurr ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full pl-3 pr-10 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showNew ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConf ? 'text' : 'password'}
                      value={confPass}
                      onChange={(e) => setConfPass(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full pl-3 pr-10 py-2 rounded bg-surface-container-low text-primary font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConf((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showConf ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    PASSWORD ENTROPY ASSESSMENT
                  </span>
                  <span className="font-label-code text-label-code text-primary font-semibold">
                    {entropyScore >= 80 ? 'Strong' : entropyScore >= 50 ? 'Moderate' : 'Weak'} (Score:{' '}
                    {entropyScore}/100)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden flex gap-1">
                  <div className={`h-full w-1/4 ${entropyScore >= 25 ? 'bg-secondary' : 'bg-transparent'}`} />
                  <div className={`h-full w-1/4 ${entropyScore >= 50 ? 'bg-secondary' : 'bg-transparent'}`} />
                  <div className={`h-full w-1/4 ${entropyScore >= 75 ? 'bg-secondary' : 'bg-transparent'}`} />
                  <div
                    className={`h-full w-1/4 ${entropyScore >= 90 ? 'bg-primary-container' : 'bg-transparent'}`}
                  />
                </div>
                <span className="font-label-technical text-[11px] text-on-surface-variant">
                  Requirement: Minimum 12 characters, ISO cryptographic symbols, mixed alphanumeric
                  &amp; no dictionary terms.
                </span>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-surface-container-high hover:bg-surface-container text-primary font-label-lg text-label-lg transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    notifications_active
                  </span>
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary font-semibold">
                  System Notifications &amp; Email Alert Preferences
                </h3>
              </div>
              <span className="font-label-code text-label-code text-secondary">SMTP DISPATCH</span>
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 p-3 rounded bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alertInquiries}
                  onChange={(e) => setAlertInquiries(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-0 w-4 h-4 accent-[#142B45]"
                />
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-primary font-medium">
                    Instant Email alert for new International Hospital Inquiries
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    Dispatches immediately when Tier-1 procurement dossiers submit RFQs.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alertSyncReport}
                  onChange={(e) => setAlertSyncReport(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-0 w-4 h-4 accent-[#142B45]"
                />
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-primary font-medium">
                    Weekly Catalogue Sync &amp; Spec Sheet downloads report
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    Digest of STEP CAD models, technical drawings, and DIN compliance PDF
                    downloads.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alertNcr}
                  onChange={(e) => setAlertNcr(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-0 w-4 h-4 accent-[#142B45]"
                />
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-primary font-medium">
                    Critical Non-Conformance (NCR) &amp; Audit trail alerts
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    Immediate metallurgical tolerance drift and catalog metadata deviation warnings.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Administrative Audit Attestation Footer Bar */}
      <div className="mt-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm text-primary font-medium">
              Administrative Audit Attestation
            </span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              All changes are cryptographically logged in Sialkot Admin Audit Vault (SHA-256)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm self-end sm:self-center">
          <button
            type="button"
            className="px-4 py-2 rounded text-secondary hover:bg-surface-container font-label-lg text-label-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Settings & preferences committed to Vault')}
            className="px-5 py-2 rounded bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Profile &amp; Preferences</span>
          </button>
        </div>
      </div>

      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary-container text-on-primary px-4 py-3 rounded-lg shadow-xl">
          <span className="material-symbols-outlined text-[20px]">task_alt</span>
          <span className="font-body-sm text-body-sm">{toastText}</span>
        </div>
      )}
    </div>
  );
};
