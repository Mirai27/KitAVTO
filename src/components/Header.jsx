import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogoAction(link, title) {
    navigate(link);
    console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
  }

  return (
    <header className="bg-white py-8">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <div className="flex items-center">
          <h1
            onClick={() => handleLogoAction("/", "KitAVTO")}
            className="cursor-pointer font-sans text-4xl text-primary font-semibold mr-4"
          >
            KitAVTO
          </h1>
          <input
            type="text"
            placeholder="Поиск..."
            className="flex-grow p-2 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))]"
          />
        </div>
      </div>
    </header>
  );
}
