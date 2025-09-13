import React, { useState } from 'react';
import { 
  Award, 
  ArrowRight, 
  Trophy, 
  Star, 
  Sparkles
} from 'lucide-react';
import { Badge, Tourist } from '../types';
import { currentTourist, badges } from '../data/mockData';

interface EcoGamificationProps {
  onBack: () => void;
}

const EcoGamification: React.FC<EcoGamificationProps> = ({ onBack }) => {
  const [tourist, setTourist] = useState<Tourist>(currentTourist);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  const achievements = [
    {
      id: 'eco_warrior',
      name: 'Eco Warrior',
      description: 'Earn 1000+ eco points',
      icon: '🌱',
      progress: tourist.totalPoints,
      target: 1000,
      points: 100,
      completed: tourist.totalPoints >= 1000
    },
    {
      id: 'local_supporter',
      name: 'Local Supporter',
      description: 'Purchase 10+ local handicrafts',
      icon: '🤝',
      progress: 8,
      target: 10,
      points: 50,
      completed: false
    },
    {
      id: 'culture_explorer',
      name: 'Culture Explorer',
      description: 'Visit 5+ cultural sites',
      icon: '🏛️',
      progress: 5,
      target: 5,
      points: 75,
      completed: true
    },
    {
      id: 'nature_lover',
      name: 'Nature Lover',
      description: 'Complete 3+ eco tours',
      icon: '🦋',
      progress: 3,
      target: 3,
      points: 60,
      completed: true
    },
    {
      id: 'sustainable_traveler',
      name: 'Sustainable Traveler',
      description: 'Choose eco-friendly options 90% of the time',
      icon: '♻️',
      progress: 85,
      target: 90,
      points: 120,
      completed: false
    },
    {
      id: 'community_hero',
      name: 'Community Hero',
      description: 'Support 5+ local businesses',
      icon: '🏆',
      progress: 7,
      target: 5,
      points: 80,
      completed: true
    }
  ];

  const recentActivities = [
    { action: 'Purchased tribal basket', points: 20, time: '2 hours ago', icon: '🎨' },
    { action: 'Completed nature walk', points: 15, time: '1 day ago', icon: '🌿' },
    { action: 'Stayed at eco-homestay', points: 25, time: '2 days ago', icon: '🏡' },
    { action: 'Visited Tribal Museum', points: 18, time: '3 days ago', icon: '🏛️' },
    { action: 'Booked verified guide', points: 12, time: '4 days ago', icon: '👤' }
  ];

  const leaderboard = [
    { rank: 1, name: 'EcoExplorer23', points: 2340, badge: '🏆' },
    { rank: 2, name: 'NatureLover', points: 2180, badge: '🥈' },
    { rank: 3, name: 'GreenTraveler', points: 1950, badge: '🥉' },
    { rank: 4, name: 'Tourist Explorer', points: tourist.totalPoints, badge: '🌟' },
    { rank: 5, name: 'CultureSeeker', points: 1150, badge: '🎭' }
  ];

  const simulateEcoAction = (actionType: string) => {
    let pointsEarned = 0;

    switch (actionType) {
      case 'homestay':
        pointsEarned = 25;
        break;
      case 'handicraft':
        pointsEarned = 20;
        break;
      case 'guide':
        pointsEarned = 15;
        break;
      case 'transport':
        pointsEarned = 30;
        break;
      default:
        return;
    }

    const newTotalPoints = tourist.totalPoints + pointsEarned;
    setTourist(prev => ({ ...prev, totalPoints: newTotalPoints }));

    // Check for new badge
    if (newTotalPoints >= 1000 && tourist.totalPoints < 1000) {
      const ecoBadge = badges.find(b => b.name === 'Eco Warrior');
      if (ecoBadge && !tourist.badges.find(b => b.id === ecoBadge.id)) {
        setNewBadge(ecoBadge);
        setShowBadgeAnimation(true);
        setTourist(prev => ({ 
          ...prev, 
          badges: [...prev.badges, ecoBadge],
          totalPoints: newTotalPoints 
        }));
      }
    }

    // Show points animation
    const pointsEl = document.createElement('div');
    pointsEl.textContent = `+${pointsEarned} eco-points`;
    pointsEl.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-eco-green-500 text-white px-6 py-3 rounded-full font-bold text-lg z-50 animate-bounce';
    document.body.appendChild(pointsEl);
    
    setTimeout(() => {
      if (document.body.contains(pointsEl)) {
        document.body.removeChild(pointsEl);
      }
    }, 2000);
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const BadgeAnimationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-eco-green-400 to-cultural-orange-400 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
            <span className="text-4xl">{newBadge?.icon}</span>
          </div>
          <div className="absolute -top-2 -right-2 w-full h-full">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">New Badge Earned!</h3>
        <h4 className="text-xl font-semibold text-eco-green-600 mb-3">{newBadge?.name}</h4>
        <p className="text-gray-600 mb-6">{newBadge?.description}</p>
        <button
          onClick={() => setShowBadgeAnimation(false)}
          className="bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Awesome!
        </button>
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
            <Award className="w-6 h-6 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Eco-Score & Rewards</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Overview */}
            <div className="bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-2xl shadow-lg p-8 text-white">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{tourist.ecoScore}</div>
                  <div className="text-lg opacity-90">Eco-Score</div>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{tourist.totalPoints}</div>
                  <div className="text-lg opacity-90">Total Points</div>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{tourist.badges.length}</div>
                  <div className="text-lg opacity-90">Badges Earned</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
                <p className="text-gray-600">Complete challenges to earn badges and points</p>
              </div>
              <div className="p-6 space-y-4">
                {achievements.map((achievement) => {
                  const progressPercentage = Math.min((achievement.progress / achievement.target) * 100, 100);
                  
                  return (
                    <div key={achievement.id} className={`p-4 rounded-xl border-2 ${
                      achievement.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-eco-green-600 font-semibold">+{achievement.points} pts</div>
                          {achievement.completed && (
                            <div className="text-green-600 text-sm font-medium">✓ Completed</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {achievement.progress} / {achievement.target}
                        </span>
                        <span className="text-sm text-gray-600">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(achievement.progress, achievement.target)}`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulate Eco Actions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Earn Eco-Points</h2>
                <p className="text-gray-600">Try these sustainable actions to see points in action!</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => simulateEcoAction('homestay')}
                    className="bg-eco-green-500 hover:bg-eco-green-600 text-white p-4 rounded-xl font-semibold transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">🏡</div>
                    <div className="text-sm">Eco Homestay</div>
                    <div className="text-xs opacity-80">+25 pts</div>
                  </button>
                  <button
                    onClick={() => simulateEcoAction('handicraft')}
                    className="bg-cultural-orange-500 hover:bg-cultural-orange-600 text-white p-4 rounded-xl font-semibold transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="text-sm">Local Craft</div>
                    <div className="text-xs opacity-80">+20 pts</div>
                  </button>
                  <button
                    onClick={() => simulateEcoAction('guide')}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl font-semibold transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">👤</div>
                    <div className="text-sm">Verified Guide</div>
                    <div className="text-xs opacity-80">+15 pts</div>
                  </button>
                  <button
                    onClick={() => simulateEcoAction('transport')}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-semibold transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">🚲</div>
                    <div className="text-sm">Green Transport</div>
                    <div className="text-xs opacity-80">+30 pts</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Badges */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Your Badges</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {tourist.badges.map((badge) => (
                    <div key={badge.id} className="text-center p-4 border border-gray-200 rounded-xl hover:border-eco-green-300 transition-colors">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="font-semibold text-sm text-gray-900">{badge.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-eco-green-100 rounded-full flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                      <div className="text-xs text-gray-600">{activity.time}</div>
                    </div>
                    <div className="text-eco-green-600 font-semibold text-sm">
                      +{activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Leaderboard</h3>
              </div>
              <div className="p-6 space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-3 rounded-xl ${
                    user.name === 'Tourist Explorer' ? 'bg-eco-green-50 border-2 border-eco-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.rank}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.points} points</div>
                      </div>
                    </div>
                    <div className="text-2xl">{user.badge}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Animation Modal */}
      {showBadgeAnimation && <BadgeAnimationModal />}
    </div>
  );
};

export default EcoGamification;
