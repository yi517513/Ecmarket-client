import React from "react";
import { Tooltip } from "@components/tooltip/Tooltip";

export const FormInput = React.memo(
  ({
    label,
    name,
    register,
    tip,
    error,
    valueAsNumber,
    rightIcon,
    ...props
  }) => {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <div className="relative">
          <Tooltip content={tip} position="right_outside">
            <input
              {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
              className="form-input"
              {...props} //  type, placeholder 等
            />
          </Tooltip>

          {rightIcon && (
            <div className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);
