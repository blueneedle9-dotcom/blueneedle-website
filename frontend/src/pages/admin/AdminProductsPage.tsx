import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CatalogItem, VANGUARD_CATALOG } from "../../data/catalog";

const POPULAR_SIZES = [
  '120 mm (4¾")',
  '140 mm (5½")',
  '160 mm (6¼")',
  '180 mm (7")',
  '200 mm (8")',
  '230 mm (9")',
  '260 mm (10¼")',
];

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<CatalogItem[]>(() => {
    // Enrich default catalog with sample size variations and multi-images if absent
    return VANGUARD_CATALOG.map((item) => ({
      ...item,
      sizes: item.sizes || [item.length, '140 mm (5½")', '230 mm (9")'],
      images: item.images && item.images.length > 0 ? item.images : [item.image],
    }));
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [activeSizePopoverId, setActiveSizePopoverId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formDiscipline, setFormDiscipline] = useState("Scissors & Cutting");
  const [formMaterial, setFormMaterial] = useState("DIN 1.4117 (Cryogenic)");
  const [formFinish, setFormFinish] = useState("Electrolytic Satin Bead-Blast");
  const [formJaw, setFormJaw] = useState("Curved / Delicate");
  const [formNorm, setFormNorm] = useState("DIN 58298 / ISO 7153-1");
  const [formDesc, setFormDesc] = useState("");

  // Size variations state
  const [formSizes, setFormSizes] = useState<string[]>(['180 mm (7")']);
  const [newSizeInput, setNewSizeInput] = useState("");

  // Multiple Images state
  const [formImages, setFormImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenDrawer = (item?: CatalogItem) => {
    if (item) {
      setEditingItem(item);
      setFormName(item.name);
      setFormSku(item.sku);
      setFormDiscipline(item.discipline);
      setFormMaterial(item.material);
      setFormFinish(item.finish);
      setFormJaw(item.jawProfile);
      setFormNorm(item.norm);
      setFormDesc(item.description);
      setFormSizes(item.sizes && item.sizes.length > 0 ? item.sizes : [item.length]);
      setFormImages(item.images && item.images.length > 0 ? item.images : [item.image]);
    } else {
      setEditingItem(null);
      setFormName("");
      setFormSku(`VSP-${Math.floor(1000 + Math.random() * 9000)}-TC`);
      setFormDiscipline("Forceps & Clamps");
      setFormMaterial("DIN 1.4117 Cryogenic Martensitic");
      setFormFinish("Electrolytic Satin Bead-Blast");
      setFormJaw("Straight / Delicate");
      setFormNorm("DIN 58298 / ISO 7153-1");
      setFormDesc("");
      setFormSizes(['140 mm (5½")', '180 mm (7")', '230 mm (9")']);
      setFormImages([
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0",
      ]);
    }
    setDrawerOpen(true);
  };

  // Add / Remove Sizes
  const handleAddSize = () => {
    if (newSizeInput.trim() && !formSizes.includes(newSizeInput.trim())) {
      setFormSizes((prev) => [...prev, newSizeInput.trim()]);
      setNewSizeInput("");
    }
  };

  const handleQuickAddSize = (sz: string) => {
    if (!formSizes.includes(sz)) {
      setFormSizes((prev) => [...prev, sz]);
    }
  };

  const handleRemoveSize = (sz: string) => {
    if (formSizes.length <= 1) {
      alert("At least one size variation is required.");
      return;
    }
    setFormSizes((prev) => prev.filter((s) => s !== sz));
  };

  // Multiple Image Uploader Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    // Convert selected image files to data URLs
    const readers: Promise<string>[] = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImgUrls) => {
      setFormImages((prev) => [...prev, ...newImgUrls]);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetPrimaryImage = (index: number) => {
    setFormImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (formImages.length === 0) {
      alert("Please upload at least one product image.");
      return;
    }

    const primaryImage = formImages[0];
    const primaryLength = formSizes[0] || '180 mm (7")';

    if (editingItem) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                name: formName,
                sku: formSku,
                discipline: formDiscipline,
                material: formMaterial,
                finish: formFinish,
                length: primaryLength,
                sizes: formSizes,
                jawProfile: formJaw,
                norm: formNorm,
                description: formDesc,
                image: primaryImage,
                images: formImages,
              }
            : p
        )
      );
    } else {
      const newItem: CatalogItem = {
        id: formSku,
        sku: formSku,
        name: formName,
        discipline: formDiscipline,
        material: formMaterial,
        finish: formFinish,
        length: primaryLength,
        sizes: formSizes,
        jawProfile: formJaw,
        norm: formNorm,
        description: formDesc,
        image: primaryImage,
        images: formImages,
        imageAlt: formName,
        tag: "New Catalog Release",
      };
      setProducts((prev) => [newItem, ...prev]);
    }
    setDrawerOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Decommission SKU ${name} from Swiss node active catalog?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((prod) => {
    const matchSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || prod.discipline === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg lg:p-margin flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
        {/* Header Breadcrumbs & Action Bar */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline tracking-wider uppercase mb-1">
                <span>Operations</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span>Console</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span>Products Directory</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Surgical Products Management
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-0.5">
                Centralized registry of certified instruments, metallurgy grades, size variations, multi-angle imagery, and ISO specifications.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
              <button
                type="button"
                onClick={() => alert("Synchronizing with ISO 13485 Central Node...")}
                className="inline-flex items-center gap-space-xs px-space-md py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">sync</span>
                <span>Audit Sync</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenDrawer()}
                className="inline-flex items-center gap-space-xs px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md rounded transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Create New Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search, Filter & Quick Metric Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
          <div className="md:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Instrument Name, SKU, or Discipline..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-sm font-body-sm rounded-lg border border-outline-variant/30 focus:border-primary-container outline-none transition-all shadow-sm"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-lowest text-on-surface text-body-sm font-body-sm rounded-lg border border-outline-variant/30 focus:border-primary-container outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Disciplines (10)</option>
              <option value="Forceps & Clamps">Forceps & Clamps</option>
              <option value="Dental & Maxillofacial">Dental & Maxillofacial</option>
              <option value="Orthopedic Suite">Orthopedic Suite</option>
              <option value="Scissors & Cutting">Scissors & Cutting</option>
              <option value="Needle Holders">Needle Holders</option>
              <option value="Retractors & Specula">Retractors & Specula</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-lowest text-on-surface text-body-sm font-body-sm rounded-lg border border-outline-variant/30 focus:border-primary-container outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Statuses (Active & Staged)</option>
              <option value="Active">Active Production</option>
              <option value="Staged">Staged for Review</option>
            </select>
          </div>
        </div>

        {/* Master Catalog Data Table */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-space-md px-space-md w-12 text-center">
                    <input
                      type="checkbox"
                      onChange={handleToggleSelectAll}
                      checked={selectedIds.length === products.length && products.length > 0}
                      className="rounded accent-primary-container cursor-pointer"
                    />
                  </th>
                  <th className="py-space-md px-space-md">Instrument Spec</th>
                  <th className="py-space-md px-space-md">Discipline</th>
                  <th className="py-space-md px-space-md">Size Variations</th>
                  <th className="py-space-md px-space-md">Imagery</th>
                  <th className="py-space-md px-space-md">Metallurgy / Norm</th>
                  <th className="py-space-md px-space-md">Status</th>
                  <th className="py-space-md pr-space-md pl-space-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm">
                {filteredProducts.map((prod) => {
                  const isChecked = selectedIds.includes(prod.id);
                  const sizesList = prod.sizes || [prod.length];
                  const imgCount = prod.images ? prod.images.length : 1;

                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-surface-container-low/60 transition-colors ${
                        isChecked ? "bg-primary-fixed/20" : ""
                      }`}
                    >
                      <td className="py-space-md px-space-md text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(prod.id)}
                          className="rounded accent-primary-container cursor-pointer"
                        />
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover bg-surface-container shrink-0 border border-outline-variant/20 shadow-xs"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-primary text-sm truncate">
                              {prod.name}
                            </span>
                            <span className="text-xs text-outline font-mono">
                              REF: {prod.sku}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-xs font-medium text-on-surface">
                          {prod.discipline}
                        </span>
                      </td>
                      <td className="py-space-md px-space-md">
                        {/* Interactive Variation Badge with Popover and Quick Selector */}
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveSizePopoverId(
                                activeSizePopoverId === prod.id ? null : prod.id
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 hover:border-primary text-xs font-mono transition-all text-left shadow-2xs group"
                          >
                            <span className="material-symbols-outlined text-[15px] text-primary">
                              straighten
                            </span>
                            <span className="font-semibold text-primary">
                              {sizesList[0] || prod.length}
                            </span>
                            {sizesList.length > 1 && (
                              <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[10px] font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                +{sizesList.length - 1} more
                              </span>
                            )}
                            <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-transform">
                              {activeSizePopoverId === prod.id ? "expand_less" : "expand_more"}
                            </span>
                          </button>

                          {/* Variations Popover Dropdown */}
                          {activeSizePopoverId === prod.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActiveSizePopoverId(null)}
                              />
                              <div className="absolute left-0 mt-1.5 w-60 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-2.5 z-50 animate-fadeIn">
                                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-outline-variant/20">
                                  <span className="text-[10px] uppercase font-bold text-outline tracking-wider flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">tune</span>
                                    <span>Size Matrix ({sizesList.length})</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveSizePopoverId(null);
                                      handleOpenDrawer(prod);
                                    }}
                                    className="text-[10px] font-bold text-primary hover:underline"
                                  >
                                    Edit Sizes
                                  </button>
                                </div>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                  {sizesList.map((sz, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                                        idx === 0
                                          ? "bg-primary/10 text-primary font-bold"
                                          : "hover:bg-surface-container text-on-surface"
                                      }`}
                                    >
                                      <span className="flex items-center gap-1.5">
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full ${
                                            idx === 0 ? "bg-primary" : "bg-outline"
                                          }`}
                                        />
                                        <span>{sz}</span>
                                      </span>
                                      {idx === 0 && (
                                        <span className="text-[10px] uppercase font-semibold text-primary">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-space-md px-space-md whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-outline text-[18px]">
                            photo_library
                          </span>
                          <span className="text-xs font-semibold text-on-surface">
                            {imgCount} {imgCount === 1 ? "Image" : "Images"}
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-on-surface">
                            {prod.material}
                          </span>
                          <span className="text-[11px] text-outline font-mono">
                            {prod.norm}
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-[11px] bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Active ISO
                        </span>
                      </td>
                      <td className="py-space-md pr-space-md pl-space-xs text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenDrawer(prod)}
                            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Edit Catalog Entry & Variations"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_square</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1.5 rounded-lg hover:bg-error-container text-outline hover:text-error transition-colors"
                            title="Decommission SKU"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low border-t border-outline-variant/20">
            <span className="text-xs text-outline font-mono">
              Showing {filteredProducts.length} of {products.length} registered instruments
            </span>
            <Link
              to="/products"
              target="_blank"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Preview Public Catalog <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Comprehensive Add / Edit Product Drawer Modal with Multi-Images & Size Variations */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-surface-container-lowest max-w-3xl w-full rounded-2xl shadow-2xl p-6 border border-outline-variant/30 my-8 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4 shrink-0">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  {editingItem ? "Specification & Variation Editor" : "New Surgical Instrument Registration"}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                  {editingItem ? `Edit SKU: ${editingItem.sku}` : "Register New Product & Variations"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSaveProduct} className="space-y-5 overflow-y-auto pr-1 flex-1">
              {/* SECTION 1: Basic Identifiers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>1. General Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Instrument Master Name *
                    </label>
                    <input
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none border border-outline-variant/30 focus:border-primary-container"
                      placeholder="e.g. DeBakey Atraumatic Forceps"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Master REF / SKU Code *
                    </label>
                    <input
                      required
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none font-mono border border-outline-variant/30 focus:border-primary-container"
                      placeholder="VSP-XXXX-TC"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Primary Discipline *
                    </label>
                    <select
                      value={formDiscipline}
                      onChange={(e) => setFormDiscipline(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none border border-outline-variant/30 cursor-pointer"
                    >
                      <option>Forceps & Clamps</option>
                      <option>Dental & Maxillofacial</option>
                      <option>Orthopedic Suite</option>
                      <option>Scissors & Cutting</option>
                      <option>Needle Holders</option>
                      <option>Retractors & Specula</option>
                      <option>General Surgery</option>
                      <option>Diagnostic & Micro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Metallurgy Grade *
                    </label>
                    <input
                      value={formMaterial}
                      onChange={(e) => setFormMaterial(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none border border-outline-variant/30"
                      placeholder="DIN 1.4117 Cryogenic Martensitic"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Surface Finish & Treatment
                    </label>
                    <input
                      value={formFinish}
                      onChange={(e) => setFormFinish(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none border border-outline-variant/30"
                      placeholder="Electrolytic Satin Bead-Blast / DLC Black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface uppercase mb-1">
                      Regulatory Standard / Norm
                    </label>
                    <input
                      value={formNorm}
                      onChange={(e) => setFormNorm(e.target.value)}
                      className="w-full bg-surface-container-low p-2.5 rounded-lg text-sm outline-none border border-outline-variant/30"
                      placeholder="DIN 58298 / ISO 7153-1"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Size Variations Builder */}
              <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">straighten</span>
                    <span>2. Size Variations (Lengths & Widths)</span>
                  </h4>
                  <span className="text-[11px] text-outline font-mono">
                    {formSizes.length} Variations Active
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 space-y-3">
                  {/* Current Active Sizes Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {formSizes.map((sz, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-on-surface shadow-xs"
                      >
                        {idx === 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" title="Primary default size"></span>
                        )}
                        <span>{sz}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(sz)}
                          className="hover:text-error text-outline transition-colors ml-1"
                          title="Remove variation"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Input for custom size */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSizeInput}
                      onChange={(e) => setNewSizeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSize();
                        }
                      }}
                      placeholder='Add custom size e.g. 150 mm (6") or 2.5 mm Jaw'
                      className="flex-1 bg-surface-container-lowest px-3 py-2 rounded-lg text-xs outline-none border border-outline-variant/30 focus:border-primary-container"
                    />
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shrink-0"
                    >
                      Add Size
                    </button>
                  </div>

                  {/* Popular Quick Presets */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[11px] text-outline font-medium">Quick Presets:</span>
                    {POPULAR_SIZES.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleQuickAddSize(preset)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                          formSizes.includes(preset)
                            ? "bg-primary/10 border-primary text-primary font-bold"
                            : "bg-surface-container-lowest border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline"
                        }`}
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Multiple Images Uploader */}
              <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                    <span>3. Product Images (Multi-File Uploader)</span>
                  </h4>
                  <span className="text-[11px] text-outline">
                    First image is Primary Thumbnail
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Drag-n-drop file dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/60 hover:border-primary rounded-xl p-6 text-center cursor-pointer bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                    </div>
                    <div>
                      <span className="font-semibold text-primary text-sm">
                        Click to browse or drop instrument photos
                      </span>
                      <p className="text-xs text-outline mt-0.5">
                        Supports PNG, JPG, WEBP, CAD Renderings • Select multiple files at once
                      </p>
                    </div>
                    {isUploading && (
                      <span className="text-xs text-primary font-bold animate-pulse">
                        Processing files...
                      </span>
                    )}
                  </div>

                  {/* Or add via URL */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Or paste external image URL (https://...)"
                      className="flex-1 bg-surface-container-low px-3 py-2 rounded-lg text-xs outline-none border border-outline-variant/30 focus:border-primary-container"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-lg text-xs font-semibold shrink-0"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Uploaded Images Gallery Strip with Reorder / Delete */}
                  {formImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                      {formImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 aspect-square shadow-xs"
                        >
                          <img
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Primary Badge */}
                          {idx === 0 && (
                            <span className="absolute top-1.5 left-1.5 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                              Primary
                            </span>
                          )}

                          {/* Action Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(idx)}
                                title="Make Primary"
                                className="p-1 rounded bg-white/80 hover:bg-white text-primary text-xs"
                              >
                                <span className="material-symbols-outlined text-[16px]">star</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              title="Delete Photo"
                              className="p-1 rounded bg-white/80 hover:bg-white text-error text-xs"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: Technical Description */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <label className="block text-xs font-semibold text-on-surface uppercase">
                  4. Clinical Specifications &amp; Reprocessing Instructions
                </label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-surface-container-low p-3 rounded-lg text-sm outline-none border border-outline-variant/30 h-24 focus:border-primary-container"
                  placeholder="Detail jaw teeth pattern, box lock hinge tolerance, autoclave sterilization validation (134°C steam), UDI laser etching specifications..."
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 shrink-0">
                <span className="text-xs text-outline">
                  {formImages.length} {formImages.length === 1 ? "Image" : "Images"} • {formSizes.length} Size Variations
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold text-sm transition-all shadow-sm"
                  >
                    {editingItem ? "Update Instrument Record" : "Save Product & Variations"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
