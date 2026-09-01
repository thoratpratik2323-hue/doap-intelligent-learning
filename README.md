# 🚀 DOAP — Intelligent Learning & Engineering Ecosystem

<div align="center">

![DOAP Platform Banner](public/doap-icon.svg)

### **Next-Gen AI Platform for Software Engineers, DSA Mastery & Technical Interview Prep**

[![Live Demo](https://img.shields.io/badge/Live_Demo-doap--1908.web.app-brightgreen?style=for-the-badge&logo=firebase)](https://doap-1908.web.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**[🌐 Live Web Application](https://doap-1908.web.app)**

</div>

---

## 🌟 Key Features & Capabilities

### 1. 🤖 Real-Time Conversational AI Mentor (Google Gemini 2.5)
- **Token-by-Token Streaming Typewriter:** Natural, character-by-character live generation with a glowing cursor indicator.
- **Rich Syntax Highlighted Code Blocks:** One-click copy for Python, JavaScript, Java, C++, and SQL snippets.
- **Horizontal Quick-Action Carousel:** Instant one-click prompt chips for DSA, System Design, and Machine Learning roadmaps with smooth `<` and `>` navigation.
- **Zero-Latency Fallback Engine:** Client-side knowledge engine for sub-100ms instant guidance.

### 2. 💻 In-Browser Interactive Coding Sandbox
- **Zero Backend Dependency Runner:** Isolated execution engine that runs JavaScript solutions directly in the client.
- **Automated Test Assertions:** Test case verification, millisecond execution benchmarks, and problem completion tracking.

### 3. 🎯 AI-Proctored Technical Interview Workspace
- **Multi-Modal Candidate Setup:** Automatic webcam, microphone, and browser environment diagnostics.
- **Flexible Testing Mode:** Allows starting interviews seamlessly with audio/typed inputs even if the camera is unavailable.
- **Intelligent Evaluation Engine:** Real-time AI transcription, behavioral scoring, and actionable strength/weakness reports.

### 4. ☁️ Real-Time Cross-Device Cloud Sync (Firestore)
- **Zero-Start for New Accounts:** New users start at 0% across all milestones with no synthetic mock data.
- **Cross-Device Persistence:** Cloud Firestore multi-region database syncs solved problems, study plans, streaks, and assessment scores across all laptops, phones, and tablets.

### 5. 📅 Dynamic Real-Time Study Planner
- **Live Calendar Engine:** Automatically calculates current week dates (e.g. September) with dynamic **"TODAY"** badges.
- **Interactive Checklists & AI Schedule Generator:** 1-click AI study plan builder tailored to technical milestones.

### 6. 📊 Dynamic Job Readiness Radar
- Real assessment scoring, actionable recommendation cards with direct sandbox routing, and technical skill radar charts.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS v4, Lucide Icons, Recharts
- **Database & Auth:** Google Cloud Firestore, Firebase Authentication
- **AI / LLM Integration:** Google Gemini API (Interactions API / REST), `@google/genai`
- **Hosting & Deployment:** Firebase Hosting (Multi-CDN Global Distribution)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/thoratpratik2323-hue/doap-intelligent-learning.git
cd doap-intelligent-learning
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=doap-1908.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=doap-1908
VITE_FIREBASE_STORAGE_BUCKET=doap-1908.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start Local Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`.

---

## 📦 Production Build & Deployment

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
npx firebase deploy --only hosting
```

---

## 🔒 Security & Data Safety
- All user data is partitioned and protected under `firestore.rules` where each user has isolated read/write permissions keyed by their authenticated UID.

---

<div align="center">
Built with ❤️ for engineers & aspiring developers.
</div>
