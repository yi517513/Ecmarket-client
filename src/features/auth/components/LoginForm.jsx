import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@components/RHF/FormInput";
import { PasswordInput } from "@components/RHF/PasswordInput";

const schema = z.object({
  email: z.string().email("請輸入有效的 Email"),
  password: z.string().min(6, "密碼至少 6 位數"),
});

export const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "test01@gmail.com",
      password: "!@#test01",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
      <FormInput
        label="Email"
        name="email"
        error={errors["email"]?.message}
        register={register}
        tip="請輸入您註冊時使用的 Email"
      />

      <PasswordInput
        label="Password"
        name="password"
        error={errors["password"]?.message}
        register={register}
        tip="密碼區分大小寫，至少 6 位"
        type="password"
      />

      <button
        type="submit"
        className="w-full btn-secondary mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "登入中..." : "登入"}
      </button>
    </form>
  );
};
