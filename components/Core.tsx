import React, { useState, useEffect, useRef, useContext } from 'react';
import { WidgetConfig } from '../types';
import { UserContext, GlobalConfigContext } from '../contexts';
import { APIService } from '../services/api';

// --- Global Config Controls ---
export const GlobalConfigControls: React.FC = () => {
  const { config, updateConfig } = useContext(GlobalConfigContext)!;
  return (
    <div className="text-white space-y-4">
      <h3 className="text-xl font-bold mb-4">Global System Settings</h3>
      {Object.entries(config).map(([key, value]) => (
        typeof value === 'boolean' && (
          <div key={key} className="flex items-center justify-between bg-gray-800 p-3 rounded">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <button
              onClick={() => updateConfig(key, !value)}
              className={`px-3 py-1 rounded ${value ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {value ? 'ON' : 'OFF'}
            </button>
          </div>
        )
      ))}
    </div>
  );
};

// --- Data Visualization ---
interface DataVisualizationProps {
  data: any[];
  config: WidgetConfig;
  height?: string;
  width?: string;
  interactivityEnabled?: boolean;
}
export const DataVisualization: React.FC<DataVisualizationProps> = ({ data, config, height = '300px', width = '100%', interactivityEnabled = true }) => {
  return (
    <div style={{ height, width }} className="flex items-center justify-center bg-gray-900 rounded-lg shadow-inner overflow-hidden border border-gray-700 relative group">
      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
      <div className="z-10 text-center p-4">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-gray-300 font-mono text-sm">{config.title}</p>
        <p className="text-xs text-gray-500 mt-1">{data.length} data points processed</p>
        <p className="text-xs text-blue-400 mt-2 font-bold">{config.visualizationType}</p>
      </div>
    </div>
  );
};

// --- Holographic Projection ---
export const HolographicProjection: React.FC<{ modelUrl: string; interactionMode: string; onInteraction: (e: any) => void; realtimeDataOverlay?: any[] }> = ({ modelUrl, interactionMode, onInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const handler = (e: MouseEvent) => onInteraction(e);
      containerRef.current.addEventListener('click', handler);
      return () => containerRef.current?.removeEventListener('click', handler);
    }
  }, [onInteraction]);

  return (
    <div ref={containerRef} className="w-full h-[400px] relative bg-black rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border-4 border-cyan-500 rounded-full animate-spin border-t-transparent opacity-50"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-purple-500 rounded-full animate-ping opacity-30"></div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-2 border border-cyan-500 rounded text-xs text-cyan-300 font-mono">
        <p>MODEL: {modelUrl}</p>
        <p>MODE: {interactionMode.toUpperCase()}</p>
        <p>STATUS: PROJECTION STABLE</p>
      </div>
    </div>
  );
};

// --- AI Insights Engine ---
export const AIInsightsEngine: React.FC<{ dashboardId: string; currentFilters: any; onApplySuggestion: (s: string) => void }> = ({ dashboardId, currentFilters, onApplySuggestion }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const { currentUser } = useContext(UserContext)!;
  const { config } = useContext(GlobalConfigContext)!;

  useEffect(() => {
    if (!currentUser || !config.enableAIRecommendationEngine) return;
    const fetch = async () => {
      const recs = await APIService.getAIRecommendations({ userId: currentUser.id, dashboardId, currentFilters });
      setInsights(recs);
    };
    fetch();
  }, [dashboardId, currentFilters, currentUser, config]);

  if (!config.enableAIRecommendationEngine) return null;

  return (
    <div className="p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-lg backdrop-blur-sm">
      <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
        <span>🧠</span> AI Cognitive Core
      </h3>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex justify-between items-start text-sm bg-indigo-900/40 p-2 rounded hover:bg-indigo-900/60 transition">
            <span className="text-gray-200">{insight}</span>
            <button onClick={() => onApplySuggestion(insight)} className="ml-2 text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider">
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- AI Content Generator ---
export const AIContentGenerator: React.FC<{ contentType: string; contextData: any; onContentGenerated: (c: string) => void }> = ({ contentType, contextData, onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    setLoading(true);
    const content = await APIService.generateContent(prompt, contextData);
    setResult(content);
    onContentGenerated(content);
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">AI Content Forge: {contentType}</h4>
      <textarea 
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white mb-2"
        placeholder="Enter instructions..."
      />
      <button 
        onClick={generate} 
        disabled={loading}
        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded text-sm w-full disabled:opacity-50"
      >
        {loading ? 'Forging...' : 'Generate'}
      </button>
      {result && <div className="mt-2 p-2 bg-gray-900 rounded text-xs text-gray-300 font-mono">{result}</div>}
    </div>
  );
};