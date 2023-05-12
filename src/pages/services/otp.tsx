import Logo from "@/components/Logo";
import { currency } from "@/helpers/currency";
import { api } from "@/services/api";
import { Service } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Otp() {
  const router = useRouter();

  const { phone, serviceId } = router.query;
  const [service, setService] = useState<Service>();
  const [sendingOtp, setSendingOtp] = useState(true);

  const [otp, setOtp] = useState("");

  async function loadServiceData() {
    if (!serviceId || !phone) return;

    const response = await api.get(`services/${serviceId}`);

    if (response) setService(response.data);

    const verifyResponse = await api.post("send-verification-code", { phone });

    setSendingOtp(false);
    console.log({ phone, service });
  }

  useEffect(() => {
    loadServiceData();
  }, []);

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
        {sendingOtp && (
          <form className="flex flex-row mt-6 w-4/5">
            <div className="flex flex-1 px-4 py-4 bg-blue-200">
              <label htmlFor="telefone">
                Digite o código enviado para o seu telefone
              </label>
              <input
                className={`form-input bg-white w-full rounded-md`}
                type="text"
                placeholder="seu telefone"
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
