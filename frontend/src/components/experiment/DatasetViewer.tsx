import React, { useState, useEffect } from 'react';
import { Database, Table, Search, Download } from 'lucide-react';
import { apiService } from '../../services/api';

interface DatasetViewerProps {
  initialDataset?: 'placement.csv' | 'iris.csv' | 'ionosphere.csv';
}

export const DatasetViewer: React.FC<DatasetViewerProps> = ({ initialDataset = 'placement.csv' }) => {
  const [selectedDataset, setSelectedDataset] = useState<string>(initialDataset);
  const [data, setData] = useState<{ columns: string[]; rows: any[]; total_rows: number } | null>(null);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataset = async () => {
      setIsLoading(true);
      try {
        const res = await apiService.getDataset(selectedDataset);
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataset();
  }, [selectedDataset]);

  const filteredRows = (data?.rows || []).filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-cyan-400" />
          <div>
            <h5 className="font-semibold text-slate-100 text-sm">Lab Manual Datasets Inspector</h5>
            <span className="text-[11px] text-slate-400 font-mono">
              Raw data files prescribed by MRCET R20A6683
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['placement.csv', 'iris.csv', 'ionosphere.csv'] as const).map((ds) => (
            <button
              key={ds}
              onClick={() => setSelectedDataset(ds)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                selectedDataset === ds
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {ds}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rows or features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {data && (
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>
              Showing <strong className="text-cyan-400">{filteredRows.length}</strong> of{' '}
              <strong className="text-slate-200">{data.total_rows}</strong> samples
            </span>
            <span>•</span>
            <span>
              <strong className="text-cyan-400">{data.columns.length}</strong> columns
            </span>
          </div>
        )}
      </div>

      {/* Table Data Render */}
      <div className="bg-[#070b14] rounded-xl border border-slate-800 overflow-x-auto max-h-[300px]">
        {isLoading ? (
          <div className="py-12 text-center text-xs text-cyan-400 font-mono animate-pulse">
            Loading dataset table...
          </div>
        ) : data && data.columns.length > 0 ? (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 sticky top-0 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-slate-500 w-12">#</th>
                {data.columns.map((col) => (
                  <th key={col} className="py-2.5 px-3 font-semibold text-cyan-300">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredRows.slice(0, 50).map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2 px-3 text-slate-500">{i + 1}</td>
                  {data.columns.map((col) => (
                    <td key={col} className="py-2 px-3">
                      {typeof row[col] === 'number'
                        ? row[col] % 1 !== 0
                          ? row[col].toFixed(3)
                          : row[col]
                        : String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-10 text-center text-xs text-slate-500">No data found</div>
        )}
      </div>
    </div>
  );
};

