import React, {useState} from "react";
import "./Login.jsx.css";
import 'font-awesome/css/font-awesome.min.css';


const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Log in</h1>

        <div className="login-form-wrapper">
          <div className="login-form">
            <label htmlFor="email">Enter your email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
            />
          </div>

          <div className="login-form password-wrapper">
            <label htmlFor="password">Enter your password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
            />

            <span className="toggle-password">
              {showPassword ? (
                <i
                  className="fa fa-eye-slash password-icon"
                  onClick={() => setShowPassword(false)} />
              ) : (
                <i
                  className="fa fa-eye password-icon"
                  onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
        </div>

        <div className="login-btn-wrapper">
          <button className="login-btn">Log in</button>
        </div>

        <div className="link-container">
          <a href="/#">
            Register
          </a>
          
          <a href="/#">
            Forgotten Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
