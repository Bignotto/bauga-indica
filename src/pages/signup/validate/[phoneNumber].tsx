import Logo from "@/components/Logo";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function ValidateNewUserPhone() {
  const router = useRouter();
  const { phoneNumber } = router.query;

  const [otp, setOtp] = useState("");
  const [errorStatus, setErrorStatus] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();

    if (!otp) return;

    try {
      const response = await api.post("verify-code", {
        phone: `+55${phoneNumber}`,
        code: otp,
      });

      const updateResponse = await api.patch("users/phoneValidated", {
        phoneNumber,
      });

      router.push("/");
      //TODO: to decide -> redirect to home? logged dashboard? login page?
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
        setErrorStatus(error.status || error.response?.status || 0);
        return;
      }
      setErrorStatus(500);
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the OTP validation page for: {phoneNumber}</h1>
      </div>
      <form className="flex flex-row mt-6 w-4/5">
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
            onClick={handleVerifyOtp}
          >
            Verificar
          </button>
        </div>
      </form>
      {(errorStatus === 400 || errorStatus === 404) && (
        <div className="flex bg-red-300 w-4/5 mt-3 px-4 py-4 justify-center">
          {errorMessage ? (
            <h1>{errorMessage}</h1>
          ) : (
            <h1>Algo errado com a verificação do seu código.</h1>
          )}
        </div>
      )}
      {errorStatus === 500 && (
        <div className="flex bg-red-300 w-4/5 mt-3 px-4 py-4 justify-center">
          <h1>Algo errado com a verificação do seu código.</h1>
        </div>
      )}
    </main>
  );
}
