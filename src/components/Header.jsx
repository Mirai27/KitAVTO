import { useNavigate } from "react-router-dom";
import { FaHeart, FaBell, FaCog } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  function handleLogoAction(link, title) {
    navigate(link);
    console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
  }

  return (
    <header className="bg-white py-8">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out flex justify-between items-center">
        <h1
          onClick={() => handleLogoAction("/", "KitAVTO")}
          className="cursor-pointer font-sans text-4xl text-primary font-semibold"
        >
          KitAVTO
        </h1>
        {/* <input
          type="text"
          placeholder="Поиск..."
          className="flex-grow mx-4 p-2 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))]"
        /> */}
        <div className="flex items-center space-x-6">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <FaHeart className="text-primary text-2xl" />
          </button>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <FaBell className="text-primary text-2xl" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <FaCog className="text-primary text-2xl" />
          </button>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
            П
          </div>
        </div>
      </div>
    </header>
  );
}
