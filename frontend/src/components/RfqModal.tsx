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
  targetItemLabel = "BN-SC-1021-TC (Mayo Dissecting)",
  manifestRefs = [],
}) => {
  const [entity, setEntity] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [port, setPort] = useState("");
  const [marking, setMarking] = useState("BLUENEEDLE Standard");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const displayTarget =
    manifestRefs.length > 0
      ? `${manifestRefs.length} Manifest Item(s): ${manifestRefs.join(", ")}`
      : targetItemLabel;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEntity("");
      setEmail("");
      setPort("");
      setNotes("");
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-margin"
      id="rfq-modal"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-space-lg lg:p-space-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-space-sm mb-space-md">
          <div>
            <span className="font-label-technical text-label-technical text-secondary uppercase">
              B2B Institutional Gateway
            </span>
            <h3 className="font-headline-md text-headline-md text-primary">
              Request Quotation &amp; Specification
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
          <div className="p-space-lg bg-surface-container-low rounded-xl text-center space-y-space-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px] text-emerald-600">
                check_circle
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-primary">
              Specification Inquiry Transmitted
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Routed to BLUENEEDLE Export Desk (Sialkot). A dedicated metallurgical
              specialist will respond within 4 business hours.
            </p>
          </div>
        ) : (
          <form className="space-y-space-sm" onSubmit={handleSubmit}>
            <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-wrap items-center justify-between gap-2 font-label-technical text-label-technical">
              <span className="text-primary font-semibold truncate max-w-md">
                TARGET ITEM: {displayTarget}
              </span>
              <span className="text-secondary">Sialkot Export FOB/CIF</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  HOSPITAL / DISTRIBUTOR ENTITY
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Asklepios Kliniken Hamburg"
                  required
                  type="text"
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  PROCUREMENT EMAIL
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="tenders@healthcare-entity.de"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  DESIRED QUANTITY
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  min={25}
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  TARGET PORT
                </label>
                <input
                  className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Rotterdam / Hamburg / JFK"
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-technical text-label-technical text-secondary mb-1">
                  OEM LASER MARKING
                </label>
                <select
                  className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={marking}
                  onChange={(e) => setMarking(e.target.value)}
                >
                  <option>BLUENEEDLE Standard</option>
                  <option>Custom Institution Mark</option>
                  <option>Neutral Unbranded</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-label-technical text-label-technical text-secondary mb-1">
                TECHNICAL SPECIFICATION NOTES
              </label>
              <textarea
                className="w-full px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Specify blade curvature preference, custom pack sterile requirements or CE technical file documentation needed."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="pt-space-xs flex items-center justify-between">
              <span className="font-label-technical text-label-technical text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  lock
                </span>
                SDR &amp; NDA Protected
              </span>
              <button
                className="bg-primary text-on-primary hover:bg-primary-container px-6 py-2.5 rounded font-label-lg text-label-lg font-semibold uppercase tracking-wider transition-colors shadow-sm"
                type="submit"
              >
                Transmit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
