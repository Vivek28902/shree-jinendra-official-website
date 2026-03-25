import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteData, defaultSiteData } from './siteData';

const STORAGE_KEY = 'sjaa-site-data';
const ADMIN_SESSION_KEY = 'sjaa-admin-session';

interface AdminContextType {
  siteData: SiteData;
  updateSiteData: (newData: SiteData) => void;
  resetSiteData: () => void;
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
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults in case new fields were added
        return { ...defaultSiteData, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse stored site data, using defaults.');
    }
    return defaultSiteData;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.warn('Failed to save site data to localStorage.');
    }
  }, [siteData]);

  const updateSiteData = (newData: SiteData) => {
    setSiteData(newData);
  };

  const resetSiteData = () => {
    setSiteData(defaultSiteData);
    localStorage.removeItem(STORAGE_KEY);
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
    <AdminContext.Provider value={{ siteData, updateSiteData, resetSiteData, isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
