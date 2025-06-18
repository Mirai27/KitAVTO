import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { b } from "framer-motion/client";
import OilFilters from "../pages/OilFilters";
import Liked from "../pages/Liked";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userAvatar, setUserAvatar] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // функция для обновления аватара
  async function updateUserAvatar() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserAvatar(null);
      return;
    }
    try {
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserAvatar(data.image_path || "");
      } else {
        setUserAvatar(null);
      }
    } catch {
      setUserAvatar(null);
    }
  }

  useEffect(() => {
    updateUserAvatar();
    // слушаем событие логина/логаута
    function handleUserChanged() {
      updateUserAvatar();
    }
    window.addEventListener("user-auth-changed", handleUserChanged);
    // слушаем изменения localStorage (например, если другой вкладкой вышли)
    function handleStorage(e) {
      if (e.key === "token") updateUserAvatar();
    }
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("user-auth-changed", handleUserChanged);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Закрытие меню при клике вне меню
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
    liked: "Избранное",
    info: "Информация",
    myadverts: "Мои объявления",
    register: "Регистрация",
  };

  // Формируем массив объектов для хлебных крошек: {name, path}
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Исключаем id объявления из хлебных крошек для advert
  let filteredParts = pathParts;
  if (
    pathParts.length === 2 &&
    pathParts[0] === "advert" &&
    /^\d+$/.test(pathParts[1])
  ) {
    filteredParts = [pathParts[0]];
  }

  // Специальная логика для вложенности "Шины", "Масляные фильтры", "Аккумуляторы" в "Запчасти"
  let breadcrumbsArr = [];
  if (
    filteredParts.length === 1 &&
    ["tires", "oilfilters", "batteries"].includes(filteredParts[0])
  ) {
    breadcrumbsArr = [
      { name: pageNames["parts"], path: "/parts" },
      { name: pageNames[filteredParts[0]] || filteredParts[0].charAt(0).toUpperCase() + filteredParts[0].slice(1), path: "/" + filteredParts[0] }
    ];
  } else if (
    filteredParts.length > 1 &&
    ["tires", "oilfilters", "batteries"].includes(filteredParts[0])
  ) {
    breadcrumbsArr = [
      { name: pageNames["parts"], path: "/parts" },
      ...filteredParts.map((crumb, idx) => ({
        name: pageNames[crumb] || crumb.charAt(0).toUpperCase() + crumb.slice(1),
        path: "/" + filteredParts.slice(0, idx + 1).join("/")
      }))
    ];
  } else {
    breadcrumbsArr = filteredParts.map((crumb, idx) => ({
      name: pageNames[crumb] || crumb.charAt(0).toUpperCase() + crumb.slice(1),
      path: "/" + filteredParts.slice(0, idx + 1).join("/")
    }));
  }

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
    liked: {
      title: "Избранное",
      description: "Просмотр сохраненных товаров и объявлений",
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
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => navigate("/liked")}
                title="Избранное"
              >
                <FaHeart className="text-primary text-2xl" />
              </button>
              {/* Аватарка и выпадающее меню */}
              <div className="relative" ref={menuRef}>
                <div
                  className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden"
                  onClick={() => setMenuOpen((v) => !v)}
                  title="Меню пользователя"
                >
                  {userAvatar
                    ? <img src={"/api/images" + userAvatar} alt="Аватар" className="w-full h-full object-cover rounded-full" />
                    : "П"}
                </div>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
                    {userAvatar === null ? (
                      <>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(false); navigate("/login"); }}
                        >
                          Войти
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(false); navigate("/register"); }}
                        >
                          Зарегистрироваться
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                        >
                          Профиль
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(false); navigate("/myadverts"); }}
                        >
                          Мои объявления
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {breadcrumbsArr.length > 0 && (<hr className="mb-6 border-gray-200" />)}
        {breadcrumbsArr.length > 0 && (
          <div className="container mx-auto px-4 transition-normal duration-300 ease-out flex flex-col">
            <nav className="mb-6 text-lg text-gray-600">
              <Link to="/" className="hover:underline text-primary">Главная</Link>
              {breadcrumbsArr.map((crumb, idx) => (
                <span key={crumb.path}>
                  {" > "}
                  {idx < breadcrumbsArr.length - 1 ? (
                    <Link to={crumb.path} className="hover:underline text-primary">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-gray-600">{crumb.name}</span>
                  )}
                </span>
              ))}
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
