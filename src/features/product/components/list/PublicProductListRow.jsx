import React from "react";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

export const PublicProductListRow = React.memo(
  ({
    _id,
    title,
    price,
    inventory,
    category,
    followed,
    hasImages,
    productType,
    soldAmount,
  }) => {
    return (
      <Link className="block hover:bg-slate-200 transition-colors" to={_id}>
        <div role="row" className="flex p-3 text-sm text-gray-800 h-[120px]">
          <div role="cell" className="flex-[3] flex flex-col justify-between">
            <header className="flex gap-4">
              <h2 className="w-fit text-lg text-blue-600 hover:text-orange-400">
                {title}
              </h2>
              {hasImages && (
                <Image className="text-green-500" aria-label="有圖片" />
              )}
            </header>
            <p className="text-sm text-muted-foreground">
              {category} / {productType}
            </p>
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
          <div role="cell" className="flex-1 text-center">
            {soldAmount}
          </div>
        </div>
      </Link>
    );
  }
);
