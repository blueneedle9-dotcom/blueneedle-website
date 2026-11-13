// ============================================================================
// VANGUARD / BLUENEEDLE SURGICAL CATALOG (100% Verified Local Assets & DB Data)
// ============================================================================

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
    id: "forceps-clamps",
    slug: "Forceps & Clamps",
    title: "Forceps & Clamps",
    disciplineNumber: "Discipline 01",
    toolsCount: "312 Tools",
    description: "Kelly, Mosquito, Adson tissue, DeBakey atraumatic vascular, and Rochester-Pean clamps.",
    icon: "hardware",
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
    id: "needle-holders",
    slug: "Needle Holders",
    title: "Needle Holders",
    disciplineNumber: "Discipline 03",
    toolsCount: "156 Tools",
    description: "Castroviejo microsurgical, Mayo-Hegar, Mathieu, and titanium cross-serrated tips.",
    icon: "handyman",
  },
  {
    id: "retractors-specula",
    slug: "Retractors & Specula",
    title: "Retractors & Specula",
    disciplineNumber: "Discipline 04",
    toolsCount: "190 Tools",
    description: "Weitlaner, Gelpi, Balfour abdominal self-retaining systems, and Langenbeck blades.",
    icon: "open_in_full",
  },
  {
    id: "orthopedic-suite",
    slug: "Orthopedic Suite",
    title: "Orthopedic Suite",
    disciplineNumber: "Discipline 05",
    toolsCount: "215 Tools",
    description: "Kerrison bone rongeurs, Stille osteotomes, bone holding forceps, and wire cutters.",
    icon: "orthopedics",
  },
  {
    id: "dental-maxillofacial",
    slug: "Dental & Maxillofacial",
    title: "Dental & Maxillofacial",
    disciplineNumber: "Discipline 06",
    toolsCount: "164 Tools",
    description: "Root elevators, anatomical extraction forceps, periosteal elevators, and bone files.",
    icon: "dentistry",
  },
  {
    id: "general-surgery",
    slug: "General Surgery",
    title: "General Surgery",
    disciplineNumber: "Discipline 07",
    toolsCount: "184 Tools",
    description: "Scalpels, surgical scissors, dressing forceps, suction tubes, and tissue probes.",
    icon: "healing",
  },
  {
    id: "ent-otology",
    slug: "ENT & Otology",
    title: "ENT & Otology",
    disciplineNumber: "Discipline 08",
    toolsCount: "132 Tools",
    description: "Hartmann nasal forceps, micro-ear curettes, adenoid curettes, and micro laryngeal picks.",
    icon: "hearing",
  },
  {
    id: "gynecology-ob",
    slug: "Gynecology & OB",
    title: "Gynecology & OB",
    disciplineNumber: "Discipline 09",
    toolsCount: "118 Tools",
    description: "Graves vaginal specula, Pozzi tenaculum forceps, Sims uterine sounds, and biopsy punches.",
    icon: "pregnant_woman",
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
    ref: "VSP-1044-KS",
    badge: "HEMOSTATIC SPEC",
    badgeType: "default",
    category: "Hemostatic Forceps",
    title: "Kelly Hemostatic Forceps — Straight",
    description:
      "Precision-forged surgical hemostatic clamps with transverse serrated jaws spanning the distal half. Calibrated interlocking box lock maintains continuous arterial occlusion without tissue shear.",
    length: '140 mm (5½") / 160 mm',
    specA: { label: "Metallurgy", value: "German Martensitic DIN 1.4021" },
    specB: { label: "Jaw Config", value: "Transverse Serrated 1/2 Jaw" },
    image: "/images/products/kelly-forceps-straight/01-primary.webp",
    imageAlt: "Kelly Hemostatic Forceps Straight German stainless steel surgical clamp.",
  },
  {
    ref: "VSP-1045-KC",
    badge: "CURVED ARTERIAL",
    badgeType: "default",
    category: "Hemostatic Forceps",
    title: "Kelly Hemostatic Forceps — Curved",
    description:
      "Curved profile engineered for optimal surgical sightlines and vessel clamping in deep operative fields. Multi-step ratchet ring handle enables controlled clamping tension.",
    length: '140 mm (5½") / 160 mm',
    specA: { label: "Curvature Apex", value: "18° Anatomical Radius" },
    specB: { label: "Autoclave Temp", value: "134°C Steam Validated" },
    image: "/images/products/kelly-forceps-curved/01-primary.png",
    imageAlt: "Kelly Curved Hemostatic Forceps with fine curved jaws.",
  },
  {
    ref: "VSP-1190-DB",
    badge: "ATRAUMATIC VASCULAR",
    badgeType: "atraumatic",
    category: "Vascular Instrumentation",
    title: "DeBakey Atraumatic Vascular Forceps",
    description:
      "Patented non-crushing 1x2 serrated longitudinal ribbing engineered for delicate vascular wall manipulation without intimal lining trauma during cardiovascular reconstruction.",
    length: '200 mm (8") Standard',
    specA: { label: "Jaw Geometry", value: "1.5 mm Non-Crushing Ribbed" },
    specB: { label: "Spring Tension", value: "Calibrated 2.2 N Action" },
    image: "/images/products/debakey-atraumatic-forceps/01-primary.png",
    imageAlt: "DeBakey Atraumatic Vascular Dissecting Forceps with non-pinching teeth.",
  },
  {
    ref: "VSP-1025-MS",
    badge: "MICRO-HEMOSTAT",
    badgeType: "default",
    category: "Micro Forceps",
    title: "Halsted Mosquito Forceps — Straight",
    description:
      "Ultra-fine tip profile with full-length delicate transverse serrations designed for precise micro-vessel occlusion and plastic surgery dissection.",
    length: '125 mm (5") Precision',
    specA: { label: "Tip Profile", value: "0.8 mm Micro-Point" },
    specB: { label: "Surface Finish", value: "Satin Anti-Glare (<3.2% Gloss)" },
    image: "/images/products/halsted-mosquito-straight/01-primary.webp",
    imageAlt: "Halsted Mosquito Forceps straight delicate micro tip.",
  },
];

export interface ProductSizeVariation {
  size: string;
  skuSuffix?: string;
  isDefault?: boolean;
}

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
  sizes?: string[]; // Multiple size variations e.g. ["140 mm", "180 mm", "230 mm"]
  sizeVariations?: ProductSizeVariation[];
  jawProfile: string;
  material: string;
  finish: string;
  norm: string;
  image: string;
  images?: string[]; // Multiple product gallery images
  imageAlt: string;
  tag?: string;
}

export const SPECIMEN_VIEWS = [
  { label: 'Primary Lateral View', sub: 'Elevation & Axis View', alt: 'Lateral profile view', image: '/images/products/kelly-forceps-curved/01-primary.png' },
  { label: 'Tip & Jaw Micro-Geometry', sub: 'Transverse Serrations', alt: 'Tip macro shot', image: '/images/products/kelly-forceps-curved/02-jaw.webp' },
  { label: 'Ratchet Box Lock Tension', sub: 'Calibrated Hinge Action', alt: 'Hinge box lock', image: '/images/products/kelly-forceps-curved/04-boxlock.jpg' }
];

export const PRIMARY_DETAIL_HERO_IMAGE = '/images/products/kelly-forceps-curved/01-primary.png';

// ============================================================================
// 10 REAL UPLOADED SURGICAL INSTRUMENTS (Stored in local directory & DB)
// ============================================================================
export const VANGUARD_CATALOG: CatalogItem[] = [
  {
    id: "VSP-1044-KS",
    sku: "VSP-1044-KS",
    ref: "VSP-1044-KS",
    name: "Kelly Hemostatic Forceps — Straight",
    title: "Kelly Hemostatic Forceps — Straight",
    alloy: "German DIN 1.4021 Martensitic Stainless",
    categoryTags: ["Forceps", "Hemostatic", "Arterial Clamps", "General Surgery"],
    discipline: "Forceps & Clamps",
    subCategory: "Hemostatic Forceps",
    description: "Standard straight hemostatic forceps featuring horizontal serrations across the distal half of the jaws. Ideal for clamping larger blood vessels or holding subcutaneous tissue without cutting.",
    length: '140 mm (5½")',
    sizes: ['140 mm (5½")', '160 mm (6¼")'],
    jawProfile: "Straight / Transverse Half-Serrated",
    material: "German DIN 1.4021 (Martensitic)",
    finish: "Electrolytic Satin Bead-Blast (<3.2% Gloss)",
    norm: "DIN 58298 / ISO 7153-1",
    image: "/images/products/kelly-forceps-straight/01-primary.webp",
    images: [
      "/images/products/kelly-forceps-straight/01-primary.webp",
      "/images/products/kelly-forceps-straight/02-jaw.webp",
      "/images/products/kelly-forceps-straight/03-ratchet.jpg"
    ],
    imageAlt: "Kelly Hemostatic Forceps straight profile.",
    tag: "Hemostatic Standard",
  },
  {
    id: "VSP-1045-KC",
    sku: "VSP-1045-KC",
    ref: "VSP-1045-KC",
    name: "Kelly Hemostatic Forceps — Curved",
    title: "Kelly Hemostatic Forceps — Curved",
    alloy: "German DIN 1.4021 Martensitic Stainless",
    categoryTags: ["Forceps", "Hemostatic", "Curved", "General Surgery"],
    discipline: "Forceps & Clamps",
    subCategory: "Hemostatic Forceps",
    description: "Curved distal jaws enable precise clamping of blood vessels in deep operative planes while maintaining clear surgical line of sight.",
    length: '140 mm (5½")',
    sizes: ['140 mm (5½")', '160 mm (6¼")'],
    jawProfile: "Curved 18° / Half-Serrated",
    material: "German DIN 1.4021 (Martensitic)",
    finish: "Electrolytic Satin Bead-Blast",
    norm: "DIN 58298 / ISO 7153-1",
    image: "/images/products/kelly-forceps-curved/01-primary.png",
    images: [
      "/images/products/kelly-forceps-curved/01-primary.png",
      "/images/products/kelly-forceps-curved/02-jaw.webp",
      "/images/products/kelly-forceps-curved/03-profile.webp",
      "/images/products/kelly-forceps-curved/04-boxlock.jpg"
    ],
    imageAlt: "Kelly Hemostatic Forceps curved profile.",
    tag: "Deep Cavity Clamp",
  },
  {
    id: "VSP-1025-MS",
    sku: "VSP-1025-MS",
    ref: "VSP-1025-MS",
    name: "Halsted Mosquito Forceps — Straight",
    title: "Halsted Mosquito Forceps — Straight",
    alloy: "DIN 1.4021 Surgical Stainless",
    categoryTags: ["Micro Forceps", "Mosquito", "Capillary Occlusion"],
    discipline: "Forceps & Clamps",
    subCategory: "Micro Hemostatic Forceps",
    description: "Ultra-fine tipped straight hemostatic forceps engineered for occluding small capillaries and arterioles during plastic, ophthalmic, and pediatric surgeries.",
    length: '125 mm (5")',
    sizes: ['125 mm (5")'],
    jawProfile: "Straight Ultra-Delicate 0.8mm Tip",
    material: "AISI 420 Martensitic",
    finish: "Satin Anti-Glare",
    norm: "DIN 58298 / ISO 7153-1",
    image: "/images/products/halsted-mosquito-straight/01-primary.webp",
    images: [
      "/images/products/halsted-mosquito-straight/01-primary.webp",
      "/images/products/halsted-mosquito-straight/02-jaw.webp",
      "/images/products/halsted-mosquito-straight/03-microtips.jpg"
    ],
    imageAlt: "Halsted Mosquito Forceps straight micro tips.",
    tag: "Micro Capillary",
  },
  {
    id: "VSP-1026-MC",
    sku: "VSP-1026-MC",
    ref: "VSP-1026-MC",
    name: "Halsted Mosquito Forceps — Curved",
    title: "Halsted Mosquito Forceps — Curved",
    alloy: "DIN 1.4021 Surgical Stainless",
    categoryTags: ["Micro Forceps", "Mosquito Curved", "Delicate"],
    discipline: "Forceps & Clamps",
    subCategory: "Micro Hemostatic Forceps",
    description: "Curved micro jaws allow gentle manipulation and secure occlusion of delicate micro-vessels in restricted surgical spaces.",
    length: '125 mm (5")',
    sizes: ['125 mm (5")'],
    jawProfile: "Curved Fine Tip / Full Serration",
    material: "AISI 420 Martensitic",
    finish: "Satin Glass Bead",
    norm: "DIN 58298",
    image: "/images/products/halsted-mosquito-curved/01-primary.png",
    images: [
      "/images/products/halsted-mosquito-curved/01-primary.png",
      "/images/products/halsted-mosquito-curved/02-jaw.png",
      "/images/products/halsted-mosquito-curved/03-micro-curve.jpg"
    ],
    imageAlt: "Halsted Mosquito Forceps curved jaws.",
    tag: "Micro Curved",
  },
  {
    id: "VSP-1012-AD",
    sku: "VSP-1012-AD",
    ref: "VSP-1012-AD",
    name: "Adson Tissue Forceps (1x2 Teeth)",
    title: "Adson Tissue Forceps (1x2 Teeth)",
    alloy: "AISI 420 Martensitic Stainless",
    categoryTags: ["Tissue Forceps", "Adson", "1x2 Teeth", "Plastic Surgery"],
    discipline: "Forceps & Clamps",
    subCategory: "Tissue Grasping Forceps",
    description: "Wide thumb grasp with delicate 1x2 interlocking rat-tooth tips. Provides firm grasp of skin, fascia, and subcutaneous tissue without crush necrosis.",
    length: '120 mm (4¾")',
    sizes: ['120 mm (4¾")', '150 mm (6")'],
    jawProfile: "1x2 Interlocking Teeth",
    material: "German AISI 420 Surgical Alloy",
    finish: "Satin Anti-Glare",
    norm: "DIN 58299 / ISO 7153-1",
    image: "/images/products/adson-tissue-1x2/01-primary.png",
    images: [
      "/images/products/adson-tissue-1x2/01-primary.png",
      "/images/products/adson-tissue-1x2/02-teeth-macro.png",
      "/images/products/adson-tissue-1x2/03-handle.png"
    ],
    imageAlt: "Adson Tissue Forceps 1x2 interlocking teeth.",
    tag: "1x2 Rat Tooth",
  },
  {
    id: "VSP-1014-AB",
    sku: "VSP-1014-AB",
    ref: "VSP-1014-AB",
    name: "Adson-Brown Micro Tissue Forceps (7x7 Teeth)",
    title: "Adson-Brown Micro Tissue Forceps",
    alloy: "AISI 420 Stainless Spec",
    categoryTags: ["Micro Forceps", "Adson-Brown", "7x7 Teeth"],
    discipline: "Forceps & Clamps",
    subCategory: "Atraumatic Micro Forceps",
    description: "Features 7x7 rows of micro-interlocking atraumatic teeth. Distributes holding pressure evenly to prevent punctures in delicate skin flaps and micro-vascular repairs.",
    length: '120 mm (4¾")',
    sizes: ['120 mm (4¾")'],
    jawProfile: "7x7 Micro Atraumatic Teeth",
    material: "German Surgical Stainless",
    finish: "Satin Bead-Blast",
    norm: "DIN 58299",
    image: "/images/products/adson-brown-micro/01-primary.png",
    images: [
      "/images/products/adson-brown-micro/01-primary.png",
      "/images/products/adson-brown-micro/02-micro-teeth.png",
      "/images/products/adson-brown-micro/03-profile.png"
    ],
    imageAlt: "Adson-Brown micro tissue forceps 7x7 teeth.",
    tag: "7x7 Atraumatic",
  },
  {
    id: "VSP-1190-DB",
    sku: "VSP-1190-DB",
    ref: "VSP-1190-DB",
    name: "DeBakey Atraumatic Vascular Forceps",
    title: "DeBakey Atraumatic Vascular Forceps",
    alloy: "AISI 420 Surgical Alloy",
    categoryTags: ["Cardiovascular", "Vascular", "Atraumatic"],
    discipline: "Forceps & Clamps",
    subCategory: "Vascular Forceps",
    description: "Patented longitudinal interlocking ribbing eliminates crushing force on vascular walls. Gold standard for cardiac, aortic, and peripheral vascular procedures.",
    length: '200 mm (8")',
    sizes: ['160 mm (6¼")', '200 mm (8")', '240 mm (9½")'],
    jawProfile: "1.5 mm Non-Crushing Ribbed Jaw",
    material: "German AISI 420 Alloy",
    finish: "Electrolytic Satin Bead-Blast",
    norm: "DIN 58299 / ISO 7153-1",
    image: "/images/products/debakey-atraumatic-forceps/01-primary.png",
    images: [
      "/images/products/debakey-atraumatic-forceps/01-primary.png",
      "/images/products/debakey-atraumatic-forceps/02-ribbed-jaw.png",
      "/images/products/debakey-atraumatic-forceps/03-full-axis.png"
    ],
    imageAlt: "DeBakey Atraumatic Vascular Forceps.",
    tag: "Atraumatic Ribbed",
  },
  {
    id: "VSP-1065-RP",
    sku: "VSP-1065-RP",
    ref: "VSP-1065-RP",
    name: "Rochester-Pean Hemostatic Forceps — Curved",
    title: "Rochester-Pean Hemostatic Forceps",
    alloy: "DIN 1.4021 Heavy Martensitic",
    categoryTags: ["Hemostatic", "Rochester-Pean", "Heavy Vessel Clamp"],
    discipline: "Forceps & Clamps",
    subCategory: "Heavy Hemostatic Forceps",
    description: "Heavy-duty surgical forceps designed for clamping large blood vessels, vascular pedicles, and dense fibrous tissue bundles during abdominal and pelvic surgeries.",
    length: '200 mm (8")',
    sizes: ['160 mm (6¼")', '200 mm (8")', '240 mm (9½")'],
    jawProfile: "Curved Heavy Transverse Serrations",
    material: "German Martensitic 1.4021",
    finish: "Anti-Glare Satin",
    norm: "DIN 58298 / ISO 7153-1",
    image: "/images/products/rochester-pean-curved/01-primary.png",
    images: [
      "/images/products/rochester-pean-curved/01-primary.png",
      "/images/products/rochester-pean-curved/02-curved-jaw.png",
      "/images/products/rochester-pean-curved/03-serrations.webp"
    ],
    imageAlt: "Rochester-Pean curved hemostatic forceps.",
    tag: "Heavy Clamp",
  },
  {
    id: "VSP-2180-AL",
    sku: "VSP-2180-AL",
    ref: "VSP-2180-AL",
    name: "Allis Tissue Grasping Forceps (5x6 Teeth)",
    title: "Allis Tissue Grasping Forceps",
    alloy: "DIN 1.4021 Martensitic",
    categoryTags: ["Tissue Grasping", "Allis", "5x6 Teeth"],
    discipline: "Forceps & Clamps",
    subCategory: "Grasping Forceps",
    description: "Engineered with 5x6 interlocking terminal teeth. Securely holds slippery fascia, tendons, and tumor capsules without crushing delicate underlying anatomy.",
    length: '150 mm (6")',
    sizes: ['150 mm (6")', '190 mm (7½")'],
    jawProfile: "5x6 Interlocking End Teeth",
    material: "German Surgical Stainless",
    finish: "Satin Anti-Glare",
    norm: "DIN 58298",
    image: "/images/products/allis-tissue-forceps/01-primary.png",
    images: [
      "/images/products/allis-tissue-forceps/01-primary.png",
      "/images/products/allis-tissue-forceps/02-interlocking-teeth.png",
      "/images/products/allis-tissue-forceps/03-ratchet-grip.jpg"
    ],
    imageAlt: "Allis Tissue Forceps 5x6 interlocking teeth.",
    tag: "5x6 Interlock",
  },
  {
    id: "VSP-2210-BC",
    sku: "VSP-2210-BC",
    ref: "VSP-2210-BC",
    name: "Babcock Atraumatic Intestinal Forceps",
    title: "Babcock Atraumatic Intestinal Forceps",
    alloy: "DIN 1.4021 Martensitic",
    categoryTags: ["Intestinal", "Babcock", "Atraumatic Loop"],
    discipline: "Forceps & Clamps",
    subCategory: "Organ & Intestinal Forceps",
    description: "Flared, fenestrated loop jaws designed for atraumatic grasping and retraction of delicate tubular organs such as intestines, appendix, ureters, and fallopian tubes.",
    length: '160 mm (6¼")',
    sizes: ['160 mm (6¼")', '200 mm (8")'],
    jawProfile: "Fenestrated Atraumatic Loop",
    material: "German Surgical Stainless",
    finish: "Electrolytic Satin Bead-Blast",
    norm: "DIN 58298 / ISO 7153-1",
    image: "/images/products/babcock-intestinal-forceps/01-primary.png",
    images: [
      "/images/products/babcock-intestinal-forceps/01-primary.png",
      "/images/products/babcock-intestinal-forceps/02-loop-jaw.png",
      "/images/products/babcock-intestinal-forceps/03-hinge.jpg"
    ],
    imageAlt: "Babcock Atraumatic Intestinal Forceps loop jaws.",
    tag: "Organ Loop",
  },
];

export const CATALOGUE_PRODUCTS = VANGUARD_CATALOG;
