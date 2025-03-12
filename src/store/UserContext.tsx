import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserState {
  dealbreakers: Array<{questionId: string; value: number}>;
  cubeValues: number[];
  // Add other user state
}

const initialState: UserState = {
  dealbreakers: [],
  cubeValues: [5, 5, 5, 5, 5, 5, 5]
};

const UserContext = createContext<{
  state: UserState;
  updateDealbreakers: (values: Array<{questionId: string; value: number}>) => void;
  updateCubeValues: (values: number[]) => void;
}>({
  state: initialState,
  updateDealbreakers: () => {},
  updateCubeValues: () => {}
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<UserState>(() => {
    // Load from localStorage on initialization
    try {
      const savedDealbreakers = localStorage.getItem('dealbreakers');
      const savedCubeValues = localStorage.getItem('userLineValues');
      
      return {
        dealbreakers: savedDealbreakers ? JSON.parse(savedDealbreakers) : [],
        cubeValues: savedCubeValues ? JSON.parse(savedCubeValues).values : [5, 5, 5, 5, 5, 5, 5]
      };
    } catch (e) {
      console.error('Error loading stored values:', e);
      return initialState;
    }
  });

  // Update functions
  const updateDealbreakers = (values: Array<{questionId: string; value: number}>) => {
    setState(prev => ({ ...prev, dealbreakers: values }));
    localStorage.setItem('dealbreakers', JSON.stringify(values));
  };

  const updateCubeValues = (values: number[]) => {
    setState(prev => ({ ...prev, cubeValues: values }));
    localStorage.setItem('userLineValues', JSON.stringify({ values }));
  };

  return (
    <UserContext.Provider value={{ state, updateDealbreakers, updateCubeValues }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => useContext(UserContext);
