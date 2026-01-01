import React from 'react';
import { ChevronRight, Search, Target, TrendingUp, Users, Brain, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <Target className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-900">SkillPath</span>
            </div>
            <div className="flex gap-4">
              <button onClick={onGetStarted} className="text-gray-600 font-medium hover:text-gray-900">Log in</button>
              <button onClick={onGetStarted} className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-brand-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Now with AI-Powered Career Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Build Skills That <span className="text-brand-600">Actually</span><br /> Get You Hired
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Stop guessing what to learn next. We analyze millions of job descriptions to give you a personalized, data-driven roadmap to your dream career.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button 
                onClick={onGetStarted}
                className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2"
              >
                Find Your Path <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-brand-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Skill Gap', value: '45%', desc: 'Avg. gap for fresh graduates', icon: Users },
              { label: 'Real-time', value: 'Live', desc: 'Market demand updates', icon: TrendingUp },
              { label: 'Careers', value: '500+', desc: 'Detailed skill roadmaps', icon: Target },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border flex items-start gap-4">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600">
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to advance your career</h2>
            <p className="text-xl text-gray-600">Our platform combines AI analysis with real-time market data to give you an unfair advantage.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analysis',
                desc: 'Our AI analyzes your profile against millions of job descriptions to find your perfect fit.',
                icon: Brain,
                color: 'bg-purple-100 text-purple-600'
              },
              {
                title: 'Market Verification',
                desc: 'Every skill recommendation is backed by real-time hiring data and salary trends.',
                icon: Shield,
                color: 'bg-blue-100 text-blue-600'
              },
              {
                title: 'Fast-Track Growth',
                desc: 'Skip the guesswork. Get a direct roadmap to the promotion or job offers you want.',
                icon: Zap,
                color: 'bg-amber-100 text-amber-600'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-200 hover:border-brand-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Path to Success</h2>
            <p className="text-xl text-gray-300">Three simple steps to transform your career trajectory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-700 -z-10"></div>
            
            {[
              { title: 'Connect Profile', desc: 'Sync your LinkedIn or upload your CV for instant analysis.' },
              { title: 'Get Your Plan', desc: 'Receive a personalized skill gap analysis and learning path.' },
              { title: 'Level Up', desc: 'Follow the roadmap, learn skills, and track your progress.' }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-900 mx-auto mb-6 text-2xl font-bold text-brand-400">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to accelerate your career?</h2>
          <p className="text-xl text-gray-600 mb-10">Join 50,000+ professionals already using SkillPath to reach their goals.</p>
          <button onClick={onGetStarted} className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/25 inline-flex items-center gap-2">
            Get Started Now <ArrowRight />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-brand-600 p-1.5 rounded-lg">
                  <Target className="text-white w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-gray-900">SkillPath</span>
              </div>
              <p className="text-sm text-gray-500">
                Data-driven career intelligence for the modern professional.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">Features</a></li>
                <li><a href="#" className="hover:text-brand-600">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-600">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">About</a></li>
                <li><a href="#" className="hover:text-brand-600">Careers</a></li>
                <li><a href="#" className="hover:text-brand-600">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-600">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-600">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 SkillPath. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-gray-400 hover:text-gray-600 cursor-pointer"><Users size={20} /></span>
              <span className="text-gray-400 hover:text-gray-600 cursor-pointer"><Target size={20} /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};