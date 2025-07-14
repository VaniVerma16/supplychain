import React, { useState } from 'react';
import { ArrowLeft, Search, Package, Shield, MapPin, Clock, Thermometer, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductByBatchId } from '../data/mockData';
import { Product } from '../types';
import JourneyMap from '../components/JourneyMap';
import { format } from 'date-fns';

const ExternalDashboard: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchBatchId: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundProduct = getProductByBatchId(searchBatchId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError(`Batch with ID "${searchBatchId}" not found. Try BATCH_M_045, BATCH_S_089, or BATCH_C_123.`);
      setProduct(null);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchId.trim()) {
      handleSearch(batchId.trim().toUpperCase());
    }
  };

  const quickSearchItems = [
    { id: 'BATCH_M_045', name: 'Pasteurized Milk', icon: '🥛' },
    { id: 'BATCH_S_089', name: 'Organic Strawberries', icon: '🍓' },
    { id: 'BATCH_C_123', name: 'Free Range Chicken', icon: '🐔' }
  ];

  const latestReading = product?.sensorReadings[product.sensorReadings.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Login
          </Link>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Product Tracker</h1>
                  <p className="text-xl text-blue-100">Track your product's journey from farm to table</p>
                </div>
              </div>
              <p className="text-blue-100 font-medium">
                Enter a batch ID below to view complete traceability information, quality metrics, and blockchain verification.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Track Your Product</h2>
              <p className="text-gray-600">Enter or select a batch ID to view detailed information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID (e.g., BATCH_M_045)"
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!batchId.trim() || isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                {isLoading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickSearchItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSearch(item.id)}
                disabled={isLoading}
                className="p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl text-left transition-all duration-200 disabled:opacity-50 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {item.id}
                    </p>
                    <p className="text-sm text-gray-600">{item.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8 p-12 bg-white rounded-2xl shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading product information...</p>
          </div>
        )}

        {/* Public Demo View Banner */}
        <div className="w-full bg-yellow-100 border-b-2 border-yellow-300 text-yellow-900 text-center py-2 font-semibold text-lg mb-4">
          Public Demo View: All data is read-only. No actions available.
        </div>

        {/* Product Information */}
        {product && !isLoading && (
          <div className="space-y-8">
            {/* Product Header */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productName}</h1>
                      <p className="text-lg text-gray-600 mb-4">Batch ID: {product.batchId}</p>
                      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Blockchain Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600">Product ID</p>
                      <p className="text-lg font-bold text-gray-900">{product.productId}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600">Temperature Range</p>
                      <p className="text-lg font-bold text-gray-900">
                        {product.idealTempRange[0]}°C to {product.idealTempRange[1]}°C
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600">Humidity Range</p>
                      <p className="text-lg font-bold text-gray-900">
                        {product.idealHumidityRange[0]}% to {product.idealHumidityRange[1]}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-600">Checkpoints</p>
                      <p className="text-lg font-bold text-gray-900">{product.journeyLog.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            {latestReading && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Thermometer className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-blue-900">Temperature</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-900">{latestReading.temperature.toFixed(1)}°C</p>
                  </div>
                  <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Droplets className="w-6 h-6 text-cyan-600" />
                      <span className="font-semibold text-cyan-900">Humidity</span>
                    </div>
                    <p className="text-3xl font-bold text-cyan-900">{latestReading.humidity}%</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-green-900">Location</span>
                    </div>
                    <p className="text-sm font-bold text-green-900">{latestReading.location}</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <span className="font-semibold text-purple-900">Last Update</span>
                    </div>
                    <p className="text-sm font-bold text-purple-900">
                      {format(new Date(latestReading.timestamp), 'MMM dd, HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Journey Map */}
            <JourneyMap
              journeyLog={product.journeyLog}
              sensorReadings={product.sensorReadings}
              idealTempRange={product.idealTempRange}
              idealHumidityRange={product.idealHumidityRange}
            />

            {/* Tampering Alert */}
            {product.tamperingDetected && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">Data Tampering Detected</h3>
                </div>
                <p className="text-red-700">
                  Blockchain verification has detected data tampering in this product's journey. 
                  Please contact the supplier for more information.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!product && !isLoading && !error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full inline-block mb-6">
                <Package className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Any Product</h3>
              <p className="text-gray-600 mb-8">
                Enter a batch ID above to view complete traceability information including journey history, 
                quality metrics, and blockchain verification status.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalDashboard;