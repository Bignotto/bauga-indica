import { Suwannaphum } from "next/font/google";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Logo from "../components/Logo";

const textFont = Suwannaphum({ subsets: ["latin"], weight: "400" });
const buttonFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (searchText.length === 0) return;

    console.log("novo click -> ", searchText);
    router.push(`/search/${searchText}`);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Logo />
      <form className="flex flex-row mt-6 w-4/5" onSubmit={handleSearch}>
        <div className="flex flex-1 px-4 py-4">
          <input
            className={`form-input bg-white ${textFont.className} w-full rounded-md`}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Qual serviço está procurando?"
          />
        </div>
        <div className="flex items-center  px-4">
          <button
            type="submit"
            className={`${textFont.className}  bg-slate-600 w-20 h-10 rounded-md`}
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </form>
    </main>
  );
}
