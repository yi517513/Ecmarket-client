// 檢查 ObjectId 格式（24個十六進位）
const objectIdValidator = (id) => /^[a-fA-F0-9]{24}$/.test(id);

// 合法分類類型
const VALID_CATEGORIES = ["mapleStory", "LoL"];

const categoryValidator = (category) => VALID_CATEGORIES.includes(category);

// 封裝通用驗證函式
const validate = (value, validatorFn, errorMessage) => {
  if (!value) return false;
  return validatorFn(value) ? true : errorMessage;
};

// 整合驗證：回傳成功/錯誤訊息
export const paramsValidator = ({ id, category }) => {
  return {
    validId: validate(id, objectIdValidator, "商品編號格式有誤"),
    validCategory: validate(category, categoryValidator, "商品類型有誤"),
  };
};
