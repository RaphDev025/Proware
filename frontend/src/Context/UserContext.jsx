import React, { createContext, useContext, useState } from 'react';

// Create a context with an initial value of null
const UserContext = createContext(null);

// Create a provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
  };

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
