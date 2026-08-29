// Dynamic Plot Series & Real-Time Pricing Calculation Engine for Faisal Hills

export interface PlotItem {
  id: string;
  plotNumber: number;
  blockSlug: string;
  blockName: string;
  category: 'residential' | 'commercial';
  size: string; // '5 Marla' | '8 Marla' | '10 Marla' | '14 Marla' | '1 Kanal'
  dimensions: string;
  price: number; // in PKR
  locationType: 'Corner' | 'Park Facing' | 'Main Boulevard' | 'Standard' | 'Corner + Park' | 'Corner + Boulevard' | 'West Open';
  status: 'available' | 'reserved' | 'sold';
  features: string[];
  demandRange?: string;
  suitability?: string;
}

export interface SeriesConfig {
  start: number;
  end: number;
  label: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  suitability?: string;
}

export interface SeriesGroupResult {
  seriesKey: string;
  label: string;
  rangeStart: number;
  rangeEnd: number;
  tag?: string;
  totalPlots: number;
  availablePlots: number;
  minPrice: number;
  maxPrice: number;
  formattedRange: string; // e.g. "PKR 65 Lac – 74 Lac"
  plots: PlotItem[];
}

export interface FixedPriceConfig {
  price: number;
  formattedPrice: string;
  dimensions: string;
  installmentMonths: number;
  quarterlyInstallment: string;
}

export interface BlockConfig {
  slug: string;
  name: string;
  pricingMode: 'dynamic_series' | 'fixed_price';
  fixedPrices?: Record<string, FixedPriceConfig>;
  seriesConfigs?: Record<string, SeriesConfig[]>;
}

// Format PKR numbers cleanly (e.g. 6500000 -> "PKR 65 Lac", 18500000 -> "PKR 1.85 Cr")
export function formatPKR(amount: number): string {
  if (!amount || amount <= 0) return 'Price on Request';
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `PKR ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  const lac = amount / 100000;
  return `PKR ${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(1)} Lac`;
}

// Format range min–max
export function formatPriceRange(min: number, max: number): string {
  if (min <= 0 && max <= 0) return 'Price on Request';
  if (min === max || max <= 0) return formatPKR(min);
  if (min <= 0) return formatPKR(max);
  
  const minStr = formatPKR(min).replace('PKR ', '');
  const maxStr = formatPKR(max);
  return `PKR ${minStr} – ${maxStr.replace('PKR ', '')}`;
}

// Get standard dimensions automatically based on plot size
export function getStandardDimensionsForSize(size: string): string {
  const s = (size || '').toLowerCase().trim();
  if (s.includes('2 kanal') || s.includes('2kanal')) return '75 × 120 ft';
  if (s.includes('1 kanal') || s.includes('1kanal')) return '50 × 90 ft';
  if (s.includes('14 marla') || s.includes('14marla')) return '40 × 80 ft';
  if (s.includes('10 marla') || s.includes('10marla')) return '35 × 70 ft';
  if (s.includes('8 marla') || s.includes('8marla')) return '30 × 60 ft';
  if (s.includes('5.33')) return '40 × 30 ft';
  if (s.includes('4 marla') || s.includes('4marla')) return '30 × 30 ft';
  if (s.includes('5 marla') || s.includes('5marla')) return '25 × 50 ft';
  return '25 × 50 ft';
}

// Master Series Configuration per Block & Size
export const BLOCK_SERIES_CONFIGS: Record<string, BlockConfig> = {
  'executive-block': {
    slug: 'executive-block',
    name: 'Executive Block',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 342, end: 450, label: '342–450', tag: 'Entrance Boulevard Sector', minPrice: 6500000, maxPrice: 7400000 },
        { start: 451, end: 550, label: '451–550', tag: 'Central Park Sector', minPrice: 7000000, maxPrice: 7600000 },
        { start: 551, end: 650, label: '551–650', tag: 'Civic & Mosque Sector', minPrice: 7200000, maxPrice: 7800000 },
        { start: 651, end: 750, label: '651–750', tag: 'School Proximity Sector', minPrice: 7100000, maxPrice: 7900000 },
        { start: 751, end: 850, label: '751–850', tag: 'Residential Avenue', minPrice: 6800000, maxPrice: 7500000 },
        { start: 851, end: 950, label: '851–950', tag: 'Quiet Residential Enclave', minPrice: 6600000, maxPrice: 7400000 },
        { start: 951, end: 1050, label: '951–1050', tag: 'Executive Heights Sector', minPrice: 7300000, maxPrice: 8200000 },
        { start: 1051, end: 1191, label: '1051–1191', tag: 'Faisal Jewel View Sector', minPrice: 7500000, maxPrice: 8500000 },
      ],
      '8 Marla': [
        { start: 100, end: 250, label: '100–250', tag: 'Main Boulevard & Park', minPrice: 9500000, maxPrice: 11000000 },
        { start: 251, end: 400, label: '251–400', tag: 'Executive Residential', minPrice: 9000000, maxPrice: 10500000 },
        { start: 401, end: 550, label: '401–550', tag: 'Civic Center Proximity', minPrice: 9800000, maxPrice: 11500000 },
      ],
      '10 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Central Park & School', minPrice: 12500000, maxPrice: 14500000 },
        { start: 151, end: 300, label: '151–300', tag: 'Executive Avenue', minPrice: 12000000, maxPrice: 13800000 },
        { start: 301, end: 450, label: '301–450', tag: 'Prime Elevation Sector', minPrice: 13000000, maxPrice: 15500000 },
      ],
      '14 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Luxury Boulevard Frontage', minPrice: 16500000, maxPrice: 19500000 },
        { start: 101, end: 200, label: '101–200', tag: 'Executive Panorama Sector', minPrice: 16000000, maxPrice: 18800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 80, label: '001–080', tag: 'Grand Entrance Boulevard', minPrice: 22000000, maxPrice: 26500000 },
        { start: 81, end: 160, label: '081–160', tag: 'Margalla View Enclave', minPrice: 21000000, maxPrice: 25000000 },
        { start: 161, end: 250, label: '161–250', tag: 'VIP Sector Frontage', minPrice: 23500000, maxPrice: 28000000 },
      ],
    },
  },
  'block-a': {
    slug: 'block-a',
    name: 'Block A',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 200, label: '001–200', tag: 'Main Boulevard Front', minPrice: 5800000, maxPrice: 6800000 },
        { start: 201, end: 400, label: '201–400', tag: 'Central Commercial Sector', minPrice: 6200000, maxPrice: 7200000 },
        { start: 401, end: 600, label: '401–600', tag: 'Family Park Enclave', minPrice: 6000000, maxPrice: 6900000 },
        { start: 601, end: 800, label: '601–800', tag: 'Executive Living Sector', minPrice: 5900000, maxPrice: 6700000 },
      ],
      '8 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Central Avenue', minPrice: 8500000, maxPrice: 9800000 },
        { start: 151, end: 300, label: '151–300', tag: 'Park Facing Horizon', minPrice: 8900000, maxPrice: 10200000 },
      ],
      '10 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Park Facing Enclave', minPrice: 11500000, maxPrice: 13500000 },
        { start: 151, end: 300, label: '151–300', tag: 'Executive Heights', minPrice: 11000000, maxPrice: 12800000 },
        { start: 301, end: 450, label: '301–450', tag: 'Mosque & Market Sector', minPrice: 11800000, maxPrice: 13800000 },
      ],
      '14 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Main Boulevard Luxury', minPrice: 15000000, maxPrice: 17500000 },
        { start: 101, end: 200, label: '101–200', tag: 'Grand Avenue Enclave', minPrice: 14500000, maxPrice: 16800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Grand Boulevard Frontage', minPrice: 19500000, maxPrice: 23500000 },
        { start: 101, end: 200, label: '101–200', tag: 'Margalla Skyline Front', minPrice: 19000000, maxPrice: 22500000 },
      ],
    },
  },
  'block-b': {
    slug: 'block-b',
    name: 'Block B',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 200, label: '001–200', tag: 'Grand Boulevard Sector', minPrice: 5200000, maxPrice: 6100000 },
        { start: 201, end: 400, label: '201–400', tag: 'Sports Complex Sector', minPrice: 5400000, maxPrice: 6300000 },
        { start: 401, end: 600, label: '401–600', tag: 'Central Park Sector', minPrice: 5600000, maxPrice: 6500000 },
        { start: 601, end: 850, label: '601–850', tag: 'Margalla View Crest', minPrice: 5300000, maxPrice: 6200000 },
      ],
      '8 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Avenue Sector', minPrice: 7800000, maxPrice: 8900000 },
        { start: 151, end: 300, label: '151–300', tag: 'Sports Park View', minPrice: 8200000, maxPrice: 9400000 },
      ],
      '10 Marla': [
        { start: 1, end: 200, label: '001–200', tag: 'Hilltop Promenade', minPrice: 10500000, maxPrice: 12200000 },
        { start: 201, end: 400, label: '201–400', tag: 'Boulevard Enclave', minPrice: 10200000, maxPrice: 11800000 },
      ],
      '14 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Executive Ridge', minPrice: 14000000, maxPrice: 16200000 },
      ],
      '1 Kanal': [
        { start: 1, end: 120, label: '001–120', tag: 'Margalla Panorama Crest', minPrice: 18000000, maxPrice: 21500000 },
        { start: 121, end: 250, label: '121–250', tag: 'Grand Boulevard Facing', minPrice: 18500000, maxPrice: 22000000 },
      ],
    },
  },
  'block-b1-extension': {
    slug: 'block-b1-extension',
    name: 'Block B-1 Extension',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Avenue Sector', minPrice: 4200000, maxPrice: 4900000 },
        { start: 151, end: 300, label: '151–300', tag: 'Central Green Enclave', minPrice: 4400000, maxPrice: 5100000 },
        { start: 301, end: 450, label: '301–450', tag: 'Margalla Hill View', minPrice: 4600000, maxPrice: 5300000 },
        { start: 451, end: 600, label: '451–600', tag: 'High-Elevation Crest', minPrice: 4700000, maxPrice: 5400000 },
      ],
      '8 Marla': [
        { start: 1, end: 120, label: '001–120', tag: 'Boulevard Link Sector', minPrice: 6200000, maxPrice: 7100000 },
        { start: 121, end: 240, label: '121–240', tag: 'Community Park Facing', minPrice: 6600000, maxPrice: 7500000 },
      ],
      '10 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Executive Hilltop Crest', minPrice: 7800000, maxPrice: 9200000 },
        { start: 101, end: 200, label: '101–200', tag: 'Panoramic Ridge Avenue', minPrice: 8000000, maxPrice: 9400000 },
      ],
      '14 Marla': [
        { start: 1, end: 80, label: '001–080', tag: 'Hilltop Avenue', minPrice: 11000000, maxPrice: 12800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Exclusive Panoramic Ridge', minPrice: 15000000, maxPrice: 17800000 },
      ],
    },
  },
  'b-1-extension': {
    slug: 'b-1-extension',
    name: 'Block B-1 Extension',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Avenue Sector', minPrice: 4200000, maxPrice: 4900000 },
        { start: 151, end: 300, label: '151–300', tag: 'Central Green Enclave', minPrice: 4400000, maxPrice: 5100000 },
        { start: 301, end: 450, label: '301–450', tag: 'Margalla Hill View', minPrice: 4600000, maxPrice: 5300000 },
        { start: 451, end: 600, label: '451–600', tag: 'High-Elevation Crest', minPrice: 4700000, maxPrice: 5400000 },
      ],
      '8 Marla': [
        { start: 1, end: 120, label: '001–120', tag: 'Boulevard Link Sector', minPrice: 6200000, maxPrice: 7100000 },
        { start: 121, end: 240, label: '121–240', tag: 'Community Park Facing', minPrice: 6600000, maxPrice: 7500000 },
      ],
      '10 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Executive Hilltop Crest', minPrice: 7800000, maxPrice: 9200000 },
      ],
      '14 Marla': [
        { start: 1, end: 80, label: '001–080', tag: 'Hilltop Avenue', minPrice: 11000000, maxPrice: 12800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Exclusive Panoramic Ridge', minPrice: 15000000, maxPrice: 17800000 },
      ],
    },
  },
  'block-b1': {
    slug: 'block-b1',
    name: 'Block B-1 Extension',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Avenue Sector', minPrice: 4200000, maxPrice: 4900000 },
        { start: 151, end: 300, label: '151–300', tag: 'Central Green Enclave', minPrice: 4400000, maxPrice: 5100000 },
        { start: 301, end: 450, label: '301–450', tag: 'Margalla Hill View', minPrice: 4600000, maxPrice: 5300000 },
        { start: 451, end: 600, label: '451–600', tag: 'High-Elevation Crest', minPrice: 4700000, maxPrice: 5400000 },
      ],
      '8 Marla': [
        { start: 1, end: 120, label: '001–120', tag: 'Boulevard Link Sector', minPrice: 6200000, maxPrice: 7100000 },
        { start: 121, end: 240, label: '121–240', tag: 'Community Park Facing', minPrice: 6600000, maxPrice: 7500000 },
      ],
      '10 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Executive Hilltop Crest', minPrice: 7800000, maxPrice: 9200000 },
      ],
      '14 Marla': [
        { start: 1, end: 80, label: '001–080', tag: 'Hilltop Avenue', minPrice: 11000000, maxPrice: 12800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Exclusive Panoramic Ridge', minPrice: 15000000, maxPrice: 17800000 },
      ],
    },
  },
  'block-c': {
    slug: 'block-c',
    name: 'Block C',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 200, label: '001–200', tag: 'Hills Walk Promenade Sector', minPrice: 5500000, maxPrice: 6500000 },
        { start: 201, end: 400, label: '201–400', tag: 'Cricket Stadium & Park Axis', minPrice: 5700000, maxPrice: 6700000 },
        { start: 401, end: 600, label: '401–600', tag: 'Civic Commercial Hub Sector', minPrice: 5900000, maxPrice: 6900000 },
      ],
      '8 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Central Boulevard Facing', minPrice: 8200000, maxPrice: 9500000 },
        { start: 151, end: 300, label: '151–300', tag: 'Lake & Park Vista', minPrice: 8600000, maxPrice: 9900000 },
      ],
      '10 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Commercial Strip Proximity', minPrice: 11000000, maxPrice: 12800000 },
        { start: 151, end: 300, label: '151–300', tag: 'Executive Family Enclave', minPrice: 10800000, maxPrice: 12500000 },
      ],
      '14 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Civic Vista Avenue', minPrice: 14500000, maxPrice: 16800000 },
      ],
      '1 Kanal': [
        { start: 1, end: 120, label: '001–120', tag: 'Grand Boulevard Waterfront Enclave', minPrice: 19500000, maxPrice: 23500000 },
        { start: 121, end: 250, label: '121–250', tag: 'Hills Walk Skyline View', minPrice: 20000000, maxPrice: 24500000 },
      ],
    },
  },
  'block-d': {
    slug: 'block-d',
    name: 'Block D',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Margalla Boulevard Front', minPrice: 4800000, maxPrice: 5600000 },
        { start: 151, end: 300, label: '151–300', tag: 'Sector Park & Mosque Facing', minPrice: 5100000, maxPrice: 5900000 },
        { start: 301, end: 450, label: '301–450', tag: 'Ready Possession Sector', minPrice: 5300000, maxPrice: 6200000 },
        { start: 451, end: 600, label: '451–600', tag: 'Elevated Scenic Vista', minPrice: 4900000, maxPrice: 5700000 },
      ],
      '8 Marla': [
        { start: 1, end: 120, label: '001–120', tag: 'Main Avenue Sector', minPrice: 7200000, maxPrice: 8300000 },
        { start: 121, end: 240, label: '121–240', tag: 'Central Green Enclave', minPrice: 7500000, maxPrice: 8700000 },
      ],
      '10 Marla': [
        { start: 1, end: 120, label: '001–120', tag: 'Executive Heights Crest', minPrice: 9500000, maxPrice: 11200000 },
        { start: 121, end: 250, label: '121–250', tag: 'Margalla Hilltop Avenue', minPrice: 9800000, maxPrice: 11600000 },
      ],
      '14 Marla': [
        { start: 1, end: 80, label: '001–080', tag: 'Prime Elevation Sector', minPrice: 13000000, maxPrice: 15200000 },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Margalla Skyline Panorama', minPrice: 17000000, maxPrice: 20500000 },
      ],
    },
  },
  'prime-block': {
    slug: 'prime-block',
    name: 'Prime Block',
    pricingMode: 'fixed_price',
  },
};

// Initial realistic seed inventory for Faisal Hills Executive Block & other blocks
export const INITIAL_PLOTS_INVENTORY: PlotItem[] = [
  // 5 Marla Series 342–450 (Entrance Boulevard Sector)
  {
    id: 'exe-5m-348',
    plotNumber: 348,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 6800000,
    locationType: 'Corner',
    status: 'available',
    features: ['Direct GT Entrance', '25ft Road', 'Underground Utilities'],
    demandRange: '+12% High Demand',
    suitability: 'First-time buyers & rapid construction',
  },
  {
    id: 'exe-5m-392',
    plotNumber: 392,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 6500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Solid Ground', 'Immediate Possession', 'Sewerage Ready'],
    demandRange: '+10% Steady Growth',
    suitability: 'Compact family villa',
  },
  {
    id: 'exe-5m-415',
    plotNumber: 415,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7400000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Park View', 'Walking to Mosque', 'Prime Elevation'],
    demandRange: '+15% Premium Yield',
    suitability: 'Executive living near park',
  },

  // 5 Marla Series 451–550 (Central Park Sector)
  {
    id: 'exe-5m-462',
    plotNumber: 462,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7000000,
    locationType: 'Standard',
    status: 'available',
    features: ['Carpeted Street', 'Underground Gas & Elec', 'Street Lights'],
    demandRange: '+11% Fast Moving',
    suitability: 'Smart investment',
  },
  {
    id: 'exe-5m-512',
    plotNumber: 512,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7600000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Dual Frontage', 'Direct Park Access', 'Wide Boulevard'],
    demandRange: '+16% High Demand',
    suitability: 'Luxury compact home',
  },

  // 5 Marla Series 551–650 (Civic & Mosque Sector)
  {
    id: 'exe-5m-580',
    plotNumber: 580,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7200000,
    locationType: 'Standard',
    status: 'available',
    features: ['Near Jamia Mosque', 'Walking Distance to Market'],
    demandRange: '+12% Steady',
    suitability: 'Family home',
  },
  {
    id: 'exe-5m-630',
    plotNumber: 630,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7800000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Boulevard Facing', 'High Commercial Value Nearby'],
    demandRange: '+14% Premium',
    suitability: 'Prime location investment',
  },

  // 5 Marla Series 651–750 (School Proximity Sector)
  {
    id: 'exe-5m-695',
    plotNumber: 695,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7500000,
    locationType: 'Standard',
    status: 'available',
    features: ['2 Min to Roots School', 'Family Friendly'],
    demandRange: '+13% High Demand',
    suitability: 'Family residence',
  },
  {
    id: 'exe-5m-740',
    plotNumber: 740,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 8200000,
    locationType: 'Corner',
    status: 'available',
    features: ['Corner Extra Land', 'Double Story Approved'],
    demandRange: '+17% High Yield',
    suitability: 'High ROI rental property',
  },

  // 5 Marla Series 751–850
  {
    id: 'exe-5m-788',
    plotNumber: 788,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 7800000,
    locationType: 'Standard',
    status: 'available',
    features: ['Paved Road', 'Instant Registry Ready'],
    demandRange: '+12% Steady',
    suitability: 'Immediate construction',
  },
  {
    id: 'exe-5m-835',
    plotNumber: 835,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 8500000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Lush Green View', 'West Open', 'Ventilated'],
    demandRange: '+15% Premium',
    suitability: 'Modern architectural villa',
  },

  // 5 Marla Series 851–950
  {
    id: 'exe-5m-890',
    plotNumber: 890,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 8000000,
    locationType: 'Standard',
    status: 'available',
    features: ['Peaceful Street', 'Underground Utilities'],
    demandRange: '+11% Growth',
    suitability: 'Quiet residential',
  },

  // 5 Marla Series 951–1050
  {
    id: 'exe-5m-980',
    plotNumber: 980,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 8400000,
    locationType: 'Corner',
    status: 'available',
    features: ['Elevated Plot', 'Margalla Foothill Breeze'],
    demandRange: '+16% High Demand',
    suitability: 'Custom villa',
  },

  // 5 Marla Series 1051–1191 (Faisal Jewel View)
  {
    id: 'exe-5m-1120',
    plotNumber: 1120,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 8800000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Direct Faisal Jewel Skyline View', 'Hot Investment'],
    demandRange: '+18% Peak Value',
    suitability: 'Maximum capital appreciation',
  },

  // 8 Marla Executive Block
  {
    id: 'exe-8m-145',
    plotNumber: 145,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 10500000,
    locationType: 'Standard',
    status: 'available',
    features: ['30ft Wide Street', 'Underground Electricity', 'Water Supply'],
    demandRange: '+14% High Demand',
    suitability: 'Growing families wanting double unit designs',
  },
  {
    id: 'exe-8m-220',
    plotNumber: 220,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 12000000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Corner Plot', 'Direct Park Facing', 'Main Boulevard Access'],
    demandRange: '+18% Premium',
    suitability: 'Luxury custom villa',
  },
  {
    id: 'exe-8m-310',
    plotNumber: 310,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 11200000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Direct Main Road', 'Commercial Proximity'],
    demandRange: '+15% High Demand',
    suitability: 'High ROI property',
  },

  // 10 Marla Executive Block
  {
    id: 'exe-10m-042',
    plotNumber: 42,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 12500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Walking to Roots School', 'Underground Gas', 'Sewerage Ready'],
    demandRange: '+15% High Demand',
    suitability: 'Spacious executive home',
  },
  {
    id: 'exe-10m-118',
    plotNumber: 118,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 14800000,
    locationType: 'Corner',
    status: 'available',
    features: ['Corner Plot', '35ft Frontage', 'Near Jamia Mosque'],
    demandRange: '+19% Premium',
    suitability: 'Luxury duplex residence',
  },
  {
    id: 'exe-10m-245',
    plotNumber: 245,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 13500000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Community Park Front', 'Panoramic Margalla View'],
    demandRange: '+16% High Demand',
    suitability: 'Executive family villa',
  },

  // 14 Marla Executive Block
  {
    id: 'exe-14m-028',
    plotNumber: 28,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 15500000,
    locationType: 'Standard',
    status: 'available',
    features: ['40ft Wide Road', 'Executive Zoning', 'Lush Enclave'],
    demandRange: '+14% Steady',
    suitability: 'Large family mansion',
  },
  {
    id: 'exe-14m-075',
    plotNumber: 75,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 18500000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Main Boulevard Frontage', 'Corner Elevation', 'Faisal Jewel View'],
    demandRange: '+20% VIP Tier',
    suitability: 'Prime flagship residence',
  },

  // 1 Kanal Executive Block
  {
    id: 'exe-1k-018',
    plotNumber: 18,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 18500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Near Entrance Monument', '50ft Frontage', 'Underground Electricity'],
    demandRange: '+16% High ROI',
    suitability: 'Luxury palatial home',
  },
  {
    id: 'exe-1k-048',
    plotNumber: 48,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 24500000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Double Front Corner', 'Adjacent to Main Park', 'VIP Street'],
    demandRange: '+22% Ultra Premium',
    suitability: 'High-net-worth trophy property',
  },
  {
    id: 'exe-1k-112',
    plotNumber: 112,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 21500000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['225ft Boulevard Frontage', 'Quick GT Road Access'],
    demandRange: '+19% High Demand',
    suitability: 'Executive mansion',
  },

  // =========================================================================
  // PRIME BLOCK INVENTORY PLOTS
  // =========================================================================
  // 5 Marla Prime Block
  {
    id: 'prm-5m-045',
    plotNumber: 45,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3250000,
    locationType: 'Standard',
    status: 'available',
    features: ['Near Entrance Boulevard', 'Underground Utilities', 'Sewerage Ready'],
    demandRange: '+14% High Demand',
    suitability: 'Compact modern villa',
  },
  {
    id: 'prm-5m-088',
    plotNumber: 88,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3600000,
    locationType: 'Corner',
    status: 'available',
    features: ['Corner Plot', '30ft Wide Road', 'Direct Green Belt View'],
    demandRange: '+18% Premium',
    suitability: 'Custom corner residence',
  },
  {
    id: 'prm-5m-185',
    plotNumber: 185,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3450000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Community Park Front', 'Walking Distance to Club'],
    demandRange: '+16% High Demand',
    suitability: 'Family residence',
  },
  {
    id: 'prm-5m-240',
    plotNumber: 240,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3850000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Main Access Avenue', 'Near Jamia Mosque'],
    demandRange: '+17% High Demand',
    suitability: 'High-appreciation asset',
  },
  {
    id: 'prm-5m-340',
    plotNumber: 340,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Margalla Ridge Vista', 'Quiet Internal Street'],
    demandRange: '+15% High Demand',
    suitability: 'Peaceful modern home',
  },
  {
    id: 'prm-5m-410',
    plotNumber: 410,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4100000,
    locationType: 'Corner',
    status: 'available',
    features: ['High Elevation Corner', 'Unobstructed Hills Panorama'],
    demandRange: '+20% VIP Choice',
    suitability: 'Scenic villa build',
  },
  {
    id: 'prm-5m-490',
    plotNumber: 490,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3650000,
    locationType: 'Standard',
    status: 'available',
    features: ['Ridge Crest Position', 'Underground Electricity'],
    demandRange: '+15% High Demand',
    suitability: 'High-elevation living',
  },
  {
    id: 'prm-5m-560',
    plotNumber: 560,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4250000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Highest Point in Sector', 'Facing Linear Green Reserve'],
    demandRange: '+22% Ultra Prime',
    suitability: 'Luxury ridge residence',
  },

  // 8 Marla Prime Block
  {
    id: 'prm-8m-035',
    plotNumber: 35,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 4800000,
    locationType: 'Standard',
    status: 'available',
    features: ['Direct Boulevard Access', 'Close to Commercial Hub'],
    demandRange: '+15% High Demand',
    suitability: 'Spacious modern home',
  },
  {
    id: 'prm-8m-092',
    plotNumber: 92,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 5400000,
    locationType: 'Corner',
    status: 'available',
    features: ['Double Frontage Corner', '30ft Wide Road'],
    demandRange: '+19% Premium',
    suitability: 'Designer duplex build',
  },
  {
    id: 'prm-8m-160',
    plotNumber: 160,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 5100000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Central Park View', 'Near Jamia Mosque'],
    demandRange: '+16% High Demand',
    suitability: 'Family home facing greens',
  },
  {
    id: 'prm-8m-295',
    plotNumber: 295,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 5350000,
    locationType: 'Standard',
    status: 'available',
    features: ['Highest Ridge Crest', 'Margalla Skyline Front'],
    demandRange: '+17% High Demand',
    suitability: 'Executive crest villa',
  },
  {
    id: 'prm-8m-360',
    plotNumber: 360,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 6200000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Corner + Direct Park Front', 'Panoramic Margalla View'],
    demandRange: '+22% Ultra Prime',
    suitability: 'Luxury executive residence',
  },

  // 10 Marla Prime Block
  {
    id: 'prm-10m-042',
    plotNumber: 42,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 5850000,
    locationType: 'Standard',
    status: 'available',
    features: ['Central Boulevard Axis', 'Underground Utilities'],
    demandRange: '+16% High Demand',
    suitability: 'Executive luxury villa',
  },
  {
    id: 'prm-10m-108',
    plotNumber: 108,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 6600000,
    locationType: 'Corner',
    status: 'available',
    features: ['Prime Corner Plot', '35ft Frontage', 'Wide Avenue'],
    demandRange: '+20% Premium',
    suitability: 'Spacious duplex build',
  },
  {
    id: 'prm-10m-175',
    plotNumber: 175,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 6200000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Family Park Front', 'Near Sports Complex'],
    demandRange: '+17% High Demand',
    suitability: 'Family luxury home',
  },
  {
    id: 'prm-10m-315',
    plotNumber: 315,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 6500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Margalla Vista Sector', 'Highest Elevation Crest'],
    demandRange: '+18% High Demand',
    suitability: 'Panoramic villa build',
  },
  {
    id: 'prm-10m-370',
    plotNumber: 370,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 7500000,
    locationType: 'Corner + Boulevard',
    status: 'available',
    features: ['Boulevard Corner', 'VIP Ridge Elevation', 'Mountain Views'],
    demandRange: '+23% Trophy Plot',
    suitability: 'Flagship executive villa',
  },

  // 14 Marla Prime Block
  {
    id: 'prm-14m-025',
    plotNumber: 25,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 7650000,
    locationType: 'Standard',
    status: 'available',
    features: ['Grand Boulevard Enclave', '40ft Frontage'],
    demandRange: '+16% High Demand',
    suitability: 'Custom palatial home',
  },
  {
    id: 'prm-14m-065',
    plotNumber: 65,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 8600000,
    locationType: 'Corner',
    status: 'available',
    features: ['Double Corner', 'Boulevard Frontage'],
    demandRange: '+20% VIP Choice',
    suitability: 'Luxury custom mansion',
  },
  {
    id: 'prm-14m-125',
    plotNumber: 125,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 8200000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Panoramic Ridge Avenue', 'Direct Park View'],
    demandRange: '+18% High Demand',
    suitability: 'Grand residence',
  },
  {
    id: 'prm-14m-175',
    plotNumber: 175,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 9400000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Trophy Corner', 'Margalla Panorama'],
    demandRange: '+24% Ultra Prime',
    suitability: 'Signature mansion',
  },

  // 1 Kanal Prime Block
  {
    id: 'prm-1k-018',
    plotNumber: 18,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 9900000,
    locationType: 'Standard',
    status: 'available',
    features: ['VIP Executive Crest', '50ft Frontage', 'Wide Avenue'],
    demandRange: '+17% High Demand',
    suitability: 'Luxury 1 Kanal mansion',
  },
  {
    id: 'prm-1k-048',
    plotNumber: 48,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 11500000,
    locationType: 'Corner',
    status: 'available',
    features: ['Double Front Corner', 'Adjacent to Main Park'],
    demandRange: '+21% Ultra Premium',
    suitability: 'Trophy estate build',
  },
  {
    id: 'prm-1k-095',
    plotNumber: 95,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 10500000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Margalla Skyline Front', '225ft Boulevard Access'],
    demandRange: '+19% High Demand',
    suitability: 'Executive estate',
  },
  {
    id: 'prm-1k-185',
    plotNumber: 185,
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 13500000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Highest Point in Society', 'Unobstructed 360 Margalla View', 'VIP Street'],
    demandRange: '+25% Trophy Plot',
    suitability: 'Bespoke architectural masterpiece',
  },

  // 5 Marla Block B
  {
    id: 'blkb-5m-042',
    plotNumber: 42,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 5200000,
    locationType: 'Standard',
    status: 'available',
    features: ['Grand Boulevard Proximity', 'Carpeted Street', 'Underground Elec'],
    demandRange: '+14% High Demand',
    suitability: 'Ideal starter family villa',
  },
  {
    id: 'blkb-5m-118',
    plotNumber: 118,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 5800000,
    locationType: 'Corner',
    status: 'available',
    features: ['Double Side Open Corner', 'Wide Boulevard Link'],
    demandRange: '+18% High Yield',
    suitability: 'Corner modern residence',
  },
  {
    id: 'blkb-5m-245',
    plotNumber: 245,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 6100000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Sports Complex & Park View', 'Walking to Futsal Arena'],
    demandRange: '+20% Active Lifestyle',
    suitability: 'Sports arena park view villa',
  },
  {
    id: 'blkb-5m-480',
    plotNumber: 480,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 5500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Solid Hilltop Ground', 'Clean Demarcated Plot'],
    demandRange: '+12% Steady Value',
    suitability: 'Long-term family home',
  },
  {
    id: 'blkb-5m-680',
    plotNumber: 680,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 6400000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['Margalla Crest Front', '225ft Boulevard Link'],
    demandRange: '+22% Scenic View',
    suitability: 'Scenic mountain view residence',
  },

  // 8 Marla Block B
  {
    id: 'blkb-8m-065',
    plotNumber: 65,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 7400000,
    locationType: 'Standard',
    status: 'available',
    features: ['Avenue Frontage', 'Full Utilities', 'Possession Handover'],
    demandRange: '+15% High Demand',
    suitability: 'Spacious 8 Marla villa',
  },
  {
    id: 'blkb-8m-185',
    plotNumber: 185,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 8600000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Sector Park Facing', 'Near Jamia Mosque'],
    demandRange: '+19% Premium',
    suitability: 'Park view family home',
  },

  // 10 Marla Block B
  {
    id: 'blkb-10m-085',
    plotNumber: 85,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 9200000,
    locationType: 'Standard',
    status: 'available',
    features: ['Elevated Hilltop Ground', '35ft Wide Street'],
    demandRange: '+16% High Demand',
    suitability: 'Executive 10 Marla home',
  },
  {
    id: 'blkb-10m-240',
    plotNumber: 240,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 11200000,
    locationType: 'Corner',
    status: 'available',
    features: ['Main Boulevard Double Corner', 'Fast-Track Handover'],
    demandRange: '+22% Prime Corner',
    suitability: 'Signature 10 Marla villa',
  },

  // 14 Marla Block B
  {
    id: 'blkb-14m-035',
    plotNumber: 35,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 13500000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Park Front', 'Panoramic Ridge View'],
    demandRange: '+18% High Demand',
    suitability: 'Executive residence',
  },

  // 1 Kanal Block B
  {
    id: 'blkb-1k-045',
    plotNumber: 45,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 16500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Elevated Ridge Elevation', '50ft Frontage'],
    demandRange: '+17% High Demand',
    suitability: '1 Kanal luxury mansion',
  },
  {
    id: 'blkb-1k-095',
    plotNumber: 95,
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 19800000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Double Corner & Park Facing', 'Margalla Crest Panorama'],
    demandRange: '+24% Ultra Luxury',
    suitability: 'Trophy estate build',
  },

  // 5 Marla Block B1 Extension
  {
    id: 'b1ext-5m-045',
    plotNumber: 45,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 3900000,
    locationType: 'Standard',
    status: 'available',
    features: ['Near Main Sector Avenue', 'Solid Graded Ground', 'Fast Value Growth'],
    demandRange: '+20% High Demand',
    suitability: 'Budget-friendly entry villa investment',
  },
  {
    id: 'b1ext-5m-112',
    plotNumber: 112,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4400000,
    locationType: 'Corner',
    status: 'available',
    features: ['Prime Corner Cut', 'Wide 40ft Street Frontage'],
    demandRange: '+25% Premium Corner',
    suitability: 'Signature 5 Marla corner home',
  },
  {
    id: 'b1ext-5m-185',
    plotNumber: 185,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4600000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Direct Community Park Front', 'Walking to Mosque'],
    demandRange: '+22% High Demand',
    suitability: 'Park view modern residence',
  },
  {
    id: 'b1ext-5m-240',
    plotNumber: 240,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4100000,
    locationType: 'Standard',
    status: 'available',
    features: ['Central Green Belt Link', 'Level Plot Demarcation'],
    demandRange: '+18% Steady ROI',
    suitability: 'Family home / long term hold',
  },
  {
    id: 'b1ext-5m-340',
    plotNumber: 340,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4750000,
    locationType: 'West Open',
    status: 'available',
    features: ['Margalla Mountain View', 'Elevated Ridge Contour'],
    demandRange: '+26% Scenic View',
    suitability: 'Scenic view villa',
  },
  {
    id: 'b1ext-5m-495',
    plotNumber: 495,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4800000,
    locationType: 'Main Boulevard',
    status: 'available',
    features: ['High-Elevation Crest', 'Direct Sector Boulevard Access'],
    demandRange: '+28% Fast Track',
    suitability: 'High-growth capital appreciation plot',
  },

  // 8 Marla Block B1 Extension
  {
    id: 'b1ext-8m-055',
    plotNumber: 55,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 6200000,
    locationType: 'Standard',
    status: 'available',
    features: ['30ft Frontage', 'Boulevard Link Sector', 'Double Unit Design Ready'],
    demandRange: '+20% High Demand',
    suitability: 'Spacious family 4-bed dual unit villa',
  },
  {
    id: 'b1ext-8m-140',
    plotNumber: 140,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 6900000,
    locationType: 'Park Facing',
    status: 'available',
    features: ['Community Park Facing', 'Lush Green Vista', 'Wide Porch Space'],
    demandRange: '+24% Premium Park',
    suitability: 'Luxury park-facing family residence',
  },
  {
    id: 'b1ext-8m-210',
    plotNumber: 210,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 7100000,
    locationType: 'Corner',
    status: 'available',
    features: ['Double Side Open Corner', 'Prime Avenue Position'],
    demandRange: '+28% High Yield',
    suitability: 'Corner executive residence',
  },

  // 10 Marla Block B1 Extension
  {
    id: 'b1ext-10m-030',
    plotNumber: 30,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 7800000,
    locationType: 'Standard',
    status: 'available',
    features: ['Executive Hilltop Ridge', '35ft Front Elevation', 'Solid Base'],
    demandRange: '+22% High Demand',
    suitability: 'Executive luxury villa with garden',
  },
  {
    id: 'b1ext-10m-075',
    plotNumber: 75,
    blockSlug: 'block-b1-extension',
    blockName: 'Block B-1 Extension',
    category: 'residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 9200000,
    locationType: 'Corner + Park',
    status: 'available',
    features: ['Double Corner & Sector Park Facing', 'Unobstructed Panoramic Views'],
    demandRange: '+30% Rare Trophy',
    suitability: 'Trophy 10 Marla executive villa',
  },
];

// Calculation function to dynamically group plots into configured series & calculate Min/Max prices
export function calculateSeriesGroups(
  plots: (PlotItem | any)[],
  blockSlug: string,
  size: string,
  customConfigs?: Record<string, BlockConfig>
): SeriesGroupResult[] {
  const configs = customConfigs || BLOCK_SERIES_CONFIGS;
  const blockConfig = configs[blockSlug] || configs['executive-block'] || BLOCK_SERIES_CONFIGS[blockSlug] || BLOCK_SERIES_CONFIGS['executive-block'];
  const seriesList = blockConfig?.seriesConfigs?.[size] || [];

  const cleanTargetBlock = (blockSlug || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/^block-?/, 'block-');
  const cleanTargetSize = (size || '').toLowerCase().trim();

  // Normalize all plots from either local store, Laravel database API, or legacy schema
  const normalizedMatchedPlots: PlotItem[] = (plots || []).map((rawP: any) => {
    if (!rawP) return null;

    // Normalize block
    const rawBlock = String(rawP.blockSlug || rawP.block || rawP.block_name || '').toLowerCase().trim();
    const cleanBlock = rawBlock.replace(/\s+/g, '-').replace(/^block-?/, 'block-');

    // Extract plot number
    let pNum = 0;
    if (typeof rawP.plotNumber === 'number') {
      pNum = rawP.plotNumber;
    } else {
      const extracted = parseInt(String(rawP.plotNumber || rawP.id || '').replace(/\D/g, ''), 10);
      pNum = !isNaN(extracted) && extracted > 0 ? extracted : 1;
    }

    // Extract numerical price
    let pPrice = 0;
    if (typeof rawP.price === 'number' && rawP.price > 0) {
      pPrice = rawP.price;
    } else if (typeof rawP.priceNumber === 'number' && rawP.priceNumber > 0) {
      pPrice = rawP.priceNumber;
    } else if (typeof rawP.price === 'string') {
      const priceStr = rawP.price.toLowerCase();
      if (priceStr.includes('crore') || priceStr.includes('cr')) {
        const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) pPrice = Math.round(num * 10000000);
      } else if (priceStr.includes('lac') || priceStr.includes('lakh')) {
        const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) pPrice = Math.round(num * 100000);
      } else {
        const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) pPrice = num;
      }
    }

    const rawSize = String(rawP.size || '').toLowerCase().trim();
    const sizeNumber = cleanTargetSize.split(' ')[0]; // e.g. '5' from '5 Marla'
    const sizeMatches = rawSize.includes(sizeNumber);

    const rawCat = String(rawP.category || rawP.type || 'residential').toLowerCase().trim();
    const catMatches = rawCat.includes('res') || rawCat === '' || rawCat === 'residential';

    const blockMatches = cleanBlock === cleanTargetBlock || cleanBlock.includes(cleanTargetBlock.replace('block-', '')) || cleanTargetBlock.includes(cleanBlock.replace('block-', ''));

    if (!blockMatches || !sizeMatches || !catMatches) {
      return null;
    }

    const displayNumStr = rawP.plotNumber ? String(rawP.plotNumber) : String(pNum);

    return {
      id: String(rawP.id || `${cleanBlock}-${pNum}`),
      plotNumber: pNum,
      displayNumber: displayNumStr,
      price: pPrice,
      size: rawP.size || size,
      blockSlug: cleanBlock,
      blockName: rawP.blockName || rawP.block || 'Block A',
      category: 'residential',
      status: String(rawP.status || 'available').toLowerCase() === 'sold' ? 'sold' : 'available',
      locationType: rawP.locationType || rawP.facing || 'Standard',
      dimensions: rawP.dimensions || '25 × 50',
      features: Array.isArray(rawP.features) ? rawP.features : [rawP.facing || 'Standard'],
      demandRange: rawP.demandRange || 'Live Market Rate',
      suitability: rawP.suitability || 'Residential Construction',
    } as PlotItem;
  }).filter((p): p is PlotItem => p !== null);

  // Remove duplicate plots by id / plotNumber
  const uniqueMap = new Map<string, PlotItem>();
  for (const p of normalizedMatchedPlots) {
    const key = `${p.blockSlug}-${p.plotNumber}-${p.id}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, p);
    }
  }
  const matchedPlots = Array.from(uniqueMap.values());

  // If no custom series configs defined, generate default intervals of 100
  if (seriesList.length === 0) {
    if (matchedPlots.length === 0) return [];
    const validNumbers = matchedPlots
      .map((p) => (typeof p.plotNumber === 'number' ? p.plotNumber : parseInt(String(p.plotNumber).replace(/\D/g, ''), 10)))
      .filter((n) => !isNaN(n) && n > 0);
    
    if (validNumbers.length === 0) return [];
    const minPlotNum = Math.min(...validNumbers);
    const maxPlotNum = Math.max(...validNumbers);
    const defaultIntervals: SeriesConfig[] = [];
    for (let s = Math.floor(minPlotNum / 100) * 100; s <= maxPlotNum; s += 100) {
      defaultIntervals.push({
        start: s,
        end: s + 99,
        label: `${s}–${s + 99}`,
        tag: `Sector ${s}`,
      });
    }
    return defaultIntervals.map((cfg) => buildSeriesResult(cfg, matchedPlots));
  }

  return seriesList.map((cfg) => buildSeriesResult(cfg, matchedPlots));
}

function buildSeriesResult(cfg: SeriesConfig, allMatchedPlots: PlotItem[]): SeriesGroupResult {
  const plotsInSeries = allMatchedPlots.filter((p) => {
    const pNum = typeof p.plotNumber === 'number' ? p.plotNumber : parseInt(String(p.plotNumber).replace(/\D/g, ''), 10);
    return !isNaN(pNum) && pNum >= cfg.start && pNum <= cfg.end;
  });

  const prices = plotsInSeries.map((p) => p.price).filter((p) => p > 0);
  let minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  let maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  if (cfg.minPrice && cfg.minPrice > 0) {
    if (minPrice === 0 || cfg.minPrice < minPrice) minPrice = cfg.minPrice;
  }
  if (cfg.maxPrice && cfg.maxPrice > 0) {
    if (maxPrice === 0 || cfg.maxPrice > maxPrice) maxPrice = cfg.maxPrice;
  }

  // If specific series min/max were set in config, prefer config bounds
  if (cfg.minPrice && cfg.maxPrice) {
    minPrice = cfg.minPrice;
    maxPrice = cfg.maxPrice;
  }

  return {
    seriesKey: `${cfg.start}-${cfg.end}`,
    label: cfg.label,
    rangeStart: cfg.start,
    rangeEnd: cfg.end,
    tag: cfg.tag,
    totalPlots: plotsInSeries.length,
    availablePlots: plotsInSeries.filter((p) => p.status === 'available').length,
    minPrice,
    maxPrice,
    formattedRange: formatPriceRange(minPrice, maxPrice),
    plots: plotsInSeries.sort((a, b) => {
      const aNum = typeof a.plotNumber === 'number' ? a.plotNumber : parseInt(String(a.plotNumber).replace(/\D/g, ''), 10);
      const bNum = typeof b.plotNumber === 'number' ? b.plotNumber : parseInt(String(b.plotNumber).replace(/\D/g, ''), 10);
      return aNum - bNum;
    }),
  };
}
