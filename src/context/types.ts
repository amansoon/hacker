import { Dispatch } from "react";

export type State = {
  color: string;
  fontFamily: string;
  fontSize: number;
  speed: number;
  source: string;
};

export type ContextType = {
  state: State,
  dispatch: Dispatch<Action>
}

export enum ActionKind {
    SET_TYPER
}

export type Action = {
  type: ActionKind,
  payload: any,
}