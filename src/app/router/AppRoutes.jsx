import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@layouts/MainLayout";
import { HomePage } from "@pages/HomePage";
import { DevicedManagePage } from "@pages/DevicedManagePage";
import { PublicProductListPage } from "@pages/PublicProductListPage";
import { ProductFormPage } from "@pages/ProductFormPage";
import { ImageManagePage } from "@pages/ImageManagePage";
import { OrderListPage } from "@pages/OrderListPage";
import { ProductDetailPage } from "@pages/ProductDetailPage";
import { SellerProductListPage } from "@pages/SellerProductListPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route path="products">
        <Route path=":category" element={<PublicProductListPage />} />
        <Route path=":category/:productId" element={<ProductDetailPage />} />
        <Route path="create" element={<ProductFormPage />} />
        <Route path=":productId/edit" element={<ProductFormPage />} />
      </Route>

      <Route path="user">
        <Route path="images" element={<ImageManagePage />} />
        <Route path="deviced" element={<DevicedManagePage />} />
      </Route>

      <Route path="seller">
        <Route path="products" element={<SellerProductListPage />} />
      </Route>

      <Route path="buyer">
        <Route path="orders" element={<OrderListPage />} />
      </Route>
    </Route>
  </Routes>
);
