import React, { useEffect } from "react";
import { ProductForm } from "@features/product/components/form/ProductForm";
import { ImageSelectorModal } from "@features/image/modal/ImageSelectorModal";
import { useImageSelector } from "@features/image/hooks/useImageSelector";
import { useMatch, useParams } from "react-router-dom";
import { useFetchPrivateProduct } from "@features/product/hooks/useProductQuery";
import { notifyUtils as notify } from "@utils/notify";
import { useUpdateProduct } from "@features/product/hooks/useProductMutate";
import { useCreateProduct } from "@features/product/hooks/useProductMutate";
import { LoadingOverlay } from "@components/ui/LoadingOverlay";
import { paramsValidator } from "@utils/validator";

export const ProductFormPage = () => {
  const { productId } = useParams();
  const isEdit = useMatch("/products/:productId/edit");
  const { validId } = paramsValidator({ id: productId });

  // === fetch product for edit ===
  const { data: product, isLoading } = useFetchPrivateProduct({
    productId,
    enabled: Boolean(isEdit) && validId,
  });
  const { images: initialImages, ...defaultValues } = product || {};

  // === update/create product api ===
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: createProduct } = useCreateProduct();

  // === 判斷 url 的 :productId 是否符合 objectId ===
  useEffect(() => {
    if (Boolean(isEdit) && !validId) notify.error("商品編號格式有誤");
  }, [Boolean(isEdit), validId]);

  // === 圖片管理彈窗用 ===
  const {
    isModalOpen,
    openModal,
    closeModal,
    images,
    selectImage,
    removeImage,
  } = useImageSelector(initialImages);

  // === form submit 根據 isEdit 選擇 trigger ===
  const handleFormSubmit = (formData) => {
    const handleSubmit = isEdit ? updateProduct : createProduct;
    handleSubmit({ ...formData, images });
  };

  if (isLoading) return <LoadingOverlay />;
  return (
    <div className="w-full flex justify-center my-12">
      <ProductForm
        key={productId ?? "create"}
        defaultValues={defaultValues}
        onOpenImageSelector={openModal}
        images={images}
        onRemoveImage={removeImage}
        onSubmit={handleFormSubmit}
      />
      <ImageSelectorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={selectImage}
      />
    </div>
  );
};
