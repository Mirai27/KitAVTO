import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Tires() {
  const [filterVars, setFilterVars] = useState({ var1: [], var2: [] });
  const [filters, setFilters] = useState({ var1: null, var2: null });
  const baseLimit = 8;
  const shiftLimit = 8;
  const [tires, setTires] = useState([]);
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
    async function fetchTires() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/parts/parts/get_tires?limit=${limit}&${buildQueryString()}`
        );
        const data = await response.json();
        setTires(data);
      } catch (err) {
        console.error("Ошибка при загрузке шин:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTires();
  }, [filters, limit]);

  useEffect(() => {
    fetch("/api/parts/parts/get_variables")
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Шины</h1>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["var1", "var2"].map((filterKey) => (
              <div key={filterKey}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filterKey.toUpperCase()}
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
        {loading && tires.length === 0 ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tires.map((tire) => (
                <ProductCard key={tire.id} product={tire} />
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
