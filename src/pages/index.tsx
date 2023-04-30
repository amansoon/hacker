import React, { use, useEffect, useRef, useState } from "react";
import { code } from "@/data/code";

/*
 *   color
 *   speed
 *   font
 *   source
 *   font_size
 */

import Draggable, { DraggableBounds } from "react-draggable";
import Slider from "rc-slider";
import ReactDropdown from "react-dropdown";
import * as Feather from "react-feather";
import Header from "@/components/Header";
import Window from "@/components/Window";

export default function Home() {
  const [speed, setSpeed] = useState(10);
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [source, setSource] = useState(code);

  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    });
  }, []);

  const addMoreText = () => {
    if (text.length < source.length) {
      const end = cursor + speed < source.length ? cursor + speed : undefined;
      setText((prevText) => prevText + source.substring(cursor, end));
      setCursor((oldCursor) => oldCursor + speed);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTo(0, codeRef.current.scrollHeight);
    }
  }, [text]);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    addMoreText();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("load", () => {
        setSource(reader.result as string);
      });
    }
  };

  return (
    <main className="">
      <Header />
      <div className="code" ref={codeRef}>
        {/* <div className="code-wrapper"> */}
        <textarea className="code-area" ref={textAreaRef} onChange={changeHandler}></textarea>
        <pre className="code-pre">
          <span>{text}</span>
          <span className="code-cursor">|</span>
        </pre>

        {/* sidebar */}
        <div className="code-setting">
          <button>
            <Feather.X />
          </button>
          <button>
            <Feather.Settings />
          </button>
        </div>
        {/* </div> */}
      </div>
      <Window />
    </main>
  );
}
