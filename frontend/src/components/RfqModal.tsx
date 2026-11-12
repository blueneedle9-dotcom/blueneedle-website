import React, { useState } from "react";

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItemLabel?: string;
  manifestRefs?: string[];
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  targetItemLabel = "VSP-2044-TC (Metzenbaum-Fino TC)",
  manifestRefs = [],
}) => {
  const [entity, setEntity] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [destination, setDestination] = useState("");
  const [marking, setMarking] = useState("Vanguard GS1 UDI Laser Mark");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const displayTarget =
    manifestRefs.length > 0
      ? `${manifestRefs.length} Selected Instrument(s): ${manifestRefs.join(", ")}`
      : targetItemLabel;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEntity("");
      setEmail("");
      setDestination("");
      setNotes("");
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4"
      id="rfq-modal"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-space-lg lg:p-space-xl shadow-2xl relative border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Vanguard Institutional Procurement Desk
            </span>
            <h3 className="font-headline-md text-headline-md text-primary font-semibold">
              Request Quotation &amp; Specification Dossier
            </h3>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors flex items-center justify-center"
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-space-xl flex flex-col items-center text-center gap-space-sm">
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">
                check_circle
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-primary font-semibold">
              Tender Requisition Logged
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Your inquiry has been assigned to our European export division. An official proforma quotation and DIN compliance certificate will be sent to{" "}
              <strong>{email || "your hospital email address"}</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <form className="space-y-space-md" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                Instrument Scope / SKUs
              </label>
              <input
                className="w-full bg-surface-container-low text-primary font-semibold font-body-sm text-body-sm p-space-sm rounded border border-outline-variant/30"
                readOnly
                type="text"
                value={displayTarget}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                  Procuring Entity / Hospital Name *
                </label>
                <input
                  required
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none"
                  placeholder="e.g. Zurich University Clinic"
                  type="text"
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                  Institutional Email *
                </label>
                <input
                  required
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none"
                  placeholder="procurement@hospital.org"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                  Estimated Quantity (Units)
                </label>
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none"
                  min={1}
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                  Destination Country / Airport Code
                </label>
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none"
                  placeholder="e.g. ZRH, FRA, JFK"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                Custom Marking &amp; Passivation Protocol
              </label>
              <select
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none"
                value={marking}
                onChange={(e) => setMarking(e.target.value)}
              >
                <option>Vanguard GS1 UDI Laser Mark (Standard)</option>
                <option>Hospital Department Custom Laser Etch</option>
                <option>OEM Private Label Direct Etch</option>
                <option>Neutral / Unmarked Instrument Release</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-outline uppercase mb-1">
                Clinical Scope / Additional Notes
              </label>
              <textarea
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md p-space-sm rounded border border-outline-variant/40 focus:ring-1 focus:ring-primary-container outline-none h-20"
                placeholder="Include tender tender reference number, requested delivery timeframe, sterilization compatibility..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-space-xs">
              <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  lock
                </span>
                Compliant with GDPR &amp; HIPAA Hospital Procurement Data Standards
              </span>
              <button
                className="bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-space-sm rounded-lg hover:brightness-110 active:brightness-95 transition-all shadow-sm"
                type="submit"
              >
                Transmit Tender Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
