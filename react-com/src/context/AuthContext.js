import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { SET_LOGIN } from "../constants/authConstans";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const getData = JSON.parse(localStorage.getItem("auth"));
  const initialState = { userData: getData?.isLogin ? getData : {} };
  const [authState, authDispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
