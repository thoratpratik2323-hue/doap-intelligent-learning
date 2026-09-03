import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers, 
  Code,
  Check
} from 'lucide-react';
import { COURSES_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const MyLearning = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const completedCoursesMap = userProgress?.courses || {};
  const completedSubTopicsMap = userProgress?.completedSubTopics || {};

  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCourseId, setExpandedCourseId] = useState('ai-fundamentals');
  const [expandedModuleKey, setExpandedModuleKey] = useState('ai-fundamentals-1');

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

  // Toggle Entire Module
  const toggleModuleCompletion = (courseId, moduleId, e) => {
    if (e) e.stopPropagation();
    const course = COURSES_DATA.find(c => c.id === courseId);
    const targetModule = (course?.modules || []).find(m => m.id === moduleId);
    const subTopics = targetModule?.subTopics || [];

    const currentCompletedMods = completedCoursesMap[courseId] || [];
    const isModCompleted = currentCompletedMods.includes(moduleId);
    
    // Toggle Module
    const updatedModsForCourse = isModCompleted 
      ? currentCompletedMods.filter(id => id !== moduleId) 
      : [...currentCompletedMods, moduleId];

    // Also toggle all sub-topics inside this module
    const currentCompletedSubs = completedSubTopicsMap[courseId] || [];
    let updatedSubsForCourse = [...currentCompletedSubs];

    if (isModCompleted) {
      // Uncheck all subtopics of this module
      const subIdsToRemove = subTopics.map(s => s.id);
      updatedSubsForCourse = updatedSubsForCourse.filter(id => !subIdsToRemove.includes(id));
    } else {
      // Check all subtopics of this module
      subTopics.forEach(s => {
        if (!updatedSubsForCourse.includes(s.id)) {
          updatedSubsForCourse.push(s.id);
        }
      });
    }

    updateUserProgress({ 
      courses: {
        ...completedCoursesMap,
        [courseId]: updatedModsForCourse
      },
      completedSubTopics: {
        ...completedSubTopicsMap,
        [courseId]: updatedSubsForCourse
      }
    });
  };

  // Toggle Individual Sub-Topic
  const toggleSubTopicCompletion = (courseId, moduleId, subTopicId, e) => {
    if (e) e.stopPropagation();
    const course = COURSES_DATA.find(c => c.id === courseId);
    const targetModule = (course?.modules || []).find(m => m.id === moduleId);
    const subTopics = targetModule?.subTopics || [];

    const currentCompletedSubs = completedSubTopicsMap[courseId] || [];
    const isSubCompleted = currentCompletedSubs.includes(subTopicId);

    const updatedSubsForCourse = isSubCompleted
      ? currentCompletedSubs.filter(id => id !== subTopicId)
      : [...currentCompletedSubs, subTopicId];

    // Check if all subtopics of this module are now completed
    const allSubsCompleted = subTopics.length > 0 && subTopics.every(s => updatedSubsForCourse.includes(s.id));
    const currentCompletedMods = completedCoursesMap[courseId] || [];
    let updatedModsForCourse = [...currentCompletedMods];

    if (allSubsCompleted && !updatedModsForCourse.includes(moduleId)) {
      updatedModsForCourse.push(moduleId);
    } else if (!allSubsCompleted && updatedModsForCourse.includes(moduleId)) {
      updatedModsForCourse = updatedModsForCourse.filter(id => id !== moduleId);
    }

    updateUserProgress({
      courses: {
        ...completedCoursesMap,
        [courseId]: updatedModsForCourse
      },
      completedSubTopics: {
        ...completedSubTopicsMap,
        [courseId]: updatedSubsForCourse
      }
    });
  };

  const handleStudyWithAI = (topicTitle, desc, e) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined') {
      window.location.href = '/ai-tutor';
    }
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
        }`}>Curated engineering modules with deep sub-domain breakdowns & persistent progress</p>
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
          const completedSubs = completedSubTopicsMap[course.id] || [];
          
          // Calculate total subtopics
          let totalCourseSubTopics = 0;
          (course.modules || []).forEach(m => {
            totalCourseSubTopics += (m.subTopics?.length || 1);
          });

          const totalModules = course.modules?.length || course.modulesCount || 5;
          const progressPct = totalCourseSubTopics > 0 
            ? Math.round((completedSubs.length / totalCourseSubTopics) * 100) 
            : (totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0);

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
                      {totalModules} modules • {totalCourseSubTopics} sub-topics • {progressPct}% complete
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

              {/* Module List with Expandable Sub-Domains */}
              {isExpanded && (
                <div className={`divide-y py-2 border-t border-b animate-fade-in ${
                  isDarkMode ? 'divide-neutral-800/80 border-neutral-800' : 'divide-neutral-200/80 border-neutral-200'
                }`}>
                  {(course.modules || []).map((mod) => {
                    const isModCompleted = completedModules.includes(mod.id);
                    const modKey = `${course.id}-${mod.id}`;
                    const isModExpanded = expandedModuleKey === modKey;
                    const subTopics = mod.subTopics || [];
                    const completedSubsInMod = subTopics.filter(s => completedSubs.includes(s.id)).length;

                    return (
                      <div key={mod.id} className="py-2.5 space-y-3">
                        {/* Module Row */}
                        <div 
                          onClick={() => setExpandedModuleKey(isModExpanded ? null : modKey)}
                          className="flex items-center justify-between cursor-pointer group py-1.5 hover:opacity-90 transition-opacity"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="text-xs font-mono font-bold text-neutral-500 w-6">
                              0{mod.id}
                            </span>
                            
                            <button
                              type="button"
                              onClick={(e) => toggleModuleCompletion(course.id, mod.id, e)}
                              className="shrink-0 p-0.5 hover:scale-110 transition-transform cursor-pointer"
                              title={isModCompleted ? "Mark entire module incomplete" : "Mark entire module complete"}
                            >
                              {isModCompleted ? (
                                <CheckCircle2 size={18} style={{ color: accentHex }} />
                              ) : (
                                <Circle size={18} className="text-neutral-500 hover:text-neutral-300" />
                              )}
                            </button>

                            <span className={`text-sm font-medium ${
                              isModCompleted 
                                ? (isDarkMode ? 'text-neutral-400 line-through' : 'text-neutral-500 line-through') 
                                : 'font-semibold'
                            }`}>
                              {mod.title}
                            </span>

                            {subTopics.length > 0 && (
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border hidden sm:inline-block ${
                                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                              }`}>
                                {completedSubsInMod}/{subTopics.length} topics
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-block">
                              {isModExpanded ? 'Collapse' : 'View sub-domains'}
                            </span>
                            <div className="text-neutral-500 group-hover:text-white transition-colors">
                              {isModExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </div>

                        {/* Sub-Domains / Lessons Breakdown */}
                        {isModExpanded && subTopics.length > 0 && (
                          <div className={`ml-9 pl-4 border-l-2 py-2 space-y-2.5 animate-fade-in ${
                            isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                          }`}>
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                                <Layers size={12} /> Sub-Domains ({completedSubsInMod}/{subTopics.length} Completed)
                              </span>
                              <button
                                onClick={(e) => handleStudyWithAI(mod.title, '', e)}
                                className="text-[11px] font-mono px-2.5 py-1 rounded-lg border flex items-center gap-1 hover-glide cursor-pointer"
                                style={{ borderColor: 'var(--doap-border)', color: accentHex }}
                              >
                                <Sparkles size={11} />
                                <span>Study with AI</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {subTopics.map((sub, sIdx) => {
                                const isSubCompleted = completedSubs.includes(sub.id);

                                return (
                                  <div 
                                    key={sub.id || sIdx}
                                    onClick={(e) => toggleSubTopicCompletion(course.id, mod.id, sub.id, e)}
                                    className={`p-3 rounded-xl border transition-all cursor-pointer hover-glide ${
                                      isSubCompleted
                                        ? (isDarkMode ? 'bg-neutral-900/90 border-neutral-700' : 'bg-neutral-100 border-neutral-300')
                                        : (isDarkMode ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700' : 'bg-neutral-50 border-neutral-200/80 hover:border-neutral-300')
                                    }`}
                                  >
                                    <div className="flex items-start gap-2.5">
                                      <button
                                        type="button"
                                        onClick={(e) => toggleSubTopicCompletion(course.id, mod.id, sub.id, e)}
                                        className="shrink-0 mt-0.5 hover:scale-110 transition-transform cursor-pointer"
                                        title={isSubCompleted ? "Mark incomplete" : "Mark complete"}
                                      >
                                        {isSubCompleted ? (
                                          <CheckCircle2 size={16} style={{ color: accentHex }} />
                                        ) : (
                                          <Circle size={16} className="text-neutral-500 hover:text-neutral-300" />
                                        )}
                                      </button>

                                      <div className="space-y-1 flex-1">
                                        <h5 className={`text-xs font-bold leading-tight ${
                                          isSubCompleted ? (isDarkMode ? 'text-neutral-400 line-through' : 'text-neutral-500 line-through') : ''
                                        }`} style={{ color: isSubCompleted ? undefined : 'var(--doap-text-prim)' }}>
                                          {sub.title}
                                        </h5>
                                        <p className="text-[11px] leading-relaxed text-neutral-400">
                                          {sub.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
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
