import React, { useEffect, useState } from "react";
import WindowLayout from "./WindowLayout";
import { useAppContext } from "@/context/context";
import { ActionKind } from "@/context/types";

type Props = {};

function HelpWindow({}: Props) {
  const [isFocused, setFocused] = useState(true);
  const { state, dispatch } = useAppContext();
  const { isHelpWindow } = state;
  const windowName = "help";

  useEffect(() => {
    document.body.addEventListener("mousedown", focusHandler);
    return () => {
      document.body.removeEventListener("mousedown", focusHandler);
    };
  }, []);

  const focusHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.window--${windowName}`)) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  };

  const close = () => {
    console.log("Close");
    dispatch({ type: ActionKind.SET_TYPER, payload: { isHelpWindow: false } });
  };

  return (
    <WindowLayout title="Help" isShow={isHelpWindow} close={close} isFocused={isFocused} windowName={windowName}>
      <h1> Hello world</h1>
      {"hello world"}
    </WindowLayout>
  );
}

export default HelpWindow;
