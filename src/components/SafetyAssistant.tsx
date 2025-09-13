import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ArrowRight, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  Users,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { WeatherAlert, CrowdAlert } from '../types';
import { weatherAlerts, crowdAlerts } from '../data/mockData';

interface SafetyAssistantProps {
  onBack: () => void;
}

const SafetyAssistant: React.FC<SafetyAssistantProps> = ({ onBack }) => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [emergencyContacted, setEmergencyContacted] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('Ranchi, Jharkhand');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6
  });

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: '👮‍♂️' },
    { name: 'Medical Emergency', number: '108', icon: '🚑' },
    { name: 'Fire Brigade', number: '101', icon: '🚒' },
    { name: 'Tourist Helpline', number: '1363', icon: '🏛️' },
    { name: 'Women Helpline', number: '1091', icon: '👩‍⚕️' },
    { name: 'Child Helpline', number: '1098', icon: '👶' }
  ];

  const safetyTips = [
    {
      icon: '🎒',
      title: 'Pack Smart',
      description: 'Carry first aid kit, sufficient water, and emergency contacts'
    },
    {
      icon: '📱',
      title: 'Stay Connected',
      description: 'Keep your phone charged and share your location with family'
    },
    {
      icon: '👥',
      title: 'Travel in Groups',
      description: 'Avoid traveling alone, especially in remote areas'
    },
    {
      icon: '🌅',
      title: 'Time Your Visits',
      description: 'Visit popular destinations during daylight hours'
    },
    {
      icon: '🏥',
      title: 'Know Medical Facilities',
      description: 'Locate nearest hospitals and clinics before exploring'
    },
    {
      icon: '🗺️',
      title: 'Share Itinerary',
      description: 'Always inform someone about your travel plans'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'severe': return <XCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'severe': return 'bg-red-100 border-red-300 text-red-800';
      case 'info': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const getCrowdLevelColor = (level: CrowdAlert['crowdLevel']) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SOSModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        <div className="bg-red-600 text-white p-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Emergency SOS</h2>
          <p className="text-red-100 mt-2">Help is on the way</p>
        </div>
        
        <div className="p-6">
          {!emergencyContacted ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-700 mb-4">Choose emergency service:</p>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyContacts.slice(0, 4).map((contact) => (
                    <button
                      key={contact.number}
                      onClick={() => {
                        setEmergencyContacted(true);
                        // In real app, this would initiate actual call
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-semibold transition-colors text-center"
                    >
                      <div className="text-2xl mb-1">{contact.icon}</div>
                      <div className="text-sm">{contact.name}</div>
                      <div className="text-xs opacity-80">{contact.number}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Current Location: {userLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Time: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Help Contacted!</h3>
                <p className="text-gray-600">
                  Emergency services have been notified of your location. 
                  Help is on the way. Stay calm and in a safe place.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-left">
                <div className="text-sm text-green-800 space-y-1">
                  <div>✓ Location shared with emergency services</div>
                  <div>✓ Emergency contact notified</div>
                  <div>✓ Tourist helpline activated</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t">
          <button
            onClick={() => {
              setShowSOSModal(false);
              setEmergencyContacted(false);
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
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
            <Shield className="w-6 h-6 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Safety Assistant</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency SOS */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-4">Emergency SOS</h2>
                <p className="text-red-100 mb-6">
                  In case of emergency, press the button below to get immediate help
                </p>
                <button
                  onClick={() => setShowSOSModal(true)}
                  className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🚨 EMERGENCY SOS
                </button>
                <p className="text-sm text-red-100 mt-4 opacity-80">
                  Your location will be shared with emergency services
                </p>
              </div>
            </div>

            {/* Weather Alerts */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Weather & Alerts</h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{userLocation}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Current Weather */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <Cloud className="w-12 h-12 text-blue-600" />
                        <div>
                          <div className="text-3xl font-bold text-gray-900">{currentWeather.temperature}°C</div>
                          <div className="text-gray-600">{currentWeather.condition}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <Thermometer className="w-4 h-4 mr-2" />
                          Humidity
                        </span>
                        <span className="font-semibold">{currentWeather.humidity}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <Wind className="w-4 h-4 mr-2" />
                          Wind Speed
                        </span>
                        <span className="font-semibold">{currentWeather.windSpeed} km/h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <Eye className="w-4 h-4 mr-2" />
                          UV Index
                        </span>
                        <span className="font-semibold">{currentWeather.uvIndex}/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Alerts */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                  {weatherAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-xl border-2 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{alert.message}</div>
                          <div className="text-sm opacity-80 mt-1">
                            {alert.location} • {alert.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Crowd Alerts */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Crowd Status</h2>
                <p className="text-gray-600">Real-time crowd levels at popular destinations</p>
              </div>
              
              <div className="p-6 space-y-4">
                {crowdAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-semibold text-gray-900">{alert.location}</div>
                        <div className="text-sm text-gray-600">{alert.message}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCrowdLevelColor(alert.crowdLevel)}`}>
                        {alert.crowdLevel.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
              </div>
              <div className="p-6 space-y-3">
                {emergencyContacts.map((contact) => (
                  <div key={contact.number} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-lg">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-600">Emergency Service</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">{contact.number}</div>
                      <button className="text-xs text-red-500 hover:text-red-700">
                        <Phone className="w-3 h-3 inline mr-1" />
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Safety Tips</h3>
              </div>
              <div className="p-6 space-y-4">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-eco-green-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tip.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{tip.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Share My Location</span>
                </button>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Tourist Helpline</span>
                </button>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Modal */}
      {showSOSModal && <SOSModal />}
    </div>
  );
};

export default SafetyAssistant;
