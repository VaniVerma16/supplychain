import React, { useState } from 'react';
import { Search, Package, Scan, Zap } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (batchId: string) => void;
  isLoading?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [batchId, setBatchId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchId.trim()) {
      onSearch(batchId.trim().toUpperCase());
    }
  };

  const quickSearchItems = [
    { id: 'BATCH_M_045', name: 'Pasteurized Milk', icon: '🥛' },
    { id: 'BATCH_S_089', name: 'Organic Strawberries', icon: '🍓' },
    { id: 'BATCH_C_123', name: 'Free Range Chicken', icon: '🐔' }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-sm">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Batch Search
            </h2>
            <p className="text-gray-600 font-medium">Enter or scan a batch ID to track its journey</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
            <input
              type="text"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              placeholder="Enter Batch ID (e.g., BATCH_M_045)"
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!batchId.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:shadow-sm group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Search
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Scan className="w-5 h-5 text-gray-500" />
            <p className="text-sm font-semibold text-gray-700">Quick Search:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickSearchItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSearch(item.id)}
                disabled={isLoading}
                className="group p-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 rounded-2xl text-left transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md"
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
      </div>
    </div>
  );
};

export default SearchSection;