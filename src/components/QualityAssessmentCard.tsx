import React from 'react';
import { Shield, AlertTriangle, XCircle, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';
import { QualityAssessment } from '../types';

interface QualityAssessmentCardProps {
  assessment: QualityAssessment;
}

const QualityAssessmentCard: React.FC<QualityAssessmentCardProps> = ({ assessment }) => {
  const getRiskConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe':
        return {
          icon: Shield,
          color: 'text-green-600',
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-200',
          title: 'Safe Quality',
          gradient: 'from-green-500 to-green-600',
          pulse: 'animate-pulse'
        };
      case 'moderate':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-200',
          title: 'Moderate Risk',
          gradient: 'from-yellow-500 to-yellow-600',
          pulse: 'animate-pulse'
        };
      case 'high':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-200',
          title: 'High Risk',
          gradient: 'from-red-500 to-red-600',
          pulse: 'animate-bounce'
        };
      default:
        return {
          icon: Shield,
          color: 'text-gray-600',
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-200',
          title: 'Unknown',
          gradient: 'from-gray-500 to-gray-600',
          pulse: ''
        };
    }
  };

  const config = getRiskConfig(assessment.riskLevel);
  const RiskIcon = config.icon;

  return (
    <div className={`bg-white rounded-3xl shadow-lg border-2 ${config.border} p-6 lg:p-8 relative overflow-hidden h-full flex flex-col`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16 opacity-30"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className={`p-3 lg:p-5 ${config.bg} rounded-3xl shadow-sm ${config.pulse} flex-shrink-0`}>
            <RiskIcon className={`w-8 h-8 lg:w-10 lg:h-10 ${config.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 flex-shrink-0" />
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Quality Assessment</h3>
            </div>
            <p className={`text-lg lg:text-xl font-bold ${config.color} truncate`}>{config.title}</p>
          </div>
        </div>

        <div className={`p-6 lg:p-8 ${config.bg} rounded-2xl border-2 ${config.border} mb-6 lg:mb-8 shadow-sm flex-1`}>
          <p className="text-gray-800 leading-relaxed text-base lg:text-lg font-medium">{assessment.recommendation}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="group text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="p-3 lg:p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-3 lg:mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{assessment.breachCount}</p>
            <p className="text-xs lg:text-sm font-medium text-gray-600">Condition Breaches</p>
          </div>

          <div className="group text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="p-3 lg:p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-3 lg:mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{assessment.totalBreachDuration}h</p>
            <p className="text-xs lg:text-sm font-medium text-gray-600">Total Breach Duration</p>
          </div>

          <div className="group text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className={`p-3 lg:p-4 ${config.bg} rounded-2xl mb-3 lg:mb-4 inline-block group-hover:scale-110 transition-transform duration-300`}>
              <RiskIcon className={`w-6 h-6 lg:w-8 lg:h-8 ${config.color}`} />
            </div>
            <p className={`text-2xl lg:text-3xl font-bold ${config.color} capitalize mb-2`}>{assessment.riskLevel}</p>
            <p className="text-xs lg:text-sm font-medium text-gray-600">Risk Level</p>
          </div>
        </div>

        {assessment.lastBreachTime && (
          <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl">
              <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="font-medium text-gray-700">Last breach detected:</span>
                <span className="ml-2 text-gray-900 text-sm">{new Date(assessment.lastBreachTime).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityAssessmentCard;