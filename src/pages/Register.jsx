import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password || !repeatPassword) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Пароли не совпадают.");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ username, password }).toString();
      const resp = await fetch(`/api/auth/register?${params}`, {
        method: "POST",
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          window.dispatchEvent(new Event("user-auth-changed"));
          // сразу после регистрации токен уже сохранён
          navigate("/");
        } else {
          setError("Ошибка регистрации.");
        }
      } else {
        setError("Ошибка регистрации.");
      }
    } catch {
      setError("Ошибка регистрации.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 py-4 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 flex justify-center">
        <form
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-gray-200 max-w-md w-full"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Имя пользователя</label>
            <input
              className="input w-full"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Пароль</label>
            <input
              className="input w-full"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Повторите пароль</label>
            <input
              className="input w-full"
              type="password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </main>
  );
}
