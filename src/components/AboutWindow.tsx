import React, { useEffect, useState } from "react";
import WindowLayout from "./WindowLayout";
import { useAppContext } from "@/context/context";
import { ActionKind } from "@/context/types";

type Props = {};

function AboutWindow({}: Props) {
  const [isFocused, setFocused] = useState(true);
  const { state, dispatch } = useAppContext();
  const { isAboutWindow } = state;
  const windowName = "about";

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
    if (isAboutWindow) {
      setFocused(true);
    }
  }, [isAboutWindow]);

  const close = () => {
    console.log("Close");
    dispatch({ type: ActionKind.SET_TYPER, payload: { isAboutWindow: false } });
  };

  return (
    <WindowLayout title="About" isShow={isAboutWindow} close={close} isFocused={isFocused} windowName={windowName}>
      <p>
        Created in 2011, Hacker Typer arose from a simple desire to look like the stereotypical hacker in movies and pop
        culture. Since that time, it has brought smiles to millions of people across the globe. Plus, many of you have
        temporarily transformed into hackers yourselves, all from a few clicks on the keyboard (and some programming
        magic behind the scenes!).
      </p>
      <p>
        Also, if you are using Hacker Typer in any of your projects, videos or images, feel free to reach out! It’s
        amazing to see what happens when people’s creativity interacts with this site.
      </p>
      <p>
        You can reach the developer here: hackertyper@duiker101.net And please note: No, I will kindly not hack into
        anyone’s personal property, so please skip these requests. Thanks! You can find more info at
      </p>
    </WindowLayout>
  );
}

export default AboutWindow;
