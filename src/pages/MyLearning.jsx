import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { COURSES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const MyLearning = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const completedCoursesMap = userProgress?.courses || {};
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCourseId, setExpandedCourseId] = useState('ai-fundamentals');

  const categories = [
    "All", 
    "Computer Science", 
    "Artificial Intelligence", 
    "Programming", 
    "Data Structures", 
    "Cyber Security", 
    "Mathematics"
  ];

  const filteredCourses = COURSES_DATA.filter(c => 
    activeCategory === 'All' || c.category === activeCategory
  );

  const toggleModuleCompletion = (courseId, moduleId) => {
    const currentCompleted = completedCoursesMap[courseId] || [];
    const isCompleted = currentCompleted.includes(moduleId);
    const updatedForCourse = isCompleted 
      ? currentCompleted.filter(id => id !== moduleId) 
      : [...currentCompleted, moduleId];

    const updatedMap = {
      ...completedCoursesMap,
      [courseId]: updatedForCourse
    };

    updateUserProgress({ courses: updatedMap });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>My Learning</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Curated engineering modules with cloud persistent progress</p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border
              ${activeCategory === cat 
                ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {filteredCourses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          const completedModules = completedCoursesMap[course.id] || [];
          const totalModules = course.modules?.length || course.modulesCount || 5;
          const progressPct = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0;

          return (
            <div 
              key={course.id} 
              className={`p-6 rounded-3xl space-y-5 border transition-colors doap-card ${
                isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
              }`}
            >
              {/* Course Top Info */}
              <div 
                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-black'
                  }`}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold">{course.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <p className={`text-xs font-mono mt-0.5 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {totalModules} modules • {course.duration} • {progressPct}% complete
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Toggle Button */}
                <div className="flex items-center gap-4">
                  <div className={`w-32 h-2 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
                  }`}>
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${progressPct}%`, backgroundColor: accentHex }} 
                    />
                  </div>

                  <button className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Module List */}
              {isExpanded && (
                <div className={`divide-y py-2 border-t border-b animate-fade-in ${
                  isDarkMode ? 'divide-neutral-800/80 border-neutral-800' : 'divide-neutral-200/80 border-neutral-200'
                }`}>
                  {(course.modules || [
                    { id: 1, title: 'Introduction & Fundamental Architecture' },
                    { id: 2, title: 'Core Mechanisms & Data Flow' },
                    { id: 3, title: 'Implementation Patterns & Best Practices' },
                    { id: 4, title: 'Performance Optimization & Benchmarks' },
                    { id: 5, title: 'Comprehensive Real-World Project' }
                  ]).map((mod) => {
                    const isModCompleted = completedModules.includes(mod.id);

                    return (
                      <div 
                        key={mod.id} 
                        onClick={() => toggleModuleCompletion(course.id, mod.id)}
                        className="py-3.5 flex items-center justify-between cursor-pointer group hover:opacity-80 transition-opacity"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-xs font-mono font-bold text-neutral-500 w-6">
                            0{mod.id}
                          </span>
                          {isModCompleted ? (
                            <CheckCircle2 size={18} style={{ color: accentHex }} />
                          ) : (
                            <Circle size={18} className="text-neutral-500 shrink-0" />
                          )}
                          <span className={`text-sm font-medium ${
                            isModCompleted 
                              ? (isDarkMode ? 'text-neutral-400 line-through' : 'text-neutral-500 line-through') 
                              : 'font-semibold'
                          }`}>
                            {mod.title}
                          </span>
                        </div>

                        <span className="text-xs font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isModCompleted ? 'Completed' : 'Click to complete'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
