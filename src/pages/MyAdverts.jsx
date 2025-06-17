import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

export default function MyAdverts() {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAds() {
      setLoading(true);
      try {
        const response = await fetch("/api/buy_car/get_my_ads");
        const data = await response.json();
        setAdverts(data.items || []);
      } catch {
        setAdverts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMyAds();
  }, []);

  return (
    <main className="bg-gray-50 py-4 min-h-screen">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <h2 className="text-2xl font-bold mb-6">Мои объявления</h2>
        {loading ? (
          <div className="text-center py-8">Загрузка...</div>
        ) : adverts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Нет объявлений</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adverts.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
