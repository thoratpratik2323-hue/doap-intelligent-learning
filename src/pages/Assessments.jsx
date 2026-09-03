import React, { useState } from 'react';
import { FileCheck2, ArrowRight, X, CheckCircle2, Clock, Award, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const ASSESSMENT_QUIZZES = {
  'ai-readiness': {
    title: 'Full AI Readiness Assessment',
    questions: [
      {
        q: 'Which algorithm is commonly used for gradient-based optimization in deep neural networks?',
        options: ['Adam Optimizer', 'Dijkstra Algorithm', 'Binary Search', 'Bubble Sort'],
        correct: 0
      },
      {
        q: 'What is the purpose of the Transformer self-attention mechanism?',
        options: [
          'To sort tokens by length',
          'To dynamically weigh the contextual relationship between any two tokens in a sequence',
          'To compress the model weights into 8-bit integers',
          'To prevent memory leaks in the GPU'
        ],
        correct: 1
      },
      {
        q: 'In Machine Learning, what problem does L2 regularization (Ridge) primarily address?',
        options: ['Underfitting', 'Overfitting by penalizing large model weights', 'Data missingness', 'GPU memory exhaustion'],
        correct: 1
      },
      {
        q: 'Which metric is most suitable for evaluating highly imbalanced classification datasets?',
        options: ['Accuracy', 'F1-Score / Area Under Precision-Recall Curve', 'Mean Absolute Error', 'R-Squared'],
        correct: 1
      },
      {
        q: 'What is the key advantage of Retrieval-Augmented Generation (RAG)?',
        options: [
          'It replaces the LLM with a SQL database',
          'It grounds LLM responses with external verified facts without retraining the model',
          'It increases network latency',
          'It removes the need for vector embeddings'
        ],
        correct: 1
      }
    ]
  },
  'dsa-practice': {
    title: 'DSA Practice Test — Trees & Graphs',
    questions: [
      {
        q: 'What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correct: 2
      },
      {
        q: 'Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correct: 1
      },
      {
        q: 'What data structure is standardly used to implement Breadth-First Search (BFS) in a graph?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Trie'],
        correct: 1
      },
      {
        q: 'In an AVL tree, what is the maximum permissible difference in height between left and right subtrees?',
        options: ['0', '1', '2', 'log N'],
        correct: 1
      },
      {
        q: 'Dijkstra’s single-source shortest path algorithm cannot handle:',
        options: ['Dense graphs', 'Negative edge weights', 'Directed acyclic graphs', 'Trees'],
        correct: 1
      }
    ]
  },
  'job-readiness': {
    title: 'Job Readiness Assessment',
    questions: [
      {
        q: 'In system design, what is the primary role of a Reverse Proxy (e.g. Nginx)?',
        options: ['To compile JavaScript code', 'Load balancing, SSL termination, and caching', 'To store user passwords', 'To act as a database index'],
        correct: 1
      },
      {
        q: 'Which HTTP status code signifies that the client is not authenticated?',
        options: ['200 OK', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
        correct: 1
      },
      {
        q: 'What does the ACID acronym stand for in relational databases?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integrity, Data',
          'Asynchronous, Concurrent, Indexed, Distributed',
          'Authorization, Cipher, Identity, Defense'
        ],
        correct: 0
      },
      {
        q: 'What is the key benefit of database indexing on frequently queried columns?',
        options: ['Speeds up SELECT queries at the cost of slight INSERT/UPDATE overhead', 'Decreases storage size', 'Guarantees 100% uptime', 'Encrypts user data'],
        correct: 0
      },
      {
        q: 'In modern frontend architecture, what is hydration?',
        options: [
          'Cooling down the server CPU',
          'Attaching event listeners to server-rendered HTML markup in the client browser',
          'Minifying CSS files',
          'Removing unused npm packages'
        ],
        correct: 1
      }
    ]
  },
  'c-systems': {
    title: 'C Language & Systems Internals Exam',
    questions: [
      {
        q: "What is the output of sizeof('A') in C, and why?",
        options: [
          "4 (Character literals have type int in C)",
          "1 (Char size)",
          "8 (Double size)",
          "Undefined Behavior"
        ],
        correct: 0
      },
      {
        q: "What does calling free(NULL) do according to the C standard?",
        options: [
          "Performs no operation and is guaranteed safe",
          "Causes a Segmentation Fault",
          "Causes a Memory Leak",
          "Throws a NullPointerException"
        ],
        correct: 0
      },
      {
        q: "If int *p = &x;, what does the expression *p++ do?",
        options: [
          "Dereferences current address, then advances the pointer to the next element",
          "Increments the value stored at *p by 1",
          "Increments both the address and the value",
          "Compilation Error"
        ],
        correct: 0
      },
      {
        q: "Why does the expression (n & (n - 1)) == 0 evaluate to true for positive n?",
        options: [
          "When n is a power of 2 (only one set bit)",
          "When n is an odd number",
          "When n is divisible by 3",
          "When n is zero"
        ],
        correct: 0
      },
      {
        q: "Why might sizeof(struct) be larger than the sum of its member sizes?",
        options: [
          "Due to compiler structure padding for CPU alignment requirements",
          "Because of memory fragmentation",
          "Because of garbage collection headers",
          "Because C pointers always require 16 bytes"
        ],
        correct: 0
      }
    ]
  },
  'python-internals': {
    title: 'Python Architecture & CPython Master Exam',
    questions: [
      {
        q: "If a = [1, 2, 3] and b = a; b.append(4). What is the value of a?",
        options: [
          "[1, 2, 3, 4] (both share the same list reference)",
          "[1, 2, 3]",
          "TypeError: mutated alias",
          "[4]"
        ],
        correct: 0
      },
      {
        q: "Why does Python multithreading fail to speed up CPU-bound tasks in CPython?",
        options: [
          "Due to the Global Interpreter Lock (GIL) serializing bytecode execution",
          "Because Python does not support multi-core CPUs",
          "Due to recursion limit exhaustion",
          "Because Python cannot allocate heap memory across threads"
        ],
        correct: 0
      },
      {
        q: "What is the key difference between __new__ and __init__ in Python?",
        options: [
          "__new__ is the static constructor creating the instance; __init__ initializes fields",
          "__new__ is for classes, __init__ is for functions",
          "They are identical and interchangeable",
          "__init__ runs before __new__"
        ],
        correct: 0
      },
      {
        q: "What does the @property decorator do in Python?",
        options: [
          "Allows a method to be accessed like an attribute without ()",
          "Converts a function to C bytecode",
          "Makes the variable immutable forever",
          "Registers a class in the global metaclass registry"
        ],
        correct: 0
      },
      {
        q: "Why is `def add(item, bucket=[])` dangerous in Python?",
        options: [
          "The default list is created once at def-time and shared across all calls",
          "Python raises a SyntaxError for mutable default arguments",
          "It causes an immediate memory leak",
          "It crashes during garbage collection"
        ],
        correct: 0
      }
    ]
  },
  'java-mastery': {
    title: 'Java 21 & JVM Concurrency Master Assessment',
    questions: [
      {
        q: "What are Virtual Threads (Project Loom) finalized in Java 21?",
        options: [
          "Lightweight JVM-managed threads scheduled onto carrier OS threads",
          "GPU-based parallel compute units",
          "A single-threaded event loop like Node.js",
          "Thread pools with a fixed size of 1"
        ],
        correct: 0
      },
      {
        q: "In Java Generics, what does PECS stand for?",
        options: [
          "Producer Extends, Consumer Super",
          "Private Extends, Concrete Super",
          "Polymorphic Extension, Class Super",
          "Parameterized Encapsulation, Custom Scope"
        ],
        correct: 0
      },
      {
        q: "Why does volatile not make i++ thread-safe?",
        options: [
          "Because increment is a 3-step read-modify-write compound operation",
          "Because volatile is only for boolean variables",
          "Because volatile is ignored by the JIT compiler",
          "Because i++ runs exclusively in the CPU cache"
        ],
        correct: 0
      },
      {
        q: "What optimization does JIT Escape Analysis perform when an object does not escape a method?",
        options: [
          "Scalar replacement — allocates fields on the stack/registers, avoiding heap allocation",
          "Encrypts the object in RAM",
          "Transfers the object to disk cache",
          "Converts Java code to C++ at runtime"
        ],
        correct: 0
      },
      {
        q: "Why is ArrayDeque preferred over legacy Stack in modern Java?",
        options: [
          "ArrayDeque is faster and avoids unnecessary Vector synchronized lock contention",
          "Stack cannot store generic objects",
          "ArrayDeque uses zero memory",
          "Stack throws checked exceptions on pop"
        ],
        correct: 0
      }
    ]
  },
  'dsa-numericals': {
    title: 'DSA Complexity & Numerical Benchmark',
    questions: [
      {
        q: "A loop starts at n = 128 and divides n by 2 in every iteration until n = 1. How many iterations occur?",
        options: ["7 iterations (log2(128) = 7)", "8 iterations", "6 iterations", "14 iterations"],
        correct: 0
      },
      {
        q: "An array contains 20 elements. How many total non-empty contiguous subarrays does it have?",
        options: ["210 (Formula: n*(n+1)/2 = 20*21/2)", "400", "190", "1024"],
        correct: 0
      },
      {
        q: "A balanced BST contains 1,023 nodes. What is its height if the root is at level 0?",
        options: ["9 (log2(1024) - 1)", "10", "11", "8"],
        correct: 0
      },
      {
        q: "A hash table has 100 slots and contains 75 elements. How many additional elements can be inserted before reaching a load factor of 0.9?",
        options: ["15 (90 - 75 = 15)", "25", "10", "90"],
        correct: 0
      },
      {
        q: "For a recurrence relation T(n) = 2T(n/2) + n, what is its asymptotic time complexity (Master Theorem)?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correct: 0
      }
    ]
  }
};

export const Assessments = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { userProgress, updateUserProgress } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const [activeCategory, setActiveCategory] = useState('All');
  const assessments = userProgress?.assessments || [];

  // Active Quiz State
  const [activeQuizKey, setActiveQuizKey] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const categories = ["All", "Academic", "AI Readiness", "Skill", "Practice Test", "Mock Exam", "Job Readiness"];

  const filteredAssessments = assessments.filter(a => 
    activeCategory === 'All' || a.category === activeCategory
  );

  const handleStartQuiz = (quizKey) => {
    setActiveQuizKey(quizKey);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizScore(0);
  };

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    const quiz = ASSESSMENT_QUIZZES[activeQuizKey];
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    setQuizScore(percentage);
    setIsSubmitted(true);

    // Save score to cloud assessment list
    const newRecord = {
      id: `ass_${Date.now()}`,
      title: quiz.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: '5 min',
      score: `${percentage}%`,
      scoreNum: percentage,
      category: activeQuizKey === 'ai-readiness' ? 'AI Readiness' : activeQuizKey === 'dsa-practice' ? 'Practice Test' : 'Job Readiness',
      tags: ['Verified', 'Cloud Synced']
    };

    const updated = [newRecord, ...assessments];
    const totalScore = updated.reduce((acc, a) => acc + (a.scoreNum || parseInt(a.score) || 0), 0);
    const newAverage = Math.round(totalScore / updated.length);

    updateUserProgress({ assessments: updated }, { aiReadiness: newAverage });
  };

  const activeQuiz = activeQuizKey ? ASSESSMENT_QUIZZES[activeQuizKey] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>Assessments</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Interactive quizzes, technical evaluations, and readiness scores</p>
      </div>

      {/* Top Grid: Start New Cards (8 cols) + Score Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Start New Section */}
        <div className="lg:col-span-8 space-y-3">
          <span className={`text-[11px] font-mono uppercase tracking-widest block ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            START LIVE ASSESSMENT
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: AI Readiness */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  AI READINESS
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  Full AI Readiness Assessment
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 Instant Score</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('ai-readiness')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 2: DSA Trees & Graphs */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  PRACTICE TEST
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  DSA: Trees & Graphs
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 Instant Score</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('dsa-practice')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 3: Job Readiness */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  JOB READINESS
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  Job Readiness Assessment
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 Instant Score</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('job-readiness')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 4: C Systems */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
                }`}>
                  C SYSTEMS EXAM
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  C Language & Memory Internals
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 Systems & Pointers</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('c-systems')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 5: Python Internals */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  PYTHON ARCHITECTURE
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  Python GIL, OOP & Metaclasses
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 CPython Mastery</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('python-internals')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 6: Java 21 & Concurrency */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  JAVA 21 & JVM
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  Java 21, Loom & JVM Internals
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 JVM & Concurrency</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('java-mastery')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>

            {/* Card 7: DSA Numericals */}
            <div className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between border transition-all doap-card ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}>
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                  NUMERICAL BENCHMARK
                </span>
                <h4 className="text-xs font-bold leading-snug">
                  DSA Complexity & Math Calculations
                </h4>
              </div>

              <div className={`space-y-2 pt-2 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className={`text-[11px] font-mono space-y-0.5 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <p>⏱ 5 Questions</p>
                  <p>📊 Big-O & Calculations</p>
                </div>
                <button 
                  onClick={() => handleStartQuiz('dsa-numericals')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover-glide shadow-sm"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
                >
                  <Play size={13} />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Score Metrics */}
        <div className="lg:col-span-4 space-y-3">
          <div className={`p-5 rounded-3xl space-y-2 border doap-card ${
            isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
          }`}>
            <span className={`text-[11px] font-mono uppercase tracking-wider block ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              COMPLETED TESTS
            </span>
            <div className="text-4xl font-extrabold font-mono" style={{ color: accentHex }}>
              {assessments.length}
            </div>
            <p className={`text-xs font-mono ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Recorded assessment sessions</p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border
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

      {/* Assessment History List */}
      <div className="space-y-3">
        {filteredAssessments.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl flex items-center justify-between transition-all border doap-card ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 text-white hover:border-neutral-700' 
                : 'bg-white border-neutral-200 text-black hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-black'
              }`}>
                <FileCheck2 size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">{item.title}</h4>
                <div className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                  <span>•</span>
                  <div className="flex gap-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[10px] border ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl font-black font-mono" style={{ color: accentHex }}>
                {item.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quiz Runner Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #333333)' }}
          >
            {/* Modal Header */}
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--doap-border)' }}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Assessment Session</span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--doap-text-prim)' }}>{activeQuiz.title}</h3>
              </div>
              <button 
                onClick={() => setActiveQuizKey(null)}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ borderColor: 'var(--doap-border)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Quiz Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {!isSubmitted ? (
                <>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>Live Test</span>
                    </span>
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h4 className="text-base font-bold leading-relaxed" style={{ color: 'var(--doap-text-prim)' }}>
                      {activeQuiz.questions[currentQuestionIdx].q}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {activeQuiz.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(optIdx)}
                            className={`p-3.5 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-3 ${
                              isSelected 
                                ? 'bg-white/10 border-white text-white font-bold' 
                                : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                              isSelected ? 'border-white bg-white text-black' : 'border-neutral-600'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                /* Quiz Result Screen */
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: accentHex }}>
                    <Award size={32} style={{ color: accentHex }} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">Assessment Completed</span>
                    <div className="text-5xl font-black font-mono" style={{ color: accentHex }}>
                      {quizScore}%
                    </div>
                    <p className="text-sm font-semibold pt-1">
                      {quizScore >= 80 ? 'Excellent performance! Solid technical mastery.' : 'Good attempt! Review weak areas and retake.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Navigation */}
            <div className="p-4 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--doap-border)' }}>
              {!isSubmitted ? (
                <>
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border disabled:opacity-30 cursor-pointer"
                    style={{ borderColor: 'var(--doap-border)' }}
                  >
                    Previous
                  </button>

                  {currentQuestionIdx < activeQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx(prev => Math.min(activeQuiz.questions.length - 1, prev + 1))}
                      className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                      style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                      style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
                    >
                      Submit Assessment
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setActiveQuizKey(null)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
                >
                  Close & View Scorecard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
