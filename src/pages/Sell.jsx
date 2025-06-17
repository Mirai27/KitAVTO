import { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Sell.css";

const MAX_IMAGES = 7;

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

function FullscreenGalleryModal({ images, index, onClose, setIndex }) {
  if (index === null) return null;

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [index]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
    if (e.key === "ArrowRight" && index < images.length - 1)
      setIndex(index + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-brightness-30 backdrop-blur-xs flex flex-col items-center justify-center"
      tabIndex={0}
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onClick={onClose}
      style={{ cursor: "zoom-out" }}
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
          src={images[index]}
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
}

export default function Sell() {
  const [formVisible, setFormVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]); // массив фото
  const [successMessage, setSuccessMessage] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false); // Для отображения поля комментария
  const [comment, setComment] = useState(""); // Для хранения текста комментария
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const [formFields, setFormFields] = useState({
    brand: "",
    model: "",
    generation: "",
    body: "",
    transmission: "",
    engine: "",
    drive: "",
    volume: "",
    seats: "",
    year: "",
    mileage: "",
    price: "",
    phone: "",
    email: "",
    // остальные поля если нужно
  });
  const navigate = useNavigate(); // добавьте импорт useNavigate из react-router-dom

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (uploadedImages.length + files.length > MAX_IMAGES) {
      alert(`Можно загрузить не более ${MAX_IMAGES} фотографий.`);
      return;
    }
    const newImages = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/images/upload_image", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.location) {
          newImages.push("/api" + data.location);
        } else {
          alert("Ошибка при загрузке изображения.");
        }
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    }
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
  };

  // Обработчик изменения полей формы
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Новый обработчик публикации объявления
  const handlePublish = async () => {
    // Собираем данные для отправки
    const advertData = {
      ...formFields,
      volume: Number(formFields.volume) || 0,
      seats: Number(formFields.seats) || 0,
      year: Number(formFields.year) || 0,
      mileage: Number(formFields.mileage) || 0,
      price: Number(formFields.price) || 0,
      image_paths: uploadedImages.map(img => img.replace(/^\/api\/images/, "")), // убираем /api/images
      comment: comment,
      phone: formFields.phone,
      email: formFields.email,
    };
    try {
      const response = await fetch("/api/buy_car/create_advert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(advertData),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/advert/${data.car_id}`);
      } else {
        alert("Ошибка при публикации объявления");
      }
    } catch {
      alert("Ошибка при публикации объявления");
    }
  };

  const handleTextareaInput = (e) => {
    setComment(e.target.value);
    e.target.style.height = "auto"; // Сбрасываем высоту
    e.target.style.height = `${e.target.scrollHeight}px`; // Устанавливаем высоту в зависимости от содержимого
  };

  // Функция для удаления фото по индексу
  const handleRemoveImage = (idx) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== idx));
    // Если удаляемое фото открыто в полноэкранном режиме, закрыть его
    if (fullscreenIdx === idx) setFullscreenIdx(null);
    // Если удаляемое фото до текущего полноэкранного, сместить индекс
    if (fullscreenIdx > idx) setFullscreenIdx(fullscreenIdx - 1);
  };

  return (
    <main className="bg-white py-4">
      <FullscreenGalleryModal
        images={uploadedImages}
        index={fullscreenIdx}
        onClose={() => setFullscreenIdx(null)}
        setIndex={setFullscreenIdx}
      />
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Intro section */}
        {!formVisible && !successMessage && (
          <>
              <button
                onClick={() => setFormVisible(true)}
                className="bg-gray-700 mb-12 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full md:w-auto"
              >
                Разместить объявление
              </button>

            <section className="mb-12 bg-accent text-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Почему стоит продать свой автомобиль именно у нас?
              </h2>
              <p className="text-sm md:text-base">
                Мы понимаем, что продажа автомобиля может быть сложным и
                трудоёмким процессом.
              </p>
              <p className="text-sm md:text-base">
                Именно поэтому мы создали платформу,
                которая делает этот процесс максимально простым, быстрым и
                выгодным для вас.
              </p>
            </section>
          </>
        )}

        {/* Success message */}
        {successMessage && (
          <section className="mb-12 bg-green-100 p-6 rounded-2xl shadow-md text-center">
            <h1 className="text-2xl font-bold text-green-700 mb-4">
              Объявление отправлено!
            </h1>
            <p className="text-lg text-green-600">
              Ваше объявление успешно отправлено. Спасибо за использование нашей
              платформы!
            </p>
          </section>
        )}

        {/* Form section */}
        {formVisible && (
          <>
            <section className="mb-12 bg-white p-6 rounded-2xl shadow-md">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <div className="flex flex-col items-center space-y-4 w-full md:w-auto">
                  {/* Фото превью */}
                  <div className="w-full">
                    {/* Мобильный: горизонтальный скролл */}
                    <div className="flex gap-2 overflow-x-auto md:hidden pb-2">
                      {uploadedImages.length === 0 ? (
                        <div className="w-full h-56 bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400 text-3xl overflow-hidden">
                          <FaCamera size={12} className="w-full h-full" />
                        </div>
                      ) : (
                        uploadedImages.map((img, idx) => (
                          <div
                            key={img}
                            className="relative w-56 h-56 bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 group"
                            onClick={() => setFullscreenIdx(idx)}
                            style={{ cursor: "zoom-in" }}
                          >
                            <img
                              src={img}
                              alt={`Фото ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 text-red-500 rounded-full w-7 h-7 flex items-center justify-center shadow group-hover:opacity-100 opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              title="Удалить фото"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                    {/* Десктоп: первое фото большое, остальные сеткой под ним */}
                    <div className="hidden md:block">
                      {uploadedImages.length === 0 ? (
                        <div className="w-full h-72 bg-gray-100 border rounded-xl flex items-center justify-center text-gray-400 text-3xl overflow-hidden mx-auto">
                          <FaCamera size={48} className="w-full h-full" />
                        </div>
                      ) : (
                        <>
                          <div
                            className="relative w-auto h-72 bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden mx-auto mb-2 group"
                            onClick={() => setFullscreenIdx(0)}
                            style={{ cursor: "zoom-in" }}
                          >
                            <img
                              src={uploadedImages[0]}
                              alt="Фото 1"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow group-hover:opacity-100 opacity-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(0);
                              }}
                              title="Удалить фото"
                            >
                              <FiX size={22} />
                            </button>
                          </div>
                          {uploadedImages.length > 1 && (
                            <div className="w-72 grid grid-cols-3 gap-1">
                              {uploadedImages.slice(1).map((img, idx) => (
                                <div
                                  key={img}
                                  className="relative bg-gray-100 border rounded-xl overflow-hidden w-full aspect-square flex items-center justify-center group"
                                  onClick={() => setFullscreenIdx(idx + 1)}
                                  style={{ cursor: "zoom-in" }}
                                >
                                  <img
                                    src={img}
                                    alt={`Фото ${idx + 2}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 text-red-500 rounded-full w-7 h-7 flex items-center justify-center shadow group-hover:opacity-100 opacity-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(idx + 1);
                                    }}
                                    title="Удалить фото"
                                  >
                                    <FiX size={18} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* Кнопка загрузки фото */}
                  <label className="text-accent font-medium cursor-pointer flex items-center mt-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-accent mr-2">
                      <FiPlus className="text-accent" size={16} />
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadedImages.length >= MAX_IMAGES}
                    />
                    Добавить фотографии
                    <span className="ml-2 text-gray-400 text-xs">
                      ({uploadedImages.length}/{MAX_IMAGES})
                    </span>
                  </label>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  <input name="brand" placeholder="Марка" className="input" value={formFields.brand} onChange={handleFieldChange} />
                  <input name="model" placeholder="Модель" className="input" value={formFields.model} onChange={handleFieldChange} />
                  <input name="generation" placeholder="Поколение" className="input" value={formFields.generation} onChange={handleFieldChange} />
                  <input name="body" placeholder="Кузов" className="input" value={formFields.body} onChange={handleFieldChange} />
                  <input name="transmission" placeholder="Коробка" className="input" value={formFields.transmission} onChange={handleFieldChange} />
                  <input name="engine" placeholder="Двигатель" className="input" value={formFields.engine} onChange={handleFieldChange} />
                  <input name="drive" placeholder="Привод" className="input" value={formFields.drive} onChange={handleFieldChange} />
                  <input name="volume" placeholder="Объём двигателя" className="input" value={formFields.volume} onChange={handleFieldChange} type="number" />
                  <input name="seats" placeholder="Вместимость" className="input" value={formFields.seats} onChange={handleFieldChange} type="number" />
                  <input name="year" placeholder="Год" className="input" value={formFields.year} onChange={handleFieldChange} type="number" />
                  <input name="mileage" placeholder="Пробег" className="input" value={formFields.mileage} onChange={handleFieldChange} type="number" />
                  <input name="price" placeholder="Цена" className="input" value={formFields.price} onChange={handleFieldChange} type="number" />
                  <input name="phone" placeholder="Телефон" className="input" value={formFields.phone} onChange={handleFieldChange} />
                  <input name="email" placeholder="Почта" className="input" value={formFields.email} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setCommentVisible(true)}
                  className="text-accent font-medium flex items-center"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-accent mr-2">
                    <FiPlus className="text-accent" size={16} />
                  </span>
                  Добавить комментарий
                </button>
              </div>

              {commentVisible && (
                <textarea
                  value={comment}
                  onChange={handleTextareaInput}
                  className="w-full border rounded px-3 py-2 mb-4"
                  placeholder="Введите комментарий"
                  style={{
                    minHeight: "200px",
                    resize: "none",
                    overflow: "hidden",
                  }}
                />
              )}

              <div className="flex justify-end">
                <button
                  onClick={handlePublish}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Опубликовать объявление
                </button>
              </div>
            </section>

            {/* FAQ section */}
            <section className="mb-12 mx-auto">
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
