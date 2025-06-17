import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

// Можно добавить отображение характеристик, если product содержит нужные поля
const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Название и лайк */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <FaHeart
            size={20}
            color={product.liked ? "#ef4444" : "transparent"}
            style={{
              stroke: product.liked ? "#ef4444" : "#9ca3af",
              strokeWidth: 40,
            }}
          />
        </div>
        {/* Можно добавить тип/категорию продукта, если есть */}
        {product.category && (
          <p className="text-gray-400 text-sm font-bold">{product.category}</p>
        )}
      </div>
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={"/api/images" + product.image_path}
          className="h-full w-full object-contain bg-white"
        />
      </div>
      <div className="p-4 pt-2">
        {/* Характеристики продукта (пример: brand, capacity, etc.) */}
        {product.brand && (
          <div className="flex items-center justify-around mt-2 text-sm font-semibold text-gray-400">
            <span className="flex items-center gap-1">
              {/* SVG или иконка бренда можно добавить здесь */}
              {product.brand}
            </span>
            {product.capacity && (
              <span className="flex items-center gap-1">
                {/* SVG или иконка ёмкости */}
                {product.capacity}
              </span>
            )}
            {product.diameter && (
              <span className="flex items-center gap-1">
                {product.diameter}
              </span>
            )}
            {product.width && (
              <span className="flex items-center gap-1">
                {product.width}
              </span>
            )}
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">

          <span className="text-lg font-bold">
            {product.price} ₽
            {product.old_price && (
              <div className="text-gray-400 text-base line-through">
                {product.old_price} ₽
              </div>
            )}
          </span>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
            В корзину
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
