export const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC5GE0pIHRcd-I0Ld_2oFt2DbcTJFLMvp5T_G1dd3BkFSiIqmSFwjq0ClKlzDVI2T0KOYcPg6ShL8W-7oPTil_wX8fVf2_Nt0q8WwhaTYbJs0Eu6mfpoQO9bVQ2eybR3968Ogn6A-eOIkBWQo8OBhKZ9isEEGFzNbr5_jXEcxTO_PTTzuARzFbyMGLMM0TJ8ZMTu-btkud8aMwa2klvvF-RsmH_wMF_Fdk9OVCTAF3I";

export interface CategoryCard {
  id: string;
  slug: string;
  title: string;
  disciplineNumber: string;
  toolsCount: string;
  description: string;
  icon: string;
}

export const VANGUARD_DISCIPLINES: CategoryCard[] = [
  {
    id: "general-surgery",
    slug: "General Surgery",
    title: "General Surgery",
    disciplineNumber: "Discipline 01",
    toolsCount: "184 Tools",
    description: "Scalpels, surgical scissors, dressing forceps, suction tubes, and tissue probes.",
    icon: "healing",
  },
  {
    id: "scissors-cutting",
    slug: "Scissors & Cutting",
    title: "Scissors & Cutting",
    disciplineNumber: "Discipline 02",
    toolsCount: "240 Tools",
    description: "Metzenbaum, Mayo, Iris, Stevens tenotomy, and SuperCut tungsten-carbide inserts.",
    icon: "content_cut",
  },
  {
    id: "forceps-clamps",
    slug: "Forceps & Clamps",
    title: "Forceps & Clamps",
    disciplineNumber: "Discipline 03",
    toolsCount: "312 Tools",
    description: "Adson tissue forceps, DeBakey atraumatic vascular clamps, and Rochester-Pean clamps.",
    icon: "hardware",
  },
  {
    id: "needle-holders",
    slug: "Needle Holders",
    title: "Needle Holders",
    disciplineNumber: "Discipline 04",
    toolsCount: "156 Tools",
    description: "Castroviejo microsurgical, Mayo-Hegar, Mathieu, and titanium cross-serrated tips.",
    icon: "handyman",
  },
  {
    id: "retractors-specula",
    slug: "Retractors & Specula",
    title: "Retractors & Specula",
    disciplineNumber: "Discipline 05",
    toolsCount: "190 Tools",
    description: "Weitlaner, Gelpi, Balfour abdominal self-retaining systems, and Langenbeck blades.",
    icon: "open_in_full",
  },
  {
    id: "orthopedic-suite",
    slug: "Orthopedic Suite",
    title: "Orthopedic Suite",
    disciplineNumber: "Discipline 06",
    toolsCount: "215 Tools",
    description: "Kerrison bone rongeurs, Stille osteotomes, bone holding forceps, and wire cutters.",
    icon: "orthopedics",
  },
  {
    id: "ent-otology",
    slug: "ENT & Otology",
    title: "ENT & Otology",
    disciplineNumber: "Discipline 07",
    toolsCount: "132 Tools",
    description: "Hartmann nasal forceps, micro-ear curettes, adenoid curettes, and micro laryngeal picks.",
    icon: "hearing",
  },
  {
    id: "gynecology-ob",
    slug: "Gynecology & OB",
    title: "Gynecology & OB",
    disciplineNumber: "Discipline 08",
    toolsCount: "118 Tools",
    description: "Graves vaginal specula, Pozzi tenaculum forceps, Sims uterine sounds, and biopsy punches.",
    icon: "pregnant_woman",
  },
  {
    id: "dental-maxillofacial",
    slug: "Dental & Maxillofacial",
    title: "Dental & Maxillofacial",
    disciplineNumber: "Discipline 09",
    toolsCount: "164 Tools",
    description: "Root elevators, anatomical extraction forceps, periosteal elevators, and bone files.",
    icon: "dentistry",
  },
  {
    id: "diagnostic-micro",
    slug: "Diagnostic & Micro",
    title: "Diagnostic & Micro",
    disciplineNumber: "Discipline 10",
    toolsCount: "140 Tools",
    description: "Ophthalmic forceps, neurosurgical micro-tweezers, tuning forks, and neurological hammers.",
    icon: "biotech",
  },
];

export interface FlagshipProduct {
  ref: string;
  badge: string;
  badgeType: "tc" | "atraumatic" | "retaining" | "default";
  category: string;
  title: string;
  description: string;
  length: string;
  specA: { label: string; value: string };
  specB: { label: string; value: string };
  image: string;
  imageAlt: string;
}

export const VANGUARD_FLAGSHIPS: FlagshipProduct[] = [
  {
    ref: "REF: VSP-2044-TC",
    badge: "Tungsten Carbide",
    badgeType: "tc",
    category: "General & Plastic Surgery",
    title: "Metzenbaum-Fino Dissecting Scissors",
    description: "Curved delicate blades with welded TC inserts. Gold-anodized rings denote extended blade sharpness cycle.",
    length: '180 mm (7")',
    specA: { label: "Blade Geometry", value: "Curved / Delicate" },
    specB: { label: "Steel Spec", value: "DIN 1.4117 / TC Core" },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMEPe47Q6-pibvBXg91nKFu-d67Chfa7gPew_ggl3e9GCUS9VlEAKqZniFTr7VEdW2UGdQ1uX14MyRPW0n93RBautAO_hLb4VQtmNcUPxou20wakg4ZhDZQR0lr7ILIaIfyM2MCKsDMjW4iNRndaP3H3r0a_UpRglU8Sd7merQvRTpAbgkBVToDx0BIs-AEYeKcJI3yX8rvPRgCD4tDex95E_jmeRDquntHgbe2jJu",
    imageAlt: "Technical studio photo of Metzenbaum-Fino curved dissecting surgical scissors with gold-plated ring handles indicating tungsten carbide inserts.",
  },
  {
    ref: "REF: VSP-1190-DB",
    badge: "Atraumatic",
    badgeType: "atraumatic",
    category: "Cardiovascular & Thoracic",
    title: "DeBakey Atraumatic Vascular Forceps",
    description: "Specially profiled longitudinal serrations preserve vascular intima while delivering calibrated grip without slip.",
    length: '200 mm (8")',
    specA: { label: "Tip Dimension", value: "1.5 mm Atraumatic" },
    specB: { label: "Finish", value: "Anti-Glare Satin Glass" },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBee0wrYArpd5TDpZeBIpXJOpIzYcJn_voHxtKf6njGNwDZeoARwZJhesUyMb1D9t5HJpyypLSnzBtnHhngGDS--Tl0Mml08DqO4gGyc0l0nVam5rebdtdK7h_aHkm43-cChqO27N7yYM9hAsqEwClK79FnDx_QkO32rSbyXhNwU__oI4uhDtGKstbkLOx44PE8Z6zorSJ0XUODTsuvzzRxZ2qkY_gdjaAS71-vcNo-",
    imageAlt: "Medical catalog photograph of DeBakey atraumatic vascular forceps with micro-ribbed non-crushing jaw teeth.",
  },
  {
    ref: "REF: VSP-3312-CW",
    badge: "0.4mm Pitch TC",
    badgeType: "tc",
    category: "Microsurgery & General",
    title: "Crile-Wood TC Needle Holder",
    description: "Cross-serrated pyramid carbide teeth designed for suture sizes 4-0 through 6-0. Multi-tooth stepped locking ratchet.",
    length: '150 mm (6")',
    specA: { label: "Jaw Insert", value: "TC 0.4mm Pyramid" },
    specB: { label: "Box Lock", value: "Precision Fit Pivot" },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGYwn4hERQD-YU4G4Q-U9Ia8Isluzt_OsBDAFLRj2vGJpJEVX2MGJMm_NvkuZBnbOF_kzqoloHDYf8_VQr9metXnLJOLSAoOD4UdZ6qfJnhiVqQO9gb8ptD8IhIipeWNhJRz_JawawKp0pUu4laa9nja19VekcR2bQcz7aD0Do8swrsnTzUnAALFTT36Oo87MU43llQNh2L9oILun_dLKPzJnfMREaQFrZ4kAjOJxy",
    imageAlt: "Detailed product studio capture of Crile-Wood Needle Holder with Tungsten Carbide cross-serrated inserts and precision box lock hinge.",
  },
  {
    ref: "REF: VSP-4820-WL",
    badge: "Self-Retaining",
    badgeType: "retaining",
    category: "Orthopedic & Spine",
    title: "Weitlaner Self-Retaining Retractor",
    description: "3x4 sharp curved prongs with hardened cam-lock ratchet to stabilize deep orthopedic incision exposures.",
    length: '165 mm (6.5")',
    specA: { label: "Prong Setup", value: "3 x 4 Sharp Prongs" },
    specB: { label: "Ratchet Type", value: "Cam-Lock Quick Release" },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRxzVnbmRaO6EUORXeV0oCXcBbBUiafDO9yZbpzXzi40_7D5gSKPmDLuOSBcsfI-yjLDbE9jUKJhS-YM5_KhjrM_TuyuuYfM5wHmIj9yqvUgD6-yT_4SUWTpjZ2EfMKXybvbf6dBCkRzs6ItVVPE7OR-L9xNfJdUuqeMmhbkPIxse8xdOHAs-Zz6of2NvlsPqwzTXph0TPQkWvFX0bKfuX0YAnx8npYGDswolTfSFT",
    imageAlt: "Orthopedic and spinal surgical retractor Weitlaner self-retaining model with 3x4 sharp interlocking prongs and cam-lock mechanism.",
  },
];

export interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  title?: string;
  ref?: string;
  alloy?: string;
  categoryTags?: string[];
  discipline: string;
  subCategory?: string;
  description: string;
  length: string;
  jawProfile: string;
  material: string;
  finish: string;
  norm: string;
  image: string;
  imageAlt: string;
  tag?: string;
}

export const SPECIMEN_VIEWS = [
  { label: 'Primary Lateral View', sub: 'Elevation & Axis View', alt: 'Lateral profile view', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0' },
  { label: 'Tip & Jaw Micro-Geometry', sub: '70 HRC Tungsten Carbide', alt: 'Tip macro shot', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF0vV_G8q3rG3h37VwM0X-8p753o9W-M_g4XN9aZlhEw5Z2qY2k-0aV5w9G4sF1a94s3e2d-3q0eF2s-6a4eF2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7q8w9e0r1t2y3u4i5o6p' },
  { label: 'Ratchet Box Lock Tension', sub: 'Calibrated Hinge Action', alt: 'Hinge box lock', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBee0wrYArpd5TDpZeBIpXJOpIzYcJn_voHxtKf6njGNwDZeoARwZJhesUyMb1D9t5HJpyypLSnzBtnHhngGDS--Tl0Mml08DqO4gGyc0l0nVam5rebdtdK7h_aHkm43-cChqO27N7yYM9hAsqEwClK79FnDx_QkO32rSbyXhNwU__oI4uhDtGKstbkLOx44PE8Z6zorSJ0XUODTsuvzzRxZ2qkY_gdjaAS71-vcNo-' }
];

export const PRIMARY_DETAIL_HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0';

export const VANGUARD_CATALOG: CatalogItem[] = [
  {
    id: "VSP-2044-TC",
    sku: "VSP-2044-TC",
    ref: "VSP-2044-TC",
    name: "Metzenbaum-Fino Dissecting Scissors (Curved)",
    title: "Metzenbaum-Fino Dissecting Scissors (Curved)",
    alloy: "German DIN 1.4117 Cryogenic Martensitic",
    categoryTags: ["Dissecting", "Curved", "Tungsten Carbide", "Cardiovascular"],
    discipline: "Scissors & Cutting",
    subCategory: "Dissecting Scissors",
    description: "Engineered with vacuum-brazed micro-grain Tungsten Carbide inserts and precision micro-serrated counter-blade. Eliminates anatomical tissue slippage during delicate cardiovascular, plastic, and thoracic micro-dissection.",
    length: '180 mm (7")',
    jawProfile: "Curved / Micro-Fino Tip",
    material: "German DIN 1.4117 (Cryogenic)",
    finish: "Electrolytic Satin Bead-Blast (<3.2% Gloss)",
    norm: "DIN 58298 / ISO 7153-1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0",
    imageAlt: "Technical macro product studio photography of Metzenbaum-Fino curved dissecting scissors with gold-plated finger rings.",
    tag: "Tungsten Carbide",
  },
  {
    id: "VSP-1190-DB",
    sku: "VSP-1190-DB",
    name: "DeBakey Atraumatic Vascular Forceps",
    discipline: "Forceps & Clamps",
    subCategory: "Vascular Forceps",
    description: "Patented non-crushing 1x2 serrated longitudinal ribbing for delicate vascular wall manipulation.",
    length: '200 mm (8")',
    jawProfile: "1.5 mm Atraumatic",
    material: "AISI 420 Stainless",
    finish: "Satin Bead-Blast",
    norm: "DIN 58299",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJHSpcCHY_Y0vGVkJ_7wPmycJoYw_u9nQzJ0D-jC2ad8J5GSbN2ZmXD0xHG5REj16yZ-3naO9u26HTJnRNevZ0csvQicf8y-5NPrH_olWpKVROAV11_-vQg7ba0nESr22TiEJHBHBKe5OlrgjjOortyEbwhE4TqDLwu-eDkWYgk7PZhVG06Ktu3FLJbbdf1q37wCevEUPU_Fl_ghwc0p9wfJU-fi4a4P4_0z_xNiMt",
    imageAlt: "Studio technical product photography of DeBakey Atraumatic Vascular Dissecting Forceps.",
    tag: "Atraumatic",
  },
  {
    id: "VSP-3312-CW",
    sku: "VSP-3312-CW",
    name: "Castroviejo Micro Needle Holder",
    discipline: "Needle Holders",
    subCategory: "Micro Needle Holders",
    description: "Engineered with smooth spring handle, ultra-delicate catch lock, and 0.4mm micro-pyramid TC jaw inserts.",
    length: '140 mm (5½")',
    jawProfile: "Micro Ratchet Catch",
    material: "DIN 1.4116 / 70 HRC TC",
    finish: "Anti-Glare Satin",
    norm: "DIN 58298",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_icq1eyo0AdENzMR5qAJ2hten8ltWDkw5o9zOBx-e6rU4CLnOHm9pvZbuXAAv_Gk_Ml_i9EgfWoVHu3oN4PpOl4RACzMI5zEYUHpAzs9R7BIHYCPkFfbLq3PJ9ikV7RJXkkcAXRDcBWKSF_oJtW7SEBJ76Wp-1CFD4r-FnlhotS5b2r7JhbuFxhwqzXSygn4GurHnnTEYrShPoc2So9DaccQdOm9ZpPugEkaQkhGB",
    imageAlt: "Macro product photo of Castroviejo Micro Needle Holder with spring catch lock and diamond-cut Tungsten Carbide jaws.",
    tag: "TC Micro",
  },
  {
    id: "VSP-4528-WL",
    sku: "VSP-4528-WL",
    name: "Weitlaner Self-Retaining Retractor",
    discipline: "Retractors & Specula",
    subCategory: "Self-Retaining",
    description: "Equipped with calibrated cam-lock ratchet bar for gradual, stable wound margin retraction.",
    length: '165 mm (6½")',
    jawProfile: "3x4 Sharp Prongs",
    material: "DIN 1.4021 Stainless",
    finish: "Matte Bead-Blast",
    norm: "DIN 58301",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmPdaCmpOUyFSM8vVfQUTPpsB5Is4QXBHVFk6EnG2WBcpxKFbywRJeERWPChpnENH7mxhg3aW0WpClF5N5PVJgxFzul4rz7UUrtqu_24xBTzJc-vPfdfel1HMNVDeJDNH8x1s8iIQkFN1C8rP3SWOUCTh0JA3lupfntz-ZcXmz32A54_q-xFNhvBN04oYlAylTtdRRdyHyK1pKipa1ng6QuCmaK_dg_yvdQP474PXX",
    imageAlt: "Engineering product photography of Weitlaner Self-Retaining Retractor with 3x4 sharp curved prongs.",
    tag: "Self-Retaining",
  },
  {
    id: "VSP-5120-KR",
    sku: "VSP-5120-KR",
    name: "Kerrison Bone Rongeur 40° Up-Biting",
    discipline: "Orthopedic Suite",
    subCategory: "Bone Rongeurs",
    description: "Thin footplate design with micro-polished ejector channel, titanium carbon-nitride coating for spinal laminectomy.",
    length: '200 mm (8")',
    jawProfile: "3.0 mm 40° Up-Biting",
    material: "German High-Carbon 1.4125",
    finish: "Ceramic DLC Black / Satin",
    norm: "ISO 7153-1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRxzVnbmRaO6EUORXeV0oCXcBbBUiafDO9yZbpzXzi40_7D5gSKPmDLuOSBcsfI-yjLDbE9jUKJhS-YM5_KhjrM_TuyuuYfM5wHmIj9yqvUgD6-yT_4SUWTpjZ2EfMKXybvbf6dBCkRzs6ItVVPE7OR-L9xNfJdUuqeMmhbkPIxse8xdOHAs-Zz6of2NvlsPqwzTXph0TPQkWvFX0bKfuX0YAnx8npYGDswolTfSFT",
    imageAlt: "Kerrison bone rongeur 40 degree up-biting with ejector slide.",
    tag: "DLC Ceramic",
  },
  {
    id: "VSP-1840-MY",
    sku: "VSP-1840-MY",
    name: "Mayo Stille Dissecting Scissors",
    discipline: "Scissors & Cutting",
    subCategory: "Operating Scissors",
    description: "Beveled cutting edges with rounded blunt tips for heavy fascia and tendon dissection without tissue snags.",
    length: '170 mm (6¾")',
    jawProfile: "Straight Heavy Blades",
    material: "Martensitic DIN 1.4021",
    finish: "Electropolished Satin",
    norm: "DIN 58298",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMEPe47Q6-pibvBXg91nKFu-d67Chfa7gPew_ggl3e9GCUS9VlEAKqZniFTr7VEdW2UGdQ1uX14MyRPW0n93RBautAO_hLb4VQtmNcUPxou20wakg4ZhDZQR0lr7ILIaIfyM2MCKsDMjW4iNRndaP3H3r0a_UpRglU8Sd7merQvRTpAbgkBVToDx0BIs-AEYeKcJI3yX8rvPRgCD4tDex95E_jmeRDquntHgbe2jJu",
    imageAlt: "Mayo Stille dissecting scissors straight heavy blades.",
    tag: "Fascia Cut",
  },
  {
    id: "VSP-2910-AD",
    sku: "VSP-2910-AD",
    name: "Adson-Brown Micro Tissue Forceps",
    discipline: "Forceps & Clamps",
    subCategory: "Micro Forceps",
    description: "7x7 micro-interlocking atraumatic teeth designed for precise plastic and micro-vascular tissue repositioning.",
    length: '120 mm (4¾")',
    jawProfile: "7x7 Micro Teeth",
    material: "AISI 420 Stainless",
    finish: "Satin Glass Bead",
    norm: "DIN 58299",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBee0wrYArpd5TDpZeBIpXJOpIzYcJn_voHxtKf6njGNwDZeoARwZJhesUyMb1D9t5HJpyypLSnzBtnHhngGDS--Tl0Mml08DqO4gGyc0l0nVam5rebdtdK7h_aHkm43-cChqO27N7yYM9hAsqEwClK79FnDx_QkO32rSbyXhNwU__oI4uhDtGKstbkLOx44PE8Z6zorSJ0XUODTsuvzzRxZ2qkY_gdjaAS71-vcNo-",
    imageAlt: "Adson-Brown micro tissue forceps 7x7 micro teeth.",
    tag: "Micro Teeth",
  },
  {
    id: "VSP-6200-BL",
    sku: "VSP-6200-BL",
    name: "Balfour Abdominal Retractor System",
    discipline: "Retractors & Specula",
    subCategory: "Abdominal Retractors",
    description: "Self-retaining stainless frame with interchangeable lateral blades and deep central suprapubic blade.",
    length: "Spread up to 180 mm",
    jawProfile: "Interchangeable 70mm Blades",
    material: "AISI 316 / 420 Spec",
    finish: "High-Resistance Satin",
    norm: "DIN 58301",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmPdaCmpOUyFSM8vVfQUTPpsB5Is4QXBHVFk6EnG2WBcpxKFbywRJeERWPChpnENH7mxhg3aW0WpClF5N5PVJgxFzul4rz7UUrtqu_24xBTzJc-vPfdfel1HMNVDeJDNH8x1s8iIQkFN1C8rP3SWOUCTh0JA3lupfntz-ZcXmz32A54_q-xFNhvBN04oYlAylTtdRRdyHyK1pKipa1ng6QuCmaK_dg_yvdQP474PXX",
    imageAlt: "Balfour abdominal retractor system with adjustable frame.",
    tag: "Abdominal Suite",
  },
];

export const CATALOGUE_PRODUCTS = VANGUARD_CATALOG;

