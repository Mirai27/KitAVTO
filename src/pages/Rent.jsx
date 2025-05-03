import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import RentFAQ from "../components/RentFAQ"; // Импортируем RentFAQ
import ConsultationForm from "../components/ConsultationForm"; // Импортируем ConsultationForm

export default function Rent() {
  const [filterVars, setFilterVars] = useState({
    available_types: [],
    available_capacity: [],
    additional_params: [],
    available_places: [],
  });
  const [filters, setFilters] = useState({
    car_type: [],
    capacity: [],
    additional_params: [],
    // place_from: null,
    date_from: "",
    time_from: "",
    place_to: null,
    date_to: "",
    time_to: "",
  });
  const baseLimit = 6; // Initial number of cars to load
  const shiftLimit = 6; // Number of cars to load on each button click
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(baseLimit);

  useEffect(() => {
    // Fetch filter variables
    fetch("/api/rent/get_variables")
      .then((res) => res.json())
      .then((data) => setFilterVars(data))
      .catch((err) => console.error("Error fetching filter variables:", err));
  }, []);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("limit", limit);

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      } else if (value) {
        params.append(key, value);
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Фильтры</h1>
            {/* Car Types */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Тип автомобиля</h2>
              {filterVars.available_types.map((type) => (
                <label key={type.key} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleCheckboxChange("car_type", type.key)}
                  />
                  {type.value} ({type.amount})
                </label>
              ))}
            </div>
            {/* Capacity */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Вместимость</h2>
              {filterVars.available_capacity.map((capacity) => (
                <label key={capacity.key} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() =>
                      handleCheckboxChange("capacity", capacity.key)
                    }
                  />
                  {capacity.value} ({capacity.amount})
                </label>
              ))}
            </div>
            {/* Additional Params */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Дополнительно</h2>
              {filterVars.additional_params.map((param) => (
                <label key={param.key} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() =>
                      handleCheckboxChange("additional_params", param.key)
                    }
                  />
                  {param.value} ({param.amount})
                </label>
              ))}
            </div>
            {/* Places */}
            {/* <div className="mb-4">
              <h2 className="font-semibold mb-2">Место</h2>
              <select
                className="w-full p-2 border rounded-md"
                value={filters.place_from || ""}
                onChange={(e) =>
                  setFilters({ ...filters, place_from: e.target.value || null })
                }
              >
                <option value="">Выберите место</option>
                {filterVars.available_places.map((place) => (
                  <option key={place.key} value={place.key}>
                    {place.value}
                  </option>
                ))}
              </select>
            </div> */}
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
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">
                    Инструкция по процедуре аренды автомобиля
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Задумались об аренде автомобиля? Наша компания сделала
                    процесс максимально простым и удобным. Для начала,
                    ознакомьтесь с нашим широким автопарком и выберите
                    автомобиль, который идеально соответствует вашим
                    потребностям – будь то компактный городской автомобиль или
                    просторный внедорожник для путешествий. После выбора
                    автомобиля, определите даты и время аренды, и заполните
                    простую форму бронирования на нашем сайте, указав свои
                    контактные данные и предпочтительный способ оплаты.
                    Рекомендуем бронировать автомобиль заранее, особенно если
                    планируете поездку в высокий сезон. Для оформления аренды
                    вам понадобятся оригинал паспорта (или ID-карты) гражданина
                    [Страна, где вы работаете], оригинал действующего
                    водительского удостоверения соответствующей категории,
                    выданного не менее 10 лет назад, и действующая кредитная
                    карта на имя арендатора для внесения залога. В день
                    получения автомобиля, приезжайте в наш офис в указанное в
                    бронировании время. Наш сотрудник поможет вам оформить
                    договор аренды – внимательно прочитайте все его пункты,
                    особенно касающиеся ответственности за повреждения и штрафы.
                    Вместе с сотрудником осмотрите автомобиль на предмет
                    повреждений и зафиксируйте все имеющиеся дефекты в акте
                    приема-передачи. Убедитесь, что в автомобиле есть все
                    необходимое для безопасной поездки. После подписания всех
                    документов, вы можете отправляться в путь! При возврате
                    автомобиля, придерживайтесь указанного в договоре времени.
                    Вместе с нашим сотрудником осмотрите автомобиль на предмет
                    новых повреждений и подпишите акт возврата. Залог будет
                    возвращен на вашу кредитную карту в течение 14 рабочих дней,
                    при условии отсутствия повреждений и нарушений условий
                    договора. Важно помнить о возрастных ограничениях:
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
