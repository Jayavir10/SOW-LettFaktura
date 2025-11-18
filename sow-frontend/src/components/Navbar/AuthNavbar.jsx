import React, { useContext, useState } from "react";
import "./AuthNavbar.jsx.css";
import profile from "../../assets/profile.png";
import { Link } from "react-router-dom";
import GB from "../../assets/GB.png";
import SE from "../../assets/SE.png";
import { AppContext } from "../../Context/AppContext";

const languageOptions = [
  { code: "en", label: "English", flag: GB },
  { code: "sv", label: "Svenska", flag: SE },
];

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang, sidebarOpen, setSidebarOpen } = useContext(AppContext);
  
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
        <nav className="auth-nav">
          <div className="auth-profile-wrapper">
            <img src={profile} alt="Profile Image" className="auth-profile-img" />
            <div className="profile-details">
              <p>Jayavir Basnet</p>
              <p>Storfjord AS</p>
            </div>
          </div>
  
          <div className="auth-menu-lang-wrapper">
            <button
              className="auth-hamburger"
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
            >
              <span className={`auth-hb-line`}></span>
              <span className={`auth-hb-line`}></span>
              <span className={`auth-hb-line`}></span>
            </button>
  
            <div className="auth-lang-wrapper">
              <button className="auth-lang-btn" onClick={toggleDropdown} type="button">
                <span className="auth-lang-text">{selectedLanguage.label}</span>
                <img
                  src={selectedLanguage.flag}
                  alt={`${selectedLanguage.code} flag`}
                  className="auth-lang-flag"
                />
              </button>
  
              {isOpen && (
                <ul className="auth-lang-menu">
                  {languageOptions.map((option) => (
                    <li
                      key={option.code}
                      className={`auth-lang-item ${
                        option.code === selectedLanguage.code ? "auth-selected" : ""
                      }`}
                      onClick={() => handleLanguageSelect(option)}
                    >
                      <span>{option.label}</span>
                      <img
                        src={option.flag}
                        alt={`${option.label} flag`}
                        className="auth-lang-flag-menu"
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

export default AuthNavbar;
