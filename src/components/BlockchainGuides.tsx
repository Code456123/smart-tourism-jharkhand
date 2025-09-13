import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Star, 
  MapPin, 
  CheckCircle,
  User,
  Award,
  MessageCircle,
  Phone,
  Eye,
  Link
} from 'lucide-react';
import { TourGuide } from '../types';
import { tourGuides } from '../data/mockData';

interface BlockchainGuidesProps {
  onBack: () => void;
}

const BlockchainGuides: React.FC<BlockchainGuidesProps> = ({ onBack }) => {
  const [selectedGuide, setSelectedGuide] = useState<TourGuide | null>(null);
  const [filterVerified, setFilterVerified] = useState<boolean>(false);
  const [showBlockchainDetails, setShowBlockchainDetails] = useState(false);

  const filteredGuides = filterVerified 
    ? tourGuides.filter(guide => guide.verified)
    : tourGuides;

  const blockchainInfo = {
    networkName: 'JharkhandTourism Chain',
    consensusAlgorithm: 'Proof of Authenticity',
    totalVerifiedGuides: tourGuides.filter(g => g.verified).length,
    lastBlockTime: '2 minutes ago',
    averageVerificationTime: '24 hours'
  };

  const GuideDetailsModal = ({ guide }: { guide: TourGuide }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Guide Profile</h3>
            <button 
              onClick={() => setSelectedGuide(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Guide Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150';
                    }}
                  />
                  {guide.verified && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-2xl font-bold text-gray-900">{guide.name}</h4>
                    {guide.verified && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Blockchain Verified ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                      <span>{guide.rating}/5</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-eco-green-600">
                    ₹{guide.pricePerDay.toLocaleString()}/day
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h5 className="font-bold text-gray-900 mb-3">Specializations</h5>
                <div className="flex flex-wrap gap-2">
                  {guide.specializations.map((spec, index) => (
                    <span key={index} className="bg-eco-green-100 text-eco-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blockchain Verification */}
              {guide.verified && guide.blockchainId && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Blockchain Verification
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Blockchain ID:</span>
                      <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                        {guide.blockchainId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Verification Status:</span>
                      <span className="text-green-600 font-semibold">✓ Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-medium">JharkhandTourism Chain</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Verified:</span>
                      <span className="font-medium">6 months ago</span>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                      <Link className="w-4 h-4" />
                      <span>View on Blockchain</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews Preview */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4">Recent Reviews</h5>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-eco-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Sarah M.</span>
                      </div>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Amazing guide! Very knowledgeable about local culture and took us to authentic places. 
                      The blockchain verification gave us confidence in booking."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">2 weeks ago</div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-cultural-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Raj P.</span>
                      </div>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Great experience exploring Betla National Park. Professional and punctual. 
                      Would definitely recommend!"
                    </p>
                    <div className="text-xs text-gray-500 mt-2">1 month ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="space-y-6">
              <div className="bg-eco-green-50 p-6 rounded-2xl">
                <h5 className="font-bold text-gray-900 mb-4">Book This Guide</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent">
                      <option>Half Day (4 hours)</option>
                      <option>Full Day (8 hours)</option>
                      <option>2 Days</option>
                      <option>3 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Size
                    </label>
                    <select className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent">
                      <option>1-2 People</option>
                      <option>3-5 People</option>
                      <option>6-10 People</option>
                      <option>10+ People</option>
                    </select>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Base Price:</span>
                      <span>₹{guide.pricePerDay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Platform Fee:</span>
                      <span>₹200</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₹{(guide.pricePerDay + 200).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="w-full bg-eco-green-500 hover:bg-eco-green-600 text-white py-3 rounded-xl font-semibold transition-colors">
                    Book Now
                  </button>
                  <button className="w-full bg-cultural-orange-500 hover:bg-cultural-orange-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Message Guide</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h5 className="font-bold text-gray-900 mb-4">Trust & Safety</h5>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Identity Verified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Blockchain Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Licensed Tour Guide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BlockchainInfoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Blockchain Verification System</h3>
            <button 
              onClick={() => setShowBlockchainDetails(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Decentralized Trust</h4>
            <p className="text-gray-600">
              Our blockchain system ensures that all tour guides are authentic, qualified, and trustworthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-bold text-gray-900">Network Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">{blockchainInfo.networkName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consensus:</span>
                  <span className="font-medium">{blockchainInfo.consensusAlgorithm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified Guides:</span>
                  <span className="font-medium">{blockchainInfo.totalVerifiedGuides}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Block:</span>
                  <span className="font-medium">{blockchainInfo.lastBlockTime}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-bold text-gray-900">Verification Process</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">1</span>
                  </div>
                  <span className="text-sm">Identity & License Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">2</span>
                  </div>
                  <span className="text-sm">Background Verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">3</span>
                  </div>
                  <span className="text-sm">Blockchain Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">4</span>
                  </div>
                  <span className="text-sm">Continuous Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h5 className="font-bold text-blue-900 mb-2">Why Blockchain?</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Immutable verification records</li>
              <li>• Transparent credentialing system</li>
              <li>• Decentralized trust network</li>
              <li>• Real-time authenticity checks</li>
            </ul>
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
            <Shield className="w-6 h-6 text-eco-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Verified Guides</h1>
          </div>
        </div>

        {/* Blockchain Info Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-8 text-white mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Blockchain Verified Guides</h2>
              <p className="text-blue-100 mb-6">
                Every guide is verified on our decentralized network, ensuring authenticity, 
                qualifications, and trustworthiness for your peace of mind.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBlockchainDetails(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Learn How It Works
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  View Network Stats
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">{blockchainInfo.totalVerifiedGuides}</div>
                  <div className="text-blue-100">Verified Guides</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-blue-100">Authentic</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24h</div>
                  <div className="text-blue-100">Avg Verification</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-blue-100">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Find Your Perfect Guide</h3>
              <p className="text-gray-600">All guides are background-checked and blockchain verified</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilterVerified(!filterVerified)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  filterVerified
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Verified Only ({tourGuides.filter(g => g.verified).length})
              </button>
              <select className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent">
                <option>All Specializations</option>
                <option>Tribal Culture</option>
                <option>Wildlife & Nature</option>
                <option>Adventure Sports</option>
                <option>Spiritual Tours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150';
                  }}
                />
                {guide.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {guide.location}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{guide.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{guide.rating}/5</span>
                      </div>
                      {guide.verified && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Blockchain ID: {guide.blockchainId?.slice(0, 8)}...
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-eco-green-600">
                      ₹{guide.pricePerDay.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">per day</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1">
                      {guide.specializations.slice(0, 3).map((spec, index) => (
                        <span key={index} className="bg-eco-green-100 text-eco-green-800 px-2 py-1 rounded-full text-xs">
                          {spec}
                        </span>
                      ))}
                      {guide.specializations.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          +{guide.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="flex-1 bg-eco-green-500 hover:bg-eco-green-600 text-white py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="bg-cultural-orange-500 hover:bg-cultural-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <button
              onClick={() => setFilterVerified(false)}
              className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Show All Guides
            </button>
          </div>
        )}
      </div>

      {/* Guide Details Modal */}
      {selectedGuide && <GuideDetailsModal guide={selectedGuide} />}

      {/* Blockchain Info Modal */}
      {showBlockchainDetails && <BlockchainInfoModal />}
    </div>
  );
};

export default BlockchainGuides;
