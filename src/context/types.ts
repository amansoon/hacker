import { Dispatch } from "react";

export type State = {
  color: string;
  fontFamily: string;
  fontSize: number;
  speed: number;
  source: string;

  isTyperSettings: boolean;
  isAbout: boolean;
  isHelpWindow: boolean;
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
