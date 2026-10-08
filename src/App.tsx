import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "@components/organisms";
import { Home, Finder } from "@components/pages";
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
