import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import PriceList from "./pages/PriceList/PriceList.jsx";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext.jsx";

function App() {
  const { auth } = useContext(AppContext);
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/price-list" element={auth ? <PriceList /> : <Navigate to={"/"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
