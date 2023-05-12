import Logo from "@/components/Logo";
import { currency } from "@/helpers/currency";
import { api } from "@/services/api";
import { Service } from "@prisma/client";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function Service() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [service, setService] = useState<Service>();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  async function loadServiceData() {
    if (!serviceId) return;

    const response = await api.get(`services/${serviceId}`);

    if (response) setService(response.data);
  }

  useEffect(() => {
    loadServiceData();
  }, []);

  async function handleVerifyContact(event: FormEvent) {
    event.preventDefault();
    if (!phone) return;

    const response = await api.post("send-verification-code", { phone });

    if (response.data.success) setOtpSent(true);
  }

  async function handleVerifyOtp(event: FormEvent) {
    event.preventDefault();

    if (!otp) return;

    const response = await api.post("verify-code", { phone, code: otp });

    console.log(response.data);
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col min-h-screen w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the page of the service:</h1>
        {service && (
          <div>
            <h2>{service.title}</h2>
            <p className="text-sm">{service.description}</p>
            <p className="text-lg">{currency.format(service.value)}</p>
            <p className="text-xs"> service id: {service.id}</p>
          </div>
        )}
        {!otpSent ? (
          <form
            className="flex flex-row mt-6 w-4/5"
            onSubmit={handleVerifyContact}
          >
            <div className="flex flex-1 px-4 py-4 bg-blue-200">
              <label htmlFor="telefone">
                Verifique seu telefone para entrar em contato
              </label>
              <input
                className={`form-input bg-white w-full rounded-md`}
                type="text"
                placeholder="seu telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex items-center  px-4">
              <button
                type="submit"
                className={` bg-slate-600 text-white w-20 h-10`}
                onClick={handleVerifyContact}
              >
                Verificar
              </button>
            </div>
          </form>
        ) : (
          <form className="flex flex-row mt-6 w-4/5" onSubmit={handleVerifyOtp}>
            <div className="flex flex-1 px-4 py-4 bg-blue-200">
              <label htmlFor="otp">
                Digite o código enviado para o seu telefone
              </label>
              <input
                className={`form-input bg-white w-full rounded-md`}
                type="text"
                placeholder="código"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="flex items-center  px-4">
              <button
                type="submit"
                className={` bg-slate-600 text-white w-20 h-10`}
              >
                Verificar
              </button>
            </div>
          </form>
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
