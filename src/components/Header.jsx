import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogoAction(link, title) {
    navigate(link);
    console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
  }

  return (
    <header className="bg-white py-8">
      <div className="container mx-auto px-4 transition-normal duration-300  ease-out">
        <h1
          onClick={() => handleLogoAction("/", "KitAVTO")}
          className="cursor-pointer font-sans text-4xl text-primary font-semibold"
        >
          KitAVTO
        </h1>
      </div>
    </header>
  );
}
