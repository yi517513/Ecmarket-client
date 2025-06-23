import React, { useEffect } from "react";
import { useFetchProductDetail } from "@features/product/hooks/useProductQuery";
import { useParams } from "react-router-dom";
import { notifyUtils as notify } from "@utils/notify";
import { ProductImageGallery } from "@features/product/components/detail/ProductImageGallery";
import { useImageGallery } from "@features/product/hooks/useImageGallery";
import { paramsValidator } from "@utils/validator";
import { LoadingOverlay } from "@components/ui/LoadingOverlay";
import { ProductInfoPanel } from "@features/product/components/detail/ProductInfoPanel";
import { ProductActions } from "@features/product/components/detail/ProductActions";
import { useCreateOrder } from "@features/order/hooks/useOrderMutate";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";

export const ProductDetailPage = () => {
  const openConfirm = useConfirmDialogStore((s) => s.openConfirm);
  const { category, productId } = useParams();
  const { validId, validCategory } = paramsValidator({
    id: productId,
    category,
  });

  const { data: product, isLoading } = useFetchProductDetail({
    productId,
    category,
    enabled: validId && validCategory,
  });
  const { images: initialImages, ...productInfo } = product || {};

  const { mutate: createOrder } = useCreateOrder();

  const handleCreateOrder = async (quantity) => {
    if (quantity <= 0) {
      notify.error("件數必須大於0");
      return;
    }
    const confirmed = await openConfirm("將轉跳至付款頁面");
    if (!confirmed) return;

    createOrder({ productId: product?._id, quantity, price: product?.price });
  };

  const {
    thumbnailList,
    selectedImage,
    selectImageByIndex,
    handleNext,
    handlePrev,
  } = useImageGallery(initialImages);

  // === 判斷 url 的 :productId 是否符合 objectId ===
  useEffect(() => {
    if (!validId) notify.error("商品編號格式有誤");
    if (!validCategory) notify.error("商品類型有誤");
  }, [validId, validCategory]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="flex justify-center w-full p-2">
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-[1200px]">
        <ProductImageGallery
          thumbnailList={thumbnailList}
          selectedImage={selectedImage}
          onChangeSelectedIndex={selectImageByIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <div className="flex flex-col justify-between">
          <ProductInfoPanel productInfo={productInfo} />
          <ProductActions
            inventory={productInfo?.inventory}
            price={productInfo?.price}
            ownerId={productInfo?.ownerId}
            onCreateOrder={handleCreateOrder}
          />
        </div>
      </div>
    </div>
  );
};
