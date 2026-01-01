import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Mail, Award, Edit2, Shield, Clock, BookOpen } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-500 to-indigo-600 -z-0"></div>
        
        <div className="z-10 relative mt-4 md:mt-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center text-4xl font-bold text-brand-600">
            {user.name.charAt(0)}
          </div>
        </div>
        
        <div className="z-10 flex-1 text-center md:text-left mt-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
             <span className="bg-brand-100 text-brand-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
               {user.level}
             </span>
          </div>
          <p className="text-gray-500">{user.currentRole} • {user.course}</p>
          
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
             <button className="text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
               <Edit2 size={14} /> Edit Profile
             </button>
             <button className="text-sm bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm">
               View Public Resume
             </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{user.streak}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Day Streak</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{user.xp}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Total XP</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Skills Mastered</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">Top 10%</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Class Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Column */}
        <div className="md:col-span-1 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-900 mb-4">About</h3>
             <div className="space-y-4">
               <div className="flex items-center gap-3 text-sm text-gray-600">
                 <Mail size={16} className="text-gray-400" />
                 {user.email}
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                 <Shield size={16} className="text-gray-400" />
                 Verified Student
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                 <Clock size={16} className="text-gray-400" />
                 Joined Jan 2025
               </div>
             </div>
           </div>
           
           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
             <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
             <p className="text-indigo-100 text-sm mb-4">Get unlimited AI career advice and premium courses.</p>
             <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
               View Plans
             </button>
           </div>
        </div>

        {/* Badges Column */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Award className="text-brand-600" />
                Achievements & Badges
              </h3>
              <span className="text-sm text-brand-600 font-medium cursor-pointer">View All</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user.badges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-brand-50 hover:border-brand-200 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-3 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 text-center">{badge}</span>
                  <span className="text-xs text-gray-500 mt-1">Earned Jan 2025</span>
                </div>
              ))}
              
              {/* Locked Badge Placeholder */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                 <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-3">
                    <Lock size={20} />
                 </div>
                 <span className="text-sm font-semibold text-gray-500 text-center">React Master</span>
                 <span className="text-xs text-gray-400 mt-1">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Lock } from 'lucide-react';