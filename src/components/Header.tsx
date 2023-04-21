import React, { useEffect, useState } from "react";
import css from "./header.module.css";
import Link from "next/link";
import { Maximize, Minimize, Minus } from "react-feather";
// import fscreen from "fscreen";
import screenfull from "screenfull";

type Props = {};

function Header({}: Props) {
  const [isFullscreen, setFullscreen] = useState(false)
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
    <header className={css.header}>
      <div className={css.header__wrapper}>
        <div className={css.logo}> Being | hacker </div>
        <nav className={css.nav}>
          <div className={css.nav__item}> Explore </div>
          <div className={css.nav__item}>About</div>
          <div className={css.nav__item}> Follow Me </div>
          <div className={css.nav__item}> Help </div>
        </nav>
        <div className={css.actions}>
          <button className={css.action} onClick={() => toggleFullscreen()}>
            {isFullscreen ? <Minimize /> : <Maximize />}
          </button>
          <button className={css.action}>
            <Minus />
          </button>
          {/* <button> <Maximize /> </button> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
