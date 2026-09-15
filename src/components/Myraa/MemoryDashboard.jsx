import React, { useState } from "react";
import { 
  Brain, 
  X, 
  Trash2, 
  Plus, 
  User, 
  Heart, 
  Target, 
  Briefcase, 
  Users, 
  Flame, 
  Sparkles,
  RefreshCw,
  Search,
  Check
} from "lucide-react";
import { MEMORY_CATEGORIES } from "../../lib/myraaTypes";

const CATEGORY_CONFIG = {
  identity: { label: "Identity Core", icon: User, color: "text-amber-400 border-amber-500/25", bg: "bg-amber-500/10" },
  preference: { label: "Preferences", icon: Heart, color: "text-pink-400 border-pink-500/25", bg: "bg-pink-500/10" },
  goal: { label: "Goals & Targets", icon: Target, color: "text-emerald-400 border-emerald-500/25", bg: "bg-emerald-500/10" },
  project: { label: "Active Projects", icon: Briefcase, color: "text-cyan-400 border-cyan-500/25", bg: "bg-cyan-500/10" },
  relationship: { label: "Relationships", icon: Users, color: "text-purple-400 border-purple-500/25", bg: "bg-purple-500/10" },
  emotional: { label: "Milestones", icon: Flame, color: "text-rose-400 border-rose-500/25", bg: "bg-rose-500/10" },
  behavior: { label: "Habits & Behavior", icon: Brain, color: "text-indigo-400 border-indigo-500/25", bg: "bg-indigo-500/10" },
};

export function MemoryDashboard({
  isOpen,
  onClose,
  memories = [],
  onAddMemory,
  onDeleteMemory,
  themeColor = "violet"
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState("identity");
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newText.trim() || submitting) return;
    setSubmitting(true);
    try {
      if (onAddMemory) {
        await onAddMemory(newCategory, newText.trim());
      }
      setNewText("");
      setIsAdding(false);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMemories = memories.filter(m => {
    const matchesCat = activeTab === "all" || m.category === activeTab;
    const matchesSearch = !searchQuery || m.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in"
        style={{
          backgroundColor: '#090D16',
          color: '#F8FAFC'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-violet-500/15 border border-violet-500/30 text-violet-400">
              <Brain size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                <span>MYRAA Recollections & Memory Vault</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {memories.length} Memories
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Long-term recollections automatically extracted across voice and chat sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All Categories ({memories.length})
          </button>
          {MEMORY_CATEGORIES.map(cat => {
            const count = memories.filter(m => m.category === cat).length;
            const config = CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === cat
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{config?.label || cat}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Add Bar */}
        <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between gap-3 bg-slate-950/30">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search recollections..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-md shadow-violet-600/20"
          >
            <Plus size={14} />
            <span>Add Memory</span>
          </button>
        </div>

        {/* Add Memory Form */}
        {isAdding && (
          <form onSubmit={handleAdd} className="p-4 mx-6 my-3 rounded-2xl border border-violet-500/30 bg-violet-950/20 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-300 font-mono">Create Memory Record</span>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
              >
                {MEMORY_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {CATEGORY_CONFIG[cat]?.label || cat}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Preparing for Google L4 interview in 3 months; prefers Python..."
              value={newText}
              onChange={e => setNewText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !newText.trim()}
                className="px-3.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold font-mono disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Saving..." : "Save to Vault"}
              </button>
            </div>
          </form>
        )}

        {/* Memory Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2.5 scrollbar-none">
          {filteredMemories.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Brain size={32} className="mx-auto text-slate-600 opacity-60" />
              <p className="text-sm font-semibold text-slate-400">No recollections found</p>
              <p className="text-xs text-slate-600">
                {searchQuery ? "Try a different search query" : "Start speaking with Myraa to build long-term memory"}
              </p>
            </div>
          ) : (
            filteredMemories.map(item => {
              const config = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.identity;
              const Icon = config.icon;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${config.color} ${config.bg}`}>
                      <Icon size={14} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${config.color.split(' ')[0]}`}>
                          {config.label}
                        </span>
                        <span className="text-[9px] font-mono text-slate-600">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed break-words">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMemory && onDeleteMemory(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Delete Memory"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/5 bg-slate-950/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-violet-400" />
            <span>RECOLLECTIONS INJECTED INTO ACTIVE TUTOR CONTEXT</span>
          </div>
          <button
            onClick={onClose}
            className="text-violet-400 hover:text-violet-300 font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
