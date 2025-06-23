import React from "react";
import { Tooltip } from "@components/tooltip/Tooltip";

export const FormInput = React.memo(
  ({ label, name, register, tip, error, valueAsNumber, ...props }) => {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <Tooltip content={tip} position="right_outside">
          <input
            {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
            className="form-input"
            {...props} //  type, placeholder 等
          />
        </Tooltip>
      </div>
    );
  }
);
