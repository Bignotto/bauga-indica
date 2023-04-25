import Logo from "@/components/Logo";
import { GetServerSideProps } from "next";
import { prisma } from "../../database/prisma";

type ServicePagerops = {
  service: {
    title: string,
    description: string;
    value: number
  };
};

export default function Service({ service }: ServicePagerops) {
  return (
    <main className="flex flex-col bg-red-300 min-h-screen ">
      <div className="flex flex-1 max-w-3xl min-w-max flex-col bg-blue-200 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the search page of the service:</h1>
        <pre>{JSON.stringify(service)}</pre>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const serviceId = query.serviceId;

  if (Array.isArray(serviceId)) return;
  const id = parseInt(`${serviceId}`);

  const service = await prisma.service.findUnique({
    where: { id },
  });


  return {
    props: {
      service {
        //NEXT: FIX THIS!
      }
    },
  };
};
