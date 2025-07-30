import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
}

interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Prayer Times', href: '/prayers', current: location.pathname === '/prayers' },
    { name: 'Quran', href: '/quran', current: location.pathname === '/quran' },
    { name: 'Zakat', href: '/zakat', current: location.pathname === '/zakat' },
    { name: 'Community', href: '/community', current: location.pathname === '/community' },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">MuslimHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-2"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md mx-3"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
