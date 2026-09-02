import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Sparkles, Plus, Trash2, X, Check } from 'lucide-react';
import { SmartCoachRecommendation } from '../components/Common/SmartCoachRecommendation';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const StudyPlan = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const tasks = userProgress?.tasks || [];
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('10:00');
  const [newTaskDuration, setNewTaskDuration] = useState('45m');

  const todayObj = new Date();
  const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayName = daysNames[todayObj.getDay()];

  const getDynamicWeekDays = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon ...
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);

    const result = [];
    const orderedDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const isToday = d.toDateString() === today.toDateString();
      result.push({
        day: orderedDayNames[i],
        date: d.getDate().toString(),
        month: d.toLocaleString('default', { month: 'short' }),
        fullDate: d.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' }),
        isToday
      });
    }
    return result;
  };

  const days = getDynamicWeekDays();
  const [selectedDay, setSelectedDay] = useState(
    days.find(d => d.isToday)?.day || 'Mon'
  );

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    updateUserProgress({ tasks: updated });
  };

  const deleteTask = (id, e) => {
    if (e) e.stopPropagation();
    const updated = tasks.filter(t => t.id !== id);
    updateUserProgress({ tasks: updated });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      time: newTaskTime,
      title: newTaskTitle.trim(),
      duration: newTaskDuration,
      completed: false
    };

    const updated = [...tasks, newTask];
    updateUserProgress({ tasks: updated });
    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const generated = [
        { id: Date.now() + 1, time: "08:30", title: "DSA: Graphs & Dynamic Programming", duration: "60m", completed: false },
        { id: Date.now() + 2, time: "10:30", title: "Frontend Architecture & Web Vitals", duration: "45m", completed: false },
        { id: Date.now() + 3, time: "14:00", title: "Backend API Design & Database Indexing", duration: "60m", completed: false },
        { id: Date.now() + 4, time: "16:30", title: "AI/ML Model Fine-Tuning & Integration", duration: "45m", completed: false },
        { id: Date.now() + 5, time: "18:00", title: "Mock Interview Questions & Self-Reflection", duration: "30m", completed: false }
      ];
      updateUserProgress({ tasks: generated });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Top Header & Add Task */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
          }`}>Study Plan</h1>
          <p className={`text-xs font-mono uppercase tracking-wider ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>Cloud synced interactive schedule across all your devices</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className={`px-4 py-2 border rounded-full font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer ${
            isDarkMode 
              ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
              : 'bg-neutral-100 border-neutral-300 text-black hover:bg-neutral-200'
          }`}
        >
          <Plus size={16} />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* AI Smart Learning Coach & Balance Nudge */}
      <SmartCoachRecommendation />

      {/* Days Strip */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((item) => {
          const isSelected = selectedDay === item.day;
          return (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`
                p-2.5 sm:p-3.5 rounded-2xl text-center transition-all cursor-pointer border relative
                ${isSelected 
                  ? (isDarkMode ? 'bg-white text-black border-white font-bold shadow-lg' : 'bg-black text-white border-black font-bold shadow-lg') 
                  : (isDarkMode ? 'bg-[#111111] text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700' : 'bg-white text-neutral-600 border-neutral-200 hover:text-black')
                }
              `}
            >
              {item.isToday && (
                <span 
                  className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-emerald-400 animate-pulse'}`} 
                  title="Today"
                />
              )}
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider opacity-80">
                {item.day}
              </div>
              <div className="text-base sm:text-xl font-extrabold mt-0.5">
                {item.date}
              </div>
              <div className="text-[9px] font-mono opacity-70 uppercase tracking-widest mt-0.5">
                {item.month}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {/* Today's Progress Card */}
          <div className={`p-5 rounded-3xl border space-y-3 ${
            isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
          }`}>
            <span className={`text-[11px] font-mono uppercase tracking-widest block ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              TODAY'S PROGRESS
            </span>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className={isDarkMode ? 'text-white' : 'text-black'}>
                  {completedCount} of {tasks.length} tasks completed
                </span>
                <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>
                  {progressPct}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="p-8 text-center border border-dashed rounded-3xl space-y-3" style={{ borderColor: 'var(--doap-border)' }}>
                <p className="text-xs font-mono text-neutral-400">No study tasks planned yet.</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer hover-glide"
                    style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                  >
                    + Add First Task
                  </button>
                  <button
                    onClick={handleGeneratePlan}
                    disabled={isGenerating}
                    className="px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer hover:opacity-80"
                    style={{ borderColor: 'var(--doap-border)' }}
                  >
                    {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                  </button>
                </div>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer border group ${
                    isDarkMode 
                      ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                      : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {task.completed ? (
                      <CheckCircle2 size={20} className={isDarkMode ? "text-white" : "text-black"} />
                    ) : (
                      <Circle size={20} className={isDarkMode ? "text-neutral-600" : "text-neutral-300"} />
                    )}
                    <span className={`text-xs font-mono font-semibold ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {task.time}
                    </span>
                    <h3 className={`text-sm font-semibold ${
                      task.completed ? 'line-through opacity-50' : ''
                    }`}>
                      {task.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 text-xs font-mono ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      <Clock size={13} />
                      <span>{task.duration}</span>
                    </div>

                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="p-1 rounded-lg text-neutral-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete task"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Action Section */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
          }`}>
            <span className={`text-[11px] font-mono uppercase tracking-widest block ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              AI STUDY OPTIMIZER
            </span>
            <p className={`text-xs leading-relaxed ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Generate an optimal schedule customized to your technical milestones and exam goals.
            </p>
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className={`w-full py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
              <span>{isGenerating ? 'Generating Schedule...' : 'Generate with AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #333333)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--doap-border)' }}>
              <h3 className="font-bold text-base" style={{ color: 'var(--doap-text-prim)' }}>Add New Study Task</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full hover:opacity-80">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--doap-text-sec)' }}>
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dynamic Programming Practice"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--doap-bg, #000)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--doap-text-sec)' }}>
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--doap-bg, #000)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--doap-text-sec)' }}>
                    Duration
                  </label>
                  <select
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--doap-bg, #000)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                  >
                    <option value="15m">15 min</option>
                    <option value="30m">30 min</option>
                    <option value="45m">45 min</option>
                    <option value="60m">60 min</option>
                    <option value="90m">90 min</option>
                    <option value="120m">120 min</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                <Check size={16} />
                <span>Save Task</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
