/**
 * Smart Tourism Jharkhand - Mock Data
 * Comprehensive tourism data for the Smart India Hackathon project
 */

import { 
  Destination, 
  MarketplaceItem, 
  TourGuide, 
  Badge, 
  Tourist, 
  WeatherAlert, 
  CrowdAlert, 
  TouristData 
} from '../types';

// ====================================================================
// DESTINATION DATA - 28 Tourism Destinations (7 per category)
// ====================================================================

export const destinations: Destination[] = [
  // Adventure Explorer (7)
  {
    id: '1',
    name: 'Hundru Falls',
    location: { lat: 23.4259, lng: 85.5934 },
    ecoScore: 95,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    description: 'Spectacular 320-feet waterfall, perfect for adventure sports and photography',
    activities: ['Waterfall viewing', 'Rock climbing', 'Photography', 'Trekking'],
    bestForMood: ['adventure', 'relax']
  },
  {
    id: '2',
    name: 'Dassam Falls',
    location: { lat: 23.3991, lng: 85.5304 },
    ecoScore: 92,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
    description: 'Multi-tiered waterfall with natural pools for swimming and adventure',
    activities: ['Swimming', 'Waterfall trekking', 'Camping', 'Adventure photography'],
    bestForMood: ['adventure', 'relax']
  },
  {
    id: '3',
    name: 'Jonha Falls',
    location: { lat: 23.3065, lng: 85.4470 },
    ecoScore: 90,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
    description: 'Hidden gem waterfall with pristine natural pools and cliff jumping spots',
    activities: ['Cliff jumping', 'Natural pool swimming', 'Waterfall rappelling', 'Nature walks'],
    bestForMood: ['adventure', 'relax']
  },
  {
    id: '4',
    name: 'Netarhat Hills',
    location: { lat: 23.4697, lng: 84.2541 },
    ecoScore: 88,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    description: 'Queen of Chotanagpur - hill station famous for sunrise and sunset views',
    activities: ['Sunrise viewing', 'Trekking', 'Nature photography', 'Hill station exploration'],
    bestForMood: ['adventure', 'relax']
  },
  {
    id: '5',
    name: 'Betla National Park',
    location: { lat: 23.8500, lng: 84.1833 },
    ecoScore: 93,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400',
    description: 'Tiger reserve with diverse wildlife and thrilling jungle safaris',
    activities: ['Tiger safari', 'Wildlife photography', 'Jungle camping', 'Bird watching'],
    bestForMood: ['adventure']
  },
  {
    id: '6',
    name: 'Lodh Falls',
    location: { lat: 23.4833, lng: 84.6167 },
    ecoScore: 94,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    description: 'Highest waterfall in Jharkhand at 468 feet, a paradise for adventure seekers',
    activities: ['Waterfall viewing', 'Rock climbing', 'Adventure trekking', 'Photography'],
    bestForMood: ['adventure']
  },
  {
    id: '7',
    name: 'Usri Falls',
    location: { lat: 24.1833, lng: 86.2500 },
    ecoScore: 89,
    type: 'adventure',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?w=400',
    description: 'Beautiful stepped waterfall with multiple tiers and adventure opportunities',
    activities: ['Waterfall trekking', 'Swimming', 'Rock climbing', 'Nature photography'],
    bestForMood: ['adventure', 'relax']
  },

  // Spiritual Journey (7)
  {
    id: '8',
    name: 'Jagannath Temple',
    location: { lat: 23.3441, lng: 85.3096 },
    ecoScore: 85,
    type: 'spiritual',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    description: 'Replica of famous Puri Jagannath Temple with divine architecture',
    activities: ['Temple darshan', 'Aarti ceremony', 'Religious festivals', 'Spiritual meditation'],
    bestForMood: ['spiritual', 'cultural']
  },
  {
    id: '9',
    name: 'Baidyanath Dham',
    location: { lat: 24.4869, lng: 86.7036 },
    ecoScore: 95,
    type: 'spiritual',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
    description: 'One of the 12 sacred Jyotirlingas, major pilgrimage destination',
    activities: ['Temple visits', 'Spiritual discourse', 'Pilgrimage', 'Religious ceremonies'],
    bestForMood: ['spiritual', 'cultural']
  },
  {
    id: '10',
    name: 'Parasnath Hill',
    location: { lat: 23.9667, lng: 86.1667 },
    ecoScore: 92,
    type: 'spiritual',
    image: 'https://images.unsplash.com/photo-1580152040915-ad4c4b3ee9a4?w=400',
    description: 'Sacred Jain pilgrimage site with ancient marble temples on highest peak',
    activities: ['Jain temple pilgrimage', 'Spiritual trekking', 'Meditation', 'Religious study'],
    bestForMood: ['spiritual', 'adventure']
  },
  {
    id: '11',
    name: 'Rajrappa Temple',
    location: { lat: 23.6167, lng: 85.6667 },
    ecoScore: 88,
    type: 'spiritual',
    image: 'https://unsplash.com/photos/a-very-tall-building-with-a-lot-of-decorations-on-top-of-it-Q3BSCbxQ7tw?w=400',
    description: 'Chhinnamasta Shakti Peeth temple at the confluence of rivers',
    activities: ['Goddess worship', 'River bathing', 'Spiritual meditation', 'Religious rituals'],
    bestForMood: ['spiritual']
  },
  {
    id: '12',
    name: 'Maa Dewri Temple',
    location: { lat: 23.3500, lng: 85.3200 },
    ecoScore: 87,
    type: 'spiritual',
    image: 'https://unsplash.com/photos/a-stone-building-with-a-doorway-and-a-doorway-in-the-middle-15CyHA3FwY8?w=400&q=80',
    description: 'Ancient Durga temple with mystical significance and divine energy',
    activities: ['Durga worship', 'Spiritual ceremonies', 'Religious festivals', 'Meditation'],
    bestForMood: ['spiritual', 'cultural']
  },
  {
    id: '13',
    name: 'Sun Temple',
    location: { lat: 23.3600, lng: 85.3300 },
    ecoScore: 86,
    type: 'spiritual',
    image: 'https://images.unsplash.com/photo-1586421267944-7b92ad3c2c59?w=400',
    description: 'Beautiful temple dedicated to Sun God with chariot-inspired architecture',
    activities: ['Sun worship', 'Temple architecture viewing', 'Spiritual meditation', 'Photography'],
    bestForMood: ['spiritual', 'cultural']
  },
  {
    id: '14',
    name: 'Maluti Temples',
    location: { lat: 24.9667, lng: 87.3167 },
    ecoScore: 90,
    type: 'spiritual',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Historic complex of 108 terracotta temples with exquisite craftsmanship',
    activities: ['Heritage temple tour', 'Terracotta art viewing', 'Cultural learning', 'Photography'],
    bestForMood: ['spiritual', 'cultural']
  },

  // Relax & Unwind (7)
  {
    id: '15',
    name: 'Patratu Valley',
    location: { lat: 23.7500, lng: 85.5000 },
    ecoScore: 88,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    description: 'Scenic valley with winding roads and breathtaking mountain views',
    activities: ['Scenic drives', 'Valley photography', 'Nature walks', 'Peaceful meditation'],
    bestForMood: ['relax']
  },
  {
    id: '16',
    name: 'Dimna Lake',
    location: { lat: 22.7167, lng: 86.1833 },
    ecoScore: 85,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
    description: 'Artificial lake surrounded by hills, perfect for boating and relaxation',
    activities: ['Boating', 'Lake photography', 'Peaceful walks', 'Water sports'],
    bestForMood: ['relax', 'adventure']
  },
  {
    id: '17',
    name: 'Topchanchi Lake',
    location: { lat: 23.9167, lng: 86.0833 },
    ecoScore: 84,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
    description: 'Serene lake with crystal clear waters surrounded by lush greenery',
    activities: ['Lake boating', 'Fish watching', 'Nature photography', 'Peaceful relaxation'],
    bestForMood: ['relax']
  },
  {
    id: '18',
    name: 'McCluskieganj',
    location: { lat: 23.6167, lng: 85.1833 },
    ecoScore: 86,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Anglo-Indian settlement with colonial houses and beautiful gardens',
    activities: ['Heritage walks', 'Colonial architecture viewing', 'Garden tours', 'Photography'],
    bestForMood: ['relax', 'cultural']
  },
  {
    id: '19',
    name: 'Kanke Dam',
    location: { lat: 23.4333, lng: 85.3167 },
    ecoScore: 83,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    description: 'Peaceful dam with calm waters and scenic surroundings for relaxation',
    activities: ['Dam viewing', 'Peaceful walks', 'Nature photography', 'Meditation'],
    bestForMood: ['relax']
  },
  {
    id: '20',
    name: 'Tagore Hill',
    location: { lat: 23.3773, lng: 85.3221 },
    ecoScore: 87,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?w=400',
    description: 'Historic hill where Rabindranath Tagore found inspiration for his works',
    activities: ['Nature walks', 'Literary appreciation', 'Sunset viewing', 'Peaceful meditation'],
    bestForMood: ['relax', 'cultural']
  },
  {
    id: '21',
    name: 'Khandoli Park & Lake',
    location: { lat: 24.1667, lng: 86.3000 },
    ecoScore: 82,
    type: 'natural',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    description: 'Beautiful park with lake and hills offering tranquil environment',
    activities: ['Park walks', 'Lake viewing', 'Hill climbing', 'Family picnics'],
    bestForMood: ['relax']
  },

  // Cultural Explorer (7)
  {
    id: '22',
    name: 'Chhau Dance (Saraikela)',
    location: { lat: 22.7000, lng: 85.9333 },
    ecoScore: 90,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    description: 'UNESCO recognized classical dance form with elaborate masks and costumes',
    activities: ['Dance performances', 'Mask workshops', 'Cultural learning', 'Festival participation'],
    bestForMood: ['cultural']
  },
  {
    id: '23',
    name: 'Santhali Tribal Dance',
    location: { lat: 24.5000, lng: 87.0000 },
    ecoScore: 88,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Traditional tribal dance showcasing rich Santhali culture and heritage',
    activities: ['Tribal dance viewing', 'Cultural immersion', 'Traditional music', 'Folk festivals'],
    bestForMood: ['cultural']
  },
  {
    id: '24',
    name: 'Paitkar Painting',
    location: { lat: 22.8000, lng: 86.2000 },
    ecoScore: 85,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400',
    description: 'Traditional scroll paintings depicting tribal folklore and mythology',
    activities: ['Art viewing', 'Painting workshops', 'Cultural learning', 'Artist interactions'],
    bestForMood: ['cultural']
  },
  {
    id: '25',
    name: 'Hazaribagh Rock Paintings',
    location: { lat: 23.9833, lng: 85.3667 },
    ecoScore: 92,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1577916585454-7c269f49c7ff?w=400',
    description: 'Ancient rock art depicting prehistoric life and cultural evolution',
    activities: ['Rock art viewing', 'Archaeological exploration', 'Historical study', 'Photography'],
    bestForMood: ['cultural']
  },
  {
    id: '26',
    name: 'Jamshedpur Tata Steel Heritage',
    location: { lat: 22.8046, lng: 86.2029 },
    ecoScore: 80,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
    description: 'Industrial heritage site showcasing steel city development and history',
    activities: ['Heritage tours', 'Industrial history learning', 'Architecture viewing', 'Museum visits'],
    bestForMood: ['cultural']
  },
  {
    id: '27',
    name: 'Ranchi Museum',
    location: { lat: 23.3569, lng: 85.3120 },
    ecoScore: 83,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400',
    description: 'State museum showcasing tribal culture, archaeology and natural history',
    activities: ['Museum tours', 'Cultural exhibits', 'Historical artifacts viewing', 'Educational visits'],
    bestForMood: ['cultural']
  },
  {
    id: '28',
    name: 'Hotwar State Museum',
    location: { lat: 23.3700, lng: 85.3400 },
    ecoScore: 81,
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1582659038316-5fa08adf9e0f?w=400',
    description: 'Comprehensive museum displaying rich heritage and cultural artifacts of Jharkhand',
    activities: ['Cultural exhibits', 'Heritage learning', 'Artifact viewing', 'Educational tours'],
    bestForMood: ['cultural']
  }
];

// ====================================================================
// MARKETPLACE DATA - Eco-friendly Products & Services
// ====================================================================

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'Handwoven Tribal Basket',
    type: 'handicraft',
    price: 1500,
    ecoScore: 95,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Authentic bamboo basket crafted by Santhal artisans',
    seller: 'Tribal Crafts Collective',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Eco Homestay in Netarhat',
    type: 'homestay',
    price: 2500,
    ecoScore: 90,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    description: 'Solar-powered homestay with organic meals and hill views',
    seller: 'Green Valley Homestays',
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Sacred Grove Nature Walk',
    type: 'eco-tour',
    price: 800,
    ecoScore: 98,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    description: 'Guided tour through protected sacred forests with tribal guides',
    seller: 'Jharkhand Eco Tours',
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    name: 'Traditional Dokra Art',
    type: 'handicraft',
    price: 3200,
    ecoScore: 88,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400',
    description: 'Ancient metal casting art depicting tribal life',
    seller: 'Dhokra Art House',
    rating: 4.6,
    reviews: 67
  },
  {
    id: '5',
    name: 'Forest Canopy Camping',
    type: 'eco-tour',
    price: 4500,
    ecoScore: 93,
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
    description: 'Overnight camping experience in sustainably managed forests',
    seller: 'Wild Jharkhand Adventures',
    rating: 4.8,
    reviews: 203
  },
  {
    id: '6',
    name: 'Village Pottery Workshop',
    type: 'eco-tour',
    price: 1200,
    ecoScore: 91,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Learn traditional pottery from local artisans',
    seller: 'Heritage Skills Academy',
    rating: 4.5,
    reviews: 78
  }
];

// ====================================================================
// TOUR GUIDE DATA - Verified Local Guides with Blockchain Integration
// ====================================================================

export const tourGuides: TourGuide[] = [
  {
    id: '1',
    name: 'Ravi Kumar Munda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.9,
    verified: true,
    specializations: ['Tribal Culture', 'Eco-tourism', 'Wildlife'],
    pricePerDay: 2500,
    location: 'Ranchi',
    blockchainId: '0x1a2b3c4d5e6f'
  },
  {
    id: '2',
    name: 'Sunita Devi',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 4.8,
    verified: true,
    specializations: ['Handicrafts', 'Local Cuisine', 'Village Tours'],
    pricePerDay: 2000,
    location: 'Netarhat',
    blockchainId: '0x2b3c4d5e6f7g'
  },
  {
    id: '3',
    name: 'Arjun Singh',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.7,
    verified: true,
    specializations: ['Adventure Sports', 'Trekking', 'Photography'],
    pricePerDay: 3000,
    location: 'Betla',
    blockchainId: '0x3c4d5e6f7g8h'
  },
  {
    id: '4',
    name: 'Maya Tirkey',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    rating: 4.6,
    verified: false,
    specializations: ['Spiritual Tours', 'Traditional Medicine', 'Folklore'],
    pricePerDay: 1800,
    location: 'Rajrappa'
  }
];

// ====================================================================
// GAMIFICATION DATA - Eco Badges & Achievement System
// ====================================================================

export const badges: Badge[] = [
  {
    id: '1',
    name: 'Eco Warrior',
    icon: '🌱',
    description: 'Earned 100+ eco points',
    dateEarned: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Culture Explorer',
    icon: '🏛️',
    description: 'Visited 5+ cultural sites',
    dateEarned: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Nature Lover',
    icon: '🦋',
    description: 'Completed 3+ eco tours',
    dateEarned: new Date('2024-03-10')
  },
  {
    id: '4',
    name: 'Local Supporter',
    icon: '🤝',
    description: 'Purchased 10+ local handicrafts',
    dateEarned: new Date('2024-02-28')
  }
];

// ====================================================================
// CURRENT USER DATA - Tourist Profile
// ====================================================================

export const currentTourist: Tourist = {
  id: '1',
  name: 'Tourist Explorer',
  ecoScore: 850,
  badges: badges,
  totalPoints: 1250
};

// ====================================================================
// SAFETY ASSISTANT DATA - Real-time Alerts & Warnings
// ====================================================================

export const weatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Heavy rainfall expected in Netarhat region',
    location: 'Netarhat',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'info',
    message: 'Clear skies perfect for wildlife photography',
    location: 'Betla National Park',
    timestamp: new Date()
  }
];

export const crowdAlerts: CrowdAlert[] = [
  {
    id: '1',
    location: 'Rajrappa Temple',
    crowdLevel: 'high',
    message: 'High visitor volume during festival season',
    timestamp: new Date()
  },
  {
    id: '2',
    location: 'Hundru Falls',
    crowdLevel: 'medium',
    message: 'Moderate crowd, good time to visit',
    timestamp: new Date()
  }
];

// ====================================================================
// DASHBOARD DATA - Analytics & Tourism Statistics
// ====================================================================

export const touristData: TouristData[] = [
  { month: 'Jan', visitors: 12000, ecoScore: 82 },
  { month: 'Feb', visitors: 15000, ecoScore: 85 },
  { month: 'Mar', visitors: 18000, ecoScore: 88 },
  { month: 'Apr', visitors: 22000, ecoScore: 87 },
  { month: 'May', visitors: 20000, ecoScore: 83 },
  { month: 'Jun', visitors: 16000, ecoScore: 80 },
  { month: 'Jul', visitors: 25000, ecoScore: 85 },
  { month: 'Aug', visitors: 28000, ecoScore: 89 },
  { month: 'Sep', visitors: 24000, ecoScore: 91 },
  { month: 'Oct', visitors: 30000, ecoScore: 92, forecast: 32000 },
  { month: 'Nov', visitors: 0, ecoScore: 0, forecast: 35000 },
  { month: 'Dec', visitors: 0, ecoScore: 0, forecast: 38000 }
];
