import React from "react";
import { Link } from "react-router-dom";
import "./LoginFooter.jsx.css";

const LoginFooter = () => {
  return (
    <div className="footer-wrapper">
      <div className="nav-footer">
        <h1>123 Fakturera</h1>

        <ul className="footer-links">
          <li>
            <Link to="/#">Home</Link>
          </li>
          <li>
            <Link to="/#">Order</Link>
          </li>
          <li>
            <Link to="/#">Contact Us</Link>
          </li>
        </ul>
      </div>

      <hr />

      <div className="copyright-tag">
        <p>© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginFooter;
