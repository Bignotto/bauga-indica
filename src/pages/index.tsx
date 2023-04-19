import { Suwannaphum } from "next/font/google";
import { FormEvent, useState } from "react";
import Logo from "../components/Logo";

const customFont = Suwannaphum({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const [searchText, setSearchText] = useState("");

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    console.log("novo click -> ", searchText);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Logo />
      <form className="flex flex-row mt-6 bg-red-400 gap-3 w-3/4 px-4">
        <div className="flex flex-1">
          <input
            className={`bg-white ${customFont.className} form-input px-4 py-4 w-full`}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="flex items-center">
          <button
            className=" bg-blue-400 si"
            type="button"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </form>
    </main>
  );
}
