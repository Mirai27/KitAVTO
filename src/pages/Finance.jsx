import ComparisonCards from "../components/ComparisonCards";
import ConsultationForm from "../components/ConsultationForm";
import FinanceFAQ from "../components/FinanceFAQ";
import Calculator from "../components/Calculator";

export default function Finance() {
  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
 

        <section className="mb-12">
          <ComparisonCards />
        </section>

        <section className="mb-12">
          <Calculator />
        </section>

        <section className="mb-12">
          <FinanceFAQ />
        </section>

        <section
          className="mb-12 rounded-xl shadow-md bg-[url('/public/consultation.svg')] bg-cover bg-[position:-150px] bg-no-repeat bg-white flex items-center justify-end"
          style={{ minHeight: '600px' }}
        >
          <div className="w-full max-w-md">
            <ConsultationForm />
          </div>
        </section>
      </div>
    </main>
  );
}
