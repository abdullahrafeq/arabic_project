import React, { createContext, useContext } from 'react';

const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  return (
    <BaseUrlContext.Provider value={BASE_URL}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => useContext(BaseUrlContext);
