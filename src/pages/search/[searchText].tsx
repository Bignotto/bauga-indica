import Logo from "@/components/Logo";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const { searchText } = router.query;
  console.log({ searchText });
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Logo />
      <h1>This is the search page</h1>
    </main>
  );
}
