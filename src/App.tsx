import { Routes, Route } from "react-router-dom";

import Header from "./components/organisms/Header/Header";

import Home from "./pages/Home/Home";
import Finder from "./pages/Finder/Finder";
import Footer from "./components/organisms/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/finder" element={<Finder />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
