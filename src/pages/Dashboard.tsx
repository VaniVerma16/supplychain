import React, { useState } from 'react';
import SearchSection from '../components/SearchSection';
import ProductHeader from '../components/ProductHeader';
import LiveStatusCard from '../components/LiveStatusCard';
import EnvironmentCharts from '../components/EnvironmentCharts';
import JourneyLogTable from '../components/JourneyLogTable';
import QualityAssessmentCard from '../components/QualityAssessmentCard';
import JourneyMap from '../components/JourneyMap';
import BlockchainVerificationCard from '../components/BlockchainVerificationCard';
import { Product } from '../types';
import { getProductByBatchId } from '../data/mockData';
import { assessQuality, getStatusFromReading } from '../utils/qualityAssessment';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (batchId: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const product = getProductByBatchId(batchId);
    
    if (product) {
      setCurrentProduct(product);
    } else {
      setError(`Batch with ID "${batchId}" not found. Try BATCH_M_045, BATCH_S_089, or BATCH_C_123.`);
      setCurrentProduct(null);
    }
    
    setIsLoading(false);
  };

  const getProductStatus = (product: Product) => {
    const latestReading = product.sensorReadings[product.sensorReadings.length - 1];
    return getStatusFromReading(latestReading, product.idealTempRange, product.idealHumidityRange);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16 lg:-translate-y-20 lg:translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12 lg:translate-y-16 lg:-translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl w-fit">
                  <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-2">Supply Dashboard</h1>
                  <p className="text-lg lg:text-xl text-blue-100 font-medium">
                    Cold Chain Traceability & Quality Monitoring
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-6">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 lg:px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-medium text-sm lg:text-base">Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 lg:px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-medium text-sm lg:text-base">Real-time Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchSection onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 lg:p-8 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-3xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="text-red-800 font-semibold text-base lg:text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8 p-12 lg:p-16 bg-white rounded-3xl shadow-lg border border-gray-200">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
              </div>
              <span className="mt-6 text-lg lg:text-xl text-gray-600 font-medium">Loading batch data...</span>
              <span className="mt-2 text-sm text-gray-500">Fetching real-time sensor information</span>
            </div>
          </div>
        )}

        {/* Product Data */}
        {currentProduct && !isLoading && (
          <div className="space-y-8">
            {/* Product Header */}
            <ProductHeader product={currentProduct} />

            {/* Live Status Card */}
            <LiveStatusCard
              latestReading={currentProduct.sensorReadings[currentProduct.sensorReadings.length - 1]}
              status={getProductStatus(currentProduct)}
              productName={currentProduct.productName}
            />

            {/* Quality Assessment Card */}
            <QualityAssessmentCard assessment={assessQuality(currentProduct)} />

            {/* Blockchain Verification Card */}
            <BlockchainVerificationCard product={currentProduct} />

            {/* Journey Map */}
            <JourneyMap
              journeyLog={currentProduct.journeyLog}
              sensorReadings={currentProduct.sensorReadings}
              idealTempRange={currentProduct.idealTempRange}
              idealHumidityRange={currentProduct.idealHumidityRange}
            />

            {/* Environment Charts */}
            <EnvironmentCharts
              readings={currentProduct.sensorReadings}
              idealTempRange={currentProduct.idealTempRange}
              idealHumidityRange={currentProduct.idealHumidityRange}
            />

            {/* Journey Log */}
            <JourneyLogTable
              journeyLog={currentProduct.journeyLog}
              idealTempRange={currentProduct.idealTempRange}
              idealHumidityRange={currentProduct.idealHumidityRange}
            />
          </div>
        )}

        {/* Empty State */}
        {!currentProduct && !isLoading && !error && (
          <div className="text-center py-16 lg:py-20">
            <div className="max-w-lg mx-auto">
              <div className="mb-8">
                <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full inline-block shadow-lg">
                  <svg className="w-16 h-16 lg:w-20 lg:h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Welcome to Supply</h3>
              <p className="text-gray-600 mb-8 lg:mb-12 text-base lg:text-lg leading-relaxed">
                Enter a batch ID above to start tracking its cold chain journey and quality metrics.
                Our advanced monitoring system provides real-time insights into temperature, humidity, and quality conditions.
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 lg:p-8 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4">Try these sample batches:</p>
                <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                  <span className="px-3 lg:px-4 py-2 bg-white rounded-xl font-mono text-blue-600 font-bold shadow-sm border border-blue-200 text-sm lg:text-base">BATCH_M_045</span>
                  <span className="px-3 lg:px-4 py-2 bg-white rounded-xl font-mono text-green-600 font-bold shadow-sm border border-green-200 text-sm lg:text-base">BATCH_S_089</span>
                  <span className="px-3 lg:px-4 py-2 bg-white rounded-xl font-mono text-purple-600 font-bold shadow-sm border border-purple-200 text-sm lg:text-base">BATCH_C_123</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;