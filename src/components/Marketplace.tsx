import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Award, 
  Filter, 
  Search, 
  ArrowRight,
  Heart,
  ShoppingCart,
  MapPin,
  Leaf,
  Home,
  Camera
} from 'lucide-react';
import { MarketplaceItem } from '../types';
import { marketplaceItems } from '../data/mockData';

interface MarketplaceProps {
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const [items, setItems] = useState<MarketplaceItem[]>(marketplaceItems);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<MarketplaceItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const filters = [
    { id: 'all', name: 'All Items', count: marketplaceItems.length },
    { id: 'handicraft', name: 'Handicrafts', count: marketplaceItems.filter(item => item.type === 'handicraft').length },
    { id: 'homestay', name: 'Homestays', count: marketplaceItems.filter(item => item.type === 'homestay').length },
    { id: 'eco-tour', name: 'Eco Tours', count: marketplaceItems.filter(item => item.type === 'eco-tour').length }
  ];

  const filteredItems = items.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addToCart = (item: MarketplaceItem) => {
    setCart(prev => [...prev, item]);
  };

  const getTypeIcon = (type: MarketplaceItem['type']) => {
    switch (type) {
      case 'handicraft': return '🎨';
      case 'homestay': return '🏡';
      case 'eco-tour': return '🌿';
      default: return '📦';
    }
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getTotalCartValue = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getTotalEcoPoints = () => {
    return cart.reduce((total, item) => total + Math.floor(item.ecoScore * 0.5), 0);
  };

  const CheckoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Checkout</h3>
            <button 
              onClick={() => setShowCheckout(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Your Items</h4>
            {cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400';
                  }}
                />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{item.name}</h5>
                  <p className="text-sm text-gray-600">{item.seller}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-eco-green-600">₹{item.price.toLocaleString()}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(item.ecoScore)}`}>
                      {item.ecoScore}/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t pt-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{getTotalCartValue().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-eco-green-600">
                <span>Eco Points Earned:</span>
                <span className="font-semibold">+{getTotalEcoPoints()} points</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total:</span>
                <span>₹{getTotalCartValue().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Eco Impact */}
          <div className="bg-eco-green-50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="w-5 h-5 text-eco-green-600" />
              <span className="font-semibold text-eco-green-800">Your Eco Impact</span>
            </div>
            <p className="text-eco-green-700 text-sm">
              By choosing these eco-friendly options, you're supporting local communities and 
              sustainable tourism. You'll earn {getTotalEcoPoints()} eco-points towards your next badge!
            </p>
          </div>

          {/* Payment Button */}
          <button 
            onClick={() => {
              alert('Payment successful! Thank you for supporting sustainable tourism. 🌱');
              setCart([]);
              setShowCheckout(false);
            }}
            className="w-full bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            Complete Purchase
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-eco-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setShowCheckout(true)}
                className="relative bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cart.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search handicrafts, homestays, tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-eco-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <div className="text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEcoScoreColor(item.ecoScore)}`}>
                    {item.ecoScore}/100
                  </div>
                </div>
                <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.seller}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-eco-green-600">₹{item.price.toLocaleString()}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-eco-green-500" />
                    <span className="text-sm text-eco-green-600 font-medium">
                      +{Math.floor(item.ecoScore * 0.5)} eco-points
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors">
                      View Details
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Support Local Communities</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Every purchase directly supports tribal artisans and eco-tourism initiatives. 
              Your choices make a difference in preserving Jharkhand's rich heritage.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-80">Artisans Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">₹2L+</div>
                <div className="text-sm opacity-80">Community Income</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm opacity-80">Eco-Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && <CheckoutModal />}
    </div>
  );
};

export default Marketplace;
