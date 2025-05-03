import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [activeSection, setActiveSection] = useState("Отзывы"); // "Отзывы" или "Сравнения"
  const [replies, setReplies] = useState([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection === "Отзывы") {
      fetchReplies();
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
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
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
          <div className="text-center py-8">Сравнения пока недоступны.</div>
        )}
      </div>
    </main>
  );
}
