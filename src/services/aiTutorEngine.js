/**
 * DOAP AI Real-Time Tutor Engine
 * Ultra-fast hybrid: Live Gemini AI + Instant zero-latency Knowledge Engine.
 */

export async function generateSmartTutorResponse(message, userName = 'there', history = []) {
  const text = (message || '').trim();
  const lower = text.toLowerCase();

  // 1. Check for live Groq API Key (gsk_...) or Gemini API Key (AIzaSy...)
  const groqKey = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_groq_key') : '') || 
                  (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || 
                  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || '';

  const geminiKey = (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || 
                    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

  // A. Groq LPU Engine (Llama 3.3 70B - Sub-150ms Speed)
  if (groqKey && groqKey.startsWith('gsk_')) {
    try {
      const systemInstruction = `You are DOAP AI, an elite, friendly, and world-class AI computer science mentor and software engineering tutor.
You help students with programming, DSA, web development, AI/ML, system design, coding interviews, and career roadmaps.
Guidelines:
- Explain clearly, warmly, and practically with markdown formatting and real code snippets.
- Address the user as ${userName}.
- Provide direct, concise, and highly actionable answers with zero fluff.`;

      const messages = [
        { role: 'system', content: systemInstruction },
        ...history.slice(-4).map(item => ({
          role: item.sender === 'user' ? 'user' : 'assistant',
          content: item.text
        })),
        { role: 'user', content: text }
      ];

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.6,
          max_tokens: 1024
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) return reply;
      }
    } catch (err) {
      console.warn('[Groq LPU Engine] Fast fallback:', err);
    }
  }

  // B. Google Gemini AI Engine
  if (geminiKey && geminiKey.startsWith('AIzaSy') && geminiKey.length > 30) {
    try {
      const systemInstruction = `You are DOAP AI, an elite, friendly, and world-class AI computer science mentor and software engineering tutor.
You help students with programming, DSA, web development, AI/ML, system design, coding interviews, and career roadmaps.
Guidelines:
- Explain clearly, warmly, and practically with markdown formatting and real code snippets.
- Address the user as ${userName}.
- Never use robotic boilerplates. Always answer the user's specific question directly with actionable guidance.`;

      const contents = history.slice(-4).map(item => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: text }]
      });

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7
          }
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return reply;
        }
      }
    } catch (err) {
      console.warn('[Gemini REST Client] Live API call fast fallback:', err);
    }
  }

  // 2. Ultra-Fast High-Quality Natural Language Knowledge Engine

  // A. Casual Greetings
  if (/^(hey|hi|hello|heyy|heya|yo|hola|namaste|ssup|wassup|hii+|helo|greet)/i.test(lower)) {
    const greetings = [
      `Hey ${userName}! 👋 I'm your DOAP AI tutor. What are you looking to learn or build today?`,
      `Hello ${userName}! 😊 Great to have you here. What would you like to explore — coding basics, Machine Learning, DSA, or interview prep?`,
      `Hey ${userName}! 🚀 Ready to code. Tell me what topic or question you want to work on!`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // B. Machine Learning & Artificial Intelligence
  if (/machine learning|learn.*ml|ml|artificial intelligence|deep learning|neural network|nlp|computer vision|data science/i.test(lower)) {
    return `### 🤖 Machine Learning Roadmap for Beginners (Zero to Pro)

Hey ${userName}! Machine Learning (ML) is an exciting field. Here is the step-by-step roadmap to master ML:

---

#### 1️⃣ Step 1: Master Python & Key Math Basics
- **Python Core:** Variables, loops, functions, OOP, and list comprehensions.
- **Math Essentials:**
  - **Linear Algebra:** Vectors, matrices, dot products, and transformations.
  - **Calculus:** Derivatives, partial derivatives, and Gradient Descent.
  - **Probability & Statistics:** Mean, variance, standard deviation, and normal distributions.

---

#### 2️⃣ Step 2: Essential Python Data Libraries
Master the four foundational libraries:
- **NumPy:** High-performance numerical and array operations.
- **Pandas:** Data manipulation, cleaning, and DataFrame analysis.
- **Matplotlib & Seaborn:** Data visualization and plotting trends.
- **Scikit-Learn:** Classic machine learning algorithms.

---

#### 3️⃣ Step 3: Core ML Algorithms to Master
1. **Supervised Learning:**
   - *Regression:* Linear Regression, Ridge, Lasso.
   - *Classification:* Logistic Regression, Decision Trees, Random Forests, XGBoost, Support Vector Machines (SVM).
2. **Unsupervised Learning:**
   - *Clustering:* K-Means, Hierarchical Clustering.
   - *Dimensionality Reduction:* Principal Component Analysis (PCA).

---

#### 4️⃣ Step 4: Quick Hands-On Code Example
Here is how simple training a basic predictor is in Python:

\`\`\`python
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# 1. Sample Data (Study Hours vs Exam Score)
hours = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])
scores = np.array([45, 50, 60, 68, 75, 82, 88, 95])

# 2. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(hours, scores, test_size=0.25, random_state=42)

# 3. Model Training
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Predict
predictions = model.predict(X_test)
print(f"Predicted score for test set: {predictions}")
\`\`\`

---

#### 5️⃣ Step 5: Recommended Starter Projects
1. **House Price Prediction** (Linear Regression with Kaggle dataset).
2. **Spam SMS Classifier** (NLP with TF-IDF & Naive Bayes).
3. **Customer Churn Prediction** (Random Forest / Logistic Regression).

What subfield of AI excites you most — Generative AI / LLMs, Computer Vision, or Tabular Data Modeling? Let me know!`;
  }

  // C. Beginners & "I want to learn coding / how to start"
  if (/learn.*coding|start.*coding|learn.*programming|start.*programming|how to (start|code|learn)|beginner|which language/i.test(lower)) {
    return `### 🚀 How to Start Learning to Code (Step-by-Step Roadmap)

Starting to code is one of the best decisions you can make! Here is the clear blueprint to go from zero to building real applications:

---

#### 1️⃣ Choose Your Starting Language
- **JavaScript / TypeScript:** Best if you want to build websites, web apps, or full-stack software.
- **Python:** Best if you are interested in AI, Machine Learning, Data Science, or quick scripting.
- **C++ / Java:** Best if you want to build a solid foundation for college exams and Competitive Programming (DSA).

*Recommendation for beginners: Start with **Python** or **JavaScript**.*

---

#### 2️⃣ The 5 Fundamental Building Blocks
1. **Variables & Data Types:** Storing numbers, strings, and booleans.
2. **Conditionals (\`if / else\`):** Making decisions in code.
3. **Loops (\`for\`, \`while\`):** Repeating actions efficiently.
4. **Functions:** Reusable blocks of logic.
5. **Data Structures (\`Arrays\` & \`Objects / HashMaps\`):** Organizing data.

---

#### 3️⃣ Build 3 Quick Starter Projects
- **Project 1:** Interactive To-Do List app.
- **Project 2:** Live Weather app (fetching real data using an API).
- **Project 3:** Simple Expense Tracker with local storage.

---

#### 4️⃣ Practice Right Here on DOAP!
- Head over to the **Coding Practice** tab to solve easy beginner problems like *Two Sum* and *Valid Parentheses*.
- Explore curated engineering modules in the **My Learning** tab.

What kind of projects are you most excited to build — websites, games, mobile apps, or AI? Let me know!`;
  }

  // D. Two Sum / Array Algorithms
  if (/two sum|2 sum|pair with given sum/i.test(lower)) {
    return `### 💡 Two Sum — Optimal Pattern ($O(N)$ Time)

**Problem:** Given an array of numbers \`nums\` and a target integer \`target\`, find the indices of two numbers that add up to \`target\`.

#### Optimal Approach: Hash Map (Single Pass)
Instead of checking all pairs with nested loops ($O(N^2)$), use a Hash Map to store numbers you've seen and their index. For each number, check if \`target - num\` is already in the map.

\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
\`\`\`

- **Time Complexity:** $O(N)$ — single pass.
- **Space Complexity:** $O(N)$ — hash map storage.

👉 *You can test this solution live in the **Coding Practice** tab right now!*`;
  }

  // E. Dynamic Programming
  if (/dynamic programming|dp roadmap|dp pattern|memoization|tabulation/i.test(lower)) {
    return `### ⚡ Dynamic Programming (DP) Master Roadmap

Dynamic Programming is simply **recursion with caching (storing subproblem results)** so you never calculate the same state twice.

---

#### 1️⃣ The 5 Master DP Patterns
1. **0/1 Knapsack & Subset Sum:** Pick or leave an element.
2. **Unbounded Knapsack & Coin Change:** Elements can be picked multiple times.
3. **Longest Common Subsequence (LCS):** String matching and edit distance.
4. **Longest Increasing Subsequence (LIS):** Array ordering problems ($O(N \\log N)$).
5. **Matrix / Grid Path DP:** Unique Paths, Minimum Path Sum.

---

#### 2️⃣ Standard Memoization Template
\`\`\`javascript
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
\`\`\`

---

#### 3️⃣ 3-Step Recipe to Solve Any DP Problem
1. **Define the State:** What does \`dp[i]\` or \`dp[i][j]\` represent?
2. **Find the Base Cases:** What are the smallest valid inputs?
3. **Form the Transition Equation:** How does \`dp[i]\` relate to \`dp[i-1]\`?

Which DP pattern would you like to practice today?`;
  }

  // F. System Design
  if (/system design|architecture|scale|load balancer|caching|redis|microservices/i.test(lower)) {
    return `### 🏗️ High-Level System Design Blueprint

Designing large-scale systems requires balancing **scalability**, **reliability**, and **low latency**.

---

#### 🧱 Core Architectural Pillars
1. **DNS & Global CDN:** Cloudflare / CloudFront for static caching and DDoS protection.
2. **Load Balancer (Nginx / ALB):** Distributes incoming traffic across horizontal web servers.
3. **Stateless Web Services:** Docker / Kubernetes containers that scale horizontally on demand.
4. **Caching Layer (Redis / Memcached):** In-memory cache for hot queries ($O(1)$ read time).
5. **Database Layer:**
   - *SQL (PostgreSQL / MySQL):* ACID transactions for payments and user auth.
   - *NoSQL (MongoDB / Cassandra):* High-throughput document and time-series data.
6. **Message Queues (Kafka / RabbitMQ):** Asynchronous event streaming and background job processing.

---

#### 📐 Quick Reference Matrix
| Component | Primary Function | Example Tool |
|---|---|---|
| **API Gateway** | Auth, Rate limiting | Kong / AWS API Gateway |
| **Cache** | Sub-millisecond reads | Redis / Memcached |
| **Search Engine** | Full-text indexing | Elasticsearch / OpenSearch |
| **Task Queue** | Background workers | Celery / BullMQ / Kafka |

Would you like to design a specific system together (like URL Shortener, Twitter Feed, or Uber Backend)?`;
  }

  // G. APIs / Web Dev
  if (/what is an api|api.*explained|rest api|graphql|http methods/i.test(lower)) {
    return `### 🌐 What is an API? (Explained Simply)

An **API (Application Programming Interface)** is a bridge that lets two different software applications talk to each other and share data.

---

#### 🍽️ The Restaurant Analogy
- **You (The Client):** You sit at a table and look at the menu.
- **The Waiter (The API):** Takes your order to the kitchen and brings back your food.
- **The Kitchen (The Server/Database):** Prepares the food and sends it out.

---

#### 📡 The 4 Common HTTP Methods
1. **\`GET\`**: Retrieve data from a server (e.g., fetch user profile).
2. **\`POST\`**: Send new data to create a record (e.g., sign up, submit a form).
3. **\`PUT / PATCH\`**: Update an existing record.
4. **\`DELETE\`**: Remove a record.

---

#### 💻 Quick Code Example (Fetching an API in JavaScript)
\`\`\`javascript
async function getUserData() {
  try {
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json();
    console.log('Username:', data.login);
    console.log('Public Repos:', data.public_repos);
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}
\`\`\``;
  }

  // H. Default Fallback Conversational Response
  return `### 💡 Guidance for: "${text}"

Hey ${userName}! Here is a structured breakdown and guidance for your question:

---

#### 🎯 Key Concept & Understanding
- When approaching **${text.slice(0, 30)}**, the key is breaking it down into fundamental principles.
- Focus on practical implementation and hands-on code examples.

---

#### 🛠️ Recommended Action Steps
1. **Start with the Core Principles:** Understand the syntax and theoretical foundation.
2. **Write Working Code:** Test small snippets to see how data flows.
3. **Practice on DOAP:**
   - Use the **Coding Practice** tab to test algorithms live.
   - Use the **My Learning** tab to track structured modules.

Feel free to ask for a specific code example in Python, JavaScript, Java, or C++, or let me know what part you'd like to dive into!`;
}
