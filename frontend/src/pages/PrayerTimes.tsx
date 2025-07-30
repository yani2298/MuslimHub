import React, { useState, useEffect } from 'react';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const PrayerTimes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Loading location...');
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: '05:30',
    sunrise: '06:45',
    dhuhr: '12:15',
    asr: '15:30',
    maghrib: '18:45',
    isha: '20:15'
  });

  useEffect(() => {
    // Simulate loading prayer times
    setTimeout(() => {
      setLocation('New York, NY');
      setLoading(false);
    }, 2000);
  }, []);

  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr, arabic: 'الفجر', description: 'Dawn Prayer' },
    { name: 'Sunrise', time: prayerTimes.sunrise, arabic: 'الشروق', description: 'Sunrise' },
    { name: 'Dhuhr', time: prayerTimes.dhuhr, arabic: 'الظهر', description: 'Noon Prayer' },
    { name: 'Asr', time: prayerTimes.asr, arabic: 'العصر', description: 'Afternoon Prayer' },
    { name: 'Maghrib', time: prayerTimes.maghrib, arabic: 'المغرب', description: 'Sunset Prayer' },
    { name: 'Isha', time: prayerTimes.isha, arabic: 'العشاء', description: 'Night Prayer' },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading prayer times..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prayer Times</h1>
          <div className="flex items-center justify-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {prayers.map((prayer, index) => (
            <div key={prayer.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-emerald-600 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{prayer.name}</h3>
                    <p className="text-sm text-gray-500">{prayer.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{prayer.time}</p>
                  <p className="text-sm font-arabic text-gray-600">{prayer.arabic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Reminder</h2>
          <div className="text-center py-6">
            <p className="text-lg font-arabic text-gray-700 mb-2">
              "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"
            </p>
            <p className="text-sm text-gray-500 italic">
              "Indeed, prayer has been decreed upon the believers a decree of specified times."
            </p>
            <p className="text-xs text-gray-400 mt-2">- Quran 4:103</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
