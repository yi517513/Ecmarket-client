import React, { useRef } from "react";
import { ImageCard } from "@components/image/ImageCard";
import { Link } from "react-router-dom";
import { notifyUtils as notify } from "@utils/notify";
import {
  Search as SearchIcon,
  Mail as MailIcon,
  FileText as FileTextIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  CircleDollarSign as CircleDollarSignIcon,
  Flame as FlameIcon,
} from "lucide-react";
import mapleStoryImg from "@assets/games/mapleStory.png";
import lolImg from "@assets/games/lol.png";
import pubgImg from "@assets/games/pubg.png";

export const HomePage = () => {
  const exploreRef = useRef(null);

  const games = [
    {
      category: "mapleStory",
      label: "楓之谷",
      image: mapleStoryImg,
    },
    {
      category: "LoL",
      label: "英雄聯盟",
      image: lolImg,
    },
    {
      category: "pubg",
      label: "絕地求生",
      image: pubgImg,
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
        <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2">
          <FlameIcon className="w-8 h-8 text-red-500" />
          <span>熱門遊戲列表</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {games?.map?.((game) => (
            <Link
              className="w-48 h-48 flex shadow-md relative group"
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

      {/* Buy Process Section */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-2">
          <ShoppingCartIcon className="w-7 h-7" />
          購買流程
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
            <SearchIcon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold text-xl mb-2">選擇商品</h3>
            <p>挑選你喜歡的遊戲帳號、虛寶、代練方案</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
            <img
              src="/assets/logo/ecpay.png"
              alt="綠界 ECPay"
              className="h-10 mx-auto mb-4 object-contain"
            />
            <h3 className="font-semibold text-xl mb-2">下單付款</h3>
            <p>第三方金流付款，支持多種支付方式</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow text-center">
            <MailIcon className="w-10 h-10 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold text-xl mb-2">收到商品</h3>
            <p>賣家交付商品，平台協助保障交易安全</p>
          </div>
        </div>
      </section>

      {/* Sell Process Section */}
      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-2">
          <CircleDollarSignIcon className="w-7 h-7" />
          出售流程
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <FileTextIcon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold text-xl mb-2">填寫商品資訊</h3>
            <p>選擇遊戲類型、商品類別，輸入說明與價格</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <ImageIcon className="w-10 h-10 mx-auto mb-4 text-yellow-600" />
            <h3 className="font-semibold text-xl mb-2">上傳圖片</h3>
            <p>放上圖片，吸引買家注意</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <CheckCircleIcon className="w-10 h-10 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold text-xl mb-2">等待買家下單</h3>
            <p>有人購買後，按指示交付商品並收款</p>
          </div>
        </div>
      </section>
    </div>
  );
};
