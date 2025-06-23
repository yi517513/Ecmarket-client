import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageCard } from "@components/image/ImageCard";

export const SellerProductListRow = ({
  _id,
  title,
  price,
  inventory,
  category,
  followed,
  images,
  productType,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/products/${category}/${_id}`);
  };

  const handleEdit = (e) => {
    navigate(`/products/${_id}/edit`);
  };

  return (
    <div
      role="row"
      className="block hover:bg-slate-200 flex items-center p-3 text-sm text-gray-800 h-[120px]"
    >
      <div role="cell" className="flex-[3] flex flex-col justify-between">
        <header className="flex  gap-4">
          <div className="w-20 h-20">
            <ImageCard src={images?.[0]?.url} />
          </div>
          <h2
            onClick={handleNavigateToDetail}
            className="cursor-pointer w-fit text-lg text-blue-600 hover:text-orange-400"
          >
            {title}
          </h2>
        </header>
      </div>
      <div role="cell" className="flex-1 text-center">
        {category}
      </div>
      <div role="cell" className="flex-1 text-center">
        {productType}
      </div>
      <div role="cell" className="flex-1 text-center">
        {price}
      </div>
      <div role="cell" className="flex-1 text-center">
        {inventory}
      </div>
      <div role="cell" className="flex-1 text-center">
        {followed}
      </div>

      <div
        role="cell"
        className="flex-1 flex flex-col items-center gap-2 text-center"
      >
        <button className="btn-primary w-24" onClick={handleEdit}>
          編輯
        </button>
        <button className="btn-primary w-24" onClick={() => onDelete(_id)}>
          刪除
        </button>
      </div>
    </div>
  );
};
