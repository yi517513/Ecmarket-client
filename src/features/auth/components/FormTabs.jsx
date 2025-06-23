import React from "react";
import { Tabs } from "@components/Tabs";

export const FormTabs = ({ formType, setFormType }) => {
  return (
    <Tabs
      options={[
        {
          label: "登入",
          value: "login",
          className: `px-4 py-2 text-sm transition-colors duration-200 ${
            formType === "login" ? "tab-active" : "tab-inactive"
          }`,
        },
        {
          label: "註冊",
          value: "register",
          className: `px-4 py-2 text-sm transition-colors duration-200 ${
            formType === "register" ? "tab-active" : "tab-inactive"
          }`,
        },
      ]}
      onChange={setFormType}
      className="space-x-2"
    />
  );
};
