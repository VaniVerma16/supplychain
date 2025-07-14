import React, { useState } from 'react';
import { ShoppingCart, TrendingDown, AlertTriangle, CheckCircle, Bell, Eye, Package, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { mockProducts } from '../data/mockData';
import { useToast } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import EnvironmentCharts from '../components/EnvironmentCharts';
import JourneyLogTable from '../components/JourneyLogTable';
import QualityAssessmentCard from '../components/QualityAssessmentCard';
import { assessQuality } from '../utils/qualityAssessment';

const DownstreamDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [aiModal, setAiModal] = useState<{ open: boolean; loading: boolean; analysis: string | null; batch: any | null }>({ open: false, loading: false, analysis: null, batch: null });

  // Mock data for downstream participants
  const receivedBatches = mockProducts.filter(p => p.productType === 'chicken' || p.productType === 'milk');
  const alerts = [
    { 
      id: 1, 
      type: 'temperature', 
      batch: 'BATCH_M_045', 
      message: 'Temperature exceeded safe range for 2 hours', 
      severity: 'high',
      time: '30 min ago',
      product: 'Pasteurized Cow Milk'
    },
    { 
      id: 2, 
      type: 'spoilage', 
      batch: 'BATCH_S_089', 
      message: 'High spoilage risk detected', 
      severity: 'medium',
      time: '1 hour ago',
      product: 'Organic Strawberries'
    },
    { 
      id: 3, 
      type: 'recall', 
      batch: 'BATCH_C_123', 
      message: 'Quality assurance update required', 
      severity: 'low',
      time: '2 hours ago',
      product: 'Free Range Chicken'
    }
  ];

  const stats = [
    { label: 'Received Batches', value: '24', icon: ShoppingCart, color: 'blue' },
    { label: 'Spoilage Risk', value: '8%', icon: TrendingDown, color: 'red' },
    { label: 'Active Alerts', value: '5', icon: AlertTriangle, color: 'yellow' },
    { label: 'Quality Passed', value: '92%', icon: CheckCircle, color: 'green' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Helper to generate AI suggestion text
  function generateAISummary(batch: any) {
    const journey = batch.journeyLog;
    const readings = batch.sensorReadings;
    const breaches = readings.filter(r => r.temperature > batch.idealTempRange[1] || r.temperature < batch.idealTempRange[0]);
    const breachCount = breaches.length;
    const total = readings.length;
    const breachPercent = total > 0 ? Math.round((breachCount / total) * 100) : 0;
    let bestSegment = null;
    let minBreaches = Infinity;
    for (let i = 1; i < journey.length; i++) {
      const from = journey[i - 1];
      const to = journey[i];
      const segReadings = readings.filter(r => new Date(r.timestamp) >= new Date(from.timestamp) && new Date(r.timestamp) <= new Date(to.timestamp));
      const segBreaches = segReadings.filter(r => r.temperature > batch.idealTempRange[1] || r.temperature < batch.idealTempRange[0]);
      if (segBreaches.length < minBreaches) {
        minBreaches = segBreaches.length;
        bestSegment = { from: from.location, to: to.location };
      }
    }
    let recLow = batch.idealTempRange[0];
    let recHigh = batch.idealTempRange[1];
    if (breachPercent > 30) {
      recLow += 1;
      recHigh -= 1;
    } else if (breachPercent > 10) {
      recLow += 0.5;
      recHigh -= 0.5;
    }
    let usability = 'Usable';
    let risk = 'Low';
    if (breachPercent > 40) {
      usability = 'Not recommended';
      risk = 'High';
    } else if (breachPercent > 20) {
      usability = 'Caution';
      risk = 'Moderate';
    }
    return {
      bestRoute: bestSegment ? `${bestSegment.from} → ${bestSegment.to}` : 'N/A',
      thresholds: `${recLow.toFixed(1)}°C – ${recHigh.toFixed(1)}°C`,
      breaches: `${breachCount} of ${total} readings (${breachPercent}%)`,
      usability,
      risk
    };
  }

  // Helper to generate AI-mocked data for charts, log, and assessment
  function generateAIMockData(batch) {
    // Simulate improved sensor readings (e.g., fewer breaches, more stable)
    const readings = batch.sensorReadings.map((r, i) => ({
      ...r,
      temperature: Math.max(batch.idealTempRange[0], Math.min(batch.idealTempRange[1], r.temperature + (Math.random() - 0.5) * 0.8)),
      humidity: Math.max(batch.idealHumidityRange[0], Math.min(batch.idealHumidityRange[1], r.humidity + (Math.random() - 0.5) * 2)),
      tampered: false
    }));
    // Simulate a new journey log (e.g., optimized route, fewer breaches)
    const journeyLog = batch.journeyLog.map((e, i) => ({
      ...e,
      temperature: i % 3 === 0 ? batch.idealTempRange[0] + 1 : batch.idealTempRange[1] - 1,
      humidity: i % 2 === 0 ? batch.idealHumidityRange[0] + 2 : batch.idealHumidityRange[1] - 2,
      notes: e.notes + ' (AI-optimized)'
    }));
    // Simulate a new quality assessment (e.g., improved risk)
    const breachCount = readings.filter(r => r.temperature < batch.idealTempRange[0] || r.temperature > batch.idealTempRange[1] || r.humidity < batch.idealHumidityRange[0] || r.humidity > batch.idealHumidityRange[1]).length;
    const riskLevel = breachCount === 0 ? 'safe' : breachCount <= 1 ? 'moderate' : 'high';
    const recommendation = riskLevel === 'safe' ? 'AI predicts optimal quality with the suggested changes.' : riskLevel === 'moderate' ? 'AI predicts minor deviations, but product is still usable.' : 'AI predicts quality risk remains high.';
    const assessment = {
      riskLevel,
      breachCount,
      totalBreachDuration: breachCount * 1,
      lastBreachTime: readings[readings.length - 1]?.timestamp,
      recommendation
    };
    return { readings, journeyLog, assessment };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">नमस्ते {user?.name}! 🏪</h1>
              <p className="text-xl text-blue-100 mb-4">Downstream Participant Dashboard</p>
              <p className="text-blue-100">
                Monitor incoming batches, track spoilage risks, and manage quality alerts for your inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alerts & Notifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
              </div>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedAlert === alert.id.toString()
                        ? getSeverityColor(alert.severity)
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAlert(
                      selectedAlert === alert.id.toString() ? null : alert.id.toString()
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </div>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{alert.product}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.batch}</p>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    
                    {selectedAlert === alert.id.toString() && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button onClick={() => toast('View details clicked! (demo)')} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            View Details
                          </button>
                          <button onClick={() => toast('Mark resolved clicked! (demo)')} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            Mark Resolved
                          </button>
                          <button onClick={() => toast('Compare vendors clicked! (demo)')} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            Compare Vendors
                          </button>
                          <button onClick={() => toast('Get AI suggestion clicked! (demo)')} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            Get AI Suggestion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button onClick={() => toast('Batch recall triggered! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl transition-all duration-200 group">
                  <Bell className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-blue-700">Trigger Recall</span>
                </button>
                <button onClick={() => toast('Batch received! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-2xl transition-all duration-200 group">
                  <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-green-700">Mark as Received</span>
                </button>
                <button onClick={() => toast('Freshness monitoring started! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl transition-all duration-200 group">
                  <Eye className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-purple-700">Monitor Freshness</span>
                </button>
              </div>
            </div>
          </div>

          {/* Received Batches */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Received Batches</h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {receivedBatches.map((batch) => {
                  const latestReading = batch.sensorReadings[batch.sensorReadings.length - 1];
                  const hasAlert = alerts.some(alert => alert.batch === batch.batchId);
                  
                  return (
                    <div
                      key={batch.batchId}
                      className={`p-6 border-2 rounded-2xl transition-all duration-200 ${
                        hasAlert 
                          ? 'border-red-200 bg-red-50' 
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={batch.imageUrl}
                          alt={batch.productName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{batch.productName}</h3>
                              <p className="text-sm text-gray-600">{batch.batchId}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {hasAlert && (
                                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                  Alert
                                </div>
                              )}
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                batch.tamperingDetected 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {batch.tamperingDetected ? 'Tampered' : 'Verified'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">ID: {batch.productId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {new Date(latestReading.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-gray-600">
                              Temp: {latestReading.temperature.toFixed(1)}°C
                            </div>
                            <div className="text-gray-600">
                              Humidity: {latestReading.humidity}%
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm"
                              onClick={() => navigate(`/journey/${batch.batchId}`)}
                            >
                              View Journey
                            </button>
                            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm">
                              Check Freshness
                            </button>
                            {hasAlert && (
                              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm">
                                View Alert
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setAiModal({ open: true, loading: true, analysis: null, batch });
                                setTimeout(() => {
                                  setAiModal({ open: true, loading: false, analysis: null, batch });
                                }, 1500);
                              }}
                              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                            >
                              Get AI Suggestion
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AI Suggestion Modal */}
      {aiModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full relative animate-fade-in overflow-y-auto max-h-[90vh]">
            <button onClick={() => setAiModal({ open: false, loading: false, analysis: null, batch: null })} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 px-8 pt-8">AI Suggestions & Analysis</h2>
            {aiModal.loading ? (
              <div className="flex flex-col items-center justify-center h-80">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <span className="text-gray-500 text-xl font-medium">Generating AI suggestions...</span>
              </div>
            ) : aiModal.batch ? (
              (() => {
                const aiSummary = generateAISummary(aiModal.batch);
                const aiData = generateAIMockData(aiModal.batch);
                const breaches = aiData.readings.filter(r => r.temperature < aiModal.batch.idealTempRange[0] || r.temperature > aiModal.batch.idealTempRange[1] || r.humidity < aiModal.batch.idealHumidityRange[0] || r.humidity > aiModal.batch.idealHumidityRange[1]);
                const riskColor = aiData.assessment.riskLevel === 'high' ? 'red' : aiData.assessment.riskLevel === 'moderate' ? 'yellow' : 'green';
                const riskBg = riskColor === 'red' ? 'bg-red-50 border-red-200' : riskColor === 'yellow' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200';
                const riskText = riskColor === 'red' ? 'text-red-700' : riskColor === 'yellow' ? 'text-yellow-700' : 'text-green-700';
                return (
                  <div className="px-8 pb-8 space-y-8">
                    {/* Report Header */}
                    <div className="flex items-center gap-4 mb-2">
                      <img src={aiModal.batch.imageUrl} alt={aiModal.batch.productName} className="w-20 h-20 rounded-xl object-cover shadow-lg ring-2 ring-blue-200" />
                      <div>
                        <div className="text-lg font-semibold text-gray-700">AI-Generated Report for</div>
                        <div className="text-2xl font-bold text-gray-900">{aiModal.batch.productName}</div>
                        <div className="text-sm text-gray-500">Batch ID: {aiModal.batch.batchId}</div>
                      </div>
                    </div>
                    {/* Data Summary */}
                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="text-gray-700 text-base"><span className="font-semibold">Sensor Readings Analyzed:</span> {aiData.readings.length}</div>
                        <div className="text-gray-700 text-base"><span className="font-semibold">Time Span:</span> {aiData.readings[0] && aiData.readings[aiData.readings.length-1] ? `${new Date(aiData.readings[0].timestamp).toLocaleString()} – ${new Date(aiData.readings[aiData.readings.length-1].timestamp).toLocaleString()}` : 'N/A'}</div>
                        <div className="text-gray-700 text-base"><span className="font-semibold">Total Breaches Detected:</span> {breaches.length}</div>
                        <div className="text-gray-700 text-base"><span className="font-semibold">AI Risk Level:</span> <span className={`font-bold ${riskText}`}>{aiData.assessment.riskLevel.toUpperCase()}</span></div>
                      </div>
                      <div className={`flex items-center justify-center rounded-2xl border-2 ${riskBg} px-8 py-6 min-w-[180px]`}> 
                        <div className="flex flex-col items-center">
                          <span className={`text-3xl font-bold ${riskText}`}>{aiData.assessment.riskLevel === 'high' ? 'High Risk' : aiData.assessment.riskLevel === 'moderate' ? 'Moderate Risk' : 'Safe'}</span>
                          <span className="text-sm text-gray-500 mt-2">AI Quality Assessment</span>
                        </div>
                      </div>
                    </div>
                    {/* Breaches Section */}
                    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-3 h-3 rounded-full ${riskColor === 'red' ? 'bg-red-500' : riskColor === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                        <span className="font-semibold text-gray-900">Detected Breaches</span>
                        <span className="text-xs text-gray-500 ml-2">({breaches.length} events)</span>
                      </div>
                      {breaches.length === 0 ? (
                        <div className="text-green-600 font-medium">No breaches detected in the AI scenario.</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-gray-900">Timestamp</th>
                                <th className="text-left py-2 px-3 font-semibold text-gray-900">Location</th>
                                <th className="text-left py-2 px-3 font-semibold text-gray-900">Temperature</th>
                                <th className="text-left py-2 px-3 font-semibold text-gray-900">Humidity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {breaches.map((b, i) => (
                                <tr key={i} className={riskColor === 'red' ? 'bg-red-50' : riskColor === 'yellow' ? 'bg-yellow-50' : 'bg-green-50'}>
                                  <td className="py-2 px-3">{new Date(b.timestamp).toLocaleString()}</td>
                                  <td className="py-2 px-3">{b.location}</td>
                                  <td className="py-2 px-3">{b.temperature.toFixed(1)}°C</td>
                                  <td className="py-2 px-3">{b.humidity}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                    {/* AI Insights Section */}
                    <div className={`rounded-2xl shadow border-2 p-6 ${riskBg}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-3 h-3 rounded-full ${riskColor === 'red' ? 'bg-red-500' : riskColor === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                        <span className={`font-semibold ${riskText}`}>AI Insights & Recommendations</span>
                      </div>
                      <ul className="list-disc pl-6 space-y-2 text-base">
                        <li><span className="font-semibold">Best Route:</span> {aiSummary.bestRoute}</li>
                        <li><span className="font-semibold">Recommended Temp Thresholds:</span> {aiSummary.thresholds}</li>
                        <li><span className="font-semibold">Usability:</span> {aiSummary.usability}</li>
                        <li><span className="font-semibold">Risk Analysis:</span> {aiSummary.risk}</li>
                        <li><span className="font-semibold">AI Recommendation:</span> {aiData.assessment.recommendation}</li>
                      </ul>
                    </div>
                  </div>
                );
              })()
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownstreamDashboard;