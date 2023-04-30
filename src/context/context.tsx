import { useReducer, createContext, ReactNode, useState, useEffect, useContext } from "react";
import { State, ContextType, ActionKind } from "./types";
import { reducer } from "./reducer";
import { code } from "../data/code";

const initialState: State = {
  color: "green",
  fontFamily: "Fira Code",
  fontSize: 16,
  speed: 5,
  source: code,
};

const context = createContext<ContextType>({ state: initialState } as ContextType);

type props = {
  children: ReactNode;
};

export default function AppProvider({ children }: props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const speed = localStorage.getItem("speed");
    const color = localStorage.getItem("color");
    const fontSize = localStorage.getItem("fontSize");
    const fontFamily = localStorage.getItem("fontFamily");
    const source = localStorage.getItem("source");
    if (speed && color && fontSize && fontFamily && source) {
      dispatch({ type: ActionKind.SET_TYPER, payload: { speed, color, fontSize, fontFamily, source } });
    }
  }, []);

  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
}

export function useAppContext() {
  return useContext(context);
}
