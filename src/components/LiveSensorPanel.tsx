import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid } from 'recharts';
import { format } from 'date-fns';
import { SensorReading } from '../types';

const TEMP_THRESHOLD_HIGH = 22;
const TEMP_THRESHOLD_LOW = 16;

interface SimpleSensorReading {
  sensorId: string;
  type: string;
  latestValue: number;
  unit: string;
  timestamp: string;
}

const INITIAL_TEMP = 25;
const MIN_TEMP = 15;
const MAX_TEMP = 30;

const LiveSensorPanel: React.FC = () => {
  const [readings, setReadings] = useState<SimpleSensorReading[]>([
    {
      sensorId: 'sensor-1',
      type: 'Temperature',
      latestValue: INITIAL_TEMP,
      unit: '°C',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show spinner for 600ms, then show chart
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => {
        const prevValue = prev.length > 0 ? prev[prev.length - 1].latestValue : INITIAL_TEMP;
        // Small random walk, ±0.3°C
        let nextValue = prevValue + (Math.random() - 0.5) * 0.6;
        nextValue = Math.max(MIN_TEMP, Math.min(MAX_TEMP, nextValue));
        const newPoint: SimpleSensorReading = {
          sensorId: 'sensor-1',
          type: 'Temperature',
          latestValue: nextValue,
          unit: '°C',
          timestamp: new Date().toISOString(),
        };
        return [...prev.slice(-19), newPoint];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dynamically adjust Y axis domain based on data
  const tempValues = readings.map(r => r.latestValue);
  let yMin = Math.min(...tempValues, 24) - 1;
  let yMax = Math.max(...tempValues, 26) + 1;
  if (yMin < 15) yMin = 15;
  if (yMax > 30) yMax = 30;

  const breaches = readings.filter(r =>
    r.latestValue > TEMP_THRESHOLD_HIGH || r.latestValue < TEMP_THRESHOLD_LOW
  );

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Live Sensor Data</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[260px]">
          <div className="w-10 h-10 border-4 border-green-300 border-t-green-600 rounded-full animate-spin mb-2"></div>
          <span className="text-gray-500 text-lg font-medium">Loading graph...</span>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)'}}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={readings} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              {/* Crisp, light, professional grid lines aligned to axis values */}
              <CartesianGrid stroke="#d1d5db" strokeDasharray="2 2" vertical={true} horizontal={true} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={t => format(new Date(t), 'h:mm:ss')}
                minTickGap={20}
                tick={{ fontSize: 14 }}
              />
              <YAxis domain={[yMin, yMax]} tick={{ fontSize: 14 }} />
              <Line type="monotone" dataKey="latestValue" stroke="#10B981" strokeWidth={3} dot={false} isAnimationActive={true} fill="url(#lineGradient)" />
              <ReferenceLine y={TEMP_THRESHOLD_HIGH} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'High Threshold', position: 'right', fontSize: 13 }} />
              <ReferenceLine y={TEMP_THRESHOLD_LOW} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Low Threshold', position: 'right', fontSize: 13 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Alerts</h3>
        {breaches.length > 0
          ? breaches.map((b, i) => (
              <div key={i} className="text-sm text-red-600">
                {format(new Date(b.timestamp), 'h:mm:ss, M/d')} – {b.type} {b.latestValue.toFixed(1)}{b.unit} breached
              </div>
            ))
          : <div className="text-sm text-gray-500">No threshold breaches</div>
        }
      </div>
    </div>
  );
};

export default LiveSensorPanel; 