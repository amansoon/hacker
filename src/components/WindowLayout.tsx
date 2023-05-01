import { useState, useEffect, ChangeEvent, ReactNode } from "react";
import Draggable from "react-draggable";
import * as Feather from "react-feather";

type props = {
  children: ReactNode;
  title: string;
  isShow: boolean;
  isFocused: boolean,
  windowName: string,
  close: () => void;
};

const WindowLayout = ({ children, title, isShow, isFocused, windowName, close, }: props) => {

  return (
    <Draggable bounds="parent" handle=".window__title">
      <div className={`window window--${windowName} ${isFocused ? "window--focused" : ""} ${!isShow ? "window--hidden" : ""}`}>
        <div className={`window__header`}>
          <div className="window__title"> {title} </div>
          <button className="window__close" onClick={() => close()}>
            <Feather.X size={18} strokeWidth={2.5} strokeLinecap="butt" />
          </button>
        </div>
        <div className="window__body">{children}</div>
      </div>
    </Draggable>
  );
};

export default WindowLayout;
