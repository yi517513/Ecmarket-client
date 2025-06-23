import React from "react";

export const FormSelect = ({
  name,
  defaultLabel = "請選擇一個項目",
  options,
  register,
}) => {
  return (
    <select {...register(name)} className="form-select">
      <option value="">{defaultLabel}</option>
      {options?.map?.((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
