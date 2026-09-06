import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Code2, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Flame, 
  SlidersHorizontal,
  X,
  Info,
  Check,
  Layers,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CompanyPrep = () => {
  const { isDarkMode, activeAccentHex, navigateTo } = useTheme();

  // 1. Data States
  const [catalog, setCatalog] = useState([]);
  const [allProblemsData, setAllProblemsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  // 2. Selection & Filter States
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All' | 'Mass Recruitment' | 'Big Tech'
  const [selectedCompanyId, setSelectedCompanyId] = useState('tcs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard'
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [sortBy, setSortBy] = useState('frequency'); // 'frequency' | 'acceptance-desc' | 'acceptance-asc' | 'diff-asc' | 'diff-desc' | 'title'
  
  // 3. Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // 4. LeetCode Account Banner State (Stored in localStorage)
  const [hasLeetCodeAccount, setHasLeetCodeAccount] = useState(() => {
    try {
      return localStorage.getItem('doap_has_leetcode_account') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [showAccountBanner, setShowAccountBanner] = useState(true);

  // Fetch company catalog and problems data
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Fetch catalog first
        const catRes = await fetch('/data/companyCatalog.json');
        if (!catRes.ok) throw new Error('Failed to load company catalog');
        const catData = await catRes.json();
        
        if (isMounted) {
          setCatalog(catData);
          if (catData.length > 0 && !selectedCompanyId) {
            setSelectedCompanyId(catData[0].id);
          }
        }

        // Fetch full problems dataset
        const probRes = await fetch('/data/companyProblems.json');
        if (!probRes.ok) throw new Error('Failed to load company questions database');
        const probData = await probRes.json();

        if (isMounted) {
          setAllProblemsData(probData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('[CompanyPrep] Data load error:', err);
        if (isMounted) {
          setDataError(err.message);
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  // Filter companies by category
  const filteredCompanies = useMemo(() => {
    if (selectedCategory === 'All') return catalog;
    return catalog.filter(c => c.category === selectedCategory);
  }, [catalog, selectedCategory]);

  // When category changes, auto-select the first company in that category
  useEffect(() => {
    if (filteredCompanies.length > 0) {
      const exists = filteredCompanies.some(c => c.id === selectedCompanyId);
      if (!exists) {
        setSelectedCompanyId(filteredCompanies[0].id);
        setCurrentPage(1);
      }
    }
  }, [selectedCategory, filteredCompanies]);

  // Active Company Metadata
  const activeCompany = useMemo(() => {
    return catalog.find(c => c.id === selectedCompanyId) || catalog[0] || null;
  }, [catalog, selectedCompanyId]);

  // Active Company Raw Problems
  const companyProblems = useMemo(() => {
    if (!selectedCompanyId || !allProblemsData[selectedCompanyId]) return [];
    return allProblemsData[selectedCompanyId].problems || [];
  }, [selectedCompanyId, allProblemsData]);

  // Extract all unique topics for current company
  const availableTopics = useMemo(() => {
    const topicSet = new Set();
    companyProblems.forEach(p => {
      if (Array.isArray(p.topics)) {
        p.topics.forEach(t => topicSet.add(t));
      }
    });
    return Array.from(topicSet).sort();
  }, [companyProblems]);

  // Filter and sort problems
  const processedProblems = useMemo(() => {
    let list = [...companyProblems];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (Array.isArray(p.topics) && p.topics.some(t => t.toLowerCase().includes(q)))
      );
    }

    // 2. Difficulty Filter
    if (selectedDifficulty !== 'All') {
      list = list.filter(p => p.difficulty === selectedDifficulty);
    }

    // 3. Topic Filter
    if (selectedTopic !== 'All') {
      list = list.filter(p => Array.isArray(p.topics) && p.topics.includes(selectedTopic));
    }

    // 4. Sorting
    list.sort((a, b) => {
      if (sortBy === 'frequency') {
        return (b.frequency || 0) - (a.frequency || 0);
      }
      if (sortBy === 'acceptance-desc') {
        const accA = parseFloat(a.acceptanceRate) || 0;
        const accB = parseFloat(b.acceptanceRate) || 0;
        return accB - accA;
      }
      if (sortBy === 'acceptance-asc') {
        const accA = parseFloat(a.acceptanceRate) || 0;
        const accB = parseFloat(b.acceptanceRate) || 0;
        return accA - accB;
      }
      if (sortBy === 'diff-asc') {
        const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return (order[a.difficulty] || 2) - (order[b.difficulty] || 2);
      }
      if (sortBy === 'diff-desc') {
        const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return (order[b.difficulty] || 2) - (order[a.difficulty] || 2);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  }, [companyProblems, searchQuery, selectedDifficulty, selectedTopic, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCompanyId, searchQuery, selectedDifficulty, selectedTopic, sortBy]);

  // Pagination calculation
  const totalItems = processedProblems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProblems, currentPage, itemsPerPage]);

  const handleAcknowledgeLeetCode = () => {
    setHasLeetCodeAccount(true);
    try {
      localStorage.setItem('doap_has_leetcode_account', 'true');
    } catch (e) {}
  };

  const handleAskDoapAI = (problemTitle) => {
    const prompt = `Can you explain the optimal approach, step-by-step intuition, and time/space complexity for the LeetCode problem "${problemTitle}" asked at ${activeCompany?.name || 'top tech companies'}?`;
    sessionStorage.setItem('doap_ai_initial_prompt', prompt);
    navigateTo('/ai-tutor');
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto animate-fade-in select-none">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--doap-border)' }}>
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Building2 size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
              Company-Wise LeetCode Archive
            </h1>
          </div>
          <p className="text-xs md:text-sm" style={{ color: 'var(--doap-text-sec)' }}>
            8,600+ authentic interview questions asked in technical hiring drives across Indian Mass Recruiters & Big Tech Product Giants.
          </p>
        </div>

        {/* Global Stats Pill */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="px-3.5 py-2 rounded-2xl border doap-glass flex items-center gap-2.5" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-medium" style={{ color: 'var(--doap-text-prim)' }}>
              16 Top Tech Companies • 8,699 Questions
            </span>
          </div>
        </div>
      </div>

      {/* 2. CRITICAL LEETCODE ACCOUNT INSTRUCTION BANNER */}
      {showAccountBanner && (
        <div className="relative overflow-hidden rounded-2xl border p-4 md:p-5 shadow-xl transition-all animate-fade-in bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-cyan-500/10 border-amber-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5">
                <AlertTriangle size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm md:text-base font-bold text-amber-300">
                    Important Instruction: Please make sure you have an active LeetCode account
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    MANDATORY
                  </span>
                </div>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                  All problems in this company archive link directly to the official <strong>LeetCode</strong> platform for online code execution, test case evaluation, and submission history. To practice seamlessly without sign-in barriers, please verify you are signed in to LeetCode in your browser.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1 flex-wrap">
                  <span>💡 Tip: Keep your LeetCode tab open in the background</span>
                  <span>•</span>
                  <span>🤖 DOAP AI is ready to explain any question's optimal approach</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <a 
                href="https://leetcode.com/accounts/login/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <span>Sign In / Create Account</span>
                <ExternalLink size={13} />
              </a>

              {!hasLeetCodeAccount ? (
                <button
                  onClick={handleAcknowledgeLeetCode}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="I have an active LeetCode account"
                >
                  <Check size={14} className="text-emerald-400" />
                  <span className="hidden sm:inline">I'm Logged In</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAccountBanner(false)}
                  className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
                  title="Dismiss banner"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* If dismissed, show a compact toggle to restore banner */}
      {!showAccountBanner && (
        <div className="flex items-center justify-between px-4 py-2 rounded-xl border text-xs" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
          <span className="flex items-center gap-2 text-emerald-400 font-mono">
            <CheckCircle2 size={14} /> LeetCode Account Active (Links will open directly in LeetCode)
          </span>
          <button 
            onClick={() => setShowAccountBanner(true)}
            className="text-cyan-400 hover:underline cursor-pointer font-medium"
          >
            Show LeetCode Instructions
          </button>
        </div>
      )}

      {/* 3. Category Switcher Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 p-1 rounded-2xl border" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
          {[
            { id: 'All', label: 'All Companies', count: catalog.length },
            { id: 'Mass Recruitment', label: '🏢 Mass Recruitment', count: 8 },
            { id: 'Big Tech', label: '🚀 Big Tech / MAANG+', count: 8 }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'hover:bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-white/10 text-neutral-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Selected company quick badge */}
        {activeCompany && (
          <div className="text-xs font-mono px-3 py-1.5 rounded-xl border flex items-center gap-2" style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}>
            <span>Selected:</span>
            <strong className="text-cyan-400">{activeCompany.name}</strong>
            <span>({activeCompany.totalCount} problems)</span>
          </div>
        )}
      </div>

      {/* 4. Company Selector Grid / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {filteredCompanies.map(company => {
          const isSelected = company.id === selectedCompanyId;
          return (
            <button
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between relative cursor-pointer group ${
                isSelected 
                  ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/15 scale-[1.02]' 
                  : 'hover:bg-white/5 border-white/10 opacity-75 hover:opacity-100'
              }`}
              style={{
                backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'var(--doap-surface)',
                borderColor: isSelected ? '#06b6d4' : 'var(--doap-border)'
              }}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xl group-hover:scale-110 transition-transform">{company.logo}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold" style={{
                  backgroundColor: company.category === 'Big Tech' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: company.category === 'Big Tech' ? '#60a5fa' : '#34d399'
                }}>
                  {company.totalCount}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs tracking-tight truncate" style={{ color: isSelected ? '#06b6d4' : 'var(--doap-text-prim)' }}>
                  {company.name}
                </h4>
                <p className="text-[9px] font-mono text-neutral-400 truncate mt-0.5">
                  {company.category === 'Big Tech' ? 'MAANG+' : 'Mass Hire'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. Selected Company Hero Header */}
      {activeCompany && (
        <div className="p-5 rounded-2xl border doap-glass flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shrink-0 bg-neutral-900 shadow-md" style={{ borderColor: activeCompany.color || '#06b6d4' }}>
              {activeCompany.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
                  {activeCompany.name} Interview Archive
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold" style={{
                  backgroundColor: activeCompany.category === 'Big Tech' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: activeCompany.category === 'Big Tech' ? '#60a5fa' : '#34d399'
                }}>
                  {activeCompany.category}
                </span>
              </div>
              <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--doap-text-sec)' }}>
                {activeCompany.tagline}
              </p>
            </div>
          </div>

          {/* Difficulty breakdown pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Easy: <strong>{activeCompany.easyCount}</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Med: <strong>{activeCompany.mediumCount}</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Hard: <strong>{activeCompany.hardCount}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Search, Filter & Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs font-sans outline-none transition-all placeholder:text-neutral-500"
            style={{
              backgroundColor: 'var(--doap-surface)',
              borderColor: 'var(--doap-border)',
              color: 'var(--doap-text-prim)'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl border" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
          {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                selectedDifficulty === diff 
                  ? diff === 'Easy' 
                    ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40' 
                    : diff === 'Medium' 
                    ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40' 
                    : diff === 'Hard' 
                    ? 'bg-rose-500/25 text-rose-300 font-bold border border-rose-500/40' 
                    : 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Topic Filter Dropdown */}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border text-xs font-sans outline-none cursor-pointer"
          style={{
            backgroundColor: 'var(--doap-surface)',
            borderColor: 'var(--doap-border)',
            color: 'var(--doap-text-prim)'
          }}
        >
          <option value="All">All Topics ({availableTopics.length})</option>
          {availableTopics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>

        {/* Sort By Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border text-xs font-sans outline-none cursor-pointer"
          style={{
            backgroundColor: 'var(--doap-surface)',
            borderColor: 'var(--doap-border)',
            color: 'var(--doap-text-prim)'
          }}
        >
          <option value="frequency">Sort: Most Frequent in Interviews</option>
          <option value="acceptance-desc">Sort: Highest Acceptance Rate</option>
          <option value="acceptance-asc">Sort: Lowest Acceptance Rate</option>
          <option value="diff-asc">Sort: Difficulty (Easy → Hard)</option>
          <option value="diff-desc">Sort: Difficulty (Hard → Easy)</option>
          <option value="title">Sort: Alphabetical (A → Z)</option>
        </select>
      </div>

      {/* 7. Problem List Table / Cards */}
      <div className="rounded-2xl border overflow-hidden doap-glass shadow-xl" style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface)' }}>
        
        {/* Table Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b bg-neutral-900/50" style={{ borderColor: 'var(--doap-border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Questions ({totalItems.toLocaleString()})
            </span>
            {(selectedDifficulty !== 'All' || selectedTopic !== 'All' || searchQuery) && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Filtered
              </span>
            )}
          </div>

          <div className="text-xs font-mono text-neutral-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-neutral-400">Loading company question database...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && paginatedProblems.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <FolderOpen size={36} className="mx-auto text-neutral-500 opacity-60" />
            <h3 className="text-sm font-bold" style={{ color: 'var(--doap-text-prim)' }}>No questions match your filter criteria</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Try clearing the search query, selecting "All" difficulty, or choosing another topic.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedTopic('All');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Problem Rows */}
        {!isLoading && paginatedProblems.length > 0 && (
          <div className="divide-y divide-white/5">
            {paginatedProblems.map((prob, idx) => {
              const globalIndex = (currentPage - 1) * itemsPerPage + idx + 1;
              const diffColor = 
                prob.difficulty === 'Easy' 
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                  : prob.difficulty === 'Medium' 
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30';

              return (
                <div 
                  key={prob.link + idx}
                  className="p-4 md:p-5 hover:bg-white/[0.03] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                >
                  {/* Left Column: Index, Title & Topics */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <span className="text-xs font-mono text-neutral-500 shrink-0 w-8 pt-0.5">
                      #{globalIndex}
                    </span>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a 
                          href={prob.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-sm md:text-base hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
                          style={{ color: 'var(--doap-text-prim)' }}
                          title="Open directly on LeetCode"
                        >
                          <span>{prob.title}</span>
                          <ExternalLink size={13} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </a>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${diffColor}`}>
                          {prob.difficulty}
                        </span>

                        {prob.frequency > 75 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <Flame size={10} className="text-rose-400" />
                            <span>High Frequency</span>
                          </span>
                        )}
                      </div>

                      {/* Topic Tags */}
                      {Array.isArray(prob.topics) && prob.topics.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          {prob.topics.map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedTopic(t)}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 border border-white/5 transition-all cursor-pointer"
                              title={`Filter by ${t}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Stats (Acceptance & Frequency) */}
                  <div className="flex items-center gap-5 self-start md:self-center shrink-0 text-xs font-mono">
                    {/* Frequency Meter */}
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-[10px] text-neutral-400">Interview Frequency</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                            style={{ width: `${Math.min(100, prob.frequency || 50)}%` }} 
                          />
                        </div>
                        <span className="text-cyan-400 font-bold">{prob.frequency || 0}%</span>
                      </div>
                    </div>

                    {/* Acceptance Rate */}
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-[10px] text-neutral-400">Acceptance</span>
                      <span className="text-neutral-300 font-semibold">{prob.acceptanceRate}</span>
                    </div>
                  </div>

                  {/* Right Column: CTA Buttons */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleAskDoapAI(prob.title)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Ask DOAP AI Tutor for intuition and code approach"
                    >
                      <Bot size={13} />
                      <span className="hidden sm:inline">Ask AI Tutor</span>
                    </button>

                    <a
                      href={prob.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/90 to-orange-500/90 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all hover:scale-105"
                      title="Open and solve on LeetCode"
                    >
                      <span>Solve on LeetCode</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 8. Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-neutral-900/40" style={{ borderColor: 'var(--doap-border)' }}>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems.toLocaleString()} questions</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all text-neutral-300 cursor-pointer"
                style={{ borderColor: 'var(--doap-border)' }}
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                if (pageNum < 1 || pageNum > totalPages) return null;

                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25' 
                        : 'border hover:bg-white/5 text-neutral-300'
                    }`}
                    style={{ borderColor: isActive ? 'transparent' : 'var(--doap-border)' }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all text-neutral-300 cursor-pointer"
                style={{ borderColor: 'var(--doap-border)' }}
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 rounded-lg border text-xs font-mono outline-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--doap-surface)',
                  borderColor: 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
