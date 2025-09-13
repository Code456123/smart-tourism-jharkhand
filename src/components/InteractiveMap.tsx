import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  ArrowRight, 
  Award, 
  Camera, 
  MapPin, 
  Star,
  Eye,
  Compass,
  Mountain,
  Trees,
  Building,
  Waves
} from 'lucide-react';
import { Destination } from '../types';
import { destinations } from '../data/mockData';

interface InteractiveMapProps {
  onBack: () => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onBack }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [show3DPreview, setShow3DPreview] = useState(false);

  const getDestinationIcon = (type: Destination['type']) => {
    switch (type) {
      case 'adventure': return Mountain;
      case 'natural': return Trees;
      case 'cultural': return Building;
      case 'spiritual': return Compass;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: Destination['type']) => {
    switch (type) {
      case 'adventure': return 'bg-orange-500 border-orange-600';
      case 'natural': return 'bg-green-500 border-green-600';
      case 'cultural': return 'bg-purple-500 border-purple-600';
      case 'spiritual': return 'bg-blue-500 border-blue-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const ThreeDPreviewModal = ({ destination }: { destination: Destination }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">3D Preview: {destination.name}</h3>
          <button 
            onClick={() => setShow3DPreview(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          {/* 3D Preview Placeholder */}
          <div className="relative bg-gradient-to-br from-eco-green-100 to-cultural-orange-100 rounded-2xl h-96 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Camera className="w-12 h-12 text-eco-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">3D Experience</h4>
              <p className="text-gray-600 max-w-md">
                Immersive 3D view of {destination.name} with 360° panoramic experience. 
                Explore every corner before your visit!
              </p>
              <div className="mt-6 space-y-2">
                <div className="bg-white/50 rounded-lg p-3 text-left">
                  <strong>🎥 Virtual Tour:</strong> Navigate through scenic viewpoints
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-left">
                  <strong>📱 AR Ready:</strong> Point your phone to see live overlays
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-left">
                  <strong>🗺️ Interactive:</strong> Click hotspots for detailed information
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-bold text-gray-900 mb-3">Key Features</h5>
              <ul className="space-y-2">
                {destination.activities.map((activity, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Compass className="w-4 h-4 mr-2 text-eco-green-500" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-3">Visitor Info</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Best Time to Visit:</span>
                  <span className="font-medium">Oct - Mar</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eco-Score:</span>
                  <div className={`px-2 py-1 rounded-full text-sm font-medium ${getEcoScoreColor(destination.ecoScore)}`}>
                    {destination.ecoScore}/100
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Duration:</span>
                  <span className="font-medium">4-6 hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="flex-1 bg-eco-green-500 hover:bg-eco-green-600 text-white py-3 rounded-xl font-semibold transition-colors">
              Add to Itinerary
            </button>
            <button className="flex-1 bg-cultural-orange-500 hover:bg-cultural-orange-600 text-white py-3 rounded-xl font-semibold transition-colors">
              Book Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-earth-brown-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-eco-green-600 hover:text-eco-green-700 font-medium"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Home
          </button>
          <div className="flex items-center space-x-2">
            <MapIcon className="w-6 h-6 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Interactive Map</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Map Header */}
              <div className="p-6 border-b bg-gradient-to-r from-eco-green-50 to-cultural-orange-50">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Jharkhand</h2>
                <p className="text-gray-600">Click on any destination to learn more and view in 3D</p>
              </div>

              {/* Map Container */}
              <div className="relative h-[600px] bg-gradient-to-br from-green-100 via-blue-50 to-brown-100">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-eco-green-100 to-earth-brown-100 opacity-50"></div>
                
                {/* Destination Markers */}
                {destinations.map((destination, index) => {
                  const IconComponent = getDestinationIcon(destination.type);
                  const colorClass = getTypeColor(destination.type);
                  
                  // Simulate map positions
                  const positions = [
                    { top: '20%', left: '30%' }, // Netarhat
                    { top: '40%', left: '25%' }, // Betla
                    { top: '60%', left: '70%' }, // Rajrappa
                    { top: '70%', left: '60%' }, // Ranchi Lake
                    { top: '65%', left: '65%' }, // Tribal Museum
                    { top: '80%', left: '75%' }  // Hundru Falls
                  ];

                  return (
                    <button
                      key={destination.id}
                      onClick={() => setSelectedDestination(destination)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${colorClass} text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 z-10`}
                      style={{ 
                        top: positions[index]?.top || '50%', 
                        left: positions[index]?.left || '50%' 
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </button>
                  );
                })}

                {/* Map Labels */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span>Adventure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Natural</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span>Cultural</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Spiritual</span>
                    </div>
                  </div>
                </div>

                {/* Map Info */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold text-gray-900">Jharkhand Tourism</div>
                    <div>6 Featured Destinations</div>
                    <div>Interactive 3D Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destination Info Panel */}
          <div className="space-y-6">
            {/* Destination List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Featured Destinations</h3>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {destinations.map((destination) => {
                  const IconComponent = getDestinationIcon(destination.type);
                  const colorClass = getTypeColor(destination.type);
                  
                  return (
                    <button
                      key={destination.id}
                      onClick={() => setSelectedDestination(destination)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedDestination?.id === destination.id
                          ? 'border-eco-green-500 bg-eco-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${colorClass.replace('border-', 'bg-').replace('500', '100')} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                          <p className="text-sm text-gray-600 capitalize mb-2">{destination.type} • {destination.activities.length} activities</p>
                          <div className="flex items-center justify-between">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(destination.ecoScore)}`}>
                              Eco: {destination.ecoScore}/100
                            </div>
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Destination Details */}
            {selectedDestination && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{selectedDestination.name}</h3>
                    <p className="text-sm opacity-90 capitalize">{selectedDestination.type} destination</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEcoScoreColor(selectedDestination.ecoScore)}`}>
                      {selectedDestination.ecoScore}/100
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-4">{selectedDestination.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">Activities</h4>
                    <div className="space-y-2">
                      {selectedDestination.activities.map((activity, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <Compass className="w-4 h-4 mr-2 text-eco-green-500" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setShow3DPreview(true)}
                      className="w-full bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View in 3D</span>
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-eco-green-500 hover:bg-eco-green-600 text-white py-2 rounded-xl font-medium transition-colors">
                        Add to Trip
                      </button>
                      <button className="bg-cultural-orange-500 hover:bg-cultural-orange-600 text-white py-2 rounded-xl font-medium transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Preview Modal */}
      {show3DPreview && selectedDestination && (
        <ThreeDPreviewModal destination={selectedDestination} />
      )}
    </div>
  );
};

export default InteractiveMap;
