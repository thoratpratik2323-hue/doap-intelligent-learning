import React, { useState } from 'react';
import { Code, CheckCircle2, Circle, Play, ArrowRight, X, Terminal, Sparkles, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const PROBLEM_DEFINITIONS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    functionName: "twoSum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], display: "twoSum([2, 7, 11, 15], 9)" },
      { input: [[3, 2, 4], 6], expected: [1, 2], display: "twoSum([3, 2, 4], 6)" },
      { input: [[3, 3], 6], expected: [0, 1], display: "twoSum([3, 3], 6)" }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Strings",
    functionName: "isValid",
    description: "Given a string `s` containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    starterCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (stack.pop() !== map[char]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
    tests: [
      { input: ["()[]{}"], expected: true, display: 'isValid("()[]{}")' },
      { input: ["(]"], expected: false, display: 'isValid("(]")' },
      { input: ["([{}])"], expected: true, display: 'isValid("([{}])")' },
      { input: ["("], expected: false, display: 'isValid("(")' }
    ]
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    functionName: "reverseList",
    description: "Given the head of a singly linked list represented as an array, return the reversed list array.",
    starterCode: `function reverseList(head) {
  return [...head].reverse();
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], display: "reverseList([1, 2, 3, 4, 5])" },
      { input: [[1, 2]], expected: [2, 1], display: "reverseList([1, 2])" },
      { input: [[]], expected: [], display: "reverseList([])" }
    ]
  },
  {
    id: 4,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Arrays",
    functionName: "maxProfit",
    description: "Find the maximum profit you can achieve by buying on one day and selling on a different future day.",
    starterCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}`,
    tests: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5, display: "maxProfit([7, 1, 5, 3, 6, 4])" },
      { input: [[7, 6, 4, 3, 1]], expected: 0, display: "maxProfit([7, 6, 4, 3, 1])" }
    ]
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked Lists",
    functionName: "mergeTwoLists",
    description: "Merge two sorted linked lists represented as arrays into one sorted list.",
    starterCode: `function mergeTwoLists(list1, list2) {
  const result = [];
  let i = 0, j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
      result.push(list1[i++]);
    } else {
      result.push(list2[j++]);
    }
  }
  while (i < list1.length) result.push(list1[i++]);
  while (j < list2.length) result.push(list2[j++]);
  return result;
}`,
    tests: [
      { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], display: "mergeTwoLists([1,2,4], [1,3,4])" },
      { input: [[], []], expected: [], display: "mergeTwoLists([], [])" }
    ]
  }
];

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const CodingPractice = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const solvedProblems = userProgress?.solvedProblems || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Active Sandbox State
  const [activeProblem, setActiveProblem] = useState(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);

  const categories = [
    "All", "Arrays", "Strings", "Linked Lists", "Trees", "Graphs", 
    "Dynamic Programming", "Sorting", "Searching"
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredProblems = PROBLEM_DEFINITIONS.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  const handleOpenProblem = (prob) => {
    setActiveProblem(prob);
    setCode(prob.starterCode);
    setRunResult(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setRunResult(null);

    // Run client-side sandboxed execution engine
    setTimeout(() => {
      try {
        const startTime = performance.now();

        // Safe Function Sandbox
        const runner = new Function(`
          ${code}
          if (typeof ${activeProblem.functionName} !== 'function' && typeof solution !== 'function') {
            throw new Error("Could not find function '${activeProblem.functionName}' or 'solution'. Please check your function definition.");
          }
          const targetFn = typeof ${activeProblem.functionName} === 'function' ? ${activeProblem.functionName} : solution;
          return targetFn;
        `)();

        const testResults = [];
        let allPassed = true;

        for (let i = 0; i < activeProblem.tests.length; i++) {
          const testCase = activeProblem.tests[i];
          const tStart = performance.now();
          const actual = runner(...testCase.input);
          const tDuration = (performance.now() - tStart).toFixed(2);

          const passed = deepEqual(actual, testCase.expected);
          if (!passed) allPassed = false;

          testResults.push({
            id: i + 1,
            display: testCase.display,
            expected: JSON.stringify(testCase.expected),
            actual: JSON.stringify(actual),
            passed,
            duration: `${tDuration}ms`
          });
        }

        const totalTime = (performance.now() - startTime).toFixed(1);

        setRunResult({
          success: true,
          allPassed,
          runtime: `${totalTime} ms`,
          tests: testResults
        });

        // If all tests passed, save to cloud progress
        if (allPassed) {
          if (!solvedProblems.includes(activeProblem.id)) {
            const updated = [...solvedProblems, activeProblem.id];
            updateUserProgress({ solvedProblems: updated });
          }
        }
      } catch (err) {
        setRunResult({
          success: false,
          allPassed: false,
          error: `Runtime Error: ${err.message}`
        });
      } finally {
        setIsRunning(false);
      }
    }, 250);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>Coding Practice</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Sharpen problem solving with real-time in-browser automated test suites</p>
      </div>

      {/* Filter Row: Categories + Difficulty */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border
                ${selectedCategory === cat 
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border
                ${selectedDifficulty === diff 
                  ? (isDarkMode ? 'bg-white text-black border-white font-bold' : 'bg-black text-white border-black font-bold') 
                  : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
                }
              `}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {filteredProblems.map((prob) => {
          const isSolved = solvedProblems.includes(prob.id);

          return (
            <div
              key={prob.id}
              onClick={() => handleOpenProblem(prob)}
              className={`
                p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer border doap-card group
                ${isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-neutral-400">
                  {isSolved ? (
                    <CheckCircle2 size={20} style={{ color: accentHex }} />
                  ) : (
                    <Circle size={20} className={isDarkMode ? "text-neutral-600" : "text-neutral-300"} />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-neutral-500">#{prob.id}</span>
                    <h3 className="text-sm font-bold">{prob.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      prob.difficulty === 'Easy'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{prob.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                  {isSolved ? 'Solved' : 'Solve Challenge'}
                </span>
                <ArrowRight size={16} className={isDarkMode ? "text-neutral-600" : "text-neutral-400"} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Code Sandbox Modal Drawer */}
      {activeProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #333333)' }}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--doap-border)' }}>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-white/10">#{activeProblem.id}</span>
                <div>
                  <h3 className="font-bold text-base" style={{ color: 'var(--doap-text-prim)' }}>{activeProblem.title}</h3>
                  <p className="text-[11px] font-mono text-neutral-400">{activeProblem.category} • {activeProblem.difficulty}</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveProblem(null)}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ borderColor: 'var(--doap-border)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Editor & Console */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 font-mono">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>JavaScript (ES6) Sandbox</span>
                  <button 
                    onClick={() => setCode(activeProblem.starterCode)}
                    className="text-[11px] flex items-center gap-1 text-neutral-400 hover:text-white"
                  >
                    <RefreshCw size={11} />
                    <span>Reset Starter Code</span>
                  </button>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={11}
                  className="w-full p-4 rounded-2xl border text-xs leading-relaxed focus:outline-none font-mono resize-none shadow-inner"
                  style={{ 
                    backgroundColor: '#0a0a0a', 
                    borderColor: 'var(--doap-border, #262626)', 
                    color: '#e4e4e7' 
                  }}
                  spellCheck={false}
                />
              </div>

              {/* Execution Console Results */}
              <div 
                className="p-4 rounded-2xl border text-xs space-y-3"
                style={{ backgroundColor: '#070707', borderColor: 'var(--doap-border, #222222)' }}
              >
                <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: '#222' }}>
                  <span className="flex items-center gap-1.5 font-bold text-neutral-300">
                    <Terminal size={14} />
                    <span>Execution Results</span>
                  </span>
                  {runResult && runResult.runtime && (
                    <span className="text-[10px] text-neutral-400">Runtime: {runResult.runtime}</span>
                  )}
                </div>

                {!runResult ? (
                  <p className="text-neutral-500 text-[11px]">Click "Run Code & Tests" to execute your solution against automated test cases.</p>
                ) : runResult.error ? (
                  <div className="flex items-start gap-2 text-rose-400 text-xs">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span>{runResult.error}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {runResult.allPassed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check size={14} />
                          <span>All Test Cases Passed!</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <AlertCircle size={14} />
                          <span>Some Test Cases Failed</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {runResult.tests.map((t) => (
                        <div key={t.id} className="p-2.5 rounded-xl bg-black/40 border border-neutral-800 text-[11px] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {t.passed ? (
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle size={14} className="text-rose-400 shrink-0" />
                            )}
                            <span className={t.passed ? "text-neutral-300" : "text-rose-300"}>
                              Test {t.id}: {t.display}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-500">{t.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--doap-border)' }}>
              <button
                onClick={() => {
                  const updated = solvedProblems.includes(activeProblem.id)
                    ? solvedProblems.filter(id => id !== activeProblem.id)
                    : [...solvedProblems, activeProblem.id];
                  updateUserProgress({ solvedProblems: updated });
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer hover:opacity-80 flex items-center gap-1.5"
                style={{ borderColor: 'var(--doap-border)' }}
              >
                <Check size={14} />
                <span>{solvedProblems.includes(activeProblem.id) ? 'Marked as Solved' : 'Mark as Solved'}</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer hover-glide flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              >
                <Play size={14} className={isRunning ? "animate-spin" : ""} />
                <span>{isRunning ? 'Running Tests...' : 'Run Code & Tests'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
