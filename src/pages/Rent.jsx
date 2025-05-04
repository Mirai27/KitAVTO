import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import RentFAQ from "../components/RentFAQ"; // Импортируем RentFAQ
import ConsultationForm from "../components/ConsultationForm"; // Импортируем ConsultationForm

export default function Rent() {
  const [filterVars, setFilterVars] = useState({});
  const [filters, setFilters] = useState({});
  const baseLimit = 6; // Initial number of cars to load
  const shiftLimit = 6; // Number of cars to load on each button click
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(baseLimit);

  useEffect(() => {
    // Fetch filter variables
    fetch("/api/rent/get_variables")
      .then((res) => res.json())
      .then((data) => {
        setFilterVars(data);

        // Инициализируем filters на основе ключей из filterVars
        const initialFilters = Object.keys(data).reduce((acc, key) => {
          acc[key] = Array.isArray(data[key]) ? [] : null; // Массив для множественного выбора, null для одиночного
          return acc;
        }, {});
        setFilters(initialFilters);
      })
      .catch((err) => console.error("Error fetching filter variables:", err));
  }, []);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("limit", limit); // Добавляем лимит

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(",")); // Преобразуем массив в строку через запятую
      } else if (value) {
        params.append(key, value); // Для одиночных значений
      }
    });

    return params.toString();
  };

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/rent/get_cars?${buildQueryString()}`
        );
        const data = await response.json();
        setCars(data); // Убедимся, что список машин обновляется корректно
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [filters, limit]); // Добавляем filters в зависимости

  const handleCheckboxChange = (key, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[key] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prevFilters, [key]: updatedValues };
    });
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + shiftLimit);
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <section className="bg-white py-8 shadow-md rounded-lg mb-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Аренда автомобиля
            </h1>
            <p className="text-lg text-gray-600">
              Выберите из сотен доступных вариантов по лучшим ценам
            </p>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Фильтры</h1>
            {Object.entries(filterVars).map(([key, options]) => (
              <div className="mb-4" key={key}>
                <h2 className="font-semibold mb-2">{key}</h2>
                {options.map((option) => (
                  <label
                    key={option.key}
                    className="mb-2 flex items-center text-md"
                  >
                    {" "}
                    {/* Используем flex для выравнивания */}
                    <input
                      type="checkbox"
                      className="mr-4 w-6 h-6" // Устанавливаем размер чекбокса равным тексту
                      style={{ accentColor: "rgb(var(--color-primary))" }}
                      onChange={() => handleCheckboxChange(key, option.key)}
                    />
                    {option.value} ({option.amount})
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {loading && cars.length === 0 ? (
              <div className="text-center py-8">Загрузка...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="bg-accent text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Загрузка..." : "Посмотреть еще"}
                  </button>
                </div>
                <div className="mt-8 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">
                    Инструкция по процедуре аренды автомобиля
                  </h3>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    Задумались об аренде автомобиля?
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    Наша компания сделала процесс максимально простым и удобным.
                    Для начала, ознакомьтесь с нашим широким автопарком и
                    выберите автомобиль, который идеально соответствует вашим
                    потребностям – будь то компактный городской автомобиль или
                    просторный внедорожник для путешествий. После выбора
                    автомобиля, определите даты и время аренды, и заполните
                    простую форму бронирования на нашем сайте, указав свои
                    контактные данные и предпочтительный способ оплаты.
                    Рекомендуем бронировать автомобиль заранее, особенно если
                    планируете поездку в высокий сезон.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    Для оформления аренды вам понадобятся оригинал паспорта (или
                    ID-карты) гражданина [Страна, где вы работаете], оригинал
                    действующего водительского удостоверения соответствующей
                    категории, выданного не менее 10 лет назад, и действующая
                    кредитная карта на имя арендатора для внесения залога. В
                    день получения автомобиля, приезжайте в наш офис в указанное
                    в бронировании время. Наш сотрудник поможет вам оформить
                    договор аренды – внимательно прочитайте все его пункты,
                    особенно касающиеся ответственности за повреждения и штрафы.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    Вместе с сотрудником осмотрите автомобиль на предмет
                    повреждений и зафиксируйте все имеющиеся дефекты в акте
                    приема-передачи. Убедитесь, что в автомобиле есть все
                    необходимое для безопасной поездки. После подписания всех
                    документов, вы можете отправляться в путь! При возврате
                    автомобиля, придерживайтесь указанного в договоре времени.
                    Вместе с нашим сотрудником осмотрите автомобиль на предмет
                    новых повреждений и подпишите акт возврата.
                  </p>
                  <p className="text-gray-700 text-md leading-relaxed">
                    Залог будет возвращен на вашу кредитную карту в течение 14
                    рабочих дней, при условии отсутствия повреждений и нарушений
                    условий договора. Важно помнить о возрастных ограничениях:
                    минимальный возраст арендатора – 18 лет, а для некоторых
                    категорий автомобилей минимальный возраст может быть 21 лет.
                  </p>
                </div>
                <RentFAQ /> {/* Добавляем компонент RentFAQ */}
                <section
                  className="mt-12 bg-[url('/public/consultation.svg')] bg-cover bg-[position:-150px] bg-no-repeat bg-white flex items-center justify-end rounded-lg shadow-md"
                  style={{ minHeight: "600px" }}
                >
                  <div className="w-full max-w-md">
                    <ConsultationForm />
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
