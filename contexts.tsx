import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserProfile } from './types';

// --- User Context ---
interface UserContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<UserProfile>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  hasPermission: (permission: string) => boolean;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: any) => {
    return new Promise<UserProfile>((resolve) => {
      setTimeout(() => {
        const user: UserProfile = {
          id: 'user-123',
          username: 'ai_expert',
          email: 'ai@universe.com',
          role: 'admin',
          preferences: {},
          lastLogin: new Date(),
          twoFactorEnabled: true,
          permissions: ['dashboard:view', 'dashboard:edit', 'admin:manage_users', 'ai:access_models', 'quantum:run_jobs', 'bio:access_data', 'metaverse:manage_assets', 'dao:vote'],
          securityScore: 95,
          healthMetrics: {
            heartRate: [{ timestamp: new Date(), value: 72, unit: 'bpm' }],
            bloodPressure: [], sleepHours: [], steps: [], caloriesBurned: [], mood: [{ timestamp: new Date(), value: 4, unit: 'scale' }], stressLevel: [], hydrationLevel: [], oxygenSaturation: [], meditationMinutes: [], biomarkerReadings: [], neuralActivity: [], immunologicalResponse: [], dietaryIntake: []
          },
          learningPaths: ['quantum_dev_101', 'ai_ethics_advanced'],
          digitalAssets: ['nft-star-map', 'meta-land-01'],
          reputationScore: 850,
          neuralLinkStatus: 'inactive',
        };
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('userProfile', JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userProfile');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No user logged in.');
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem('userProfile', JSON.stringify(updated));
    return updated;
  };

  const hasPermission = useCallback((permission: string) => {
    return currentUser?.permissions.includes(permission) || currentUser?.role === 'admin';
  }, [currentUser]);

  const value = useMemo(() => ({ currentUser, isAuthenticated, login, logout, updateProfile, hasPermission }), [currentUser, isAuthenticated, hasPermission]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// --- Theme Context ---
interface ThemeContextType {
  theme: 'light' | 'dark' | 'holographic' | 'neon' | 'cyberpunk' | 'quantum_matrix' | 'bio_lumina';
  setTheme: (theme: 'light' | 'dark' | 'holographic' | 'neon' | 'cyberpunk' | 'quantum_matrix' | 'bio_lumina') => void;
  generateTheme: (keywords: string[]) => Promise<Record<string, string>>;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'holographic' | 'neon' | 'cyberpunk' | 'quantum_matrix' | 'bio_lumina'>('dark');

  const generateTheme = async (keywords: string[]) => {
    return new Promise<Record<string, string>>((resolve) => {
      setTimeout(() => {
        resolve({
          primaryColor: '#007bff',
          secondaryColor: '#6c757d',
          backgroundColor: '#1a1a1a',
          textColor: '#f8f9fa',
          accentColor: '#00ffff',
        });
      }, 1500);
    });
  };

  const value = useMemo(() => ({ theme, setTheme, generateTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme} h-full`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// --- Global Config Context ---
interface GlobalConfigContextType {
  config: Record<string, any>;
  updateConfig: (key: string, value: any) => void;
  getFeatureFlag: (flag: string) => boolean;
  getSetting: (setting: string, defaultValue?: any) => any;
  subscribeToConfigUpdates: (callback: (config: Record<string, any>) => void) => () => void;
}
export const GlobalConfigContext = createContext<GlobalConfigContextType | undefined>(undefined);

export const GlobalConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Record<string, any>>({
    dashboardVersion: '10.5.2',
    enableAIRecommendationEngine: true,
    enableRealtimeDataStreams: true,
    defaultLanguage: 'en-US',
    dataRetentionPolicy: '5_years_galactic_standard',
    quantumSecurityEnabled: false,
    holographicModeAvailable: true,
    blockchainLedgerIntegration: true,
    neuralInterfaceEnabled: false,
    metaversePortalActive: true,
    aiModelTrainingCapacity: 'high',
    environmentalMonitoringLevel: 'planetary',
    gravitationalStabilizerActive: true,
  });

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => {
      const newConfig = { ...prev, [key]: value };
      localStorage.setItem('globalConfig', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const getFeatureFlag = useCallback((flag: string) => !!config[`feature_${flag}`] || !!config[flag], [config]);
  const getSetting = useCallback((setting: string, defaultValue: any = null) => config[setting] ?? defaultValue, [config]);

  const subscribeToConfigUpdates = (callback: (config: Record<string, any>) => void) => {
    const interval = setInterval(() => {
      const mockUpdate = { lastUpdated: new Date().toISOString() };
      callback(mockUpdate);
    }, 30000);
    return () => clearInterval(interval);
  };

  const value = useMemo(() => ({ config, updateConfig, getFeatureFlag, getSetting, subscribeToConfigUpdates }), [config, getFeatureFlag, getSetting]);

  return <GlobalConfigContext.Provider value={value}>{children}</GlobalConfigContext.Provider>;
};