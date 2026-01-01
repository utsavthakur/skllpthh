import React from 'react';
import { JobTrendData } from '../types';
import { TrendingUp, Briefcase, DollarSign, ArrowUpRight, Zap, Users } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { MOCK_MARKET_SKILLS, MOCK_TOP_ROLES } from '../constants';

interface MarketTrendsProps {
  trends: JobTrendData[];
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({ trends }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Market Intelligence</h1>
        <p className="text-gray-500">Real-time insights into job market demands and salaries.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-green-100 rounded-xl text-green-600">
               <TrendingUp size={24} />
             </div>
             <div>
               <p className="text-sm text-gray-500 font-medium">Market Demand</p>
               <h3 className="text-2xl font-bold text-gray-900">+12%</h3>
             </div>
           </div>
           <p className="text-xs text-green-600 font-medium flex items-center gap-1">
             <ArrowUpRight size={14} /> Month over month growth
           </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
               <DollarSign size={24} />
             </div>
             <div>
               <p className="text-sm text-gray-500 font-medium">Avg. Salary</p>
               <h3 className="text-2xl font-bold text-gray-900">₹8.5 LPA</h3>
             </div>
           </div>
           <p className="text-xs text-gray-500">For Entry-Level Frontend Roles</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
               <Users size={24} />
             </div>
             <div>
               <p className="text-sm text-gray-500 font-medium">Active Openings</p>
               <h3 className="text-2xl font-bold text-gray-900">14,203</h3>
             </div>
           </div>
           <p className="text-xs text-gray-500">Across top hiring portals</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-600" />
            Hiring Trend (Last 6 Months)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap size={18} className="text-orange-500" />
            Fastest Growing Skills
          </h3>
          <div className="space-y-4">
            {MOCK_MARKET_SKILLS.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                    ${skill.type === 'hot' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}
                  `}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{skill.name}</span>
                </div>
                <span className={`text-sm font-bold ${skill.type === 'hot' ? 'text-green-600' : 'text-gray-600'}`}>
                  {skill.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Roles Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Briefcase size={18} className="text-gray-700" />
            Top Paying Roles (Tech)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Salary Range</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Openings</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TOP_ROLES.map((role, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{role.salary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{role.openings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      High Demand
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};