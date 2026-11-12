import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AdminAddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  // Form states
  const [productName, setProductName] = useState(
    isEditMode ? 'Metzenbaum-Nelson Dissecting Scissors TC' : ''
  );
  const [sku, setSku] = useState(isEditMode ? 'BN-SC-1035-TC' : 'BN-SC-');
  const [udiCode, setUdiCode] = useState(isEditMode ? '04012345678901' : '04098271630192');
  const [primaryCategory, setPrimaryCategory] = useState('Surgical Instruments (General)');
  const [secondaryCategory, setSecondaryCategory] = useState('Dissecting & Cutting Scissors');
  const [shortDesc, setShortDesc] = useState(
    isEditMode
      ? 'Slender curved shaft dissecting scissors with vacuum-brazed Tungsten Carbide cutting edges and gold-plated finger rings.'
      : ''
  );
  const [clinicalDesc, setClinicalDesc] = useState(
    'Engineered for deep surgical dissection with elongated arched shanks, ultra-thin blades, and vacuum-brazed Tungsten Carbide inserts for prolonged edge sharpness under repeated autoclave sterilization.'
  );

  // Technical & Metallurgy
  const [opLength, setOpLength] = useState('180 mm / 7.0 in');
  const [alloyType, setAlloyType] = useState('AISI 420B Martensitic + Tungsten Carbide (TC)');
  const [hrcRating, setHrcRating] = useState('Base: 52-54 HRC | Jaws: 70-72 HRC');
  const [passivation, setPassivation] = useState('ASTM A967 Citric Acid Passivation');
  const [tipConfig, setTipConfig] = useState('Curved Blades / Blunt-Blunt (Standard)');
  const [autoclaveRating, setAutoclaveRating] = useState('134°C (273°F) at 3.0 Bar (Fractionated Vacuum)');

  // Right column states
  const [publishStatus, setPublishStatus] = useState<'published' | 'draft'>('published');
  const [featureInMegaMenu, setFeatureInMegaMenu] = useState(true);
  const [primaryImage, setPrimaryImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAzHAuCDYu-0CQLGPQkwsRrh0RrgxvrmbJ_IOZ3sWDSng5NC4F3xGkmTDCyWGCn5CGvjDZF-76u7SYwtQpe6HN2_VpEOVMg-GW0pUI95nHEIAVgtb0_swOgXOgrOTxyMbGs6xseAIEB93WzSPiyIJE77mFjQ2iXIYtIP4VWrzrZNmtcF8HpsMjKXHnM0P5TVd6FyvALR8e5udX-V0BDIPzc0EQJ4qF0pt6dnbldadw'
  );

  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAutoGenerateSku = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setSku(`BN-SC-${randomNum}-TC`);
  };

  const handleSaveProduct = (targetStatus?: 'published' | 'draft') => {
    const finalStatus = targetStatus || publishStatus;
    setPublishStatus(finalStatus);
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setNotification(
        `Product successfully ${isEditMode ? 'updated' : 'created and published'} in regulatory catalog!`
      );
      setTimeout(() => {
        navigate('/admin/products');
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Context Header Area */}
      <div className="w-full bg-surface-container-lowest shadow-sm mb-space-xl border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-gutter py-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          {/* Left: Breadcrumb & Title Area */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
              <Link to="/admin/products" className="hover:text-primary transition-colors">
                Catalog Products
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-body-strong">
                {isEditMode ? `Edit: ${sku}` : 'Add New Product'}
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-space-md mt-0.5">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                {isEditMode ? `Edit: ${productName || 'Product'}` : 'Add New Product'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-secondary font-caption-bold text-caption-bold shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  {isEditMode ? 'edit' : 'add_circle'}
                </span>
                <span>{isEditMode ? 'Regulatory Edit Mode' : 'Specification Draft'}</span>
              </span>
            </div>
            <p className="font-body-default text-body-default text-on-surface-variant">
              Create and publish a surgical instrument specification in the BLUENEEDLE catalog.
            </p>
          </div>

          {/* Right: Action Bar */}
          <div className="flex items-center flex-wrap gap-space-sm self-start md:self-center">
            <Link
              to="/admin/products"
              className="px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-button-text text-button-text transition-colors border border-surface-container-high"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={() => handleSaveProduct('draft')}
              disabled={saving}
              className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-secondary font-button-text text-button-text shadow-sm transition-colors flex items-center gap-1.5 border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save as Draft</span>
            </button>
            <button
              type="button"
              onClick={() => handleSaveProduct('published')}
              disabled={saving}
              className="px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-button-text text-button-text shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{saving ? 'Saving...' : 'Save & Publish Product'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Responsive Layout */}
      <div className="max-w-7xl mx-auto w-full px-gutter pb-space-2xl">
        {notification && (
          <div className="mb-space-md p-4 rounded-xl bg-secondary-container text-on-secondary-fixed border border-secondary flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-secondary">check_circle</span>
            <span className="font-body-strong font-bold">{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* ================= 70% MAIN FORM COLUMN (8 Cols) ================= */}
          <div className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* SECTION 1: Nomenclature & Classification */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary">
                      Nomenclature &amp; Basic Information
                    </h2>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Global medical device registry tags and clinical identifiers
                    </p>
                  </div>
                </div>
                <span className="text-caption font-caption-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">
                  DIN Spec 58298
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Product Title */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary flex items-center justify-between"
                    htmlFor="prod-name"
                  >
                    <span>
                      Product Name <span className="text-error">*</span>
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Official Surgical Device Title
                    </span>
                  </label>
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="prod-name"
                    placeholder="e.g. Mayo-Hegar Needle Holder Gold TC"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                {/* SKU / Product Code with Auto-Gen */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary flex items-center justify-between"
                    htmlFor="prod-sku"
                  >
                    <span>
                      SKU / Product Code <span className="text-error">*</span>
                    </span>
                    <span className="font-caption text-caption text-secondary">Unique Ref</span>
                  </label>
                  <div className="flex items-center gap-space-xs">
                    <input
                      className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default font-mono placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                      id="prod-sku"
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                    <button
                      className="h-11 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary flex items-center justify-center transition-colors border border-surface-container-high"
                      title="Auto-generate SKU"
                      type="button"
                      onClick={handleAutoGenerateSku}
                    >
                      <span className="material-symbols-outlined text-[18px]">autorenew</span>
                    </button>
                  </div>
                </div>

                {/* UDI / Batch Identifier */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary flex items-center justify-between"
                    htmlFor="prod-udi"
                  >
                    <span>FDA / MDR UDI-DI Code</span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      GTIN-14 Standard
                    </span>
                  </label>
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default font-mono placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="prod-udi"
                    placeholder="14-digit Global Trade No."
                    type="text"
                    value={udiCode}
                    onChange={(e) => setUdiCode(e.target.value)}
                  />
                </div>

                {/* Primary Category */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary"
                    htmlFor="primary-category"
                  >
                    Primary Instrument Class
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md appearance-none rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high pr-9"
                      id="primary-category"
                      value={primaryCategory}
                      onChange={(e) => setPrimaryCategory(e.target.value)}
                    >
                      <option>Surgical Instruments (General)</option>
                      <option>Cardiovascular &amp; Thoracic</option>
                      <option>Orthopedic Implant &amp; Power</option>
                      <option>Neurosurgery Micro-devices</option>
                      <option>Ophthalmic Micro-Scissors</option>
                      <option>Dental &amp; Maxillofacial</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Secondary Category */}
                <div className="flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary"
                    htmlFor="secondary-category"
                  >
                    Sub-Category / Family
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md appearance-none rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high pr-9"
                      id="secondary-category"
                      value={secondaryCategory}
                      onChange={(e) => setSecondaryCategory(e.target.value)}
                    >
                      <option>Dissecting &amp; Cutting Scissors</option>
                      <option>Haemostatic Clamps &amp; Forceps</option>
                      <option>Needle Holders &amp; Suture Passers</option>
                      <option>Tissue Retractors &amp; Specula</option>
                      <option>Bone Rongeurs &amp; Cutters</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label
                    className="font-body-strong text-body-strong text-primary flex items-center justify-between"
                    htmlFor="short-desc"
                  >
                    <span>Short Summary (E-Commerce Snippet)</span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Max 160 chars
                    </span>
                  </label>
                  <textarea
                    className="w-full p-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="short-desc"
                    rows={2}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="Brief high-level clinical overview..."
                  />
                </div>

                {/* Clinical Description */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary flex items-center justify-between">
                    <span>Clinical &amp; Technical Description</span>
                    <span className="font-caption text-caption text-secondary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Rich Text Active
                    </span>
                  </label>
                  <div className="flex flex-col rounded-lg bg-surface-container-low shadow-sm overflow-hidden border border-surface-container-high">
                    <div className="flex items-center flex-wrap gap-1 p-2 bg-surface-container border-b border-surface-container-high text-on-surface-variant">
                      <button
                        className="p-1.5 rounded hover:bg-surface-container-highest transition-colors"
                        title="Bold"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-surface-container-highest transition-colors"
                        title="Italic"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-surface-container-highest transition-colors"
                        title="Underline"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_underlined
                        </span>
                      </button>
                      <div className="h-4 w-px bg-surface-container-highest mx-1"></div>
                      <button
                        className="p-1.5 rounded hover:bg-surface-container-highest transition-colors"
                        title="Bullet List"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_list_bulleted
                        </span>
                      </button>
                      <button
                        className="p-1.5 rounded hover:bg-surface-container-highest transition-colors"
                        title="Numbered List"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_list_numbered
                        </span>
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      className="w-full p-space-md bg-surface-container-lowest text-on-surface font-body-default text-body-default focus:outline-none resize-y"
                      value={clinicalDesc}
                      onChange={(e) => setClinicalDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Metallurgical & Technical Specs */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      precision_manufacturing
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary">
                      Technical &amp; Metallurgical Specifications
                    </h2>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Material traceability and engineering tolerances
                    </p>
                  </div>
                </div>
                <span className="text-caption font-caption-bold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed">
                  ISO 13485 Cleared
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Operating Length */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="op-length">
                    Operating Length
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                      id="op-length"
                      type="text"
                      value={opLength}
                      onChange={(e) => setOpLength(e.target.value)}
                    />
                    <span className="absolute right-3 top-3 text-caption text-on-surface-variant font-mono">
                      Metric/Imp
                    </span>
                  </div>
                </div>

                {/* Steel Alloy Dropdown */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="alloy-type">
                    Steel Alloy Formulation
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md appearance-none rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high pr-9"
                      id="alloy-type"
                      value={alloyType}
                      onChange={(e) => setAlloyType(e.target.value)}
                    >
                      <option>AISI 420B Martensitic + Tungsten Carbide (TC)</option>
                      <option>AISI 410 Surgical Grade Stainless Steel</option>
                      <option>AISI 316L Austenitic Implant Steel</option>
                      <option>Titanium Grade 5 (Ti-6Al-4V)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Rockwell Hardness */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="hrc-rating">
                    Rockwell Hardness (HRC)
                  </label>
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="hrc-rating"
                    type="text"
                    value={hrcRating}
                    onChange={(e) => setHrcRating(e.target.value)}
                  />
                </div>

                {/* Surface Passivation */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="passivation">
                    Surface Passivation Standard
                  </label>
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="passivation"
                    type="text"
                    value={passivation}
                    onChange={(e) => setPassivation(e.target.value)}
                  />
                </div>

                {/* Tip Configuration */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="tip-config">
                    Tip Configuration / Profile
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md appearance-none rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high pr-9"
                      id="tip-config"
                      value={tipConfig}
                      onChange={(e) => setTipConfig(e.target.value)}
                    >
                      <option>Curved Blades / Blunt-Blunt (Standard)</option>
                      <option>Straight Blades / Blunt-Blunt</option>
                      <option>Curved Blades / Sharp-Blunt</option>
                      <option>Curved Supercut Micro-Serrated</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Autoclave Rating */}
                <div className="flex flex-col gap-1">
                  <label className="font-body-strong text-body-strong text-primary" htmlFor="autoclave-temp">
                    Autoclave Sterilization Rating
                  </label>
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
                    id="autoclave-temp"
                    type="text"
                    value={autoclaveRating}
                    onChange={(e) => setAutoclaveRating(e.target.value)}
                  />
                </div>
              </div>

              {/* Sparkline Compliance Strip */}
              <div className="mt-space-sm p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container-high">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    troubleshoot
                  </span>
                  <div>
                    <p className="font-button-text text-button-text text-primary">
                      Lot Hardness Variance Threshold
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Validated against DIN EN ISO 7153-1 continuous batch test
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md">
                  <div className="h-9 w-36 flex items-center">
                    <svg className="w-full h-full text-secondary" fill="none" viewBox="0 0 144 36">
                      <path
                        d="M2 18 L24 22 L48 10 L72 16 L96 8 L120 14 L142 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                      />
                      <circle cx="142" cy="12" fill="currentColor" r="3" />
                    </svg>
                  </div>
                  <span className="text-caption-bold font-caption-bold text-on-secondary-container bg-secondary-container px-2 py-1 rounded">
                    ±0.4 HRC Tolerable
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 30% RIGHT METADATA & MEDIA COLUMN (4 Cols) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-space-xl">
            {/* CARD A: Publication Status & Catalog Visibility */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Catalog Visibility
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-caption-bold text-on-secondary-fixed bg-secondary-container px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Live Synced
                </span>
              </div>

              {/* Status Segmented Toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="font-caption-bold text-caption-bold text-on-surface-variant uppercase tracking-wider">
                  Publish State
                </label>
                <div className="grid grid-cols-2 p-1 rounded-lg bg-surface-container gap-1">
                  <button
                    type="button"
                    onClick={() => setPublishStatus('published')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-button-text font-button-text transition-all ${
                      publishStatus === 'published'
                        ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      verified
                    </span>
                    <span>Published</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPublishStatus('draft')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-button-text font-button-text transition-all ${
                      publishStatus === 'draft'
                        ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>Draft</span>
                  </button>
                </div>
              </div>

              {/* Feature in Mega Menu Checkbox */}
              <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors border border-surface-container-high">
                <input
                  checked={featureInMegaMenu}
                  onChange={(e) => setFeatureInMegaMenu(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-primary focus:ring-secondary accent-primary"
                  type="checkbox"
                />
                <div className="flex flex-col">
                  <span className="font-body-strong text-body-strong text-primary">
                    Feature in Mega-Menu
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Elevate in global navigation surgical instruments showcase
                  </span>
                </div>
              </label>

              {/* Verified Regulatory Seal */}
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high/60">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-button-text text-button-text text-primary">
                    DIN EN ISO 7153-1 Verified
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Passes corrosion copper-sulfate boil assay
                  </span>
                </div>
              </div>
            </div>

            {/* CARD B: Primary Isolated Product Image */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Primary Instrument Photo
                </h3>
                <span className="font-caption text-caption text-secondary">Key Visual</span>
              </div>

              <div className="relative w-full aspect-video rounded-xl bg-surface-container-low overflow-hidden group shadow-sm flex items-center justify-center border border-surface-container-high">
                {primaryImage ? (
                  <img
                    className="w-full h-full object-cover"
                    src={primaryImage}
                    alt="Primary Instrument Studio Cutout"
                  />
                ) : (
                  <div className="text-center p-4 text-on-surface-variant">
                    <span className="material-symbols-outlined text-3xl">image</span>
                    <p className="text-xs mt-1">No Image Selected</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-space-sm">
                  <button
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-button-text text-button-text shadow-md hover:bg-surface-container-low transition-colors flex items-center gap-1"
                    type="button"
                    onClick={() => {
                      const url = prompt('Enter new image URL:');
                      if (url) setPrimaryImage(url);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">change_circle</span>
                    <span>Replace</span>
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg bg-error text-on-error font-button-text text-button-text shadow-md hover:opacity-90 transition-opacity flex items-center gap-1"
                    type="button"
                    onClick={() => setPrimaryImage('')}
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="font-caption-bold text-caption-bold text-on-surface">
                  Asset Guidelines
                </p>
                <p className="font-caption text-caption text-on-surface-variant">
                  High-resolution PNG or TIFF on pure white background (#FFFFFF) or stainless surgical tray. Min. 1600 × 1200px.
                </p>
              </div>

              <button
                className="w-full h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary font-button-text text-button-text flex items-center justify-center gap-2 transition-colors border border-surface-container-high"
                type="button"
                onClick={() => {
                  const url = prompt('Enter product master shot URL:');
                  if (url) setPrimaryImage(url);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Upload New Master Shot</span>
              </button>
            </div>

            {/* CARD C: Detail Angles & Macro Views */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-surface-container-high">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Detail Angles &amp; Macro Views
                </h3>
                <span className="font-caption text-caption text-on-surface-variant">4 / 4 Slots</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                {/* Slot 1: Jaws */}
                <div className="relative flex flex-col gap-1 group">
                  <div className="aspect-square rounded-lg bg-surface-container overflow-hidden shadow-sm flex items-center justify-center border border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeyH_gLnbNXoixJFDFdZRGLCgbnngfZeppv2FcxByCs_gdMcmqCCEna1eJ03HieJWBus6ZFIR14R7uZ6G2YUNAvL_GK5LQpxiLo6oFbP1KnQPJA3rnRLqOAMudOvPA4jyPy4iNXv1uwMw3pbLTzdMYRWnb4GftfYDEFOoBoTFdLa41IGzuvmsVB_Z4Y9thb8pYjWofQ_JBZV_RT3hiFTpEvy87iMGWeHS19PSeXEg"
                      alt="Jaws TC Insert"
                    />
                  </div>
                  <span className="font-caption-bold text-[11px] text-center text-on-surface-variant truncate">
                    1. Jaws TC Insert
                  </span>
                </div>

                {/* Slot 2: Boxlock */}
                <div className="relative flex flex-col gap-1 group">
                  <div className="aspect-square rounded-lg bg-surface-container overflow-hidden shadow-sm flex items-center justify-center border border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBDh6DoNV2ax5y9yYe-FmukwVwe5WBQfnmECJEZ8hT3Rt8z8dMoh20SpPmCpvPFT5sVk-g4yXQA4UNG4JLeCjKPnWu0NR-yKkNtcCzthRYhAkhG-rkqCCIjmtVFXQwSEE0PJAG6mqeSnwBIt25TBfdRIF9gbWYeFjJHuUB3XiiGKz2ph0WHSwjRhyHLUcYNGiOx3OlPTRhRwp5TAzgSEr1jEK_kA69xHtpjT1SLYU"
                      alt="Screw Boxlock"
                    />
                  </div>
                  <span className="font-caption-bold text-[11px] text-center text-on-surface-variant truncate">
                    2. Screw Boxlock
                  </span>
                </div>

                {/* Slot 3: Gold Rings */}
                <div className="relative flex flex-col gap-1 group">
                  <div className="aspect-square rounded-lg bg-surface-container overflow-hidden shadow-sm flex items-center justify-center border border-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASK0fOCQyixLuWwgoTkfQ3PFdvdjQapLTrGXDBd2XLdafcWk4esdyhcNS8ejirTEWQw3xIgaVekCWvKRsb7J_6kh02kPqHn14rwg49uEGTaSRPoHcTh33I0LC1zuYFIchbfVmktrC-kqwRMh3RDTkhIQB6takWJhrCZnJoSsU5V3qpDi4W2cJMdWfEilwGf225eSap5ViZfG5mJKy006lWvHEiKFyaDnubo1JJiQg"
                      alt="Gold Ring TC ID"
                    />
                  </div>
                  <span className="font-caption-bold text-[11px] text-center text-on-surface-variant truncate">
                    3. Gold Ring TC ID
                  </span>
                </div>

                {/* Slot 4: Scale Measurement */}
                <div className="relative flex flex-col gap-1 group">
                  <div className="aspect-square rounded-lg bg-surface-container-low overflow-hidden shadow-sm flex flex-col items-center justify-center border-dashed border-2 border-surface-container-high cursor-pointer hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-secondary text-[24px]">
                      straighten
                    </span>
                    <span className="font-caption text-[11px] text-on-surface-variant mt-1">
                      Scale Angle
                    </span>
                  </div>
                  <span className="font-caption text-[11px] text-center text-on-surface-variant truncate">
                    4. Metric Ruler View
                  </span>
                </div>
              </div>
            </div>

            {/* CARD D: Danger Zone */}
            {isEditMode && (
              <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-sm border border-error/30">
                <div className="flex items-center gap-space-xs text-error">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                  <h4 className="font-headline-sm text-headline-sm text-error">Danger Zone</h4>
                </div>
                <p className="font-caption text-caption text-on-surface-variant">
                  Removing this instrument will permanently unbind all regulatory batch traceability records and UDI barcodes from customer catalogs.
                </p>
                <button
                  className="mt-2 w-full py-2 px-space-md rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-button-text text-button-text transition-colors flex items-center justify-center gap-2"
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this product from the catalog?')) {
                      navigate('/admin/products');
                    }
                  }}
                >
                  <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                  <span>Delete Product from Catalog</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
