import React, { use, useEffect, useRef, useState } from "react";
import { code } from "@/data/code";

/*
 *   color
 *   speed
 *   font
 *   source
 *   font_size
 */

import * as Feather from "react-feather";
import Header from "@/components/Header";
import Window from "@/components/Window";
import { useAppContext } from "@/context/context";
import { ActionKind } from "@/context/types";
import HelpWindow from "@/components/HelpWindow";
import SettingsWindow from "@/components/SettingsWindow";
import AboutWindow from "@/components/AboutWindow";

export default function Home() {
  const { state, dispatch } = useAppContext();
  const { fontFamily, speed, fontSize, color, source, isTyperSettings, windowCount } = state;

  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const keydownHandler = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const addMoreText = () => {
    if (text.length < source.length) {
      const end = cursor + speed < source.length ? cursor + speed : undefined;
      setText((prevText) => prevText + source.substring(cursor, end));
      setCursor((oldCursor) => oldCursor + speed);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
      console.log(codeRef.current.scrollHeight);
    }
  }, [text]);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    addMoreText();
  };

  const windowHandler = () => {
    dispatch({ type: ActionKind.SET_TYPER, payload: { isTyperSettings: !isTyperSettings } });
  };

  return (
    <main className="">
      <Header />
      <div className="code" ref={codeRef}>
        <textarea className="code-area" ref={textAreaRef} onChange={changeHandler}></textarea>
        {/* <div className="code-wrapper"> */}
        <pre className="code-pre" style={{ fontFamily, fontSize: fontSize, color: color }}>
          <span>{text}</span>
          <span className="code-cursor">|</span>
        </pre>
        {/* sidebar */}
        <div className="code-setting">
          <button>
            <Feather.X size={20} />
          </button>
          <button onClick={() => windowHandler()}>
            <Feather.Settings size={20} />
          </button>
        </div>
        {/* </div> */}
      </div>
      {/* <Window /> */}
      <SettingsWindow />
      <HelpWindow />
      <AboutWindow />
    </main>
  );
}