import { PlotItem, INITIAL_PLOTS_INVENTORY, BlockConfig, BLOCK_SERIES_CONFIGS, SeriesConfig } from './plotSeriesEngine';

const STORAGE_KEY = 'faisal_hills_plots_inventory_v1';
const SERIES_CONFIG_STORAGE_KEY = 'faisal_hills_series_configs_v1';

export function getStoredPlots(): PlotItem[] {
  if (typeof window === 'undefined') {
    return INITIAL_PLOTS_INVENTORY;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PLOTS_INVENTORY));
      return INITIAL_PLOTS_INVENTORY;
    }
    const parsed: PlotItem[] = JSON.parse(data);
    const existingIds = new Set(parsed.map((p) => p.id));
    const missingDefaults = INITIAL_PLOTS_INVENTORY.filter((p) => !existingIds.has(p.id));
    if (missingDefaults.length > 0) {
      const merged = [...parsed, ...missingDefaults];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch (e) {
    console.error('Error reading plots from localStorage', e);
    return INITIAL_PLOTS_INVENTORY;
  }
}

export function saveStoredPlots(plots: PlotItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plots));
    window.dispatchEvent(new Event('fh_plots_updated'));
  } catch (e) {
    console.error('Error saving plots to localStorage', e);
  }
}

export function addOrUpdatePlot(plot: PlotItem): PlotItem[] {
  const current = getStoredPlots();
  const index = current.findIndex((p) => p.id === plot.id);
  let updated: PlotItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = plot;
  } else {
    updated = [plot, ...current];
  }
  saveStoredPlots(updated);
  return updated;
}

export function updatePlotPrice(plotId: string, newPrice: number): PlotItem[] {
  const current = getStoredPlots();
  const updated = current.map((p) => (p.id === plotId ? { ...p, price: newPrice } : p));
  saveStoredPlots(updated);
  return updated;
}

export function deletePlot(plotId: string): PlotItem[] {
  const current = getStoredPlots();
  const updated = current.filter((p) => p.id !== plotId);
  saveStoredPlots(updated);
  return updated;
}

export function resetPlotsToDefault(): PlotItem[] {
  saveStoredPlots(INITIAL_PLOTS_INVENTORY);
  return INITIAL_PLOTS_INVENTORY;
}

// ==========================================
// SERIES CONFIGURATION STORE & PERSISTENCE
// ==========================================

export function getStoredBlockConfigs(): Record<string, BlockConfig> {
  if (typeof window === 'undefined') {
    return BLOCK_SERIES_CONFIGS;
  }
  try {
    const data = localStorage.getItem(SERIES_CONFIG_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(SERIES_CONFIG_STORAGE_KEY, JSON.stringify(BLOCK_SERIES_CONFIGS));
      return BLOCK_SERIES_CONFIGS;
    }
    const parsed: Record<string, BlockConfig> = JSON.parse(data);
    // Ensure all default blocks are present
    let hasMerged = false;
    const merged = { ...BLOCK_SERIES_CONFIGS, ...parsed };
    Object.keys(BLOCK_SERIES_CONFIGS).forEach((bKey) => {
      if (!parsed[bKey]) {
        merged[bKey] = BLOCK_SERIES_CONFIGS[bKey];
        hasMerged = true;
      }
    });
    if (hasMerged) {
      localStorage.setItem(SERIES_CONFIG_STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    console.error('Error reading series configs from localStorage', e);
    return BLOCK_SERIES_CONFIGS;
  }
}

export function saveStoredBlockConfigs(configs: Record<string, BlockConfig>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SERIES_CONFIG_STORAGE_KEY, JSON.stringify(configs));
    window.dispatchEvent(new Event('fh_series_configs_updated'));
    window.dispatchEvent(new Event('fh_plots_updated'));
  } catch (e) {
    console.error('Error saving series configs to localStorage', e);
  }
}

export function updateSeriesConfig(
  blockSlug: string,
  size: string,
  seriesKey: string,
  updates: { tag?: string; minPrice?: number; maxPrice?: number; label?: string }
): Record<string, BlockConfig> {
  const configs = getStoredBlockConfigs();
  const block = configs[blockSlug] || configs['executive-block'];
  if (!block || !block.seriesConfigs || !block.seriesConfigs[size]) {
    return configs;
  }

  const [startStr, endStr] = seriesKey.split('-');
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);

  const seriesIndex = block.seriesConfigs[size].findIndex(
    (s) => s.start === start && s.end === end
  );

  if (seriesIndex >= 0) {
    const existing = block.seriesConfigs[size][seriesIndex];
    block.seriesConfigs[size][seriesIndex] = {
      ...existing,
      tag: updates.tag !== undefined ? updates.tag : existing.tag,
      label: updates.label !== undefined ? updates.label : existing.label,
      minPrice: updates.minPrice !== undefined ? updates.minPrice : existing.minPrice,
      maxPrice: updates.maxPrice !== undefined ? updates.maxPrice : existing.maxPrice,
    };
  }

  // Also update or seed corresponding plots in that series range so plot lists stay in sync
  if (updates.minPrice || updates.maxPrice) {
    const minP = updates.minPrice || 0;
    const maxP = updates.maxPrice || minP;
    const avgP = minP > 0 && maxP > 0 ? Math.round((minP + maxP) / 2) : (minP || maxP);
    
    const currentPlots = getStoredPlots();
    let plotsModified = false;

    // Check if matching plots exist in that series
    const plotsInSeries = currentPlots.filter((p) => {
      const pNum = typeof p.plotNumber === 'number' ? p.plotNumber : parseInt(String(p.plotNumber).replace(/\D/g, ''), 10);
      return p.blockSlug === blockSlug && p.size === size && pNum >= start && pNum <= end;
    });

    if (plotsInSeries.length > 0) {
      plotsInSeries.forEach((p, idx) => {
        if (idx === 0) p.price = minP;
        else if (idx === plotsInSeries.length - 1) p.price = maxP;
        else p.price = avgP;
      });
      plotsModified = true;
    } else {
      // Create representative sample plots in that series so it shows data immediately
      const samplePlots: PlotItem[] = [
        {
          id: `${blockSlug}-${size.toLowerCase().replace(/\s+/g, '')}-${start + 5}`,
          plotNumber: start + 5,
          blockSlug,
          blockName: block.name,
          category: 'residential',
          size,
          dimensions: size === '5 Marla' ? '25 × 50' : size === '8 Marla' ? '30 × 60' : size === '10 Marla' ? '35 × 70' : size === '14 Marla' ? '40 × 80' : '50 × 90',
          price: minP,
          locationType: 'Standard',
          status: 'available',
          features: ['Underground Utilities', 'Main Road Access', 'Carpeted Street'],
          demandRange: 'Live Pricing',
          suitability: updates.tag || 'Family Residence',
        },
        {
          id: `${blockSlug}-${size.toLowerCase().replace(/\s+/g, '')}-${Math.round((start + end) / 2)}`,
          plotNumber: Math.round((start + end) / 2),
          blockSlug,
          blockName: block.name,
          category: 'residential',
          size,
          dimensions: size === '5 Marla' ? '25 × 50' : size === '8 Marla' ? '30 × 60' : size === '10 Marla' ? '35 × 70' : size === '14 Marla' ? '40 × 80' : '50 × 90',
          price: avgP,
          locationType: 'Corner',
          status: 'available',
          features: ['Corner Plot', 'Wide Frontage', 'Instant Possession'],
          demandRange: '+15% Corner Value',
          suitability: updates.tag || 'Executive Living',
        },
        {
          id: `${blockSlug}-${size.toLowerCase().replace(/\s+/g, '')}-${end - 5}`,
          plotNumber: end - 5,
          blockSlug,
          blockName: block.name,
          category: 'residential',
          size,
          dimensions: size === '5 Marla' ? '25 × 50' : size === '8 Marla' ? '30 × 60' : size === '10 Marla' ? '35 × 70' : size === '14 Marla' ? '40 × 80' : '50 × 90',
          price: maxP,
          locationType: 'Park Facing',
          status: 'available',
          features: ['Direct Park Facing', 'Green Vista', 'Underground Gas & Power'],
          demandRange: '+20% Park Premium',
          suitability: updates.tag || 'Luxury Build',
        },
      ];
      currentPlots.push(...samplePlots);
      plotsModified = true;
    }

    if (plotsModified) {
      saveStoredPlots(currentPlots);
    }
  }

  saveStoredBlockConfigs(configs);
  return configs;
}

export function addSeriesConfig(
  blockSlug: string,
  size: string,
  newConfig: SeriesConfig
): Record<string, BlockConfig> {
  const configs = getStoredBlockConfigs();
  const block = configs[blockSlug] || configs['executive-block'];
  if (!block) return configs;

  if (!block.seriesConfigs) {
    block.seriesConfigs = {};
  }
  if (!block.seriesConfigs[size]) {
    block.seriesConfigs[size] = [];
  }

  // Check if series with same start already exists
  const existingIdx = block.seriesConfigs[size].findIndex((s) => s.start === newConfig.start);
  if (existingIdx >= 0) {
    block.seriesConfigs[size][existingIdx] = newConfig;
  } else {
    block.seriesConfigs[size].push(newConfig);
    block.seriesConfigs[size].sort((a, b) => a.start - b.start);
  }

  saveStoredBlockConfigs(configs);
  return configs;
}

export function deleteSeriesConfig(
  blockSlug: string,
  size: string,
  seriesKey: string
): Record<string, BlockConfig> {
  const configs = getStoredBlockConfigs();
  const block = configs[blockSlug];
  if (!block || !block.seriesConfigs || !block.seriesConfigs[size]) return configs;

  const [startStr, endStr] = seriesKey.split('-');
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);

  block.seriesConfigs[size] = block.seriesConfigs[size].filter(
    (s) => !(s.start === start && s.end === end)
  );

  saveStoredBlockConfigs(configs);
  return configs;
}

export function resetSeriesConfigsToDefault(): Record<string, BlockConfig> {
  saveStoredBlockConfigs(BLOCK_SERIES_CONFIGS);
  return BLOCK_SERIES_CONFIGS;
}
