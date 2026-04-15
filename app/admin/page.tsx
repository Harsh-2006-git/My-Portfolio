"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Trophy, Award, Plus, ImageIcon,
  LogOut, Trash2, Edit, Save, X, ChevronRight, Search,
  TrendingUp, Database, RefreshCw, Server, ArrowLeft, ArrowRight, Menu, GripVertical
} from "lucide-react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-simple-wysiwyg"), { ssr: false });

type Tab = "projects" | "achievements" | "certificates";

const tabConfig = {
  projects: { label: "Projects", icon: Briefcase, color: "blue", desc: "Manage your dev projects" },
  achievements: { label: "Achievements", icon: Trophy, color: "amber", desc: "Track your wins & milestones" },
  certificates: { label: "Certificates", icon: Award, color: "emerald", desc: "Manage your certifications" },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, achievements: 0, certificates: 0 });
  const router = useRouter();

  useEffect(() => {
    // Fetch counts for all tabs for the stats bar
    const tabs: Tab[] = ["projects", "achievements", "certificates"];
    tabs.forEach(tab => {
      fetch(`/api/${tab}`)
        .then(r => r.json())
        .then(d => setCounts(prev => ({ ...prev, [tab]: Array.isArray(d) ? d.length : 0 })))
        .catch(() => { });
    });
  }, [isModalOpen]);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    setSearch("");
    try {
      const res = await fetch(`/api/${activeTab}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    } catch (err) { }
  };

  const handleSeed = async () => {
    if (!confirm("WARNING: This will replace the entire database with the pre-configured production seed data. Are you absolutely sure?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchItems();
      } else {
        alert("Seed Failed: " + data.error);
      }
    } catch {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newOrderedItems: any[]) => {
    const updates = newOrderedItems.map((item, idx) => ({ id: item._id, order: idx }));
    setItems(newOrderedItems);

    try {
      await fetch("/api/admin/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tab: activeTab, updates }),
      });
    } catch {
      fetchItems();
    }
  };

  const swapAdjacent = (currentIndex: number, direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    if (search) return alert("Clear search to reorder items.");

    const newItems = [...items];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex]];
    handleReorder(newItems);
  };

  const handleDrop = (dropIndex: number) => {
    if (search) return alert("Clear search to reorder items.");
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    handleReorder(newItems);
  };

  const cfg = tabConfig[activeTab];
  const filteredItems = items.filter(item =>
    (item.title || item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#080810] overflow-hidden relative font-sans">
      {/* ── Mobile Header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0c0c18]/90 backdrop-blur border-b border-white/5 z-[60] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center">
            <LayoutDashboard size={14} className="text-white" />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Admin Dashboard</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white bg-white/5 rounded-lg border border-white/10">
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* ── Sidebar (Restored Original Desktop Styles) ── */}
      <aside className={`
        fixed inset-y-0 left-0 w-60 shrink-0 bg-[#0c0c18] border-r border-white/5 flex flex-col z-[100] transition-transform duration-300 md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutDashboard size={15} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-widest">Portfolio</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => router.push("/")} className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-600/20 transition-all">
            <ArrowLeft size={12} /> Back to Site
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 px-3 py-2">Content</p>
          {(Object.entries(tabConfig) as [Tab, typeof tabConfig.projects][]).map(([key, val]) => {
            const Icon = val.icon;
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={16} className={active ? "text-white" : "text-zinc-500 group-hover:text-white"} />
                <span className="text-xs font-bold">{val.label}</span>
                {counts[key] > 0 && (
                  <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-md ${active ? "bg-white/20 text-white" : "bg-white/5 text-zinc-500"
                    }`}>
                    {counts[key]}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group"
          >
            <LogOut size={16} />
            <span className="text-xs font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-[90] md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main Panel ── */}
      <div className="flex-1 flex flex-col overflow-hidden pt-14 md:pt-0">
        {/* Top Header (Restored Original Desktop Styles) */}
        <header className="shrink-0 bg-[#0c0c18]/80 backdrop-blur border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <cfg.icon size={20} className="text-blue-400" />
            <div>
              <h1 className="text-sm md:text-base font-black text-white">{cfg.label}</h1>
              <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{cfg.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden lg:flex items-center">
              <Search size={13} className="absolute left-3 text-zinc-600" />
              <input
                type="text"
                placeholder={`Search ${cfg.label.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 bg-white/5 border border-white/5 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all w-48"
              />
            </div>

            <button onClick={fetchItems} className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all hidden md:block">
              <RefreshCw size={15} />
            </button>

            <button
              onClick={() => setIsReorderMode(!isReorderMode)}
              className={`flex items-center gap-2 p-2 px-3 border rounded-xl transition-all font-bold text-xs ${isReorderMode ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-zinc-500 hover:text-white hover:bg-white/5 border-white/5"
                }`}
            >
              <GripVertical size={14} /> {isReorderMode ? "Finish Reordering" : "Reorder"}
            </button>

            <button onClick={handleSeed} className="hidden md:flex items-center gap-2 p-2 px-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-xl transition-all font-bold text-xs">
              <Server size={14} /> Seed Cloud DB
            </button>

            <button
              onClick={() => { setCurrentItem(null); setIsModalOpen(true); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <Plus size={14} /> <span className="hidden xs:inline">Add New</span>
            </button>
          </div>
        </header>

        {/* Mini Stats (Fixed Grid on Mobile) */}
        <div className="grid grid-cols-3 md:hidden gap-1.5 px-4 py-2.5 bg-[#0a0a15] border-b border-white/5">
          {(Object.entries(tabConfig) as [Tab, typeof tabConfig.projects][]).map(([key, val]) => (
            <button
              key={key} onClick={() => setActiveTab(key)}
              className={`px-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tight border transition-all text-center ${activeTab === key ? "bg-blue-600 border-blue-500 text-white" : "bg-white/5 border-white/10 text-zinc-600"
                }`}
            >
              {val.label.split(' ')[0]} ({counts[key]})
            </button>
          ))}
        </div>

        {/* Stats Strip (Desktop only) */}
        <div className="shrink-0 border-b border-white/5 bg-[#0a0a15] px-8 py-3 hidden md:flex gap-6">
          {(Object.entries(tabConfig) as [Tab, typeof tabConfig.projects][]).map(([key, val]) => (
            <div
              key={key}
              className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeTab === key ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              onClick={() => setActiveTab(key)}
            >
              <Database size={12} className="text-blue-400" />
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{val.label}</span>
              <span className="text-[10px] font-black text-white">{counts[key]}</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-video h-64 md:h-auto bg-white/3 rounded-2xl animate-pulse border border-white/5" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-72 bg-white/2 rounded-3xl border border-dashed border-white/8 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <cfg.icon size={24} className="text-zinc-600" />
              </div>
              <p className="text-sm font-bold text-zinc-500">No content here yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5 pb-20 md:pb-0">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  draggable={isReorderMode && !search}
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={() => setDraggedIndex(null)}
                  className={`group bg-[#0f0f1e] border rounded-2xl overflow-hidden transition-all hover:shadow-lg ${draggedIndex === index ? "border-blue-500/80 opacity-50" : "border-white/5 hover:border-blue-500/30"
                    } ${isReorderMode ? "cursor-grab active:cursor-grabbing border-blue-500/30" : ""}`}
                >
                  <div className="relative aspect-video bg-black/40 overflow-hidden border-b border-white/5">
                    {item.images?.[0] ? (
                      <img src={item.images[0]} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : item.image ? (
                      <img src={item.image} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><cfg.icon size={32} className="text-zinc-700" /></div>
                    )}

                    {/* Drag Handle Overlay */}
                    {isReorderMode && (
                      <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-2xl scale-110 animate-pulse">
                          <GripVertical size={24} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between h-auto min-h-36">
                    <div className="space-y-2">
                      <h3 className="text-xs md:text-sm font-bold text-white line-clamp-2 font-sans">{item.title}</h3>
                      <div
                        className="text-[9px] md:text-[10px] text-zinc-400 line-clamp-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.description || item.issuer || "" }}
                      />
                      {/* Skills Line */}
                      {activeTab === "projects" && item.techStack && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.techStack.slice(0, 2).map((tech: string) => (
                            <span key={tech} className="px-1 py-0.5 bg-white/5 rounded text-[7px] font-black text-blue-400/50 border border-white/5 uppercase">{tech}</span>
                          ))}
                          {item.techStack.length > 2 && (
                            <span className="px-1 py-0.5 bg-white/5 rounded text-[7px] font-black text-zinc-600 border border-white/5 uppercase">+{item.techStack.length - 2} more</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setCurrentItem(item); setIsModalOpen(true); }}
                          className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 text-blue-400 rounded-lg border border-blue-500/20 active:bg-blue-600 active:text-white transition-all"
                        >
                          <Edit size={12} />
                          <span className="text-[8px] font-black uppercase">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 text-red-400 rounded-lg border border-red-500/20 active:bg-red-600 active:text-white transition-all"
                        >
                          <Trash2 size={12} />
                          <span className="text-[8px] font-black uppercase">Delete</span>
                        </button>
                      </div>
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tab={activeTab}
          item={currentItem}
          onSuccess={() => { setIsModalOpen(false); fetchItems(); }}
        />
      )}
    </div>
  );
}

/* ── Item Modal (Optimized for Mobile/Desktop) ── */
function ItemModal({ isOpen, onClose, tab, item, onSuccess }: {
  isOpen: boolean; onClose: () => void; tab: Tab; item: any; onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<any>(item || {});
  const [techStackInput, setTechStackInput] = useState(
    item?.techStack ? (Array.isArray(item.techStack) ? item.techStack.join(", ") : item.techStack) : ""
  );
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (["_id", "createdAt", "__v", "techStack", "images"].includes(key)) return;
      data.append(key, formData[key] ?? "");
    });

    if (tab === "projects") {
      const techStackArray = techStackInput.split(",").map((s: string) => s.trim()).filter(Boolean);
      data.append("techStack", JSON.stringify(techStackArray));
    }

    files.forEach(f => data.append("files", f));

    try {
      const url = item ? `/api/${tab}/${item._id}` : `/api/${tab}`;
      const method = item ? "PUT" : "POST";
      const res = await fetch(url, { method, body: data });
      if (res.ok) { onSuccess(); } else {
        const errData = await res.json();
        setError(errData.error || "Failed to save");
      }
    } catch { setError("Network error."); } finally { setLoading(false); }
  };

  const cfg = tabConfig[tab];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0f0f1e] border border-white/10 w-full h-full md:h-auto md:max-w-xl md:max-h-[85vh] md:rounded-3xl flex flex-col shadow-2xl overflow-hidden">

        <div className="sticky top-0 z-10 bg-[#0f0f1e] border-b border-white/5 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <cfg.icon size={14} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xs md:text-sm font-black text-white">{item ? "Edit" : "Add New"} {cfg.label.slice(0, -1)}</h2>
              <p className="text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{tab}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 md:p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 no-scrollbar pb-24 md:pb-6">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 py-2 md:py-3 rounded-xl">{error}</div>}

          <div>
            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Title</label>
            <input type="text" required className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all font-medium" placeholder="Enter title..." value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>

          <div>
            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Description</label>
            <div className="rounded-xl overflow-hidden border border-white/8 bg-white/5 simple-editor">
              <Editor value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <style jsx global>{`
              .simple-editor .rsw-ce { min-height: 120px; md:min-height: 140px; color: #fff; background: transparent; padding: 0.75rem md:1rem; font-size: 13px md:14px; }
              .simple-editor .rsw-toolbar { background: rgba(255,255,255,0.02); border: none; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 0.25rem md:0.5rem; }
            `}</style>
          </div>

          {tab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Live Link</label>
                <input type="url" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/40 transition-all font-bold" value={formData.link || ""} onChange={e => setFormData({ ...formData, link: e.target.value })} />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">GitHub</label>
                <input type="url" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/40 transition-all font-bold" value={formData.github || ""} onChange={e => setFormData({ ...formData, github: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Tech Stack</label>
                <input type="text" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/40 transition-all font-bold" value={techStackInput} onChange={e => setTechStackInput(e.target.value)} />
              </div>
            </div>
          )}

          {tab === "achievements" && (
            <div>
              <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Date</label>
              <input type="text" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/30 transition-all font-bold" value={formData.date || ""} onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
          )}

          {tab === "certificates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div><label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Issuer</label><input type="text" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/30 transition-all font-bold" value={formData.issuer || ""} onChange={e => setFormData({ ...formData, issuer: e.target.value })} /></div>
              <div><label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 md:mb-2 ml-1">Date</label><input type="text" className="w-full bg-white/5 border border-white/8 text-white text-xs md:text-sm px-4 py-2.5 md:py-3 rounded-xl focus:border-blue-500/30 transition-all font-bold" value={formData.date || ""} onChange={e => setFormData({ ...formData, date: e.target.value })} /></div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2 md:mb-3 ml-1">Media Assets</label>
            <label className="flex flex-col items-center justify-center w-full h-24 md:h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-blue-600/30 hover:bg-white/5 transition-all group">
              <ImageIcon size={18} className="text-zinc-600 group-hover:text-blue-500 mb-1.5 md:mb-2" />
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600">{files.length > 0 ? `${files.length} Selected` : "Upload Images"}</span>
              <input type="file" className="hidden" multiple accept="image/*" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]); }} />
            </label>
            {(files.length > 0 || item?.images?.length > 0) && (
              <div className="flex gap-2 md:gap-3 overflow-x-auto py-3 md:py-4 no-scrollbar">
                {files.map((f, i) => (
                  <div key={i} className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-blue-600/10 border border-blue-500/20 relative">
                    <button type="button" onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 p-1 bg-red-600 rounded text-white shadow-lg"><X size={8} /></button>
                  </div>
                ))}
                {item?.images?.map((img: string, i: number) => (
                  <div key={i} className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border border-white/5 overflow-hidden shadow-inner"><img src={img} className="w-full h-full object-cover" /></div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-white/5 bg-white/[0.02] flex gap-2 md:gap-3 sticky bottom-0">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Cancel</button>
          <button type="submit" onClick={handleSubmit} disabled={loading} className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest py-2.5 md:py-3 rounded-xl transition-all shadow-xl active:scale-95">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
