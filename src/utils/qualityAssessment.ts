import { Product, QualityAssessment, SensorReading } from '../types';

export const assessQuality = (product: Product): QualityAssessment => {
  const breaches = product.sensorReadings.filter(reading => 
    reading.temperature < product.idealTempRange[0] || 
    reading.temperature > product.idealTempRange[1] ||
    reading.humidity < product.idealHumidityRange[0] ||
    reading.humidity > product.idealHumidityRange[1]
  );

  const breachCount = breaches.length;
  const lastBreach = breaches[breaches.length - 1];
  
  let riskLevel: 'safe' | 'moderate' | 'high' = 'safe';
  let recommendation = 'Product maintained optimal conditions throughout the journey.';

  if (breachCount === 0) {
    riskLevel = 'safe';
  } else if (breachCount <= 2) {
    riskLevel = 'moderate';
    recommendation = 'Minor temperature deviations detected. Product quality may be slightly affected.';
  } else {
    riskLevel = 'high';
    recommendation = 'Multiple critical breaches detected. Product quality is compromised and immediate action is required.';
  }

  // Calculate breach duration (simplified - assumes 2 hour intervals)
  const totalBreachDuration = breachCount * 2;

  return {
    riskLevel,
    breachCount,
    totalBreachDuration,
    lastBreachTime: lastBreach?.timestamp,
    recommendation
  };
};

export const getStatusFromReading = (
  reading: SensorReading, 
  idealTempRange: [number, number], 
  idealHumidityRange: [number, number]
): 'safe' | 'caution' | 'critical' => {
  const tempBreach = reading.temperature < idealTempRange[0] || reading.temperature > idealTempRange[1];
  const humidityBreach = reading.humidity < idealHumidityRange[0] || reading.humidity > idealHumidityRange[1];
  
  if (tempBreach && humidityBreach) return 'critical';
  if (tempBreach || humidityBreach) {
    const tempDeviation = Math.max(
      Math.abs(reading.temperature - idealTempRange[0]),
      Math.abs(reading.temperature - idealTempRange[1])
    );
    return tempDeviation > 5 ? 'critical' : 'caution';
  }
  return 'safe';
};