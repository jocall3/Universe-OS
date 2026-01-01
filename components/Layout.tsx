import React, { useContext, useState, useRef } from 'react';
import { UserContext, GlobalConfigContext } from '../contexts';
import { useNotifications, useOutsideClick } from '../hooks';
import { DashboardLayout, WidgetConfig } from '../types';
import { AIInsightsEngine, HolographicProjection, DataVisualization } from './Core';
import { CommunicationFeedWidget, TaskTrackerWidget, QuantumComputingStatusWidget, BlockchainLedgerStatusWidget } from './Modules';

// --- Header ---
export const DashboardHeader: React.FC<{ 
  currentLayout: DashboardLayout; 
  onLayoutChange: (id: string) => void;
  onAddWidgetClick: () => void;
  onOpenGlobalSettings: () => void;
  onCustomizeTheme: () => void;
  onSaveLayout: () => void;
}> = ({ currentLayout, onLayoutChange, onAddWidgetClick, onOpenGlobalSettings, onCustomizeTheme, onSaveLayout }) => {
  const { currentUser } = useContext(UserContext)!;

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 justify-between sticky top-0 z-50 shadow-lg shadow-black/50">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          UNIVERSE OS
        </div>
        <div className="h-6 w-px bg-gray-700 mx-2 hidden md:block"></div>
        <select 
          value={currentLayout.id} 
          onChange={(e) => onLayoutChange(e.target.value)}
          className="bg-gray-800 text-white text-sm border-none rounded px-3 py-1 focus:ring-1 focus:ring-blue-500 outline-none"
        >
          <option value={currentLayout.id}>{currentLayout.name}</option>
          <option value="new">+ New Layout</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onAddWidgetClick} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded uppercase tracking-wider transition">
          + Widget
        </button>
        <button onClick={onSaveLayout} className="p-2 text-gray-400 hover:text-green-400 transition">💾</button>
        <button onClick={onCustomizeTheme} className="p-2 text-gray-400 hover:text-yellow-400 transition">🎨</button>
        <button onClick={onOpenGlobalSettings} className="p-2 text-gray-400 hover:text-red-400 transition">⚙️</button>
        <NotificationCenter />
        <UserProfileMenu user={currentUser} />
      </div>
    </header>
  );
};

const UserProfileMenu: React.FC<{ user: any }> = ({ user }) => {
  if (!user) return null;
  return (
    <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-700">
      <div className="text-right hidden md:block">
        <div className="text-xs font-bold text-white">{user.username}</div>
        <div className="text-[10px] text-blue-400 uppercase">{user.role}</div>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20"></div>
    </div>
  );
};

const NotificationCenter: React.FC = () => {
  const { unreadCount, notifications, clearNotification } = useNotifications('user-123');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref as any, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-400 hover:text-white transition">
        🔔
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="p-3 bg-gray-900 border-b border-gray-700 text-xs font-bold uppercase text-gray-400">Notifications</div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-4 text-center text-gray-500 text-sm">No signals detected.</div> : 
              notifications.map(n => (
                <div key={n.id} className="p-3 border-b border-gray-700 hover:bg-gray-700/50 transition relative group">
                  <div className="text-xs text-blue-400 mb-1 font-mono">{n.sourceService}</div>
                  <div className="text-sm text-gray-200">{n.message}</div>
                  <button onClick={() => clearNotification(n.id)} className="absolute top-2 right-2 text-gray-600 hover:text-white opacity-0 group-hover:opacity-100">×</button>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

// --- Draggable Widget Wrapper ---
export const DraggableWidget: React.FC<{ widget: WidgetConfig; onRemove: (id: string) => void }> = ({ widget, onRemove }) => {
  return (
    <div 
      className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden flex flex-col hover:border-blue-500/50 transition-colors"
      style={{
        gridColumn: `span ${widget.layout.w}`,
        gridRow: `span ${widget.layout.h}`,
      }}
    >
      <div className="bg-gray-900/50 p-3 flex justify-between items-center border-b border-gray-700 handle cursor-move">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">{widget.title}</h3>
        <div className="flex gap-2">
          <button className="text-gray-600 hover:text-white text-xs">↻</button>
          <button onClick={() => onRemove(widget.id)} className="text-gray-600 hover:text-red-400 text-xs">×</button>
        </div>
      </div>
      <div className="flex-grow p-4 min-h-0 overflow-auto relative">
        {/* Dynamic Widget Content Rendering */}
        {widget.type === 'AIRecommendationPanel' && <AIInsightsEngine dashboardId="dash" currentFilters={{}} onApplySuggestion={() => {}} />}
        {widget.type === 'BioSignalGraph' && <DataVisualization data={[]} config={widget} height="100%" />}
        {widget.type === 'BlockchainStatus' && <BlockchainLedgerStatusWidget />}
        {widget.type === 'QuantumStatusMonitor' && <QuantumComputingStatusWidget minimal />}
        {widget.type === 'TaskTracker' && <TaskTrackerWidget projectId="1" />}
        {widget.type === 'CommunicationFeed' && <CommunicationFeedWidget channelId="global" />}
      </div>
    </div>
  );
};

export const WidgetCatalog: React.FC<{ onAddWidget: (type: string) => void }> = ({ onAddWidget }) => {
  const types = ['AIRecommendationPanel', 'BioSignalGraph', 'BlockchainStatus', 'QuantumStatusMonitor', 'TaskTracker', 'CommunicationFeed'];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {types.map(t => (
        <button key={t} onClick={() => onAddWidget(t)} className="p-3 bg-gray-800 hover:bg-blue-600 text-left rounded text-xs text-white transition">
          + {t}
        </button>
      ))}
    </div>
  );
};