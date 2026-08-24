import { PlotItem, INITIAL_PLOTS_INVENTORY } from './plotSeriesEngine';

const STORAGE_KEY = 'faisal_hills_plots_inventory_v1';

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
    return JSON.parse(data);
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
