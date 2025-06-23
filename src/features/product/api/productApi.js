import { api } from "@utils/apiClient";

// public - list
export const getPublicProductsApi = async ({ category, queryParams }) => {
  return api.get(`/api/products/category/${category}`, { params: queryParams });
};

// public - single
export const getProductDetailApi = async (productId) => {
  return await api.get(`/api/products/single/${productId}`);
};

// private - list
export const getPrivateProductsApi = async (queryParams) => {
  return await api.get(`/api/products/private`, { params: queryParams });
};

// private - single (for edit)
export const getPrivateProductApi = async (productId) => {
  return await api.get(`/api/products/private/${productId}`);
};

// create
export const createProductApi = async (product) => {
  return await api.post("/api/products", product);
};

// update
export const updateProductApi = async (product) => {
  const { _id: productId } = product;
  return await api.patch(`/api/products/${productId}`, product);
};

// delete
export const deleteProductApi = async (productId) => {
  return await api.delete(`/api/products/${productId}`);
};
