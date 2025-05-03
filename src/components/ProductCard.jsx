import React from "react";
import { motion } from "framer-motion";

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
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image_url || "/placeholder-product.jpg"}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">{product.price}₽</span>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
            Положить в корзину
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
