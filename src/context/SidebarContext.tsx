'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarClose: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarClose, setisSidebarClose] = useState<boolean>(false);

  const toggleSidebar = () => {
    setisSidebarClose(!isSidebarClose);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarClose, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook untuk menggunakan SidebarContext
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
