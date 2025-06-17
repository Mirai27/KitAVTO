import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import RentFAQ from "../components/RentFAQ"; // Импортируем RentFAQ
import ConsultationForm from "../components/ConsultationForm"; // Импортируем ConsultationForm

// Словарь для отображения ключей фильтров
const FILTER_LABELS = {
  car_type: "Тип автомобиля",
  capacity: "Вместимость",
  additional_params: "Доп. параметры",
  available_places: "Места",
  available_bodies: "Кузов",
  available_seats: "Вместимость"
};

export default function Rent() {
  const [filterVars, setFilterVars] = useState({});
  const [filters, setFilters] = useState({});
  const baseLimit = 6; // Initial number of cars to load
  const shiftLimit = 6; // Number of cars to load on each button click
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(baseLimit);
  const [priceTo, setPriceTo] = useState(250000); // новое состояние для фильтра цены
  const [draftPriceTo, setDraftPriceTo] = useState(250000); // новое состояние для отображения ползунка

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

    // Добавляем price_to в строку запроса
    params.append("price_to", priceTo);

    return params.toString();
  };

  // В useEffect зависимости не меняются
  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/rent/get_cars?${buildQueryString()}`
        );
        const data = await response.json();
        setCars(data.items); // Убедимся, что список машин обновляется корректно
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [filters, limit, priceTo]); // priceTo — только после отпускания

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Фильтры</h1>
            {/* Новый фильтр по цене */}
            <div className="mb-6">
              <label
                className="block font-semibold mb-2"
                htmlFor="price-to-slider"
              >
                Цена от 0 до 250&nbsp;000 руб/мес
              </label>
              <input
                id="price-to-slider"
                type="range"
                min={0}
                max={250000}
                step={1000}
                value={draftPriceTo}
                onChange={(e) => setDraftPriceTo(Number(e.target.value))}
                onMouseUp={() => setPriceTo(draftPriceTo)}
                onTouchEnd={() => setPriceTo(draftPriceTo)}
                className="w-full accent-[rgb(100,24,127)]"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0</span>
                <span>{draftPriceTo.toLocaleString()} ₽</span>
                <span>250&nbsp;000</span>
              </div>
            </div>
            {Object.entries(filterVars).map(([key, options]) => (
              <div className="mb-4" key={key}>
                <h2 className="font-semibold mb-2 text-gray-400">
                  {FILTER_LABELS[key] || key}
                </h2>
                {options.map((option) => (
                  <label
                    key={option.key}
                    className="mb-2 flex items-center text-md"
                  >
                    {/* Используем flex для выравнивания */}
                    <input
                      type="checkbox"
                      className="mr-4 w-6 h-6" // Устанавливаем размер чекбокса равным тексту
                      style={{ accentColor: "rgb(var(--color-primary))" }}
                      onChange={() => handleCheckboxChange(key, option.key)}
                    />
                    {option.value}
                    {option.amount && option.amount > 0 && (
                      <span className="text-gray-400">
                        &nbsp;({option.amount})
                      </span>
                    )}
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
                    <CarCard key={car.id} car={car} per_day={true} />
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
