import React from "react";
import css from "../styles/folder.module.css";
import * as Feather from "react-feather";

type Props = {};

function Folder({}: Props) {
  return (
    <div className={css["folder"]}>
      <div className={css["folder__wrapper"]}>
        <div className={css["folder-top"]}></div>
        <div className={css["folder-bottom"]}></div>
      </div>
      <div className={css["folder__name"]}>Typing Simulator</div>
    </div>
  );
}

export default Folder;
