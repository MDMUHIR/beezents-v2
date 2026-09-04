import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isDemoOpen: boolean;
  isDayTimelineOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
  openDayTimeline: () => void;
  closeDayTimeline: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDayTimelineOpen, setIsDayTimelineOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isDemoOpen,
        isDayTimelineOpen,
        openDemo: () => setIsDemoOpen(true),
        closeDemo: () => setIsDemoOpen(false),
        openDayTimeline: () => setIsDayTimelineOpen(true),
        closeDayTimeline: () => setIsDayTimelineOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};
