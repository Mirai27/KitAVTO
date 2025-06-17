import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  // Функция выхода
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <main className="bg-gray-50 py-4 h-auto flex items-center">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-gray-200 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Личный кабинет</h2>
          {loading ? (
            <div className="text-center py-8">Загрузка...</div>
          ) : user ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mb-2">
                  {user.image_path ? (
                    <img
                      src={"/api/images" + user.image_path}
                      alt="Аватар"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-gray-400">👤</span>
                  )}
                </div>
                <div className="text-xl font-semibold">
                  {user.full_name || user.username || "Пользователь"}
                </div>
              </div>
              <div>
                <span className="text-gray-500">E-mail:</span>{" "}
                <span className="text-black">{user.email || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500">Логин:</span>{" "}
                <span className="text-black">{user.username || "—"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">Нет данных пользователя</div>
          )}
        </div>
      </div>
    </main>
  );
}
