export interface SensorReading {
  timestamp: string;
  temperature: number;
  humidity: number;
  location: string;
  sensorId: string;
  coordinates: [number, number];
  blockchainHash: string;
  tampered?: boolean;
}

export interface JourneyEvent {
  timestamp: string;
  location: string;
  event: string;
  notes: string;
  temperature?: number;
  humidity?: number;
  coordinates: [number, number];
}

export interface Product {
  productId: string;
  productName: string;
  batchId: string;
  productType: 'milk' | 'strawberries' | 'chicken';
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
  sensorReadings: SensorReading[];
  journeyLog: JourneyEvent[];
  imageUrl: string;
  blockchainHash: string;
  tamperingDetected: boolean;
}

export interface QualityAssessment {
  riskLevel: 'safe' | 'moderate' | 'high';
  breachCount: number;
  totalBreachDuration: number;
  lastBreachTime?: string;
  recommendation: string;
}

export type StatusType = 'safe' | 'caution' | 'critical';