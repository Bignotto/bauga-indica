import Logo from "@/components/Logo";

//NEXT: implement registration flow

export default function SignUp() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col min-h-screen w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1 className="mt-8">
          Preencha os campos abaixo para criar sua conta.
        </h1>

        <form className="w-4/5 mt-8">
          <div className="flex flex-col mt-6">
            <label htmlFor="username">Seu nome completo:</label>
            <input type="text" name="fullname" id="fullname" />
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="email">Seu endereço de e-mail:</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="phone">Seu número de telefone:</label>
            <input type="text" name="phone" id="phone" />
          </div>
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col w-1/3">
              <label htmlFor="password">Senha segura:</label>
              <input type="text" name="password" id="password" />
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="confirmation">Confirmação de senha:</label>
              <input type="text" name="confirmation" id="confirmation" />
            </div>
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
