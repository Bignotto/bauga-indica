import Logo from "@/components/Logo";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { prisma } from "../../database/prisma";

type SearchPageProps = {
  services: {
    id: number;
    title: String;
    description: String;
    value: number;
    provider: {
      name: String;
    };
    type: string;
  }[];
};

export default function Search({ services }: SearchPageProps) {
  const router = useRouter();

  const { searchText } = router.query;
  return (
    <main className="flex flex-col bg-red-300 min-h-screen ">
      <div className="flex flex-1 max-w-3xl min-w-max flex-col bg-blue-200 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the search page with the searched text: {searchText}</h1>
        <ul>
          {services.map((s) => (
            <li key={s.id}>
              {s.title} - {s.provider.name},{" "}
              <Link href={`/services/${s.id}`}>
                <p className="text-xs"> service id: {s.id}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchText = query.searchText;

  const dbServices = await prisma.service.findMany({
    where: {
      OR: [
        {
          title: {
            contains: `${searchText}`,
          },
        },
        {
          description: { contains: `${searchText}` },
        },
      ],
    },
    include: {
      provider: true,
      serviceType: true,
    },
  });

  const services = dbServices.map((s) => {
    return {
      id: s.id,
      title: s.title,
      description: s.description,
      value: s.value,
      provider: {
        name: s.provider.name,
      },
      type: s.serviceType.name,
    };
  });

  return {
    props: {
      services,
    },
  };
};
