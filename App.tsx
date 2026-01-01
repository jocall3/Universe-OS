import React, { useState, useEffect, useContext } from 'react';
import { UserContext, ThemeContext, GlobalConfigContext } from './contexts';
import { APIService } from './services/api';
import { DashboardLayout, WidgetConfig } from './types';
import { DashboardHeader, DraggableWidget, WidgetCatalog } from './components/Layout';
import { GlobalConfigControls, HolographicProjection, AIInsightsEngine } from './components/Core';
import { 
  ProjectManagementModule, ResourceManagementSystem, QuantumComputingStatusWidget, 
  BioIntegrationHub, MetaverseAssetViewer, DecentralizedGovernancePanel, AIServiceStudio, 
} from './components/Modules';

const Dashboard: React.FC = () => {
  const { currentUser, isAuthenticated, login } = useContext(UserContext)!;
  const { theme, setTheme } = useContext(ThemeContext)!;
  const { config } = useContext(GlobalConfigContext)!;

  const [currentLayout, setCurrentLayout] = useState<DashboardLayout | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && currentUser && !currentLayout) {
      APIService.fetchDashboardLayouts(currentUser.id).then(layouts => {
        if (layouts.length > 0) setCurrentLayout(layouts[0]);
        else {
           // Fallback default
           setCurrentLayout({
            id: 'default', name: 'Default Dashboard', widgets: [
              { id: 'w1', type: 'AIRecommendationPanel', title: 'AI Insights', layout: { x: 0, y: 0, w: 4, h: 2 }, dataSources: [], refreshInterval: 0, filters: {}, visualizationType: 'text', permissions: [], displayOptions: {}, telemetryEnabled: true },
              { id: 'w2', type: 'QuantumStatusMonitor', title: 'Quantum Grid', layout: { x: 4, y: 0, w: 4, h: 2 }, dataSources: [], refreshInterval: 0, filters: {}, visualizationType: 'text', permissions: [], displayOptions: {}, telemetryEnabled: true },
              { id: 'w3', type: 'BlockchainStatus', title: 'Ledger', layout: { x: 8, y: 0, w: 4, h: 2 }, dataSources: [], refreshInterval: 0, filters: {}, visualizationType: 'text', permissions: [], displayOptions: {}, telemetryEnabled: true },
            ], ownerId: 'sys', sharedWith: [], version: 1, isPublic: false, theme: 'dark', globalFilters: {}, aiGenerated: false, lastModified: new Date(), changeLog: [], performanceMetrics: { loadTime:0, apiCalls:0, renderErrors:0 }, accessControlList: []
           });
        }
      });
    }
  }, [isAuthenticated, currentUser, currentLayout]);

  const handleAddWidget = (type: string) => {
    if (!currentLayout) return;
    const newWidget: WidgetConfig = {
      id: `w-${Date.now()}`, type, title: `${type} Widget`,
      layout: { x: 0, y: 0, w: 4, h: 2 }, // Default size
      dataSources: [], refreshInterval: 60, filters: {}, visualizationType: 'default', displayOptions: {}, permissions: [], telemetryEnabled: true
    };
    setCurrentLayout({ ...currentLayout, widgets: [...currentLayout.widgets, newWidget] });
    setIsCatalogOpen(false);
  };

  const handleRemoveWidget = (id: string) => {
    if (currentLayout) setCurrentLayout({ ...currentLayout, widgets: currentLayout.widgets.filter(w => w.id !== id) });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-black bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 p-8 bg-gray-900/80 border border-gray-700 rounded-2xl text-center shadow-2xl max-w-md w-full">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">UNIVERSE OS</h1>
          <p className="text-gray-400 mb-8">Identify yourself to access the core.</p>
          <button onClick={() => login({})} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            INITIATE LOGIN SEQUENCE
          </button>
        </div>
      </div>
    );
  }

  if (!currentLayout) return <div className="h-screen flex items-center justify-center text-blue-500 animate-pulse">Initializing Universe...</div>;

  return (
    <div className={`flex flex-col h-screen ${theme}`}>
      <DashboardHeader 
        currentLayout={currentLayout} 
        onLayoutChange={(id) => console.log('Change layout', id)}
        onAddWidgetClick={() => setIsCatalogOpen(true)}
        onOpenGlobalSettings={() => setIsSettingsOpen(true)}
        onCustomizeTheme={() => setTheme(theme === 'dark' ? 'holographic' : 'dark')}
        onSaveLayout={() => alert('Layout config saved to local core.')}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-16 hover:w-64 transition-all duration-300 bg-gray-900/50 border-r border-gray-800 flex flex-col items-center py-4 z-40 group">
          {['overview', 'projects', 'resources', 'quantum', 'bio', 'metaverse', 'governance', 'ai_studio', 'security', 'learning'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full p-3 flex items-center gap-4 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all ${activeTab === tab ? 'bg-blue-900/20 text-blue-400 border-r-2 border-blue-500' : ''}`}
            >
              <div className="text-2xl min-w-[24px] text-center">
                {tab === 'overview' ? '🏠' : 
                 tab === 'projects' ? '📊' :
                 tab === 'resources' ? '📦' :
                 tab === 'quantum' ? '⚛️' :
                 tab === 'bio' ? '🧬' :
                 tab === 'metaverse' ? '🌐' :
                 tab === 'governance' ? '🏛️' :
                 tab === 'ai_studio' ? '🧠' :
                 tab === 'security' ? '🚨' : '🎓'}
              </div>
              <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap uppercase text-xs font-bold tracking-widest transition-opacity duration-200">
                {tab.replace('_', ' ')}
              </span>
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-black/20 p-6 relative">
          
          {/* OVERVIEW TAB (Draggable Grid) */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-6 auto-rows-min">
              {config.enableAIRecommendationEngine && (
                <div className="col-span-12">
                   <AIInsightsEngine dashboardId={currentLayout.id} currentFilters={{}} onApplySuggestion={() => {}} />
                </div>
              )}
              
              {currentLayout.widgets.map(w => (
                <DraggableWidget key={w.id} widget={w} onRemove={handleRemoveWidget} />
              ))}

              {config.holographicModeAvailable && (
                 <div className="col-span-12 mt-8">
                    <h2 className="text-xl font-bold text-cyan-500 mb-4">Holographic Environmental Projection</h2>
                    <HolographicProjection modelUrl="universe-core" interactionMode="view" onInteraction={() => {}} />
                 </div>
              )}
            </div>
          )}

          {/* MODULE TABS */}
          {activeTab === 'projects' && <ProjectManagementModule />}
          {activeTab === 'resources' && <ResourceManagementSystem />}
          {activeTab === 'quantum' && <QuantumComputingStatusWidget />}
          {activeTab === 'bio' && <BioIntegrationHub />}
          {activeTab === 'metaverse' && <MetaverseAssetViewer />}
          {activeTab === 'governance' && <DecentralizedGovernancePanel />}
          {activeTab === 'ai_studio' && <AIServiceStudio />}
          {activeTab === 'security' && <div className="p-10 text-center text-red-500 border border-red-900 bg-red-900/10 rounded-xl"><h1>SECURITY CLEARANCE REQUIRED</h1><p>Biometric scan pending...</p></div>}
          {activeTab === 'learning' && <div className="p-10 text-center text-purple-500 border border-purple-900 bg-purple-900/10 rounded-xl"><h1>NEURAL UPLOAD READY</h1><p>Select skill module...</p></div>}

        </main>
      </div>

      {/* Footer */}
      <footer className="h-6 bg-gray-950 border-t border-gray-900 flex items-center justify-between px-4 text-[10px] text-gray-600 font-mono">
        <div>UNIVERSE OS v{config.dashboardVersion}</div>
        <div className="flex gap-4">
          <span>STATUS: <span className="text-green-500">NOMINAL</span></span>
          <span>QUANTUM SECURITY: {config.quantumSecurityEnabled ? <span className="text-green-500">ACTIVE</span> : <span className="text-yellow-500">DISABLED</span>}</span>
        </div>
      </footer>

      {/* Modals */}
      {isCatalogOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl max-w-2xl w-full shadow-2xl">
              <div className="flex justify-between mb-4">
                 <h2 className="text-xl font-bold text-white">Add Module Widget</h2>
                 <button onClick={() => setIsCatalogOpen(false)} className="text-gray-500 hover:text-white">✕</button>
              </div>
              <WidgetCatalog onAddWidget={handleAddWidget} />
           </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl max-w-lg w-full shadow-2xl">
              <div className="flex justify-between mb-4">
                 <h2 className="text-xl font-bold text-white">Global Configuration</h2>
                 <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500 hover:text-white">✕</button>
              </div>
              <GlobalConfigControls />
           </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;