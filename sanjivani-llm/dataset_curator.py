"""
Sanjivani LLM Studio — Dataset Curator
Generates high-quality Reasoning & Tutoring SFT/GRPO datasets with <think> chains
from DOAP's 167+ DSA challenge bank and algorithmic knowledge base.
"""

import json
import os
import re

OUTPUT_JSONL = os.path.join(os.path.dirname(__file__), "sanjivani_reasoning_sft.jsonl")

SYSTEM_PROMPT = (
    "You are Sanjivani-Coder, an elite AI algorithmic mentor created for Sanjivani University. "
    "When presented with a coding or algorithm problem, think deeply through first principles "
    "inside <think> ... </think> tags before providing the complete optimal solution, complexity "
    "analysis (Big-O time and space), edge cases, and unit tests in Python 3, C++, and Java."
)

SAMPLE_PROBLEMS = [
    {
        "title": "Two Sum",
        "category": "Arrays & Hashing",
        "difficulty": "Easy",
        "statement": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        "intuition": "Brute force checks all pairs in O(N^2). We can optimize to O(N) by storing seen values and their indices in a Hash Map.",
        "optimal_time": "O(N)",
        "optimal_space": "O(N)",
        "solution_py": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, x in enumerate(nums):\n            diff = target - x\n            if diff in seen:\n                return [seen[diff], i]\n            seen[x] = i\n        return []"
    },
    {
        "title": "Sales by Match (HackerRank)",
        "category": "Arrays",
        "difficulty": "Easy",
        "statement": "There is a pile of socks that must be paired by color. Given an array ar of sock colors, determine how many matching pairs can be sold.",
        "intuition": "Count frequencies of each sock color using a hash table or integer array. For each color with count C, the number of pairs is C // 2.",
        "optimal_time": "O(N)",
        "optimal_space": "O(K) where K is number of unique colors",
        "solution_py": "def sockMerchant(n, ar):\n    counts = {}\n    pairs = 0\n    for sock in ar:\n        counts[sock] = counts.get(sock, 0) + 1\n        if counts[sock] % 2 == 0:\n            pairs += 1\n    return pairs"
    },
    {
        "title": "Balanced Brackets (HackerRank)",
        "category": "Stacks",
        "difficulty": "Medium",
        "statement": "A bracket string is balanced if all opening brackets {[ ( have matching closing brackets in correct reverse chronological order.",
        "intuition": "A LIFO stack is the ideal data structure. Push opening brackets; when a closing bracket is encountered, pop and verify matching type.",
        "optimal_time": "O(N)",
        "optimal_space": "O(N)",
        "solution_py": "def isBalanced(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return 'NO'\n    return 'YES' if not stack else 'NO'"
    },
    {
        "title": "Max Array Sum (Non-Adjacent Subset)",
        "category": "Dynamic Programming",
        "difficulty": "Medium",
        "statement": "Given an array of integers, find the maximum sum of a subset where no two elements are adjacent.",
        "intuition": "House Robber pattern: dp[i] represents max sum up to index i. State transition: dp[i] = max(dp[i-1], dp[i-2] + arr[i], arr[i], dp[i-2]). Space can be optimized to O(1) using two variables.",
        "optimal_time": "O(N)",
        "optimal_space": "O(1)",
        "solution_py": "def maxSubsetSum(arr):\n    if not arr: return 0\n    if len(arr) == 1: return max(0, arr[0])\n    prev2 = max(0, arr[0])\n    prev1 = max(prev2, arr[1])\n    for i in range(2, len(arr)):\n        curr = max(prev1, prev2 + arr[i], arr[i], prev2)\n        prev2 = prev1\n        prev1 = curr\n    return max(0, prev1)"
    }
]

def build_reasoning_trace(prob):
    return (
        f"<think>\n"
        f"1. Problem Understanding: The task is '{prob['title']}'.\n"
        f"2. Core Constraints & Pattern: Pattern belongs to {prob['category']}.\n"
        f"3. Algorithmic Intuition: {prob['intuition']}\n"
        f"4. Complexity Benchmark: Target time is {prob['optimal_time']}, target auxiliary space is {prob['optimal_space']}.\n"
        f"5. Edge Cases Considered: Empty input, negative numbers, single element, boundary limits.\n"
        f"</think>\n\n"
        f"### Algorithmic Approach & Intuition\n{prob['intuition']}\n\n"
        f"### Optimal Solution (Python 3)\n```python\n{prob['solution_py']}\n```\n\n"
        f"### Complexity Analysis\n- **Time Complexity:** {prob['optimal_time']}\n- **Space Complexity:** {prob['optimal_space']}"
    )

def generate_dataset():
    records = []
    for prob in SAMPLE_PROBLEMS:
        user_msg = f"Solve the problem '{prob['title']}' ({prob['difficulty']}) in DSA:\n{prob['statement']}\nExplain intuition, optimal complexity, and complete implementation."
        assistant_msg = build_reasoning_trace(prob)

        record = {
            "conversations": [
                {"from": "system", "value": SYSTEM_PROMPT},
                {"from": "human", "value": user_msg},
                {"from": "gpt", "value": assistant_msg}
            ]
        }
        records.append(record)

    with open(OUTPUT_JSONL, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"[OK] Successfully generated {len(records)} reasoning training samples to {OUTPUT_JSONL}")

if __name__ == "__main__":
    generate_dataset()
