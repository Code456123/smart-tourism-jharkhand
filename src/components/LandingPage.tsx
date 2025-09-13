import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Award, 
  Shield, 
  BarChart3, 
  Calendar,
  Leaf,
  Mountain,
  Users,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'home' | 'itinerary' | 'marketplace' | 'map' | 'eco-score' | 'safety' | 'dashboard' | 'guides' | 'prototype') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationButtons = [
    { id: 'itinerary' as const, label: 'Plan Trip', icon: Calendar, color: 'bg-eco-green-500 hover:bg-eco-green-600' },
    { id: 'marketplace' as const, label: 'Marketplace', icon: ShoppingBag, color: 'bg-cultural-orange-500 hover:bg-cultural-orange-600' },
    { id: 'eco-score' as const, label: 'Eco-Score', icon: Award, color: 'bg-eco-green-600 hover:bg-eco-green-700' },
    { id: 'safety' as const, label: 'Safety', icon: Shield, color: 'bg-red-500 hover:bg-red-600' },
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3, color: 'bg-earth-brown-500 hover:bg-earth-brown-600' },
  ];

  const features = [
    {
      icon: '🧠',
      title: 'AI Emotion-Based Planning',
      description: 'Get personalized itineraries based on your mood and preferences'
    },
    {
      icon: '🌱',
      title: 'Eco-Score Gamification',
      description: 'Earn points for sustainable travel choices and unlock badges'
    },
    {
      icon: '🛡️',
      title: 'Blockchain Verified Guides',
      description: 'Connect with certified local guides verified on blockchain'
    },
    {
      icon: '🗺️',
      title: '3D Interactive Maps',
      description: 'Explore destinations with immersive 3D previews'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Travelers', icon: Users },
    { number: '200+', label: 'Eco Destinations', icon: Mountain },
    { number: '95%', label: 'Satisfaction Rate', icon: Star },
    { number: '1000+', label: 'Local Partners', icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-earth-brown-50">
      {/* Header */}
      <header className="relative z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-eco-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Jharkhand</h1>
                <p className="text-xs text-eco-green-600 font-medium">Smart Tourism</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onNavigate('map')}
                className="text-gray-600 hover:text-eco-green-600 font-medium transition-colors"
              >
                Explore
              </button>
              <button 
                onClick={() => onNavigate('guides')}
                className="text-gray-600 hover:text-eco-green-600 font-medium transition-colors"
              >
                Guides
              </button>
              <button className="text-gray-600 hover:text-eco-green-600 font-medium transition-colors">
                About
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-eco-green-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-eco-green-600/20 to-cultural-orange-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-eco-green-100 text-eco-green-800 mb-6">
                <Leaf className="w-4 h-4 mr-2" />
                Sustainable • Cultural • Authentic
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Experience 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-green-600 to-cultural-orange-600">
                {" "}Jharkhand{" "}
              </span>
              like Never Before
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover the pristine beauty, rich tribal culture, and sustainable tourism experiences 
              with our AI-powered platform that rewards eco-friendly choices.
            </p>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {navigationButtons.map((btn) => {
                const IconComponent = btn.icon;
                return (
                  <button
                    key={btn.id}
                    onClick={() => onNavigate(btn.id)}
                    className={`${btn.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
                  >
                    <IconComponent className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm">{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-eco-green-200 rounded-full opacity-50 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cultural-orange-200 rounded-full opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-earth-brown-200 rounded-full opacity-50 animate-bounce-slow"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of tourism with AI-powered planning and blockchain-verified authenticity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-eco-green-50 to-white hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-eco-green-600 to-cultural-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <IconComponent className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earth-brown-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Explore Jharkhand?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your sustainable journey today and earn eco-points while discovering hidden gems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('prototype')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              🎨 View Prototype UI
            </button>
            <button 
              onClick={() => onNavigate('itinerary')}
              className="bg-eco-green-600 hover:bg-eco-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Plan My Trip Now
            </button>
            <button 
              onClick={() => onNavigate('map')}
              className="bg-white hover:bg-gray-50 text-eco-green-600 border-2 border-eco-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Explore Destinations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
