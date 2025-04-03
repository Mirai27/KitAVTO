import './DisplayCard.css';

// --- Импортируем SVG ---
// Укажите ПРАВИЛЬНЫЙ ОТНОСИТЕЛЬНЫЙ ПУТЬ от DisplayCard.jsx к вашим SVG файлам
// Пример: если DisplayCard.jsx в src/components, а SVG в src/assets:
import pattern1SvgPath from '/pattern1.svg?url';
import pattern2SvgPath from '/pattern2.svg?url';
// Если структура другая, скорректируйте путь (например, '../../assets/pattern1.svg')

function handleCardAction(link, title) {
  console.log(`Нажата кнопка '${title}', ссылка/действие: ${link}`);
}

export default function DisplayCard(props) {
  const { title, description, buttonText, link, backgroundType } = props;

  // --- Выбираем нужный путь к SVG ---
  let svgUrl = '';
  if (backgroundType === 'pattern1') {
    svgUrl = pattern1SvgPath;
  } else if (backgroundType === 'pattern2') {
    svgUrl = pattern2SvgPath;
  }

  // --- Создаем объект инлайн-стилей ---
  const cardStyle = {
    // Устанавливаем backgroundImage, если svgUrl определен
    backgroundImage: svgUrl ? `url(${svgUrl})` : 'none',
  };
  console.log(cardStyle)
  if (!buttonText) {
      console.warn(`Карточка "${title}" не имеет buttonText.`);
  }

  return (
    // --- Применяем инлайн-стили к li ---
    // Базовый класс 'display-card' оставляем для общих стилей из CSS
    <li className="display-card" style={cardStyle}>
      <div className="card-info-content">
        <p>
          <strong>{title}</strong>
        </p>
        <p>{description}</p>
      </div>

      {buttonText && (
        <button
          className="card-button"
          onClick={() => handleCardAction(link, title)}
        >
          {buttonText}
        </button>
      )}
    </li>
  );
}