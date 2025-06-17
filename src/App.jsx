import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Finance from "./pages/Finance";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Reviews from "./pages/Reviews";
import Parts from "./pages/Parts";
import Tires from "./pages/Tires";
import LeaveReview from "./pages/LeaveReview";
import Advert from "./pages/Advert";
import Batteries from "./pages/Batteries";
import OilFilters from "./pages/OilFilters";
import PageTransition from "./components/PageTransition";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { AuthModalProvider, useAuthModal } from "./context/AuthModalContext";
import { useEffect } from "react";

// Вынесите AppContent в отдельный компонент
function AppContent() {
  const location = useLocation();
  const { showAuthModal, setShowAuthModal } = useAuthModal();

  useEffect(() => {
    const handler = () => setShowAuthModal(true);
    window.addEventListener("open-login-modal", handler);
    return () => window.removeEventListener("open-login-modal", handler);
  }, [setShowAuthModal]);

  return (
    <>
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
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/tires" element={<Tires />} />
              <Route path="/leavereview" element={<LeaveReview />} />
              <Route path="/advert/:id" element={<Advert />} />
              <Route path="/batteries" element={<Batteries />} />
              <Route path="/oilfilters" element={<OilFilters />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} /> {/* Корзина */}
            </Routes>
          </PageTransition>
        </div>
        <PageTransition>
          <Footer />
        </PageTransition>
      </div>
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-30 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <button
              className="absolute top-1 right-1 text-gray-400 hover:text-black text-2xl"
              onClick={() => setShowAuthModal(false)}
            >
              ×
            </button>
            <Login onSuccess={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// Оборачивайте только здесь!
export default function App() {
  return (
    <AuthModalProvider>
      <AppContent />
    </AuthModalProvider>
  );
}
