import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CatalogItem, VANGUARD_CATALOG } from "../../data/catalog";

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<CatalogItem[]>(VANGUARD_CATALOG);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Drawer / Modal state for adding or editing
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formDiscipline, setFormDiscipline] = useState("Scissors & Cutting");
  const [formMaterial, setFormMaterial] = useState("DIN 1.4117 (Cryogenic)");
  const [formFinish, setFormFinish] = useState("Electrolytic Satin Bead-Blast");
  const [formLength, setFormLength] = useState('180 mm (7")');
  const [formJaw, setFormJaw] = useState("Curved / Delicate");
  const [formNorm, setFormNorm] = useState("DIN 58298 / ISO 7153-1");
  const [formDesc, setFormDesc] = useState("");

  const handleOpenDrawer = (item?: CatalogItem) => {
    if (item) {
      setEditingItem(item);
      setFormName(item.name);
      setFormSku(item.sku);
      setFormDiscipline(item.discipline);
      setFormMaterial(item.material);
      setFormFinish(item.finish);
      setFormLength(item.length);
      setFormJaw(item.jawProfile);
      setFormNorm(item.norm);
      setFormDesc(item.description);
    } else {
      setEditingItem(null);
      setFormName("");
      setFormSku(`VSP-${Math.floor(1000 + Math.random() * 9000)}-TC`);
      setFormDiscipline("General Surgery");
      setFormMaterial("DIN 1.4117 Martensitic");
      setFormFinish("Electrolytic Satin Bead-Blast");
      setFormLength("180 mm");
      setFormJaw("Straight / Delicate");
      setFormNorm("DIN 58298");
      setFormDesc("");
    }
    setDrawerOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
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
                length: formLength,
                jawProfile: formJaw,
                norm: formNorm,
                description: formDesc,
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
        length: formLength,
        jawProfile: formJaw,
        norm: formNorm,
        description: formDesc,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcd9pqEG_GaGJuoGiwmwS5alcTw2eI6B1-oMC5-0CQIRsNNAl4mrbM-J4aCPiDGfqQ3AroDyIf-SPu6BDZKNFEElYndsh7Q9zQH66XeBMya9envsg5RmXVRvagoskfABvRhotwx4rC1WocXFqU3kQ8MOGxKBufa_4xdtQEWuCutmDFVb6Pga-u6R54UO0R4BPyRMAZQH0Mu9e6qcqYkIMt0EfDyT2aT8SYQGdJvo0",
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

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
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
      !searchTerm.trim() ||
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.norm.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      categoryFilter === "All" || prod.discipline === categoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div className="w-full bg-surface min-h-[calc(100vh-4rem)]">
      <div className="w-full px-space-md lg:px-space-lg py-space-md flex flex-col gap-space-lg">
        {/* Page Title & Operational Stat Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Master Catalog Directory
              </span>
              <span className="w-1 h-1 rounded-full bg-outline"></span>
              <span className="font-label-sm text-label-sm text-outline font-mono">
                DIN EN ISO 13485:2016 Compliant
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary font-semibold">
              Products Management
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Manage precision surgical instrument catalog, technical CAD specifications, metallurgical certification alloys, and public tender procurement statuses.
            </p>
          </div>

          {/* Quick Global Metrics Chips */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="bg-surface-container-low px-space-md py-space-xs rounded-lg flex items-center gap-space-sm shadow-sm border border-outline-variant/20">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Active Inventory
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
                  1,814
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low px-space-md py-space-xs rounded-lg flex items-center gap-space-sm shadow-sm border border-outline-variant/20">
              <span className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container"></span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Draft / Review
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
                  28
                </span>
              </div>
            </div>
            <div className="bg-surface-container-low px-space-md py-space-xs rounded-lg flex items-center gap-space-sm shadow-sm border border-outline-variant/20">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Total SKUs
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
                  1,842
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Action Toolbar */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/20 flex flex-col gap-space-md">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
            {/* Search & Dynamic Filters */}
            <div className="flex flex-wrap items-center gap-space-sm flex-1">
              {/* Search Bar */}
              <div className="relative min-w-[280px] flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  search
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-low rounded-lg pl-10 pr-space-md py-space-xs font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors border border-outline-variant/20"
                  placeholder="Search by instrument name, SKU, DIN standard, or alloy..."
                  type="text"
                />
              </div>

              {/* Category Select */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-surface-container-low text-on-surface font-label-lg text-label-lg px-space-md py-space-xs pr-8 rounded-lg focus:outline-none cursor-pointer border border-outline-variant/20"
                >
                  <option value="All">All Categories</option>
                  <option value="Scissors & Cutting">Scissors &amp; Cutting</option>
                  <option value="Forceps & Clamps">Forceps &amp; Clamps</option>
                  <option value="Needle Holders">Needle Holders</option>
                  <option value="Retractors & Specula">Retractors &amp; Specula</option>
                  <option value="Orthopedic Suite">Orthopedic Suite</option>
                </select>
              </div>

              {/* Status Select */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-surface-container-low text-on-surface font-label-lg text-label-lg px-space-md py-space-xs pr-8 rounded-lg focus:outline-none cursor-pointer border border-outline-variant/20"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active (Validated)</option>
                  <option value="Draft">Draft Protocol</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
                className="p-space-xs rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                title="Reset Filters"
              >
                <span className="material-symbols-outlined text-[20px]">filter_alt_off</span>
              </button>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-space-sm flex-shrink-0">
              <button
                type="button"
                onClick={() => alert("Exporting Vanguard Master Catalog Ledger (.CSV / EDI format)...")}
                className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-lg text-label-lg transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Export Spec Ledger</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenDrawer()}
                className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-lg text-label-lg transition-colors shadow-md font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Catalog Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pt-space-xs px-space-xs text-outline border-t border-outline-variant/15">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">data_check</span>
              <span>
                Showing <strong className="text-on-surface font-semibold">{filteredProducts.length}</strong> of{" "}
                <strong className="text-on-surface font-semibold">1,842</strong> cataloged surgical instruments
              </span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline text-primary-container font-semibold">1,814 Active</span>
              <span className="hidden md:inline text-outline">·</span>
              <span className="hidden md:inline text-on-tertiary-container font-semibold">28 Draft/Review</span>
            </div>
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Public Tender View
              </span>
              <span>Batch Action ({selectedIds.length} selected)</span>
            </div>
          </div>
        </div>

        {/* Main Surgical Product Data Grid */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider select-none">
                  <th className="py-space-sm pl-space-md pr-space-xs w-10">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-primary-container focus:ring-0 cursor-pointer accent-primary-container"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length}
                      onChange={(e) => handleToggleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="py-space-sm px-space-xs w-16">Profile</th>
                  <th className="py-space-sm px-space-md min-w-[240px]">Instrument Name &amp; Description</th>
                  <th className="py-space-sm px-space-md whitespace-nowrap">Product Code / DIN</th>
                  <th className="py-space-sm px-space-md whitespace-nowrap">Category</th>
                  <th className="py-space-sm px-space-md whitespace-nowrap">Metallurgy &amp; Finish</th>
                  <th className="py-space-sm px-space-md whitespace-nowrap">Status</th>
                  <th className="py-space-sm px-space-md whitespace-nowrap">Length</th>
                  <th className="py-space-sm pr-space-md pl-space-xs text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface">
                {filteredProducts.map((prod) => {
                  const isChecked = selectedIds.includes(prod.id);
                  return (
                    <tr key={prod.id} className="hover:bg-surface-container-low/60 transition-colors group">
                      <td className="py-space-sm pl-space-md pr-space-xs">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary-container focus:ring-0 cursor-pointer accent-primary-container"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(prod.id)}
                        />
                      </td>
                      <td className="py-space-sm px-space-xs">
                        <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex items-center justify-center p-1 shadow-sm">
                          <img
                            className="w-full h-full object-contain"
                            alt={prod.imageAlt}
                            src={prod.image}
                          />
                        </div>
                      </td>
                      <td className="py-space-sm px-space-md">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-lg text-label-lg font-semibold text-primary truncate">
                              {prod.name}
                            </span>
                            {prod.tag && (
                              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-primary uppercase tracking-wider font-semibold">
                                {prod.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-on-surface-variant text-body-sm truncate max-w-sm">
                            {prod.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-md font-mono text-[12px] whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">{prod.sku}</span>
                          <span className="text-outline text-label-sm font-sans">{prod.norm}</span>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-md whitespace-nowrap">
                        <span className="font-label-md text-label-md px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-medium">
                          {prod.discipline}
                        </span>
                      </td>
                      <td className="py-space-sm px-space-md whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            {prod.material}
                          </span>
                          <span className="font-label-sm text-label-sm text-outline">
                            {prod.finish}
                          </span>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-md whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-primary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Active
                        </span>
                      </td>
                      <td className="py-space-sm px-space-md whitespace-nowrap text-outline font-mono text-xs">
                        {prod.length}
                      </td>
                      <td className="py-space-sm pr-space-md pl-space-xs text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenDrawer(prod)}
                            className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Edit Catalog Entry"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_square</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(prod.id, prod.name)}
                            className="p-1 rounded hover:bg-error-container text-outline hover:text-error transition-colors"
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
              Page 1 of 1 • {filteredProducts.length} Surgical Entries Listed
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

      {/* Add / Edit Drawer Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-xl shadow-2xl p-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  {editingItem ? "Update Specification" : "Instrument Master Creation"}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  {editingItem ? `Edit SKU: ${editingItem.sku}` : "Catalog Instrument Registration"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    Instrument Master Name *
                  </label>
                  <input
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30 focus:border-primary-container"
                    placeholder="e.g. Crile-Wood Needle Holder"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    SKU Code *
                  </label>
                  <input
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none font-mono border border-outline-variant/30 focus:border-primary-container"
                    placeholder="VSP-XXXX-TC"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    Discipline
                  </label>
                  <select
                    value={formDiscipline}
                    onChange={(e) => setFormDiscipline(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30"
                  >
                    <option>Scissors & Cutting</option>
                    <option>Forceps & Clamps</option>
                    <option>Needle Holders</option>
                    <option>Retractors & Specula</option>
                    <option>Orthopedic Suite</option>
                    <option>Diagnostic & Micro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    Metallurgy Grade
                  </label>
                  <input
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30"
                    placeholder="DIN 1.4117 Martensitic"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    Working Length
                  </label>
                  <input
                    value={formLength}
                    onChange={(e) => setFormLength(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30"
                    placeholder='180 mm (7")'
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline uppercase mb-1">
                    DIN Norm
                  </label>
                  <input
                    value={formNorm}
                    onChange={(e) => setFormNorm(e.target.value)}
                    className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30"
                    placeholder="DIN 58298 / ISO 7153-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">
                  Clinical Specification &amp; Dimensions
                </label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30 h-20"
                  placeholder="Detail blade profile, box lock hinge, UDI laser marking requirements..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-primary font-semibold text-sm hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:brightness-110"
                >
                  {editingItem ? "Update Instrument Record" : "Commit to Swiss Node Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
