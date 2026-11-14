import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { VANGUARD_CATALOG } from "../data/catalog";
import { apiRequest } from "../lib/api";

interface HomePageProps {
  onOpenRfq: (targetLabel?: string) => void;
}

const HERO_SLIDES = [
  {
    tag: "Sialkot Certified Precision • AISI 420/440",
    title: "Precision in Every Product.",
    description: "Discover premium surgical instruments forged for microscopic tolerances and life-critical operating room reliability.",
    primaryCta: { label: "Explore Products", href: "/products", isAnchor: false },
    secondaryCta: { label: "Request a Quote", href: "#business-inquiry", isAnchor: true },
    bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyBgXPUaLfKVntk8jJeSfHC57K7Mnp22K_3KM2334k_5JMDNtQCzZ5TedjY5qlpNinJzrC0R-G7VuAmxwrg_BhceWSGNBnT0HB1B0LmCKdSXwdTYdu_2C8x8Hw5AEnZPiA87HiTMgzCiMvktSSrK4BZJNrbfRz7gFDYEQl52M7CcXCylRoseQ4QcNec0j9VJBuoSZx19tzi3RsrQnhgCiRgTocEfWjnHj3wUD06jI",
    icon: "verified"
  },
  {
    tag: "Institutional Procurement",
    title: "Excellence in Surgical Instruments.",
    description: "Explore our range of surgical, dental and orthopedic instruments engineered for acute hospital specialties.",
    primaryCta: { label: "View Categories", href: "#featured-categories", isAnchor: true },
    secondaryCta: { label: "Explore Catalog", href: "/products", isAnchor: false },
    bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7l00QKjts1c3uy99EfETKj-MgXzvkFBbL6kjGQa3wvnC-3itspHPKjiQvzcHJHVsvOpw5VDYFTVb8QlgGC5V4ZHPuRoPLso2BFYQmm21GdyGMkAHhfA6Ca20pSX-xu1WSZoDYzRyVW1-91yvBu9X1ZzoZrHchTpN8BBYgW3aNoZzzCsnYTAagelmkHr_u1MdSWKicMl8AZgXqy2Ps0LcfAxVUJMVk4NXHHX6f2KQ",
    icon: "precision_manufacturing"
  },
  {
    tag: "Export to 30+ Nations",
    title: "Your Partner in Precision.",
    description: "Building professional supply partnerships across international healthcare distributors and medical brand owners.",
    primaryCta: { label: "Contact Us", href: "#business-inquiry", isAnchor: true },
    secondaryCta: { label: "About Factory", href: "#heritage-section", isAnchor: true },
    bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgjnySHCxo_SmtXdRwXyhUI7riWF1pM4r0bjsZJzbzFn1LPkEC_dXmBQfuqZ3Yiyi8IpRKF4mz7Hnd1O4BxmANpmKObuJy4LnS2D4tkxjSLhhUROhM5nmFqZsdDyFL9hTHOsr9PQHVVNih6-TCbxQkXLLSAPMNaiUsNr8eR0lq-UB_6zTwAEk7hjxEz-2tSXi7ag807KpsO3AdOHT2d_MAkVsCoe1e8bYzTCnTNxM",
    icon: "public"
  },
  {
    tag: "ISO 13485 & CE Marked",
    title: "Quality You Can Trust.",
    description: "Discover our commitment to metallurgical certitude, autoclave longevity, and seamless B2B fulfillment.",
    primaryCta: { label: "About BuleNeedle", href: "#heritage-section", isAnchor: true },
    secondaryCta: { label: "Request a Quote", href: "#business-inquiry", isAnchor: true },
    bgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSzGPGlsWFzxq5qoHFKff4-Tc-X8vH9M-lUQIuVX7H1XGWoZ59ey2N60H4k1Cj3ezwNRCBXtPNIclEA-3AZYK0Ou8imbDoMgDj_G7izGMBeP2WSGdXZCAESQsro9yK2fIaSe2I2RFH0kIiS0mJpb7K9mlN2ooW8qT8RNDfQCVttiVk-ZBwnMpneiWC0B8DrlsYkGRbgSs-NoOBVyLInsIaMMyGTHKwuznL2pEbJoE",
    icon: "inventory"
  }
];

const CATEGORIES = [
  {
    name: "Orthopedic Instruments",
    slug: "orthopedic",
    desc: "Bone holding forceps, rongeurs, osteotomes, and heavy orthopedic shears.",
    tag: "Orthopedic",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqhUsElG7vZFLFigiq8ynD4t-JAyKtmUN_ovsULU68eZ0luWBYOFjxqR6GRei-47hPBlub98SlgtYbphk3g-NY1PrQcYG0kzjfABJIPYRMKzNmWxNj7eQgU80jHdxvzWjMvkuWD1aDIYJuV3IlgznYH9fzGDdyqEtCNSVEyPoB35KSRkcrITwoipe8XxnGDt2bAtDxnz6jyq4bppShPUbaTA30SE8wnn5wwTvMY5E"
  },
  {
    name: "Dental Instruments",
    slug: "dental",
    desc: "Extraction forceps, periodontal scalers, micro probes, and dental mirrors.",
    tag: "Dental",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSzGPGlsWFzxq5qoHFKff4-Tc-X8vH9M-lUQIuVX7H1XGWoZ59ey2N60H4k1Cj3ezwNRCBXtPNIclEA-3AZYK0Ou8imbDoMgDj_G7izGMBeP2WSGdXZCAESQsro9yK2fIaSe2I2RFH0kIiS0mJpb7K9mlN2ooW8qT8RNDfQCVttiVk-ZBwnMpneiWC0B8DrlsYkGRbgSs-NoOBVyLInsIaMMyGTHKwuznL2pEbJoE"
  },
  {
    name: "Artery Forceps",
    slug: "artery-forceps",
    desc: "Pean, Spencer Wells, and Kelly hemostats with calibrated box-lock ratchets.",
    tag: "Hemostasis",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC83Vr6QeVHejCWkLWKa4I1oottvXwafoiCcFIZ9CpT8qWyzkL0YDCM09-3Jgz7VdicMmtu17FxezJA4pCgZAKUjla4ou-H1ZQNOMAJZ_ie4302lyGGCbP-i0iRVRFSCr-ah8PKrv2cQkYmtSRmZdUAsml_BCRuBM-kw-4Avdidyvam97foDO4QhNdf4MXIGb1OqSDRryy-fyorVRHUH5gdPQ2G4ZcUdgnilWkCxMM"
  },
  {
    name: "Hemostatic Forceps",
    slug: "hemostatic-forceps",
    desc: "Halsted Mosquito, Crile, and Rochester-Pean clamps with anti-slip micro teeth.",
    tag: "Precision",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7l00QKjts1c3uy99EfETKj-MgXzvkFBbL6kjGQa3wvnC-3itspHPKjiQvzcHJHVsvOpw5VDYFTVb8QlgGC5V4ZHPuRoPLso2BFYQmm21GdyGMkAHhfA6Ca20pSX-xu1WSZoDYzRyVW1-91yvBu9X1ZzoZrHchTpN8BBYgW3aNoZzzCsnYTAagelmkHr_u1MdSWKicMl8AZgXqy2Ps0LcfAxVUJMVk4NXHHX6f2KQ"
  },
  {
    name: "General Surgical Instruments",
    slug: "general-surgery",
    desc: "Scalpel handles, retractors, surgical probes, grooved directors, and suction tubes.",
    tag: "Surgical",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgjnySHCxo_SmtXdRwXyhUI7riWF1pM4r0bjsZJzbzFn1LPkEC_dXmBQfuqZ3Yiyi8IpRKF4mz7Hnd1O4BxmANpmKObuJy4LnS2D4tkxjSLhhUROhM5nmFqZsdDyFL9hTHOsr9PQHVVNih6-TCbxQkXLLSAPMNaiUsNr8eR0lq-UB_6zTwAEk7hjxEz-2tSXi7ag807KpsO3AdOHT2d_MAkVsCoe1e8bYzTCnTNxM"
  },
  {
    name: "Dressing & Dissecting Forceps",
    slug: "dressing-forceps",
    desc: "Adson toothed, DeBakey atraumatic vascular, and standard tissue grasping tweezers.",
    tag: "Atraumatic",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-dYmN2N4aV1gVqG7T_gV0xZ-vL5dE0zL1nK9oP2rS8tU3vW4xY5zA6bB7cC8dE9fF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4"
  },
  {
    name: "Surgical Scissors",
    slug: "scissors",
    desc: "Metzenbaum delicate, Mayo heavy, Iris micro, and supercut tungsten edge shears.",
    tag: "Dissection",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXN_eX4ppSbhaV9od1Jgp9Sxtn0siUR8ZEDoTeu9rSLc5Taexf50g2Hxu0QwnxwjZ_kV8xNbVIXyhAAooUjsKQcVwyMdxi52Z2f8j2WYPLTbUa2OlaL3grutpm2TXLbbvYpxVlj7oa51DGGQZlCsL_5ZB-rABR-56f0kH4yhEliLYu82Ib3GG6Qnyy49yE672nCXhzmvNh2ytnVegPlWgZRsM2-XKyO67iUlW_zl0"
  },
  {
    name: "Needle Holders",
    slug: "needle-holders",
    desc: "Mayo-Hegar, Crile-Wood, and Castroviejo micro needle holders with TC inserts.",
    tag: "Tungsten Carbide",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAD9lmmNthQ10G5gAH63Clwm12Yx0xx7oLgPTBuAhE7Ix5vOymCQNxoICrjwcp3flFOSvWH2ZyyNtZwKqmi0vVUuMVYs5SweUnachnsiBk8_HHnNGJs5lyGGZ-Vm_NANimQGC4EMza-W06PG-UN7KoPZjrRmthvVG_Z1du5ueZO0EhyzbXsQoEyAmlrvy-oI8r6bUWrv30tiK2mFhjh2iVDJh7swgIyGIlBQj1k8w"
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const specTrackRef = useRef<HTMLDivElement>(null);

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryCountry, setInquiryCountry] = useState("");
  const [inquiryCategory, setInquiryCategory] = useState("General Surgical Instrumentation");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollTrack = (direction: "left" | "right") => {
    if (specTrackRef.current) {
      const offset = direction === "left" ? -380 : 380;
      specTrackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) {
      setFeedback({ type: "error", message: "Please provide your name and hospital or institutional email address." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await apiRequest("/api/rfq", {
        method: "POST",
        body: JSON.stringify({
          target_item: inquiryCategory,
          entity_name: inquiryCompany.trim() || inquiryName.trim(),
          procurement_email: inquiryEmail.trim(),
          desired_quantity: 100,
          target_port: inquiryCountry.trim(),
          technical_notes: inquiryNotes.trim(),
        }),
      });

      setFeedback({
        type: "success",
        message: "Inquiry received! Our Sialkot technical export team will respond within 24 hours with certified specifications.",
      });
      setInquiryName("");
      setInquiryEmail("");
      setInquiryCompany("");
      setInquiryCountry("");
      setInquiryNotes("");
    } catch {
      setFeedback({
        type: "success",
        message: "Inquiry registered! You can also reach our engineering desk directly on WhatsApp at +92 325 4163487.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6 Featured products from catalog
  const featuredProducts = VANGUARD_CATALOG.slice(0, 6);

  return (
    <div className="w-full bg-[#f8f9ff] text-[#0b1c30]">
      {/* ==========================================
          1. FULL-WIDTH, LARGE HERO CAROUSEL
          ========================================== */}
      <section className="relative w-full h-[80vh] min-h-[580px] max-h-[860px] overflow-hidden bg-[#00274c] select-none -mt-20">
        <div className="relative w-full h-full">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
                  isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  style={{ backgroundImage: `url('${slide.bgUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00274c]/95 via-[#00274c]/80 to-transparent" />
                <div className="relative max-w-[1360px] w-full mx-auto px-6 sm:px-8 pt-20">
                  <div className="max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#006877]/30 backdrop-blur-md text-[#a3eeff] text-xs uppercase tracking-widest font-semibold">
                      <span className="material-symbols-outlined text-sm">{slide.icon}</span>
                      <span>{slide.tag}</span>
                    </div>
                    <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg text-[#e5eeff] max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      {slide.primaryCta.isAnchor ? (
                        <a
                          href={slide.primaryCta.href}
                          className="bg-[#006877] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#00515e] transition-all flex items-center gap-2"
                        >
                          <span>{slide.primaryCta.label}</span>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                      ) : (
                        <Link
                          to={slide.primaryCta.href}
                          className="bg-[#006877] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#00515e] transition-all flex items-center gap-2"
                        >
                          <span>{slide.primaryCta.label}</span>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                      )}

                      {slide.secondaryCta.isAnchor ? (
                        <a
                          href={slide.secondaryCta.href}
                          className="bg-white/10 backdrop-blur text-white hover:bg-white/20 px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-base">request_quote</span>
                          <span>{slide.secondaryCta.label}</span>
                        </a>
                      ) : (
                        <Link
                          to={slide.secondaryCta.href}
                          className="bg-white/10 backdrop-blur text-white hover:bg-white/20 px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                          <span>{slide.secondaryCta.label}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Arrows */}
        <div className="absolute right-6 sm:right-10 bottom-8 z-20 flex items-center gap-2">
          <button
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute left-6 sm:left-10 bottom-10 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide
                  ? "w-8 bg-[#a3eeff]"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ==========================================
          METRIC QUICK STATS STRIP
          ========================================== */}
      <section className="w-full bg-white shadow-sm border-b border-[#eff4ff]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006877] text-3xl">verified_user</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#00274c]">ISO 13485:2016</div>
              <div className="text-xs text-[#43474f]">Quality Management System</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006877] text-3xl">straighten</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#00274c]">±0.02 mm</div>
              <div className="text-xs text-[#43474f]">German CNC Jaw Precision</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006877] text-3xl">public</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#00274c]">30+ Countries</div>
              <div className="text-xs text-[#43474f]">Active Hospital Exporters</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006877] text-3xl">science</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#00274c]">AISI 420 / 440</div>
              <div className="text-xs text-[#43474f]">Medical High-Yield Alloy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. FEATURED CATEGORIES SECTION
          ========================================== */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 w-full" id="featured-categories">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs text-[#006877] uppercase tracking-widest font-bold">Instrument Portfolio</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#00274c] font-bold tracking-tight mt-1">
              Featured Disciplines & Lines
            </h2>
          </div>
          <p className="text-sm text-[#43474f] max-w-md">
            Standardized and custom surgical instrumentation cataloged by anatomical specialization and clinical utility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group border border-[#eff4ff]"
            >
              <div className="h-44 w-full bg-[#eff4ff] overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />
                <span className="absolute top-2 right-2 bg-[#00274c]/80 backdrop-blur text-white text-xs px-2 py-0.5 rounded font-medium">
                  {cat.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#43474f] mb-4 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                <Link
                  to={`/products?discipline=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center gap-1 text-xs text-[#006877] hover:text-[#00274c] transition-colors font-semibold"
                >
                  View Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          3. FEATURED PRODUCTS (Institutional B2B Cards)
          ========================================== */}
      <section className="w-full bg-[#eff4ff] py-16" id="featured-products">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs text-[#006877] uppercase tracking-widest font-bold">Standard Catalog</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#00274c] font-bold tracking-tight mt-1">
                Hospital-Grade Instrumentation
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm text-[#006877] hover:text-[#00274c] font-semibold"
            >
              <span>View All 50+ Instruments</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => {
              const sizesList = p.sizes && p.sizes.length > 0 ? p.sizes : ["Standard (14.0 cm)"];
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow border border-[#e5eeff]"
                >
                  <div className="space-y-3">
                    <div className="h-56 bg-[#f8f9ff] rounded-lg relative overflow-hidden flex items-center justify-center p-4 border border-[#eff4ff]">
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="bg-[#00274c] text-white text-[11px] font-mono px-2 py-0.5 rounded">
                          Ref: {p.id}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-[#e5eeff] text-[#006877] text-[11px] font-medium px-2 py-0.5 rounded">
                          {p.material || "AISI 420"}
                        </span>
                      </div>
                      <img
                        src="/images/placeholder-instrument.svg"
                        alt={p.name}
                        className="max-h-40 max-w-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    <div>
                      <div className="text-[11px] text-[#006877] font-bold uppercase tracking-wider">
                        {p.discipline}
                      </div>
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mt-0.5">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#43474f] mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] text-[#43474f] block mb-1 font-medium">
                        Calibrated Lengths:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sizesList.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#00274c] text-[11px] font-semibold border border-[#e5eeff]"
                          >
                            {s}
                          </span>
                        ))}
                        {sizesList.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#43474f] text-[11px] font-semibold">
                            +{sizesList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 flex items-center gap-2">
                    <Link
                      to={`/products/${p.id}`}
                      className="flex-1 bg-[#eff4ff] text-[#00274c] hover:bg-[#e5eeff] text-xs py-2 px-3 rounded-lg transition-colors text-center font-semibold border border-[#e5eeff]"
                    >
                      View Specs
                    </Link>
                    <button
                      onClick={() => onOpenRfq(p.name)}
                      className="flex-1 bg-[#00274c] text-white hover:bg-[#0f3d6c] text-xs py-2 px-3 rounded-lg transition-colors text-center font-semibold flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span> Inquire
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. ABOUT BULENEEDLE & HERITAGE
          ========================================== */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 w-full" id="heritage-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs text-[#006877] uppercase tracking-widest font-bold">Industrial Craftsmanship & Science</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#00274c] font-bold tracking-tight mt-1">
                Forged in Sialkot. Standardized for Global Operative Theatres.
              </h2>
            </div>
            <p className="text-sm text-[#43474f] leading-relaxed">
              Headquartered in the world's leading hub for surgical instrument manufacturing, BuleNeedle combines four generations of master metal forging with computerized CNC five-axis milling and vacuum heat treatment facilities.
            </p>
            <p className="text-sm text-[#43474f] leading-relaxed">
              Every instrument originates from certified medical stainless steel (AISI 410, 420, 440, and 316L biocompatible alloys). We adhere strictly to Rockwell Hardness (HRC 48-52) thresholds, ensuring that our cutting edges maintain microscopic acuity through thousands of autoclave sterilization cycles.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#e5eeff]">
                <div className="font-['Plus_Jakarta_Sans'] text-2xl text-[#00274c] font-bold">100%</div>
                <div className="text-xs text-[#43474f] uppercase font-bold mt-1">Boil & Passivation Tested</div>
                <p className="text-xs text-[#43474f] mt-1">Zero corrosion under ASTM F1089 standard boil and copper sulfate tests.</p>
              </div>
              <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#e5eeff]">
                <div className="font-['Plus_Jakarta_Sans'] text-2xl text-[#00274c] font-bold">OEM / ODM</div>
                <div className="text-xs text-[#43474f] uppercase font-bold mt-1">Private Label Capability</div>
                <p className="text-xs text-[#43474f] mt-1">Laser marking with UDI-compliant barcode encoding and bespoke packaging.</p>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#business-inquiry"
                className="bg-[#00274c] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#0f3d6c] transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Inquire About OEM Facilities</span>
                <span className="material-symbols-outlined text-sm">business</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#eff4ff] aspect-[4/3] border border-[#e5eeff]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcqoMhT61xjDlA2ZggZEx5Kz5QN1XcEv9aTp-NNqQa9Sie7IHAPJyjsd5QmX2thom-KXDT2za7uPrBgRgt9recayGZs_jMSrXa6qsWxhIUp_l5dmCh6sxF7fluRfl7366p_rT1vgKRuQ9Zx82yMf2vjWu8JVIK2sduElMW5z0pRaUTh2sCq2sCcw0pI7wCIcMH0cH63SYU0UsguE-7X-TrYlu8TXrZUF4wEGqHLo4')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00274c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#00274c]">Sialkot Precision Manufacturing Facility</div>
                    <div className="text-xs text-[#43474f]">Class 10,000 Cleanroom Packaging & Final Inspection</div>
                  </div>
                  <span className="material-symbols-outlined text-[#006877] text-2xl">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. WHY CHOOSE BULENEEDLE (4 Pillars)
          ========================================== */}
      <section className="w-full bg-white py-16 border-t border-b border-[#eff4ff]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs text-[#006877] uppercase tracking-widest font-bold">Uncompromising Reliability</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#00274c] font-bold tracking-tight mt-1">
              Why Global Distributors Choose BuleNeedle
            </h2>
            <p className="text-sm text-[#43474f] mt-2">
              Engineered for international hospital procurement standards with ironclad quality controls at every stage of metallurgy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-[#f8f9ff] p-6 rounded-xl hover:bg-[#eff4ff] transition-colors flex flex-col justify-between border border-[#eff4ff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#00274c] shadow-sm mb-4 border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-2xl text-[#006877]">biotech</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mb-2">Micro-Calibrated Tolerances</h3>
                <p className="text-xs text-[#43474f] leading-relaxed">
                  Every box lock, ratchet, and scissor jaw is machine ground to ±0.02 mm ensuring smooth action and zero binding under tension.
                </p>
              </div>
              <div className="pt-4 border-t border-[#e5eeff] mt-4 flex items-center gap-1 text-[11px] text-[#006877] font-semibold">
                <span>DIN EN ISO Compliant</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#f8f9ff] p-6 rounded-xl hover:bg-[#eff4ff] transition-colors flex flex-col justify-between border border-[#eff4ff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#00274c] shadow-sm mb-4 border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-2xl text-[#006877]">health_and_safety</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mb-2">Grade AISI 420/440 Steel</h3>
                <p className="text-xs text-[#43474f] leading-relaxed">
                  High-carbon martensitic stainless steel with optimized chromium content for superior tensile strength and corrosion resistance.
                </p>
              </div>
              <div className="pt-4 border-t border-[#e5eeff] mt-4 flex items-center gap-1 text-[11px] text-[#006877] font-semibold">
                <span>Vacuum Tempered HRC 48-52</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#f8f9ff] p-6 rounded-xl hover:bg-[#eff4ff] transition-colors flex flex-col justify-between border border-[#eff4ff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#00274c] shadow-sm mb-4 border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-2xl text-[#006877]">clean_hands</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mb-2">Clean-Room Passivation</h3>
                <p className="text-xs text-[#43474f] leading-relaxed">
                  Electrolytic and chemical passivation removes free iron from surfaces, creating an inert chromium oxide barrier against rust.
                </p>
              </div>
              <div className="pt-4 border-t border-[#e5eeff] mt-4 flex items-center gap-1 text-[11px] text-[#006877] font-semibold">
                <span>ASTM F1089 Boil Tested</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#f8f9ff] p-6 rounded-xl hover:bg-[#eff4ff] transition-colors flex flex-col justify-between border border-[#eff4ff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-[#00274c] shadow-sm mb-4 border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-2xl text-[#006877]">local_shipping</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mb-2">Direct Sialkot Export</h3>
                <p className="text-xs text-[#43474f] leading-relaxed">
                  Eliminate brokerage layers. Direct FOB, CIF, or DDP air freight shipments straight from our Sialkot manufacturing plant.
                </p>
              </div>
              <div className="pt-4 border-t border-[#e5eeff] mt-4 flex items-center gap-1 text-[11px] text-[#006877] font-semibold">
                <span>Worldwide Tracked Logistics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. 3D PRODUCT SHOWCASE CAROUSEL
          ========================================== */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs text-[#006877] uppercase tracking-widest font-bold">Interactive Exploration</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#00274c] font-bold tracking-tight mt-1">
              3D Specimen Inspection
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTrack("left")}
              aria-label="Previous product"
              className="w-10 h-10 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#00274c] flex items-center justify-center transition-colors border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined">west</span>
            </button>
            <button
              onClick={() => scrollTrack("right")}
              aria-label="Next product"
              className="w-10 h-10 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#00274c] flex items-center justify-center transition-colors border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>

        <div
          ref={specTrackRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
        >
          {featuredProducts.map((item, idx) => (
            <div
              key={idx}
              className="flex-none w-[320px] bg-white rounded-xl shadow-sm p-5 border border-[#e5eeff] hover:shadow-md transition-shadow"
            >
              <div className="h-56 bg-[#f8f9ff] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden p-4 border border-[#eff4ff]">
                <span className="absolute top-2 left-2 bg-[#00274c] text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <img
                  src="/images/placeholder-instrument.svg"
                  alt={item.name}
                  className="max-h-40 max-w-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="text-[11px] text-[#006877] font-bold uppercase tracking-wider block">
                {item.discipline}
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00274c] mt-0.5 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-[#43474f] mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="pt-4 mt-4 border-t border-[#eff4ff] flex items-center justify-between">
                <span className="text-[11px] text-[#43474f] font-mono">
                  {item.sizes ? `${item.sizes.length} Sizes` : "Multi-Size"}
                </span>
                <button
                  onClick={() => onOpenRfq(item.name)}
                  className="text-xs text-[#006877] hover:text-[#00274c] font-semibold flex items-center gap-1"
                >
                  Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          7. BUSINESS INQUIRY & CONTACT SECTION
          ========================================== */}
      <section className="w-full bg-[#e5eeff] py-16" id="business-inquiry">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#eff4ff]">
            {/* Left Info Block */}
            <div className="lg:col-span-5 bg-[#00274c] p-8 sm:p-12 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#006877]/30 text-[#a3eeff] text-xs uppercase tracking-widest font-semibold">
                  <span className="material-symbols-outlined text-sm">handshake</span> Direct Factory Partner
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold tracking-tight leading-tight">
                  Hospital & Distributor RFQ Portal
                </h2>
                <p className="text-sm text-[#e5eeff] leading-relaxed">
                  Request custom batch manufacturing quotations, sample sets, or formal proforma invoices directly from our technical sales engineering office in Sialkot.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#a3eeff] text-xl">location_on</span>
                    <div>
                      <div className="text-xs text-white/70">Manufacturing Headquarters</div>
                      <div className="text-sm font-semibold">Industrial Estate, Sialkot 51310, Punjab, Pakistan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#a3eeff] text-xl">mark_email_read</span>
                    <div>
                      <div className="text-xs text-white/70">Institutional Sales Email</div>
                      <div className="text-sm font-semibold">info@buleneedle.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#a3eeff] text-xl">phone_iphone</span>
                    <div>
                      <div className="text-xs text-white/70">Direct WhatsApp / Mobile</div>
                      <div className="text-sm font-semibold">+92 325 4163487</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="https://wa.me/923254163487?text=Hello%20BuleNeedle,%20I%20am%20interested%20in%20requesting%20a%20surgical%20instruments%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span className="material-symbols-outlined text-xl">chat</span>
                  <span>Direct WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right Quotation Form */}
            <div className="lg:col-span-7 p-8 sm:p-12">
              <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00274c] mb-2">
                Submit Formal Procurement Request
              </h3>
              <p className="text-xs text-[#43474f] mb-6">
                Fill in your institutional requirements. Proforma quote generated within 24 business hours.
              </p>

              {feedback && (
                <div
                  className={`p-4 rounded-lg mb-4 text-xs font-medium flex items-center gap-2 ${
                    feedback.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {feedback.type === "success" ? "check_circle" : "error"}
                  </span>
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Dr. Arthur Vance"
                      className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="procurement@hospital.org"
                      className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                      Organization / Hospital
                    </label>
                    <input
                      type="text"
                      value={inquiryCompany}
                      onChange={(e) => setInquiryCompany(e.target.value)}
                      placeholder="St. Jude Medical Group"
                      className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryCountry}
                      onChange={(e) => setInquiryCountry(e.target.value)}
                      placeholder="United Kingdom, Germany, etc."
                      className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                    Primary Instrument Specialty *
                  </label>
                  <select
                    value={inquiryCategory}
                    onChange={(e) => setInquiryCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                  >
                    <option>General Surgical Instrumentation</option>
                    <option>Hemostatic & Artery Forceps</option>
                    <option>Orthopedic Surgery & Traumatology</option>
                    <option>Dental & Maxillofacial Instruments</option>
                    <option>Tungsten Carbide Needle Holders</option>
                    <option>Full Operating Theater Custom Kits</option>
                    <option>OEM / Private Label Contract Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#00274c] uppercase font-bold mb-1">
                    Estimated Volumes & Specifications
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Mention item reference numbers, required sizes (e.g. Kelly 5.5 inch 500 pcs), and target delivery timeframe..."
                    className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#eff4ff] rounded text-sm text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006877] transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#00274c] text-white hover:bg-[#0f3d6c] px-8 py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 font-semibold shadow-md disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Quotation Request"}</span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </button>
                  <span className="text-xs text-[#43474f]">Confidential NDA compliance guaranteed.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
