import React from 'react';
import { ClockIcon, BookOpenIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Prayers Completed', value: '127', icon: ClockIcon, color: 'emerald' },
    { name: 'Verses Read', value: '2,847', icon: BookOpenIcon, color: 'blue' },
    { name: 'Zakat Calculated', value: '$1,250', icon: CurrencyDollarIcon, color: 'yellow' },
    { name: 'Community Posts', value: '23', icon: UserGroupIcon, color: 'purple' },
  ];

  const recentActivities = [
    { activity: 'Completed Fajr prayer', time: '2 hours ago', type: 'prayer' },
    { activity: 'Read Surah Al-Baqarah', time: '1 day ago', type: 'quran' },
    { activity: 'Calculated Zakat on savings', time: '3 days ago', type: 'zakat' },
    { activity: 'Joined community discussion', time: '1 week ago', type: 'community' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's your spiritual journey overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              emerald: 'bg-emerald-500 text-emerald-100',
              blue: 'bg-blue-500 text-blue-100',
              yellow: 'bg-yellow-500 text-yellow-100',
              purple: 'bg-purple-500 text-purple-100',
            };

            return (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                        <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Daily Reminder</h3>
              <div className="text-center py-8">
                <p className="text-lg font-arabic text-gray-700 mb-2">
                  "وَاذْكُر رَّبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ"
                </p>
                <p className="text-sm text-gray-500 italic">
                  "And remember your Lord much and exalt [Him with praise] in the evening and the morning."
                </p>
                <p className="text-xs text-gray-400 mt-2">- Quran 3:41</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
