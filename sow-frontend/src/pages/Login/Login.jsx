import React, { useContext, useEffect, useState } from "react";
import "./Login.jsx.css";
import "font-awesome/css/font-awesome.min.css";
import { AppContext } from "../../Context/AppContext";
import LoginFooter from "../../components/Footer/LoginFooter.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t, backendURL, setAuth, auth } = useContext(AppContext);

  useEffect(() => {
    if (auth) {
      navigate('/price-list')
    }
  },[auth, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendURL}/api/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("auth", data.token);
        setAuth(data.token);
        console.log("Login Successful");
        navigate('/price-list')
      } else {
        console.log(data.message)
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-footer-wrapper">
      <div className="login-wrapper">
        <div className="login-box">
          <h1 className="login-title">{t("login_title")}</h1>

          <form onSubmit={handleSubmit} className="login-form-wrapper">
            <div className="login-form">
              <label htmlFor="email">{t("email_label")}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-form password-wrapper">
              <label htmlFor="password">{t("login_password_label")}</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={t("login_password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <p style={{margin: "-5px", textAlign: "right", color: "red"}}>{errorMessage}</p>
            
            <div className="login-btn-wrapper">
              <button className="login-btn" type="submit">{t("login_button")}</button>
            </div>

          </form>

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
