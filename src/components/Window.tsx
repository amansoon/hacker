import { useState, useEffect, ChangeEvent } from "react";
import Draggable from "react-draggable";
import * as Feather from "react-feather";
import ReactDropdown from "react-dropdown";
import Slider from "rc-slider";

const fonts = ["fira code", "menorope", "roboto", "Cascadia Mono", "Sans Serif", "Space Mono"];
const colors = ["red", "blue", "orange", "yellow", "white"];

const Window = () => {
  const [color, setColor] = useState("green");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState(fonts[1]);
  const [speed, setSpeed] = useState(10);
  const [source, setSource] = useState<string>("");

  const fontFamilyHandler = (data: { value: string; label: string }) => {
    setFontFamily(data.value);
  };

  const fontSizeHandler = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      setFontSize(value);
    }
  };

  const speedHandler = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      setSpeed(value);
    }
  };

  const colorHandler = (value: string) => {
    setColor(value);
  };

  const sourceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = () => {
        setSource(reader.result as string);
      };
    }
  };

  return (
    <Draggable bounds="parent" handle=".window__title">
      <div className="window">
        <div className="window__header">
          <div className="window__header-wrapper">
            <div className="window__title"> Settings </div>
            <button className="window__close">
              {" "}
              <Feather.X size={18} strokeWidth={2.5} strokeLinecap="butt" />{" "}
            </button>
          </div>
        </div>
        <div className="window__body">
          <div className="window__body-wrapper">
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
                  <Slider min={2} max={20} step={1} value={speed} onChange={speedHandler} />
                </div>
                <input
                  className="window__option-input"
                  type="number"
                  value={speed}
                  min={2}
                  max={20}
                  onChange={(e) => speedHandler(parseInt(e.target.value))}
                />
              </div>
              {/* font size */}
              <div className="window__option">
                <span className="window__option-name"> Font size </span>
                <div className="window__slider">
                  <Slider min={8} max={48} value={fontSize} onChange={fontSizeHandler} />
                </div>
                <input
                  className="window__option-input"
                  type="number"
                  min={8}
                  max={48}
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
      </div>
    </Draggable>
  );
};

export default Window;
