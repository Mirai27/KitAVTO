import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Finance from "./pages/Finance";
import Buy from "./pages/Buy";
import PageTransition from "./components/PageTransition";

function App() {
  const location = useLocation();
  
  return (
    <div className="app">
      <Header />
      <div className="page-content">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/buy" element={<Buy />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer />
    </div>
  );
}

export default App;
