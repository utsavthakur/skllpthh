import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CAREER_PATHS } from '../constants';
import { ALL_CAREERS } from '../data/allCareers';
import { Mail, Lock, User, GraduationCap, ArrowRight, ArrowLeft, BookOpen, Target, Briefcase, Search, Home } from 'lucide-react';

const COURSE_TO_DOMAIN: Record<string, string> = {
  'B.Tech': 'Engineering',
  'M.Tech': 'Engineering',
  'BCA': 'Engineering',
  'MCA': 'Engineering',
  'B.Sc': 'Science',
  'M.Sc': 'Science',
  'B.Com': 'Commerce & Finance',
  'M.Com': 'Commerce & Finance',
  'BBA': 'Management & MBA',
  'MBA': 'Management & MBA',
  'B.A': 'Humanities (BA)',
  'M.A': 'Humanities (BA)',
  'LLB': 'Law',
  'LLM': 'Law',
  'B.Des': 'Arts & Creative',
  'B.Ed': 'Education & Research'
};

interface AuthProps {
  onLogin: (user: UserProfile) => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

const InputField = ({
  icon: Icon, type, placeholder, value, onChange, required = true
}: { icon: any, type: string, placeholder: string, value: string, onChange: (val: string) => void, required?: boolean }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={type}
      required={required}
      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    course: 'B.Tech',
    year: '1st Year',
    targetCareerId: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [isPending, startTransition] = React.useTransition();
  const [visibleCount, setVisibleCount] = useState(50);
  const observerTarget = React.useRef(null);

  // Sort careers alphabetically
  const availableCareers = React.useMemo(() =>
    Object.values(CAREER_PATHS).sort((a, b) => a.title.localeCompare(b.title)),
    []
  );

  const filteredCareers = React.useMemo(() => {
    let results = availableCareers;
    const lowerQuery = filterQuery.toLowerCase();

    // 1. Filter by Search
    if (lowerQuery) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Sort by Relevance to Course
    const userDomain = COURSE_TO_DOMAIN[formData.course];
    if (userDomain) {
      return results.sort((a, b) => {
        const domainA = ALL_CAREERS[a.title];
        const domainB = ALL_CAREERS[b.title];

        const aMatches = domainA === userDomain;
        const bMatches = domainB === userDomain;

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    return results;
  }, [filterQuery, availableCareers, formData.course]);

  const displayedCareers = filteredCareers.slice(0, visibleCount);

  // Reset visible count on search
  React.useEffect(() => {
    setVisibleCount(50);
  }, [searchQuery]);

  // Infinite Scroll Observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 50, filteredCareers.length));
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [filteredCareers.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.targetCareerId && mode === 'signup') return;

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      // Create Complete User Profile
      const newUser: UserProfile = {
        name: formData.name || "Student User",
        email: formData.email,
        college: formData.college,
        course: formData.course,
        year: formData.year,
        targetCareerId: formData.targetCareerId || "frontend-dev",
        currentRole: "Student",
        streak: 1,
        badges: ["Newcomer"],
        xp: 0,
        level: "Explorer"
      };

      setIsLoading(false);
      onLogin(newUser);
    }, 1500);
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back to Home Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-brand-600 p-2 rounded-xl">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create your profile'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === 'login' ? 'Or ' : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setStep(1); }}
            className="font-medium text-brand-600 hover:text-brand-500"
          >
            {mode === 'login' ? 'start your free trial' : 'sign in'}
          </button>
        </p>

        {mode === 'signup' && (
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${step >= i ? 'bg-brand-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* LOGIN MODE */}
            {mode === 'login' && (
              <>
                <InputField
                  icon={Mail}
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={v => setFormData({ ...formData, email: v })}
                />
                <InputField
                  icon={Lock}
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={v => setFormData({ ...formData, password: v })}
                />
              </>
            )}

            {/* SIGNUP STEP 1: ACCOUNT */}
            {mode === 'signup' && step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                <h3 className="text-lg font-medium text-gray-900">Basic Details</h3>
                <InputField
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={v => setFormData({ ...formData, name: v })}
                />
                <InputField
                  icon={Mail}
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={v => setFormData({ ...formData, email: v })}
                />
                <InputField
                  icon={Lock}
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={v => setFormData({ ...formData, password: v })}
                />
              </div>
            )}

            {/* SIGNUP STEP 2: EDUCATION */}
            {mode === 'signup' && step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                <h3 className="text-lg font-medium text-gray-900">Your Education</h3>
                <InputField
                  icon={GraduationCap}
                  type="text"
                  placeholder="College / University Name"
                  value={formData.college}
                  onChange={v => setFormData({ ...formData, college: v })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Course</label>
                    <select
                      className="block w-full pl-3 pr-8 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-xl"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                      <option>B.Tech</option>
                      <option>M.Tech</option>
                      <option>BCA</option>
                      <option>MCA</option>
                      <option>B.Sc</option>
                      <option>M.Sc</option>
                      <option>B.Com</option>
                      <option>M.Com</option>
                      <option>BBA</option>
                      <option>MBA</option>
                      <option>B.A</option>
                      <option>M.A</option>
                      <option>LLB</option>
                      <option>B.Des</option>
                      <option>B.Ed</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Year</label>
                    <select
                      className="block w-full pl-3 pr-8 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-xl"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduated</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SIGNUP STEP 3: CAREER GOAL */}
            {mode === 'signup' && step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                <h3 className="text-lg font-medium text-gray-900">Set Your Goal</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select your Dream Career ({filteredCareers.length} Options)</label>
                  <div className="mb-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className={`h-5 w-5 ${isPending ? 'text-brand-500 animate-pulse' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                        placeholder="Search careers..."
                        value={searchQuery}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchQuery(val);
                          startTransition(() => {
                            setFilterQuery(val);
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {displayedCareers.map((career) => (
                      <div
                        key={career.id}
                        onClick={() => setFormData({ ...formData, targetCareerId: career.id })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3
                            ${formData.targetCareerId === career.id
                            ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                            : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className={`p-2 rounded-lg flex-shrink-0 ${formData.targetCareerId === career.id ? 'bg-brand-200 text-brand-700' : 'bg-gray-100 text-gray-500'}`}>
                          <Target size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
                            {career.title}
                            {ALL_CAREERS[career.title] === COURSE_TO_DOMAIN[formData.course] && (
                              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium border border-green-200">
                                Recommended
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">{career.salaryRange} • {career.skills.length} Steps</p>
                        </div>
                      </div>
                    ))}
                    {/* Intersection Observer Target */}
                    {visibleCount < filteredCareers.length && (
                      <div ref={observerTarget} className="h-4 w-full flex justify-center items-center py-4">
                        <div className="h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {!formData.targetCareerId && (
                    <p className="text-xs text-red-500 mt-2">Please select a career path to continue.</p>
                  )}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-6">
              {mode === 'signup' && step < 3 ? (
                <div className="flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex-1 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  {mode === 'signup' && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || (mode === 'signup' && !formData.targetCareerId)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      mode === 'login' ? 'Sign in' : 'Complete Setup'
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};