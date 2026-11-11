export const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/ALJJyrCHW0MSpA8w0brpp_evQBX1xmtaNukEQ8qzFWL3aIKlKeRsJAnTf6I8RBQJLQIeMVsMbzZO1tsNxGq-4AJTcrOXQXBxkqEu2uCs0_xcZObZ5M4mTHSCbL3sfDUmLurYKDGFIw_gIASdrazo9gxd7N08stMTOWtcLvZmz0rnnmv0yUgzwm5wzDU5jxzETg0LSXhW-u65MtvrpvbNZe62BZcVpyo4w-Dv9DHIqkwleyc";

export interface CategoryCard {
  id: string;
  slug: string;
  title: string;
  patternsLabel: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const HOME_CATEGORIES: CategoryCard[] = [
  {
    id: "surgical",
    slug: "Surgical Instruments",
    title: "Surgical Instruments",
    patternsLabel: "720 PATTERNS",
    description:
      "General surgical sets, abdominal retractors, intestinal clamps, dissecting scissors, and sterile suction tubes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDA9Th9YujZS_oo_8aFJ7a614pYh8vg_fMxVumbefUICEwoNhw2rGGX1YiACfXzbtWw0SMGUUBGGiI5nl264fggJs8LKzAkLN-7kzMYiAotkM07KY8BVzyxl0gTAfgQAxq3EnhbbSOTXI6-c2vTN7HEGOJVAgMUfvYTr2F966wfvi2YkRwc2j08fIkIl6SHJfIEHwAAN0MRYh2hKd1RHyuxuiyc8zJxD1Hxm-r9W0M",
    imageAlt:
      "Macro studio photograph of stainless steel Metzenbaum scissors, scalpel handles, and surgical retractors resting on a clean clinical backdrop with subtle directional surgical lighting and high contrast.",
  },
  {
    id: "medical",
    slug: "Medical Instruments",
    title: "Medical Instruments",
    patternsLabel: "340 PATTERNS",
    description:
      "Clinical diagnostic diagnostics, biopsy forceps, gynecological speculums, and minor outpatient surgical kits.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHweBEMnPWQMuvLTLZh1obyZQKDVSmTpQe1BjPKpDwnMH-SA2cTNFe8um4PbWrMzd9QpD-SRVJl5l5e7U5KHC8fbz98_Nsx4Cm_3qeYFqDRibpF8UwNfO_A9TP1-UnK_2pPF79Tc07NFnBNOoNyeSRW0xBehJ4qqzIPQWR67NqRlL18OCTpl3nXE0N0HLl8Qvf23lDZe8Cw6_6--qvAibhkjlqMw8Pyv3FBrwnx8w",
    imageAlt:
      "Clean diagnostic medical instrument set including laryngoscopes, percussion hammers, and sterile biopsy punches laid out on crisp matte surgical blue surface under sterile studio lighting.",
  },
  {
    id: "dental",
    slug: "Dental Instruments",
    title: "Dental Instruments",
    patternsLabel: "510 PATTERNS",
    description:
      "English and American pattern extraction forceps, micro-periodontal curettes, root tip elevators, and implantology instruments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAujMZ8a7hHGXvBw29vKym-UKY_RGy_whG_P2kLAtiBnkBU2HleUWY0l35fm_fyhdNG-8kaJwnzrkSJdmEYloRl3fjnL_7WT4yF8UhR87WBHVYWll3or0wKG3wfJHhNT1Mqx1r6Wtc_Zva-7ZGfXqNHo_0qiKgNnr3xBfv5jeddDB9umBic2NSPwY9UEQE63QGgLeljyaidqTaTn0vzerENWOuzMNumqJnxtQgSXTk",
    imageAlt:
      "Precision dental extraction forceps, periodontal scalers, and root tip elevators made of satin-finish surgical steel arranged on a reflective clinical stainless steel surface.",
  },
  {
    id: "orthopedic",
    slug: "Orthopedic Instruments",
    title: "Orthopedic Instruments",
    patternsLabel: "390 PATTERNS",
    description:
      "Double-action bone rongeurs, calibrated osteotomes, bone holding clamps, wire cutters, and periosteal elevators.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcbj1fFU9wmEvXogpvHx2j6hrts09DXJYvPlmbVkwxxWmoeDHtsEy_sCK1k3AzAOfUvXSVc5ziyQ_RiST0OFNa2rqtskh-E3wk_C9-5NkdVa1JDA0IzAs_ZFLew8-hRwko4Jxdo3XOnvrS1zoRWEl7bkkD3TjqRBBJhot60ORZku5rdHO8K1nv6aXwaRXSz9JzuzYgcRyN4QmkYfnFT3cr_vnZu0zB27kSMxqnA0",
    imageAlt:
      "Heavy-duty surgical bone rongeurs, orthopedic osteotomes, and bone holding forceps with ergonomic heavy grips illuminated under direct directional medical lighting on white backdrop.",
  },
  {
    id: "ophthalmic",
    slug: "Ophthalmic Instruments",
    title: "Ophthalmic Instruments",
    patternsLabel: "260 PATTERNS",
    description:
      "Precision micro-scissors, high-magnification corneal forceps, Castroviejo needle holders, and pediatric eye speculums.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsLoOFMWHjIGRpeGOMF0-mTrCAl-xzUw82DAJ0sQP-7BgihHTS6D5uwsMp8OLoaK7vAVw_xtfWDy7lKgp9kP826VC-73vyOvC7PsY_2vQLb_iNeVYsmQHUXJsqjjxlAhzQ9INsTlKQ5DKmMLyRUYBhIzwwg1VYM3wr_afQxZXX2eHoEFVODUztWf3D1GJJL9GC-ZWLjDOTjDxXHPc3mabbM1gZ4zdT_2pZtvxBwfA",
    imageAlt:
      "Delicate ophthalmic microsurgical forceps, corneal scissors, and miniature eye speculums resting on pristine white medical cloth with precise macro focal depth showing tip serrations.",
  },
  {
    id: "forceps",
    slug: "Forceps & Tweezers",
    title: "Surgical Forceps & Accessories",
    patternsLabel: "480 PATTERNS",
    description:
      "Hemostats, atraumatic tissue forceps with tungsten carbide inserts, titanium micro forceps, and sterilization mesh trays.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuVtiV6pqLLYPEkHgP_qKSKg-_RHG8jWIHK8Gq3PT2GEIqkXwV4W-Nl-JdRlm6XLoVfNME_E2P4Vmo561AxffKZ012dUe1ZUrrD97FT6qHsVMfTAMkR3MDbVkbYWpMu8ySbsfAiTYdS3J690yXwtdtQKPpZM5KTkC00cmGDtzWY8-IgQYU2a8U_PjWbZ6-NcoZ1ORaMa-XsSL5-3PAczJX4wVm9ab1M0jlRJv6s3A",
    imageAlt:
      "High precision hemostatic mosquito forceps, Crile clamps, and non-magnetic titanium micro forceps in surgical tray layout with clean steel highlights and matte reflection.",
  },
];

export interface HomeFeaturedInstrument {
  ref: string;
  badge: string;
  badgeBold?: boolean;
  category: string;
  title: string;
  description: string;
  standard: string;
  image: string;
  imageAlt: string;
  detailId: string;
}

export const HOME_FEATURED_INSTRUMENTS: HomeFeaturedInstrument[] = [
  {
    ref: "REF: BN-302-14",
    badge: "TC Gold",
    badgeBold: true,
    category: "General Surgery",
    title: "Metzenbaum-Nelson Scissors",
    description:
      "Tungsten Carbide inserts, gold-plated ring handles, curved 180mm profile.",
    standard: "DIN 1.4021",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc_KeuTAbFZYkEIN4loK0wiO8dLWYVYEtDVScwgb3SuBR0so0SEG6pUge1U-GeEM1WSa7_VS2wt5f0PEjuZ0jJJEqaqObEpeFt4W9lWKC-96I3AGFIPribKcvO13njh5puMT7kEdQ0MosK2fEgk1Ls91BJOJqmgYbm-s6qSOtBP7oAmPMEW3ZMbXFdxC9JtJ61rUSEYxeoOfEjTGnK4hVEbghgPM2ohOhkNY0_HrE",
    imageAlt:
      "Isolated studio shot of Metzenbaum-Nelson surgical dissecting scissors with tungsten carbide gold-plated ring handles and curved cutting blades on pure white backdrop.",
    detailId: "BN-SC-1021-TC",
  },
  {
    ref: "REF: BN-114-14",
    badge: "Box Lock",
    category: "Hemostats",
    title: "Crile Hemostatic Forceps",
    description:
      "Curved 14cm, precision hand-fitted box lock, atraumatic horizontal serrations.",
    standard: "AISI 420B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgt68o31WKJEIP1HMFmvdEx4dtP263Mk6NylAV9A6W5NX3m-c85_n0Q0FvOrrBADmhWub1UhxHxvksxgVAMdy6m_OaAo8jn02_0gNDHWyUT9IbVeAAiNxbJhn6EV6KAGMvx63JvVOu6XXQhfVJZiJUR8zVUBBIuX4UdEclPuZumPzQzTIENhWi2go0BdBBJVHleZfmpYnqmMFzlFP2fD8GbPZGeDgQg18sZj1BQuU",
    imageAlt:
      "Isolated studio shot of Crile hemostatic forceps curved 14cm with precision serrated jaws and ratchet lock on pure white background.",
    detailId: "BN-FC-2044",
  },
  {
    ref: "REF: BN-420-16",
    badge: "TC Jaws",
    badgeBold: true,
    category: "Needle Holders",
    title: "Mayo-Hegar Needle Holder",
    description:
      "Cross-serrated TC jaws, multi-step ergonomic ratchet closure, 160mm working length.",
    standard: "DIN 1.4116",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHAlMbaQcmOVT4y34J-o9gKzDcLxNsg3K56-TxBuKhfdfYCfUhaFFyhKi2GuFxPJ_8KQPV8hKb6pzzeoaPtq-9qbjJvgJqg_vYruzXQkZCkuXI6egWb6H3BokEiXn0yDTGqInNQXW7EcHJzY0lnzq8htrSPH8KBFOgniFW0IPvM38JYMj6A1wlx8rEQV6LmNY8OEyH6xodmFEth-ryLZJniQ-F2AoVbPRKuDMyUy4",
    imageAlt:
      "Isolated studio product image of Mayo-Hegar surgical needle holder with cross-serrated tungsten carbide jaws and satin stainless steel finish on white background.",
    detailId: "BN-NH-3105",
  },
  {
    ref: "REF: BN-201-12",
    badge: "1x2 Teeth",
    category: "Micro Forceps",
    title: "Adson Tissue Forceps",
    description:
      "Delicate 1x2 teeth, micro-serrated guide pins, anatomical grip pads, 120mm.",
    standard: "AISI 304/420",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj1WLeKxs8cWhmqu4AzX_-AMRlR8dtERyEb0NvE46QeLjAk2jzAcRs1QFswJ-kYtREk406Tq7-J1b8pkWMQZ5E6y1E2p1Gna8QGpA9wirG7KwzIxOTYHN00K6G7orPK25pMF8SIjxrpLLH409j-5GaPk9LfFVa_Ojv89ZtKuI4vGDCxA2IW0J4tEigGNYvkqV5zWUwGwr4gLPvAwKdNGCbklcujNjM5A-seB_2OSA",
    imageAlt:
      "Isolated studio product photograph of Adson tissue forceps showing 1x2 interlocking delicate teeth and wide finger grips on white isolation backdrop.",
    detailId: "BN-FC-2180",
  },
  {
    ref: "REF: BN-550-13",
    badge: "Self-Retaining",
    category: "Retractors",
    title: "Weitlaner Retractor",
    description:
      "Self-retaining 3x4 sharp prongs, deep surgical field exposure, quick-release cam.",
    standard: "DIN 1.4028",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5lER7xfwEVjiBN-VCp2us_S77EstTVvp8a1epdQTSiF7Hs1LG2WeG3T4pZxr4T-G7brU16uKGTgFvz_9Q4HLdrDIYnwo2TbHrBENU5Ir3BR7xSWBzOR86H2T9exppCxmDb0HLb1obJYjovhsENpg5yMeYHsfCHt8_3YMdhhuuhwV2rZzHy7AlXCtO7Fms8Hg3Ve9BGjqtbQqqqZnQv_c4rux-v30vAXUCgVwjIzg",
    imageAlt:
      "Studio cutout photo of surgical Weitlaner retractor with 3x4 sharp prongs and cam-lock mechanical ratchet on white studio table.",
    detailId: "BN-RT-4012",
  },
  {
    ref: "REF: BN-810-20",
    badge: "Detachable",
    category: "Orthopedics",
    title: "Kerrison Bone Rongeur",
    description:
      "Up-cutting 40-degree jaw, detachable take-apart mechanism for validated sterilization.",
    standard: "AISI 440C",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhGptMR-7rKaMeyHTATP_669ICI0_xJRFdWq3ANODVsot-B0QdFFVKf1gCRf825D6_as8jMaJ13811WrHTEphGKQYsBagvXu5mg-AEQxoXZuZeW0cgVRxCc2LHjC_HVD6QqH7PbrkETMoiUvKLJ9thlzZbAk5RY_og1jGo0hLM-nm5Xq7l0kkrVEpGyiwwnBEXMIEkNCpsbFEvP06yxzSWdsEmVq67N4pCQTx9gkc",
    imageAlt:
      "High precision orthopedic Kerrison bone rongeur 40-degree up-biting with detachable shaft for hospital sterilization on pure white background.",
    detailId: "BN-OR-6120",
  },
  {
    ref: "REF: BN-630-14",
    badge: "Microsurgery",
    category: "Ophthalmic",
    title: "Castroviejo Micro Holder",
    description:
      "Straight, delicate spring action with locking catch, engineered for 7-0 to 10-0 sutures.",
    standard: "AISI 420A",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnYV68tweXfuWYnJvumEwhZBBP3kUYa0ib5gdkF6ulN5Wrr5JsSp-2jcqNVJGu9uzkyfWqZeSjo0h-tpG2byUmG1Y1J-NaY0MU_sHvCd2ZI-EXB_hRYO3kp6J89PjqKRhO5iv1yXjzaWSN4O_QcocadgHp1q-w1MrX9w1DfcmH2gnUdSJivRNHhe95Y7BBzdNuuqpOaeH_l1tTEk-1VrKcn5djs2k14fyC2YsMUek",
    imageAlt:
      "Castroviejo micro needle holder with fine straight jaws and spring-loaded handle for ophthalmic surgery on crisp white backdrop.",
    detailId: "BN-OP-7005",
  },
  {
    ref: "REF: BN-704-18",
    badge: "Dental DIN",
    category: "Dental Instruments",
    title: "Cryer Dental Forceps",
    description:
      "Ergonomic anatomical grip, textured handles, forged beak for lower molar root leverage.",
    standard: "DIN 1.4021",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJknUg4as6oIBjQv02uR58qtEXD4NnRI9gHesfLib3bd9lD1SNQInAhgRf9CHdHz7gNBrq5YabPSVrhG-YES7sYHWhOAmzgcl8xxh1Uk8lE4KpCGJwX63CYdlGxdcHXrDbRqSe8A_-B2TCcUfVl-Rq6ak5r5davTs2C6dDDHdDzn9LIxcVSWRPGydnZL-bbjyL3t53Wjdtuwc1YwybzQ6YfnjQ4Li9cdXuet-D0Y0",
    imageAlt:
      "Isolated studio shot of Cryer dental extraction forceps with anatomically cross-hatched non-slip textured handles on white surface.",
    detailId: "BN-DT-8092",
  },
];

export interface CatalogueProduct {
  id: string;
  ref: string;
  title: string;
  discipline: string;
  categoryTags: string[];
  alloy: string;
  finish: string;
  tipConfig: string;
  lengthLabel: string;
  lengthMm: number;
  hrc: number;
  description: string;
  specs: [string, string, string, string];
  icon: string;
  iconTitle: string;
  badgeHighlight?: boolean;
  image: string;
  imageAlt: string;
}

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  {
    id: "BN-SC-1021-TC",
    ref: "BN-SC-1021",
    title: "Mayo Dissecting Scissors",
    discipline: "Dissection & Cutting",
    categoryTags: ["Surgical Instruments", "Scissors & Shears"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Straight",
    lengthLabel: "14cm – 23cm",
    lengthMm: 170,
    hrc: 55,
    description:
      "Beveled blades with hardened cutting edges engineered for dense fibrous tissue incision and blunt fascia separation.",
    specs: ["BLADE: Straight/Curv", "MAT: AISI 420B", "HARD: 54-56 HRC", "ISO: 7153-1"],
    icon: "brush",
    iconTitle: "Satin Matte Finish",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbOY-971NkD2v3bOeiRcVvyCtVgGOye743Xk9kJOqkvveTOxkxNgfOEMbeL_ggD3srqqU13WnVD4HoARa4uYzdKIYDqqvi9Xj-OdqTUrFIfi3uMyRSvXN2do8fhZDk0kEzgd1OFVHAXAnLMDLGy9fDIWHsvuXJepM88unUHAvrXlLBVUM-tU9nY2eQulfbUHh7tmHwGhK0ncOGDlpC1NG2UQE51LmCvdj1g9gCNqE",
    imageAlt:
      "A clean, isolated studio photograph of Mayo Dissecting Scissors crafted from surgical stainless steel with a satin matte anti-glare finish, resting on a pure clinical white background with soft, neutral lighting and high metallurgical clarity.",
  },
  {
    id: "BN-FC-2044",
    ref: "BN-FC-2044",
    title: "Halsted Mosquito Forceps",
    discipline: "Hemostatic Clamps",
    categoryTags: ["Surgical Instruments", "Clamps & Hemostats", "Forceps & Tweezers"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Curved",
    lengthLabel: "12.5cm",
    lengthMm: 125,
    hrc: 48,
    description:
      "Fine delicate tips with horizontal serrations full length for micro-vessel occlusion and precise bleed control.",
    specs: ["JAW: Delicate Curv", "LOCK: Box-Joint 3-pos", "MAT: AISI 420B", "RATING: Atraumatic"],
    icon: "lock_reset",
    iconTitle: "Surgical Ratchet Lock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMCBH-FD_NOxEp1O6WSIH_EFfw-1OGuaDznIdiXx9z8432Z3VIJHyemNpj_j2iRnJysns_a6ELjt5v7mW-fjEO7ATUTdVX_EFyt5pd0OpcwEcvM7oRjcnKZX2zFB_YYC4zDCpe1uiUMfq0hzLToQwv1-xxX448oRBeSm4-4ghmEYkWgnyQsKsS_4mRXeomInQPXBJ4RW80Vxq5whuA13rkFURX3IbA6Q6K7F8pCwY",
    imageAlt:
      "An isolated high-resolution macro shot of Halsted Mosquito Forceps with delicate curved jaws and fine horizontal serrations, pure surgical stainless steel, shot against an immaculate white backdrop with clinical lighting.",
  },
  {
    id: "BN-NH-3105",
    ref: "BN-NH-3105",
    title: "Crile-Wood Needle Holder",
    discipline: "Suturing & Ligation",
    categoryTags: ["Surgical Instruments", "Needle Holders"],
    alloy: "Tungsten Carbide (TC)",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Straight",
    lengthLabel: "15cm",
    lengthMm: 150,
    hrc: 72,
    description:
      "Tungsten carbide cross-serrated inserts for firm non-slip grip on fine 3-0 to 6-0 procedural needles.",
    specs: ["TIP: TC Inlaid 0.4mm", "HANDLE: Gold Plated", "MAT: Martensitic", "SUTURE: 3-0 to 6-0"],
    icon: "workspace_premium",
    iconTitle: "Tungsten Carbide Inserts",
    badgeHighlight: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwfCHgkmrBQ78YgLWS5U3dLGilbqk3kptMscvYVIh2CKwHTiRpn_pm3CWsBr9CtawYWTxVWlxV-Hqlvsi0iP7Lzf9IMo_SI-9HilJ64DOzqJdE_ERbwv-CmhURMvQ6Cl5HWVR0lQD2X1-JCnj-tvhja_Opu6zt10hOO7gfUQ3ewVmI6iffFYUDO6N1qaftOYQfNqgJ6Y-Zj0pE8WW4WaWbSheX7TsZvpD_evhS8bM",
    imageAlt:
      "Technical product photography of a Crile-Wood Needle Holder with distinctive gold-plated finger rings and precision tungsten carbide jaw inserts, cleanly isolated on pure white, reflecting professional medical instrument grade.",
  },
  {
    id: "BN-FC-2180",
    ref: "BN-FC-2180",
    title: "Allis Tissue Forceps",
    discipline: "Grasping & Clamping",
    categoryTags: ["Surgical Instruments", "Forceps & Tweezers", "Clamps & Hemostats"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Heavy / Atraumatic",
    lengthLabel: "15cm",
    lengthMm: 150,
    hrc: 46,
    description:
      "Atraumatic interlocking 4x5 teeth provide firm non-crushing traction on fascia, organ margins, and slippery tissue.",
    specs: ["TEETH: 4x5 Interlock", "RATCHET: Multistep", "MAT: AISI 420B", "FINISH: Satin Matte"],
    icon: "hardware",
    iconTitle: "Atraumatic Interlocking",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBquVVbKt6EUagOpEZTheZFVAOup5Qkniqg4BRAlpM0HtVXCEBOyj_T5x2hUxyqIy-edmTdElk8KwWYsyhqpcapEpWb_YpBg1L_FJL2Xlj1TaJVw33S9Yypu5F52b9p-C70lKyCdjmhZKCYJuznDq02aASxdwqfog7rNmS_o-g58uhyNQFStE0Aq08BtMjAXugbImLTk3Y6sZdCAEEbtFP7w9pTg47qvGWPZOv2mVw",
    imageAlt:
      "Clean clinical macro photograph of Allis Tissue Forceps with 4x5 interlocking teeth at the jaw tips, pure surgical steel in satin finish, set against a pristine white neutral background with sharp metallic highlights.",
  },
  {
    id: "BN-RT-4012",
    ref: "BN-RT-4012",
    title: "Senn-Miller Retractor",
    discipline: "Field Exposure",
    categoryTags: ["Surgical Instruments", "Retractors"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Angled",
    lengthLabel: "16cm",
    lengthMm: 160,
    hrc: 45,
    description:
      "One blunt 3-prong rake end and one small right-angle solid blade designed for dermal and shallow plastic dissection exposure.",
    specs: ["PRONGS: 3-Prong Blunt", "BLADE: 6x17mm Angle", "MAT: Austenitic S/S", "TYPE: Handheld Pair"],
    icon: "swap_horiz",
    iconTitle: "Double Ended Handheld",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKwh1xcY5-YmMW68n7kw1XTLsaV1qe0dIR4RsfUYGNwMjZPtlLGRSpQmhEmcMZmvyZRtbIrM1uT1RlCCTHmLG5hCAiuNwuF6hCF-75JZeMUg6lgQVTDTSPU7b0okx3zj-HXguFGJuGpb40o0-JEn662BA_rBTqkuBLXSY03aqdjlLsAd4vlHe5iexw2E8XHpdMZMMaVUNABuIfvKYUjNuLqa38ObGtwXaPX6CD1tg",
    imageAlt:
      "Double-ended surgical Senn-Miller Retractor isolated on pure white, showcasing one blunt 3-prong rake end and one right-angle solid blade, fabricated in German surgical steel with satin anti-reflective finish.",
  },
  {
    id: "BN-CL-5018",
    ref: "BN-CL-5018",
    title: "Backhaus Towel Clamp",
    discipline: "Surgical Draping",
    categoryTags: ["Surgical Instruments", "Clamps & Hemostats", "Medical Instruments"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Mirror Polish",
    tipConfig: "Curved",
    lengthLabel: "11cm",
    lengthMm: 110,
    hrc: 47,
    description:
      "Sharp curved jaws engineered for secure penetration and mechanical fixation of surgical drapes and suction lines.",
    specs: ["JAWS: Curved Sharp", "RATCHET: Precision Lock", "MAT: AISI 420B", "PURPOSE: Draping & Lines"],
    icon: "push_pin",
    iconTitle: "Perforating Fixation",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9M5pRlx7hnmfrmOeoQAz5A1KVVQ5rx42ExeamcfW-wcXFdC5GawxJSpETKHjgEmZ456uBovcfaBUwJ4u6NSXfqv0XR9lxXgz734KzupSYzHgd6BTsS1fiCkXJgNaS9t0jO4UEmnQQj1YcSpBTMzfh-HnnYxpZANBdBJHYz02g8w63ZCxOg3hrOGbEWbpcUHSr1erfaDbZxrkmPRaU2PHP8bHiaX2a-VDKcaGxRCU",
    imageAlt:
      "Medical catalog photograph of a Backhaus Towel Clamp with sharp inward curved perforating jaws, surgical steel construction in anti-glare finish, isolated on a bright neutral white backdrop.",
  },
  {
    id: "BN-OR-6120",
    ref: "BN-OR-6120",
    title: "Beyer Bone Rongeur",
    discipline: "Orthopedics & Spine",
    categoryTags: ["Orthopedic Instruments", "Bone Instruments", "Surgical Instruments"],
    alloy: "AISI 440C High-Carbon",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Curved",
    lengthLabel: "18cm / 3.5mm Jaw",
    lengthMm: 180,
    hrc: 59,
    description:
      "Double-spring action delivers maximal shearing force for dense cortical bone excision without user fatigue.",
    specs: ["ACTION: Double Hinge", "BOWL: 3.5mm Curved", "MAT: AISI 440C", "HARD: 58-60 HRC"],
    icon: "build_circle",
    iconTitle: "Heavy Orthopedic Action",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN23R0mp0hnd10fr20SwP1H6O1AFVh8hywVWh1KhUiFzMAQyCARDccuNpVI93EQZDkAwL6Hbf7Z7nnff8TnRGcpRe46VrfOTuNP7umWYYPWo2PDrav55f09HYyRRN9msz_voUN1aB7F-lZtlehqrCAq9JQ-L1oC45AbGjtexh8wbrf0xt-9jUK2lfOemVqVLgxehn3Dq6taR49M8eu_L2gWBMdKH0m8BKgORn85GA",
    imageAlt:
      "An isolated studio view of a heavy-duty Beyer Bone Rongeur with double action hinge and curved cutting scoop jaws, manufactured in high-carbon surgical grade stainless steel, resting on a clean white surface.",
  },
  {
    id: "BN-OP-7005",
    ref: "BN-OP-7005",
    title: "Castroviejo Micro Caliper",
    discipline: "Ophthalmic & Micro",
    categoryTags: ["Ophthalmic Instruments", "Medical Instruments"],
    alloy: "Titanium Grade 5 (Ti-6Al-4V)",
    finish: "Satin / Matte Anti-Glare",
    tipConfig: "Delicate",
    lengthLabel: "0–20mm Scale",
    lengthMm: 90,
    hrc: 50,
    description:
      "Precision graded laser scale with knurled thumb screw lock for exact strabismus and corneal flap measurements.",
    specs: ["RANGE: 0 - 20mm", "GRAD: 0.5mm Steps", "LOCK: Knurled Thumb", "MAT: Surgical S/S"],
    icon: "straighten",
    iconTitle: "Microsurgical Precision",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKpQB8JBbGCSJsCZCY-3TIh2k505Tf4D8b3B42exvyRhc7F5DWhnhU_mHwF_3ryKMvqD0k17tFaRmXLR4Js46DtGQCxQO2CRidmtLy0seyNfbXngVPed5axTLuSEq50hVbiaAJxB09O5agKHhk2sQrzmnKO3aD9R7yCgE05y7VVeeYw8iOlkYhoqXFs6i6dBO1xjDd4xtHWgG4ZZS1uNIYYT8Kr-csZz5I5VOCy14",
    imageAlt:
      "High precision micro-surgical instrument shot of a Castroviejo Micro Caliper with fine laser-engraved millimeter increments from 0 to 20mm, satin surgical grade stainless steel against an immaculate white background.",
  },
  {
    id: "BN-DT-8092",
    ref: "BN-DT-8092",
    title: "Cryer Left & Right Elevators",
    discipline: "Dental Oral Surgery",
    categoryTags: ["Dental Instruments", "Elevators & Curettes"],
    alloy: "AISI 420 Stainless Steel",
    finish: "Mirror Polish",
    tipConfig: "Angled",
    lengthLabel: "Pair (L & R)",
    lengthMm: 145,
    hrc: 52,
    description:
      "Anatomical triangular blade tips engineered for effortless luxation of impacted mandibular molar roots from socket walls.",
    specs: ["TIPS: Triangular L/R", "HANDLE: Hex Grip", "MAT: AISI 420 High-T", "AUTOCLAVE: 134°C"],
    icon: "dentistry",
    iconTitle: "Dental Oral Surgery",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXueXYWdn7JnlX7baqNZyBO9OiCL0Q6hsV-l6X0Tkr3nfw6e5zVr5xliex1sIOUVsy0HXTOvkXA1HioiQKN4fQHnxV108dlTftPk4dcRyMSrCIelS0N7Nrvf9j7KdYl8mdm8dpfuM8hB6By2OgaPSMDY7P_xACXIMUTDX0hS1S1kRYALI0IIcEq-f3xOw4HvJwGcjXVpzsTMooi2PRisB5GVdy4JQC7Z0iIKHnLzU",
    imageAlt:
      "Dental extraction surgery instrument photography showing Cryer Left and Right Root Elevators with ergonomic solid hexagonal handles and triangular sharpened blades, isolated against a bright white background.",
  },
];

export const SPECIMEN_VIEWS = [
  {
    label: "TC Jaws & Edge",
    sub: "Bevel 18.5°",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdsU1LVWbKenDbWf39skYmEsd4nqqNhi7K1KDlotQSo-eZZyAmqy9GVxVuthNe-qk-JAL-wvZ_cN8rlfXqDOPWKSkO0v0rKFZLmXDfr77K-y5gmEHJo-DY6Qv-mg-Rz7TEZVQzKgBKl8fNuzUctySHqdMkBYDm717sN5ZvFxwijegoRQzQ2RJEHKD5AfHiOpAZP6NjBtRdP6EJU9OLM-GPw837faJKZX3uFrTl4pg",
    alt: "Jaws & Cutting Edge Close-up",
  },
  {
    label: "Screw Hinge Joint",
    sub: "Lap-Fitted Bearing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjawMdltSuSXWgZiCQ5TD3IAqIcQAd7EJXl1s1ACpWFFdkmKW4yQ-Gpc_ZaKvuUHl3Ozmo5YzS9YUdtEkuNK7xp1SDCQzMRMIytVDiZGIBATSnA_k0nGB5f0ohkx1X2wCaz0dG8THfQgrVqfIIWrx4MZipPA-vkpjqq1GvwIlauDs0fdaDIAUBs9-cgplBW0A0GK9ZpRPHh1ZKQ17C1jRP6D2LwvE3KAWqRlZKK70",
    alt: "Box-Lock Hinge Mechanism",
  },
  {
    label: "Gold Ring Shorter",
    sub: "DIN Standard TC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNXpNOUnh2zr3j0bitgLFyvLSAzjK4uopplJfYkcfNb8cRpMwLM-yrTUQBqI14ynXSJlEJSs95Yfad_yoV4G7_IkM1gn_lJyipbA1IQLLmKDzq8LiKmjZxffa2hoLKsvdiVep5oddNI34wOh7YG3wvqlq1hGvTg3UjemWbhgqzNNycqFoNg8sxCKpMX_KO0-VyblAeQGDFlBqSDiQvsJxOhBBu4v8oktDmgF9Eauk",
    alt: "Gold-Plated TC Ring Handles",
  },
  {
    label: "Dimension Scale",
    sub: "145 / 170 / 230 mm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkoKXR8I3ehSpdXmLZuCwt_X83q73RNekgPomyXk5009R9TRNiFy-F6apkWudwf9c5aGu2HvTocvM8GtYOZaopocg6FFluzm0HkiqB7w43fuQD9upw_A9I0702YrJRs8Rlm-QuzP9lrX2M0MZRudqEph9qskKPwcAEuaARMfDcJgA2SH0mK-VVfeJEVXANbntUmGFPfMd1-4I2-foDY3ClyuhHt-MhMRcBhebjbMo",
    alt: "Measurement Scale Comparison",
  },
];

export const PRIMARY_DETAIL_HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBX-mqUV0ndkcRVI1JNDbgyjWrtFhNpUh_9lbN1D31LkDgsUKgCC5oINxdvOyXjQlrA-SJgIYclU_BUYnGT-oYMgFvrImIKFnBducYiQwksWqTMJQrCz5opboJSCeIReWH6cfh2lsjfQQTOpq3maaQ-o-5hEtuCeI5XO0WzNk0cFzSt3a2O7DamICOTNHHhIHmz7oviRUMKAy6hdFj4XA9YM79b4gvRigwDTFSk1ME";
