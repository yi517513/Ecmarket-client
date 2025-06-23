import React from "react";

export const ProductInfoPanel = ({ productInfo }) => {
  const {
    title,
    price,
    category,
    inventory,
    followed,
    soldAmount,
    description,
    ownerUid,
  } = productInfo || {};

  return (
    <div className="flex flex-col h-[80%] w-full min-w-[448px] max-w-md p-6 bg-gray-50 border border-gray-200 shadow-md rounded-xl text-gray-900 overflow-hidden">
      {/* 商品標題 & 價格 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold mb-2 leading-tight">{title}</h1>
        <p className="text-2xl text-orange-600 font-extrabold tracking-wide">
          ${price?.toLocaleString?.()}
        </p>
      </section>

      {/* 屬性列表 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3 tracking-widest">
          商品資訊
        </h2>
        <ul className="space-y-1 text-sm">
          <li>
            <span className="text-gray-500">分類：</span>
            <span>{category}</span>
          </li>
          <li>
            <span className="text-gray-500">庫存數量：</span>
            <span>{inventory}</span>
          </li>
          <li>
            <span className="text-gray-500">已售出：</span>
            <span>{soldAmount}</span>
          </li>
          <li>
            <span className="text-gray-500">追蹤數：</span>
            <span>{followed}</span>
          </li>
        </ul>
      </section>

      {/* 商品描述 */}
      <section className="mb-6 overflow-y-auto flex-1 prose prose-sm text-gray-800 border-y border-dashed border-gray-300 py-4">
        <div dangerouslySetInnerHTML={{ __html: description || "" }} />
      </section>

      {/* 賣家資訊 */}
      <section className="mt-4 text-sm">
        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2 tracking-widest">
          賣家資訊
        </h2>

        <div>
          <span className="text-gray-500">賣家 UID：</span>
          <span>{ownerUid}</span>
        </div>
      </section>
    </div>
  );
};
