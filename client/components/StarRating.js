import React, { useState } from "react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  console.log(rating);
  return (
    <div className="">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-amber-400" : "text-gray-300"
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="shadow-lg">
              <FaStar />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
