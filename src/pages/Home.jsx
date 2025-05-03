import DisplayCard from "../components/DisplayCard";
import { cards_info } from "../data";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

export default function Home() {
  const baseLimit = 4; // Initial number of cars to load
  const shiftLimit = 4; // Number of cars to load on each button click
  const [superOffers, setSuperOffers] = useState([]);
  const [limit, setLimit] = useState(baseLimit);

  useEffect(() => {
    async function fetchSuperOffers() {
      try {
        const response = await fetch(`/api/main_page/superoffers?limit=${limit}`);
        const data = await response.json();
        setSuperOffers(data);
      } catch (error) {
        console.error("Ошибка при загрузке суперпредложений:", error);
      }
    }

    fetchSuperOffers();
  }, [limit]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + shiftLimit);
  };

  return (
    <main className="bg-gray-50 py-4">
      <section className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <ul className="flex md:grid overflow-x-auto md:overflow-visible md:grid-cols-3 gap-4 list-none p-0 pb-4">
          {cards_info.map((card_info) => (
            <DisplayCard key={card_info.title} {...card_info} />
          ))}
        </ul>
      </section>
      <section className="container mx-auto px-4 mt-8 transition-normal duration-300 ease-out">
        <h2 className="text-2xl font-bold mb-4">Суперпредложения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {superOffers.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-accent text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Посмотреть еще
          </button>
        </div>
      </section>
    </main>
  );
}
