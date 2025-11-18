import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import GB from "../../assets/GB.png";
import SE from "../../assets/SE.png";
import { AppContext } from "../../Context/AppContext";
import "./GuestNavbar.jsx.css";

const languageOptions = [
  { code: "en", label: "English", flag: GB },
  { code: "sv", label: "Svenska", flag: SE },
];

const GuestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useContext(AppContext);

  const selectedLanguage =
    languageOptions.find((o) => o.code === lang) || languageOptions[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (option) => {
    setLang(option.code);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="guest-nav">
        <img src={logo} alt="Company Logo" className="guest-logo" />

        <div className="guest-menu-lang-wrapper">
          <button
            className="guest-hamburger"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
          >
            <span className={`guest-hb-line`}></span>
            <span className={`guest-hb-line`}></span>
            <span className={`guest-hb-line`}></span>
          </button>

          <ul className={`guest-nav-links ${mobileOpen ? "guest-mobile-open" : ""}`}>
            <li>
              <Link to="/#">{t ? t("menu_home") : "Home"}</Link>
            </li>
            <li>
              <Link to="/#">{t ? t("menu_order") : "Order"}</Link>
            </li>
            <li>
              <Link to="/#">{t ? t("menu_customer") : "Our Customers"}</Link>
            </li>
            <li>
              <Link to="/#">{t ? t("menu_aboutUs") : "About Us"}</Link>
            </li>
            <li>
              <Link to="/#">{t ? t("menu_contact") : "Contact Us"}</Link>
            </li>
          </ul>

          <div className="guest-lang-wrapper">
            <button className="guest-lang-btn" onClick={toggleDropdown} type="button">
              <span className="guest-lang-text">{selectedLanguage.label}</span>
              <img
                src={selectedLanguage.flag}
                alt={`${selectedLanguage.code} flag`}
                className="guest-lang-flag"
              />
            </button>

            {isOpen && (
              <ul className="guest-lang-menu">
                {languageOptions.map((option) => (
                  <li
                    key={option.code}
                    className={`guest-lang-item ${
                      option.code === selectedLanguage.code ? "guest-selected" : ""
                    }`}
                    onClick={() => handleLanguageSelect(option)}
                  >
                    <span>{option.label}</span>
                    <img
                      src={option.flag}
                      alt={`${option.label} flag`}
                      className="guest-lang-flag-menu"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default GuestNavbar;
