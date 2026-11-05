import { useState, useMemo } from 'react';
import { Search, Filter, AlertCircle, Plus, Minus, X, Package, CheckCircle2, AlertTriangle, XCircle, BarChart2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  unitPrice: number;
}

const INITIAL_ITEMS: InventoryItem[] = [
  { id: 'INV-001', name: 'MacBook Pro M3 Max 16"', category: 'Electronics', quantity: 24, minStock: 5, location: 'Warehouse A', status: 'In Stock', unitPrice: 2499.99 },
  { id: 'INV-002', name: 'Ergonomic Mesh Chair', category: 'Furniture', quantity: 3, minStock: 5, location: 'Warehouse B', status: 'Low Stock', unitPrice: 349.00 },
  { id: 'INV-003', name: 'USB-C Thunderbolt 4 Dock', category: 'Electronics', quantity: 87, minStock: 15, location: 'Warehouse A', status: 'In Stock', unitPrice: 179.50 },
  { id: 'INV-004', name: 'Motorized Standing Desk', category: 'Furniture', quantity: 0, minStock: 3, location: 'Warehouse C', status: 'Out of Stock', unitPrice: 680.00 },
  { id: 'INV-005', name: 'Mechanical Keyboard (Hot-swap)', category: 'Electronics', quantity: 15, minStock: 6, location: 'Warehouse A', status: 'In Stock', unitPrice: 149.00 },
  { id: 'INV-006', name: 'Dell UltraSharp 27" 4K', category: 'Electronics', quantity: 8, minStock: 4, location: 'Warehouse A', status: 'In Stock', unitPrice: 520.00 },
  { id: 'INV-007', name: 'Hardcover Engineering Notebooks (10pk)', category: 'Stationery', quantity: 140, minStock: 25, location: 'Warehouse B', status: 'In Stock', unitPrice: 34.00 },
  { id: 'INV-008', name: 'Fine-tip Dry Erase Markers', category: 'Stationery', quantity: 2, minStock: 10, location: 'Warehouse B', status: 'Low Stock', unitPrice: 12.50 },
  { id: 'INV-009', name: 'Cat6 Ethernet Snagless 25ft', category: 'Networking', quantity: 42, minStock: 8, location: 'Warehouse C', status: 'In Stock', unitPrice: 16.99 },
  { id: 'INV-010', name: 'Cisco Managed PoE Switch 24-Port', category: 'Networking', quantity: 1, minStock: 2, location: 'Warehouse C', status: 'Low Stock', unitPrice: 420.00 },
];

export function InventoryDemo() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);

  // Derived metrics
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const lowStockCount = items.filter(i => i.status === 'Low Stock').length;
  const outOfStockCount = items.filter(i => i.status === 'Out of Stock').length;

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(INITIAL_ITEMS.map(i => i.category)))];
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchTerm, selectedCategory, selectedStatus]);

  // Adjust stock handler
  const handleSaveStock = () => {
    if (!adjustingItem) return;
    const newQty = Math.max(0, adjustingItem.quantity + adjustAmount);
    let newStatus: InventoryItem['status'] = 'In Stock';
    if (newQty === 0) newStatus = 'Out of Stock';
    else if (newQty <= adjustingItem.minStock) newStatus = 'Low Stock';

    setItems(prev =>
      prev.map(i => (i.id === adjustingItem.id ? { ...i, quantity: newQty, status: newStatus } : i))
    );
    setAdjustingItem(null);
    setAdjustAmount(0);
  };

  // Category summary for mini-chart
  const categorySummary = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach(item => {
      map[item.category] = (map[item.category] || 0) + item.quantity;
    });
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>Interactive Demo: </strong>
          Simulates stock transfer, filtering, and role-based inventory controls with synthetic data. Changes persist in local memory.
        </span>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Total Units in Stock</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{totalItemsCount}</div>
          </div>
          <Package className="w-6 h-6 text-emerald-400/50" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Low Stock Alerts</div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{lowStockCount}</div>
          </div>
          <AlertTriangle className="w-6 h-6 text-amber-400/50" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Out of Stock Lines</div>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">{outOfStockCount}</div>
          </div>
          <XCircle className="w-6 h-6 text-red-400/50" />
        </div>
      </div>

      {/* Category Breakdown Bars */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>Stock Distribution by Category</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categorySummary.map(c => {
            const maxVal = 200;
            const pct = Math.min(100, Math.round((c.count / maxVal) * 100));
            return (
              <div key={c.category} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/60 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{c.category}</span>
                  <span className="text-cyan-400 font-bold">{c.count} units</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items by name or SKU..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs font-mono pl-9 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-mono">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              <option value="All" className="bg-slate-900 text-slate-200">All Statuses</option>
              <option value="In Stock" className="bg-slate-900 text-slate-200">In Stock</option>
              <option value="Low Stock" className="bg-slate-900 text-slate-200">Low Stock</option>
              <option value="Out of Stock" className="bg-slate-900 text-slate-200">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">SKU / Item</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3 text-right">Qty / Min</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Unit Price</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 font-sans">
                    No items found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-100">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.id}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{item.category}</td>
                    <td className="py-3 px-3 text-slate-400">{item.location}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-bold text-slate-200">{item.quantity}</span>
                      <span className="text-slate-500 text-[10px]"> / {item.minStock}</span>
                    </td>
                    <td className="py-3 px-3">
                      {item.status === 'In Stock' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> In Stock
                        </span>
                      )}
                      {item.status === 'Low Stock' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      )}
                      {item.status === 'Out of Stock' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3 h-3" /> Depleted
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-300">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setAdjustingItem(item);
                          setAdjustAmount(0);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 transition-colors text-[11px]"
                      >
                        Adjust
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-sm w-full p-5 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100">Adjust Inventory Level</h4>
              <button onClick={() => setAdjustingItem(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-mono">{adjustingItem.id}</div>
              <div className="font-semibold text-slate-200 text-sm mt-0.5">{adjustingItem.name}</div>
              <div className="text-xs text-slate-400 mt-1">
                Current Stock: <strong className="text-slate-200 font-mono">{adjustingItem.quantity}</strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
              <button
                onClick={() => setAdjustAmount(prev => prev - 1)}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center font-mono font-bold text-lg w-16 text-emerald-400">
                {adjustAmount >= 0 ? `+${adjustAmount}` : adjustAmount}
              </div>
              <button
                onClick={() => setAdjustAmount(prev => prev + 1)}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              New quantity: <span className="text-emerald-400 font-bold">{Math.max(0, adjustingItem.quantity + adjustAmount)}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setAdjustingItem(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStock}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
