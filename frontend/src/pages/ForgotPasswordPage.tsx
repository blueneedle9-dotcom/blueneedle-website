import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const [workEmail, setWorkEmail] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail.trim()) return;
    setDispatched(true);
  };

  return (
    <div
      className="min-h-[calc(100vh-7rem)] bg-surface text-on-surface py-12 lg:py-16 px-6 flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="w-full max-w-[580px] space-y-6">
        {/* Top Utility Row */}
        <div className="flex items-center justify-between text-xs font-mono">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-secondary font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            RETURN TO SIGN IN
          </Link>
          <span className="text-secondary font-semibold inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">shield</span>
            SECURE GATEWAY / 256-BIT
          </span>
        </div>

        {/* Recovery Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-lg overflow-hidden shadow-sm">
          {/* 3-Segment Top Bar */}
          <div className="grid grid-cols-3 h-1.5">
            <div className="bg-primary" />
            <div className="bg-secondary" />
            <div className="bg-primary-container" />
          </div>

          <div className="p-7 sm:p-9 space-y-6">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-outline-variant/20">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-secondary font-semibold">
                CREDENTIAL RECOVERY // B2B PORTAL
              </span>
              <span className="text-[11px] font-mono bg-surface-container px-2.5 py-0.5 rounded border border-outline-variant/30 text-on-surface-variant">
                FORM-AUTH-V4
              </span>
            </div>

            {!dispatched ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
                    Reset Your Password
                  </h1>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Enter your registered institutional work email to receive a
                    single-use cryptographic password recovery token.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="work-email"
                    className="block text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold mb-2"
                  >
                    Registered Work Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      alternate_email
                    </span>
                    <input
                      id="work-email"
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="procurement@hospital-network.org"
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/40 rounded text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div className="bg-surface-container-low border border-outline-variant/30 rounded p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                      verified_user
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-on-surface">
                        Cryptographic Verification Policy
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Tokens expire automatically after 15 minutes and invalidate
                        prior distributor session cookies.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-secondary shrink-0 bg-surface-container-lowest px-2.5 py-1 rounded border border-outline-variant/30">
                    EXP: 15 MIN
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 px-6 rounded font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                  Send Recovery Link
                </button>
              </form>
            ) : (
              <div id="confirmation-view" className="space-y-5">
                <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-5 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-emerald-800">
                    <span className="material-symbols-outlined text-2xl">
                      mark_email_read
                    </span>
                    <h2 className="font-headline text-xl font-bold text-emerald-950">
                      Recovery Link Dispatched
                    </h2>
                  </div>
                  <p className="text-sm text-emerald-900 leading-relaxed">
                    A single-use encrypted recovery link has been queued for{' '}
                    <span className="font-mono font-semibold">{workEmail}</span>.
                    Please inspect your institutional inbox and spam quarantine
                    within the next 15 minutes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setDispatched(false)}
                    className="flex-1 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface py-3 px-4 rounded font-semibold text-xs transition-colors"
                  >
                    Request Resend / Change Address
                  </button>
                  <Link
                    to="/login"
                    className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-3 px-4 rounded font-semibold text-xs text-center transition-colors"
                  >
                    Return to Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* Priority Desk Box */}
            <div className="pt-4 border-t border-outline-variant/20 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                Tender &amp; Surgical Procurement Priority Desk
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <a
                  href="mailto:support@blueneedle.com"
                  className="text-secondary hover:underline font-semibold"
                >
                  support@blueneedle.com
                </a>
                <span className="text-on-surface font-semibold">
                  +92 52 4589201
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low px-7 py-3 border-t border-outline-variant/25 flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
            <span>SIALKOT CENTRAL CLEARING NODE</span>
            <span>AUDIT-LOGGED RECOVERY</span>
          </div>
        </div>

        {/* 3 Bottom Security / Compliance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { code: 'RSA 4096 / TLS 1.3', label: 'End-to-End Transport' },
            { code: 'MDR / 2017/745', label: 'EU Regulatory Alignment' },
            { code: 'SYS-EVENT-SYNCED', label: 'Tamper-Evident Audit' },
          ].map((card) => (
            <div
              key={card.code}
              className="bg-surface-container-lowest border border-outline-variant/25 rounded p-3.5 text-center"
            >
              <div className="text-[11px] font-mono font-bold text-primary">
                {card.code}
              </div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
