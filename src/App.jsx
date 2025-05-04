import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Finance from "./pages/Finance";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Reviews from "./pages/Reviews"; // Импортируем Reviews
import Parts from "./pages/Parts"; // Импортируем Parts
import Tires from "./pages/Tires"; // Импортируем Tires
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
            <Route path="/rent" element={<Rent />} />
            <Route path="/reviews" element={<Reviews />} /> {/* Новый маршрут */}
            <Route path="/parts" element={<Parts />} /> {/* Новый маршрут */}
            <Route path="/tires" element={<Tires />} /> {/* Новый маршрут */}
          </Routes>
        </PageTransition>
      </div>
      <PageTransition>
        <Footer />
      </PageTransition>
    </div>
  );
}

export default App;
