import React, { useState, useEffect, useContext } from 'react';
import { UserContext, GlobalConfigContext } from '../contexts';
import { APIService } from '../services/api';
import { Project, TaskItem, Asset, AiModel, CommunicationChannel, Message } from '../types';
import { DataVisualization, AIInsightsEngine, HolographicProjection, AIContentGenerator } from './Core';

// --- Project Management ---
export const ProjectManagementModule: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { currentUser } = useContext(UserContext)!;

  useEffect(() => {
    // Mock data load
    if (currentUser) {
      setProjects([{
        id: 'proj-omega', name: 'Project Omega Rebirth', description: 'Rebuilding the core system.', startDate: new Date(), endDate: new Date(),
        status: 'in_progress', ownerId: currentUser.id, teamIds: [], budget: { allocated: 10000, spent: 5000, currency: 'USD', forecast: 12000 }, milestones: [], risks: [], documents: [], tasks: [], aiGeneratedInsights: [], healthScore: 75, dependencies: [], governanceModel: 'centralized'
      }]);
    }
  }, [currentUser]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 h-full shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Project Continuum Navigator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-4 rounded border-l-4 border-blue-500">
          <h4 className="text-gray-400 text-sm uppercase">Active Projects</h4>
          <div className="text-3xl font-bold text-white mt-2">{projects.length}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded border-l-4 border-green-500">
          <h4 className="text-gray-400 text-sm uppercase">Overall Health</h4>
          <div className="text-3xl font-bold text-green-400 mt-2">92%</div>
        </div>
        <div className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
          <h4 className="text-gray-400 text-sm uppercase">Pending Milestones</h4>
          <div className="text-3xl font-bold text-purple-400 mt-2">14</div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold text-white mb-4">Active Projects List</h4>
        {projects.map(p => (
          <div key={p.id} className="bg-gray-700/50 p-4 rounded mb-2 flex justify-between items-center hover:bg-gray-700 transition">
            <div>
              <div className="font-bold text-blue-300">{p.name}</div>
              <div className="text-xs text-gray-400">{p.description}</div>
            </div>
            <span className="px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded-full uppercase tracking-wide">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Quantum Status ---
export const QuantumComputingStatusWidget: React.FC<{ minimal?: boolean }> = ({ minimal }) => {
  const [status, setStatus] = useState<any>(null);
  const { config } = useContext(GlobalConfigContext)!;

  useEffect(() => {
    if (config.quantumSecurityEnabled) {
      APIService.getQuantumJobResult('mock').then(setStatus);
    }
  }, [config.quantumSecurityEnabled]);

  if (!config.quantumSecurityEnabled) return <div className="p-4 bg-red-900/20 text-red-400 border border-red-500/50 rounded">Quantum Grid Offline</div>;
  
  return (
    <div className={`bg-gray-900 border border-indigo-500/50 rounded-lg p-4 ${minimal ? '' : 'h-full'}`}>
      <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
        <span className="animate-pulse">⚛️</span> Quantum Nexus
      </h3>
      {status ? (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-400">Qubits:</span> <span className="text-white font-mono">{status.result.qubits}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Entanglement:</span> <span className="text-green-400 font-mono">{(status.result.entanglement_probability * 100).toFixed(2)}%</span></div>
          <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full animate-pulse" style={{ width: '87%' }}></div>
          </div>
        </div>
      ) : <div className="text-indigo-500/50 animate-pulse">Establishing link...</div>}
    </div>
  );
};

// --- Bio Hub ---
export const BioIntegrationHub: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-950 to-teal-950 border border-teal-800 rounded-lg p-6 h-full">
      <h3 className="text-2xl font-bold text-teal-400 mb-6">Bio-Integrated Health Core</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-black/30 p-4 rounded text-center">
            <div className="text-4xl mb-2">❤️</div>
            <div className="text-2xl font-bold text-white">72 BPM</div>
            <div className="text-xs text-teal-500/70 uppercase">Heart Rate</div>
         </div>
         <div className="bg-black/30 p-4 rounded text-center">
            <div className="text-4xl mb-2">🧠</div>
            <div className="text-2xl font-bold text-white">Active</div>
            <div className="text-xs text-teal-500/70 uppercase">Neural Link</div>
         </div>
      </div>
      <DataVisualization data={[]} config={{ title: 'Real-time Vitals', visualizationType: 'lineGraph' } as any} height="200px" />
    </div>
  );
};

// --- Metaverse ---
export const MetaverseAssetViewer: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-950 to-purple-950 border border-blue-800 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-2xl font-bold text-blue-400 mb-6">Metaverse Asset Gateway</h3>
      <div className="flex-grow">
        <HolographicProjection modelUrl="land-alpha-01" interactionMode="view" onInteraction={() => {}} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
         <button className="bg-blue-600/50 hover:bg-blue-600 p-2 rounded text-xs text-white">Enter VR</button>
         <button className="bg-purple-600/50 hover:bg-purple-600 p-2 rounded text-xs text-white">Trade NFT</button>
         <button className="bg-cyan-600/50 hover:bg-cyan-600 p-2 rounded text-xs text-white">Teleport</button>
      </div>
    </div>
  );
};

// --- Governance ---
export const DecentralizedGovernancePanel: React.FC = () => {
  return (
    <div className="bg-gray-800 border border-pink-900 rounded-lg p-6 h-full">
       <h3 className="text-2xl font-bold text-pink-400 mb-6">DAO Governance</h3>
       <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded border-l-4 border-pink-500">
             <h4 className="text-white font-bold">Prop-001: Interstellar Funding</h4>
             <p className="text-sm text-gray-400 mt-1">Allocation of 100M credits for deep space scanning.</p>
             <div className="mt-3 flex gap-2">
                <div className="flex-1 bg-green-900/50 text-green-400 text-center py-1 rounded text-xs">YES (78%)</div>
                <div className="flex-1 bg-red-900/50 text-red-400 text-center py-1 rounded text-xs">NO (22%)</div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- AI Studio ---
export const AIServiceStudio: React.FC = () => {
  return (
    <div className="bg-gray-800 border border-indigo-900 rounded-lg p-6 h-full">
       <h3 className="text-2xl font-bold text-indigo-400 mb-6">AI Model Studio</h3>
       <div className="bg-gray-900 p-4 rounded mb-4">
          <div className="flex justify-between items-center mb-2">
             <span className="text-white font-bold">Universal NLP v1.0</span>
             <span className="text-green-400 text-xs border border-green-500 px-2 py-0.5 rounded-full">DEPLOYED</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
             <div className="bg-indigo-500 h-full" style={{ width: '100%' }}></div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
             <span>Accuracy: 98.2%</span>
             <span>Latency: 12ms</span>
          </div>
       </div>
       <AIContentGenerator contentType="code_snippet" contextData={{}} onContentGenerated={() => {}} />
    </div>
  );
};

// --- Simple Wrappers ---
export const ResourceManagementSystem: React.FC = () => <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 h-full"><h3 className="text-xl text-yellow-500 font-bold mb-4">Resource Nexus</h3><p className="text-gray-400">Inventory tracking initialized...</p></div>;
export const CommunicationFeedWidget: React.FC<{ channelId: string }> = ({ channelId }) => <div className="h-full bg-gray-900 p-4 rounded flex flex-col"><div className="flex-grow text-gray-400 text-sm">Chat history for {channelId}...</div><input className="bg-gray-800 p-2 rounded text-white text-sm" placeholder="Type message..." /></div>;
export const TaskTrackerWidget: React.FC<{ projectId: string }> = () => <div className="bg-gray-900 p-4 rounded"><h4 className="text-white text-sm font-bold mb-2">Tasks</h4><ul className="text-sm text-gray-400"><li>Refactor Core</li><li>Audit Logs</li></ul></div>;
export const BlockchainLedgerStatusWidget: React.FC = () => <div className="bg-green-950/30 p-4 rounded border border-green-800"><h4 className="text-green-400 font-bold">Ledger Synced</h4><p className="text-xs text-green-200">Block #12934810</p></div>;