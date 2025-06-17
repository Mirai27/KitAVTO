import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <motion.footer
      key="footer"
      className="bg-white text-gray-800 font-sans pt-8 pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between px-4 transition-normal duration-300 ease-out">
        {/* Заголовок и подзаголовок */}
        <div className="mb-8 lg:mb-0">
          <h1 className="footer-title text-primary">KitAVTO</h1>
          <p className="footer-subtitle">Современный маркетплейс китайских авто</p>
        </div>

        {/* Сетка колонок */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Колонка 1 */}
          <div>
            <h3 className="footer-column-title">О нас</h3>
            <ul className="footer-list">
              <li className="footer-link" onClick={() => navigate("/info?type=concept")}>Концепт работы</li>
              <li className="footer-link" onClick={() => navigate("/info?type=perspective")}>Перспективы</li>
              <li className="footer-link" onClick={() => navigate("/info?type=partners")}>Партнеры</li>
              <li className="footer-link" onClick={() => navigate("/info?type=cooperation")}>Сотрудничество</li>
            </ul>
          </div>

          {/* Колонка 2 */}
          <div>
            <h3 className="footer-column-title">Команда</h3>
            <ul className="footer-list">
              <li className="footer-link" onClick={() => navigate("/info?type=events")}>События</li>
              <li className="footer-link" onClick={() => navigate("/info?type=blog")}>Блог</li>
              <li className="footer-link" onClick={() => navigate("/info?type=career")}>Карьера</li>
              <li className="footer-link" onClick={() => navigate("/info?type=team")}>Команда</li>
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
        <span className="footer-link" onClick={() => navigate("/info?type=privacy")}>Privacy & Policy</span>
        <span className="footer-link" onClick={() => navigate("/info?type=terms")}>Terms & Condition</span>
      </div>
    </motion.footer>
  );
}
