import React, { useState } from 'react';
import { BookOpenIcon, MagnifyingGlassIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

const QuranReader: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const chapters = [
    { number: 1, name: 'Al-Fatiha', englishName: 'The Opening', verses: 7 },
    { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', verses: 286 },
    { number: 3, name: 'Ali Imran', englishName: 'Family of Imran', verses: 200 },
    // Mock data - in real app would be complete list
  ];

  const sampleVerses = [
    {
      number: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      transliteration: 'Bismillahi\'r-Rahmani\'r-Rahim'
    },
    {
      number: 2,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: '[All] praise is [due] to Allah, Lord of the worlds',
      transliteration: 'Alhamdulillahi Rabbi\'l-\'alamin'
    },
    {
      number: 3,
      arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'The Entirely Merciful, the Especially Merciful,',
      transliteration: 'Ar-Rahmani\'r-Rahim'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quran Reader</h1>
          <p className="text-gray-600">Read and explore the Holy Quran with translations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.number}
                    onClick={() => setSelectedChapter(chapter.number)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedChapter === chapter.number
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{chapter.number}. {chapter.name}</p>
                        <p className="text-sm text-gray-500">{chapter.englishName}</p>
                      </div>
                      <span className="text-xs text-gray-400">{chapter.verses} verses</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Verses Display */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Surah {chapters.find(c => c.number === selectedChapter)?.name}
                </h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                  <SpeakerWaveIcon className="h-4 w-4" />
                  <span>Play Audio</span>
                </button>
              </div>

              <div className="space-y-8">
                {sampleVerses.map((verse) => (
                  <div key={verse.number} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                        {verse.number}
                      </div>
                      <button className="text-gray-400 hover:text-emerald-600 transition-colors">
                        <SpeakerWaveIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-2xl font-arabic text-right text-gray-800 leading-loose mb-3">
                        {verse.arabic}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Translation:</strong> {verse.translation}
                      </p>
                      <p className="text-gray-600 italic">
                        <strong>Transliteration:</strong> {verse.transliteration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranReader;
