import Logo from "@/components/Logo";
import { Service } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

// type ServicePageProps = {
//   // service: {
//   id: string;
//   title: string;
//   description: string;
//   value: number;
//   // };
// };

export default function Service() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [service, setService] = useState<Service>();

  async function loadServiceData() {
    if (!serviceId) return;

    const response = await api.get(`services/${serviceId}`);

    if (response) setService(response.data);
  }

  useEffect(() => {
    loadServiceData();
  });

  return (
    <main className="flex flex-col bg-red-300 min-h-screen ">
      <div className="flex min-h-screen max-w-3xl flex-col bg-blue-200 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the page of the service:</h1>
        {service && (
          <div>
            <h2>{service.title}</h2>
            <p className="text-sm">{service.description}</p>
            <p className="text-lg">{service.value}</p>
            <p className="text-xs"> service id: {service.id}</p>
          </div>
        )}
      </div>
    </main>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const serviceId = query.serviceId;

//   if (Array.isArray(serviceId)) return {
//     props: {}
//   };
//   const id = parseInt(`${serviceId}`);

//   const service = await prisma.service.findUnique({
//     where: { id },
//   });

//   // if(!service) return {}

//   return {
//     props: {
//       service: {
//         id: service.id,
//         title: service?.title,
//         description: service?.description,
//         value: service?.value,
//       },
//     },
//   };
// };
