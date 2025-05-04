import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveReview() {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cartype: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/replies_compare/create_reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rating }),
      });
      if (response.ok) {
        alert("Ваш отзыв успешно отправлен!");
        navigate("/reviews");
      } else {
        alert("Ошибка при отправке отзыва.");
      }
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Оставьте свой отзыв</h1>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ФИО
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Введите ФИО"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Введите e-mail"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Модель авто
              </label>
              <input
                type="text"
                name="cartype"
                value={formData.cartype}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Модель"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Текст отзыва
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Введите текст"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded hover:bg-yellow-500 transition-colors"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Опубликовать отзыв"}
          </button>
        </form>
      </div>
    </main>
  );
}
