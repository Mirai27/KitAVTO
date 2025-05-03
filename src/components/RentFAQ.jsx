import React, { useState } from "react";

const faqs = [
  {
    question: "Какие документы нужны для аренды?",
    answer:
      "Для аренды автомобиля вам понадобятся паспорт, водительское удостоверение и кредитная карта.",
  },
  {
    question: "Можно ли арендовать автомобиль без залога?",
    answer:
      "Нет, залог обязателен. Он будет возвращен после возврата автомобиля в надлежащем состоянии.",
  },
  {
    question: "Есть ли ограничения по пробегу?",
    answer:
      "Да, ограничения по пробегу зависят от выбранного тарифа. Подробности уточняйте при бронировании.",
  },
];

export default function RentFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">FAQ</h2>
      <ul className="space-y-2 md:space-y-3">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden transition-all"
          >
            <button
              className="w-full text-left p-3 md:p-4 flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggle(index)}
            >
              <span className="font-medium text-gray-800 text-sm md:text-base">
                {faq.question}
              </span>
              <span
                className={`text-gray-400 text-xs transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4">
                  <p className="text-gray-600 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
