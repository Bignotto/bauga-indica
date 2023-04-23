import Logo from "@/components/Logo";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const { searchText } = router.query;
  console.log({ searchText });
  return (
    <main className="flex flex-col min-h-screen bg-red-400 max-w-5xl px-6 py-6">
      <div className="flex">
        <Logo />
      </div>
      <h1>This is the search page with the searched text: {searchText}</h1>
    </main>
  );
}
