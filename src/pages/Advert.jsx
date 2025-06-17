import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// Словарь для отображения ключей (может быть пустым, если не хотите переводить)
const FIELD_LABELS = {
  body: "Кузов",
  fuel: "Топливо",
  transmission: "Коробка",
  mileage: "Пробег",
  engine: "Двигатель",
  cur_price: "Текущая цена",
  drive: "Привод",
  old_price: "Старая цена",
  volume: "Объем",
  image_paths: "Фотографии",
  brand: "Марка",
  seats: "Вместимость",
  comment: "Комментарий",
  year: "Год",
  phone: "Телефон",
  model: "Модель",
  generation: "Поколение",
  email: "E-mail",
};

function humanizeKey(key) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key.replace(/_/g, " ").replace(/^./, (s) => s.toUpperCase());
}

export default function Advert() {
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    async function fetchAdvert() {
      setLoading(true);
      try {
        const response = await fetch(`/api/buy_car/get_advert?car_id=${id}`);
        const data = await response.json();
        setAdvert(data);
      } catch (err) {
        setAdvert(null);
      } finally {
        setLoading(false);
      }
    }
    fetchAdvert();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 text-center py-12">
          Загрузка...
        </div>
      </main>
    );
  }

  if (!advert) {
    return (
      <main className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 text-center py-12">
          Объявление не найдено
        </div>
      </main>
    );
  }

  // Фуллскрин просмотр фото с логикой как в Sell.jsx
  const FullscreenGalleryModal = ({ images, index, onClose, setIndex }) => {
    // Логика как в Sell.jsx
    useEffect(() => {
      if (index !== null && modalRef.current) {
        modalRef.current.focus();
      }
    }, [index]);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
      if (e.key === "ArrowRight" && index < images.length - 1) setIndex(index + 1);
    };

    if (index === null) return null;
    return (
      <div
        className="fixed inset-0 z-50 backdrop-brightness-30 backdrop-blur-xs  flex flex-col items-center justify-center"
        tabIndex={-1}
        ref={modalRef}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        style={{ cursor: "zoom-out" }}
        autoFocus
      >
        <button
          className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="flex items-center justify-center w-full h-full">
          {index > 0 && (
            <button
              className="text-white text-4xl px-4 py-2 absolute left-2 top-1/2 -translate-y-1/2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(index - 1);
              }}
              aria-label="Предыдущее фото"
            >
              &#8592;
            </button>
          )}
          <img
            src={"/api/images" + images[index]}
            alt={`Фото ${index + 1}`}
            className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ objectFit: "contain" }}
          />
          {index < images.length - 1 && (
            <button
              className="text-white text-4xl px-4 py-2 absolute right-2 top-1/2 -translate-y-1/2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(index + 1);
              }}
              aria-label="Следующее фото"
            >
              &#8594;
            </button>
          )}
        </div>
      </div>
    );
  };

  // Выделяем основные поля
  const mainFields = {
    brand: advert.brand,
    model: advert.model,
    year: advert.year,
    mileage: advert.mileage,
    cur_price: advert.cur_price,
    old_price: advert.old_price,
  };

  // Контактные поля
  const contactFields = Object.entries(advert).filter(
    ([key, value]) =>
      (key.toLowerCase().includes("phone") ||
        key.toLowerCase().includes("email")) &&
      value
  );

  // Фото
  const images = advert.image_paths || [];

  // Остальные характеристики (исключаем основные, контакты, фото, комментарий, id)
  const excluded = [
    "brand",
    "model",
    "year",
    "mileage",
    "cur_price",
    "old_price",
    "image_paths",
    "comment",
    "id",
    ...contactFields.map(([key]) => key),
  ];
  const extraFields = Object.entries(advert).filter(
    ([key]) => !excluded.includes(key)
  );

  return (
    <main className="bg-gray-50 py-4">
      <FullscreenGalleryModal
        images={images}
        index={fullscreenIdx}
        onClose={() => setFullscreenIdx(null)}
        setIndex={setFullscreenIdx}
      />
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 flex flex-col gap-8">
          {/* Верхняя строка: бренд, модель, год, пробег — слева; цена — справа */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div className="flex flex-col">
              <span className="text-4xl font-bold flex flex-wrap items-center gap-4">
                {mainFields.brand} {mainFields.model}
                <span className="flex text-gray-600 font-semibold text-2xl  gap-4">
                  {mainFields.year && <span>{mainFields.year}</span>}
                  {mainFields.mileage !== undefined && (
                    <span>{mainFields.mileage?.toLocaleString()} км</span>
                  )}
                </span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              {mainFields.old_price && (
                <span className="text-xl text-gray-400 line-through">
                  {mainFields.old_price?.toLocaleString()} ₽
                </span>
              )}
              <span className="text-3xl font-bold text-accent">
                {mainFields.cur_price?.toLocaleString()} ₽
              </span>
            </div>
          </div>
          {/* Фото и контакты */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Фото */}
            <div className="flex flex-col items-center md:w-1/2">
              <div className="w-full">
                {images.length > 0 ? (
                  <div
                    className="relative w-full aspect-video bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden mb-2 group"
                    onClick={() => setFullscreenIdx(0)}
                    style={{ cursor: "zoom-in" }}
                  >
                    <img
                      src={"/api/images" + images[0]}
                      alt="Фото 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400 text-3xl">
                    Нет фото
                  </div>
                )}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-2">
                    {images.slice(1).map((img, idx) => (
                      <div
                        key={img + idx}
                        className="w-auto h-32 bg-gray-100 border rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
                        onClick={() => setFullscreenIdx(idx + 1)}
                      >
                        <img
                          src={"/api/images" + img}
                          alt={`Фото ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Контакты и грид характеристик */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Контакты */}
              <div>
                <h2 className="font-semibold text-2xl mb-1">Контакты</h2>
                <div className="flex flex-col gap-1 text-gray-700">
                  {contactFields.length > 0
                    ? contactFields.map(([key, value]) => (
                        <span key={key}>
                          {humanizeKey(key)}:{" "}
                          {key.toLowerCase().includes("phone") ? (
                            <a href={`tel:${value}`} className="text-accent">
                              {value}
                            </a>
                          ) : key.toLowerCase().includes("email") ? (
                            <a href={`mailto:${value}`} className="text-accent">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </span>
                      ))
                    : <span>—</span>}
                </div>
              </div>
              {/* Грид характеристик */}
              {extraFields.length > 0 && (
                <div>
                  <h2 className="font-semibold text-2xl mb-1">Дополнительная информация</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2">
                    {extraFields.map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500 font-medium whitespace-nowrap">
                          {humanizeKey(key)}:
                        </span>
                        <span className="text-black">
                          {typeof value === "number" && key === "volume"
                            ? value + " л"
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Комментарий */}
          <div>
            <h2 className="font-semibold mb-1">{humanizeKey("comment")}</h2>
            <div className="bg-gray-50 rounded p-3 text-gray-700 whitespace-pre-line">
              {advert.comment || "—"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
