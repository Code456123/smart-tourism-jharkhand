import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AIItinerary from './components/AIItinerary';
import Marketplace from './components/Marketplace';
import InteractiveMap from './components/InteractiveMap';
import EcoGamification from './components/EcoGamification';
import SafetyAssistant from './components/SafetyAssistant';
import BlockchainGuides from './components/BlockchainGuides';
import Dashboard from './components/Dashboard';
import TourismPrototype from './components/TourismPrototype';

type Page = 'home' | 'itinerary' | 'marketplace' | 'map' | 'eco-score' | 'safety' | 'dashboard' | 'guides' | 'prototype';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'prototype':
        return <TourismPrototype />;
      case 'itinerary':
        return <AIItinerary onBack={() => setCurrentPage('home')} />;
      case 'marketplace':
        return <Marketplace onBack={() => setCurrentPage('home')} />;
      case 'map':
        return <InteractiveMap onBack={() => setCurrentPage('home')} />;
      case 'eco-score':
        return <EcoGamification onBack={() => setCurrentPage('home')} />;
      case 'safety':
        return <SafetyAssistant onBack={() => setCurrentPage('home')} />;
      case 'dashboard':
        return <Dashboard onBack={() => setCurrentPage('home')} />;
      case 'guides':
        return <BlockchainGuides onBack={() => setCurrentPage('home')} />;
      default:
        return <LandingPage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 to-earth-brown-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;
