// HackerRank Interview Preparation Kit & Problem Solving Certification Bank for DOAP
// Curated high-yield challenges with automated tests and multi-language starters

export const HACKERRANK_PROBLEMS = [
  {
    id: 2001,
    originalId: "hr-sock-merchant",
    title: "Sales by Match (Sock Merchant)",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Warmup",
    functionName: "sockMerchant",
    benchmarkMins: 10,
    description: "There is a large pile of socks that must be paired by color. Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.",
    hint: "Use a Set or frequency map. If you see a color you've already seen, remove it and increment the pair count. Otherwise, store it.",
    constraints: [
      "1 <= n <= 100",
      "1 <= ar[i] <= 100 where 0 <= i < n"
    ],
    examples: [
      {
        input: "n = 9, ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]",
        output: "3",
        explanation: "There are three pairs of socks: two pairs of color 10 and one pair of color 20."
      }
    ],
    starterCode: `function sockMerchant(n, ar) {
  // Return the total number of matching sock pairs
  const seen = new Set();
  let pairs = 0;
  for (const sock of ar) {
    if (seen.has(sock)) {
      pairs++;
      seen.delete(sock);
    } else {
      seen.add(sock);
    }
  }
  return pairs;
}`,
    starterCodes: {
      javascript: `function sockMerchant(n, ar) {
  // Write your code here
}`,
      python: `def sockMerchant(n, ar):
    # Write your code here
    pass`,
      cpp: `int sockMerchant(int n, vector<int> ar) {
    // Write your code here
}`,
      java: `public static int sockMerchant(int n, List<Integer> ar) {
    // Write your code here
}`
    },
    tests: [
      { input: [9, [10, 20, 20, 10, 10, 30, 50, 10, 20]], expected: 3, display: "sockMerchant(9, [10,20,20,10,10,30,50,10,20])" },
      { input: [7, [1, 2, 1, 2, 1, 3, 2]], expected: 2, display: "sockMerchant(7, [1,2,1,2,1,3,2])" },
      { input: [10, [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]], expected: 4, display: "sockMerchant(10, [1,1,3,1,2,1,3,3,3,3])" }
    ]
  },
  {
    id: 2002,
    originalId: "hr-counting-valleys",
    title: "Counting Valleys",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Warmup",
    functionName: "countingValleys",
    benchmarkMins: 15,
    description: "An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly steps steps, for every step it was noted if it was an uphill ('U') or a downhill ('D') step. Hikes always start and end at sea level (0). A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level. Given the sequence of up and down steps, find and print the number of valleys walked through.",
    hint: "Keep track of altitude. When taking a 'U' step that brings your altitude back to 0, you have just completed a valley!",
    constraints: [
      "2 <= steps <= 10^6",
      "path contains only characters 'U' and 'D'"
    ],
    examples: [
      {
        input: "steps = 8, path = 'UDDDUDUU'",
        output: "1",
        explanation: "The hiker first enters a valley at step 2, walks down to altitude -2, and returns to sea level (0) at step 8. Exactly 1 valley."
      }
    ],
    starterCode: `function countingValleys(steps, path) {
  let altitude = 0;
  let valleys = 0;
  for (let i = 0; i < steps; i++) {
    const step = path[i];
    if (step === 'U') {
      altitude++;
      if (altitude === 0) {
        valleys++;
      }
    } else {
      altitude--;
    }
  }
  return valleys;
}`,
    starterCodes: {
      javascript: `function countingValleys(steps, path) {
  // Write your code here
}`,
      python: `def countingValleys(steps, path):
    # Write your code here
    pass`,
      cpp: `int countingValleys(int steps, string path) {
    // Write your code here
}`,
      java: `public static int countingValleys(int steps, String path) {
    // Write your code here
}`
    },
    tests: [
      { input: [8, "UDDDUDUU"], expected: 1, display: 'countingValleys(8, "UDDDUDUU")' },
      { input: [12, "DDUUDDUDUUUD"], expected: 2, display: 'countingValleys(12, "DDUUDDUDUUUD")' },
      { input: [10, "UDUUUDUUDD"], expected: 0, display: 'countingValleys(10, "UDUUUDUUDD")' }
    ]
  },
  {
    id: 2003,
    originalId: "hr-jumping-clouds",
    title: "Jumping on the Clouds",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Greedy",
    functionName: "jumpingOnClouds",
    benchmarkMins: 15,
    description: "There is a new mobile game that starts with consecutively numbered clouds. Some of the clouds are thunderheads (1) and others are cumulus (0). The player can jump on any cumulus cloud having a number that is equal to the number of the current cloud plus 1 or 2. The player must avoid the thunderheads. Determine the minimum number of jumps it will take to jump from the starting position to the last cloud. It is always possible to win the game.",
    hint: "Use a greedy strategy: always prefer jumping 2 clouds ahead if it's safe (c[i + 2] === 0). If not, jump 1 cloud.",
    constraints: [
      "2 <= n <= 100",
      "c[i] is either 0 or 1",
      "c[0] = c[n - 1] = 0"
    ],
    examples: [
      {
        input: "c = [0, 0, 1, 0, 0, 1, 0]",
        output: "4",
        explanation: "Jumps: 0 -> 1 -> 3 -> 4 -> 6 (4 jumps)."
      }
    ],
    starterCode: `function jumpingOnClouds(c) {
  let jumps = 0;
  let i = 0;
  while (i < c.length - 1) {
    if (i + 2 < c.length && c[i + 2] === 0) {
      i += 2;
    } else {
      i += 1;
    }
    jumps++;
  }
  return jumps;
}`,
    starterCodes: {
      javascript: `function jumpingOnClouds(c) {
  // Write your code here
}`,
      python: `def jumpingOnClouds(c):
    # Write your code here
    pass`,
      cpp: `int jumpingOnClouds(vector<int> c) {
    // Write your code here
}`,
      java: `public static int jumpingOnClouds(List<Integer> c) {
    // Write your code here
}`
    },
    tests: [
      { input: [[0, 0, 1, 0, 0, 1, 0]], expected: 4, display: "jumpingOnClouds([0,0,1,0,0,1,0])" },
      { input: [[0, 0, 0, 0, 1, 0]], expected: 3, display: "jumpingOnClouds([0,0,0,0,1,0])" },
      { input: [[0, 0, 0, 1, 0, 0]], expected: 3, display: "jumpingOnClouds([0,0,0,1,0,0])" }
    ]
  },
  {
    id: 2004,
    originalId: "hr-repeated-string",
    title: "Repeated String",
    difficulty: "Easy",
    category: "Strings",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Math",
    functionName: "repeatedString",
    benchmarkMins: 15,
    description: "There is a string s, of lowercase English letters that is repeated infinitely many times. Given an integer n, find and print the number of letter a's in the first n letters of the infinite string.",
    hint: "Calculate how many times 'a' occurs in string s. Multiply by Math.floor(n / s.length), then add 'a' occurrences in the remaining (n % s.length) characters.",
    constraints: [
      "1 <= |s| <= 100",
      "1 <= n <= 10^12"
    ],
    examples: [
      {
        input: "s = 'aba', n = 10",
        output: "7",
        explanation: "The first 10 letters are 'abaabaabaa'. There are 7 'a's."
      }
    ],
    starterCode: `function repeatedString(s, n) {
  let countInSingle = 0;
  for (const ch of s) {
    if (ch === 'a') countInSingle++;
  }
  const fullRepeats = Math.floor(n / s.length);
  const remainder = n % s.length;
  let total = fullRepeats * countInSingle;
  for (let i = 0; i < remainder; i++) {
    if (s[i] === 'a') total++;
  }
  return total;
}`,
    starterCodes: {
      javascript: `function repeatedString(s, n) {
  // Write your code here
}`,
      python: `def repeatedString(s, n):
    # Write your code here
    pass`,
      cpp: `long repeatedString(string s, long n) {
    // Write your code here
}`,
      java: `public static long repeatedString(String s, long n) {
    // Write your code here
}`
    },
    tests: [
      { input: ["aba", 10], expected: 7, display: 'repeatedString("aba", 10)' },
      { input: ["a", 1000000000000], expected: 1000000000000, display: 'repeatedString("a", 1000000000000)' },
      { input: ["x", 970770], expected: 0, display: 'repeatedString("x", 970770)' }
    ]
  },
  {
    id: 2005,
    originalId: "hr-hourglass-sum",
    title: "2D Array - DS (Hourglass Sum)",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Arrays",
    functionName: "hourglassSum",
    benchmarkMins: 20,
    description: "Given a 6x6 2D Array arr, an hourglass in an array is a subset of values with indices falling in this pattern: a b c / d / e f g. Calculate the hourglass sum for every hourglass in arr, then print the maximum hourglass sum. There are 16 hourglasses in total.",
    hint: "Iterate row from 0 to 3, col from 0 to 3. Sum: arr[r][c] + arr[r][c+1] + arr[r][c+2] + arr[r+1][c+1] + arr[r+2][c] + arr[r+2][c+1] + arr[r+2][c+2]. Initialize max to -Infinity.",
    constraints: [
      "-9 <= arr[i][j] <= 9",
      "0 <= i, j <= 5"
    ],
    examples: [
      {
        input: "6x6 array",
        output: "19",
        explanation: "The hourglass with the maximum sum equals 19."
      }
    ],
    starterCode: `function hourglassSum(arr) {
  let maxSum = -Infinity;
  for (let r = 0; r <= 3; r++) {
    for (let c = 0; c <= 3; c++) {
      const top = arr[r][c] + arr[r][c+1] + arr[r][c+2];
      const mid = arr[r+1][c+1];
      const bot = arr[r+2][c] + arr[r+2][c+1] + arr[r+2][c+2];
      const sum = top + mid + bot;
      if (sum > maxSum) maxSum = sum;
    }
  }
  return maxSum;
}`,
    starterCodes: {
      javascript: `function hourglassSum(arr) {
  // Write your code here
}`,
      python: `def hourglassSum(arr):
    # Write your code here
    pass`,
      cpp: `int hourglassSum(vector<vector<int>> arr) {
    // Write your code here
}`,
      java: `public static int hourglassSum(List<List<Integer>> arr) {
    // Write your code here
}`
    },
    tests: [
      {
        input: [[
          [1, 1, 1, 0, 0, 0],
          [0, 1, 0, 0, 0, 0],
          [1, 1, 1, 0, 0, 0],
          [0, 0, 2, 4, 4, 0],
          [0, 0, 0, 2, 0, 0],
          [0, 0, 1, 2, 4, 0]
        ]],
        expected: 19,
        display: "hourglassSum(grid6x6)"
      },
      {
        input: [[
          [-1, -1, 0, -9, -2, -2],
          [-2, -1, -6, -8, -2, -5],
          [-1, -1, -1, -2, -3, -4],
          [-1, -9, -2, -4, -4, -5],
          [-7, -3, -3, -2, -9, -9],
          [-1, -3, -1, -2, -4, -5]
        ]],
        expected: -6,
        display: "hourglassSum(negativeGrid)"
      }
    ]
  },
  {
    id: 2006,
    originalId: "hr-left-rotation",
    title: "Arrays: Left Rotation",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Arrays",
    functionName: "rotLeft",
    benchmarkMins: 15,
    description: "A left rotation operation on an array shifts each of the array's elements 1 unit to the left. Given an integer d, rotate the array that many steps left and return the result.",
    hint: "Slicing: arr.slice(d).concat(arr.slice(0, d)) performs a left rotation in O(N) time.",
    constraints: [
      "1 <= n <= 10^5",
      "1 <= d <= n",
      "1 <= a[i] <= 10^6"
    ],
    examples: [
      {
        input: "a = [1, 2, 3, 4, 5], d = 4",
        output: "[5, 1, 2, 3, 4]",
        explanation: "Rotate 4 steps to the left."
      }
    ],
    starterCode: `function rotLeft(a, d) {
  const rot = d % a.length;
  return a.slice(rot).concat(a.slice(0, rot));
}`,
    starterCodes: {
      javascript: `function rotLeft(a, d) {
  // Write your code here
}`,
      python: `def rotLeft(a, d):
    # Write your code here
    pass`,
      cpp: `vector<int> rotLeft(vector<int> a, int d) {
    // Write your code here
}`,
      java: `public static List<Integer> rotLeft(List<Integer> a, int d) {
    // Write your code here
}`
    },
    tests: [
      { input: [[1, 2, 3, 4, 5], 4], expected: [5, 1, 2, 3, 4], display: "rotLeft([1,2,3,4,5], 4)" },
      { input: [[41, 73, 89, 7, 10, 1, 59, 58, 84, 77, 77, 97, 58, 34, 67], 10], expected: [77, 97, 58, 34, 67, 41, 73, 89, 7, 10, 1, 59, 58, 84, 77], display: "rotLeft(arr15, 10)" }
    ]
  },
  {
    id: 2007,
    originalId: "hr-new-year-chaos",
    title: "New Year Chaos",
    difficulty: "Medium",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Arrays",
    functionName: "minimumBribes",
    benchmarkMins: 25,
    description: "It is New Year's Day and people are in line for the rollercoaster ride. Each person wears a sticker indicating their initial position from 1 to n. Any person can bribe the person directly in front of them to swap positions, but can bribe at most 2 times. Determine the minimum number of bribes that took place, or return 'Too chaotic'.",
    hint: "If q[i] - (i + 1) > 2, return 'Too chaotic'. Count how many elements with values greater than q[i] are ahead of i from index max(0, q[i] - 2) to i.",
    constraints: [
      "1 <= t <= 10",
      "1 <= n <= 10^5"
    ],
    examples: [
      {
        input: "q = [2, 1, 5, 3, 4]",
        output: "3",
        explanation: "Person 5 bribed 2 people, person 2 bribed 1 person. Total = 3 bribes."
      },
      {
        input: "q = [2, 5, 1, 3, 4]",
        output: "'Too chaotic'",
        explanation: "Person 5 had to bribe 3 people, which is not permitted."
      }
    ],
    starterCode: `function minimumBribes(q) {
  let bribes = 0;
  for (let i = q.length - 1; i >= 0; i--) {
    if (q[i] - (i + 1) > 2) {
      return "Too chaotic";
    }
    for (let j = Math.max(0, q[i] - 2); j < i; j++) {
      if (q[j] > q[i]) bribes++;
    }
  }
  return bribes;
}`,
    starterCodes: {
      javascript: `function minimumBribes(q) {
  // Return number of bribes or "Too chaotic"
}`,
      python: `def minimumBribes(q):
    # Return number of bribes or "Too chaotic"
    pass`,
      cpp: `void minimumBribes(vector<int> q) {
    // Print or return result
}`,
      java: `public static void minimumBribes(List<Integer> q) {
    // Print or return result
}`
    },
    tests: [
      { input: [[2, 1, 5, 3, 4]], expected: 3, display: "minimumBribes([2,1,5,3,4])" },
      { input: [[2, 5, 1, 3, 4]], expected: "Too chaotic", display: "minimumBribes([2,5,1,3,4])" },
      { input: [[1, 2, 5, 3, 7, 8, 6, 4]], expected: 7, display: "minimumBribes([1,2,5,3,7,8,6,4])" }
    ]
  },
  {
    id: 2008,
    originalId: "hr-minimum-swaps-2",
    title: "Minimum Swaps 2",
    difficulty: "Medium",
    category: "Arrays",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Sorting",
    functionName: "minimumSwaps",
    benchmarkMins: 20,
    description: "You are given an unordered array consisting of consecutive integers without any duplicates in [1, 2, 3, ..., n]. You are allowed to swap any two elements. Find the minimum number of swaps required to sort the array in ascending order.",
    hint: "Cycle detection: each element belongs at index (arr[i] - 1). While arr[i] !== i + 1, swap arr[i] with arr[arr[i] - 1] and count the swaps.",
    constraints: [
      "1 <= n <= 10^5",
      "1 <= arr[i] <= n"
    ],
    examples: [
      {
        input: "arr = [4, 3, 1, 2]",
        output: "3",
        explanation: "Minimum 3 swaps required."
      }
    ],
    starterCode: `function minimumSwaps(arr) {
  let swaps = 0;
  let i = 0;
  while (i < arr.length) {
    const targetIdx = arr[i] - 1;
    if (arr[i] !== arr[targetIdx]) {
      const temp = arr[i];
      arr[i] = arr[targetIdx];
      arr[targetIdx] = temp;
      swaps++;
    } else {
      i++;
    }
  }
  return swaps;
}`,
    starterCodes: {
      javascript: `function minimumSwaps(arr) {
  // Write your code here
}`,
      python: `def minimumSwaps(arr):
    # Write your code here
    pass`,
      cpp: `int minimumSwaps(vector<int> arr) {
    // Write your code here
}`,
      java: `static int minimumSwaps(int[] arr) {
    // Write your code here
}`
    },
    tests: [
      { input: [[4, 3, 1, 2]], expected: 3, display: "minimumSwaps([4, 3, 1, 2])" },
      { input: [[2, 3, 4, 1, 5]], expected: 3, display: "minimumSwaps([2, 3, 4, 1, 5])" },
      { input: [[1, 3, 5, 2, 4, 6, 7]], expected: 3, display: "minimumSwaps([1, 3, 5, 2, 4, 6, 7])" }
    ]
  },
  {
    id: 2009,
    originalId: "hr-two-strings",
    title: "Two Strings (Common Substring)",
    difficulty: "Easy",
    category: "Strings",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Dictionaries",
    functionName: "twoStrings",
    benchmarkMins: 10,
    description: "Given two strings, determine if they share a common substring. A substring may be as small as one character. Return 'YES' or 'NO'.",
    hint: "Any shared substring must share at least one character. Put characters of s1 in a Set and check if any in s2 exists in the Set.",
    constraints: [
      "1 <= p <= 10",
      "1 <= |s1|, |s2| <= 10^5"
    ],
    examples: [
      {
        input: "s1 = 'hello', s2 = 'world'",
        output: "'YES'",
        explanation: "Both share 'o' and 'l'."
      }
    ],
    starterCode: `function twoStrings(s1, s2) {
  const setA = new Set(s1);
  for (const ch of s2) {
    if (setA.has(ch)) return "YES";
  }
  return "NO";
}`,
    starterCodes: {
      javascript: `function twoStrings(s1, s2) {
  // Return "YES" or "NO"
}`,
      python: `def twoStrings(s1, s2):
    # Return "YES" or "NO"
    pass`,
      cpp: `string twoStrings(string s1, string s2) {
    // Return "YES" or "NO"
}`,
      java: `public static String twoStrings(String s1, String s2) {
    // Return "YES" or "NO"
}`
    },
    tests: [
      { input: ["hello", "world"], expected: "YES", display: 'twoStrings("hello", "world")' },
      { input: ["hi", "world"], expected: "NO", display: 'twoStrings("hi", "world")' },
      { input: ["wouldyoulikefries", "abcabcabcabcabc"], expected: "NO", display: 'twoStrings("wouldyoulikefries", "abcabcabcabcabc")' }
    ]
  },
  {
    id: 2010,
    originalId: "hr-sherlock-anagrams",
    title: "Sherlock and Anagrams",
    difficulty: "Medium",
    category: "Strings",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Dictionaries",
    functionName: "sherlockAndAnagrams",
    benchmarkMins: 25,
    description: "Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of unordered pairs of substrings of the string that are anagrams of each other.",
    hint: "For all substrings of length 1 to N-1, sort characters to create canonical key and count frequencies. Sum k*(k-1)/2 for each frequency.",
    constraints: [
      "1 <= q <= 10",
      "2 <= |s| <= 100"
    ],
    examples: [
      {
        input: "s = 'abba'",
        output: "4",
        explanation: "Pairs are [a, a], [b, b], [ab, ba], [abb, bba]."
      }
    ],
    starterCode: `function sherlockAndAnagrams(s) {
  const map = new Map();
  for (let len = 1; len < s.length; len++) {
    for (let i = 0; i <= s.length - len; i++) {
      const sub = s.substring(i, i + len).split('').sort().join('');
      map.set(sub, (map.get(sub) || 0) + 1);
    }
  }
  let count = 0;
  for (const freq of map.values()) {
    if (freq > 1) {
      count += (freq * (freq - 1)) / 2;
    }
  }
  return count;
}`,
    starterCodes: {
      javascript: `function sherlockAndAnagrams(s) {
  // Return number of anagrammatic pairs
}`,
      python: `def sherlockAndAnagrams(s):
    # Return number of anagrammatic pairs
    pass`,
      cpp: `int sherlockAndAnagrams(string s) {
    // Write your code here
}`,
      java: `public static int sherlockAndAnagrams(String s) {
    // Write your code here
}`
    },
    tests: [
      { input: ["abba"], expected: 4, display: 'sherlockAndAnagrams("abba")' },
      { input: ["abcd"], expected: 0, display: 'sherlockAndAnagrams("abcd")' },
      { input: ["ifailuhkqq"], expected: 3, display: 'sherlockAndAnagrams("ifailuhkqq")' },
      { input: ["kkkk"], expected: 10, display: 'sherlockAndAnagrams("kkkk")' }
    ]
  },
  {
    id: 2011,
    originalId: "hr-mark-and-toys",
    title: "Mark and Toys",
    difficulty: "Easy",
    category: "Sorting",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Greedy",
    functionName: "maximumToys",
    benchmarkMins: 15,
    description: "Mark and Jane want to buy some toys with a budget of k dollars. Given a list of toy prices, and an amount to spend, determine the maximum number of toys he can buy.",
    hint: "Sort prices ascending and greedily purchase cheapest toys until the budget is exhausted.",
    constraints: [
      "1 <= n <= 10^5",
      "1 <= k <= 10^9"
    ],
    examples: [
      {
        input: "prices = [1, 12, 5, 111, 200, 1000, 10], k = 50",
        output: "4",
        explanation: "Can buy toys 1, 5, 10, 12 for 28 dollars."
      }
    ],
    starterCode: `function maximumToys(prices, k) {
  prices.sort((a, b) => a - b);
  let count = 0;
  let remaining = k;
  for (const p of prices) {
    if (remaining >= p) {
      count++;
      remaining -= p;
    } else {
      break;
    }
  }
  return count;
}`,
    starterCodes: {
      javascript: `function maximumToys(prices, k) {
  // Write your code here
}`,
      python: `def maximumToys(prices, k):
    # Write your code here
    pass`,
      cpp: `int maximumToys(vector<int> prices, int k) {
    // Write your code here
}`,
      java: `public static int maximumToys(List<Integer> prices, int k) {
    // Write your code here
}`
    },
    tests: [
      { input: [[1, 12, 5, 111, 200, 1000, 10], 50], expected: 4, display: "maximumToys([1,12,5,111,200,1000,10], 50)" },
      { input: [[1, 2, 3, 4], 7], expected: 3, display: "maximumToys([1,2,3,4], 7)" },
      { input: [[3, 7, 2, 9, 4], 15], expected: 3, display: "maximumToys([3,7,2,9,4], 15)" }
    ]
  },
  {
    id: 2012,
    originalId: "hr-alternating-characters",
    title: "Alternating Characters",
    difficulty: "Easy",
    category: "Strings",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Strings",
    functionName: "alternatingCharacters",
    benchmarkMins: 10,
    description: "You are given a string containing characters 'A' and 'B' only. Change it into a string with no matching adjacent characters with minimum deletions.",
    hint: "Count matching adjacent pairs: when s[i] === s[i-1], increment deletions count.",
    constraints: [
      "1 <= |s| <= 10^5"
    ],
    examples: [
      {
        input: "s = 'AAAA'",
        output: "3",
        explanation: "Delete 3 'A's to leave 'A'."
      }
    ],
    starterCode: `function alternatingCharacters(s) {
  let deletions = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) deletions++;
  }
  return deletions;
}`,
    starterCodes: {
      javascript: `function alternatingCharacters(s) {
  // Return minimum deletions
}`,
      python: `def alternatingCharacters(s):
    # Return minimum deletions
    pass`,
      cpp: `int alternatingCharacters(string s) {
    // Return minimum deletions
}`,
      java: `public static int alternatingCharacters(String s) {
    // Return minimum deletions
}`
    },
    tests: [
      { input: ["AAAA"], expected: 3, display: 'alternatingCharacters("AAAA")' },
      { input: ["BBBBB"], expected: 4, display: 'alternatingCharacters("BBBBB")' },
      { input: ["ABABABAB"], expected: 0, display: 'alternatingCharacters("ABABABAB")' },
      { input: ["AAABBB"], expected: 4, display: 'alternatingCharacters("AAABBB")' }
    ]
  },
  {
    id: 2013,
    originalId: "hr-balanced-brackets",
    title: "Balanced Brackets",
    difficulty: "Medium",
    category: "Stacks",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Stacks",
    functionName: "isBalanced",
    benchmarkMins: 20,
    description: "Given strings of brackets, determine whether each sequence of brackets is balanced. Return 'YES' or 'NO'.",
    hint: "Use a Stack. Match opening and closing pairs of (), {}, [].",
    constraints: [
      "1 <= |s| <= 1000"
    ],
    examples: [
      {
        input: "s = '{[()]}'",
        output: "'YES'",
        explanation: "All brackets correctly matched."
      }
    ],
    starterCode: `function isBalanced(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== map[ch]) {
        return "NO";
      }
    }
  }
  return stack.length === 0 ? "YES" : "NO";
}`,
    starterCodes: {
      javascript: `function isBalanced(s) {
  // Return "YES" or "NO"
}`,
      python: `def isBalanced(s):
    # Return "YES" or "NO"
    pass`,
      cpp: `string isBalanced(string s) {
    // Return "YES" or "NO"
}`,
      java: `public static String isBalanced(String s) {
    // Return "YES" or "NO"
}`
    },
    tests: [
      { input: ["{[()]}"], expected: "YES", display: 'isBalanced("{[()]}")' },
      { input: ["{[(])}"], expected: "NO", display: 'isBalanced("{[(])}")' },
      { input: ["{{[[(())]]}}"], expected: "YES", display: 'isBalanced("{{[[(())]]}}")' }
    ]
  },
  {
    id: 2014,
    originalId: "hr-luck-balance",
    title: "Greedy: Luck Balance",
    difficulty: "Easy",
    category: "Greedy",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Greedy",
    functionName: "luckBalance",
    benchmarkMins: 15,
    description: "Maximize luck balance given contest importances and max allowed important losses k. Win unimportant contests to add luck; lose top k important contests.",
    hint: "Add luck for unimportant contests. Sort important contests descending: add the top k and subtract the rest.",
    constraints: [
      "1 <= n <= 100",
      "0 <= k <= N"
    ],
    examples: [
      {
        input: "k = 3, contests = [[5, 1], [2, 1], [1, 1], [8, 1], [10, 0], [5, 0]]",
        output: "29",
        explanation: "15 + 8 + 5 + 2 - 1 = 29."
      }
    ],
    starterCode: `function luckBalance(k, contests) {
  let luck = 0;
  const important = [];
  for (const [l, imp] of contests) {
    if (imp === 0) {
      luck += l;
    } else {
      important.push(l);
    }
  }
  important.sort((a, b) => b - a);
  for (let i = 0; i < important.length; i++) {
    if (i < k) {
      luck += important[i];
    } else {
      luck -= important[i];
    }
  }
  return luck;
}`,
    starterCodes: {
      javascript: `function luckBalance(k, contests) {
  // Write your code here
}`,
      python: `def luckBalance(k, contests):
    # Write your code here
    pass`,
      cpp: `int luckBalance(int k, vector<vector<int>> contests) {
    // Write your code here
}`,
      java: `public static int luckBalance(int k, List<List<Integer>> contests) {
    // Write your code here
}`
    },
    tests: [
      { input: [3, [[5, 1], [2, 1], [1, 1], [8, 1], [10, 0], [5, 0]]], expected: 29, display: "luckBalance(3, contests)" },
      { input: [2, [[5, 1], [4, 0], [6, 1], [2, 1], [8, 0]]], expected: 21, display: "luckBalance(2, contests2)" }
    ]
  },
  {
    id: 2015,
    originalId: "hr-max-array-sum",
    title: "Max Array Sum (Non-Adjacent)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank DP",
    functionName: "maxSubsetSum",
    benchmarkMins: 25,
    description: "Given an array of integers, find the subset of non-adjacent elements with the maximum sum.",
    hint: "DP transition: dp[i] = Math.max(dp[i-1], dp[i-2] + arr[i], arr[i]).",
    constraints: [
      "1 <= n <= 10^5",
      "-10^4 <= arr[i] <= 10^4"
    ],
    examples: [
      {
        input: "arr = [-2, 1, 3, -4, 5]",
        output: "8",
        explanation: "Subset [3, 5] yields maximum sum = 8."
      }
    ],
    starterCode: `function maxSubsetSum(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return Math.max(0, arr[0]);
  let prev2 = Math.max(0, arr[0]);
  let prev1 = Math.max(prev2, arr[1]);
  for (let i = 2; i < arr.length; i++) {
    const curr = Math.max(prev1, prev2 + arr[i], arr[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    starterCodes: {
      javascript: `function maxSubsetSum(arr) {
  // Write your code here
}`,
      python: `def maxSubsetSum(arr):
    # Write your code here
    pass`,
      cpp: `int maxSubsetSum(vector<int> arr) {
    // Write your code here
}`,
      java: `static int maxSubsetSum(int[] arr) {
    // Write your code here
}`
    },
    tests: [
      { input: [[-2, 1, 3, -4, 5]], expected: 8, display: "maxSubsetSum([-2, 1, 3, -4, 5])" },
      { input: [[3, 7, 4, 6, 5]], expected: 13, display: "maxSubsetSum([3, 7, 4, 6, 5])" },
      { input: [[2, 1, 5, 8, 4]], expected: 11, display: "maxSubsetSum([2, 1, 5, 8, 4])" }
    ]
  },
  {
    id: 2016,
    originalId: "hr-common-child",
    title: "Common Child (LCS)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank DP",
    functionName: "commonChild",
    benchmarkMins: 30,
    description: "Given two strings of equal length, find the length of the longest string that can be constructed such that it is a child (subsequence) of both.",
    hint: "Standard Longest Common Subsequence (LCS) 2D DP algorithm.",
    constraints: [
      "1 <= |s1|, |s2| <= 5000"
    ],
    examples: [
      {
        input: "s1 = 'HARRY', s2 = 'SALLY'",
        output: "2",
        explanation: "Longest child string is 'AY' of length 2."
      }
    ],
    starterCode: `function commonChild(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    const temp = prev;
    prev = curr;
    curr = temp;
  }
  return prev[n];
}`,
    starterCodes: {
      javascript: `function commonChild(s1, s2) {
  // Return length of longest common child
}`,
      python: `def commonChild(s1, s2):
    # Return length of longest common child
    pass`,
      cpp: `int commonChild(string s1, string s2) {
    // Write your code here
}`,
      java: `public static int commonChild(String s1, String s2) {
    // Write your code here
}`
    },
    tests: [
      { input: ["HARRY", "SALLY"], expected: 2, display: 'commonChild("HARRY", "SALLY")' },
      { input: ["AA", "BB"], expected: 0, display: 'commonChild("AA", "BB")' },
      { input: ["SHINCHAN", "NOHARAAA"], expected: 3, display: 'commonChild("SHINCHAN", "NOHARAAA")' }
    ]
  },
  {
    id: 2017,
    originalId: "hr-birthday-chocolate",
    title: "Subarray Division (Birthday Bar)",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Problem Solving (Basic)",
    badge: "HackerRank Sliding Window",
    functionName: "birthday",
    benchmarkMins: 15,
    description: "Two children want to share a chocolate bar. Find number of contiguous segments of length m summing to day d.",
    hint: "Use a fixed-size sliding window of length m and maintain running sum.",
    constraints: [
      "1 <= n <= 100",
      "1 <= d <= 31",
      "1 <= m <= 12"
    ],
    examples: [
      {
        input: "s = [1, 2, 1, 3, 2], d = 3, m = 2",
        output: "2",
        explanation: "Segments [1, 2] and [2, 1] both sum to 3 with length 2."
      }
    ],
    starterCode: `function birthday(s, d, m) {
  if (s.length < m) return 0;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < m; i++) sum += s[i];
  if (sum === d) count++;
  for (let i = m; i < s.length; i++) {
    sum += s[i] - s[i - m];
    if (sum === d) count++;
  }
  return count;
}`,
    starterCodes: {
      javascript: `function birthday(s, d, m) {
  // Write your code here
}`,
      python: `def birthday(s, d, m):
    # Write your code here
    pass`,
      cpp: `int birthday(vector<int> s, int d, int m) {
    // Write your code here
}`,
      java: `public static int birthday(List<Integer> s, int d, int m) {
    // Write your code here
}`
    },
    tests: [
      { input: [[1, 2, 1, 3, 2], 3, 2], expected: 2, display: "birthday([1,2,1,3,2], 3, 2)" },
      { input: [[1, 1, 1, 1, 1, 1], 3, 2], expected: 0, display: "birthday([1,1,1,1,1,1], 3, 2)" },
      { input: [[4], 4, 1], expected: 1, display: "birthday([4], 4, 1)" }
    ]
  },
  {
    id: 2018,
    originalId: "hr-migratory-birds",
    title: "Migratory Birds",
    difficulty: "Easy",
    category: "Arrays",
    platform: "HackerRank",
    track: "Problem Solving (Basic)",
    badge: "HackerRank Arrays",
    functionName: "migratoryBirds",
    benchmarkMins: 10,
    description: "Given an array of bird sightings, determine the id of the most frequently sighted type. In case of a tie, return the smallest id.",
    hint: "Use frequency counts for types 1 to 5.",
    constraints: [
      "5 <= n <= 2 * 10^5"
    ],
    examples: [
      {
        input: "arr = [1, 4, 4, 4, 5, 3]",
        output: "4",
        explanation: "Bird type 4 is sighted 3 times."
      }
    ],
    starterCode: `function migratoryBirds(arr) {
  const counts = new Array(6).fill(0);
  for (const id of arr) counts[id]++;
  let maxCount = 0;
  let bestId = 1;
  for (let i = 1; i <= 5; i++) {
    if (counts[i] > maxCount) {
      maxCount = counts[i];
      bestId = i;
    }
  }
  return bestId;
}`,
    starterCodes: {
      javascript: `function migratoryBirds(arr) {
  // Write your code here
}`,
      python: `def migratoryBirds(arr):
    # Write your code here
    pass`,
      cpp: `int migratoryBirds(vector<int> arr) {
    // Write your code here
}`,
      java: `public static int migratoryBirds(List<Integer> arr) {
    // Write your code here
}`
    },
    tests: [
      { input: [[1, 4, 4, 4, 5, 3]], expected: 4, display: "migratoryBirds([1,4,4,4,5,3])" },
      { input: [[1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4]], expected: 3, display: "migratoryBirds([1,2,3,4,5,4,3,2,1,3,4])" }
    ]
  },
  {
    id: 2019,
    originalId: "hr-tree-height",
    title: "Tree: Height of a Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Trees",
    functionName: "treeHeight",
    benchmarkMins: 15,
    description: "The height of a binary tree is the number of edges between the tree's root and its furthest leaf. You are given a list of edges for a binary tree. Calculate and return the height of the tree (for 1 node, height is 0).",
    hint: "DFS from root: max edges to any leaf.",
    constraints: [
      "1 <= number of nodes <= 20"
    ],
    examples: [
      {
        input: "edges = [[3, 2], [3, 5], [2, 1], [5, 4], [5, 6], [6, 7]]",
        output: "3",
        explanation: "The longest path from root 3 to leaf 7 has 3 edges."
      }
    ],
    starterCode: `function treeHeight(edges) {
  if (!edges || edges.length === 0) return 0;
  const adj = new Map();
  const incoming = new Set();
  const allNodes = new Set();
  for (const [u, v] of edges) {
    if (!adj.has(u)) adj.set(u, []);
    adj.get(u).push(v);
    incoming.add(v);
    allNodes.add(u);
    allNodes.add(v);
  }
  let root = null;
  for (const node of allNodes) {
    if (!incoming.has(node)) {
      root = node;
      break;
    }
  }
  function dfs(curr) {
    if (!adj.has(curr) || adj.get(curr).length === 0) return 0;
    let maxChild = 0;
    for (const child of adj.get(curr)) {
      maxChild = Math.max(maxChild, dfs(child) + 1);
    }
    return maxChild;
  }
  return dfs(root);
}`,
    starterCodes: {
      javascript: `function treeHeight(edges) {
  // Return maximum height (edges)
}`,
      python: `def treeHeight(edges):
    # Return maximum height
    pass`,
      cpp: `int height(Node* root) {
    // Return max edges
}`,
      java: `public static int height(Node root) {
    // Return max edges
}`
    },
    tests: [
      { input: [[[3, 2], [3, 5], [2, 1], [5, 4], [5, 6], [6, 7]]], expected: 3, display: "treeHeight(edges1)" },
      { input: [[[1, 2], [1, 3], [2, 4], [2, 5]]], expected: 2, display: "treeHeight(edges2)" }
    ]
  },
  {
    id: 2020,
    originalId: "hr-bst-lca",
    title: "Binary Search Tree: Lowest Common Ancestor",
    difficulty: "Easy",
    category: "Trees",
    platform: "HackerRank",
    track: "Interview Preparation Kit",
    badge: "HackerRank Trees",
    functionName: "lca",
    benchmarkMins: 15,
    description: "You are given the values of a Binary Search Tree (BST) along with two node values v1 and v2. Return the lowest common ancestor (LCA) value of the two nodes in the BST.",
    hint: "Traverse BST from root: if both v1 and v2 < root.val go left; if both > root.val go right; else current root is the LCA.",
    constraints: [
      "1 <= number of nodes <= 25"
    ],
    examples: [
      {
        input: "values = [4, 2, 7, 1, 3, 6], v1 = 1, v2 = 7",
        output: "4",
        explanation: "1 is in left subtree, 7 in right subtree of 4, so 4 is the LCA."
      }
    ],
    starterCode: `function lca(values, v1, v2) {
  class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  let root = null;
  function insert(curr, val) {
    if (!curr) return new Node(val);
    if (val < curr.val) curr.left = insert(curr.left, val);
    else curr.right = insert(curr.right, val);
    return curr;
  }
  for (const v of values) root = insert(root, v);

  let curr = root;
  while (curr) {
    if (v1 < curr.val && v2 < curr.val) {
      curr = curr.left;
    } else if (v1 > curr.val && v2 > curr.val) {
      curr = curr.right;
    } else {
      return curr.val;
    }
  }
  return null;
}`,
    starterCodes: {
      javascript: `function lca(values, v1, v2) {
  // Return LCA value
}`,
      python: `def lca(values, v1, v2):
    # Return LCA value
    pass`,
      cpp: `Node *lca(Node *root, int v1, int v2) {
    // Return LCA node
}`,
      java: `public static Node lca(Node root, int v1, int v2) {
    // Return LCA node
}`
    },
    tests: [
      { input: [[4, 2, 7, 1, 3, 6], 1, 7], expected: 4, display: "lca([4,2,7,1,3,6], 1, 7)" },
      { input: [[4, 2, 7, 1, 3, 6], 1, 3], expected: 2, display: "lca([4,2,7,1,3,6], 1, 3)" },
      { input: [[8, 4, 9, 1, 2, 3, 6, 5], 1, 2], expected: 1, display: "lca([8,4,9,1,2,3,6,5], 1, 2)" }
    ]
  }
];
