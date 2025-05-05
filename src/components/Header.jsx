import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaBell, FaCog } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageNames = {
    sell: "Продажа авто",
    buy: "Покупка авто",
    rent: "Аренда авто",
    finance: "Кредит и лизинг",
    reviews: "Отзывы и сравнения",
    parts: "Запчасти",
    tires: "Шины",
    leavereview: "Оставить отзыв",
  };

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((crumb) => pageNames[crumb] || crumb.charAt(0).toUpperCase() + crumb.slice(1));

  function handleLogoAction(link, title) {
    navigate(link);
    console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.header
        key={location.pathname}
        className="bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container my-10 mx-auto px-4 transition-normal duration-300 ease-out flex flex-col">
          <div className="flex justify-between items-center">
            <h1
              onClick={() => handleLogoAction("/", "KitAVTO")}
              className="cursor-pointer font-sans text-4xl text-primary font-semibold"
            >
              KitAVTO
            </h1>
            <div className="flex items-center space-x-2 md:space-x-6">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaHeart className="text-primary text-2xl" />
              </button>
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaBell className="text-primary text-2xl" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaCog className="text-primary text-2xl" />
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                П
              </div>
            </div>
          </div>
        </div>
        {breadcrumbs.length > 0 && (
          <div className="container mx-auto px-4 transition-normal duration-300 ease-out flex flex-col">
            <nav className="m-8 text-lg text-gray-600">
              Главная {breadcrumbs.length > 0 && " > "} {breadcrumbs.join(" > ")}
            </nav>
          </div>
        )}
      </motion.header>
    </AnimatePresence>
  );
}
