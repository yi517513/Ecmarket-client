import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@components/RHF/FormInput";
import { FormSelect } from "@components/RHF/FormSelect";
import { FormTextEditor } from "@components/RHF/FormTextEditor";
import { ErrorMsgOverlay } from "@components/ui/ErrorMsgOverlay";
import { ImageCardWithPreview } from "@components/image/ImageCardWithPreview";
import { RemoveImageButton } from "@components/button/RemoveImageButton";
import { OpenImageSelectorButton } from "@components/button/OpenImageSelectorButton ";

const schema = z
  .object({
    title: z.string().min(1, "商品名稱尚未填入"),
    price: z.number().min(1, "單件價格尚未填入"),
    inventory: z.number().min(1, "件數尚未填入"),
    description: z.string().min(1, "商品詳情尚未填入"),
    category: z.string().min(1, "遊戲分類尚未選擇"),
    productType: z.string().min(1, "商品類型尚未選擇"),
  })
  .passthrough(); // 不會過濾掉未定義欄位;

export const ProductForm = ({
  defaultValues,
  onSubmit,
  images,
  onOpenImageSelector,
  onRemoveImage,
}) => {
  const { productId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleInvalid = (formErrors) => {
    const watchFields = [
      "title",
      "price",
      "inventory",
      "description",
      "category",
      "productType",
    ];
    const first = watchFields.find((name) => formErrors[name]?.message);

    if (first) {
      setErrorMessage(formErrors[first].message);
    }
  };

  const watched = methods.watch();

  useEffect(() => {
    // console.log("Watched values", watched);
  }, [watched]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, handleInvalid)}
        className="w-full h-full max-w-2xl mx-auto"
      >
        <h1 className="text-2xl text-gray-500 font-medium">
          {productId ? "更新商品" : "新增商品"}
        </h1>
        <div className="w-full max-w-[320px] flex gap-4 my-8">
          <FormSelect
            name="category"
            defaultLabel="遊戲分類"
            register={register}
            options={[
              { value: "mapleStory", label: "楓之谷" },
              { value: "LoL", label: "英雄聯盟" },
              { value: "Pokemon", label: "寶可夢" },
            ]}
          />
          <FormSelect
            name="productType"
            defaultLabel="商品類型"
            register={register}
            options={[
              { value: "item", label: "道具" },
              { value: "money", label: "遊戲幣" },
              { value: "account", label: "帳號" },
            ]}
          />
        </div>

        <div className="w-full">
          <FormInput
            label="商品名稱"
            name="title"
            error={errors["title"]?.message}
            register={register}
            tip="請輸入商品名稱"
            control={control}
          />
        </div>

        <div className="w-full max-w-[160px]">
          <FormInput
            label="單件價格"
            name="price"
            error={errors["price"]?.message}
            register={register}
            tip="請輸入單件商品價格"
            valueAsNumber
          />
          <FormInput
            label="件數"
            name="inventory"
            error={errors["inventory"]?.message}
            register={register}
            tip="請輸入販售數量"
            valueAsNumber
          />
        </div>

        <div className="border border-y bprder-gray-300 h-[120px] my-4 flex">
          {[0, 1, 2, 3].map((index) => {
            const image = images?.[index];
            return (
              <div className="flex-1 relative border border-x border-gray-300 cursor-pointer hover:bg-slate-200">
                {image ? (
                  <>
                    <RemoveImageButton onRemove={onRemoveImage} image={image} />
                    <ImageCardWithPreview src={image?.url} />
                  </>
                ) : (
                  <OpenImageSelectorButton onClick={onOpenImageSelector} />
                )}
              </div>
            );
          })}
        </div>

        <FormTextEditor
          name="description"
          label="商品詳情"
          control={control}
          tip="請詳細描述商品"
        />

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="w-full max-w-[240px] btn-secondary mt-4"
            disabled={isSubmitting}
          >
            {productId ? "更新商品" : "刊登出售"}
          </button>
        </div>

        <ErrorMsgOverlay
          message={errorMessage}
          onClear={() => setErrorMessage(null)}
        />
      </form>
    </FormProvider>
  );
};
