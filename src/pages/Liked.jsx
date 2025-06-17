import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CarCard from "../components/CarCard";

const GROUP_LABELS = {
  oil_filters: "Масляные фильтры",
  batteries: "Аккумуляторы",
  tires: "Шины",
  sell_cars: "Автомобили на продажу",
  rent_cars: "Автомобили в аренду",
};

const PAGE_SIZE = 8;

export default function Liked() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    oil_filters: 1,
    batteries: 1,
    tires: 1,
    sell_cars: 1,
    rent_cars: 1,
  });

  useEffect(() => {
    async function fetchLiked() {
      setLoading(true);
      try {
        const response = await fetch("/api/main_page/get_liked");
        const data = await response.json();
        setItems(data.items || {});
      } catch {
        setItems({});
      } finally {
        setLoading(false);
      }
    }
    fetchLiked();
  }, []);

  // Функция для обновления избранного после unlike
  const refreshLiked = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/main_page/get_liked");
      const data = await response.json();
      setItems(data.items || {});
    } catch {
      setItems({});
    } finally {
      setLoading(false);
    }
  };

  // Удаление из избранного по id и группе
  const handleRemove = (id, group) => {
    setItems((prev) => ({
      ...prev,
      [group]: (prev[group] || []).filter((item) => item.id !== id),
    }));
  };

  // Для пагинации по группам
  const handleLoadMore = (group) => {
    setPage((prev) => ({ ...prev, [group]: prev[group] + 1 }));
  };

  return (
    <main className="bg-gray-50 py-4 min-h-screen">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {loading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : (
          Object.entries(GROUP_LABELS).map(([group, label]) => {
            const groupItems = items[group] || [];
            if (!groupItems.length) return null;
            // Для пагинации
            const shownItems = groupItems.slice(0, page[group] * PAGE_SIZE);
            return (
              <section key={group} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">{label}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {group === "sell_cars" || group === "rent_cars"
                    ? shownItems.map((car) => (
                        <CarCard
                          key={car.id}
                          car={car}
                          per_day={group === "rent_cars"}
                          onRemove={() => handleRemove(car.id, group)}
                        />
                      ))
                    : shownItems.map((item) => (
                        <ProductCard
                          key={item.id + item.name + group}
                          product={item}
                          itemType={group}
                          onRemove={() => handleRemove(item.id, group)}
                        />
                      ))}
                </div>
                {groupItems.length > shownItems.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => handleLoadMore(group)}
                      className="bg-accent text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                    >
                      Показать еще
                    </button>
                  </div>
                )}
              </section>
            );
          })
        )}
        {/* Если нет ни одной группы с элементами */}
        {!loading &&
          Object.values(items).every((arr) => !arr || arr.length === 0) && (
            <div className="text-center py-8 text-gray-400">Нет избранного</div>
          )}
      </div>
    </main>
  );
}
