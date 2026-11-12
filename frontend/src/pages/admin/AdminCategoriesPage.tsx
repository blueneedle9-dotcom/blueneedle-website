import React, { useState } from "react";
import { Link } from "react-router-dom";

interface CategoryRecord {
  id: string;
  rank: string;
  code: string;
  name: string;
  discipline: string;
  description: string;
  scopeTag: string;
  skusCount: number;
  status: "Active" | "Draft" | "Archived";
  image: string;
}

const INITIAL_CATEGORIES: CategoryRecord[] = [
  {
    id: "cat-1",
    rank: "#01",
    code: "CAT-SCIS-01",
    name: "Scissors & Cutting Instruments",
    discipline: "General Surgery",
    description: "Precision dissecting, micro-scissors, Mayo, Metzenbaum, and SuperCut TC inserts.",
    scopeTag: "Tier 1 Critical",
    skusCount: 248,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6sP0rsA4YBrRKxkh_njXs0Z5QSTyfwPXOQ-apxq_v9Gsvh4LZusziSje0Kp3Lu5Bzc7JdC_eBAasBk9KCy7BiDlYCkAIiS5hYii0U5xD7isOc9Je08kXFL_Cle5jLudQbeKzH0SE5uBRwh-xumQUe7sjwo8q0oTS-fhKu9JPSj2B4rbBI_uaVJfjP7EOk_aGmvUjcqLHAVpbH_4uf1EzptlOgMTpIizMp3KrkNENo",
  },
  {
    id: "cat-2",
    rank: "#02",
    code: "CAT-FORC-02",
    name: "Forceps & Clamps",
    discipline: "Cardiovascular & Soft Tissue",
    description: "Atraumatic vascular clamps, tissue forceps, Adson, DeBakey, and hemostatic forceps.",
    scopeTag: "Satin Finish",
    skusCount: 312,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpoUOfr3cN-Bzs4K0ZWj09kol_R5ucjryQiDY9u8yvxV6uMeo4_eWs7UMGYtTjoDwVjxnHn4ZORPOzeKGFUyaL1hE2qETi1qU5l13moD7MwtdZ70P5Z786Em3Fb9T7ygfdFtjHjbOzQ0VmbJi0VebfhcfP3X1JMitGXY2K3kU6yejdj1Ic_zOjqwyR5m6oT6fhO7yRg4TgkodPVrUXR3-o3v0lEDPSjgPpFnB2DNAf",
  },
  {
    id: "cat-3",
    rank: "#03",
    code: "CAT-NEED-03",
    name: "Needle Holders",
    discipline: "Suture & Anastomosis",
    description: "Tungsten carbide jaw inserts, Castroviejo micro needle holders, Mayo-Hegar, and Mathieu.",
    scopeTag: "Gold Plated Ring Handles",
    skusCount: 156,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnTZ_c4hZSGOQGOD3854vHaFG-N5LUU7OopZg4InsLKBHCSlbMq6edaSbPWQ6aMVvEE4b_Z2yx3L0GRnBZsAZpH9BhG27EyLbUk2vZA8n31zSqbsTVa_bwYo5epxQ6qM2ZbzTZzVCMyJNjtZvaNuE2aDGCleFVC76t4Oc1FZy1YR5Uk7wCZPuptNF5_YtFBzbNNugzKNVbU7rg78idrjFJUK31m8SM0yqACSKgeL2k",
  },
  {
    id: "cat-4",
    rank: "#04",
    code: "CAT-RETR-04",
    name: "Retractors & Specula",
    discipline: "Abdominal & Deep Cavity",
    description: "Self-retaining Weitlaner, Gelpi, Balfour abdominal frames, and Langenbeck handheld blades.",
    scopeTag: "Modular Blades",
    skusCount: 190,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUwSu8a62zPtUlvdD2eQL_Sb-1Egg_yNDfPpv3_3vPdfmXQJ-ynI3QGpZMPTovJGZ9Qhkbj6JtHeCEiYfVrIhglhKOUyQc5uaSrY9YC4uTMHOkuHfzvlQLJZXXcm0z2ho1Vurr6JLs8kVrYc5qwLLfk41v4B40bh81UidHqHyfJc19G2TvWHefa5TI5YfX2Dz96bl1hfGoAxmSHgbOGakWQtYX3w5r_gN2OvmF7MZk",
  },
  {
    id: "cat-5",
    rank: "#05",
    code: "CAT-ORTH-05",
    name: "Orthopedic & Bone Surgery",
    discipline: "Orthopedics & Spine",
    description: "Kerrison rongeurs, bone cutters, osteotomes, bone holding clamps, and mallet instruments.",
    scopeTag: "Heavy Caliber 420B",
    skusCount: 215,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxTP1qT2o2-zReTud8TZ2IPNpucguHzuXiArZdVuGRCH2KiMMfkno1Ge7MthyDwExTp1Da2Kwq0sCbMJWlnOk5XX9wsWBfYtcCjKDuRg8DMMIZyv0AAt_NqZt2NKViOESqMroVm19qpwYW4xH_t6RlUwFI2zkDmt2fZWbFDb7VsN7JtKHStDAhKrRUy28s6jZ1YjhkcechqC5E7trJAPmUWC2byWmU1dYgtiIDOLuH",
  },
  {
    id: "cat-6",
    rank: "#06",
    code: "CAT-ENTO-06",
    name: "ENT & Otology",
    discipline: "Otorhinolaryngology",
    description: "Hartmann micro-forceps, mastoid middle ear retractors, and nasal specula.",
    scopeTag: "Fine Calibrated Shrewd",
    skusCount: 132,
    status: "Active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA55PzsyD_44jVrXXz0RlThAgUPJY7IzG2mHXz9zfY15pYNZ2K41JHU-YBQXqCksWD6HZCZpffjpv7EBkbfp6zRwsSGtvhtTpWITMRKxi4xVimgivVdHXdHRnR7XLZHuG9c90tjrQn_1NGn_0TaKidI3kbwOhYD0wy5XQ0BxUlmWEwzkVA0X5ZiWwaTo6d7-A1tOrWVhZ3QnUHT5R8twKUjLiZZYPv5sgGc2Fu-7z1O",
  },
];

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryRecord[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryRecord>(INITIAL_CATEGORIES[0]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New category form
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newDiscipline, setNewDiscipline] = useState("General Surgery");
  const [newDesc, setNewDesc] = useState("");

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: CategoryRecord = {
      id: `cat-${categories.length + 1}`,
      rank: `#0${categories.length + 1}`,
      code: newCode || `CAT-SPEC-0${categories.length + 1}`,
      name: newName,
      discipline: newDiscipline,
      description: newDesc,
      scopeTag: "Newly Registered",
      skusCount: 0,
      status: "Active",
      image: INITIAL_CATEGORIES[0].image,
    };
    setCategories((prev) => [...prev, newCat]);
    setSelectedCategory(newCat);
    setCreateModalOpen(false);
    setNewName("");
    setNewCode("");
    setNewDesc("");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove classification ${name} from Swiss node taxonomy?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      if (selectedCategory.id === id) {
        setSelectedCategory(categories[0] || null);
      }
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      !searchTerm.trim() ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.discipline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-surface min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col w-full">
        {/* Top Context Header Area */}
        <div className="px-space-md lg:px-space-xl pt-space-xl pb-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-widest px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                Classification Registry
              </span>
              <span className="text-outline text-label-sm">|</span>
              <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-mono">
                DIN 58298 / ISO 7153-1 Compliance
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">
              Categories Management
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Organize surgical instruments into clinical disciplines, specialty classifications, and institutional catalog sections.
            </p>
          </div>

          {/* Quick Stats Metric Bar */}
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="bg-surface-container-lowest px-space-lg py-space-sm rounded-lg shadow-sm border border-outline-variant/20 flex items-center gap-space-md">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">category</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-outline font-semibold tracking-wider">
                  Indexed Disciplines
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  14 <span className="font-body-sm text-body-sm text-outline font-normal">Active Categories</span>
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest px-space-lg py-space-sm rounded-lg shadow-sm border border-outline-variant/20 flex items-center gap-space-md">
              <div className="w-10 h-10 rounded bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-outline font-semibold tracking-wider">
                  Catalog Allocation
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  1,842 <span className="font-body-sm text-body-sm text-outline font-normal">Total SKUs</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Filter & Utility Bar */}
        <div className="px-space-md lg:px-space-xl pb-space-lg">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/20 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            <div className="flex flex-1 items-center gap-space-md flex-wrap">
              <div className="relative flex-1 min-w-[280px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-space-md py-space-xs rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/20"
                  placeholder="Search categories, codes, or descriptions..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-space-sm justify-end">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="px-space-lg py-space-xs rounded bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-space-xs shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>+ Add New Category</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Workspace Layout */}
        <div className="px-space-md lg:px-space-xl pb-space-xxl grid grid-cols-12 gap-space-lg">
          {/* Category Main Data Table Container (8 Cols on Desktop) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col space-y-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
              <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                    Active Catalog Taxonomy
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  <span className="font-body-sm text-body-sm text-outline">
                    Showing {filteredCategories.length} categories
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
                      <th className="py-space-sm px-space-md font-semibold w-16">Rank</th>
                      <th className="py-space-sm px-space-md font-semibold min-w-[240px]">Category &amp; Code</th>
                      <th className="py-space-sm px-space-md font-semibold min-w-[280px]">Discipline &amp; Clinical Scope</th>
                      <th className="py-space-sm px-space-md font-semibold text-right">SKUs</th>
                      <th className="py-space-sm px-space-md font-semibold text-center">Status</th>
                      <th className="py-space-sm px-space-md font-semibold text-right w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/60">
                    {filteredCategories.map((cat) => (
                      <tr
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={`hover:bg-surface-bright transition-colors group cursor-pointer ${
                          selectedCategory?.id === cat.id ? "bg-surface-container-low" : ""
                        }`}
                      >
                        <td className="py-space-md px-space-md font-label-md text-outline font-semibold">
                          {cat.rank}
                        </td>
                        <td className="py-space-md px-space-md">
                          <div className="flex items-center gap-space-md">
                            <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden flex-shrink-0 relative shadow-inner">
                              <img
                                className="w-full h-full object-cover"
                                alt={cat.name}
                                src={cat.image}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-headline-sm text-[16px] leading-tight font-semibold text-on-surface group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                              <span className="font-label-sm text-label-sm text-outline font-mono mt-0.5 tracking-wider">
                                {cat.code}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md">
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                            {cat.description}
                          </p>
                          <div className="flex items-center gap-space-xs mt-1">
                            <span className="font-label-sm text-[10px] uppercase px-1.5 py-0.2 rounded bg-surface-container text-on-surface font-semibold">
                              {cat.discipline}
                            </span>
                            <span className="font-label-sm text-[10px] text-outline">
                              {cat.scopeTag}
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md text-right">
                          <Link
                            to={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                            className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-primary hover:underline"
                          >
                            <span>{cat.skusCount}</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                          </Link>
                        </td>
                        <td className="py-space-md px-space-md text-center">
                          <span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-primary-fixed text-primary text-label-sm font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            <span>{cat.status}</span>
                          </span>
                        </td>
                        <td className="py-space-md px-space-md text-right">
                          <div className="flex items-center justify-end gap-space-xs">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(cat.id, cat.name);
                              }}
                              className="p-1 rounded hover:bg-error-container text-outline hover:text-error"
                              title="Delete Category"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Category Inspector (4 Cols on Desktop) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col space-y-space-md">
            {selectedCategory && (
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/20 flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Category Inspection
                  </span>
                  <span className="font-mono text-xs text-primary font-bold px-2 py-0.5 bg-primary-fixed rounded">
                    {selectedCategory.code}
                  </span>
                </div>

                <div className="w-full h-40 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    {selectedCategory.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {selectedCategory.description}
                  </p>
                </div>

                <div className="bg-surface-container-low rounded-lg p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-outline">Clinical Discipline:</span>
                    <span className="font-semibold text-primary">{selectedCategory.discipline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Scope Priority:</span>
                    <span className="font-semibold text-primary">{selectedCategory.scopeTag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">Assigned Catalog SKUs:</span>
                    <span className="font-mono font-bold text-primary">{selectedCategory.skusCount} Instruments</span>
                  </div>
                </div>

                <Link
                  to={`/admin/products?category=${encodeURIComponent(selectedCategory.name)}`}
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-center text-sm hover:bg-primary-container transition-colors"
                >
                  Manage Instruments in this Category
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Category Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl shadow-2xl p-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
              <div>
                <span className="font-label-sm text-label-sm uppercase text-outline">
                  Taxonomy Master
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                  Create New Surgical Discipline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">
                  Category Title *
                </label>
                <input
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30 focus:border-primary-container"
                  placeholder="e.g. Laparoscopic Systems"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">
                  Taxonomy Code *
                </label>
                <input
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded text-sm font-mono outline-none border border-outline-variant/30 focus:border-primary-container"
                  placeholder="CAT-LAP-07"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">
                  Clinical Field / Discipline
                </label>
                <input
                  value={newDiscipline}
                  onChange={(e) => setNewDiscipline(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30"
                  placeholder="Minimally Invasive"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline uppercase mb-1">
                  Description
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-surface-container-low p-2 rounded text-sm outline-none border border-outline-variant/30 h-20 resize-none"
                  placeholder="Summarize tool types, scopes, and surgical theater compatibility..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-primary font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm"
                >
                  Register Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
