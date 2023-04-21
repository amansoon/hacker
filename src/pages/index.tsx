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
import { ChevronDown, ChevronUp } from "react-feather";

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
      <div className="code" ref={codeRef}>
        <textarea className="code-area" ref={textAreaRef} onChange={changeHandler}></textarea>
        <pre className="code-pre">
          <span>{text}</span>
          <span className="code-cursor">|</span>
          <div className="code-bottom"> </div>
        </pre>
      </div>
      <Window />
    </main>
  );
}

const FontSlider = () => {
  return (
    <div className="window__slider">
      <Slider min={8} max={50} step={1} />
    </div>
  );
};

const Window = () => {
  const options = ["fira code", "menorope", "roboto", "Cascadia Mono", "Sans Serif", "Space Mono"];

  const handleFontChange = (e) => {};

  return (
    <Draggable>
      <div className="window">
        <div className="window__header">
          <h4 className="window__title"> Settings </h4>
          <div className="window__close">{"x"}</div>
        </div>
        <div className="window__body">
          <div className="window__optionlist">
            {/* color */}
            <div className="window__option">
              <span className="window__option-name"> Color </span>
              <div className="window-colors">
                <button className="window-red window-color"> </button>
                <button className="window-green window-color"> </button>
                <button className="window-blue window-color"> </button>
                <button className="window-yellow window-color"> </button>
                <button className="window-magenta window-color"> </button>
                <button className="window-orange window-color"> </button>
              </div>
            </div>
            {/* speed */}
            <div className="window__option">
              <span className="window__option-name"> Speed </span>
              <FontSlider />
              <div>24</div>
            </div>
            {/* font size */}
            <div className="window__option">
              <span className="window__option-name"> Font size </span>
              <FontSlider />
              <div>24</div>
            </div>
            {/* font family */}
            <div className="window__option">
              <span> Font Family </span>
              <ReactDropdown
                options={options}
                onChange={handleFontChange}
                value={options[0]}
                placeholder="Select an option"
                className="dropdown"
                controlClassName="dropdown-control"
                placeholderClassName="dropdown-placeholder"
                menuClassName="dropdown-menu"
                arrowClosed={
                  <span className="dropdown-arrow">
                    <ChevronDown size={18} />{" "}
                  </span>
                }
                arrowOpen={
                  <span className="dropdown-arrow">
                    <ChevronUp size={18} />{" "}
                  </span>
                }
              />
              <span> default </span>
            </div>
            {/* source */}
            <div className="window__option">
              <span> Source </span>
              <div>
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
