import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login/Login.jsx'
import Header from "./components/Header/Header.jsx";
import Terms from "./pages/Terms/Terms.jsx";
function App() {

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
