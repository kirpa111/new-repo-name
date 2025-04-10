// Sample equipment report based on the provided PDF
export const equipmentSampleData = {
  vin: "WAUZZZ******1453", // Masked VIN
  make: "Audi",
  model: "RS e-tron GT",
  year: 2022,
  engine: "EBGA",
  transmission: "UYT",
  color: "6Y / Z7S (Daytona grey pearl effect)",
  trim: "Premium Plus",
  mileage: 15000,
  accidents: 0,
  recalls: 0,
  // Complete data from the PDF file
  basicInfo: {
    vin: "WAUZZZ******1453", // Masked VIN
    model: "Audi RS e-tron GT",
    sType: "F83RH7",
    engineCode: "EBGA",
    transmissionCode: "UYT",
    dateOfProduction: "24.06.2021",
    modelYear: "2022",
    equipment: "JN",
    roofColour: "6Y",
    exteriorColour: "6Y / Z7S (Daytona grey pearl effect)",
  },
  technicalInfo: {
    selfPickUp: {
      code: "A00",
      description: "No self-collection"
    },
    manufacturer: {
      code: "A51",
      description: "Audi AG"
    },
    equipmentLines: {
      code: "A8H",
      description: "Top sports equipment"
    },
    qualityClass: {
      code: "AQ0",
      description: "Standard-production quality"
    },
    drivingSide: {
      code: "AV1",
      description: "Driving on the right"
    },
    typeApproval: {
      code: "B01",
      description: "Type approval country Germany"
    },
    partSet: {
      code: "B0A",
      description: "Part set without country-specific prescriptive standard"
    },
    operatingLicense: {
      code: "C01",
      description: "Operating permit, alteration"
    },
    specialEditions: {
      code: "E0A",
      description: "No special edition"
    },
    chargingCable: {
      code: "EH1",
      description: "Length of charging cable: standard"
    },
    wirelessCharging: {
      code: "EK0",
      description: "Without wireless charging"
    },
    regionalCodes: {
      code: "ER1",
      description: "Regional code \"ECE\" for radio"
    },
    vehicleInlets: {
      code: "ES7",
      description: "Vehicle inlet Combo 2 (EU)"
    },
    vehicleSpecifications: {
      code: "F0A",
      description: "No special purpose vehicle, standard equipment"
    },
    productionControl: {
      code: "FA0",
      description: "Control of series production"
    },
    variants: {
      code: "FN1",
      description: "\"RS\" version"
    },
    featuresOnDemand: {
      code: "FP1",
      description: "Functions-on-demand features online available"
    },
    parkAssist: {
      code: "FT1",
      description: "Park assist with remote control"
    },
    naviSystem: {
      code: "FZ9",
      description: "N.N.A. Standard"
    }
  },
  equipment: [
    "Top sports equipment (A8H)",
    "Standard-production quality (AQ0)",
    "Driving on the right (AV1)",
    "Type approval country Germany (B01)",
    "Part set without country-specific prescriptive standard (B0A)",
    "Operating permit, alteration (C01)",
    "No special edition (E0A)",
    "Length of charging cable: standard (EH1)",
    "Without wireless charging (EK0)",
    "Regional code \"ECE\" for radio (ER1)",
    "Vehicle inlet Combo 2 (EU) (ES7)",
    "No special purpose vehicle, standard equipment (F0A)",
    "Control of series production (FA0)",
    "\"RS\" version (FN1)",
    "Functions-on-demand features online available (FP1)",
    "Park assist with remote control (FT1)",
    "N.N.A. Standard (FZ9)",
    "S-type F83RH7",
    "Equipment lines JN",
    "Roof Colour 6Y",
    "Self pick-up/special control A00 - No self-collection",
    "Manufacturer A51 - Audi AG"
  ],
  serviceHistory: []
};

// Sample service history report based on the provided PDF
export const serviceHistorySampleData = {
  vin: "WAUZZZ******1453", // Masked VIN
  make: "Audi",
  model: "RS e-tron GT",
  year: 2022,
  engine: "EBGA",
  transmission: "UYT",
  color: "6Y / Z7S (Daytona grey pearl effect)",
  trim: "Premium Plus",
  mileage: 33513, // Updated to latest mileage
  accidents: 0,
  recalls: 0,
  equipment: [],
  serviceHistory: [
    { 
      date: "2024-01-31", 
      mileage: 33513, 
      service: "Workshop service", 
      details: "Regular maintenance at Audi service",
      dealership: "DE27149",
      completeRecord: "33513 km"
    },
    { 
      date: "2024-01-31", 
      mileage: 33513, 
      service: "Service record", 
      details: "Inspection",
      dealership: "DE27149",
      completeRecord: "33513 km"
    },
    { 
      date: "2023-01-16", 
      mileage: 19367, 
      service: "Workshop service", 
      details: "Regular maintenance at Audi service",
      dealership: "DE27149",
      completeRecord: "19367 km"
    },
    { 
      date: "2023-01-16", 
      mileage: 19367, 
      service: "Workshop service", 
      details: "Regular maintenance at Audi service",
      dealership: "DE27149",
      completeRecord: "19367 km"
    },
    { 
      date: "2022-11-01", 
      mileage: 12048, 
      service: "Workshop service", 
      details: "Regular maintenance at Audi service",
      dealership: "DE27149",
      completeRecord: "12048 km"
    },
    { 
      date: "2022-06-21", 
      mileage: 1, 
      service: "Service record", 
      details: "Delivery inspection",
      dealership: "DE27149",
      completeRecord: "1 km"
    }
  ],
  digitalServiceSchedule: {
    printLanguage: "en-GB (UKE english)",
    dateOfDelivery: "2022-01-03",
    dealership: "DE27149",
    serviceRecords: [
      {
        date: "2024-01-31",
        mileage: "33513 km",
        type: "Workshop service",
        dealership: "Audi service"
      },
      {
        date: "2024-01-31",
        mileage: "33513 km",
        type: "Inspection",
        dealership: "Audi service"
      },
      {
        date: "2023-01-16",
        mileage: "19367 km",
        type: "Workshop service",
        dealership: "Audi service"
      },
      {
        date: "2023-01-16",
        mileage: "19367 km",
        type: "Workshop service",
        dealership: "Audi service"
      },
      {
        date: "2022-11-01",
        mileage: "12048 km",
        type: "Workshop service",
        dealership: "Audi service"
      },
      {
        date: "2022-06-21",
        mileage: "1 km",
        type: "Delivery inspection",
        dealership: "Audi service"
      }
    ]
  }
};
