import dict from "./dict.json";
import vi from "./vi.json";
import React, { createContext } from "react";

export const dictionaryList = {dict, vi};

export const RoutesContext = createContext(
  {
    dictionary: dictionaryList.dict
    
  }
);

export function RoutesProvider({ children }) {
  
  const provider = {
      dictionary: dictionaryList["dict"],
  };
  
  return (
      <RoutesContext.Provider value={provider}>
          {children}
      </RoutesContext.Provider>
  );
};