import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";

export default function Buy() {
  const [filterVars, setFilterVars] = useState({
    brand: [],
    model: [],
    generation: [],
    body: [],
    transmission: [],
    engine: [],
    drive: [],
  });
  const [filters, setFilters] = useState({
    brand: null,
    model: null,
    generation: null,
    body: null,
    transmission: null,
    engine: null,
    drive: null,
    volumeFrom: null,
    volumeTo: null,
    yearFrom: null,
    yearTo: null,
    mileageFrom: null,
    mileageTo: null,
    priceFrom: null,
    priceTo: null,
  });
  const baseLimit = 8; // Initial number of cars to load
  const shiftLimit = 8; // Number of cars to load on each button click
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(baseLimit);

  const buildQueryString = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/buy_car/get_cars?limit=${limit}&${buildQueryString()}`
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
  }, [filters, limit]); // Добавляем filters в зависимости

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + shiftLimit);
  };

  useEffect(() => {
    // Fetch filter variables
    fetch("/api/buy_car/get_variables")
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          console.error("Filter vars error:", data.detail);
          return;
        }
        setFilterVars(data);
      })
      .catch((err) => console.error("Fetch filter vars error:", err));
  }, []);

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Filter Panel */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Brand Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Марка
              </label>
              <select
                className="filter-input"
                value={filters.brand || ""}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.brand.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            {/* Model Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Модель
              </label>
              <select
                className="filter-input"
                value={filters.model || ""}
                onChange={(e) =>
                  setFilters({ ...filters, model: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.model.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            {/* Other Filters */}
            {["generation", "body", "transmission", "engine", "drive"].map(
              (filterKey) => (
                <div key={filterKey}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  </label>
                  <select
                    className="filter-input"
                    value={filters[filterKey] || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        [filterKey]: e.target.value || null,
                      })
                    }
                  >
                    <option value="">Все</option>
                    {filterVars[filterKey].map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}
            {/* Numeric Filters */}
            {[
              { key: "volume", label: "Объем" },
              { key: "year", label: "Год" },
              { key: "mileage", label: "Пробег" },
              { key: "price", label: "Цена" },
            ].map(({ key, label }) => (
              <div className="flex space-x-2" key={key}>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    className="filter-input"
                    value={filters[`${key}From`] || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        [`${key}From`]: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    placeholder="От"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    &nbsp;
                  </label>
                  <input
                    type="number"
                    className="filter-input"
                    value={filters[`${key}To`] || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        [`${key}To`]: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    placeholder="До"
                  />
                </div>
              </div>
            ))}
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
                className="bg-accent text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Посмотреть еще"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
