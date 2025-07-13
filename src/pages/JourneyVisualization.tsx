import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, TrendingUp, AlertTriangle, Route } from 'lucide-react';
import { getProductByBatchId } from '../data/mockData';
import { assessQuality } from '../utils/qualityAssessment';
import JourneyTimeline from '../components/JourneyTimeline';
import JourneyMap from '../components/JourneyMap';
import { format } from 'date-fns';

const JourneyVisualization: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  // For backward compatibility, try to find by product ID first, then by batch ID
  let product = productId ? getProductByBatchId(productId) : null;
  
  if (!product && productId) {
    // Try to find by product ID for backward compatibility
    const mockProducts = [
      { productId: "MILK123", batchId: "BATCH_M_045" },
      { productId: "BERRY456", batchId: "BATCH_S_089" },
      { productId: "CHICK789", batchId: "BATCH_C_123" }
    ];
    const mapping = mockProducts.find(p => p.productId === productId);
    if (mapping) {
      product = getProductByBatchId(mapping.batchId);
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product ID "{productId}" was not found in our system.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const assessment = assessQuality(product);
  const firstEvent = product.journeyLog[0];
  const lastEvent = product.journeyLog[product.journeyLog.length - 1];
  const journeyDuration = new Date(lastEvent.timestamp).getTime() - new Date(firstEvent.timestamp).getTime();
  const durationHours = Math.round(journeyDuration / (1000 * 60 * 60));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Dashboard
          </Link>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-sm">
                    <Route className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                      Journey Visualization
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">{product.productName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                  />
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">Batch ID</p>
                    <p className="text-2xl font-bold text-gray-900">{product.batchId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Overview */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-20 -translate-x-20 opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Journey Summary</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{product.journeyLog.length}</p>
                <p className="text-sm font-medium text-gray-600">Checkpoints</p>
              </div>

              <div className="group text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{durationHours}h</p>
                <p className="text-sm font-medium text-gray-600">Total Duration</p>
              </div>

              <div className="group text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{product.sensorReadings.length}</p>
                <p className="text-sm font-medium text-gray-600">Sensor Readings</p>
              </div>

              <div className="group text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className={`p-4 rounded-2xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300 ${
                  assessment.riskLevel === 'safe' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                  assessment.riskLevel === 'moderate' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-gradient-to-br from-red-100 to-red-200'
                }`}>
                  <AlertTriangle className={`w-8 h-8 ${
                    assessment.riskLevel === 'safe' ? 'text-green-600' :
                    assessment.riskLevel === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
                <p className={`text-3xl font-bold capitalize mb-2 ${
                  assessment.riskLevel === 'safe' ? 'text-green-600' :
                  assessment.riskLevel === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {assessment.riskLevel}
                </p>
                <p className="text-sm font-medium text-gray-600">Quality Status</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="font-semibold text-gray-700">Journey Start:</span>
                    <span className="ml-2 text-gray-900">{format(new Date(firstEvent.timestamp), 'PPp')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="font-semibold text-gray-700">Journey End:</span>
                    <span className="ml-2 text-gray-900">{format(new Date(lastEvent.timestamp), 'PPp')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="font-semibold text-gray-700">Origin:</span>
                    <span className="ml-2 text-gray-900">{firstEvent.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <span className="font-semibold text-gray-700">Destination:</span>
                    <span className="ml-2 text-gray-900">{lastEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Map */}
        <div className="mb-8">
          <JourneyMap
            journeyLog={product.journeyLog}
            sensorReadings={product.sensorReadings}
            idealTempRange={product.idealTempRange}
            idealHumidityRange={product.idealHumidityRange}
          />
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl">
                <Clock className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Complete Journey Timeline</h2>
                <p className="text-gray-600 font-medium">Detailed view of all events and environmental conditions</p>
              </div>
            </div>

            <JourneyTimeline
              journeyLog={product.journeyLog}
              sensorReadings={product.sensorReadings}
              idealTempRange={product.idealTempRange}
              idealHumidityRange={product.idealHumidityRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyVisualization;