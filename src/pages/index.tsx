import { signIn, signOut, useSession } from "next-auth/react";
import { Suwannaphum } from "next/font/google";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Logo from "../components/Logo";

const textFont = Suwannaphum({ subsets: ["latin"], weight: "400" });
const buttonFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (searchText.length === 0) return;

    console.log("novo click -> ", searchText);
    router.push(`/search/${searchText}`);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      await signIn();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <main className="flex flex-col items-center justify-center bg-blue-300">
      <Logo />
      <form
        className="flex flex-row mt-6 w-4/5 bg-red-300"
        onSubmit={handleSearch}
      >
        <div className="flex flex-1 px-4 py-4">
          <input
            className={`form-input bg-white ${textFont.className} w-full`}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Qual serviço está procurando?"
          />
        </div>
        <div className="flex items-center px-4">
          <button
            type="submit"
            className={`bg-orange-400 w-40 h-10 text-white ${buttonFont.className}`}
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </form>
      {status === "authenticated" ? (
        <div className="flex">
          <h1>Logado!!</h1>
          <h1>{JSON.stringify(session)}</h1>
          <h1>{status}</h1>
          <button
            className={`${buttonFont.className}  bg-slate-600 w-20 h-10 rounded-md`}
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-red-300">
          <h1>Não logado</h1>
          <button
            className={`${buttonFont.className}  bg-slate-600 w-20 h-10 rounded-md`}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </main>
  );
}
