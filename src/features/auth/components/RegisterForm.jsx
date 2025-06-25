import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@components/RHF/FormInput";
import { OtpField } from "./OtpField";
import { PasswordInput } from "@components/RHF/PasswordInput";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "使用者名稱至少 3 個字")
      .max(8, "使用者名稱最多 8 個字"),
    email: z.string().email("請輸入有效的 Email"),
    password: z.string().min(6, "密碼至少 6 位數"),
  })
  .passthrough();

export const RegisterForm = ({ onSubmit }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto"
      >
        <FormInput
          label="Username"
          name="username"
          error={errors["username"]?.message}
          register={register}
          tip="至少 3 個字"
        />

        <FormInput
          label="Email"
          name="email"
          error={errors["email"]?.message}
          register={register}
          tip="請輸入有效的信箱"
        />

        <PasswordInput
          label="Password"
          name="password"
          error={errors["password"]?.message}
          register={register}
          tip="密碼區分大小寫，至少 6 位"
          type="password"
        />

        <OtpField register={register} watchField="email" />

        <button
          type="submit"
          className="w-full btn-secondary mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "註冊中..." : "註冊"}
        </button>
      </form>
    </FormProvider>
  );
};
