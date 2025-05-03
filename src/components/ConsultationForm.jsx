export default function ConsultationForm() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-gray-200">
      <form className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold">Нужна консультация?</h2>
        <p className="mb-3">Оставьте заявку и мы с вами свяжемся</p>
        
        <div className="space-y-3">
          <InputField label="ФИО" type="text" required />
          <InputField label="E-mail" type="email" required />
          <TextAreaField label="Сообщение" />
          
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 font-medium rounded-2xl hover:bg-purple-700 transition-colors"
          >
            Отправить заявку
          </button>
        </div>
      </form>
    </div>
  );
}

// Вынесенные компоненты полей ввода
function InputField({ label, type, required = false }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <input
        type={type}
        className="w-full p-2 mt-1 border rounded-2xl focus:ring-2 focus:ring-purple-300"
        required={required}
      />
    </label>
  );
}

function TextAreaField({ label }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <textarea
        className="w-full p-2 mt-1 border rounded-2xl h-24 focus:ring-2 focus:ring-purple-300"
      />
    </label>
  );
}