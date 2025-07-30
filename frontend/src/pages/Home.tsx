import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClockIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      icon: ClockIcon,
      title: 'Smart Prayer Times',
      description: 'Ultra-precise prayer calculations with geolocation and astronomical corrections',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: BookOpenIcon,
      title: 'Quran Reader',
      description: 'AI-powered semantic search across 50+ translations with audio recitations',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Zakat Calculator',
      description: 'Intelligent Zakat calculation supporting all methodologies and cryptocurrencies',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: UserGroupIcon,
      title: 'Global Community',
      description: 'Connect with Muslims worldwide through forums, events, and local groups',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: GlobeAltIcon,
      title: 'Qibla Finder AR',
      description: 'Augmented reality Qibla direction with 3D compass and precise calculations',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      icon: SparklesIcon,
      title: 'AI Assistant',
      description: 'Islamic AI assistant for religious questions and spiritual guidance',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '2.5M+', description: 'Muslims worldwide' },
    { label: 'Prayer Times', value: '500M+', description: 'Calculated daily' },
    { label: 'Quran Searches', value: '10M+', description: 'Monthly searches' },
    { label: 'Zakat Calculated', value: '$100M+', description: 'Annual Zakat' },
  ];

  const testimonials = [
    {
      name: 'Ahmad Hassan',
      location: 'London, UK',
      text: 'MuslimHub has revolutionized my daily worship. The prayer notifications are incredibly accurate!',
      rating: 5,
    },
    {
      name: 'Fatima Al-Zahra',
      location: 'Cairo, Egypt',
      text: 'The Quran search feature is amazing. I can find any verse instantly in multiple languages.',
      rating: 5,
    },
    {
      name: 'Omar Ibrahim',
      location: 'New York, USA',
      text: 'The Zakat calculator made my annual calculation so simple and accurate. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <span className="text-6xl">🕌</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Welcome to</span>
              <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                MuslimHub
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              The revolutionary platform that unites technology and spirituality for the global Muslim community
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/auth"
                className="px-8 py-4 bg-white text-emerald-900 font-semibold rounded-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Your Journey
              </Link>
              <Link
                to="/prayers"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-900 transform hover:scale-105 transition-all duration-200"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-emerald-300/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-teal-300/20 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience Islam in the digital age with cutting-edge technology designed for the modern Muslim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Muslims Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join millions who have transformed their spiritual journey with MuslimHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HeartIcon key={i} className="w-5 h-5 text-emerald-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Islamic Journey?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join the global Muslim community and experience the future of Islamic technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transform hover:scale-105 transition-all duration-200"
            >
              Join Community
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4 text-emerald-200">
            <CheckCircleIcon className="w-5 h-5" />
            <span>Free forever</span>
            <CheckCircleIcon className="w-5 h-5" />
            <span>No ads</span>
            <CheckCircleIcon className="w-5 h-5" />
            <span>Privacy focused</span>
          </div>
        </div>
      </section>

      {/* Quran Verse Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-6xl">📖</span>
          </div>
          <blockquote className="text-2xl sm:text-3xl font-light italic mb-6 leading-relaxed">
            "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"
          </blockquote>
          <p className="text-lg text-gray-300 mb-4">
            "And hold firmly to the rope of Allah all together and do not become divided"
          </p>
          <cite className="text-emerald-400">Quran 3:103</cite>
        </div>
      </section>
    </div>
  );
};

export default Home;
