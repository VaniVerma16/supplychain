import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { SensorReading } from '../types';
import { format } from 'date-fns';

interface EnvironmentChartsProps {
  readings: SensorReading[];
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
}

const EnvironmentCharts: React.FC<EnvironmentChartsProps> = ({ 
  readings, 
  idealTempRange, 
  idealHumidityRange 
}) => {
  const chartData = readings.map(reading => ({
    ...reading,
    time: format(new Date(reading.timestamp), 'HH:mm'),
    tempStatus: reading.temperature < idealTempRange[0] || reading.temperature > idealTempRange[1] ? 'breach' : 'safe',
    humidityStatus: reading.humidity < idealHumidityRange[0] || reading.humidity > idealHumidityRange[1] ? 'breach' : 'safe',
    tampered: reading.tampered || false
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600 mb-2">{data.location}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
                {entry.name}: {entry.value}{entry.name === 'Temperature' ? '°C' : '%'}
              </p>
            ))}
          </div>
          {data.tampered && (
            <div className="mt-2 pt-2 border-t border-red-200">
              <p className="text-xs text-red-600 font-bold">⚠️ Data Tampering Detected</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Environmental Conditions</h3>
      
      <div className="space-y-8">
        {/* Temperature Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Temperature Monitoring</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span className="text-gray-600">Safe Range ({idealTempRange[0]}°C - {idealTempRange[1]}°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <span className="text-gray-600">Tampered Data</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  label={{ value: '°C', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={idealTempRange[0]} stroke="#10B981" strokeDasharray="5 5" />
                <ReferenceLine y={idealTempRange[1]} stroke="#10B981" strokeDasharray="5 5" />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#3B82F6" 
                  fill="url(#tempGradient)"
                  strokeWidth={2}
                  name="Temperature"
                />
                {/* Highlight tampered data points */}
                {chartData.filter(d => d.tampered).map((point, index) => (
                  <ReferenceLine 
                    key={index}
                    x={point.time} 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    strokeDasharray="2 2"
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Humidity Monitoring</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-200 rounded"></div>
                <span className="text-gray-600">Safe Range ({idealHumidityRange[0]}% - {idealHumidityRange[1]}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <span className="text-gray-600">Tampered Data</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  label={{ value: '%', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={idealHumidityRange[0]} stroke="#10B981" strokeDasharray="5 5" />
                <ReferenceLine y={idealHumidityRange[1]} stroke="#10B981" strokeDasharray="5 5" />
                <Area 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#06B6D4" 
                  fill="url(#humidityGradient)"
                  strokeWidth={2}
                  name="Humidity"
                />
                {/* Highlight tampered data points */}
                {chartData.filter(d => d.tampered).map((point, index) => (
                  <ReferenceLine 
                    key={index}
                    x={point.time} 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    strokeDasharray="2 2"
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentCharts;