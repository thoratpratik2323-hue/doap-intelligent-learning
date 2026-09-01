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
