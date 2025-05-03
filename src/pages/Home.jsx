import DisplayCard from "../components/DisplayCard";
import { cards_info } from "../data";

export default function Home() {
  return (
    <main className="bg-gray-50 py-4">
      <section className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <ul className="flex md:grid overflow-x-auto md:overflow-visible md:grid-cols-3 gap-4 list-none p-0 pb-4">
          {cards_info.map((card_info) => (
            <DisplayCard key={card_info.title} {...card_info} />
          ))}
        </ul>
      </section>
    </main>
  );
}
