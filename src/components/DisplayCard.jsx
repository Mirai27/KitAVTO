import { useNavigate } from "react-router-dom";
import pattern1SvgPath from "/pattern1.svg?url";
import pattern2SvgPath from "/pattern2.svg?url";

export default function DisplayCard(props) {
  const navigate = useNavigate();

  const handleCardAction = (link, title) => {
    navigate(link);
  };

  const { title, description, buttonText, link, backgroundType } = props;

  const svgUrl =
    backgroundType === "pattern1"
      ? pattern1SvgPath
      : backgroundType === "pattern2"
      ? pattern2SvgPath
      : null;

  return (
    <li
      className="flex flex-col justify-between p-6 bg-primary text-white min-h-70 min-w-70 md:min-w-60 rounded-lg shadow-lg h-full"
      style={{
        backgroundImage: svgUrl ? `url("${svgUrl}")` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-grow flex flex-col">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-lg md:text-xl flex-grow">{description}</p>
      </div>

      {buttonText && (
        <button
          className="text-xl mt-6 px-6 py-3 bg-accent hover:bg-yellow-500 text-white font-bold rounded-lg transition-colors w-full"
          onClick={() => handleCardAction(link, title)}
        >
          {buttonText}
        </button>
      )}
    </li>
  );
}
