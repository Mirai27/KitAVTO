import React from "react";
import { motion } from "framer-motion";

const CarCard = ({ car }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        delay: 0, // Removed index-based delay for standalone component
        ease: "easeOut",
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={car.image || "/placeholder-car.jpg"}
          alt={car.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{car.name}</h3>
        <p className="text-gray-600 text-sm">{car.type}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-3">{car.seats}</span>
          <span className="mr-3">{car.transmission}</span>
          <span>{car.fuel}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">{car.price}/day</span>
          <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
            Арендовать
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
