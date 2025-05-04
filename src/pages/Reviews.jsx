import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";

export default function Reviews() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Отзывы"); // "Отзывы" или "Сравнения"
  const [replies, setReplies] = useState([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([null, null]);
  const [modelSpecs, setModelSpecs] = useState([null, null]);

  useEffect(() => {
    if (activeSection === "Отзывы") {
      fetchReplies();
    } else if (activeSection === "Сравнения") {
      fetchModels();
    }
  }, [limit, activeSection]);

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/replies_compare/get_replies?limit=${limit}`
      );
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error("Ошибка при загрузке отзывов:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(`/api/replies_compare/get_models`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Ошибка при загрузке моделей:", error);
    }
  };

  const fetchModelSpec = async (key, index) => {
    try {
      const response = await fetch(`/api/replies_compare/get_model_spec?key=${key}`);
      const data = await response.json();
      setModelSpecs((prevSpecs) => {
        const newSpecs = [...prevSpecs];
        newSpecs[index] = data;
        return newSpecs;
      });
    } catch (error) {
      console.error("Ошибка при загрузке характеристик модели:", error);
    }
  };

  const handleModelSelect = (key, index) => {
    setSelectedModels((prev) => {
      const newSelection = [...prev];
      newSelection[index] = key;
      return newSelection;
    });
    fetchModelSpec(key, index);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Отзывы и сравнения</h1>
            <p className="text-gray-600">
              Реальные мнения владельцев и удобный инструмент сравнения
            </p>
          </div>
          <button
            onClick={() => navigate("/leavereview")}
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Написать отзыв
          </button>
        </div>

        {/* Section Switcher */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-4xl ${
              activeSection === "Отзывы"
                ? "bg-accent text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveSection("Отзывы")}
          >
            Отзывы
          </button>
          <button
            className={`px-4 py-2 rounded-4xl ${
              activeSection === "Сравнения"
                ? "bg-accent text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveSection("Сравнения")}
          >
            Сравнения
          </button>
        </div>

        {/* Content */}
        {activeSection === "Отзывы" ? (
          <div>
            {loading && replies.length === 0 ? (
              <div className="text-center py-8">Загрузка...</div>
            ) : (
              <div className="space-y-6">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <img
                          src={`/api/images${reply.image_url}`}
                          alt={reply.username}
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <h1 className="font-bold text-xl">{reply.username}</h1>
                          <p className="text-sm text-gray-400 mb-4">
                            {reply.cartype}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-yellow-500 text-lg">
                          <p className="text-sm text-gray-400">{reply.date}</p>
                          {"★".repeat(reply.rating)}
                          {"☆".repeat(5 - reply.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{reply.text}</p>
                  </div>
                ))}
                {replies.length > 0 && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleLoadMore}
                      className="bg-accent text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Загрузка..." : "Посмотреть еще"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Выберите модель</h3>
                <select
                  className="w-full border rounded px-3 py-2 mb-4"
                  value={selectedModels[index] || ""}
                  onChange={(e) => handleModelSelect(e.target.value, index)}
                >
                  <option value="">Выберите модель</option>
                  {models.map((model) => (
                    <option key={model.key} value={model.key}>
                      {model.value}
                    </option>
                  ))}
                </select>
                {modelSpecs[index] && (
                  <>
                    <CarCard car={modelSpecs[index]} />
                    <div className="mt-4 space-y-2">
                      {Object.entries(modelSpecs[index])
                        .filter(([key]) =>
                          [
                            "generation",
                            "volume",
                            "year",
                            "seats",
                            "fuel",
                            "brand",
                            "model",
                            "body",
                            "transmission",
                            "engine",
                            "drive",
                          ].includes(key)
                        )
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-500">{key}</span>
                            <span className="text-black">{value}</span>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
