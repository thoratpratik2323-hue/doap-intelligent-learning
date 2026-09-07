import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Shell/Sidebar';
import { Header } from './components/Shell/Header';
import { AmbientBackground } from './components/Shell/AmbientBackground';
import { FloatingActionButton } from './components/Common/FloatingActionButton';
import { EditProfileModal } from './components/Modals/EditProfileModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { AuthModal } from './components/Modals/AuthModal';
import { ErrorBoundary } from './components/Common/ErrorBoundary';

// Code-split lazy loaded components for lightweight initial bundle & fast navigation
const LandingPage = lazy(() => import('./components/Landing/LandingPage').then(m => ({ default: m.LandingPage })));
const AuthScreen = lazy(() => import('./components/Auth/AuthScreen').then(m => ({ default: m.AuthScreen })));

// Code-split lazy loaded pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const AITutor = lazy(() => import('./pages/AITutor').then(m => ({ default: m.AITutor })));
const VoiceTutor = lazy(() => import('./pages/VoiceTutor').then(m => ({ default: m.VoiceTutor })));
const MyLearning = lazy(() => import('./pages/MyLearning').then(m => ({ default: m.MyLearning })));
const StudyPlan = lazy(() => import('./pages/StudyPlan').then(m => ({ default: m.StudyPlan })));
const CodingPractice = lazy(() => import('./pages/CodingPractice').then(m => ({ default: m.CodingPractice })));
const CompanyPrep = lazy(() => import('./pages/CompanyPrep').then(m => ({ default: m.CompanyPrep })));
const AIInterview = lazy(() => import('./pages/AIInterview').then(m => ({ default: m.AIInterview })));
const Assessments = lazy(() => import('./pages/Assessments').then(m => ({ default: m.Assessments })));
const JobReadiness = lazy(() => import('./pages/JobReadiness').then(m => ({ default: m.JobReadiness })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const Achievements = lazy(() => import('./pages/Achievements').then(m => ({ default: m.Achievements })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));

// Preload high-frequency routes during browser idle time
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    import('./pages/Dashboard');
    import('./pages/AITutor');
    import('./pages/MyLearning');
    import('./pages/CodingPractice');
    import('./pages/CompanyPrep');
  });
}

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 select-none doap-canvas">
      <div className="rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4 border doap-card" style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #262626)' }}>
        <img 
          src="/doap-logo.jpg" 
          alt="DOAP Logo" 
          className="h-10 mx-auto object-contain rounded-xl shadow-md animate-pulse" 
        />
        <div className="space-y-1">
          <h3 className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary, var(--doap-text-prim))' }}>Resolving DOAP Session</h3>
          <p className="text-xs font-mono" style={{ color: 'var(--text-secondary, var(--doap-text-sec))' }}>Verifying session status...</p>
        </div>
      </div>
    </div>
  );
};

const PageLoader = () => {
  return (
    <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center p-8 select-none animate-fade-in">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Loading DOAP Workspace...</span>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { currentPath, isSidebarCollapsed, isSidebarHidden } = useTheme();
  const { user, loading } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Public Unauthenticated Navigation State ('landing' | 'auth')
  const [publicView, setPublicView] = useState('landing');
  const [authInitialMode, setAuthInitialMode] = useState('login');

  // 1. Session Loading Gate
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. Unauthenticated Entry Gate: Public Landing Page & Auth Flow
  if (!user) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        {publicView === 'auth' ? (
          <AuthScreen 
            initialMode={authInitialMode} 
            onBackToLanding={() => setPublicView('landing')} 
          />
        ) : (
          <LandingPage 
            onGetStarted={() => {
              setAuthInitialMode('signup');
              setPublicView('auth');
            }}
            onSignIn={() => {
              setAuthInitialMode('login');
              setPublicView('auth');
            }}
          />
        )}
      </Suspense>
    );
  }

  // 3. Authenticated Main Application Workspace
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/dashboard':
        return <Dashboard />;
      case '/ai-tutor':
        return <AITutor />;
      case '/voice-tutor':
        return <VoiceTutor />;
      case '/learning':
        return <MyLearning />;
      case '/study-plan':
        return <StudyPlan />;
      case '/coding':
      case '/coding-practice':
        return <CodingPractice />;
      case '/company-prep':
      case '/company-questions':
        return <CompanyPrep />;
      case '/interview':
        return <AIInterview />;
      case '/assessments':
        return <Assessments />;
      case '/job-readiness':
        return <JobReadiness />;
      case '/events':
        return <Events />;
      case '/resources':
        return <Resources />;
      case '/achievements':
        return <Achievements />;
      case '/profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <AmbientBackground>
      {/* Outer framing container */}
      <div className="min-h-screen p-0 md:p-4 lg:p-6 flex items-center justify-center">
        {/* Main Central App Container */}
        <div 
          className="w-full max-w-[1600px] min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] rounded-none md:rounded-[32px] overflow-hidden shadow-2xl border flex flex-col md:flex-row relative transition-colors duration-300"
          style={{
            backgroundColor: 'var(--background, var(--doap-bg))',
            borderColor: 'var(--border, var(--doap-border))'
          }}
        >
          {/* Mobile Overlay */}
          {isMobileOpen && (
            <div 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs"
            />
          )}

          {/* Persistent Sidebar */}
          <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

          {/* Main Scrollable Content Window */}
          <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            isSidebarHidden 
              ? 'ml-0' 
              : (isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64 lg:ml-68')
          }`}>
            {currentPath !== '/ai-tutor' && currentPath !== '/voice-tutor' && (
              <Header onOpenMobileSidebar={() => setIsMobileOpen(true)} />
            )}
            
            <main className={`flex-1 min-w-0 ${currentPath === '/ai-tutor' || currentPath === '/voice-tutor' ? 'p-0 h-[100dvh] md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] overflow-hidden flex flex-col' : 'p-3 md:p-6 lg:p-8 overflow-y-auto'}`}>
              <ErrorBoundary>
                <div key={currentPath} className={`animate-page-transition ${currentPath === '/ai-tutor' || currentPath === '/voice-tutor' ? 'h-full flex-1 flex flex-col min-h-0' : ''}`}>
                  <Suspense fallback={<PageLoader />}>
                    {renderPage()}
                  </Suspense>
                </div>
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </div>

      {/* Floating Action Button & Modals */}
      <FloatingActionButton />
      <EditProfileModal />
      <SettingsModal />
      <AuthModal />
    </AmbientBackground>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
