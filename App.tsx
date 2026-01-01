import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';
import { Auth } from './components/Auth';
import { MarketTrends } from './components/MarketTrends';
import { Profile } from './components/Profile';
import { CareerAdvisor } from './components/CareerAdvisor';
import { MOCK_USER, CAREER_PATHS, MOCK_TRENDS } from './constants';
import { UserProfile } from './types';
import { SkillBrain } from './services/skillBrain';

// Main App Component
const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'auth_login' | 'auth_signup' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Derived State (Must be calculated before any returns)
  const userToRender = currentUser || MOCK_USER;

  // Dynamic Career Selection with SkillBrain Engine
  const activeCareer = React.useMemo(() => {
    return SkillBrain.generatePath(userToRender.targetCareerId, userToRender);
  }, [userToRender.targetCareerId, userToRender]);

  // Handlers
  const handleGetStarted = () => setView('auth_signup');

  const handleAuthLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setView('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
    setActiveTab('dashboard');
  };

  // Render Logic
  if (view === 'landing') {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (view === 'auth_login' || view === 'auth_signup') {
    return (
      <Auth
        initialMode={view === 'auth_login' ? 'login' : 'signup'}
        onLogin={handleAuthLogin}
        onBack={() => setView('landing')}
      />
    );
  }

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
      user={userToRender}
    >
      {activeTab === 'dashboard' && (
        <Dashboard
          career={activeCareer}
          trends={MOCK_TRENDS}
          userName={userToRender.name.split(' ')[0]}
        />
      )}

      {activeTab === 'roadmap' && (
        // Re-using dashboard for roadmap view in this demo
        <Dashboard
          career={activeCareer}
          trends={MOCK_TRENDS}
          userName={userToRender.name.split(' ')[0]}
        />
      )}

      {activeTab === 'market' && (
        <MarketTrends trends={MOCK_TRENDS} />
      )}

      {activeTab === 'profile' && (
        <Profile user={userToRender} />
      )}

      {activeTab === 'advisor' && (
        <CareerAdvisor
          career={activeCareer}
          userName={userToRender.name.split(' ')[0]}
        />
      )}
    </Layout>
  );
};

export default App;