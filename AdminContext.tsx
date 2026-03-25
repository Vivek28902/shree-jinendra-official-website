import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteData, defaultSiteData } from './siteData';
import { supabase } from './lib/supabase';

const STORAGE_KEY = 'sjaa-site-data';
const ADMIN_SESSION_KEY = 'sjaa-admin-session';

interface AdminContextType {
  siteData: SiteData;
  isLoading: boolean;
  updateSiteData: (newData: SiteData) => Promise<boolean>;
  resetSiteData: () => Promise<void>;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useSiteData = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useSiteData must be used within AdminProvider');
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_configs')
          .select('data')
          .eq('id', 'primary')
          .maybeSingle();

        if (error) throw error;

        if (data && data.data && Object.keys(data.data).length > 0) {
          let parsed = data.data as SiteData;
          
          // Migration: Update old logo path
          if (parsed.heroInfo && parsed.heroInfo.logoSrc === "LOGO.png") {
            parsed.heroInfo.logoSrc = "/SJAA.PNG";
          }
          
          setSiteData({ ...defaultSiteData, ...parsed });
        } else {
          // Fallback to localStorage if Supabase is empty, then to defaultSiteData
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setSiteData({ ...defaultSiteData, ...JSON.parse(stored) });
          }
        }
      } catch (e) {
        console.error('Error fetching site data from Supabase:', e);
        // Fallback to localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setSiteData({ ...defaultSiteData, ...JSON.parse(stored) });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSiteData = async (newData: SiteData) => {
    setSiteData(newData);
    // Also save to localStorage as a local cache/fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

    try {
      const { error } = await supabase
        .from('site_configs')
        .upsert({ id: 'primary', data: newData, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error saving to Supabase:', e);
      return false;
    }
  };

  const resetSiteData = async () => {
    setSiteData(defaultSiteData);
    localStorage.removeItem(STORAGE_KEY);
    await supabase
      .from('site_configs')
      .upsert({ id: 'primary', data: defaultSiteData, updated_at: new Date().toISOString() });
  };

  const login = (password: string) => {
    // In a real app, this would be a server-side check.
    // For this local content manager, we use a simple predefined password.
    if (password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  return (
    <AdminContext.Provider value={{ siteData, isLoading, updateSiteData, resetSiteData, isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
