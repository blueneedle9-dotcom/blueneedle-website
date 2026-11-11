import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiError, apiRequest } from '../lib/api';
import {
  AuthResponse,
  saveAuth,
  validateEmailInput,
  validateNameInput,
  validatePasswordInput,
} from '../lib/auth';

const FACILITY_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkFRg0dqSrIaIV3GTFzmp6GQlHgzyhmI9wLm0speg4QAse_7e72Ir5crBzW73ontTc05rrzoVI6DVZITygiJsoELQl4oqbjvege1S6FjGO5U4YjzezWOLlnzGJ2hOoZS7n1gu1ZsSKZrVycI22_gbrXk7nK8GKSOKmNZ5c4WSiHiYCGpaVrnC3n2fdlYTAJFhNkX4IVgppGiDW9JzaEl7g2m-vYoPUtJ-397a6vBI';

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  const strength = useMemo(() => {
    const hasLength = password.length >= 8;
    const hasCasesAndDigit =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const score =
      (hasLength ? 1 : 0) + (hasCasesAndDigit ? 1 : 0) + (hasSymbol ? 1 : 0);

    let label = 'AWAITING INPUT';
    let colorClass = 'text-on-surface-variant';
    let barColor = 'bg-outline-variant/40';
    if (password.length > 0 && score <= 1) {
      label = 'WEAK // INSUFFICIENT';
      colorClass = 'text-red-600';
      barColor = 'bg-red-500';
    } else if (score === 2) {
      label = 'MODERATE // ALMOST READY';
      colorClass = 'text-amber-600';
      barColor = 'bg-amber-500';
    } else if (score === 3) {
      label = 'STRONG // VERIFIED';
      colorClass = 'text-emerald-600';
      barColor = 'bg-emerald-500';
    }

    return {
      hasLength,
      hasCasesAndDigit,
      hasSymbol,
      score,
      label,
      colorClass,
      barColor,
    };
  }, [password]);

  const liveMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (formError) setFormError(null);
  };

  const validateAll = (): boolean => {
    const errors: FieldErrors = {};
    const nameErr = validateNameInput(fullName);
    if (nameErr) errors.fullName = nameErr;

    const emailErr = validateEmailInput(email);
    if (emailErr) errors.email = emailErr;

    const passErr = validatePasswordInput(password);
    if (passErr) errors.password = passErr;

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormError('Please fix the highlighted fields before continuing.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateAll()) return;

    setSubmitting(true);
    try {
      const response = await apiRequest<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
          confirmPassword,
        }),
      });

      saveAuth(response.token, response.user, true);
      setCreatedEmail(response.user.email);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.field && err.field in ({ fullName: 1, email: 1, password: 1, confirmPassword: 1 })) {
          setFieldErrors((prev) => ({ ...prev, [err.field!]: err.message }));
        }
        setFormError(err.message);
      } else {
        setFormError('Unable to create account right now. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
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
            SECURE B2B ACCOUNT REGISTRATION // SCRYPT ENCRYPTED
          </div>
          <div className="flex items-center gap-5">
            <span>Direct Buyer &amp; Distributor Access</span>
            <span className="text-secondary font-semibold">Instant Activation</span>
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
                  B2B PORTAL ACCESS
                </div>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                  BLUENEEDLE Global Trade Portal
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Register with your name, email, and password to access product
                  specifications, submit bulk RFQ manifests, and manage wholesale inquiries.
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
                    Export Support Desk
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

          {/* Right 7-col B2B Registration Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="space-y-1.5 border-b border-outline-variant/20 pb-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
                B2B REGISTRATION // CREATE ACCOUNT
              </div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">
                Create a BLUENEEDLE Account
              </h1>
              <p className="text-sm text-on-surface-variant">
                Quick B2B account setup — just enter your name, email address, and a
                strong password.
              </p>
            </div>

            {createdEmail ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-700 text-2xl">
                    task_alt
                  </span>
                  <div className="space-y-1">
                    <h2 className="font-headline text-xl font-bold text-emerald-950">
                      Account Created &amp; Signed In
                    </h2>
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      Welcome, <span className="font-semibold">{fullName.trim()}</span>!
                      Your B2B account (<span className="font-mono font-semibold">{createdEmail}</span>)
                      is registered with salted cryptographic password hashing and ready to use.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/products')}
                    className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    Browse Product Catalogue
                  </button>
                  <Link
                    to="/login"
                    className="bg-white border border-emerald-300 text-emerald-900 px-5 py-2.5 rounded text-xs font-semibold hover:bg-emerald-100/50 transition-colors"
                  >
                    Go to Sign In Page
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {formError && (
                  <div
                    role="alert"
                    className="rounded border border-red-300 bg-red-50 p-4 flex items-start gap-3 text-sm text-red-900"
                  >
                    <span className="material-symbols-outlined text-red-600 text-[20px] mt-0.5 shrink-0">
                      error
                    </span>
                    <div>
                      <div className="font-mono text-xs font-bold uppercase tracking-wider">
                        Registration Error
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">{formError}</p>
                    </div>
                  </div>
                )}

                {/* User Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                  >
                    User Name / Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearFieldError('fullName');
                    }}
                    placeholder="e.g. Tariq Mehmood"
                    className={`w-full px-3.5 py-3 bg-surface-container-low rounded text-sm focus:outline-none ${
                      fieldErrors.fullName
                        ? 'border-2 border-red-500 ring-1 ring-red-400'
                        : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-[11px] font-mono text-red-600 mt-1">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="userEmail"
                    className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="userEmail"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError('email');
                    }}
                    placeholder="buyer@company.com"
                    className={`w-full px-3.5 py-3 bg-surface-container-low rounded text-sm focus:outline-none ${
                      fieldErrors.email
                        ? 'border-2 border-red-500 ring-1 ring-red-400'
                        : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] font-mono text-red-600 mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password + Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="createPassword"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="createPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearFieldError('password');
                        }}
                        placeholder="Minimum 8 characters"
                        className={`w-full pl-3.5 pr-10 py-3 bg-surface-container-low rounded text-sm focus:outline-none ${
                          fieldErrors.password
                            ? 'border-2 border-red-500 ring-1 ring-red-400'
                            : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
                        }`}
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
                    {fieldErrors.password && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-1.5"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          clearFieldError('confirmPassword');
                        }}
                        placeholder="Re-enter password"
                        className={`w-full pl-3.5 pr-10 py-3 bg-surface-container-low rounded text-sm focus:outline-none ${
                          liveMismatch || fieldErrors.confirmPassword
                            ? 'border-2 border-red-500 ring-1 ring-red-400'
                            : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
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
                    {(liveMismatch || fieldErrors.confirmPassword) && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">
                        {fieldErrors.confirmPassword || 'Passwords do not match.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Live Password Strength Meter */}
                <div className="bg-surface-container-low border border-outline-variant/25 rounded p-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-on-surface-variant">
                      PASSWORD SECURITY REQUIREMENTS
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
                        strength.hasCasesAndDigit
                          ? 'text-emerald-700'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {strength.hasCasesAndDigit
                          ? 'check_circle'
                          : 'radio_button_unchecked'}
                      </span>
                      Upper, Lower &amp; Digit
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

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary-container disabled:opacity-70 text-on-primary py-3.5 px-6 rounded font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                        Creating Secure Account...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">
                          how_to_reg
                        </span>
                        Create B2B Account
                      </>
                    )}
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-on-surface-variant pt-1">
                    <span className="font-mono text-[11px]">
                      Passwords hashed with salted scrypt before storage.
                    </span>
                    <Link
                      to="/login"
                      className="font-semibold text-secondary hover:underline"
                    >
                      Already have an account? Sign In →
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
