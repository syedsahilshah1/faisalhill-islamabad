import {
  formatPKR,
  formatPriceRange,
  getStandardDimensionsForSize,
  calculateSeriesGroups,
  BLOCK_SERIES_CONFIGS,
} from '../utils/plotSeriesEngine';
import { PlotItem } from '../utils/plotSeriesEngine';

describe('plotSeriesEngine - Unit Tests', () => {
  describe('formatPKR', () => {
    it('formats crores correctly for values >= 10,000,000', () => {
      expect(formatPKR(10000000)).toBe('PKR 1 Cr');
      expect(formatPKR(18500000)).toBe('PKR 1.85 Cr');
      expect(formatPKR(20000000)).toBe('PKR 2 Cr');
    });

    it('formats lacs correctly for values < 10,000,000', () => {
      expect(formatPKR(6500000)).toBe('PKR 65 Lac');
      expect(formatPKR(5500000)).toBe('PKR 55 Lac');
      expect(formatPKR(100000)).toBe('PKR 1 Lac');
    });

    it('handles edge cases', () => {
      expect(formatPKR(0)).toBe('Price on Request');
      expect(formatPKR(-100)).toBe('Price on Request');
      expect(formatPKR(null as any)).toBe('Price on Request');
      expect(formatPKR(undefined as any)).toBe('Price on Request');
    });

    it('formats decimal crores correctly', () => {
      expect(formatPKR(15000000)).toBe('PKR 1.50 Cr');
      expect(formatPKR(12500000)).toBe('PKR 1.25 Cr');
    });
  });

  describe('formatPriceRange', () => {
    it('formats range with min and max', () => {
      expect(formatPriceRange(6500000, 7400000)).toBe('PKR 65 Lac – 74 Lac');
      expect(formatPriceRange(10000000, 15000000)).toBe('PKR 1 Cr – 1.50 Cr');
    });

    it('handles same min and max', () => {
      expect(formatPriceRange(6500000, 6500000)).toBe('PKR 65 Lac');
    });

    it('handles zero/negative max', () => {
      expect(formatPriceRange(6500000, 0)).toBe('PKR 65 Lac');
      expect(formatPriceRange(6500000, -1)).toBe('PKR 65 Lac');
    });

    it('handles zero/negative min', () => {
      expect(formatPriceRange(0, 7400000)).toBe('PKR 74 Lac');
      expect(formatPriceRange(-1, 7400000)).toBe('PKR 74 Lac');
    });

    it('handles both zero/negative', () => {
      expect(formatPriceRange(0, 0)).toBe('Price on Request');
      expect(formatPriceRange(-1, -1)).toBe('Price on Request');
    });
  });

  describe('getStandardDimensionsForSize', () => {
    it('returns correct dimensions for known sizes', () => {
      expect(getStandardDimensionsForSize('5 Marla')).toBe('25 × 50 ft');
      expect(getStandardDimensionsForSize('8 Marla')).toBe('30 × 60 ft');
      expect(getStandardDimensionsForSize('10 Marla')).toBe('35 × 70 ft');
      expect(getStandardDimensionsForSize('14 Marla')).toBe('40 × 80 ft');
      expect(getStandardDimensionsForSize('1 Kanal')).toBe('50 × 90 ft');
      expect(getStandardDimensionsForSize('2 Kanal')).toBe('75 × 120 ft');
    });

    it('handles case insensitivity', () => {
      expect(getStandardDimensionsForSize('5 marla')).toBe('25 × 50 ft');
      expect(getStandardDimensionsForSize('10 MARLA')).toBe('35 × 70 ft');
    });

    it('handles variations with spaces', () => {
      expect(getStandardDimensionsForSize('5marla')).toBe('25 × 50 ft');
      expect(getStandardDimensionsForSize('1kanal')).toBe('50 × 90 ft');
    });

    it('returns default for unknown sizes', () => {
      expect(getStandardDimensionsForSize('3 Marla')).toBe('25 × 50 ft');
      expect(getStandardDimensionsForSize('')).toBe('25 × 50 ft');
    });

    it('handles 5.33 marla', () => {
      expect(getStandardDimensionsForSize('5.33 Marla')).toBe('40 × 30 ft');
    });

    it('handles 4 marla', () => {
      expect(getStandardDimensionsForSize('4 Marla')).toBe('30 × 30 ft');
    });
  });

  describe('calculateSeriesGroups', () => {
    const mockPlots: PlotItem[] = [
      {
        id: 'executive-block-5marla-350',
        plotNumber: 350,
        blockSlug: 'executive-block',
        blockName: 'Executive Block',
        category: 'residential',
        size: '5 Marla',
        dimensions: '25 × 50 ft',
        price: 6800000,
        locationType: 'Standard',
        status: 'available',
        features: [],
      },
      {
        id: 'executive-block-5marla-500',
        plotNumber: 500,
        blockSlug: 'executive-block',
        blockName: 'Executive Block',
        category: 'residential',
        size: '5 Marla',
        dimensions: '25 × 50 ft',
        price: 7200000,
        locationType: 'Park Facing',
        status: 'available',
        features: ['Park Facing'],
      },
      {
        id: 'executive-block-5marla-800',
        plotNumber: 800,
        blockSlug: 'executive-block',
        blockName: 'Executive Block',
        category: 'residential',
        size: '5 Marla',
        dimensions: '25 × 50 ft',
        price: 7000000,
        locationType: 'Standard',
        status: 'sold',
        features: [],
      },
      {
        id: 'block-a-5marla-150',
        plotNumber: 150,
        blockSlug: 'block-a',
        blockName: 'Block A',
        category: 'residential',
        size: '5 Marla',
        dimensions: '25 × 50 ft',
        price: 6200000,
        locationType: 'Standard',
        status: 'available',
        features: [],
      },
    ];

    it('returns series groups for executive-block 5 Marla', () => {
      const results = calculateSeriesGroups(mockPlots, 'executive-block', '5 Marla');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('seriesKey');
      expect(results[0]).toHaveProperty('label');
      expect(results[0]).toHaveProperty('rangeStart');
      expect(results[0]).toHaveProperty('rangeEnd');
      expect(results[0]).toHaveProperty('totalPlots');
      expect(results[0]).toHaveProperty('availablePlots');
      expect(results[0]).toHaveProperty('minPrice');
      expect(results[0]).toHaveProperty('maxPrice');
      expect(results[0]).toHaveProperty('formattedRange');
      expect(results[0]).toHaveProperty('plots');
    });

    it('filters plots by block and size correctly', () => {
      const results = calculateSeriesGroups(mockPlots, 'executive-block', '5 Marla');
      
      // Should only include executive-block 5 Marla plots (350, 500, 800)
      const allPlots = results.flatMap(r => r.plots);
      expect(allPlots.length).toBe(3);
      expect(allPlots.every(p => p.blockSlug === 'executive-block')).toBe(true);
      expect(allPlots.every(p => p.size === '5 Marla')).toBe(true);
    });

    it('counts available vs sold correctly', () => {
      const results = calculateSeriesGroups(mockPlots, 'executive-block', '5 Marla');
      
      const series342_450 = results.find(r => r.rangeStart === 342 && r.rangeEnd === 450);
      expect(series342_450).toBeDefined();
      expect(series342_450!.totalPlots).toBe(1); // plot 350
      expect(series342_450!.availablePlots).toBe(1); // plot 350 is available
      
      // Plot 800 falls in range 751-850, not 651-750
      const series751_850 = results.find(r => r.rangeStart === 751 && r.rangeEnd === 850);
      expect(series751_850).toBeDefined();
      expect(series751_850!.totalPlots).toBe(1); // plot 800
      expect(series751_850!.availablePlots).toBe(0); // plot 800 is sold
    });

    it('calculates min/max prices correctly', () => {
      const results = calculateSeriesGroups(mockPlots, 'executive-block', '5 Marla');
      
      const series342_450 = results.find(r => r.rangeStart === 342 && r.rangeEnd === 450);
      expect(series342_450!.minPrice).toBe(6500000); // config min price
      expect(series342_450!.maxPrice).toBe(7400000); // config max price
      
      const series451_550 = results.find(r => r.rangeStart === 451 && r.rangeEnd === 550);
      expect(series451_550!.minPrice).toBe(7000000); // config min
      expect(series451_550!.maxPrice).toBe(7600000); // config max
    });

    it('uses config min/max when plot prices are zero', () => {
      const plotsWithZeroPrice: PlotItem[] = [
        {
          id: 'executive-block-5marla-350',
          plotNumber: 350,
          blockSlug: 'executive-block',
          blockName: 'Executive Block',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 0,
          locationType: 'Standard',
          status: 'available',
          features: [],
        },
      ];
      
      const results = calculateSeriesGroups(plotsWithZeroPrice, 'executive-block', '5 Marla');
      const series342_450 = results.find(r => r.rangeStart === 342 && r.rangeEnd === 450);
      
      expect(series342_450!.minPrice).toBe(6500000); // from config
      expect(series342_450!.maxPrice).toBe(7400000); // from config
    });

    it('returns series from fallback block for unknown block', () => {
      // Function falls back to executive-block when block not found
      const results = calculateSeriesGroups(mockPlots, 'unknown-block', '5 Marla');
      
      // Should return series from fallback (executive-block) config
      expect(results.length).toBeGreaterThan(0);
      // But plots should be empty since mockPlots doesn't have unknown-block
      expect(results.every(r => r.plots.length === 0)).toBe(true);
    });

    it('returns empty array for unknown size', () => {
      const results = calculateSeriesGroups(mockPlots, 'executive-block', '3 Marla');
      expect(results).toEqual([]);
    });

    it('handles block slug normalization', () => {
      // Test with different block slug formats
      const plotsWithVariedSlugs: PlotItem[] = [
        {
          id: 'block-a-5marla-150',
          plotNumber: 150,
          blockSlug: 'Block A', // different case/format
          blockName: 'Block A',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 6200000,
          locationType: 'Standard',
          status: 'available',
          features: [],
        },
      ];
      
      const results = calculateSeriesGroups(plotsWithVariedSlugs, 'block-a', '5 Marla');
      expect(results.length).toBeGreaterThan(0);
    });

    it('removes duplicate plots by id', () => {
      const plotsWithDuplicates: PlotItem[] = [
        {
          id: 'executive-block-5marla-350',
          plotNumber: 350,
          blockSlug: 'executive-block',
          blockName: 'Executive Block',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 6800000,
          locationType: 'Standard',
          status: 'available',
          features: [],
        },
        {
          id: 'executive-block-5marla-350', // duplicate id
          plotNumber: 350,
          blockSlug: 'executive-block',
          blockName: 'Executive Block',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 7000000,
          locationType: 'Corner',
          status: 'available',
          features: ['Corner'],
        },
      ];
      
      const results = calculateSeriesGroups(plotsWithDuplicates, 'executive-block', '5 Marla');
      const allPlots = results.flatMap(r => r.plots);
      expect(allPlots.length).toBe(1); // duplicates removed
    });

    it('generates default intervals when no config exists', () => {
      const plotsNoConfig: PlotItem[] = [
        {
          id: 'unknown-block-5marla-150',
          plotNumber: 150,
          blockSlug: 'unknown-block',
          blockName: 'Unknown Block',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 5000000,
          locationType: 'Standard',
          status: 'available',
          features: [],
        },
        {
          id: 'unknown-block-5marla-250',
          plotNumber: 250,
          blockSlug: 'unknown-block',
          blockName: 'Unknown Block',
          category: 'residential',
          size: '5 Marla',
          dimensions: '25 × 50 ft',
          price: 5500000,
          locationType: 'Standard',
          status: 'available',
          features: [],
        },
      ];
      
      // Add a custom config for unknown-block with no seriesConfigs
      const customConfigs = {
        'unknown-block': {
          slug: 'unknown-block',
          name: 'Unknown Block',
          pricingMode: 'dynamic_series' as const,
          seriesConfigs: {},
        },
      };
      
      const results = calculateSeriesGroups(plotsNoConfig, 'unknown-block', '5 Marla', customConfigs);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('BLOCK_SERIES_CONFIGS', () => {
    it('contains all expected blocks', () => {
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('executive-block');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-a');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-b');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-c');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-d');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('prime-block');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-b1-extension');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('b-1-extension');
      expect(BLOCK_SERIES_CONFIGS).toHaveProperty('block-b1');
    });

    it('has correct pricing mode for each block', () => {
      expect(BLOCK_SERIES_CONFIGS['executive-block'].pricingMode).toBe('dynamic_series');
      expect(BLOCK_SERIES_CONFIGS['prime-block'].pricingMode).toBe('fixed_price');
    });

    it('has series configs for dynamic_series blocks', () => {
      const dynamicBlocks = Object.values(BLOCK_SERIES_CONFIGS).filter(b => b.pricingMode === 'dynamic_series');
      dynamicBlocks.forEach(block => {
        expect(block.seriesConfigs).toBeDefined();
        expect(Object.keys(block.seriesConfigs!).length).toBeGreaterThan(0);
      });
    });
  });
});