import React from "react";

const Card = ({ title, count }) => {
  return (
    <div className="py-5 px-9  grow glassmorphism-stat">
      <h1 className="text-md sm:text-xl">{title}</h1>
      <p className="text-xl sm:text-3xl">{count}</p>
    </div>
  );
};

export default Card;
