import React, { createContext, useContext } from "react";
import { getStoregeItem, setStoregeItem } from "utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;

  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;

    const newState = { ...prevState, jwtToken, isAuthenticated: true };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStoregeItem("jwtToken", jwtToken);
    });
  } else if (type === DELETE_TOKEN) {
    const newState = { ...prevState, jwtToken: "", isAuthenticated: false };
    return UpdateWithSideEffect(newState, () => {
      setStoregeItem("jwtToken", "");
    });
  }
  return prevState;
};
export const AppProvider = ({ children }) => {
  const jwtToken = getStoregeItem("jwtToken", "");
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken,
    isAuthenticated: jwtToken.length > 0,
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
