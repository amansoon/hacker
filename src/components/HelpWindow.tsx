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

  function focusHandler(e: MouseEvent) {
    if ((e.target as HTMLElement).closest(`.window--${windowName}`)) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }

  useEffect(() => {
    if (isHelpWindow) {
      setFocused(true);
    }
  }, [isHelpWindow]);

  const close = () => {
    console.log("Close");
    dispatch({ type: ActionKind.SET_TYPER, payload: { isHelpWindow: false } });
  };

  return (
    <WindowLayout title="Help" isShow={isHelpWindow} close={close} isFocused={isFocused} windowName={windowName}>
      <p>
        To begin, start typing on your keyboard and your hacker code will immediately appear! You can also enter full
        screen in your browser.
      </p>
      <p>
        To enhance your experience, press <kbd> Shift </kbd> or <kbd> Alt </kbd> (or <kbd> Option </kbd> for Mac) three
        times. Press <kbd> Esc </kbd> to close any dialogs.
      </p>
      <p>Configs can be modified in the Settings menu.</p>
      <p>
        The menu bar can be dismissed with the x in the bottom right corner. Refresh the page to bring it back again.
      </p>
    </WindowLayout>
  );
}

export default HelpWindow;
