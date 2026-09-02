<div align="center">

<img src="public/doap-logo.jpg" alt="DOAP Logo" width="520" style="border-radius: 16px; margin-bottom: 20px;" />

# ⚡ DOAP — Intelligent Learning & Engineering Ecosystem
### *The Ultimate AI-Powered Software Engineering Mentorship & Interview Acceleration Platform*

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-doap--1908.web.app-00f2fe?style=for-the-badge&logo=google-chrome&logoColor=white)](https://doap-1908.web.app)
[![GitHub Stars](https://img.shields.io/github/stars/thoratpratik2323-hue/doap-intelligent-learning?style=for-the-badge&color=ffd700)](https://github.com/thoratpratik2323-hue/doap-intelligent-learning/stargazers)
[![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

<br />

[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase Firestore](https://img.shields.io/badge/Google_Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_2.5-8E75C2?style=flat-square&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![JavaScript](https://img.shields.io/badge/ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/)

<br />

[Explore Live Web App 🚀](https://doap-1908.web.app) • [Report Bug 🐛](https://github.com/thoratpratik2323-hue/doap-intelligent-learning/issues) • [Request Feature 💡](https://github.com/thoratpratik2323-hue/doap-intelligent-learning/issues)

</div>

---

## 📖 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [🎯 Core Modules](#-core-modules)
- [🏛️ System Architecture](#️-system-architecture)
- [📂 Project Structure](#-project-structure)
- [🚀 Quickstart & Installation](#-quickstart--installation)
- [🔐 Cloud Security & Persistence](#-cloud-security--persistence)
- [🛠️ Tech Stack](#️-tech-stack)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Highlights

```
 🧠 Google Gemini AI Mentor      │ ⚡ Token Streaming Typewriter Response
 💻 In-Browser JavaScript Runner  │ 🧪 Automated Test Case Assertions & Benchmarking
 🎤 AI Proctored Mock Interviews │ 📊 Real-Time Video/Audio Diagnostics & Rubric Reports
 ☁️ Firestore Multi-Device Sync  │ 🔄 Seamless Cross-Device State Persistence (Zero-Start)
 📅 Dynamic Calendar Planner     │ 🗓️ Real-Time Date Calculations & AI Scheduling
 📈 Job Readiness Radar          │ 🎯 Interactive Recommendations & Skill Gauges
```

---

## 🎯 Core Modules

### 1. 🤖 Conversational AI Engineering Mentor
- **Real-Time Token-by-Token Streaming:** Natural, typewriter-style token streaming with dynamic pulsing cursor.
- **Fenced Syntax Highlighted Code Blocks:** Built-in syntax highlighting and 1-click clipboard copying for Python, JavaScript, Java, C++, and SQL.
- **Interactive Quick-Action Prompt Carousel:** Horizontal scrollable prompt chips (`<` and `>`) for DSA patterns, System Design, and Machine Learning roadmaps.
- **Ultra-Low Latency Fallback Engine:** Client-side zero-latency conversational engine for instant (<100ms) guidance.

### 2. 💻 In-Browser Interactive Coding Sandbox
- **Zero-Backend Execution Engine:** Executes and benchmarks algorithms client-side in a sandboxed runtime.
- **Automated Test Assertions:** Immediate feedback with passed/failed test cases, runtime in milliseconds, and automatic Firestore progress recording.

### 3. 🎤 AI Proctored Technical Interview Workspace
- **Multi-Modal Candidate Diagnostics:** Automated checks for camera, microphone, and browser capabilities.
- **Flexible Test Fallback:** Seamlessly supports candidates without webcam access using speech/typed inputs.
- **Behavioral & Technical AI Rubric:** Generates actionable interview performance reports with skill breakdown radar charts.

### 4. ☁️ Real-Time Cloud Firestore Persistence
- **Zero-Start for New Users:** Fresh accounts begin at 0% across all metrics with no hardcoded mock data.
- **Instant Cross-Device Sync:** Login on any laptop, phone, or tablet to resume your exact learning progress, streak, and solved problems.

### 5. 📅 Dynamic Study Planner
- **Real Calendar Engine:** Live date calculations for current week with glowing **"TODAY"** badges.
- **1-Click AI Study Plan Generator:** Generates custom daily milestones for competitive exams and technical interviews.

---

## 🏛️ System Architecture

```mermaid
graph TD
    A[Client Browser / Mobile Web] -->|Firebase Auth| B(Google Identity Platform)
    A -->|Real-Time Snapshot Sync| C[(Google Cloud Firestore)]
    A -->|Streaming REST API| D[Google Gemini 2.5 Flash]
    A -->|In-Browser Sandbox| E[Client Code Execution Engine]
    
    subgraph "DOAP Cloud Services (doap-1908)"
        B
        C
        F[Firebase Global CDN Hosting]
    end

    subgraph "AI & Execution Layer"
        D
        E
    end
```

---

## 📂 Project Structure

```
doap-intelligent-learning/
├── 📁 public/                     # Static assets, icons, and SVG logos
├── 📁 src/
│   ├── 📁 components/             # Reusable UI components
│   │   ├── 📁 Auth/               # Login & Registration authentication screens
│   │   ├── 📁 Common/             # ErrorBoundaries, Buttons, Previews
│   │   ├── 📁 Interview/          # Setup, System Check, Proctoring & Reports
│   │   ├── 📁 Landing/            # Public marketing landing page
│   │   ├── 📁 Modals/             # Profile, Settings, Auth dialogs
│   │   ├── 📁 Shell/              # Sidebar, Header, AmbientBackground
│   │   └── MarkdownRenderer.jsx   # Syntax highlighted code formatter with 1-click copy
│   ├── 📁 context/                # AuthContext (Firestore sync) & ThemeContext
│   ├── 📁 data/                   # Initial curricula, DSA problem sets, gradient themes
│   ├── 📁 hooks/                  # SpeechRecognition, Camera, FaceDetection & Proctoring
│   ├── 📁 lib/                    # Firebase SDK initialization
│   ├── 📁 pages/                  # Top-level application views
│   │   ├── AITutor.jsx            # Streaming conversational AI tutor
│   │   ├── CodingPractice.jsx     # In-browser coding IDE & test sandbox
│   │   ├── AIInterview.jsx        # Multi-stage technical interview simulator
│   │   ├── Dashboard.jsx          # User metrics, streaks & overview
│   │   ├── MyLearning.jsx         # Course module tracking
│   │   ├── StudyPlan.jsx          # Live calendar & AI scheduler
│   │   └── JobReadiness.jsx       # Interactive skill radar & roadmap
│   ├── 📁 services/               # Gemini AI engine & client helpers
│   ├── App.jsx                    # Root application router with ErrorBoundary
│   └── main.jsx                   # React DOM entry point
├── firestore.rules                # Granular user document security rules
├── firebase.json                  # Firebase Hosting routing config
├── package.json                   # Project dependencies & scripts
└── vite.config.js                 # Vite bundling & asset chunking config
```

---

## 🚀 Quickstart & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/thoratpratik2323-hue/doap-intelligent-learning.git
cd doap-intelligent-learning
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyAs709w74Gi8c5zZnbTwwqwUeve-eB_wJo
VITE_FIREBASE_AUTH_DOMAIN=doap-1908.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=doap-1908
VITE_FIREBASE_STORAGE_BUCKET=doap-1908.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=619777181269
VITE_FIREBASE_APP_ID=1:619777181269:web:a54bcb279a3bfe17bb36dc
```

### 4️⃣ Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📦 Production Deployment

To build and deploy to Firebase Hosting:

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting CDN
npx firebase deploy --only hosting
```

---

## 🔐 Cloud Security & Persistence

All user data is strictly guarded by Firebase Security Rules (`firestore.rules`):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- Each user's document (`users/{uid}`) is isolated and accessible **only** by the authenticated account owner.
- Multi-region database replication ensures **zero data loss** across device switches or cache clearings.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend Framework** | React 18, Vite 6 |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Glassmorphism UI |
| **Data Visualizations** | Recharts (Responsive Radar & Progress Charts) |
| **Database & Auth** | Google Cloud Firestore, Firebase Authentication |
| **Artificial Intelligence** | Google Gemini API (Interactions API / REST) |
| **Hosting Infrastructure** | Firebase Global Multi-CDN Hosting |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by **[Pratik Thorat](https://github.com/thoratpratik2323-hue)**

⭐ **If you find this project helpful, please star the repository!** ⭐

</div>
