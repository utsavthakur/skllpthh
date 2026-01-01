import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Clock,
  BookOpen,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Target,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { CareerPath, Skill, JobTrendData } from '../types';
import { getCareerAdvice, getWhyLearnSkill } from '../services/geminiService';

interface DashboardProps {
  career: CareerPath;
  trends: JobTrendData[];
  userName: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ career: initialCareer, trends, userName }) => {
  // Local state to track progress in this session
  const [localCareerState, setLocalCareerState] = useState<CareerPath>(initialCareer);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [aiTip, setAiTip] = useState<string>("");
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Sync prop changes if career switches
  useEffect(() => {
    setLocalCareerState(initialCareer);
  }, [initialCareer.id]);

  const activeSkill = localCareerState.skills.find(s => s.status === 'in-progress');
  const completedCount = localCareerState.skills.filter(s => s.status === 'completed').length;
  const progressPercentage = Math.round((completedCount / localCareerState.skills.length) * 100);

  // Auto-fetch why to learn the active skill
  useEffect(() => {
    if (activeSkill) {
      getWhyLearnSkill(activeSkill.name, localCareerState.title).then(setAiTip);
    }
  }, [activeSkill, localCareerState.title]);

  const handleAiChat = async () => {
    if (!chatQuery.trim()) return;
    setIsChatLoading(true);
    const response = await getCareerAdvice(chatQuery, { career: localCareerState, userLevel: 'Explorer' });
    setChatResponse(response);
    setIsChatLoading(false);
  };

  const markSkillComplete = (skillId: string) => {
    const updatedSkills = localCareerState.skills.map((skill, index, array) => {
      if (skill.id === skillId) {
        return { ...skill, status: 'completed' as const };
      }
      // Unlock next skill logic
      const previousSkill = array[index - 1];
      if (previousSkill && previousSkill.id === skillId && skill.status === 'locked') {
        return { ...skill, status: 'in-progress' as const };
      }
      return skill;
    });

    // Simple heuristic to unlock the specific next one if not already handled by map logic above
    const justCompletedIndex = localCareerState.skills.findIndex(s => s.id === skillId);
    if (justCompletedIndex !== -1 && justCompletedIndex < updatedSkills.length - 1) {
      updatedSkills[justCompletedIndex + 1].status = 'in-progress';
    }

    setLocalCareerState({
      ...localCareerState,
      skills: updatedSkills
    });
    setSelectedSkill(null); // Close modal
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-2xl p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userName}! 🚀</h1>
          <p className="text-brand-100 max-w-xl">
            You are <span className="font-bold">{progressPercentage}%</span> on your way to becoming a <span className="font-semibold text-white">{localCareerState.title}</span>.
            The market demand for this role is currently <span className="inline-flex items-center bg-green-400/20 px-2 py-0.5 rounded text-green-100 text-xs font-bold uppercase ml-1">High</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {activeSkill ? (
              <button
                onClick={() => setSelectedSkill(activeSkill)}
                className="bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <PlayCircle className="w-5 h-5" />
                Continue: {activeSkill.name}
              </button>
            ) : (
              <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold cursor-default">
                All Skills Completed! 🎉
              </button>
            )}
            <button className="bg-brand-700/50 hover:bg-brand-700 text-white border border-brand-500 px-6 py-3 rounded-xl font-medium transition-colors backdrop-blur-sm">
              View Full Roadmap
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Roadmap Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Target className="text-brand-600" />
                Learning Path
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded border border-brand-100 uppercase tracking-wide">
                  Powered by SkillBrain™ v1.0
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {completedCount} / {localCareerState.skills.length} Skills
                </span>
              </div>
            </div>

            <div className="relative pl-4 md:pl-8 space-y-8 before:absolute before:inset-0 before:left-[27px] md:before:left-[43px] before:h-full before:w-0.5 before:bg-gray-200">
              {localCareerState.skills.map((skill, index) => (
                <div key={skill.id} className="relative flex items-start gap-4 md:gap-6 group">
                  {/* Status Icon */}
                  <div className={`
                    z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-500
                    ${skill.status === 'completed' ? 'bg-green-100 border-green-500 text-green-600' :
                      skill.status === 'in-progress' ? 'bg-brand-100 border-brand-500 text-brand-600 animate-pulse ring-4 ring-brand-50' :
                        'bg-gray-50 border-gray-300 text-gray-400'}
                  `}>
                    {skill.status === 'completed' ? <CheckCircle2 size={16} /> :
                      skill.status === 'in-progress' ? <PlayCircle size={16} /> :
                        <Lock size={16} />}
                  </div>

                  {/* Content Card */}
                  <div
                    onClick={() => setSelectedSkill(skill)}
                    className={`
                      flex-1 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md
                      ${skill.status === 'in-progress' ? 'bg-white border-brand-200 ring-1 ring-brand-100' :
                        skill.status === 'locked' ? 'bg-gray-50 border-gray-200 grayscale opacity-80' : 'bg-white border-gray-200'}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 border px-1.5 rounded">{skill.category}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{skill.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="flex items-center text-xs text-gray-500 gap-1 justify-end">
                          <Clock size={12} />
                          {skill.estimatedHours}h
                        </div>
                        {skill.marketDemand > 90 && (
                          <div className="flex items-center text-[10px] text-orange-600 gap-1 mt-1 font-medium">
                            <TrendingUp size={12} /> Hot Skill
                          </div>
                        )}
                      </div>
                    </div>

                    {skill.status === 'in-progress' && aiTip && (
                      <div className="mt-3 bg-brand-50 p-2.5 rounded-lg border border-brand-100 flex gap-2 items-start">
                        <Sparkles className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-brand-800 leading-relaxed">
                          <span className="font-semibold">Why learn this?</span> {aiTip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div className="space-y-6">

          {/* AI Career Assistant */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MessageSquare className="text-brand-600" size={20} />
              AI Career Assistant
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 min-h-[120px] mb-3 text-sm text-gray-700">
              {chatResponse ? (
                <div className="prose prose-sm">
                  <p>{chatResponse}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic text-center mt-4">Ask me anything about your career path!</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="E.g., How do I get an internship?"
                className="flex-1 text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiChat()}
              />
              <button
                onClick={handleAiChat}
                disabled={isChatLoading}
                className="bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-3 transition-colors disabled:opacity-50"
              >
                {isChatLoading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <ChevronRight size={18} />}
              </button>
            </div>
          </div>

          {/* Stats: Skill Gap */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <TrendingUp className="text-brand-600" size={20} />
              Market Alignment
            </h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ color: '#64748b' }}
                  />
                  <Area type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Job demand for {localCareerState.title} over last 6 months</p>
          </div>

          {/* Gamification Streak */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 p-5">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg shadow-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-orange-900">12 Day Streak!</h4>
                <p className="text-xs text-orange-700">You're on fire! 🔥 Keep learning to reach 15 days.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedSkill(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl transform transition-all scale-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedSkill.name}</h2>
              <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>

            <p className="text-gray-600 mb-6">{selectedSkill.description}</p>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Recommended Resources</h4>
              <ul className="space-y-2">
                {selectedSkill.resources.map((res, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                    <BookOpen size={16} className="text-brand-600" />
                    <span className="text-sm font-medium text-gray-800">{res}</span>
                    <ChevronRight size={14} className="ml-auto text-gray-400" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-end">
              {selectedSkill.status === 'in-progress' ? (
                <button
                  onClick={() => markSkillComplete(selectedSkill.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={18} /> Mark as Complete
                </button>
              ) : selectedSkill.status === 'locked' ? (
                <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed">
                  Locked (Complete previous)
                </button>
              ) : (
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <CheckCircle2 size={18} /> Completed
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};