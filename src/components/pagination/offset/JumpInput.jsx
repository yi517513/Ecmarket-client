import React, { useState } from "react";

export const JumpInput = ({ handleJump }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (Number(value) || value === "") setInputValue(Number(value));
  };

  const handleSubmit = (inputValue) => {
    handleJump(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex items-center gap-1 ml-2">
      <span>到第</span>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-14 border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <span className="mx-1">頁</span>
      <button
        onClick={() => handleSubmit(inputValue)}
        className="btn-secondary px-2"
      >
        確定
      </button>
    </div>
  );
};
