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

// Dynamic live inventory for Faisal Hills (loaded exclusively from database API)
export const INITIAL_PLOTS_INVENTORY: PlotItem[] = [];

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
