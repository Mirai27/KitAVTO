import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { b } from "framer-motion/client";
import OilFilters from "../pages/OilFilters";

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
    advert: "Объявление",
    batteries: "Аккумуляторы",
    oilfilters: "Масляные фильтры",
    login: "Вход",
    profile: "Личный кабинет",
    cart: "Корзина",
  };

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((crumb) => pageNames[crumb] || crumb.charAt(0).toUpperCase() + crumb.slice(1));

  function handleLogoAction(link, title) {
    navigate(link);
    console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
  }

  // Добавляем соответствующие заголовки и описания для страниц
  const pageHeaders = {
    sell: {
      title: "Продать машину",
      description: "Разместите объявление о продаже вашего автомобиля",
    },
    buy: {
      title: "Купить машину",
      description: "Подберите автомобиль по вашим параметрам",
    },
    rent: {
      title: "Аренда автомобиля",
      description: "Выберите из сотен доступных вариантов по лучшим ценам",
    },
    finance: {
      title: "Кредит и лизинг",
      description: "Выберите подходящую программу финансирования",
    },
    reviews: {
      title: "Отзывы и сравнения",
      description: "Реальные мнения владельцев и удобный инструмент сравнения",
    },
    parts: {
      title: "Запчасти",
      description: "Найдите нужные запчасти для вашего авто",
    },
    tires: {
      title: "Шины",
      description: "Подберите шины для любого сезона",
    },
    leavereview: {
      title: "Оставить отзыв",
      description: "Поделитесь своим опытом владения автомобилем",
    },
    batteries: {
      title: "Аккумуляторы",
      description: "Выберите аккумулятор для вашего автомобиля",
    },
    oilfilters: {
      title: "Масляные фильтры",
      description: "Найдите масляные фильтры для вашего автомобиля",
    },
    advert: {
      title: "Объявление",
      description: "Просмотр объявления о продаже автомобиля",
    },
    profile: {
      title: "Личный кабинет",
      description: "Управляйте своими данными и настройками",
    },
    cart: {
      title: "Корзина",
      description: "Просмотр и управление товарами в корзине",
    },
  };

  // Определяем текущий ключ страницы
  const currentPageKey = location.pathname.split("/").filter(Boolean).at(-1);
  const currentHeader = pageHeaders[currentPageKey];

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
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => navigate("/cart")}
                title="Корзина"
              >
                <FaShoppingCart className="text-primary text-2xl" />
              </button>
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaHeart className="text-primary text-2xl" />
              </button>
              <div
                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                onClick={() => navigate("/profile")}
                title="Личный кабинет"
              >
                П
              </div>
            </div>
          </div>
        </div>
        {breadcrumbs.length > 0 && (<hr className="mb-6 border-gray-200" />)}
        {breadcrumbs.length > 0 && (
          <div className="container mx-auto px-4 transition-normal duration-300 ease-out flex flex-col">
            
            <nav className="mb-6 text-lg text-gray-600">
              Главная {breadcrumbs.length > 0 && " > "} {breadcrumbs.join(" > ")}
            </nav>
          </div>
        )}
        {/* Новый блок заголовка страницы */}
        {currentHeader && (
          <section className="container mx-auto px-4 transition-normal duration-300 ease-out flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentHeader.title}</h1>
            <p className="text-lg md:text-xl text-gray-400 mb-6">{currentHeader.description}</p>
          </section>
        )}
      </motion.header>
    </AnimatePresence>
  );
}
