import React, { ChangeEvent, useEffect, useState } from "react";
import WindowLayout from "./WindowLayout";
import { useAppContext } from "@/context/context";
import { ActionKind } from "@/context/types";
import * as Feather from "react-feather";
import ReactDropdown from "react-dropdown";
import Slider from "rc-slider";

const fonts = ["fira code", "menorope", "roboto", "Cascadia Mono", "Sans Serif", "Space Mono"];
const colors = ["red", "blue", "orange", "yellow", "white"];

type Props = {};

function SettingsWindow({}: Props) {
  const [isFocused, setFocused] = useState(true);
  const { state, dispatch } = useAppContext();
  const { speed, color, fontSize, fontFamily, isTyperSettings } = state;
  const windowName = "settings";

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
    dispatch({ type: ActionKind.SET_TYPER, payload: { isTyperSettings: false } });
  };

  // ============

  const fontFamilyHandler = (data: { value: string; label: string }) => {
    localStorage.setItem("fontFamily", data.value);
    dispatch({ type: ActionKind.SET_TYPER, payload: { fontFamily: data.value } });
  };

  const fontSizeHandler = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      localStorage.setItem("fontSize", value.toString());
      dispatch({ type: ActionKind.SET_TYPER, payload: { fontSize: value } });
    }
  };

  const speedHandler = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      localStorage.setItem("speed", value.toString());
      dispatch({ type: ActionKind.SET_TYPER, payload: { speed: value } });
    }
  };

  const colorHandler = (value: string) => {
    localStorage.setItem("color", value);
    dispatch({ type: ActionKind.SET_TYPER, payload: { color: value } });
  };

  const sourceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = () => {
        localStorage.setItem("source", reader.result as string);
        dispatch({ type: ActionKind.SET_TYPER, payload: { source: reader.result } });
      };
    }
  };

  return (
    <WindowLayout title="Settings" isShow={isTyperSettings} close={close} isFocused={isFocused} windowName={windowName}>
      <div className="window__optionlist">
        {/* color */}
        <div className="window__option">
          <span className="window__option-name"> Color </span>
          <div className="window-colors">
            {colors.map((clr) => {
              return (
                <button
                  className={`window-color ${clr === color ? "window-color--selected" : ""}`}
                  style={{ backgroundColor: clr, outlineColor: clr }}
                  onClick={() => colorHandler(clr)}
                ></button>
              );
            })}
          </div>
        </div>
        {/* speed */}
        <div className="window__option">
          <span className="window__option-name"> Speed </span>
          <div className="window__slider">
            <Slider min={1} max={20} step={1} value={speed} onChange={speedHandler} />
          </div>
          <input
            className="window__option-input"
            type="number"
            value={speed}
            min={1}
            max={20}
            onChange={(e) => speedHandler(parseInt(e.target.value))}
          />
        </div>
        {/* font size */}
        <div className="window__option">
          <span className="window__option-name"> Font size </span>
          <div className="window__slider">
            <Slider min={8} max={36} value={fontSize} onChange={fontSizeHandler} />
          </div>
          <input
            className="window__option-input"
            type="number"
            min={10}
            max={36}
            value={fontSize}
            onChange={(e) => fontSizeHandler(parseInt(e.target.value))}
          />
        </div>
        {/* font family */}
        <div className="window__option">
          <span> Font Family </span>
          <ReactDropdown
            options={fonts}
            onChange={fontFamilyHandler}
            value={fontFamily}
            placeholder="Select an option"
            className="dropdown"
            controlClassName="dropdown-control"
            placeholderClassName="dropdown-placeholder"
            menuClassName="dropdown-menu"
            arrowClosed={
              <span className="dropdown-arrow">
                <Feather.ChevronDown size={18} />{" "}
              </span>
            }
            arrowOpen={
              <span className="dropdown-arrow">
                <Feather.ChevronUp size={18} />{" "}
              </span>
            }
          />
        </div>
        {/* source */}
        <div className="window__option">
          <span> Source </span>
          <div>
            <input type="file" className="window__upload" onChange={sourceHandler} />
          </div>
          <div>Reset</div>
        </div>
      </div>
    </WindowLayout>
  );
}

export default SettingsWindow;
