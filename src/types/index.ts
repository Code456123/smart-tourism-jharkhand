export interface Tourist {
  id: string;
  name: string;
  ecoScore: number;
  badges: Badge[];
  totalPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned: Date;
}

export interface TourGuide {
  id: string;
  name: string;
  image: string;
  rating: number;
  verified: boolean;
  specializations: string[];
  pricePerDay: number;
  location: string;
  blockchainId?: string;
}

export interface Destination {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  ecoScore: number;
  type: 'cultural' | 'adventure' | 'spiritual' | 'natural';
  image: string;
  description: string;
  activities: string[];
  bestForMood: Mood[];
}

export interface MarketplaceItem {
  id: string;
  name: string;
  type: 'handicraft' | 'homestay' | 'eco-tour';
  price: number;
  ecoScore: number;
  image: string;
  description: string;
  seller: string;
  rating: number;
  reviews: number;
}

export interface ItineraryDay {
  day: number;
  destination: Destination;
  activities: string[];
  accommodation?: MarketplaceItem;
  ecoPoints: number;
  reasoning: string;
}

export interface Itinerary {
  id: string;
  mood: Mood;
  budget: number;
  days: number;
  totalEcoScore: number;
  days_plan: ItineraryDay[];
  totalCost: number;
}

export type Mood = 'relax' | 'adventure' | 'spiritual' | 'cultural';

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'info' | 'severe';
  message: string;
  location: string;
  timestamp: Date;
}

export interface CrowdAlert {
  id: string;
  location: string;
  crowdLevel: 'low' | 'medium' | 'high' | 'extreme';
  message: string;
  timestamp: Date;
}

export interface TouristData {
  month: string;
  visitors: number;
  ecoScore: number;
  forecast?: number;
}
