import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const response = await fetch("/api/parts/get_buy_cart");
        const data = await response.json();
        // Преобразуем структуру: [{...item, itemType}]
        const allItems = [];
        if (data.items) {
          for (const itemType of ["oil_filters", "batteries", "tires"]) {
            (data.items[itemType] || []).forEach((item) => {
              allItems.push({ ...item, itemType });
            });
          }
        }
        setItems(allItems);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  // Удаление товара из корзины
  const handleRemove = (id, itemType) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.itemType === itemType))
    );
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {loading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Корзина пуста</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ProductCard
                key={item.id + item.name + item.itemType}
                product={item}
                itemType={item.itemType}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
