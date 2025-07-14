import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    productId: "MILK123",
    productName: "Pasteurized Cow Milk",
    batchId: "BATCH_M_045",
    productType: "milk",
    idealTempRange: [2, 8],
    idealHumidityRange: [40, 70],
    imageUrl: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400",
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    tamperingDetected: false,
    sensorReadings: [
      {
        timestamp: "2025-01-20T06:00:00Z",
        temperature: 4.2,
        humidity: 55,
        location: "Dairy Farm, Anand",
        sensorId: "SENSOR_001",
        coordinates: [22.5645, 72.9289],
        blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12"
      },
      {
        timestamp: "2025-01-20T07:00:00Z",
        temperature: 4.8,
        humidity: 56,
        location: "Dairy Farm, Anand",
        sensorId: "SENSOR_001",
        coordinates: [22.5645, 72.9289],
        blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234"
      },
      {
        timestamp: "2025-01-20T08:00:00Z",
        temperature: 5.1,
        humidity: 58,
        location: "Collection Center, Vadodara",
        sensorId: "SENSOR_001",
        coordinates: [22.3072, 73.1812],
        blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456"
      },
      {
        timestamp: "2025-01-20T09:00:00Z",
        temperature: 5.8,
        humidity: 60,
        location: "Collection Center, Vadodara",
        sensorId: "SENSOR_001",
        coordinates: [22.3072, 73.1812],
        blockchainHash: "0x4d5e6f7890abcdef1234567890abcdef12345678"
      },
      {
        timestamp: "2025-01-20T10:00:00Z",
        temperature: 6.8,
        humidity: 62,
        location: "Processing Plant, Ahmedabad",
        sensorId: "SENSOR_001",
        coordinates: [23.0225, 72.5714],
        blockchainHash: "0x5e6f7890abcdef1234567890abcdef1234567890"
      },
      {
        timestamp: "2025-01-20T11:00:00Z",
        temperature: 8.2,
        humidity: 64,
        location: "Processing Plant, Ahmedabad",
        sensorId: "SENSOR_001",
        coordinates: [23.0225, 72.5714],
        blockchainHash: "0x6f7890abcdef1234567890abcdef123456789012"
      },
      {
        timestamp: "2025-01-20T12:00:00Z",
        temperature: 11.2,
        humidity: 65,
        location: "Highway Toll Plaza, Rajkot",
        sensorId: "SENSOR_001",
        coordinates: [22.3039, 70.8022],
        blockchainHash: "0x7890abcdef1234567890abcdef12345678901234"
      },
      {
        timestamp: "2025-01-20T13:00:00Z",
        temperature: 12.8,
        humidity: 67,
        location: "Highway Toll Plaza, Rajkot",
        sensorId: "SENSOR_001",
        coordinates: [22.3039, 70.8022],
        blockchainHash: "0x890abcdef1234567890abcdef1234567890123456"
      },
      {
        timestamp: "2025-01-20T14:00:00Z",
        temperature: 13.8,
        humidity: 68,
        location: "Distribution Center, Surat",
        sensorId: "SENSOR_001",
        coordinates: [21.1702, 72.8311],
        blockchainHash: "0x90abcdef1234567890abcdef123456789012345678"
      },
      {
        timestamp: "2025-01-20T15:00:00Z",
        temperature: 9.2,
        humidity: 63,
        location: "Distribution Center, Surat",
        sensorId: "SENSOR_001",
        coordinates: [21.1702, 72.8311],
        blockchainHash: "0xabcdef1234567890abcdef12345678901234567890"
      },
      {
        timestamp: "2025-01-20T16:00:00Z",
        temperature: 7.2,
        humidity: 60,
        location: "Retail Store, Mumbai",
        sensorId: "SENSOR_001",
        coordinates: [19.0760, 72.8777],
        blockchainHash: "0xbcdef1234567890abcdef123456789012345678901"
      }
    ],
    journeyLog: [
      {
        timestamp: "2025-01-20T05:45:00Z",
        location: "Dairy Farm, Anand",
        event: "Batch packed",
        notes: "Initial conditions acceptable at Gujarat's milk capital",
        temperature: 4.2,
        humidity: 55,
        coordinates: [22.5645, 72.9289]
      },
      {
        timestamp: "2025-01-20T07:30:00Z",
        location: "Collection Center, Vadodara",
        event: "Loaded to transport",
        notes: "Temperature stable during loading at collection facility",
        temperature: 5.1,
        humidity: 58,
        coordinates: [22.3072, 73.1812]
      },
      {
        timestamp: "2025-01-20T11:45:00Z",
        location: "Highway Toll Plaza, Rajkot",
        event: "Vehicle breakdown",
        notes: "Refrigeration unit malfunction on NH48 - temperature rising",
        temperature: 11.2,
        humidity: 65,
        coordinates: [22.3039, 70.8022]
      },
      {
        timestamp: "2025-01-20T13:30:00Z",
        location: "Distribution Center, Surat",
        event: "Critical breach",
        notes: "Temperature exceeded safe limits for 2+ hours during transit",
        temperature: 13.8,
        humidity: 68,
        coordinates: [21.1702, 72.8311]
      },
      {
        timestamp: "2025-01-20T15:45:00Z",
        location: "Retail Store, Mumbai",
        event: "Delivered",
        notes: "Cooling restored upon arrival, but quality compromised",
        temperature: 7.2,
        humidity: 60,
        coordinates: [19.0760, 72.8777]
      }
    ]
  },
  {
    productId: "BERRY456",
    productName: "Organic Strawberries",
    batchId: "BATCH_S_089",
    productType: "strawberries",
    idealTempRange: [0, 4],
    idealHumidityRange: [85, 95],
    imageUrl: "https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400",
    blockchainHash: "0x2a3b4c5d6e7f8901bcdef2345678901bcdef2345",
    tamperingDetected: true,
    sensorReadings: [
      {
        timestamp: "2025-01-20T05:00:00Z",
        temperature: 2.1,
        humidity: 90,
        location: "Strawberry Farm, Mahabaleshwar",
        sensorId: "SENSOR_002",
        coordinates: [17.9334, 73.6582],
        blockchainHash: "0x2a3b4c5d6e7f8901bcdef2345678901bcdef2345"
      },
      {
        timestamp: "2025-01-20T06:00:00Z",
        temperature: 1.9,
        humidity: 89,
        location: "Strawberry Farm, Mahabaleshwar",
        sensorId: "SENSOR_002",
        coordinates: [17.9334, 73.6582],
        blockchainHash: "0x3b4c5d6e7f8901bcdef2345678901bcdef234567"
      },
      {
        timestamp: "2025-01-20T07:00:00Z",
        temperature: 1.8,
        humidity: 88,
        location: "Packing Facility, Pune",
        sensorId: "SENSOR_002",
        coordinates: [18.5204, 73.8567],
        blockchainHash: "0x4c5d6e7f8901bcdef2345678901bcdef23456789"
      },
      {
        timestamp: "2025-01-20T08:00:00Z",
        temperature: 2.2,
        humidity: 91,
        location: "Packing Facility, Pune",
        sensorId: "SENSOR_002",
        coordinates: [18.5204, 73.8567],
        blockchainHash: "0x5d6e7f8901bcdef2345678901bcdef2345678901"
      },
      {
        timestamp: "2025-01-20T09:00:00Z",
        temperature: 2.5,
        humidity: 92,
        location: "Cold Transport, Nashik",
        sensorId: "SENSOR_002",
        coordinates: [19.9975, 73.7898],
        blockchainHash: "0x6e7f8901bcdef2345678901bcdef234567890123"
      },
      {
        timestamp: "2025-01-20T10:00:00Z",
        temperature: 2.8,
        humidity: 90,
        location: "Cold Transport, Nashik",
        sensorId: "SENSOR_002",
        coordinates: [19.9975, 73.7898],
        blockchainHash: "0x7f8901bcdef2345678901bcdef23456789012345"
      },
      {
        timestamp: "2025-01-20T11:00:00Z",
        temperature: 3.2,
        humidity: 89,
        location: "Distribution Hub, Aurangabad",
        sensorId: "SENSOR_002",
        coordinates: [19.8762, 75.3433],
        blockchainHash: "0x8901bcdef2345678901bcdef2345678901234567"
      },
      {
        timestamp: "2025-01-20T12:00:00Z",
        temperature: 1.5,
        humidity: 88,
        location: "Distribution Hub, Aurangabad",
        sensorId: "SENSOR_002",
        coordinates: [19.8762, 75.3433],
        blockchainHash: "0x901bcdef2345678901bcdef234567890123456789",
        tampered: true
      },
      {
        timestamp: "2025-01-20T13:00:00Z",
        temperature: 2.8,
        humidity: 91,
        location: "Retail Store, Nagpur",
        sensorId: "SENSOR_002",
        coordinates: [21.1458, 79.0882],
        blockchainHash: "0xa01bcdef2345678901bcdef23456789012345678"
      }
    ],
    journeyLog: [
      {
        timestamp: "2025-01-20T04:30:00Z",
        location: "Strawberry Farm, Mahabaleshwar",
        event: "Harvest completed",
        notes: "Fresh strawberries picked at optimal ripeness in hill station",
        temperature: 2.1,
        humidity: 90,
        coordinates: [17.9334, 73.6582]
      },
      {
        timestamp: "2025-01-20T06:15:00Z",
        location: "Packing Facility, Pune",
        event: "Quality inspection",
        notes: "All berries passed quality check at processing center",
        temperature: 1.8,
        humidity: 88,
        coordinates: [18.5204, 73.8567]
      },
      {
        timestamp: "2025-01-20T08:45:00Z",
        location: "Cold Transport, Nashik",
        event: "Loaded for delivery",
        notes: "Proper cold chain maintained during wine country transit",
        temperature: 2.5,
        humidity: 92,
        coordinates: [19.9975, 73.7898]
      },
      {
        timestamp: "2025-01-20T11:30:00Z",
        location: "Distribution Hub, Aurangabad",
        event: "Data tampering detected",
        notes: "Blockchain verification failed - sensor data has been tampered with",
        temperature: 1.5,
        humidity: 88,
        coordinates: [19.8762, 75.3433]
      },
      {
        timestamp: "2025-01-20T12:30:00Z",
        location: "Retail Store, Nagpur",
        event: "Delivered with warning",
        notes: "Product delivered but flagged due to data integrity issues",
        temperature: 2.8,
        humidity: 91,
        coordinates: [21.1458, 79.0882]
      }
    ]
  },
  {
    productId: "CHICK789",
    productName: "Free Range Chicken",
    batchId: "BATCH_C_123",
    productType: "chicken",
    idealTempRange: [-2, 4],
    idealHumidityRange: [75, 85],
    imageUrl: "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400",
    blockchainHash: "0x3a4b5c6d7e8f9012cdef3456789012cdef345678",
    tamperingDetected: false,
    sensorReadings: [
      {
        timestamp: "2025-01-20T04:00:00Z",
        temperature: 1.5,
        humidity: 80,
        location: "Processing Plant, Bangalore",
        sensorId: "SENSOR_003",
        coordinates: [12.9716, 77.5946],
        blockchainHash: "0x3a4b5c6d7e8f9012cdef3456789012cdef345678"
      },
      {
        timestamp: "2025-01-20T05:00:00Z",
        temperature: 1.8,
        humidity: 79,
        location: "Processing Plant, Bangalore",
        sensorId: "SENSOR_003",
        coordinates: [12.9716, 77.5946],
        blockchainHash: "0x4b5c6d7e8f9012cdef3456789012cdef34567890"
      },
      {
        timestamp: "2025-01-20T06:00:00Z",
        temperature: 2.2,
        humidity: 78,
        location: "Cold Storage, Hosur",
        sensorId: "SENSOR_003",
        coordinates: [12.7409, 77.8253],
        blockchainHash: "0x5c6d7e8f9012cdef3456789012cdef3456789012"
      },
      {
        timestamp: "2025-01-20T07:00:00Z",
        temperature: 2.8,
        humidity: 80,
        location: "Cold Storage, Hosur",
        sensorId: "SENSOR_003",
        coordinates: [12.7409, 77.8253],
        blockchainHash: "0x6d7e8f9012cdef3456789012cdef345678901234"
      },
      {
        timestamp: "2025-01-20T08:00:00Z",
        temperature: 6.8,
        humidity: 82,
        location: "Loading Dock, Chennai",
        sensorId: "SENSOR_003",
        coordinates: [13.0827, 80.2707],
        blockchainHash: "0x7e8f9012cdef3456789012cdef34567890123456"
      },
      {
        timestamp: "2025-01-20T09:00:00Z",
        temperature: 7.5,
        humidity: 84,
        location: "Loading Dock, Chennai",
        sensorId: "SENSOR_003",
        coordinates: [13.0827, 80.2707],
        blockchainHash: "0x8f9012cdef3456789012cdef3456789012345678"
      },
      {
        timestamp: "2025-01-20T10:00:00Z",
        temperature: 8.2,
        humidity: 85,
        location: "Transport Vehicle, Vellore",
        sensorId: "SENSOR_003",
        coordinates: [12.9165, 79.1325],
        blockchainHash: "0x9012cdef3456789012cdef345678901234567890"
      },
      {
        timestamp: "2025-01-20T11:00:00Z",
        temperature: 6.1,
        humidity: 83,
        location: "Transport Vehicle, Vellore",
        sensorId: "SENSOR_003",
        coordinates: [12.9165, 79.1325],
        blockchainHash: "0xa012cdef3456789012cdef34567890123456789a"
      },
      {
        timestamp: "2025-01-20T12:00:00Z",
        temperature: 3.1,
        humidity: 79,
        location: "Butcher Shop, Coimbatore",
        sensorId: "SENSOR_003",
        coordinates: [11.0168, 76.9558],
        blockchainHash: "0xb012cdef3456789012cdef34567890123456789ab"
      }
    ],
    journeyLog: [
      {
        timestamp: "2025-01-20T03:30:00Z",
        location: "Processing Plant, Bangalore",
        event: "Processing completed",
        notes: "Chicken processed and packaged at modern facility",
        temperature: 1.5,
        humidity: 80,
        coordinates: [12.9716, 77.5946]
      },
      {
        timestamp: "2025-01-20T05:45:00Z",
        location: "Cold Storage, Hosur",
        event: "Quality control",
        notes: "Temperature and quality verified at border facility",
        temperature: 2.2,
        humidity: 78,
        coordinates: [12.7409, 77.8253]
      },
      {
        timestamp: "2025-01-20T07:30:00Z",
        location: "Loading Dock, Chennai",
        event: "Temperature spike",
        notes: "Loading dock door left open during Chennai port operations",
        temperature: 6.8,
        humidity: 82,
        coordinates: [13.0827, 80.2707]
      },
      {
        timestamp: "2025-01-20T09:15:00Z",
        location: "Transport Vehicle, Vellore",
        event: "Critical breach",
        notes: "Refrigeration unit delayed start on NH48 - high temperature",
        temperature: 8.2,
        humidity: 85,
        coordinates: [12.9165, 79.1325]
      },
      {
        timestamp: "2025-01-20T11:45:00Z",
        location: "Butcher Shop, Coimbatore",
        event: "Delivered",
        notes: "Temperature normalized but quality may be affected",
        temperature: 3.1,
        humidity: 79,
        coordinates: [11.0168, 76.9558]
      }
    ]
  }
];

export const getProductByBatchId = (batchId: string): Product | undefined => {
  return mockProducts.find(product => product.batchId === batchId);
};

// Keep the old function for backward compatibility
export const getProductById = (productId: string): Product | undefined => {
  return mockProducts.find(product => product.productId === productId);
};