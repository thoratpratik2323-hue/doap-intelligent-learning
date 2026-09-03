/**
 * DOAP Master Engineering & DSA Question Bank
 * Sourced & Curated from Official University Past Papers, Interview Archives,
 * and FAANG Coding Sets (C, Python, Java, DSA Numericals, LeetCode Hard).
 */

export const C_LANGUAGE_BANK = [
  {
    id: "c-1",
    topic: "Data Types & Memory",
    level: "Easy",
    question: "What is the difference between short int and long int in storage size?",
    answer: "short int typically occupies 2 bytes with a smaller range (-32,768 to 32,767), while long int typically occupies at least 4 bytes (often 8 on 64-bit systems), giving a much larger representable range.",
    options: [
      "short int is 2 bytes, long int is 4 to 8 bytes",
      "Both are always exactly 4 bytes",
      "short int is 1 byte, long int is 2 bytes",
      "long int is only for floating point values"
    ],
    correctIndex: 0
  },
  {
    id: "c-2",
    topic: "sizeof Operator",
    level: "Easy",
    question: "What is the output of sizeof('A') in standard C?",
    answer: "In C, character literals like 'A' have type int, so sizeof('A') returns sizeof(int), which is typically 4 bytes (not 1 byte as in C++).",
    options: [
      "4 (type int in C)",
      "1 (char size)",
      "8 (double size)",
      "Compilation Error"
    ],
    correctIndex: 0
  },
  {
    id: "c-3",
    topic: "Pointers & Arrays",
    level: "Medium",
    question: "If int arr[5] = {1,2,3,4,5}; what does *(arr + 3) evaluate to?",
    answer: "*(arr + 3) uses pointer arithmetic to access the element at index 3, which is 4.",
    options: ["4", "3", "Address of arr[3]", "Garbage value"],
    correctIndex: 0
  },
  {
    id: "c-4",
    topic: "Dynamic Memory",
    level: "Medium",
    question: "What happens if free(ptr) is called when ptr is NULL?",
    answer: "The C standard guarantees that calling free() on a NULL pointer performs no operation at all and is completely safe (no crash).",
    options: [
      "Safe no-op (does nothing)",
      "Segmentation Fault",
      "Memory Leak",
      "Compiler Error"
    ],
    correctIndex: 0
  },
  {
    id: "c-5",
    topic: "Bitwise Operators",
    level: "Hard",
    question: "What does (n & (n - 1)) == 0 check for a positive integer n?",
    answer: "It checks if n is a power of 2, because powers of 2 have exactly one set bit.",
    options: [
      "Checks if n is a power of 2",
      "Checks if n is an odd number",
      "Checks if n is divisible by 4",
      "Checks if n is negative"
    ],
    correctIndex: 0
  }
];

export const PYTHON_BANK = [
  {
    id: "py-1",
    topic: "Mutability & Memory",
    level: "Easy",
    question: "If a = [1, 2, 3] and b = a, then b.append(4). What is a?",
    answer: "a becomes [1, 2, 3, 4] because list assignment in Python copies the object reference, not the underlying list.",
    options: ["[1, 2, 3, 4]", "[1, 2, 3]", "TypeError", "[4]"],
    correctIndex: 0
  },
  {
    id: "py-2",
    topic: "Default Arguments",
    level: "Medium",
    question: "Why is `def add_item(val, items=[])` dangerous in Python?",
    answer: "The default list `[]` is created once when the function is defined at def-time, so all subsequent calls share the same list instance unless explicitly overridden.",
    options: [
      "The default list is shared across all function calls",
      "Python does not allow lists as default arguments",
      "It raises a SyntaxError at compile time",
      "It causes an immediate memory leak"
    ],
    correctIndex: 0
  },
  {
    id: "py-3",
    topic: "CPython & GIL",
    level: "Hard",
    question: "Why does Python multithreading fail to speed up CPU-bound tasks?",
    answer: "CPython's GIL (Global Interpreter Lock) ensures that only one native thread executes Python bytecode at any given moment to protect reference counts.",
    options: [
      "Due to the Global Interpreter Lock (GIL)",
      "Because Python does not support OS threads",
      "Due to Garbage Collection pauses",
      "Because CPU cores cannot read Python memory"
    ],
    correctIndex: 0
  },
  {
    id: "py-4",
    topic: "Metaclasses",
    level: "Hard",
    question: "What is the key difference between `__new__` and `__init__` in Python?",
    answer: "`__new__` is the static constructor that creates and returns the new instance in memory; `__init__` is the initializer that receives the created instance.",
    options: [
      "__new__ creates the object, __init__ initializes its fields",
      "__new__ is for classes, __init__ is for functions",
      "They are identical and interchangeable",
      "__init__ runs before __new__"
    ],
    correctIndex: 0
  }
];

export const JAVA_BANK = [
  {
    id: "java-1",
    topic: "String Pool & Immutability",
    level: "Easy",
    question: "Why does String a = 'hi'; String b = 'hi'; a == b return true?",
    answer: "Both string literals point to the same canonical String object stored in the JVM's String Constant Pool.",
    options: [
      "They refer to the same interned object in the String Pool",
      "== compares string characters in Java",
      "Java converts all strings to primitives",
      "Strings are mutable in Java"
    ],
    correctIndex: 0
  },
  {
    id: "java-2",
    topic: "Collections Framework",
    level: "Medium",
    question: "Why is ArrayDeque preferred over the legacy Stack class?",
    answer: "The legacy Stack class extends Vector and synchronizes every operation, adding unnecessary locking overhead. ArrayDeque is unsynchronized and faster.",
    options: [
      "ArrayDeque is faster and avoids legacy Vector synchronization",
      "Stack cannot hold generic types",
      "ArrayDeque has infinite memory",
      "Stack throws Checked Exceptions on pop"
    ],
    correctIndex: 0
  },
  {
    id: "java-3",
    topic: "Modern Concurrency (Java 21)",
    level: "Hard",
    question: "What are Virtual Threads (Project Loom) in Java 21?",
    answer: "Virtual threads are lightweight, JVM-managed threads that are mounted on carrier platform threads, allowing millions of concurrent tasks with blocking I/O.",
    options: [
      "Lightweight JVM threads mapped onto carrier OS threads",
      "Threads that run exclusively on the GPU",
      "Single-threaded event loop like Node.js",
      "Thread pools with a fixed size of 1"
    ],
    correctIndex: 0
  },
  {
    id: "java-4",
    topic: "Generics & PECS",
    level: "Hard",
    question: "What does the PECS mnemonic stand for in Java Generics?",
    answer: "Producer Extends, Consumer Super. Use `? extends T` when reading items from a structure, and `? super T` when writing items to it.",
    options: [
      "Producer Extends, Consumer Super",
      "Private Extends, Concrete Super",
      "Public Equals, Cast Safe",
      "Polymorphic Extension, Class Super"
    ],
    correctIndex: 0
  }
];

export const DSA_NUMERICALS_BANK = [
  {
    id: "num-1",
    topic: "Complexity & Loops",
    level: "Easy",
    question: "A loop starts at n = 128 and divides n by 2 in every iteration until n = 1. How many iterations occur?",
    answer: "7 iterations (log2(128) = 7: 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1).",
    options: ["7", "8", "6", "14"],
    correctIndex: 0
  },
  {
    id: "num-2",
    topic: "Array Subarrays",
    level: "Medium",
    question: "An array contains 20 elements. How many total non-empty contiguous subarrays does it have?",
    answer: "The formula is n*(n+1)/2. For n=20: 20 * 21 / 2 = 210 subarrays.",
    options: ["210", "400", "190", "1024"],
    correctIndex: 0
  },
  {
    id: "num-3",
    topic: "Binary Search Tree",
    level: "Medium",
    question: "A balanced BST contains 1,023 nodes. What is its height if the root is at level 0?",
    answer: "Height is log2(1023 + 1) - 1 = log2(1024) - 1 = 10 - 1 = 9.",
    options: ["9", "10", "11", "8"],
    correctIndex: 0
  },
  {
    id: "num-4",
    topic: "Hashing & Load Factor",
    level: "Hard",
    question: "A hash table has 100 slots and contains 75 elements. How many additional elements can be inserted before reaching a load factor of 0.9?",
    answer: "Max elements for load factor 0.9 = 100 * 0.9 = 90. Additional elements = 90 - 75 = 15.",
    options: ["15", "25", "10", "90"],
    correctIndex: 0
  }
];

export const LEETCODE_HARD_PROBLEMS = [
  {
    id: 101,
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    language: "python",
    description: "Given an integer array `nums`, find the contiguous subarray which has the largest sum and return its sum.",
    starterCode: `def maxSubArray(nums):\n    max_so_far = nums[0]\n    curr_max = nums[0]\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\nprint(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))`,
    expectedOutput: "6"
  },
  {
    id: 102,
    title: "Trapping Rain Water in O(1) Space",
    difficulty: "Hard",
    category: "Two Pointers",
    language: "python",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    starterCode: `def trap(height):\n    if not height: return 0\n    l, r = 0, len(height) - 1\n    l_max, r_max = height[l], height[r]\n    water = 0\n    while l < r:\n        if l_max < r_max:\n            l += 1\n            l_max = max(l_max, height[l])\n            water += l_max - height[l]\n        else:\n            r -= 1\n            r_max = max(r_max, height[r])\n            water += r_max - height[r]\n    return water\n\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
    expectedOutput: "6"
  },
  {
    id: 103,
    title: "LRU Cache Design (O(1) Get & Put)",
    difficulty: "Hard",
    category: "Design & Hash Map",
    language: "python",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) time complexity for `get` and `put` operations.",
    starterCode: `from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n\nlru = LRUCache(2)\nlru.put(1, 1)\nlru.put(2, 2)\nprint(lru.get(1))\nlru.put(3, 3)\nprint(lru.get(2))`,
    expectedOutput: "1\n-1"
  },
  {
    id: 104,
    title: "Sieve of Eratosthenes (Prime Generator)",
    difficulty: "Medium",
    category: "Algorithms & Math",
    language: "python",
    description: "Generate all prime numbers up to `n` in O(n log log n) time using the Sieve of Eratosthenes.",
    starterCode: `def sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n + 1, i):\n                is_prime[j] = False\n    return [i for i, p in enumerate(is_prime) if p]\n\nprint(sieve(30))`,
    expectedOutput: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]"
  }
];
