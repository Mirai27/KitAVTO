import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Parts() {
  const [recommendedParts, setRecommendedParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecommendedParts() {
      setLoading(true);
      try {
        const response = await fetch("/api/parts/offers?limit=4");
        const data = await response.json();
        setRecommendedParts(data.items);
      } catch (error) {
        console.error("Ошибка при загрузке рекомендуемых запчастей:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendedParts();
  }, []);

  return (
    <main className="bg-gray-50 py-4">
      <div className="container mx-auto px-4 transition-normal duration-300 ease-out">
        {/* Section 1: Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            {["Аккумуляторы", "Шины", "Фильтры"].map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-white font-semibold text-gray-800 border-2 border-transparent rounded-lg hover:border-[rgb(var(--color-primary))] transition-colors"
                onClick={() => {
                  if (category === "Шины") navigate("/tires");
                  else if (category === "Аккумуляторы") navigate("/batteries");
                  else if (category === "Фильтры") navigate("/oilfilters");
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Recommended Parts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Рекомендуем вам</h2>
          {loading ? (
            <div className="text-center py-8">Загрузка...</div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedParts.map((product) => (
                <ProductCard key={product.id} product={product} itemType="oil_filters" />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Promotions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Акции</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["/promo1.jpg", "/promo1.jpg", "/promo1.jpg", "/promo1.jpg", "/promo1.jpg", "/promo1.jpg"].map(
              (image, index) => (
                <img
                  key={index}
                  src={"/api/images" + image}
                  alt={`Акция ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
