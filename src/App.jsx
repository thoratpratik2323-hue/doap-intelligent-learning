import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Shell/Sidebar';
import { Header } from './components/Shell/Header';
import { AmbientBackground } from './components/Shell/AmbientBackground';
import { FloatingActionButton } from './components/Common/FloatingActionButton';
import { EditProfileModal } from './components/Modals/EditProfileModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { AuthModal } from './components/Modals/AuthModal';
import { AuthScreen } from './components/Auth/AuthScreen';
import { LandingPage } from './components/Landing/LandingPage';
import { ErrorBoundary } from './components/Common/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AITutor } from './pages/AITutor';
import { VoiceTutor } from './pages/VoiceTutor';
import { MyLearning } from './pages/MyLearning';
import { StudyPlan } from './pages/StudyPlan';
import { CodingPractice } from './pages/CodingPractice';
import { AIInterview } from './pages/AIInterview';
import { Assessments } from './pages/Assessments';
import { JobReadiness } from './pages/JobReadiness';
import { Events } from './pages/Events';
import { Resources } from './pages/Resources';
import { Achievements } from './pages/Achievements';
import { Profile } from './pages/Profile';

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

const AppContent = () => {
  const { currentPath, isSidebarCollapsed } = useTheme();
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
    if (publicView === 'auth') {
      return (
        <AuthScreen 
          initialMode={authInitialMode} 
          onBackToLanding={() => setPublicView('landing')} 
        />
      );
    }
    return (
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
        return <CodingPractice />;
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
          <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64 lg:ml-68'}`}>
            <Header onOpenMobileSidebar={() => setIsMobileOpen(true)} />
            
            <main className={`flex-1 overflow-y-auto ${currentPath === '/ai-tutor' ? 'p-2 sm:p-3 md:p-4' : 'p-3 md:p-6 lg:p-8'}`}>
              <ErrorBoundary>
                <div key={currentPath} className="animate-page-transition">
                  {renderPage()}
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
