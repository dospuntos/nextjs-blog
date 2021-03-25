import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./Header.module.css";

//import LanguageSelector from "./LanguageSelector";

export default function Header({ lang }) {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="header wrapper mt-150">
      {/* <LanguageSelector /> */}
      <div
        className={showMenu ? "button_container active" : "button_container"}
        id="toggle"
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </div>
      <div className={showMenu ? "overlay open" : "overlay"} id="overlay">
        <nav className="overlay-menu">
          <ul>
            <li>
              <Link href="/" onClick={() => setShowMenu(false)}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setShowMenu(false)}>
                {t("services")}
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setShowMenu(false)}>
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setShowMenu(false)}>
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-logo">
        <Link href="/">
          <img src="./img/logo.png" alt="Dos Puntos Design" />
        </Link>
      </div>
      <div className="secondary-logo">
        <Link href="/">
          <img src="./img/logo-horizontal.png" alt="Dos Puntos Design" />
        </Link>
      </div>
    </div>
  );
}
