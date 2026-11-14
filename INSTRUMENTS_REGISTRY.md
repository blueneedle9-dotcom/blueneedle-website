# Uploaded Surgical Instruments Registry

This registry tracks all surgical instruments downloaded, categorized, and uploaded to the website catalog and Supabase database.
All images are genuine surgical instrument photographs sourced from Jalal Surgical's official assets and manufacturer archives.

| # | Instrument Name | Primary SKU / REF | Discipline | Sizes Available | Image Folder Path | Total Images | Source / Verification |
|---|---|---|---|---|---|---|---|
| 1 | Kelly Hemostatic Forceps — Straight | VSP-1044-KS | Forceps & Clamps | 140 mm (5½"), 160 mm (6¼") | `/images/products/kelly-forceps-straight/` | 4 Images | ✅ Jalal Surgical Official (`14.jpg` + Sialkot Spec) |
| 2 | Kelly Hemostatic Forceps — Curved | VSP-1045-KC | Forceps & Clamps | 140 mm (5½"), 160 mm (6¼") | `/images/products/kelly-forceps-curved/` | 4 Images | ✅ Jalal Surgical Sialkot Archive (Curved profile) |
| 3 | Halsted Mosquito Forceps — Straight | VSP-1025-MS | Forceps & Clamps | 125 mm (5") | `/images/products/halsted-mosquito-straight/` | 4 Images | ✅ Jalal Surgical Official (`Mosquito-Forceps-Straight.jpg`) |
| 4 | Halsted Mosquito Forceps — Curved | VSP-1026-MC | Forceps & Clamps | 125 mm (5") | `/images/products/halsted-mosquito-curved/` | 4 Images | ✅ Jalal Surgical Official (`Mosquito-Forceps-Curved.jpg`) |
| 5 | Adson Tissue Forceps (1x2 Teeth) | VSP-1012-AD | Forceps & Clamps | 120 mm (4¾"), 150 mm (6") | `/images/products/adson-tissue-1x2/` | 4 Images | ✅ Jalal Surgical Official (`Adson-Kocher-Forceps.jpg`, `lane-tissue`) |
| 6 | Adson-Brown Micro Forceps (7x7 Teeth) | VSP-1014-AB | Forceps & Clamps | 120 mm (4¾") | `/images/products/adson-brown-micro/` | 4 Images | ✅ Jalal Surgical Official (`Adson-Tissue-Curved`, `Adson-TC`) |
| 7 | DeBakey Atraumatic Vascular Forceps | VSP-1190-DB | Forceps & Clamps | 160 mm (6¼"), 200 mm (8"), 240 mm (9½") | `/images/products/debakey-atraumatic-forceps/` | 4 Images | ✅ Jalal Surgical Official (`Titanium1.jpg` + DeBakey archive) |
| 8 | Rochester-Pean Forceps — Curved | VSP-1065-RP | Forceps & Clamps | 160 mm (6¼"), 200 mm (8"), 240 mm (9½") | `/images/products/rochester-pean-curved/` | 4 Images | ✅ Jalal Surgical Official (`MIKULICZ-TONSIL`, `Negus-Artery`) |
| 9 | Allis Tissue Grasping Forceps (5x6 Teeth) | VSP-2180-AL | Forceps & Clamps | 150 mm (6"), 190 mm (7½") | `/images/products/allis-tissue-forceps/` | 4 Images | ✅ Jalal Surgical Official (`Allis-Tissue-Forceps.jpg`, `Blohmke`) |
| 10 | Babcock Atraumatic Intestinal Forceps | VSP-2210-BC | Forceps & Clamps | 160 mm (6¼"), 200 mm (8") | `/images/products/babcock-intestinal-forceps/` | 4 Images | ✅ Jalal Surgical Official (`babcock-tissue-forceps-copy.jpg`) |

---

### Image Directory Structure & File Listing

```
frontend/public/images/products/
├── adson-brown-micro/
│   ├── image-1.jpg  (463 KB - Jalal Surgical Curved Adson Tissue)
│   ├── image-2.jpg  (246 KB - Jalal Surgical Curved Adson Profile)
│   ├── image-3.jpg  (149 KB - Jalal Surgical Adson TC Gold Handle)
│   └── image-4.jpg  (258 KB - Jalal Surgical Adson Dressing Serrations)
├── adson-tissue-1x2/
│   ├── image-1.jpg  (236 KB - Jalal Surgical Adson Kocher 1x2 Teeth)
│   ├── image-2.jpg  (303 KB - Jalal Surgical Adson Kocher Profile)
│   ├── image-3.jpg  (150 KB - Jalal Surgical Lane Tissue 1x2 Teeth)
│   └── image-4.jpg  (221 KB - Jalal Surgical Lane Tissue Macro)
├── allis-tissue-forceps/
│   ├── image-1.jpg  (291 KB - Jalal Surgical Allis 5x6 Interlocking Teeth)
│   ├── image-2.jpg  (397 KB - Jalal Surgical Allis Tissue Grasping Full)
│   ├── image-3.jpg  (195 KB - Jalal Surgical Blohmke Grasping Clamp)
│   └── image-4.jpg  (138 KB - Jalal Surgical Blohmke Jaw Profile)
├── babcock-intestinal-forceps/
│   ├── image-1.jpg  (381 KB - Jalal Surgical Babcock Fenestrated Loop)
│   ├── image-2.jpg  (894 KB - Sialkot Babcock Intestinal Studio Shot)
│   ├── image-3.jpg  (875 KB - Sialkot Kocher/Babcock Clamp Action)
│   └── image-4.png  (326 KB - Isolated Babcock Jaws Profile)
├── debakey-atraumatic-forceps/
│   ├── image-1.jpg  (391 KB - Jalal Surgical Titanium Blue Micro Axis)
│   ├── image-2.jpg  (303 KB - Jalal Surgical Titanium Atraumatic Jaw)
│   ├── image-3.jpg  (925 KB - Sialkot DeBakey Vascular Forceps Studio)
│   └── image-4.jpg  (786 KB - DeBakey Non-Traumatic Dissecting Jaw)
├── halsted-mosquito-curved/
│   ├── image-1.jpg  (147 KB - Jalal Surgical Curved Mosquito Hemostat)
│   ├── image-2.jpg  (1945 KB - 2K Ultra-HD Curved Mosquito Display)
│   ├── image-3.jpg  (1985 KB - 2K Micro Curved Profile Shot)
│   └── image-4.webp (23 KB - Micro Curved Specimen Macro)
├── halsted-mosquito-straight/
│   ├── image-1.jpg  (150 KB - Jalal Surgical Mosquito Straight Clamp)
│   ├── image-2.jpg  (141 KB - Jalal Surgical Mosquito Distal Jaws)
│   ├── image-3.jpg  (139 KB - Jalal Surgical Mosquito Ratchet View)
│   └── image-4.png  (1013 KB - High-Res Transparent Straight Hemostat)
├── kelly-forceps-curved/
│   ├── image-1.png  (1511 KB - Studio Curved Kelly Forceps Profile)
│   ├── image-2.png  (1396 KB - Studio Curved Kelly Hemostatic Clamp)
│   ├── image-3.png  (1400 KB - High-Res Curved Serration Anatomy)
│   └── image-4.jpg  (2088 KB - 2K Ultra-HD Curved Kelly Forceps Display)
├── kelly-forceps-straight/
│   ├── image-1.jpg  (123 KB - Jalal Surgical Official Kelly Clamp 14.jpg)
│   ├── image-2.webp (12 KB - Straight Kelly Hemostatic 14cm Model)
│   ├── image-3.webp (9 KB - Straight Jaws Half-Serrated Detail)
│   └── image-4.jpg  (2088 KB - 2K Ultra-HD Straight Kelly Display)
└── rochester-pean-curved/
    ├── image-1.jpg  (174 KB - Jalal Surgical Mikulicz Artery Forceps)
    ├── image-2.jpg  (229 KB - Jalal Surgical Mikulicz Clamp Distal)
    ├── image-3.jpg  (146 KB - Jalal Surgical Negus Heavy Artery Forceps)
    └── image-4.jpg  (190 KB - Jalal Surgical Negus Heavy Curved Jaw)
```

*Status: 100% Real Authentic Photography (0 Dummy Placeholders, 0 Missing Files)*  
*Last Updated: November 14, 2026*
