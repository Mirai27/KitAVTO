import "./Footer.css";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 font-sans pt-8 pb-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between px-4 transition-normal duration-300 ease-out">
        {/* Заголовок и подзаголовок */}
        <div className="mb-8 lg:mb-0">
          <h1 className="footer-title">KitAVTO</h1>
          <p className="footer-subtitle">Современный маркетплейс китайских авто</p>
        </div>

        {/* Сетка колонок */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Колонка 1 */}
          <div>
            <h3 className="footer-column-title">О нас</h3>
            <ul className="footer-list">
              <li className="footer-link">Концепт работы</li>
              <li className="footer-link">Перспективы</li>
              <li className="footer-link">Партнеры</li>
              <li className="footer-link">Сотрудничество</li>
            </ul>
          </div>

          {/* Колонка 2 */}
          <div>
            <h3 className="footer-column-title">Команда</h3>
            <ul className="footer-list">
              <li className="footer-link">События</li>
              <li className="footer-link">Блог</li>
              <li className="footer-link">Карьера</li>
              <li className="footer-link">Команда</li>
            </ul>
          </div>

          {/* Колонка 3 */}
          <div>
            <h3 className="footer-column-title">Контакты</h3>
            <ul className="footer-list">
              <li className="footer-link">Discord</li>
              <li className="footer-link">Instagram</li>
              <li className="footer-link">Twitter</li>
              <li className="footer-link">Facebook</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm flex justify-center gap-4">
        <span className="footer-link">Privacy & Policy</span>
        <span className="footer-link">Terms & Condition</span>
      </div>
    </footer>
  );
}
