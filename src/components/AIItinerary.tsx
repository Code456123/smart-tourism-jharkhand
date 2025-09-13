import React, { useState } from 'react';
import { 
  Brain, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Award, 
  ArrowRight, 
  Sparkles,
  Heart,
  Compass,
  Home
} from 'lucide-react';
import { Mood, Itinerary, ItineraryDay } from '../types';
import { destinations, marketplaceItems } from '../data/mockData';

interface AIItineraryProps {
  onBack: () => void;
}

const AIItinerary: React.FC<AIItineraryProps> = ({ onBack }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [budget, setBudget] = useState<number>(10000);
  const [days, setDays] = useState<number>(3);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    { 
      id: 'relax' as Mood, 
      name: 'Relax & Unwind', 
      icon: '🧘‍♀️', 
      color: 'bg-blue-500', 
      description: 'Peaceful lakes, serene views, wellness' 
    },
    { 
      id: 'adventure' as Mood, 
      name: 'Adventure Seeker', 
      icon: '🏔️', 
      color: 'bg-orange-500', 
      description: 'Trekking, safari, thrilling activities' 
    },
    { 
      id: 'spiritual' as Mood, 
      name: 'Spiritual Journey', 
      icon: '🕉️', 
      color: 'bg-purple-500', 
      description: 'Temples, meditation, inner peace' 
    },
    { 
      id: 'cultural' as Mood, 
      name: 'Cultural Explorer', 
      icon: '🎭', 
      color: 'bg-pink-500', 
      description: 'Museums, tribal art, local traditions' 
    }
  ];

  const generateItinerary = async () => {
    if (!selectedMood) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter destinations based on mood with priority for exact type match
    let moodDestinations = destinations.filter(dest => 
      dest.bestForMood.includes(selectedMood)
    );
    
    // For cultural mood, prioritize destinations with type 'cultural'
    if (selectedMood === 'cultural') {
      const culturalTypeDestinations = moodDestinations.filter(dest => dest.type === 'cultural');
      const otherDestinations = moodDestinations.filter(dest => dest.type !== 'cultural');
      moodDestinations = [...culturalTypeDestinations, ...otherDestinations];
    }
    
    // Generate itinerary based on budget and days
    const budgetPerDay = budget / days;
    const itineraryDays: ItineraryDay[] = [];
    let totalCost = 0;
    let totalEcoScore = 0;
    
    for (let i = 0; i < days; i++) {
      const destination = moodDestinations[i % moodDestinations.length];
      const accommodation = marketplaceItems.find(item => 
        item.type === 'homestay' && item.price <= budgetPerDay * 0.6
      );
      
      const dayCost = (accommodation?.price || 0) + (budgetPerDay * 0.4);
      totalCost += dayCost;
      totalEcoScore += destination.ecoScore;
      
      let reasoning = '';
      switch (selectedMood) {
        case 'adventure':
          reasoning = `Perfect for adventure lovers! ${destination.name} offers thrilling ${destination.activities.join(', ')}. Budget-friendly yet exciting.`;
          break;
        case 'relax':
          reasoning = `Ideal for relaxation. ${destination.name} provides peaceful environment for unwinding with ${destination.activities.join(', ')}.`;
          break;
        case 'spiritual':
          reasoning = `Spiritually enriching destination. ${destination.name} offers sacred experiences and inner peace through ${destination.activities.join(', ')}.`;
          break;
        case 'cultural':
          reasoning = `Rich cultural immersion at ${destination.name}. Experience authentic Jharkhand through ${destination.activities.join(', ')}.`;
          break;
      }
      
      itineraryDays.push({
        day: i + 1,
        destination,
        activities: destination.activities,
        accommodation,
        ecoPoints: Math.floor(destination.ecoScore * 0.5),
        reasoning
      });
    }
    
    const itinerary: Itinerary = {
      id: Date.now().toString(),
      mood: selectedMood,
      budget,
      days,
      totalEcoScore: Math.floor(totalEcoScore / days),
      days_plan: itineraryDays,
      totalCost: Math.floor(totalCost)
    };
    
    setGeneratedItinerary(itinerary);
    setIsGenerating(false);
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-earth-brown-50 p-4">
      <div className="max-w-6xl mx-auto">
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
            <Brain className="w-6 h-6 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Trip Planner</h1>
          </div>
        </div>

        {!generatedItinerary ? (
          <div className="space-y-8">
            {/* Mood Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-pink-500" />
                What's your travel mood?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedMood === mood.id
                        ? 'border-eco-green-500 bg-eco-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-eco-green-300'
                    }`}
                  >
                    <div className="text-4xl mb-3">{mood.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{mood.name}</h3>
                    <p className="text-sm text-gray-600">{mood.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget and Days */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                  Budget (INR)
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-eco-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹5,000</span>
                    <span className="font-semibold text-eco-green-600">₹{budget.toLocaleString()}</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  Duration (Days)
                </h3>
                <div className="flex space-x-3">
                  {[2, 3, 4, 5, 7].map((day) => (
                    <button
                      key={day}
                      onClick={() => setDays(day)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        days === day
                          ? 'bg-eco-green-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day} Days
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateItinerary}
                disabled={!selectedMood || isGenerating}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center mx-auto space-x-3 ${
                  !selectedMood || isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 text-white hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>AI is crafting your perfect trip...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Generate My Perfect Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Generated Itinerary */
          <div className="space-y-6">
            {/* Itinerary Header */}
            <div className="bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Perfect {selectedMood} Journey</h2>
                  <p className="text-lg opacity-90">{days} days of unforgettable experiences</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{generatedItinerary.totalCost.toLocaleString()}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Award className="w-5 h-5" />
                    <span>Eco-Score: {generatedItinerary.totalEcoScore}/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              {generatedItinerary.days_plan.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-eco-green-100 to-cultural-orange-100 p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">Day {day.day}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEcoScoreColor(day.destination.ecoScore)}`}>
                        Eco-Score: {day.destination.ecoScore}/100
                      </div>
                    </div>
                    <p className="text-eco-green-700 mt-2 font-medium">{day.reasoning}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <img
                            src={day.destination.image}
                            alt={day.destination.name}
                            className="w-16 h-16 rounded-xl object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80';
                            }}
                          />
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{day.destination.name}</h4>
                            <p className="text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {day.destination.type} destination
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900">Activities:</h5>
                          <ul className="space-y-2">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <Compass className="w-4 h-4 mr-2 text-eco-green-500" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {day.accommodation && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Home className="w-5 h-5 mr-2" />
                            Accommodation
                          </h5>
                          <div className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <img
                                src={day.accommodation.image}
                                alt={day.accommodation.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
                                }}
                              />
                              <div>
                                <h6 className="font-semibold text-gray-900">{day.accommodation.name}</h6>
                                <p className="text-sm text-gray-600">₹{day.accommodation.price}/night</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(day.accommodation.ecoScore)}`}>
                                Eco: {day.accommodation.ecoScore}/100
                              </div>
                              <div className="flex items-center text-yellow-500">
                                <span className="text-sm">⭐ {day.accommodation.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-eco-green-600">
                          <Award className="w-5 h-5 mr-2" />
                          <span className="font-semibold">+{day.ecoPoints} Eco-Points</span>
                        </div>
                      </div>
                      <button className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                        View in 3D
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center pt-8">
              <button
                onClick={() => setGeneratedItinerary(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Generate New Plan
              </button>
              <button className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Book This Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIItinerary;
