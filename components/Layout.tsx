import React, { ReactNode } from 'react';
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  User,
  LogOut,
  GraduationCap,
  Menu,
  X,
  ArrowLeft,
  Bot
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  user: { name: string; level: string; xp: number };
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onLogout,
  user
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Skill Roadmap', icon: Map },
    { id: 'advisor', label: 'AI Advisor', icon: Bot },
    { id: 'market', label: 'Market Trends', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleBack = () => {
    onTabChange('dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b z-20 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          {activeTab !== 'dashboard' && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 text-gray-600 hover:text-brand-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            {!((activeTab !== 'dashboard')) && <GraduationCap className="text-brand-600 h-6 w-6" />}
            <span className="font-bold text-lg text-gray-800">
              {activeTab === 'dashboard' ? 'SkillPath' : navItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out shadow-lg md:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:flex md:flex-col
      `}>
        <div className="p-6 border-b flex items-center gap-3">
          <div className="bg-brand-100 p-2 rounded-lg">
            <GraduationCap className="text-brand-600 h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">SkillPath</h1>
            <p className="text-xs text-gray-500">Career Guidance AI</p>
          </div>
        </div>

        <div className="p-4 border-b bg-brand-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold border border-brand-300">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{user.name}</p>
              <p className="text-xs text-brand-600 font-medium">{user.level}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right">{user.xp} XP / 2000 XP</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === item.id
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200 translate-x-1'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-brand-600' : 'text-gray-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 h-screen overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 md:p-8 relative">
          {/* Desktop Back Button for non-dashboard tabs */}
          {activeTab !== 'dashboard' && (
            <button
              onClick={handleBack}
              className="hidden md:flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-6 transition-colors font-medium group"
            >
              <div className="p-1 rounded-full bg-gray-200 group-hover:bg-brand-100 transition-colors">
                <ArrowLeft size={16} className="text-gray-600 group-hover:text-brand-600" />
              </div>
              <span>Back to Dashboard</span>
            </button>
          )}
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};