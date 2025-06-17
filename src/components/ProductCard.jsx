import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

// Можно добавить отображение характеристик, если product содержит нужные поля
const ProductCard = ({ product, itemType, onRemove }) => {
  const [liked, setLiked] = useState(product.liked);
  const [inCart, setInCart] = useState(false);

  const handleLike = async () => {
    if (!itemType) return;
    try {
      // Передаем параметры как query, а не в body
      const params = new URLSearchParams({
        item_type: itemType,
        item_id: String(product.id),
      }).toString();
      await fetch(`/api/main_page/add_liked?${params}`, {
        method: "POST",
      });
      setLiked(true);
    } catch {
      // Можно добавить обработку ошибки
    }
  };

  const handleAddToCart = async () => {
    if (!itemType) return;
    try {
      // Передаем параметры как query, а не в body
      const params = new URLSearchParams({
        item_type: itemType,
        item_id: String(product.id),
      }).toString();
      await fetch(`/api/parts/add_buy_item?${params}`, {
        method: "POST",
      });
      setInCart(true);
      setTimeout(() => setInCart(false), 2000); // 2 секунды индикация
      // Можно добавить уведомление об успехе
    } catch {
      // Можно добавить обработку ошибки
    }
  };

  const handleRemove = async () => {
    if (!itemType) return;
    try {
      const params = new URLSearchParams({
        item_type: itemType,
        item_id: String(product.id),
      }).toString();
      await fetch(`/api/parts/add_buy_item?${params}`, {
        method: "POST",
      });
      if (onRemove) onRemove(product.id, itemType);
    } catch {
      // Можно добавить обработку ошибки
    }
  };

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
          {/* Лайк показываем только если нет onRemove (то есть не в корзине) */}
          {!onRemove && itemType ? (
            <motion.button
              type="button"
              className="focus:outline-none"
              onClick={handleLike}
              title={liked ? "Добавлено в избранное" : "В избранное"}
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <FaHeart
                size={20}
                color={liked ? "#ef4444" : "transparent"}
                style={{
                  stroke: liked ? "#ef4444" : "#9ca3af",
                  strokeWidth: 40,
                  transition: "color 0.2s",
                }}
              />
            </motion.button>
          ) : null}
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
          <div className="flex gap-2">
            {/* Показываем только одну из кнопок: либо "В корзину", либо "Удалить" */}
            {onRemove ? (
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                onClick={handleRemove}
                title="Удалить из корзины"
              >
                Удалить
              </motion.button>
            ) : itemType ? (
              <motion.button
                whileTap={{ scale: 1.1 }}
                className={
                  "px-4 py-2 rounded-md transition-colors " +
                  (inCart
                    ? "bg-green-500 text-white"
                    : "bg-accent text-white hover:bg-yellow-500")
                }
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart ? "В корзине" : "В корзину"}
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;