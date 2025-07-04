import DisplayCard from "../components/DisplayCard";
import { cards_info } from "../data";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [superOffers, setSuperOffers] = useState([]);

  useEffect(() => {
    async function fetchSuperOffers() {
      try {
        const response = await fetch(`/api/main_page/superoffers`);
        const data = await response.json();
        setSuperOffers(data.items);
      } catch (error) {
        console.error("Ошибка при загрузке суперпредложений:", error);
      }
    }

    fetchSuperOffers();
  }, []);

  return (
    <main className="bg-gray-50 py-4">
      <section className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <ul className="flex md:grid overflow-x-auto md:overflow-visible md:grid-cols-3 gap-4 list-none p-0 pb-4 ">
          <AnimatePresence>
            {cards_info.map((card_info) => (
              <DisplayCard key={card_info.title} {...card_info} />
            ))}
          </AnimatePresence>
        </ul>
      </section>
      <section className="container mx-auto px-4 mt-8 transition-normal duration-300 ease-out">
        <h2 className="text-3xl font-bold text-accent text-center mb-4">
          Суперпредложение
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {superOffers.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
