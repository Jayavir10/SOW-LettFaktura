import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AuthSidebar.jsx.css";
import "font-awesome/css/font-awesome.min.css";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const sidebarLinks = [
  {
    name: "Invoices",
    path: "/invoices",
    icon: "fa fa-file-text",
    color: "#22d3ee",
  },
  { name: "Customers", path: "/customers", icon: "fa-user", color: "#38bdf8" },
  {
    name: "My Business",
    path: "/my-business",
    icon: "fa-gear",
    color: "#60a5fa",
  },
  {
    name: "Invoice Journal",
    path: "/invoice-journal",
    icon: "fa-book",
    color: "#818cf8",
  },
  { name: "Price List", path: "/price-list", icon: "fa-tag", color: "#f97316" },
  {
    name: "Multiple Invoicing",
    path: "/multiple-invoicing",
    icon: "fa-copy",
    color: "#22d3ee",
  },
  {
    name: "Unpaid Invoices",
    path: "/unpaid-invoices",
    icon: "fa-times-circle",
    color: "#f43f5e",
  },
  { name: "Offer", path: "/offers", icon: "fa-gift", color: "#facc15" },
  {
    name: "Inventory Control",
    path: "/inventory",
    icon: "fa fa-clipboard",
    color: "#22d3ee",
  },
  {
    name: "Member Invoicing",
    path: "/member-invoicing",
    icon: "fa-users",
    color: "#60a5fa",
  },
  {
    name: "Import/Export",
    path: "/import-export",
    icon: "fa-cloud-upload",
    color: "#38bdf8",
  },
  { name: "Log out", path: "/logout", icon: "fa-sign-out", color: "#ef4444" },
];

const AuthSidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const { setAuth, sidebarOpen  } = useContext(AppContext);

  useEffect(() => {
    const selectedPath = sidebarLinks.find(
      (link) => link.path === location.pathname
    );
    setActiveMenu(selectedPath ? selectedPath.name : "");
  }, [location.pathname]);

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className={`auth-sidebar ${sidebarOpen ? "show" : "hide"}`}>
      <h1 className="sidebar-title">Menu</h1>
      <hr />
      <ul className="sidebar-links">
        {sidebarLinks.map((link) => (
          <Link
            to={link.name === "Log out" ? "/" : link.path}
            key={link.name}
            onClick={() => link.name === "Log out" && logout()}
          >
            <li className={activeMenu === link.name ? "active" : ""}>
              {activeMenu === link.name && <span className="active-dot"></span>}
              <i
                className={`fa ${link.icon} sidebar-icon`}
                style={{ color: link.color }}
              ></i>
              {link.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AuthSidebar;
