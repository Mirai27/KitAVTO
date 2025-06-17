import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const CarCard = ({ car, per_day = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: 0, // Removed index-based delay for standalone component
        ease: "easeOut",
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Название и тип кузова над картинкой */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{car.brand + " " + car.model}</h3>
          <FaHeart
            size={20}
            color={car.isliked ? "#ef4444" : "transparent"}
            style={{
              stroke: car.isliked ? "#ef4444" : "#9ca3af", // gray-400
              strokeWidth: 40,
            }}
          />
        </div>
        <p className="text-gray-400 text-sm font-bold">{car.body}</p>
      </div>
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={"/api/images" + car.image_path}
          alt={car.name}
          className="h-full w-full object-contain bg-white"
        />
      </div>
      <div className="p-4 pt-2">
        {/* <h3> и <p> убраны отсюда */}
        <div className="flex items-center justify-around mt-2 text-sm font-semibold text-gray-400">
          {/* Fuel icon + value */}
          <span className="flex items-center gap-1">
            {/* SVG для fuel */}
            <svg
              className="w-5 h-5"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4282 4.64551L10.3777 4.12149C10.1834 4.02717 9.94195 4.1009 9.84762 4.29524C9.74805 4.49483 9.82701 4.731 10.0213 4.82532L10.8565 5.23929L10.8587 7.75403L8.88999 7.76111L8.88515 2.37464C8.8842 1.32465 8.18024 0.80031 7.30874 0.801124L3.10877 0.805044C2.23728 0.805858 1.53425 1.33151 1.5352 2.38151L1.54287 10.9127L0.755379 10.9134C0.540131 10.9136 0.361792 11.0923 0.361986 11.3076C0.36218 11.5228 0.540839 11.7011 0.756088 11.7009L9.68103 11.6926C9.89628 11.6924 10.0746 11.5137 10.0744 11.2985C10.0742 11.0832 9.89557 10.9049 9.68032 10.9051L8.89282 10.9058L8.8907 8.54861L11.2532 8.54115C11.4737 8.54095 11.6468 8.36229 11.6466 8.14704L11.6437 4.99706C11.6436 4.85006 11.5595 4.71364 11.4282 4.64551ZM2.84858 3.37252C2.84793 2.64278 3.29394 2.37986 3.83993 2.37935L6.58566 2.37679C7.12641 2.37629 7.57289 2.63837 7.57355 3.36811L7.57413 4.01386C7.57478 4.73836 7.12877 5.00127 6.58278 5.00178L3.84229 5.00434C3.2963 5.00485 2.84981 4.74277 2.84916 4.01302L2.84858 3.37252ZM3.11361 6.18626L4.6886 6.18479C4.90385 6.18459 5.08251 6.36292 5.0827 6.57817C5.0829 6.79342 4.90456 6.97209 4.68931 6.97229L3.11432 6.97376C2.89907 6.97396 2.72041 6.79563 2.72022 6.58038C2.72003 6.36513 2.89836 6.18646 3.11361 6.18626Z"
                fill="#90A3BF"
              />
            </svg>
            {car.fuel}
          </span>
          {/* Seats icon + value */}
          <span className="flex items-center gap-1">
            {/* SVG для seats */}
            <svg
              className="w-5 h-5"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.1734 1.11676C3.13511 1.1177 2.29178 1.96257 2.29272 3.00085C2.29364 4.01932 3.09093 4.84288 4.12925 4.87761C4.16095 4.87361 4.19265 4.87359 4.21643 4.87753C4.22436 4.87752 4.22832 4.87752 4.23625 4.87751C4.24021 4.87751 4.24021 4.87751 4.24417 4.8775C5.25864 4.84092 6.05444 4.01591 6.05748 2.99744C6.05654 1.95916 5.21168 1.11582 4.1734 1.11676Z"
                fill="#90A3BF"
              />
              <path
                d="M6.19124 5.92988C5.08492 5.19379 3.2818 5.19542 2.16889 5.93353C1.6659 6.27083 1.38891 6.72682 1.38936 7.21425C1.3898 7.70169 1.66761 8.15321 2.16724 8.48564C2.72238 8.85765 3.45172 9.04325 4.1809 9.04259C4.91007 9.04193 5.63908 8.85501 6.19355 8.482C6.69257 8.1447 6.96957 7.69268 6.96912 7.20127C6.96472 6.71384 6.69087 6.26232 6.19124 5.92988Z"
                fill="#90A3BF"
              />
              <path
                d="M8.53059 3.22896C8.59469 3.99771 8.04842 4.6719 7.29159 4.76373C7.28762 4.76374 7.28762 4.76374 7.28366 4.76374L7.27177 4.76375C7.24799 4.76377 7.22422 4.76379 7.20441 4.77174C6.82002 4.7919 6.46721 4.66937 6.2015 4.44372C6.60934 4.07877 6.84266 3.53167 6.79457 2.93728C6.76654 2.61631 6.65531 2.32316 6.48864 2.07364C6.63916 1.99821 6.81349 1.9505 6.99181 1.93449C7.76847 1.86641 8.46251 2.44437 8.53059 3.22896Z"
                fill="#90A3BF"
              />
              <path
                d="M9.32707 6.89399C9.29571 7.27842 9.05031 7.61153 8.63838 7.83779C8.24228 8.05611 7.74305 8.1596 7.24767 8.14816C7.53277 7.89031 7.69892 7.56916 7.73032 7.22832C7.7695 6.73689 7.53526 6.26551 7.0673 5.88946C6.80159 5.67967 6.49234 5.51351 6.15538 5.39096C7.03095 5.13654 8.13279 5.30595 8.81095 5.85222C9.1758 6.14514 9.36239 6.51352 9.32707 6.89399Z"
                fill="#90A3BF"
              />
            </svg>

            {car.seats}
          </span>
          {/* Transmission icon + value */}
          <span className="flex items-center gap-1">
            {/* SVG для transmission */}
            <svg
              className="w-5 h-5"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_40_32973)">
                <path
                  d="M5.33693 1.15181C3.14941 1.15379 1.37563 2.93078 1.37761 5.1183C1.37959 7.30583 3.15658 9.0796 5.34411 9.07762C7.53163 9.07564 9.30541 7.29865 9.30343 5.11112C9.30144 2.9236 7.52842 1.14982 5.33693 1.15181Z"
                  fill="#90A3BF"
                />
                <rect
                  x="2.16797"
                  y="1.94733"
                  width="6.34065"
                  height="6.34065"
                  rx="3.17033"
                  transform="rotate(-0.0518852 2.16797 1.94733)"
                  fill="white"
                />
                <path
                  d="M5.33868 2.73698C4.02617 2.73817 2.9619 3.80437 2.96309 5.11688C2.96428 6.42939 4.03047 7.49366 5.34299 7.49247C6.6555 7.49128 7.71977 6.42509 7.71858 5.11257C7.71739 3.80006 6.65357 2.73579 5.33868 2.73698Z"
                  fill="#90A3BF"
                />
                <rect
                  x="3.75391"
                  y="3.53088"
                  width="3.17033"
                  height="3.17033"
                  rx="1.58516"
                  transform="rotate(-0.0518852 3.75391 3.53088)"
                  fill="white"
                />
                <rect
                  x="4.94629"
                  y="7.0965"
                  width="0.792582"
                  height="1.58516"
                  transform="rotate(-0.0518852 4.94629 7.0965)"
                  fill="#90A3BF"
                />
                <rect
                  x="7.32227"
                  y="4.71661"
                  width="1.58516"
                  height="0.792582"
                  transform="rotate(-0.0518852 7.32227 4.71661)"
                  fill="#90A3BF"
                />
                <rect
                  x="1.77441"
                  y="4.72174"
                  width="1.58516"
                  height="0.792582"
                  transform="rotate(-0.0518852 1.77441 4.72174)"
                  fill="#90A3BF"
                />
              </g>
              <defs>
                <clipPath id="clip0_40_32973">
                  <rect
                    width="9.51098"
                    height="9.51098"
                    fill="white"
                    transform="translate(0.581055 0.363647) rotate(-0.0518852)"
                  />
                </clipPath>
              </defs>
            </svg>
            {car.transmission}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">
            {car.price} ₽
            {per_day && <span className="text-lg text-gray-400"> /день</span>}
            {car.old_price && (
              <div className="text-gray-400 text-base line-through">
                {car.old_price} ₽
              </div>
            )}
          </span>
          {per_day ? (
            <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
              Арендовать
            </button>
          ) : (
            <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
              Купить
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
