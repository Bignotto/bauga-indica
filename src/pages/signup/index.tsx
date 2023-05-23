import Logo from "@/components/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

//NEXT: implement registration flow

//TODO: fix confirmation password

//TODO: fix warning
// https://stackoverflow.com/questions/71835144/react-warning-a-component-is-changing-an-uncontrolled-input-to-be-controlled

type FormDataProps = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmation: string;
};

const signUpSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSignUp({
    username,
    email,
    phone,
    password,
  }: FormDataProps) {
    console.log({ username, email, phone, password });
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
          </div>
          <Controller
            control={control}
            name="email"
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
              </div>
            )}
          />
          <Controller
            control={control}
            name="phone"
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
              </div>
            )}
          />
          <div className="flex flex-row justify-between mt-6">
            <Controller
              control={control}
              name="password"
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
                </div>
              )}
            />
            <Controller
              control={control}
              name="confirmation"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col w-1/3">
                  <label htmlFor="confirmation">Confirmação de senha:</label>
                  <input type="text" name="confirmation" id="confirmation" />
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
