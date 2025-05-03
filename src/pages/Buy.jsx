import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("limit", 10);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        params.append(key, value);
      }
    });

    return params.toString();
  };

  const fetchCars = () => {
    setLoading(true);
    fetch(`/api/buy/get_data?${buildQueryString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          console.error("Car data error:", data.detail);
          return;
        }
        setCars(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch car data error:", err));
  };

  useEffect(() => {
    // Fetch filter variables
    fetch("/api/buy/get_filter_vars")
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          console.error("Filter vars error:", data.detail);
          return;
        }
        setFilterVars(data);
      })
      .catch((err) => console.error("Fetch filter vars error:", err));

    fetchCars();
  }, []);

  useEffect(() => {
    fetchCars();
  }, [filters]);

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Filter Panel */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Brand Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Марка
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

            {/* Generation Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Поколение
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filters.generation || ""}
                onChange={(e) =>
                  setFilters({ ...filters, generation: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.generation.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Body Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Кузов
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filters.body || ""}
                onChange={(e) =>
                  setFilters({ ...filters, body: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.body.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Коробка
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filters.transmission || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    transmission: e.target.value || null,
                  })
                }
              >
                <option value="">Все</option>
                {filterVars.transmission.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Engine Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Двигатель
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filters.engine || ""}
                onChange={(e) =>
                  setFilters({ ...filters, engine: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.engine.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Drive Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Привод
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={filters.drive || ""}
                onChange={(e) =>
                  setFilters({ ...filters, drive: e.target.value || null })
                }
              >
                <option value="">Все</option>
                {filterVars.drive.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Объем
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.volumeFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      volumeFrom: e.target.value
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.volumeTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      volumeTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Год
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.yearFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      yearFrom: e.target.value ? Number(e.target.value) : null,
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.yearTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      yearTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Пробег
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.mileageFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      mileageFrom: e.target.value
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.mileageTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      mileageTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceFrom: e.target.value ? Number(e.target.value) : null,
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Объем
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.volumeFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      volumeFrom: e.target.value ? Number(e.target.value) : null,
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.volumeTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      volumeTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceFrom: e.target.value ? Number(e.target.value) : null,
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Пробег
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.mileageFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      mileageFrom: e.target.value
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.mileageTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      mileageTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceFrom || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceFrom: e.target.value ? Number(e.target.value) : null,
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={filters.priceTo || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceTo: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="До"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {cars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.05, // Staggered animation
                    ease: "easeOut" 
                  }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={car.image || "/placeholder-car.jpg"}
                      alt={car.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{car.name}</h3>
                    <p className="text-gray-600 text-sm">{car.type}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-3">{car.seats} People</span>
                      <span>{car.transmission}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold">${car.price}/day</span>
                      <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                        Арендовать
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
