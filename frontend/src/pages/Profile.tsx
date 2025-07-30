import React, { useState } from 'react';
import { UserIcon, Cog6ToothIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    joinDate: '2024-01-15',
    avatar: null,
    bio: 'Seeking knowledge and spiritual growth through technology',
    location: 'New York, NY',
    stats: {
      prayersCompleted: 127,
      versesRead: 2847,
      zakatCalculated: 5,
      communityPosts: 23
    }
  });

  const activities = [
    { activity: 'Completed Fajr prayer', time: '2 hours ago', type: 'prayer' },
    { activity: 'Read Surah Al-Baqarah', time: '1 day ago', type: 'quran' },
    { activity: 'Calculated Zakat on savings', time: '3 days ago', type: 'zakat' },
    { activity: 'Joined community discussion', time: '1 week ago', type: 'community' }
  ];

  const achievements = [
    { title: 'First Prayer', description: 'Completed your first prayer tracking', earned: true },
    { title: 'Quran Reader', description: 'Read 100 verses', earned: true },
    { title: 'Community Member', description: 'Made your first community post', earned: true },
    { title: 'Zakat Calculator', description: 'Used the Zakat calculator', earned: false }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'activity', name: 'Activity', icon: ChartBarIcon },
    { id: 'achievements', name: 'Achievements', icon: BookOpenIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
              {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prayers Completed</span>
                  <span className="font-semibold text-emerald-600">{user.stats.prayersCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verses Read</span>
                  <span className="font-semibold text-blue-600">{user.stats.versesRead.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zakat Calculations</span>
                  <span className="font-semibold text-yellow-600">{user.stats.zakatCalculated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Community Posts</span>
                  <span className="font-semibold text-purple-600">{user.stats.communityPosts}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Reflection</h3>
              <div className="text-center py-4">
                <p className="text-lg font-arabic text-gray-700 mb-2">
                  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ"
                </p>
                <p className="text-sm text-gray-500 italic">
                  "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
                </p>
                <p className="text-xs text-gray-400 mt-2">- Quran 2:201</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-md p-6 ${achievement.earned ? '' : 'opacity-60'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <BookOpenIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={user.bio}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  readOnly
                />
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
