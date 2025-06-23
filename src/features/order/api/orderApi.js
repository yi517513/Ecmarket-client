import { api } from "@utils/apiClient";

export const getOrdersApi = async (queryParams) => {
  return await api.get("/api/orders", { params: queryParams });
};

export const createOrderApi = async ({ productId, quantity, price }) => {
  return await api.post(
    "/api/orders",
    { productId, quantity, price },
    { silent: true }
  );
};

export const deleteOrderApi = async (orderId) => {
  return await api.delete(`/api/orders/${orderId}`);
};

export const createPaymentHtmlApi = async (orderId) => {
  return await api.get(`/api/payment/${orderId}`);
};
