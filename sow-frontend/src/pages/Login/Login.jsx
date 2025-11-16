import React, { useContext, useState } from "react";
import "./Login.jsx.css";
import "font-awesome/css/font-awesome.min.css";
import { AppContext } from "../../Context/AppContext";
import LoginFooter from "../../components/Footer/LoginFooter.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useContext(AppContext);

  return (
    <div className="login-footer-wrapper">
      <div className="login-wrapper">
        <div className="login-box">
          <h1 className="login-title">{t("login_title")}</h1>

          <div className="login-form-wrapper">
            <div className="login-form">
              <label htmlFor="email">{t("email_label")}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("email_placeholder")}
              />
            </div>

            <div className="login-form password-wrapper">
              <label htmlFor="password">{t("login_password_label")}</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={t("login_password_placeholder")}
              />

              <span className="toggle-password">
                {showPassword ? (
                  <i
                    className="fa fa-eye-slash password-icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <i
                    className="fa fa-eye password-icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </span>
            </div>
          </div>

          <div className="login-btn-wrapper">
            <button className="login-btn">{t("login_button")}</button>
          </div>

          <div className="link-container">
            <a href="/#">{t("login_register_text")}</a>

            <a href="/#">{t("login_forgotPassword")}</a>
          </div>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;
