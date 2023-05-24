import Logo from "@/components/Logo";
import { api } from "@/services/api";
import { Service, ServiceType, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const { searchText } = router.query;

  const [servicesList, setServicesList] = useState<
    (Service & {
      provider: User;
      serviceType: ServiceType;
    })[]
  >();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServicesList() {
      const response = await api.get(`services/search/${searchText}`);

      if (response) setServicesList(response.data);
      setIsLoading(false);
    }
    loadServicesList();
  }, [searchText]);

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col min-h-screen w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the search page with the searched text: {searchText}</h1>
        {isLoading && <h2>Loading...</h2>}
        {servicesList && (
          <ul>
            {servicesList.map((s) => (
              <li key={s.id}>
                {s.title} - {s.provider.name}
                <Link href={`/services/${s.id}`}>
                  <p className="text-xs"> service id: {s.id}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
