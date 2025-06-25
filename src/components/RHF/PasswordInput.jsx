import React, { useState } from "react";
import { FormInput } from "@components/RHF/FormInput";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({ label, name, error, tip, register }) => {
  const [visible, setVisible] = useState(false);

  const icon = visible ? (
    <EyeOff className="w-4 h-4" onClick={() => setVisible(false)} />
  ) : (
    <Eye className="w-4 h-4" onClick={() => setVisible(true)} />
  );

  return (
    <FormInput
      label={label}
      name={name}
      error={error}
      register={register}
      tip={tip}
      type={visible ? "text" : "password"}
      rightIcon={icon}
    />
  );
};
