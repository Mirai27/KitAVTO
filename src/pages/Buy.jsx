import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";

// Словарь для отображения ключей фильтров
const FILTER_LABELS = {
  brand: "Марка",
  model: "Модель",
  body: "Кузов",
  generation: "Поколение",
  engine: "Двигатель",
  transmission: "Коробка",
  drive: "Привод",
  fuel: "Топливо",
  seats: "Вместимость",
  color: "Цвет",
  volume: "Объем",
  year: "Год",
  volume_from: "Объем (От)",
  volume_to: "Объем (До)",
  year_from: "Год (От)",
  year_to: "Год (До)",
};

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
    // Асинхронный запрос по шаблону
    fetch("/api/buy_car/get_variables")
      .then((res) => res.json())
      .then((data) => {
        setFilterVars(data);
        console.log("Fetched filter variables:", data);
        // Инициализируем filters на основе ключей из filterVars
        const initialFilters = Object.keys(data).reduce((acc, key) => {
          acc[key] = null; // теперь значения, а не массив объектов
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
      .catch((err) => console.error("Error fetching filter variables:", err));
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
        console.log("Fetched car data:", data);
        if (data.detail) {
          console.error("Car data error:", data.detail);
          return;
        }
        setCars(data.items); // Обновляем список машин
      } catch (err) {
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
          <div className="bg-white p-4 rounded-lg mb-6 shadow-sm">
            {/* Грид для brand, model, generation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {["brand", "model", "generation"].map((key) =>
                filterVars[key] ? (
                  <div key={key}>
                    <select
                      className="filter-input"
                      value={filters[key] || ""}
                      onChange={(e) => handleSelectChange(key, e.target.value)}
                    >
                      <option value="" disabled hidden>
                        {FILTER_LABELS[key] ||
                          key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                      <option value="">Все</option>
                      {filterVars[key].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null
              )}
            </div>
            {/* Грид для остальных фильтров */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {Object.entries(filterVars).map(([key, options]) => {
                if (
                  key === "brand" ||
                  key === "model" ||
                  key === "generation" ||
                  key === "year_from" ||
                  key === "year_to" ||
                  key === "volume_from" ||
                  key === "volume_to"
                ) {
                  return null;
                }
                return (
                  <div key={key}>
                    <select
                      className="filter-input"
                      value={filters[key] || ""}
                      onChange={(e) => handleSelectChange(key, e.target.value)}
                    >
                      <option value="" disabled hidden>
                        {FILTER_LABELS[key] ||
                          key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                      <option value="">Все</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
              {/* Цена (От/До) */}
              <div className="flex space-x-2 col-span-2">
                <input
                  type="number"
                  className="filter-input"
                  value={filters.price_from || ""}
                  onChange={(e) =>
                    handleInputChange("price_from", e.target.value)
                  }
                  placeholder="Цена (От)"
                />
                <input
                  type="number"
                  className="filter-input"
                  value={filters.price_to || ""}
                  onChange={(e) =>
                    handleInputChange("price_to", e.target.value)
                  }
                  placeholder="Цена (До)"
                />
              </div>
              {/* Пробег (От/До) */}
              <div className="flex space-x-2 col-span-2">
                <input
                  type="number"
                  className="filter-input"
                  value={filters.mileage_from || ""}
                  onChange={(e) =>
                    handleInputChange("mileage_from", e.target.value)
                  }
                  placeholder="Пробег (От)"
                />
                <input
                  type="number"
                  className="filter-input"
                  value={filters.mileage_to || ""}
                  onChange={(e) =>
                    handleInputChange("mileage_to", e.target.value)
                  }
                  placeholder="Пробег (До)"
                />
              </div>
              {/* Объем (От/До) */}
              <div className="flex space-x-2 col-span-2">
                <input
                  type="number"
                  className="filter-input"
                  value={filters.volume_from || ""}
                  onChange={(e) =>
                    handleInputChange("volume_from", e.target.value)
                  }
                  placeholder="Объем (От)"
                />
                <input
                  type="number"
                  className="filter-input"
                  value={filters.volume_to || ""}
                  onChange={(e) =>
                    handleInputChange("volume_to", e.target.value)
                  }
                  placeholder="Объем (До)"
                />
              </div>
              {/* Год (От/До) */}
              <div className="flex space-x-2 col-span-2">
                <input
                  type="number"
                  className="filter-input"
                  value={filters.year_from || ""}
                  onChange={(e) =>
                    handleInputChange("year_from", e.target.value)
                  }
                  placeholder="Год (От)"
                />
                <input
                  type="number"
                  className="filter-input"
                  value={filters.year_to || ""}
                  onChange={(e) =>
                    handleInputChange("year_to", e.target.value)
                  }
                  placeholder="Год (До)"
                />
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