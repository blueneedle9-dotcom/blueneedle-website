import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiError, apiRequest } from '../lib/api';
import { AuthResponse, saveAuth, validateEmailInput } from '../lib/auth';

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

export const LoginPage: React.FC<{
  onOpenRfq: (targetLabel?: string) => void;
}> = ({ onOpenRfq }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [workEmail, setWorkEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberWorkstation, setRememberWorkstation] = useState(true);

  const [authStatus, setAuthStatus] = useState<
    'idle' | 'verifying' | 'authenticated' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [pivNotice, setPivNotice] = useState(false);

  const clearErrorState = (field?: keyof LoginFieldErrors) => {
    if (field) {
      setFieldErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (authStatus === 'error') {
      setAuthStatus('idle');
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPivNotice(false);
    setErrorMessage(null);

    const nextFieldErrors: LoginFieldErrors = {};
    const emailError = validateEmailInput(workEmail);
    if (emailError) {
      nextFieldErrors.email = emailError;
    }
    if (!accountPassword) {
      nextFieldErrors.password = 'Password is required.';
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setAuthStatus('error');
      setErrorMessage('Please enter both a valid email address and your password.');
      return;
    }

    setFieldErrors({});
    setAuthStatus('verifying');

    try {
      const response = await apiRequest<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: workEmail.trim().toLowerCase(),
          password: accountPassword,
          rememberMe: rememberWorkstation,
        }),
      });

      saveAuth(response.token, response.user, rememberWorkstation);
      setAuthStatus('authenticated');

      const redirectTarget = searchParams.get('redirect');
      const destination =
        redirectTarget && redirectTarget.startsWith('/')
          ? redirectTarget
          : response.user.role === 'admin'
            ? '/admin'
            : '/';

      window.setTimeout(() => {
        navigate(destination, { replace: true });
      }, 450);
    } catch (err) {
      setAuthStatus('error');
      if (err instanceof ApiError) {
        if (err.field === 'email' || err.field === 'password') {
          setFieldErrors({ [err.field]: err.message });
        }
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          'Unexpected authentication error occurred. Please try again.'
        );
      }
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-[calc(100vh-7rem)] flex flex-col">
      {/* Context Bar */}
      <div className="bg-surface-container-low border-b border-outline-variant/25 py-2.5 px-6 lg:px-gutter-desktop">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Gateway Node: SIALKOT-PK-SEC-01 / ISO 13485:2016 Compliant Channel
            </span>
          </div>
          <div className="flex items-center gap-2 text-secondary font-semibold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Salted Scrypt + HMAC Session Verification</span>
          </div>
        </div>
      </div>

      {/* Main Gateway Card */}
      <div className="flex-1 py-10 lg:py-16 px-6 lg:px-gutter-desktop flex items-center justify-center">
        <div className="w-full max-w-[1200px] space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
            {/* Left 5-col Institutional Gateway Panel */}
            <div className="lg:col-span-5 bg-primary-container text-on-primary p-8 lg:p-10 flex flex-col justify-between gap-8 relative overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="absolute -right-10 -top-10 w-56 h-56 text-white/5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              >
                <circle cx="50" cy="50" r="42" />
                <circle cx="50" cy="50" r="26" strokeDasharray="3 3" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
              </svg>

              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded text-[10px] font-mono uppercase tracking-[0.18em] text-secondary-fixed">
                  B2B Trade Portal // Secure Access
                </div>

                <div>
                  <h1 className="font-headline text-3xl font-bold tracking-tight">
                    BLUENEEDLE Client &amp; Admin Gateway
                  </h1>
                  <p className="text-sm text-on-primary-container mt-2 leading-relaxed">
                    Authorized access for B2B buyers, medical distributors, OEM
                    partners, and Sialkot operations administrators.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      icon: 'architecture',
                      title: 'Technical Blueprints & STEP CAD',
                      desc: 'Download orthographic tolerance sheets & tray geometry files.',
                    },
                    {
                      icon: 'science',
                      title: 'MTR Metallurgy Certificates',
                      desc: 'Verify lot heat-numbers, HRC logs & ASTM A967 compliance.',
                    },
                    {
                      icon: 'request_quote',
                      title: 'Tender Pricing & Active RFQ Records',
                      desc: 'Track B2B quote revisions and container schedules.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white/5 border border-white/10 rounded p-4 flex items-start gap-3.5"
                    >
                      <span className="material-symbols-outlined text-secondary-fixed text-[20px] mt-0.5 shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-sm text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-on-primary-container mt-0.5 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-on-primary-container relative z-10">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Sialkot ERP Dispatch Online
                </span>
                <span>Ver. 4.19.8-CLINICAL</span>
              </div>
            </div>

            {/* Right 7-col Authentication Form */}
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-outline-variant/20">
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
                    Authentication Manifest
                  </span>
                  <span className="text-[11px] font-mono bg-surface-container px-2.5 py-1 rounded text-on-surface-variant border border-outline-variant/30">
                    PORT-LOGIN-REQ
                  </span>
                </div>

                <div>
                  <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface">
                    Sign In to Your Account
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Enter your registered email and password to access your B2B
                    account or admin console.
                  </p>
                </div>

                {authStatus === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="rounded border border-red-300 bg-red-50 p-4 flex items-start gap-3 text-sm text-red-900"
                  >
                    <span className="material-symbols-outlined text-red-600 text-[20px] mt-0.5 shrink-0">
                      error
                    </span>
                    <div>
                      <div className="font-mono text-xs font-bold uppercase tracking-wider">
                        Sign In Failed
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {(authStatus === 'verifying' || authStatus === 'authenticated') && (
                  <div
                    role="status"
                    className={`rounded border p-4 flex items-start gap-3 text-sm ${
                      authStatus === 'verifying'
                        ? 'bg-surface-container-low border-secondary/40 text-on-surface'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] mt-0.5 ${
                        authStatus === 'verifying'
                          ? 'text-secondary animate-spin'
                          : 'text-emerald-700'
                      }`}
                    >
                      {authStatus === 'verifying' ? 'progress_activity' : 'verified_user'}
                    </span>
                    <div>
                      <div className="font-mono text-xs font-bold uppercase tracking-wider">
                        {authStatus === 'verifying'
                          ? 'Verifying Credentials...'
                          : 'Session Authenticated'}
                      </div>
                      <p className="text-xs mt-1">
                        {authStatus === 'verifying'
                          ? 'Checking email and password hash against Supabase registry.'
                          : 'Redirecting you to your BLUENEEDLE workspace...'}
                      </p>
                    </div>
                  </div>
                )}

                {pivNotice && (
                  <div className="rounded border border-secondary/35 bg-surface-container-low p-3.5 text-xs text-on-surface-variant flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      info
                    </span>
                    <span>
                      Hardware PIV tokens are disabled for standard B2B accounts —
                      please sign in using your email address and password above.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="workEmail"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        mail
                      </span>
                      <input
                        id="workEmail"
                        type="email"
                        autoComplete="email"
                        value={workEmail}
                        onChange={(e) => {
                          setWorkEmail(e.target.value);
                          clearErrorState('email');
                        }}
                        placeholder="you@company.com"
                        className={`w-full pl-11 pr-4 py-3 bg-surface-container-low rounded text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none ${
                          fieldErrors.email
                            ? 'border-2 border-red-500 ring-1 ring-red-400'
                            : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
                        }`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="accountPassword"
                      className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        key
                      </span>
                      <input
                        id="accountPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={accountPassword}
                        onChange={(e) => {
                          setAccountPassword(e.target.value);
                          clearErrorState('password');
                        }}
                        placeholder="Enter your password"
                        className={`w-full pl-11 pr-12 py-3 bg-surface-container-low rounded text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none ${
                          fieldErrors.password
                            ? 'border-2 border-red-500 ring-1 ring-red-400'
                            : 'border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
                      >
                        <span className="material-symbols-outlined text-[19px]">
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

                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none text-on-surface-variant">
                      <input
                        type="checkbox"
                        checked={rememberWorkstation}
                        onChange={(e) => setRememberWorkstation(e.target.checked)}
                        className="rounded border-outline-variant text-secondary focus:ring-secondary"
                      />
                      <span className="text-xs font-medium">
                        Keep me signed in (7d vs 12h session)
                      </span>
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-secondary hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={authStatus === 'verifying'}
                      className="sm:col-span-7 bg-primary hover:bg-primary-container disabled:opacity-70 text-on-primary py-3.5 px-6 rounded font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {authStatus === 'verifying' ? 'progress_activity' : 'login'}
                      </span>
                      {authStatus === 'verifying' ? 'Signing In...' : 'Sign In to Portal'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPivNotice((prev) => !prev)}
                      className="sm:col-span-5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface py-3.5 px-4 rounded font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
                      title="Hardware Security Key / PKI Smart Card"
                    >
                      <span className="material-symbols-outlined text-[17px] text-secondary">
                        security_key
                      </span>
                      Use PIV / Token
                    </button>
                  </div>
                </form>
              </div>

              <div className="pt-5 border-t border-outline-variant/20 space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-on-surface-variant">
                  Security &amp; Regulatory Standard
                </div>
                <div className="text-xs font-mono text-on-surface font-medium">
                  EN ISO 13485:2016 • EU MDR 2017/745 • US FDA 21 CFR Part 820 • cGMP
                  Certified
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Registration Callout */}
          <div className="bg-surface-container-low border border-outline-variant/25 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-on-surface">
                New B2B Buyer, Surgical Distributor, or OEM Partner?
              </div>
              <p className="text-xs text-on-surface-variant">
                Create an account in seconds or submit a direct tender inquiry.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/create-account"
                className="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface px-4 py-2.5 rounded text-xs font-semibold transition-colors"
              >
                Create Account
              </Link>
              <button
                type="button"
                onClick={() => onOpenRfq('Direct B2B Tender RFQ')}
                className="bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2.5 rounded text-xs font-semibold transition-colors"
              >
                Direct Tender RFQ
              </button>
            </div>
          </div>

          {/* Sialkot Address Footer Line */}
          <div className="text-center text-[11px] font-mono text-on-surface-variant pt-2">
            BLUENEEDLE SURGICAL INSTRUMENTS (PVT.) LTD. • Plot 14-B, Small Industrial
            Estate, Sialkot 51310, Pakistan
          </div>
        </div>
      </div>
    </div>
  );
};
