import React, { useRef } from "react";
import { ImageCard } from "@components/image/ImageCard";
import { Link } from "react-router-dom";
import { notifyUtils as notify } from "@utils/notify";

export const HomePage = () => {
  const exploreRef = useRef(null);

  const games = [
    {
      category: "mapleStory",
      label: "楓之谷",
      image:
        "https://img0801.s3.ap-southeast-2.amazonaws.com/419f87e5-bf89-474e-96c5-a4488cd7b2f5-demo1.png",
    },
    {
      category: "LoL",
      label: "英雄聯盟",
      image:
        "https://img0801.s3.ap-southeast-2.amazonaws.com/145b1636-072a-462f-b73a-83007ffb2640-demo2.png",
    },
  ];

  const handlOnClick = () => {
    notify.warn("開發中");
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">玩家專屬的遊戲交易平台</h1>
        <p className="text-lg max-w-xl mx-auto mb-6 text-gray-700">
          買帳號、賣虛寶、找代練，全都交給玩家自己決定！多款熱門遊戲支援，安全即時，交易更自由！
        </p>
        <button
          onClick={handlOnClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          馬上開始探索
        </button>
      </section>

      {/* Game Cards */}
      <section ref={exploreRef} className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">🔥 熱門遊戲交易</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {games?.map?.((game) => (
            <Link
              className="w-60 h-60 flex shadow-md relative group"
              to={`/products/${game.category}`}
            >
              <ImageCard src={game.image} />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-sm px-3 py-1 rounded-md backdrop-blur-md">
                {game.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
