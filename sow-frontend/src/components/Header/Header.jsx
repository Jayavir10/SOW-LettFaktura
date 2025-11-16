import React, { useContext } from "react";
import "./Header.jsx.css";
import { AppContext } from "../../Context/AppContext";
import GuestNavbar from "../Navbar/GuestNavbar";
import AuthNavbar from "../Navbar/AuthNavbar";

const Header = () => {
  const { auth } = useContext(AppContext);
  
  return auth ? <AuthNavbar /> : <GuestNavbar />;
};

export default Header;
