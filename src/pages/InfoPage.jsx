import React from "react";
import { useLocation } from "react-router-dom";

const infoTexts = {
  concept: "KitAVTO — это современный маркетплейс китайских авто. Мы предлагаем уникальный подход к продаже и покупке автомобилей.",
  perspective: "Мы стремимся стать лидером рынка, внедряя инновационные решения и расширяя возможности для наших клиентов.",
  partners: "Наши партнеры — ведущие компании в автомобильной индустрии, обеспечивающие надежность и качество.",
  cooperation: "Мы открыты для сотрудничества с дилерами, сервисами и другими компаниями.",
  events: "Следите за нашими событиями и новостями — мы активно участвуем в жизни автомобильного сообщества.",
  blog: "Читайте наш блог, чтобы быть в курсе последних тенденций и советов по эксплуатации авто.",
  career: "Присоединяйтесь к нашей команде! Мы ищем талантливых специалистов.",
  team: "Наша команда — профессионалы с опытом в автоиндустрии и IT.",
  privacy: "Политика конфиденциальности: мы заботимся о безопасности ваших данных.",
  terms: "Условия использования: ознакомьтесь с правилами работы нашего сервиса.",
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function InfoPage() {
  const query = useQuery();
  const type = query.get("type");
  const text = infoTexts[type] || "Информация не найдена.";

  return (
    <main className="bg-gray-50 py-4 min-h-screen">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Информация</h1>
          <div className="text-lg text-gray-700 whitespace-pre-line">{text}</div>
        </div>
      </div>
    </main>
  );
}
