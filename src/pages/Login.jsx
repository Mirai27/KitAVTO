import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...form, grant_type: "password" };
      const body = new URLSearchParams(payload).toString();
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        if (onSuccess) onSuccess();
        else navigate("/");
      } else {
        setError("Неверный логин или пароль");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 py-4 h-auto flex items-center">
      <div className="container mx-auto p-8 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-gray-200 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-2">Вход</h2>
          <p className="mb-4 text-gray-500">Введите логин и пароль для входа</p>
          <div className="space-y-3 mb-2">
            <label className="block">
              <span className="text-sm text-gray-600">Логин</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-2xl focus:ring-2 focus:ring-purple-300"
                required
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Пароль</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-2xl focus:ring-2 focus:ring-purple-300"
                required
                autoComplete="current-password"
              />
            </label>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 font-medium rounded-2xl hover:bg-yellow-500 transition-colors"
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}
