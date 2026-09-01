// DOAP Application Clean Production Initial Models & Schemas

export const INITIAL_PROFILE = {
  name: "Student",
  title: "",
  university: "",
  course: "",
  year: "",
  avatar: "U",
  bio: "",
  stats: {
    achievements: 0,
    dayStreak: 1,
    aiReadiness: 0
  },
  skills: [],
  interests: [],
  careerGoals: []
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', path: '/', icon: 'Home' },
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'ai-tutor', label: 'AI Tutor', path: '/ai-tutor', icon: 'MessageSquare' },
  { id: 'learning', label: 'My Learning', path: '/learning', icon: 'BookOpen' },
  { id: 'study-plan', label: 'Study Plan', path: '/study-plan', icon: 'Calendar' },
  { id: 'coding', label: 'Coding Practice', path: '/coding', icon: 'Code' },
  { id: 'interview', label: 'AI Interview', path: '/interview', icon: 'Video' },
  { id: 'assessments', label: 'Assessments', path: '/assessments', icon: 'FileCheck2' },
  { id: 'job-readiness', label: 'Job Readiness', path: '/job-readiness', icon: 'Briefcase' }
];

export const STAT_CARDS = [
  {
    id: "readiness",
    title: "AI Readiness",
    value: "0%",
    change: "Not assessed",
    subtext: "Take assessment",
    isPositive: true,
    icon: "TrendingUp"
  },
  {
    id: "learning",
    title: "Learning",
    value: "0%",
    subtext: "Modules completed",
    icon: "Zap"
  },
  {
    id: "coding",
    title: "Coding",
    value: "0",
    subtext: "Problems solved",
    icon: "Code"
  },
  {
    id: "interviews",
    title: "Interviews",
    value: "0",
    subtext: "Sessions completed",
    icon: "Video"
  }
];

export const WEEKLY_SCORE_DATA = [];

export const SKILL_RADAR_DATA = [
  { skill: "DSA", value: 0 },
  { skill: "Algorithms", value: 0 },
  { skill: "System Design", value: 0 },
  { skill: "AI / ML", value: 0 },
  { skill: "Web Tech", value: 0 },
  { skill: "Communication", value: 0 }
];

export const SKILL_PROGRESS_DATA = [
  { name: "AI Fundamentals", progress: 0 },
  { name: "Prompt Engineering", progress: 0 },
  { name: "Data Structures", progress: 0 },
  { name: "Algorithms", progress: 0 },
  { name: "System Design", progress: 0 },
  { name: "Web Engineering", progress: 0 }
];

export const COURSES_DATA = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    level: "Beginner",
    category: "Artificial Intelligence",
    modulesCount: 8,
    duration: "6h",
    progress: 0,
    currentModuleIndex: 0,
    modules: [
      { id: 1, title: "What is AI?", completed: false, isCurrent: true },
      { id: 2, title: "Machine Learning Basics", completed: false },
      { id: 3, title: "Generative AI", completed: false },
      { id: 4, title: "Large Language Models", completed: false },
      { id: 5, title: "Prompt Engineering", completed: false },
      { id: 6, title: "AI Tools & APIs", completed: false },
      { id: 7, title: "AI Ethics & Safety", completed: false },
      { id: 8, title: "AI in the Workplace", completed: false }
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    category: "Data Structures",
    modulesCount: 12,
    duration: "10h",
    progress: 0,
    modules: [
      { id: 1, title: "Arrays & Strings", completed: false, isCurrent: true },
      { id: 2, title: "Linked Lists", completed: false },
      { id: 3, title: "Stacks & Queues", completed: false },
      { id: 4, title: "Binary Trees & BST", completed: false },
      { id: 5, title: "Heaps & Priority Queues", completed: false }
    ]
  },
  {
    id: "java-programming",
    title: "Java & Object Oriented Programming",
    level: "Intermediate",
    category: "Programming",
    modulesCount: 10,
    duration: "8h",
    progress: 0,
    modules: [
      { id: 1, title: "Java Syntax & Basics", completed: false, isCurrent: true },
      { id: 2, title: "OOP Principles & Classes", completed: false },
      { id: 3, title: "Inheritance & Polymorphism", completed: false },
      { id: 4, title: "Collections Framework", completed: false },
      { id: 5, title: "Multithreading & Concurrency", completed: false }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security Fundamentals",
    level: "Beginner",
    category: "Cyber Security",
    modulesCount: 8,
    duration: "6h",
    progress: 0,
    modules: [
      { id: 1, title: "Security Principles (CIA Triad)", completed: false, isCurrent: true },
      { id: 2, title: "Network Defense & Firewalls", completed: false },
      { id: 3, title: "Cryptography & SSL/TLS", completed: false },
      { id: 4, title: "Web App Security & OWASP Top 10", completed: false }
    ]
  },
  {
    id: "discrete-math",
    title: "Discrete Mathematics",
    level: "Advanced",
    category: "Mathematics",
    modulesCount: 14,
    duration: "12h",
    progress: 0,
    modules: [
      { id: 1, title: "Propositional & Predicate Logic", completed: false, isCurrent: true },
      { id: 2, title: "Set Theory & Relations", completed: false },
      { id: 3, title: "Graph Theory Basics", completed: false },
      { id: 4, title: "Combinatorics & Probability", completed: false }
    ]
  }
];

export const INITIAL_STUDY_TASKS = [];

export const CODING_PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hash Maps",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" }
    ],
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
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([])"], expected: true }
    ]
  },
  {
    id: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    description: "Given the head of a singly linked list represented as an array, return the reversed list array.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }
    ],
    starterCode: `function reverseList(arr) {
  return [...arr].reverse();
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] }
    ]
  }
];

export const EVENTS_DATA = [
  {
    id: "1",
    dateDay: "15",
    dateMonth: "SEP",
    title: "National AI & Tech Hackathon 2026",
    type: "Hackathon",
    time: "09:00 AM",
    location: "Online / Virtual",
    seatsLeft: 50,
    organizer: "Engineering Council",
    isFeatured: true,
    enrolled: false
  },
  {
    id: "2",
    dateDay: "20",
    dateMonth: "SEP",
    title: "Tech Career & Placement Drive",
    type: "Career",
    time: "10:00 AM",
    location: "Main Campus Auditorium",
    seatsLeft: 120,
    organizer: "Placement Cell",
    isFeatured: false,
    enrolled: false
  }
];

export const RESOURCES_DATA = [
  {
    id: 1,
    title: "Data Structures & Algorithms Handbook",
    subject: "Computer Science",
    semester: "Semester 3",
    size: "2.4 MB",
    date: "Sep 2026",
    type: "Lecture Notes"
  },
  {
    id: 2,
    title: "AI & Machine Learning Foundations (PDF)",
    subject: "AI",
    semester: "Semester 4",
    size: "5.1 MB",
    date: "Sep 2026",
    type: "PDF"
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "First Assessment",
    description: "Complete your first DOAP assessment",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "🏆"
  },
  {
    id: 2,
    title: "7-Day Learning Streak",
    description: "Study for 7 consecutive days",
    date: "",
    rarity: "Uncommon",
    earned: false,
    icon: "🔥"
  },
  {
    id: 3,
    title: "Coding Explorer",
    description: "Solve your first 10 coding problems",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "💻"
  },
  {
    id: 4,
    title: "Fast Learner",
    description: "Complete a module in under 60 minutes",
    date: "",
    rarity: "Common",
    earned: false,
    icon: "🚀"
  },
  {
    id: 5,
    title: "Interview Ready",
    description: "Complete 5 AI interview sessions",
    progress: "0 / 5",
    current: 0,
    total: 5,
    rarity: "Uncommon",
    earned: false,
    icon: "🎤"
  }
];

export const ASSESSMENTS_DATA = [];

export const INITIAL_CHAT_HISTORY = [];
