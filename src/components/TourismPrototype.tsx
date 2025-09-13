import React, { useState } from 'react';
import { MapPin, Camera, Mountain, Compass, Heart, Palette } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
}

const destinations = {
  adventure: [
    {
      id: '1',
      name: 'Hundru Falls',
      description: 'Spectacular 320-feet waterfall perfect for adventure sports and photography',
      location: 'Ranchi'
    },
    {
      id: '2',
      name: 'Dassam Falls',
      description: 'Multi-tiered waterfall with natural pools for swimming and adventure',
      location: 'Ranchi'
    },
    {
      id: '3',
      name: 'Jonha Falls',
      description: 'Hidden gem waterfall with pristine natural pools and cliff jumping spots',
      location: 'Ranchi'
    },
    {
      id: '4',
      name: 'Netarhat Hills',
      description: 'Queen of Chotanagpur - hill station famous for sunrise and sunset views',
      location: 'Latehar'
    },
    {
      id: '5',
      name: 'Betla National Park',
      description: 'Tiger reserve with diverse wildlife and thrilling jungle safaris',
      location: 'Palamu'
    },
    {
      id: '6',
      name: 'Lodh Falls',
      description: 'Highest waterfall in Jharkhand at 468 feet, paradise for adventure seekers',
      location: 'Latehar'
    },
    {
      id: '7',
      name: 'Usri Falls',
      description: 'Beautiful stepped waterfall with multiple tiers and adventure opportunities',
      location: 'Giridih'
    }
  ],
  spiritual: [
    {
      id: '8',
      name: 'Jagannath Temple',
      description: 'Replica of famous Puri Jagannath Temple with divine architecture',
      location: 'Ranchi'
    },
    {
      id: '9',
      name: 'Baidyanath Dham',
      description: 'One of the 12 sacred Jyotirlingas, major pilgrimage destination',
      location: 'Deoghar'
    },
    {
      id: '10',
      name: 'Parasnath Hill',
      description: 'Sacred Jain pilgrimage site with ancient marble temples on highest peak',
      location: 'Giridih'
    },
    {
      id: '11',
      name: 'Rajrappa Temple',
      description: 'Chhinnamasta Shakti Peeth temple at the confluence of rivers',
      location: 'Ramgarh'
    },
    {
      id: '12',
      name: 'Maa Dewri Temple',
      description: 'Ancient Durga temple with mystical significance and divine energy',
      location: 'Ranchi'
    },
    {
      id: '13',
      name: 'Sun Temple',
      description: 'Beautiful temple dedicated to Sun God with chariot-inspired architecture',
      location: 'Ranchi'
    },
    {
      id: '14',
      name: 'Maluti Temples',
      description: 'Historic complex of 108 terracotta temples with exquisite craftsmanship',
      location: 'Dumka'
    }
  ],
  relax: [
    {
      id: '15',
      name: 'Patratu Valley',
      description: 'Scenic valley with winding roads and breathtaking mountain views',
      location: 'Ramgarh'
    },
    {
      id: '16',
      name: 'Dimna Lake',
      description: 'Artificial lake surrounded by hills, perfect for boating and relaxation',
      location: 'Jamshedpur'
    },
    {
      id: '17',
      name: 'Topchanchi Lake',
      description: 'Serene lake with crystal clear waters surrounded by lush greenery',
      location: 'Dhanbad'
    },
    {
      id: '18',
      name: 'McCluskieganj',
      description: 'Anglo-Indian settlement with colonial houses and beautiful gardens',
      location: 'Ranchi'
    },
    {
      id: '19',
      name: 'Kanke Dam',
      description: 'Peaceful dam with calm waters and scenic surroundings for relaxation',
      location: 'Ranchi'
    },
    {
      id: '20',
      name: 'Tagore Hill',
      description: 'Historic hill where Rabindranath Tagore found inspiration for his works',
      location: 'Ranchi'
    },
    {
      id: '21',
      name: 'Khandoli Park & Lake',
      description: 'Beautiful park with lake and hills offering tranquil environment',
      location: 'Giridih'
    }
  ],
  cultural: [
    {
      id: '22',
      name: 'Chhau Dance',
      description: 'UNESCO recognized classical dance form with elaborate masks and costumes',
      location: 'Saraikela'
    },
    {
      id: '23',
      name: 'Santhali Tribal Dance',
      description: 'Traditional tribal dance showcasing rich Santhali culture and heritage',
      location: 'Santhal Parganas'
    },
    {
      id: '24',
      name: 'Paitkar Painting',
      description: 'Traditional scroll paintings depicting tribal folklore and mythology',
      location: 'East Singhbhum'
    },
    {
      id: '25',
      name: 'Hazaribagh Rock Paintings',
      description: 'Ancient rock art depicting prehistoric life and cultural evolution',
      location: 'Hazaribagh'
    },
    {
      id: '26',
      name: 'Jamshedpur Tata Steel Heritage',
      description: 'Industrial heritage site showcasing steel city development and history',
      location: 'Jamshedpur'
    },
    {
      id: '27',
      name: 'Ranchi Museum',
      description: 'State museum showcasing tribal culture, archaeology and natural history',
      location: 'Ranchi'
    },
    {
      id: '28',
      name: 'Hotwar State Museum',
      description: 'Comprehensive museum displaying rich heritage and cultural artifacts',
      location: 'Ranchi'
    }
  ]
};

const travelModes = [
  {
    id: 'adventure',
    name: 'Adventure Explorer',
    icon: Mountain,
    color: 'bg-red-500',
    description: 'Thrilling experiences and outdoor adventures'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Journey',
    icon: Heart,
    color: 'bg-purple-500',
    description: 'Sacred temples and pilgrimage sites'
  },
  {
    id: 'relax',
    name: 'Relax & Unwind',
    icon: Compass,
    color: 'bg-green-500',
    description: 'Peaceful retreats and scenic beauty'
  },
  {
    id: 'cultural',
    name: 'Cultural Explorer',
    icon: Palette,
    color: 'bg-blue-500',
    description: 'Heritage sites and traditional arts'
  }
];

const TourismPrototype: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('adventure');

  const PlaceholderImage: React.FC<{ destinationName: string }> = ({ destinationName }) => (
    <div className="w-full h-48 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg">
      <div className="text-center p-4">
        <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
        <p className="text-gray-600 font-medium text-sm">
          Insert {destinationName} Image Here
        </p>
      </div>
    </div>
  );

  const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left side - Destination Info */}
        <div className="p-6 flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">{destination.location}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {destination.name}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {destination.description}
          </p>
        </div>
        
        {/* Right side - Placeholder Image */}
        <div className="p-6">
          <PlaceholderImage destinationName={destination.name} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Smart Digital Tourism Platform
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Jharkhand - The Land of Forests & Minerals
          </p>
        </div>
      </div>

      {/* Travel Mode Selector */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {travelModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  selectedMode === mode.id
                    ? `${mode.color} text-white shadow-lg transform scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{mode.name}</h3>
                <p className={`text-sm ${
                  selectedMode === mode.id ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {mode.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Mode Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {travelModes.find(mode => mode.id === selectedMode)?.name}
          </h2>
          <p className="text-gray-600">
            Discover 7 amazing destinations in Jharkhand
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="space-y-6">
          {destinations[selectedMode as keyof typeof destinations].map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg mb-2">Smart Digital Tourism Platform</p>
          <p className="text-gray-400">Explore the Beauty of Jharkhand</p>
        </div>
      </div>
    </div>
  );
};

export default TourismPrototype;
