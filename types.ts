export type UserRole = 'admin' | 'power_user' | 'standard' | 'guest' | 'developer' | 'ai_assistant' | 'quantum_engineer' | 'bio_specialist' | 'metaverse_architect' | 'dao_member';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  preferences: Record<string, any>;
  lastLogin: Date;
  twoFactorEnabled: boolean;
  avatarUrl?: string;
  bio?: string;
  organizationId?: string;
  teamIds?: string[];
  permissions: string[];
  securityScore: number;
  healthMetrics: HealthMetrics;
  learningPaths: string[];
  digitalAssets: string[];
  reputationScore: number;
  neuralLinkStatus: 'active' | 'inactive' | 'calibrating' | 'error';
}

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  layout: { x: number; y: number; w: number; h: number; static?: boolean };
  dataSources: string[];
  refreshInterval: number;
  filters: Record<string, any>;
  visualizationType: string;
  displayOptions: Record<string, any>;
  permissions: UserRole[];
  aiConfig?: Record<string, any>;
  versionHistory?: { timestamp: Date; config: WidgetConfig }[];
  telemetryEnabled: boolean;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: WidgetConfig[];
  ownerId: string;
  sharedWith: string[];
  version: number;
  isPublic: boolean;
  theme: 'light' | 'dark' | 'holographic' | 'neon' | 'cyberpunk' | 'quantum_matrix' | 'bio_lumina';
  globalFilters: Record<string, any>;
  aiGenerated: boolean;
  lastModified: Date;
  changeLog: { userId: string; timestamp: Date; description: string }[];
  performanceMetrics: { loadTime: number; apiCalls: number; renderErrors: number };
  accessControlList: { entityId: string; permissionLevel: 'view' | 'edit' | 'manage' }[];
  spatialConfig?: { mode: '2D' | '3D' | 'VR' | 'AR'; environment: string };
}

export interface MetricDataPoint {
  timestamp: Date;
  value: number;
  unit: string;
  metadata?: Record<string, any>;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'on_hold' | 'awaiting_review';
  assignedTo: string[];
  tags: string[];
  projectId?: string;
  dependencies: string[];
  progress: number;
  attachments: { fileName: string; url: string; type: string; ipfsHash?: string }[];
  comments: any[];
  recurrence?: string;
  timeSpentMinutes: number;
  estimatedTimeMinutes: number;
  automatedSteps: string[];
  sentimentAnalysis?: { score: number; magnitude: number };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'on_hold' | 'completed' | 'archived' | 'critical';
  ownerId: string;
  teamIds: string[];
  budget: { allocated: number; spent: number; currency: string; forecast: number };
  milestones: { id: string; name: string; dueDate: Date; completed: boolean; completionDate?: Date }[];
  risks: { id: string; description: string; severity: 'low' | 'medium' | 'high' | 'critical'; mitigationPlan: string }[];
  documents: { title: string; url: string; type: string; blockchainHash?: string }[];
  tasks: TaskItem[];
  aiGeneratedInsights: string[];
  healthScore: number;
  dependencies: string[];
  governanceModel: 'centralized' | 'decentralized';
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success' | 'system' | 'ai_suggestion' | 'dao_vote';
  message: string;
  timestamp: Date;
  read: boolean;
  userId: string;
  actionUrl?: string;
  priority: number;
  sourceService: string;
  tags: string[];
  isVisible: boolean;
  snoozeOptions?: number[];
}

export interface CommunicationChannel {
  id: string;
  name: string;
  type: 'chat' | 'video' | 'forum' | 'broadcast' | 'neural_link';
  participants: string[];
  messages: Message[];
  isEncrypted: boolean;
  settings: Record<string, any>;
  moderators: string[];
  historyRetentionDays: number;
  aiSummarizationEnabled: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  timestamp: Date;
  content: string;
  readBy: string[];
  attachments?: { fileName: string; url: string; ipfsHash?: string }[];
  sentimentScore?: number;
  isEdited?: boolean;
  reactionEmojis?: { emoji: string; userId: string }[];
  threadId?: string;
  blockchainTxHash?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'software' | 'hardware' | 'license' | 'data' | 'digital_art' | 'crypto' | 'metaverse_land' | 'quantum_compute_credits' | 'biomaterial';
  ownerId: string;
  currentValue: number;
  acquisitionDate: Date;
  status: 'active' | 'retired' | 'maintenance' | 'deployed' | 'in_storage';
  location?: string;
  metadata: Record<string, any>;
  depreciationSchedule?: { year: number; value: number }[];
  blockchainRef?: string;
  environmentalImpactScore?: number;
}

export interface HealthMetrics {
  heartRate: MetricDataPoint[];
  bloodPressure: MetricDataPoint[];
  sleepHours: MetricDataPoint[];
  steps: MetricDataPoint[];
  caloriesBurned: MetricDataPoint[];
  mood: MetricDataPoint[];
  stressLevel: MetricDataPoint[];
  hydrationLevel: MetricDataPoint[];
  oxygenSaturation: MetricDataPoint[];
  meditationMinutes: MetricDataPoint[];
  biomarkerReadings: { type: string; data: MetricDataPoint[] }[];
  neuralActivity: MetricDataPoint[];
  immunologicalResponse: MetricDataPoint[];
  dietaryIntake: { timestamp: Date; food: string; calories: number; macroNutrients: Record<string, number> }[];
}

export interface AiModel {
  id: string;
  name: string;
  version: string;
  type: 'NLP' | 'Vision' | 'Predictive' | 'Generative' | 'ReinforcementLearning' | 'QuantumAI';
  status: 'training' | 'deployed' | 'retired' | 'error';
  trainingDataSizeGB: number;
  performanceMetrics: { accuracy: number; precision: number; recall: number; f1Score: number; inferenceLatencyMs: number };
  ownerId: string;
  accessControl: { userId: string; permission: 'view' | 'use' | 'fine_tune' }[];
  costPerInferenceUnit: number;
  quantumOptimized: boolean;
}