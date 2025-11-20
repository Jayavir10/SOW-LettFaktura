import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import PriceList from "./pages/PriceList/PriceList.jsx";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import GuestNavbar from "./components/Navbar/GuestNavbar.jsx";
import AuthNavbar from "./components/Navbar/AuthNavbar.jsx";
import AuthSidebar from "./components/Navbar/AuthSidebar.jsx";
import background from "./assets/background.webp";

function App() {
  const { auth } = useContext(AppContext);
  return auth ? (
    <>
      <AuthNavbar />
      <div style={{ display: "flex" }}>
        <AuthSidebar />
        <div
          className="auth-content"
          style={{ padding: "20px 35px 20px 35px", backgroundColor: "white" }}
        >
          <Routes>
            <Route path="/price-list" element={<PriceList />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="site-bg" aria-hidden="true">
        <img src={background} alt="background image" className="bg-img" />
      </div>
      <GuestNavbar />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
