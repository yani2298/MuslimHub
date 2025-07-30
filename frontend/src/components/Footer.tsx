import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon,
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <span className="ml-3 text-xl font-bold">MuslimHub</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The revolutionary platform that unites technology and spirituality for the global Muslim community.
            </p>
            <div className="flex items-center space-x-4">
              <a href="mailto:contact@muslimhub.com" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <EnvelopeIcon className="h-6 w-6" />
              </a>
              <a href="https://muslimhub.com" className="text-gray-300 hover:text-emerald-400 transition-colors">
                <GlobeAltIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/prayers" className="text-gray-300 hover:text-emerald-400">Prayer Times</Link></li>
              <li><Link to="/quran" className="text-gray-300 hover:text-emerald-400">Quran Reader</Link></li>
              <li><Link to="/zakat" className="text-gray-300 hover:text-emerald-400">Zakat Calculator</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-emerald-400">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">Community</h3>
            <ul className="space-y-3">
              <li><a href="https://discord.gg/muslimhub" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400">Discord</a></li>
              <li><a href="https://twitter.com/MuslimHubApp" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400">Twitter</a></li>
              <li><a href="https://github.com/yani2298/MuslimHub" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
              <span>Made with</span>
              <HeartIcon className="h-5 w-5 text-emerald-500" />
              <span>for the Ummah worldwide</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© {currentYear} MuslimHub. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1 font-arabic">"وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
