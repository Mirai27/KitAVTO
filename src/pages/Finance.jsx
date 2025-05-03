import ComparisonCards from "../components/ComparisonCards";
import ConsultationForm from "../components/ConsultationForm";
import FinanceFAQ from "../components/FinanceFAQ";

export default function Finance() {
  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        <section className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Кредит или лизинг?</h1>
          <p className="text-xl md:text-2xl text-gray-600">Выберите подходящую программу финансирования</p>
        </section>

        <section className="mb-12">
          <ComparisonCards />
        </section>

        <section className="mb-12">
          <FinanceFAQ />
        </section>

        <section className="mb-12">
          <ConsultationForm />
        </section>
      </div>
    </main>
  );
}
