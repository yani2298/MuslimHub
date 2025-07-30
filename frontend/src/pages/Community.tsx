import React, { useState } from 'react';
import { UserGroupIcon, ChatBubbleLeftIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('forums');

  const forums = [
    {
      id: 1,
      title: 'General Islamic Discussion',
      description: 'Discuss various aspects of Islam, faith, and spirituality',
      members: 15420,
      posts: 8934,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      title: 'Quran Study Circle',
      description: 'Weekly Quran study and tafseer discussions',
      members: 3256,
      posts: 1876,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      title: 'Prayer & Worship',
      description: 'Share experiences and ask questions about prayers',
      members: 7890,
      posts: 4521,
      lastActivity: '3 hours ago'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Community Iftar Gathering',
      date: '2024-04-15',
      time: '18:30',
      location: 'Masjid Al-Noor',
      attendees: 156,
      type: 'iftar'
    },
    {
      id: 2,
      title: 'Friday Khutbah: Patience in Islam',
      date: '2024-04-12',
      time: '13:00',
      location: 'Islamic Center',
      attendees: 89,
      type: 'lecture'
    },
    {
      id: 3,
      title: 'Youth Islamic Quiz Competition',
      date: '2024-04-20',
      time: '15:00',
      location: 'Community Hall',
      attendees: 45,
      type: 'competition'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      author: 'Ahmed Ali',
      title: 'Beautiful hadith about patience',
      content: 'The Prophet (peace be upon him) said: "And whoever remains patient, Allah will make him patient..."',
      time: '1 hour ago',
      replies: 12,
      likes: 24
    },
    {
      id: 2,
      author: 'Fatima Hassan',
      title: 'Question about Wudu',
      content: 'Assalamu alaikum, I have a question about the validity of wudu when...',
      time: '3 hours ago',
      replies: 8,
      likes: 15
    }
  ];

  const tabs = [
    { id: 'forums', name: 'Forums', icon: ChatBubbleLeftIcon },
    { id: 'events', name: 'Events', icon: CalendarIcon },
    { id: 'posts', name: 'Recent Posts', icon: UserGroupIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect with Muslims worldwide</p>
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

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="space-y-4">
            {forums.map((forum) => (
              <div key={forum.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{forum.title}</h3>
                    <p className="text-gray-600 mb-4">{forum.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {forum.members.toLocaleString()} members
                      </span>
                      <span className="flex items-center">
                        <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                        {forum.posts.toLocaleString()} posts
                      </span>
                      <span>Last activity: {forum.lastActivity}</span>
                    </div>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
                    Join Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recent Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">by {post.author} • {post.time}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.replies} replies</span>
                  <span>{post.likes} likes</span>
                  <button className="text-emerald-600 hover:text-emerald-700">Read more</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Islamic Quote */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-lg font-arabic text-gray-700 mb-2">
            "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ"
          </p>
          <p className="text-sm text-gray-500 italic">
            "The believing men and believing women are allies of one another"
          </p>
          <p className="text-xs text-gray-400 mt-2">- Quran 9:71</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
