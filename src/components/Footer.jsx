import "./Footer.css"; // Подключаем стили

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-header">
          <h1 className="footer-title">KitAVTO</h1>
          <p className="footer-subtitle">
            Современный маркетплейс китайских авто
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-column-title">О нас</h3>
            <ul className="footer-list">
              <li>Концепт работы</li>
              <li>Перспективы</li>
              <li>Партнеры</li>
              <li>Сотрудничество</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Команда</h3>
            <ul className="footer-list">
              <li>События</li>
              <li>Блог</li>
              <li>Карьера</li>
              <li>Команда</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Контакты</h3>
            <ul className="footer-list">
              <li>Discord</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-link">Privacy & Policy</span>
          <span className="footer-link">Terms & Condition</span>
        </div>
      </div>
    </footer>
  );
}
