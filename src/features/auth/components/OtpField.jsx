import React from "react";
import { Tooltip } from "@components/tooltip/Tooltip";
import { useFormContext, useWatch } from "react-hook-form";
import { useRequestOtp } from "../hooks/useAuthMutate";
import { useCountdownContext } from "@app/provider/CountdownProvider";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";

export const OtpField = React.memo(({ register, watchField }) => {
  const openConfirm = useConfirmDialogStore((s) => s.openConfirm);
  const { mutate: requestOtp } = useRequestOtp();
  const { formState } = useFormContext();
  const watchedValue = useWatch({ name: watchField }); // 即時觀察欄位變化

  // 倒數功能
  const { timeLeft, isCounting } = useCountdownContext();

  // 計算是否有阻擋條件（欄位未填或有錯誤）
  const fieldError = !!formState.errors?.[watchField];
  const hasBlockingError = !watchedValue || !!fieldError;
  const errorMessage = formState.errors?.[watchField]?.message;

  const handleRequestOtp = async (email) => {
    const confirmed = await openConfirm("驗證碼將會發送至信箱，5分鐘後過期");
    if (!confirmed) return;

    requestOtp(email);
  };

  return (
    <div className="form-group">
      <label className="form-label">驗證碼</label>
      <div className="flex justify-between gap-4">
        <input type="text" {...register("otp")} className="form-input flex-1" />
        <div className="flex-[3]">
          <Tooltip
            content={
              hasBlockingError ? errorMessage || `${watchField} 尚未填入` : ""
            }
            position="right_outside"
          >
            <button
              type="button"
              onClick={() => handleRequestOtp({ [watchField]: watchedValue })}
              disabled={hasBlockingError || isCounting}
              className="btn-secondary w-full"
            >
              {isCounting ? timeLeft : "發送驗證碼"}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
