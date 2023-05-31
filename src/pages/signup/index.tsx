import Logo from "@/components/Logo";
import { api } from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormDataProps = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmation: string;
};

const signUpSchema = yup.object({
  username: yup.string().required("Seu nome é obrigatório."),
  email: yup
    .string()
    .email("Não parece ser um endereço de e-mail válido.")
    .required("Um endereço de e-mail é obrigatório."),
  phone: yup
    .string()
    .required()
    .test(
      "len",
      "Não parece ser um número de telefone válido.",
      (val) => val.length === 11
    ),
  password: yup
    .string()
    .required()
    .test(
      "len",
      "Precisa ter mais que 5 caracteres.",
      (val) => val.length >= 6
    ),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não são iguais."),
});

export default function SignUp() {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSignUp({
    username,
    email,
    phone,
    password,
  }: FormDataProps) {
    try {
      const response = await api.post("users/create", {
        name: username,
        email,
        phone,
        password,
      });

      console.log({ response });

      //TODO: implement phone number formatter helper
      const otpRespnse = await api.post("send-verification-code", {
        phone: `+55${phone}`,
      });

      if (otpRespnse.data.success) router.push(`/signup/validate/${phone}`);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col min-h-screen w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1 className="mt-8">
          Preencha os campos abaixo para criar sua conta.
        </h1>

        <form className="w-4/5 mt-8" onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col mt-6">
            <label htmlFor="username">Seu nome completo:</label>
            <Controller
              control={control}
              name="username"
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {formState.errors.username && (
              <p>{formState.errors.username.message}</p>
            )}
          </div>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col mt-6">
                <label htmlFor="email">Seu endereço de e-mail:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={value}
                  onChange={onChange}
                />
                {formState.errors.email && (
                  <p>{formState.errors.email.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col mt-6">
                <label htmlFor="phone">Seu número de telefone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={onChange}
                  value={value}
                />
                {formState.errors.phone && (
                  <p>{formState.errors.phone.message}</p>
                )}
              </div>
            )}
          />
          <div className="flex flex-row justify-between mt-6">
            <Controller
              control={control}
              name="password"
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col w-1/3">
                  <label htmlFor="password">Senha segura:</label>
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
            <Controller
              control={control}
              name="confirmation"
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col w-1/3">
                  <label htmlFor="confirmation">Confirmação de senha:</label>
                  <input
                    type="text"
                    name="confirmation"
                    id="confirmation"
                    onChange={onChange}
                    value={value}
                  />
                  {formState.errors.confirmation && (
                    <p>{formState.errors.confirmation.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-400 mt-6 w-40 h-10 text-white"
          >
            Criar sua conta
          </button>
        </form>
      </div>
    </main>
  );
}
