import React, { useEffect, useState } from "react";

const Card = ({ text, from }) => {
  const [click, setClick] = useState(false);
  const handleClick = async () => {
    setClick(true);
  };

  return (
    <div className="justify-center items-center shadow rounded my-2 bg-gray-200 cursor-default">
      <button
        className={`w-full text-blue-400 ${
          from === "user" ? "hover:text-xl" : ""
        } ${
          click
            ? "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:text-xl rounded"
            : ""
        }`}
        onClick={handleClick}
      >
        <div className="p-1">{text}</div>
      </button>
    </div>
  );
};

export default Card;
