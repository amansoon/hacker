import { Dispatch } from "react";

export type State = {
  isFocus: boolean,

  color: string;
  fontFamily: string;
  fontSize: number;
  speed: number;
  source: string;

  maxZI: number,
  isTyperSettings: boolean;
  isAboutWindow: boolean;
  isHelpWindow: boolean;
  windowCount: number;
};

export type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export enum ActionKind {
  SET_TYPER,
}

export type Action = {
  type: ActionKind;
  payload: any;
};
