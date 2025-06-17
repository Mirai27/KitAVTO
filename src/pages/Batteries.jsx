import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

// Словарь для перевода фильтров аккумуляторов
const FILTER_LABELS = {
  brand: "Бренд",
  capacity: "Ёмкость",
  voltage: "Напряжение",
  polarity: "Полярность",
  terminal_type: "Тип клемм",
  // ...добавьте другие ключи по мере необходимости...
};

export default function Batteries() {
  const [filterVars, setFilterVars] = useState({});
  const [filters, setFilters] = useState({});
  const baseLimit = 8;
  const shiftLimit = 8;
  const [batteries, setBatteries] = useState([]);
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
    async function fetchBatteries() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/parts/batteries/get_batteries?limit=${limit}&${buildQueryString()}`
        );
        const data = await response.json();
        setBatteries(data.items);
      } catch (err) {
        console.error("Ошибка при загрузке аккумуляторов:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBatteries();
  }, [filters, limit]);

  useEffect(() => {
    fetch("/api/parts/batteries/get_variables")
      .then((res) => res.json())
      .then((data) => setFilterVars(data))
      .catch((err) => console.error("Ошибка при загрузке фильтров:", err));
  }, []);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + shiftLimit);
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(filterVars).map((filterKey) => (
              <div key={filterKey}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {FILTER_LABELS[filterKey] ||
                    filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
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
            ))}
          </div>
        </div>
        {loading && batteries.length === 0 ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {batteries.map((battery) => (
                <ProductCard key={battery.id} product={battery} />
              ))}
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
