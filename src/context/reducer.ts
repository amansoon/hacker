import { Action, ActionKind, State } from "./types";

export function reducer(state: State, action: Action) {
  const { type, payload } = action;

  if (type === ActionKind.SET_TYPER) {
    return {...state, ...payload}
  }

  return state;
}
