import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import PrayerTimes from './pages/PrayerTimes';
import QuranReader from './pages/QuranReader';
import ZakatCalculator from './pages/ZakatCalculator';
import Community from './pages/Community';
import Profile from './pages/Profile';

// Hooks
import { useAuth } from './hooks/useAuth';

// Styles
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 3;
      },
    },
  },
});

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          {/* Navigation */}
          <Navbar user={user} />

          {/* Main Content */}
          <main className="pt-16"> {/* Account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prayers" element={<PrayerTimes />} />
              <Route path="/quran" element={<QuranReader />} />
              <Route path="/zakat" element={<ZakatCalculator />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#10b981',
                color: '#ffffff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </div>
      </Router>

      {/* React Query Devtools (development only) */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;
