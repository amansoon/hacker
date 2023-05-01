import { useState, useEffect, ChangeEvent } from "react";
import Draggable from "react-draggable";
import * as Feather from "react-feather";
import ReactDropdown from "react-dropdown";
import Slider from "rc-slider";
import { useAppContext } from "@/context/context";
import { ActionKind } from "@/context/types";

const fonts = ["fira code", "menorope", "roboto", "Cascadia Mono", "Sans Serif", "Space Mono"];
const colors = ["red", "blue", "orange", "yellow", "white"];

const Window = () => {
  const [isFocused, setFocused] = useState(false);

  const { state, dispatch } = useAppContext();
  const { color, fontSize, fontFamily, speed, source, isTyperSettings } = state;

  useEffect(() => {
    document.body.addEventListener("mousedown", focusHandler);
    return () => {
      document.body.removeEventListener("mousedown", focusHandler);
    };
  }, []);

  const focusHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window")) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  };

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

  const closeWindow = () => {
    dispatch({ type: ActionKind.SET_TYPER, payload: { isTyperSettings: false } });
  };

  return (
    <Draggable bounds="parent" handle=".window__title">
      <div className={`window ${isFocused ? "window--focused" : ""} ${!isTyperSettings ? "window--hidden" : ""}`}>
        <div className={`window__header`}>
          <div className="window__title"> Settings </div>
          <button className="window__close" onClick={() => closeWindow()}>
            <Feather.X size={18} strokeWidth={2.5} strokeLinecap="butt" />
          </button>
        </div>
        <div className="window__body">
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
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
