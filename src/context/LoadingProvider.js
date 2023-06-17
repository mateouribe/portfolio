import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  //TODO: set isLoadingFinished to false
  const [isLoadingFinished, setIsLoadingFinished] = useState(true);
  return (
    <LoadingContext.Provider
      value={{
        isLoadingFinished,
        setIsLoadingFinished,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingProvider;
