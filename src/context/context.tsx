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

  isTyperSettings: false,
  isAbout: false,
  isHelp: false,
};

const context = createContext<ContextType>({ state: initialState } as ContextType);

type props = {
  children: ReactNode;
};

export default function AppProvider({ children }: props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fontFamily = localStorage.getItem("fontFamily") || "Fira Code";
    const color = localStorage.getItem("color") || "green";
    const source = localStorage.getItem("source") || code;
    const speed = localStorage.getItem("speed") ? parseInt(localStorage.getItem("speed") as string) : 4;
    const fontSize = localStorage.getItem("fontSize") ? parseInt(localStorage.getItem("fontSize") as string) : 16;
    if (speed && color && fontSize && fontFamily && source) {
      dispatch({ type: ActionKind.SET_TYPER, payload: { speed, color, fontSize, fontFamily, source } });
    }
  }, []);

  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
}

export function useAppContext() {
  return useContext(context);
}
