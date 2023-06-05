import Logo from "@/components/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import { Suwannaphum } from "next/font/google";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type LoginFormDataProps = {
  email: string;
  password: string;
};

const textFont = Suwannaphum({ subsets: ["latin"], weight: "400" });
const buttonFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Não parece ser um e-mail válido.")
    .required("Um endereço de e-mail é obrigatório."),
  password: yup.string().required("Uma senha é obrigatória."),
});

export default function Login() {
  const { control, handleSubmit, formState } = useForm<LoginFormDataProps>({
    resolver: yupResolver(loginSchema),
  });

  async function handleLogin() {}
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1 className="mt-8">
          Preencha os campos abaixo para entrar com sua conta.
        </h1>
      </div>

      <div className="flex flex-col w-4/5 px-6 py-6">
        <form className="w-4/5 mt-8" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-row justify-between mt-6">
            <Controller
              control={control}
              name="email"
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col w-1/3">
                  <label htmlFor="email">Seu e-mail:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={onChange}
                    value={value}
                  />
                  {formState.errors.email && (
                    <p>{formState.errors.email.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col w-1/3">
                  <label htmlFor="password">Sua senha:</label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    onChange={onChange}
                    value={value}
                  />
                  {formState.errors.password && (
                    <p>{formState.errors.password.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-400 mt-6 w-40 h-10 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
