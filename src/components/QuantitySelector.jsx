import React from "react";

export const QuantitySelector = ({ quantity, setQuantity, max }) => {
  const handleDec = () => {
    setQuantity((p) => Math.max(Number(p) - 1, 0));
  };

  const handleInc = () => {
    setQuantity((p) => Math.min(Number(p) + 1, max));
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (Number(value) || value === "") setQuantity(Number(value));
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleDec}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
      >
        -
      </button>
      <div className="w-20">
        <input
          type="text"
          value={quantity}
          onChange={handleChange}
          className="p-1 border border-gray-400 rounded w-full h-full block"
        />
      </div>
      <button
        onClick={handleInc}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
      >
        +
      </button>
    </div>
  );
};
