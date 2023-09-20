import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { BUY_NOW } from "../constants/authConstans";

export const ProductContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case BUY_NOW:
      return { ...state, productData: action.payload };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const getData = JSON.parse(localStorage.getItem("product"));
  const initialState = {};
  const [productState, productDispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ productState, productDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
