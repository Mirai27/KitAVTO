import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";

export default function Buy() {
  const [filterVars, setFilterVars] = useState({});
  const [filters, setFilters] = useState({
    price_from: null,
    price_to: null,
    mileage_from: null,
    mileage_to: null,
  });
  const baseLimit = 8; // Initial number of cars to load
  const shiftLimit = 8; // Number of cars to load on each button click
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(baseLimit);

  useEffect(() => {
    // Fetch filter variables
    fetch("/api/buy_car/get_variables")
      .then((res) => res.json())
      .then((data) => {
        setFilterVars(data);

        // Инициализируем filters на основе ключей из filterVars
        const initialFilters = Object.keys(data).reduce((acc, key) => {
          acc[key] = Array.isArray(data[key]) ? null : null; // null для одиночного выбора
          return acc;
        }, {});

        // Добавляем price и mileage в filters
        setFilters({
          ...initialFilters,
          price_from: null,
          price_to: null,
          mileage_from: null,
          mileage_to: null,
        });
      })
      .catch((err) => console.error("Fetch filter vars error:", err));
  }, []);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("limit", limit);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        params.append(key, value); // Добавляем только заполненные значения
      }
    });

    return params.toString();
  };

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/buy_car/get_cars?${buildQueryString()}`
        );
        const data = await response.json();
        if (data.detail) {
          console.error("Car data error:", data.detail);
          return;
        }
        setCars(data); // Обновляем список машин
      } catch (err) {
        console.error("Fetch car data error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [filters, limit]);

  const handleSelectChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value || null,
    }));
  };

  const handleInputChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value ? Number(value) : null,
    }));
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + shiftLimit);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="buy-page"
        className="bg-gray-50 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
          {/* Filter Panel */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {/* Остальные фильтры */}
              {Object.entries(filterVars).map(([key, options]) => {
                if (key === "volume" || key === "year") {
                  // Поля для ввода диапазона
                  return (
                    <div className="flex space-x-2" key={key}>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {key === "volume"
                            ? "Объем"
                            : key === "year"
                            ? "Год"
                            : ""}{" "}
                          (От)
                        </label>
                        <input
                          type="number"
                          className="filter-input"
                          value={filters[`${key}From`] || ""}
                          onChange={(e) =>
                            handleInputChange(`${key}From`, e.target.value)
                          }
                          placeholder="От"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {key === "volume"
                            ? "Объем"
                            : key === "year"
                            ? "Год"
                            : ""}{" "}
                          (До)
                        </label>
                        <input
                          type="number"
                          className="filter-input"
                          value={filters[`${key}To`] || ""}
                          onChange={(e) =>
                            handleInputChange(`${key}To`, e.target.value)
                          }
                          placeholder="До"
                        />
                      </div>
                    </div>
                  );
                } else {
                  // Dropdown menu
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <select
                        className="filter-input"
                        value={filters[key] || ""}
                        onChange={(e) => handleSelectChange(key, e.target.value)}
                      >
                        <option value="">Все</option>
                        {options.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
              })}
              <div className="flex space-x-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цена
                  </label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      className="filter-input"
                      value={filters.price_from || ""}
                      onChange={(e) =>
                        handleInputChange("price_from", e.target.value)
                      }
                      placeholder="От"
                    />
                    <input
                      type="number"
                      className="filter-input"
                      value={filters.price_to || ""}
                      onChange={(e) =>
                        handleInputChange("price_to", e.target.value)
                      }
                      placeholder="До"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Пробег
                  </label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      className="filter-input"
                      value={filters.mileage_from || ""}
                      onChange={(e) =>
                        handleInputChange("mileage_from", e.target.value)
                      }
                      placeholder="От"
                    />
                    <input
                      type="number"
                      className="filter-input"
                      value={filters.mileage_to || ""}
                      onChange={(e) =>
                        handleInputChange("mileage_to", e.target.value)
                      }
                      placeholder="До"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          {loading && cars.length === 0 ? (
            <div className="text-center py-8">Загрузка...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Загрузка..." : "Посмотреть еще"}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
