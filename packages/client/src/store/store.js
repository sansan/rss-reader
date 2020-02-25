import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";

const initialState = {
  error: null,
  user: false,
  loading: false
};

const StoreContext = createContext();

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
