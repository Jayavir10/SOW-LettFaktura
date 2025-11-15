import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login/Login.jsx'
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
