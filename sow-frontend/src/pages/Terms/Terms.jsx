import React, { useContext } from "react";
import "./Terms.jsx.css";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();
  const { t } = useContext(AppContext);
  return (
    <div className="terms-wrapper">
      <h1 className="term-title">{t("terms_title")}</h1>
      <div className="terms-btn-wrapper">
        <button onClick={() => navigate('/')}>{t("terms_btn-text")}</button>
      </div>
      <div
        className="terms-box"
        dangerouslySetInnerHTML={{ __html: t("terms_main") }}
      ></div>
      <div className="terms-btn-wrapper">
        <button onClick={() => navigate('/')}>{t("terms_btn-text")}</button>
      </div>
    </div>
  );
};

export default Terms;
