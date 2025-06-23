import React from "react";
import { Controller } from "react-hook-form";
import { TextEditor } from "../TextEditor";

export const FormTextEditor = ({ name, label, control, tip }) => {
  return (
    <>
      {/* <Controller> 的場景是：表單元件 無法直接用 register() 綁定的情況 */}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-group">
            <label className="form-label">{label}</label>
            <TextEditor
              // key={field.name}
              value={field.value}
              onChange={field.onChange}
              tip={tip}
            />
          </div>
        )}
      />
    </>
  );
};
