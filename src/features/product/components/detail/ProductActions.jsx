import React, { useState } from "react";
import { notifyUtils as notify } from "@utils/notify";
import { QuantitySelector } from "@components/QuantitySelector";
import { useUserStore } from "@app/stores/useUserStore";

export const ProductActions = ({
  inventory,
  price,
  ownerId,
  onCreateOrder,
}) => {
  const currentUserId = useUserStore((s) => s.userId);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleFollowing = () => {
    notify.warn("尚未開發");
  };

  return (
    <div className="border-t h-[20%] flex flex-col justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            error={error}
            setError={setError}
            max={inventory}
          />
          <div className="space-x-2">
            <span className="text-xl">總計:</span>
            <span className="text-lg text-orange-600 font-extrabold tracking-wide">
              {price * quantity}
            </span>
          </div>
        </div>
        {currentUserId === ownerId ? (
          <div className="flex items-center justify-center rounded-md bg-yellow-100 text-yellow-800 px-4 py-2 text-sm font-medium border border-yellow-300">
            您正在瀏覽自己的商品
          </div>
        ) : (
          <button
            onClick={() => onCreateOrder(quantity)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 font-medium"
          >
            我要購買
          </button>
        )}

        <button
          onClick={handleFollowing}
          className="border border-blue-400 text-blue-500 rounded-md px-4 py-2 font-medium hover:bg-orange-50"
        >
          加入追蹤
        </button>
      </div>
    </div>
  );
};
