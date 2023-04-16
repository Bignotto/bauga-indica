import { FormEvent } from "react";
import Logo from "../components/Logo";

export default function Home() {
  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    console.log("novo click");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Logo />
      <form className="flex flex-row mt-6 bg-red-400 gap-3">
        <div>
          <input />
        </div>
        <div>
          <button
            className="rounded-full bg-blue-400"
            type="button"
            onClick={handleSearch}
          >
            OK
          </button>
        </div>
      </form>
    </main>
  );
}
