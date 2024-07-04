'use client';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AppContextType {
  isSidebarClose: boolean;
  toggleSidebar: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarClose, setIsSidebarClose] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 

  const toggleSidebar = () => {
    setIsSidebarClose(!isSidebarClose);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/signin');
  };

  return (
    <AppContext.Provider value={{ isSidebarClose, toggleSidebar, token, setToken, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
