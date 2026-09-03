import React, { useState } from 'react';
import { Code, CheckCircle2, Circle, Play, ArrowRight, X, Terminal, Sparkles, Check, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { pushSolutionToGitHub } from '../services/githubService';

const PROBLEM_DEFINITIONS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    functionName: "twoSum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    hint: "Instead of nested loops O(N²), store visited numbers and their indices in a Map to find the complement (target - num) in O(1) lookup time.",
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
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
    hint: "Use a Stack (LIFO). Push opening brackets onto the stack. When seeing a closing bracket, pop the top element and verify it matches.",
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your solution here
  
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
    hint: "Iterate through the elements and construct the reversed output, or use array manipulation methods.",
    starterCode: `/**
 * @param {number[]} head
 * @return {number[]}
 */
function reverseList(head) {
  // Write your solution here
  
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
    hint: "Keep track of the minimum price seen so far. At each day, calculate (current price - min price) and track the highest profit.",
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your solution here
  
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
    hint: "Use two pointers pointing to the heads of both lists. Compare current values, push the smaller one to result, and increment that pointer.",
    starterCode: `/**
 * @param {number[]} list1
 * @param {number[]} list2
 * @return {number[]}
 */
function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}`,
    tests: [
      { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], display: "mergeTwoLists([1,2,4], [1,3,4])" },
      { input: [[], []], expected: [], display: "mergeTwoLists([], [])" }
    ]
  },
  {
    id: 6,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Searching",
    functionName: "search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, return the index of `target` if it exists, or `-1` if it does not.",
    hint: "Maintain left and right boundaries. Check the middle element: if nums[mid] === target return mid; if nums[mid] < target search right; else search left.",
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Write your solution here
  
}`,
    tests: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, display: "search([-1,0,3,5,9,12], 9)" },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, display: "search([-1,0,3,5,9,12], 2)" }
    ]
  },
  {
    id: 7,
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    functionName: "maxSubArray",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    hint: "Use Kadane's Algorithm: At each step, currentMax = Math.max(num, currentMax + num), and update globalMax = Math.max(globalMax, currentMax).",
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your solution here
  
}`,
    tests: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, display: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])" },
      { input: [[1]], expected: 1, display: "maxSubArray([1])" },
      { input: [[5, 4, -1, 7, 8]], expected: 23, display: "maxSubArray([5,4,-1,7,8])" }
    ]
  },
  {
    id: 8,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    functionName: "trap",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    hint: "Use Two Pointers (left & right). Track leftMax and rightMax. Water trapped at each step is determined by min(leftMax, rightMax) - height.",
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // Write your solution here
  
}`,
    tests: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, display: "trap([0,1,0,2,1,0,1,3,2,1,2,1])" },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9, display: "trap([4,2,0,3,2,5])" }
    ]
  },
  {
    id: 9,
    title: "Sieve of Eratosthenes",
    difficulty: "Medium",
    category: "Algorithms & Math",
    functionName: "sieve",
    description: "Given an integer `n`, return an array of all prime numbers less than or equal to `n` in ascending order.",
    hint: "Initialize a boolean array of size n+1 with true. Mark 0 and 1 as false. For i from 2 to sqrt(n), if isPrime[i] is true, mark all multiples i*i, i*(i+1)... as false.",
    starterCode: `/**
 * @param {number} n
 * @return {number[]}
 */
function sieve(n) {
  // Write your solution here
  
}`,
    tests: [
      { input: [10], expected: [2, 3, 5, 7], display: "sieve(10)" },
      { input: [20], expected: [2, 3, 5, 7, 11, 13, 17, 19], display: "sieve(20)" }
    ]
  },
  {
    id: 10,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    functionName: "merge",
    description: "Given an array of `intervals` where `intervals[i] = [start, end]`, merge all overlapping intervals, and return an array of the non-overlapping intervals.",
    hint: "Sort intervals by their start time. Iterate and merge with the previous interval if curr.start <= prev.end.",
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  // Write your solution here
  
}`,
    tests: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], display: "merge([[1,3],[2,6],[8,10],[15,18]])" },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]], display: "merge([[1,4],[4,5]])" }
    ]
  }
];

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const CodingPractice = () => {
  const { isDarkMode, activeAccentHex, navigateTo } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const solvedProblems = userProgress?.solvedProblems || [];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Multi-Language State
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // 'javascript' | 'python' | 'cpp' | 'java'

  // Active Sandbox State
  const [activeProblem, setActiveProblem] = useState(null);
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [isPushingToGit, setIsPushingToGit] = useState(false);
  const [gitPushResult, setGitPushResult] = useState(null);

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

  const getLanguageStarterCode = (prob, lang) => {
    if (!prob) return '';
    if (lang === 'python') {
      return `# Python 3 (Judge0 Sandbox)
class Solution:
    def ${prob.functionName}(self, *args):
        # Write your solution here
        pass

# Example test run:
print("Executing ${prob.title}...")
s = Solution()
`;
    }
    if (lang === 'cpp') {
      return `// C++ (GCC 9.2.0 - Judge0)
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    void ${prob.functionName}() {
        // Write your solution here
    }
};

int main() {
    cout << "Testing ${prob.title}..." << endl;
    return 0;
}
`;
    }
    if (lang === 'java') {
      return `// Java (OpenJDK 13.0.1 - Judge0)
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Testing ${prob.title} in Java...");
    }
}
`;
    }
    return prob.starterCode;
  };

  const handleOpenProblem = (prob) => {
    setActiveProblem(prob);
    setCode(getLanguageStarterCode(prob, selectedLanguage));
    setShowHint(false);
    setRunResult(null);
    setGitPushResult(null);
  };

  const handlePushToGitHub = async () => {
    if (!activeProblem || !code) return;
    setIsPushingToGit(true);
    setGitPushResult(null);

    try {
      const slug = activeProblem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const res = await pushSolutionToGitHub({
        problemTitle: activeProblem.title,
        problemSlug: slug,
        language: selectedLanguage,
        code,
        difficulty: activeProblem.difficulty
      });

      setGitPushResult({
        success: true,
        message: `Successfully pushed to ${res.username}/${res.repoName}!`,
        url: res.fileUrl
      });
    } catch (err) {
      setGitPushResult({
        success: false,
        message: err.message || 'Failed to push to GitHub.'
      });
    } finally {
      setIsPushingToGit(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (activeProblem) {
      setCode(getLanguageStarterCode(activeProblem, lang));
      setRunResult(null);
      setGitPushResult(null);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setRunResult(null);

    // If Python, C++, or Java: run via Judge0 RapidAPI engine
    if (selectedLanguage !== 'javascript') {
      const languageIds = {
        python: 71,
        cpp: 54,
        java: 62
      };

      try {
        const rapidKey = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_rapidapi_key') : '') || 'b3ac93ff96msh31c7e910f4e8feep199f63jsn5cf62a6a6c1e';
        const startTime = performance.now();

        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': rapidKey,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageIds[selectedLanguage] || 71,
            stdin: ''
          })
        });

        const totalTime = (performance.now() - startTime).toFixed(1);

        if (response.ok) {
          const data = await response.json();
          const stdout = data.stdout || data.compile_output || (data.status ? data.status.description : 'Code executed successfully with no output.');
          const stderr = data.stderr;
          const isSuccess = data.status?.id === 3 || (!stderr && !data.compile_output);

          setRunResult({
            success: isSuccess,
            allPassed: isSuccess,
            runtime: `${data.time || totalTime} s`,
            memory: `${data.memory || 0} KB`,
            isJudge0: true,
            language: selectedLanguage.toUpperCase(),
            stdout: stdout,
            stderr: stderr
          });
        } else {
          // If rapidapi subscription pending or network error
          setRunResult({
            success: false,
            allPassed: false,
            error: "Judge0 compiler reached. Please ensure 'Subscribe to Test' (Free Plan) is activated on RapidAPI."
          });
        }
      } catch (err) {
        setRunResult({
          success: false,
          allPassed: false,
          error: `Judge0 Connection Error: ${err.message}`
        });
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // JavaScript client-side automated test suites
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
              {/* Language Selector Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/40 border border-neutral-800">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'javascript', label: '⚡ JavaScript (ES6)' },
                    { id: 'python', label: '🐍 Python 3' },
                    { id: 'cpp', label: '⚡ C++ (GCC)' },
                    { id: 'java', label: '☕ Java' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        selectedLanguage === lang.id
                          ? (isDarkMode ? 'bg-white text-black font-bold border-white shadow' : 'bg-black text-white font-bold border-black shadow')
                          : (isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' : 'bg-neutral-100 border-neutral-300 text-neutral-600 hover:text-black')
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {selectedLanguage !== 'javascript' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Judge0 Sandbox Active
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="capitalize">{selectedLanguage} Sandbox</span>
                    {activeProblem.hint && (
                      <button 
                        onClick={() => setShowHint(!showHint)}
                        className={`text-[11px] px-2 py-0.5 rounded-md border flex items-center gap-1 transition-colors cursor-pointer ${
                          showHint 
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 font-bold' 
                            : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-amber-300 hover:border-amber-400/30'
                        }`}
                      >
                        <Sparkles size={11} />
                        <span>{showHint ? 'Hide Hint' : '💡 Need a Hint?'}</span>
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => setCode(getLanguageStarterCode(activeProblem, selectedLanguage))}
                    className="text-[11px] flex items-center gap-1 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <RefreshCw size={11} />
                    <span>Reset Starter Code</span>
                  </button>
                </div>

                {/* Collapsible Hint Card */}
                {showHint && activeProblem.hint && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-fade-in">
                    <Sparkles size={15} className="shrink-0 text-amber-400 mt-0.5" />
                    <p className="leading-relaxed"><strong className="text-amber-300">Algorithmic Hint:</strong> {activeProblem.hint}</p>
                  </div>
                )}

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={11}
                  className="w-full p-4 rounded-2xl border text-xs leading-relaxed focus:outline-none font-mono resize-none shadow-inner"
                  style={{ 
                    backgroundColor: '#0a0a0a', 
                    borderColor: 'var(--doap-border, #333333)',
                    color: '#f4f4f5'
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
                    <span>{runResult?.isJudge0 ? `Judge0 ${runResult.language} Compiler Output` : 'Execution Results'}</span>
                  </span>
                  {runResult && runResult.runtime && (
                    <span className="text-[10px] text-neutral-400">
                      Runtime: {runResult.runtime} {runResult.memory ? `• Memory: ${runResult.memory}` : ''}
                    </span>
                  )}
                </div>

                {!runResult ? (
                  <p className="text-neutral-500 text-[11px]">Click "Run Code & Tests" to execute your solution.</p>
                ) : runResult.error ? (
                  <div className="flex items-start gap-2 text-rose-400 text-xs">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span>{runResult.error}</span>
                  </div>
                ) : runResult.isJudge0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold flex items-center gap-1 ${runResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {runResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
                        <span>{runResult.success ? 'Compilation & Execution Succeeded' : 'Execution Returned Warning/Error'}</span>
                      </span>
                    </div>

                    {runResult.stdout && (
                      <div className="p-3 rounded-xl bg-black border border-neutral-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap">
                        {runResult.stdout}
                      </div>
                    )}

                    {runResult.stderr && (
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-rose-300 font-mono text-xs whitespace-pre-wrap">
                        {runResult.stderr}
                      </div>
                    )}
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
                      {runResult.tests && runResult.tests.map((t) => (
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

            {/* GitHub Push Result Alert */}
            {gitPushResult && (
              <div className={`mx-4 p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                gitPushResult.success 
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  {gitPushResult.success ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0" /> : <AlertCircle size={15} className="text-rose-400 shrink-0" />}
                  <span>{gitPushResult.message}</span>
                </div>
                {gitPushResult.url && (
                  <a 
                    href={gitPushResult.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="underline font-bold flex items-center gap-1 hover:opacity-80 shrink-0"
                  >
                    <span>View File on GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="p-4 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'var(--doap-border)' }}>
              <div className="flex items-center gap-2">
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
                  onClick={handlePushToGitHub}
                  disabled={isPushingToGit}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--doap-surface-sec, #1e1e1e)', borderColor: 'var(--doap-border, #333333)', color: 'var(--doap-text-prim, #ffffff)' }}
                  title="Export solution to your personal GitHub repository"
                >
                  {isPushingToGit ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Pushing to GitHub...</span>
                    </>
                  ) : (
                    <>
                      <span>🐙 Push to My GitHub</span>
                    </>
                  )}
                </button>
              </div>

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
