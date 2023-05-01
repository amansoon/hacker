import React, { useEffect, useState } from "react";
import css from "./header.module.css";
import Link from "next/link";
import { Grid, Maximize, Menu, Minimize, Minus, X } from "react-feather";
// import fscreen from "fscreen";
import screenfull from "screenfull";

type Props = {};

function Header({}: Props) {
  const [isFullscreen, setFullscreen] = useState(false);
  const [isHeader, setHeader] = useState(true);

  const toggleFullscreen = async () => {
    if (screenfull.isEnabled) {
      await screenfull.toggle();
      setFullscreen(!isFullscreen);
    }
  };

  // useEffect(() => {
  //   alert(screenfull.isFullscreen)
  // }, [screenfull])

  return (
    <header className={`${css.header} ${!isHeader && css["header--hidden"]}`}>
      <div className={css.header__wrapper}>
        <button className={css.start}>
          <Grid size={18} />
          <span> Start </span>
        </button>
        <nav className={css.nav}>
          <div className={css.nav__item}> Explore </div>
          <div className={css.nav__item}>About</div>
          <div className={css.nav__item}> Follow Me </div>
          <div className={css.nav__item}> Help </div>
        </nav>
        <div className={css.actions}>
          <button className={css.action} onClick={() => toggleFullscreen()}>
            {isFullscreen ? <Minimize strokeLinecap="butt" /> : <Maximize strokeLinecap="butt" />}
          </button>
          <button className={css.action} onClick={() => setHeader(false)}>
            <X strokeLinecap="butt" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
