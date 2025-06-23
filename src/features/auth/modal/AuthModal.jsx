import React, { useState } from "react";
import { Modal } from "@components/modal/Modal";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { FormTabs } from "../components/FormTabs";
import { useLogin, useRegister } from "../hooks/useAuthMutate";
import { useNavigate } from "react-router-dom";

export const AuthModal = ({ isOpen, onClose }) => {
  const [formType, setFormType] = useState("login");

  const { mutate: login } = useLogin();
  const { mutate: register } = useRegister();

  const navigate = useNavigate();
  const handleCloseAndNavigate = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAndNavigate}
      className="w-11/12 max-w-[620px] p-6 h-3/5 z-100"
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-end basis-[10%] gap-6">
          <FormTabs formType={formType} setFormType={setFormType} />
        </div>
        <div className="w-full h-full flex items-center basis-[80%]">
          {formType === "login" && <LoginForm onSubmit={login} />}
          {formType === "register" && <RegisterForm onSubmit={register} />}
        </div>
      </div>
    </Modal>
  );
};
