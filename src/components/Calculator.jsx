import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState(3000000);
  const [period, setPeriod] = useState(8);
  const [bank, setBank] = useState(1); // Значение банка по умолчанию
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("amount", amount);
    params.append("period", period);
    params.append("bank", bank);
    return params.toString();
  };

  const fetchPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/credit_leasing/calculate?${buildQueryString()}`);
      const data = await response.json();
      if (data.detail) {
        console.error("Payment calculation error:", data.detail);
        return;
      }
      setPayment(data.payment);
    } catch (err) {
      console.error("Fetch payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBankSelect = (bankId) => {
    setBank(bankId);
    fetchPayment(); // Пересчитать платеж при выборе банка
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md">
      {/* Левый блок */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Калькулятор расчета</h2>
        <p className="text-xl text-gray-400 mb-4">Заполните заявку, которую сможете отправить в несколько банков и узнать решение онлайн</p>
        <div className="mb-4">
          <label className="block text-xl text-gray-700 mb-2">Сумма кредита</label>
          <p className="text-gray-500 text-lg mb-2">{amount.toLocaleString()} руб</p>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            onPointerUp={fetchPayment}
            className="w-full"
            style={{ accentColor: "rgb(var(--color-primary))" }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-gray-700 mb-2">Срок кредитования</label>
          <p className="text-gray-500 text-lg mb-2">{period} лет</p>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            onPointerUp={fetchPayment}
            className="w-full"
            style={{ accentColor: "rgb(var(--color-primary))" }}
          />
        </div>
        {loading ? (
          <p className="mt-4 text-lg">Рассчитывается...</p>
        ) : payment !== null ? (
          <p className="mt-4 text-lg">
            Платеж: <strong>{payment} руб/мес</strong>
          </p>
        ) : null}
      </div>

      {/* Правый блок */}
      <div className="flex flex-col items-center lg:ml-6 mt-6 lg:mt-0">
        <h3 className="text-xl font-bold mb-4">Выберите банк</h3>
        <div className="flex space-x-4 mb-6">
          {[1, 2, 3, 4, 5].map((bankId) => (
            <button
              key={bankId}
              onClick={() => handleBankSelect(bankId)}
              className={`w-12 h-12 p-1 md:w-16 md:h-16 md:p-2 rounded-full border-2 ${
                bank === bankId ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <img
                // src={`/api/images/bank${bankId}.png`}
                src={`/images/bank${bankId}.png`}
                alt={`Банк ${bankId}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
        <form className="w-full max-w-sm bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              ФИО
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-4xl px-3 py-2"
              placeholder="Введите ваше ФИО"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-4xl px-3 py-2"
              placeholder="Введите ваш E-mail"
            />
          </div>
          <div className="mb-4 flex items-start">
            <input
              type="checkbox"
              id="agreement"
              className="mt-1 mr-2"
              style={{ accentColor: "rgb(var(--color-primary))" }}
            />
            <label htmlFor="agreement" className="text-md text-gray-600">
              Подтверждаю согласие с условиями обработки персональных данных и
              правилами предоставления услуг.
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-lg bg-gray-900 text-white py-2 rounded hover:bg-gray-500 transition-colors"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}
