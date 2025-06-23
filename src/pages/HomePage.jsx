import React from "react";
import { ImageCard } from "@components/image/ImageCard";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const categories = [
    {
      category: "mapleStory",
      label: "楓之谷",
      image:
        "https://img0801.s3.ap-southeast-2.amazonaws.com/42a1616e-9329-4a70-9895-f552f487c4d5-ChatGPT Image 2025å¹´5æ27æ¥ ä¸å05_11_57.png",
    },
    {
      category: "LoL",
      label: "英雄聯盟",
      image:
        "https://img0801.s3.ap-southeast-2.amazonaws.com/b0e6cae9-4543-44c9-adc8-968b863e3bb2-ChatGPT Image 2025å¹´5æ27æ¥ ä¸å05_23_29.png",
    },
  ];

  return (
    <div className="flex justify-center w-full min-h-full">
      <div className="w-full max-w-[1200px] border-x border-gray-300 bg-slate-100 p-4">
        <div className="flex gap-4">
          {categories.map(({ category, label, image }) => (
            <Link
              className="w-60 h-60 flex shadow-md relative group"
              to={`/products/${category}`}
            >
              <ImageCard src={image} />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/70 text-white text-base px-3 py-1 rounded-md backdrop-blur-sm shadow-md">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
