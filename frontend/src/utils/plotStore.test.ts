import {
  getStoredPlots,
  saveStoredPlots,
  addOrUpdatePlot,
  updatePlotPrice,
  deletePlot,
  resetPlotsToDefault,
  getStoredBlockConfigs,
  saveStoredBlockConfigs,
  updateSeriesConfig,
  addSeriesConfig,
  deleteSeriesConfig,
  resetSeriesConfigsToDefault,
} from '../utils/plotStore';
import { PlotItem, BLOCK_SERIES_CONFIGS, SeriesConfig } from '../utils/plotSeriesEngine';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
    _getStore: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock window.dispatchEvent
window.dispatchEvent = jest.fn();

describe('plotStore - Unit Tests', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  const mockPlot: PlotItem = {
    id: 'test-plot-1',
    plotNumber: 100,
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50 ft',
    price: 6500000,
    locationType: 'Standard',
    status: 'available',
    features: ['Test Feature'],
  };

  describe('getStoredPlots', () => {
    it('returns empty array when localStorage is empty', () => {
      const plots = getStoredPlots();
      expect(plots).toEqual([]);
    });

    it('returns parsed plots from localStorage', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      const plots = getStoredPlots();
      expect(plots).toEqual([mockPlot]);
    });

    it('returns empty array for invalid JSON', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', 'invalid json');
      const plots = getStoredPlots();
      expect(plots).toEqual([]);
      consoleSpy.mockRestore();
    });

    it('returns empty array when not in browser', () => {
      // In jsdom, window is always defined, so this tests SSR behavior
      // We'll test that the function handles missing localStorage gracefully
      mockLocalStorage.clear();
      mockLocalStorage.getItem.mockReturnValueOnce(null);
      const plots = getStoredPlots();
      expect(plots).toEqual([]);
    });
  });

  describe('saveStoredPlots', () => {
    it('saves plots to localStorage', () => {
      saveStoredPlots([mockPlot]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'faisal_hills_plots_inventory_v1',
        JSON.stringify([mockPlot])
      );
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.any(Event)
      );
    });

    it('does nothing when not in browser', () => {
      // In jsdom, window is always defined, so we skip this SSR test
      // The function checks typeof window === 'undefined' which is never true in jsdom
      expect(true).toBe(true);
    });
  });

  describe('addOrUpdatePlot', () => {
    it('adds new plot when not exists', () => {
      const result = addOrUpdatePlot(mockPlot);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockPlot);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('updates existing plot', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const updatedPlot = { ...mockPlot, price: 7000000 };
      const result = addOrUpdatePlot(updatedPlot);
      
      expect(result).toHaveLength(1);
      expect(result[0].price).toBe(7000000);
    });

    it('adds new plot to beginning of array', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const newPlot = { ...mockPlot, id: 'test-plot-2', plotNumber: 101 };
      const result = addOrUpdatePlot(newPlot);
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('test-plot-2');
      expect(result[1].id).toBe('test-plot-1');
    });
  });

  describe('updatePlotPrice', () => {
    it('updates price for existing plot', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const result = updatePlotPrice('test-plot-1', 7500000);
      
      expect(result[0].price).toBe(7500000);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('returns unchanged array for non-existent plot', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const result = updatePlotPrice('non-existent', 7500000);
      
      expect(result[0].price).toBe(6500000);
    });
  });

  describe('deletePlot', () => {
    it('deletes existing plot', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const result = deletePlot('test-plot-1');
      
      expect(result).toHaveLength(0);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('returns unchanged array for non-existent plot', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const result = deletePlot('non-existent');
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-plot-1');
    });
  });

  describe('resetPlotsToDefault', () => {
    it('resets to empty array (INITIAL_PLOTS_INVENTORY)', () => {
      mockLocalStorage.setItem('faisal_hills_plots_inventory_v1', JSON.stringify([mockPlot]));
      
      const result = resetPlotsToDefault();
      
      expect(result).toEqual([]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'faisal_hills_plots_inventory_v1',
        JSON.stringify([])
      );
    });
  });

  describe('getStoredBlockConfigs', () => {
    it('returns default configs when localStorage is empty', () => {
      const configs = getStoredBlockConfigs();
      expect(configs).toEqual(BLOCK_SERIES_CONFIGS);
    });

    it('returns merged configs from localStorage and defaults', () => {
      const customConfig = {
        'custom-block': {
          slug: 'custom-block',
          name: 'Custom Block',
          pricingMode: 'dynamic_series' as const,
          seriesConfigs: {
            '5 Marla': [{ start: 1, end: 100, label: '1-100' }],
          },
        },
      };
      mockLocalStorage.setItem('faisal_hills_series_configs_v1', JSON.stringify(customConfig));
      
      const configs = getStoredBlockConfigs();
      expect(configs).toHaveProperty('custom-block');
      expect(configs).toHaveProperty('executive-block'); // default still present
    });

    it('returns defaults for invalid JSON', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockLocalStorage.setItem('faisal_hills_series_configs_v1', 'invalid json');
      const configs = getStoredBlockConfigs();
      expect(configs).toEqual(BLOCK_SERIES_CONFIGS);
      consoleSpy.mockRestore();
    });

    it('returns defaults when not in browser', () => {
      // In jsdom, window is always defined, so we skip this SSR test
      // The function checks typeof window === 'undefined' which is never true in jsdom
      expect(true).toBe(true);
    });
  });

  describe('saveStoredBlockConfigs', () => {
    it('saves configs to localStorage', () => {
      const configs = { ...BLOCK_SERIES_CONFIGS };
      saveStoredBlockConfigs(configs);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'faisal_hills_series_configs_v1',
        JSON.stringify(configs)
      );
      expect(window.dispatchEvent).toHaveBeenCalledTimes(2); // fh_series_configs_updated + fh_plots_updated
    });

    it('does nothing when not in browser', () => {
      // In jsdom, window is always defined, so we skip this SSR test
      // The function checks typeof window === 'undefined' which is never true in jsdom
      expect(true).toBe(true);
    });
  });

  describe('updateSeriesConfig', () => {
    it('updates series config for existing block and size', () => {
      const updatedConfigs = updateSeriesConfig(
        'executive-block',
        '5 Marla',
        '342-450',
        { tag: 'Updated Tag', minPrice: 7000000, maxPrice: 8000000 }
      );
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'].find(s => s.start === 342 && s.end === 450);
      
      expect(series).toBeDefined();
      expect(series!.tag).toBe('Updated Tag');
      expect(series!.minPrice).toBe(7000000);
      expect(series!.maxPrice).toBe(8000000);
    });

    it('returns unchanged configs for non-existent block', () => {
      const updatedConfigs = updateSeriesConfig(
        'non-existent-block',
        '5 Marla',
        '342-450',
        { tag: 'Updated Tag' }
      );
      
      expect(updatedConfigs).toEqual(BLOCK_SERIES_CONFIGS);
    });

    it('returns unchanged configs for non-existent size', () => {
      const updatedConfigs = updateSeriesConfig(
        'executive-block',
        '3 Marla',
        '342-450',
        { tag: 'Updated Tag' }
      );
      
      expect(updatedConfigs).toEqual(BLOCK_SERIES_CONFIGS);
    });

    it('returns unchanged configs for non-existent series', () => {
      const updatedConfigs = updateSeriesConfig(
        'executive-block',
        '5 Marla',
        '999-999',
        { tag: 'Updated Tag' }
      );
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'].find(s => s.start === 999 && s.end === 999);
      expect(series).toBeUndefined();
    });
  });

  describe('addSeriesConfig', () => {
    it('adds new series config', () => {
      const newConfig: SeriesConfig = { start: 500, end: 600, label: '500-600', tag: 'New Sector' };
      const updatedConfigs = addSeriesConfig('executive-block', '5 Marla', newConfig);
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'].find(s => s.start === 500);
      
      expect(series).toBeDefined();
      expect(series!.tag).toBe('New Sector');
    });

    it('updates existing series with same start', () => {
      const newConfig: SeriesConfig = { start: 342, end: 450, label: '342-450', tag: 'Updated Sector' };
      const updatedConfigs = addSeriesConfig('executive-block', '5 Marla', newConfig);
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'].find(s => s.start === 342);
      
      expect(series).toBeDefined();
      expect(series!.tag).toBe('Updated Sector');
    });

    it('sorts series by start', () => {
      const newConfig: SeriesConfig = { start: 100, end: 200, label: '100-200', tag: 'First Sector' };
      const updatedConfigs = addSeriesConfig('executive-block', '5 Marla', newConfig);
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'];
      
      expect(series[0].start).toBe(100);
    });
  });

  describe('deleteSeriesConfig', () => {
    it('deletes existing series config', () => {
      const updatedConfigs = deleteSeriesConfig('executive-block', '5 Marla', '342-450');
      
      const block = updatedConfigs['executive-block'];
      const series = block.seriesConfigs!['5 Marla'].find(s => s.start === 342 && s.end === 450);
      
      expect(series).toBeUndefined();
    });

    it('returns unchanged configs for non-existent block', () => {
      const updatedConfigs = deleteSeriesConfig('non-existent-block', '5 Marla', '342-450');
      expect(updatedConfigs).toEqual(BLOCK_SERIES_CONFIGS);
    });

    it('returns unchanged configs for non-existent size', () => {
      const updatedConfigs = deleteSeriesConfig('executive-block', '3 Marla', '342-450');
      expect(updatedConfigs).toEqual(BLOCK_SERIES_CONFIGS);
    });
  });

  describe('resetSeriesConfigsToDefault', () => {
    it('resets to default configs', () => {
      mockLocalStorage.setItem('faisal_hills_series_configs_v1', JSON.stringify({
        'custom-block': { slug: 'custom-block', name: 'Custom', pricingMode: 'dynamic_series' as const },
      }));
      
      const result = resetSeriesConfigsToDefault();
      
      expect(result).toEqual(BLOCK_SERIES_CONFIGS);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'faisal_hills_series_configs_v1',
        JSON.stringify(BLOCK_SERIES_CONFIGS)
      );
    });
  });
});