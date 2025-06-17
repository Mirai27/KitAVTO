import { useAuthModal } from "./context/AuthModalContext";

// Переопределяем глобальный fetch для автоматической подстановки токена
const originalFetch = window.fetch;
window.fetch = async (input, init = {}) => {
  const token = localStorage.getItem("token");
  const headers = new Headers(init && init.headers ? init.headers : {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await originalFetch(input, { ...init, headers });
  if (response.status === 400 || response.status === 401) {
    // Вместо window.location.href = "/login":
    window.dispatchEvent(new CustomEvent("open-login-modal"));
    return Promise.reject(new Error("Unauthorized"));
  }
  return response;
};
