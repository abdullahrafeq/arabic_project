import React, { createContext, useContext } from 'react';

const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
  const apiUrl = /choreo-apis/arabicexplorerproject/server/v1

  const BASE_URL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : apiUrl;

  return (
    <BaseUrlContext.Provider value={BASE_URL}>
      {children}
    </BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => useContext(BaseUrlContext);
