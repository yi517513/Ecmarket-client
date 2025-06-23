import React from "react";
import { useNavigate } from "react-router-dom";

export const OrderListRow = ({
  _id,
  seller,
  productSnapshot,
  quantity,
  totalAmount,
  status,
  onContant,
  onPayment,
  onDelete,
}) => {
  const { productId, title, category } = productSnapshot || {};
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/products/${category}/${productId}`);
  };

  const paidStatus = { unpaid: "尚未付款", paid: "已付款", cancel: "已取消" };

  const isUnpaid = status === "unpaid";
  const isPaid = status === "paid";

  return (
    <div
      role="row"
      className="block hover:bg-slate-200 flex items-center p-3 text-sm text-gray-800 h-[120px]"
    >
      <div role="cell" className="flex-[2] flex flex-col justify-between">
        <header className="flex flex-col gap-4">
          <header
            className="flex gap-4 cursor-pointer"
            onClick={handleNavigateToDetail}
          >
            <h2 className="w-fit text-lg text-blue-600 hover:text-orange-400">
              {title}
            </h2>
          </header>
          <p className="text-sm text-muted-foreground  mt-4">{`訂單編號:${_id}`}</p>
        </header>
      </div>
      <div role="cell" className="flex-1 text-center">
        {paidStatus[status]}
      </div>
      <div role="cell" className="flex-1 text-center">
        {quantity}
      </div>
      <div role="cell" className="flex-1 text-center">
        {totalAmount}
      </div>

      <div
        role="cell"
        className="flex-1 flex flex-col items-center gap-2 text-center"
      >
        {isUnpaid && (
          <button className="btn-primary w-24" onClick={() => onPayment(_id)}>
            進行付款
          </button>
        )}
        {isPaid && (
          <button
            className="btn-primary w-24"
            onClick={() => onContant(seller)}
          >
            聯繫賣家
          </button>
        )}

        <button className="btn-primary w-24" onClick={() => onDelete(_id)}>
          刪除訂單
        </button>
      </div>
    </div>
  );
};
