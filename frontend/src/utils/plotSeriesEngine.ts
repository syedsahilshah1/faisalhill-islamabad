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
  locationType: 'Corner' | 'Park Facing' | 'Main Boulevard' | 'Standard' | 'Corner + Park' | 'West Open';
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

// Master Series Configuration per Block & Size
export const BLOCK_SERIES_CONFIGS: Record<string, BlockConfig> = {
  'executive-block': {
    slug: 'executive-block',
    name: 'Executive Block',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 342, end: 450, label: '342–450', tag: 'Entrance Boulevard Sector' },
        { start: 451, end: 550, label: '451–550', tag: 'Central Park Sector' },
        { start: 551, end: 650, label: '551–650', tag: 'Civic & Mosque Sector' },
        { start: 651, end: 750, label: '651–750', tag: 'School Proximity Sector' },
        { start: 751, end: 850, label: '751–850', tag: 'Residential Avenue' },
        { start: 851, end: 950, label: '851–950', tag: 'Quiet Residential Enclave' },
        { start: 951, end: 1050, label: '951–1050', tag: 'Executive Heights Sector' },
        { start: 1051, end: 1191, label: '1051–1191', tag: 'Faisal Jewel View Sector' },
      ],
      '8 Marla': [
        { start: 100, end: 250, label: '100–250', tag: 'Main Boulevard & Park' },
        { start: 251, end: 400, label: '251–400', tag: 'Executive Residential' },
        { start: 401, end: 550, label: '401–550', tag: 'Civic Center Proximity' },
      ],
      '10 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Central Park & School' },
        { start: 151, end: 300, label: '151–300', tag: 'Executive Avenue' },
        { start: 301, end: 450, label: '301–450', tag: 'Prime Elevation Sector' },
      ],
      '14 Marla': [
        { start: 1, end: 100, label: '001–100', tag: 'Luxury Boulevard Frontage' },
        { start: 101, end: 200, label: '101–200', tag: 'Executive Panorama Sector' },
      ],
      '1 Kanal': [
        { start: 1, end: 80, label: '001–080', tag: 'Grand Entrance Boulevard' },
        { start: 81, end: 160, label: '081–160', tag: 'Margalla View Enclave' },
        { start: 161, end: 250, label: '161–250', tag: 'VIP Sector Frontage' },
      ],
    },
  },
  'prime-block': {
    slug: 'prime-block',
    name: 'Prime Block',
    pricingMode: 'fixed_price',
    fixedPrices: {
      '5 Marla': {
        price: 3250000,
        formattedPrice: 'PKR 32.5 Lac',
        dimensions: '25 × 50',
        installmentMonths: 48,
        quarterlyInstallment: 'PKR 145,000 / Qtr',
      },
      '8 Marla': {
        price: 4800000,
        formattedPrice: 'PKR 48.0 Lac',
        dimensions: '30 × 60',
        installmentMonths: 48,
        quarterlyInstallment: 'PKR 215,000 / Qtr',
      },
      '10 Marla': {
        price: 5850000,
        formattedPrice: 'PKR 58.5 Lac',
        dimensions: '35 × 70',
        installmentMonths: 48,
        quarterlyInstallment: 'PKR 265,000 / Qtr',
      },
      '14 Marla': {
        price: 7650000,
        formattedPrice: 'PKR 76.5 Lac',
        dimensions: '40 × 80',
        installmentMonths: 48,
        quarterlyInstallment: 'PKR 345,000 / Qtr',
      },
      '1 Kanal': {
        price: 9900000,
        formattedPrice: 'PKR 99.0 Lac',
        dimensions: '50 × 90',
        installmentMonths: 48,
        quarterlyInstallment: 'PKR 450,000 / Qtr',
      },
    },
  },
  'block-a': {
    slug: 'block-a',
    name: 'Block A',
    pricingMode: 'dynamic_series',
    seriesConfigs: {
      '5 Marla': [
        { start: 1, end: 200, label: '001–200', tag: 'Main Boulevard Front' },
        { start: 201, end: 400, label: '201–400', tag: 'Central Commercial Sector' },
      ],
      '10 Marla': [
        { start: 1, end: 150, label: '001–150', tag: 'Park Facing Enclave' },
        { start: 151, end: 300, label: '151–300', tag: 'Executive Heights' },
      ],
      '1 Kanal': [
        { start: 1, end: 100, label: '001–100', tag: 'Grand Boulevard Frontage' },
      ],
    },
  },
  'block-b': {
    slug: 'block-b',
    name: 'Block B',
    pricingMode: 'dynamic_series',
  },
  'block-c': {
    slug: 'block-c',
    name: 'Block C',
    pricingMode: 'dynamic_series',
  },
  'block-d': {
    slug: 'block-d',
    name: 'Block D',
    pricingMode: 'dynamic_series',
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
];

// Calculation function to dynamically group plots into configured series & calculate Min/Max prices
export function calculateSeriesGroups(
  plots: PlotItem[],
  blockSlug: string,
  size: string
): SeriesGroupResult[] {
  const blockConfig = BLOCK_SERIES_CONFIGS[blockSlug] || BLOCK_SERIES_CONFIGS['executive-block'];
  const seriesList = blockConfig.seriesConfigs?.[size] || [];

  // Filter plots by block & size
  const matchedPlots = plots.filter(
    (p) => p.blockSlug === blockSlug && p.size === size && p.category === 'residential'
  );

  // If no custom series configs defined, generate default intervals of 100
  if (seriesList.length === 0) {
    if (matchedPlots.length === 0) return [];
    const minPlotNum = Math.min(...matchedPlots.map((p) => p.plotNumber));
    const maxPlotNum = Math.max(...matchedPlots.map((p) => p.plotNumber));
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
  const plotsInSeries = allMatchedPlots.filter(
    (p) => p.plotNumber >= cfg.start && p.plotNumber <= cfg.end
  );

  const prices = plotsInSeries.map((p) => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

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
    plots: plotsInSeries.sort((a, b) => a.plotNumber - b.plotNumber),
  };
}
