import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./Sell.css";

// FAQ data
const faqs = [
  {
    question: "Как сделать хорошее фото?",
    answer:
      "Сфотографируйте автомобиль при дневном свете с разных ракурсов — спереди, сзади, сбоку и внутри.",
  },
  {
    question: "Как правильно оценить автомобиль?",
    answer:
      "Ориентируйтесь на средние рыночные цены, учитывая год выпуска, пробег и состояние.",
  },
  {
    question: "Любые остальные вопросы?",
    answer:
      "Мы всегда готовы помочь. Свяжитесь с нашей поддержкой через форму или мессенджеры.",
  },
];

export default function Sell() {
  const [formVisible, setFormVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Intro section */}
        {!formVisible && (
          <>
            <section className="mb-12 text-center bg-white p-8 rounded-2xl shadow-md">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Продать машину
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Разместите своё объявление и получите максимум просмотров
              </p>
              <button
                onClick={() => setFormVisible(true)}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Разместить объявление
              </button>
            </section>

            <section className="mb-12 bg-accent text-white p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">
                Почему стоит продать свой автомобиль именно у нас?
              </h2>
              <p className="text-sm md:text-base">
                Мы понимаем, что продажа автомобиля может быть сложным и
                трудоёмким процессом. Именно поэтому мы создали платформу,
                которая делает этот процесс максимально простым, быстрым и
                выгодным для вас.
              </p>
            </section>
          </>
        )}

        {/* Form section */}
        {formVisible && (
          <>
            <section className="mb-12 bg-white p-6 rounded-2xl shadow-md">
              <h1 className="text-2xl font-bold mb-6">
                Форма подачи объявления
              </h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="w-32 h-32 bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400 text-3xl">
                  <FaCamera />
                </div>
                <button className="text-purple-600 font-medium underline">
                  Добавить фотографии
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <input placeholder="Заголовок" className="input" />
                <input placeholder="Телефон" className="input" />
                <input placeholder="Почта" className="input" />
                <input placeholder="Марка" className="input" />
                <input placeholder="Модель" className="input" />
                <input placeholder="Поколение" className="input" />
                <input placeholder="Кузов" className="input" />
                <input placeholder="Коробка" className="input" />
                <input placeholder="Привод" className="input" />
                <input placeholder="Пробег" className="input" />
                <input placeholder="Двигатель" className="input" />
                <input placeholder="Объём двигателя" className="input" />
                <input placeholder="Год" className="input" />
                <input placeholder="Цена" className="input" />
              </div>

              <button className="text-purple-600 font-medium underline mb-4">
                Добавить комментарий
              </button>

              <div>
                <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                  Опубликовать объявление
                </button>
              </div>
            </section>

            {/* FAQ section */}
            <section className="mb-12 max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                FAQ
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {faqs.map((faq, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden transition-all"
                  >
                    <button
                      className="w-full text-left p-3 md:p-4 flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFAQ(index)}
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
            </section>
          </>
        )}
      </div>
    </main>
  );
}
