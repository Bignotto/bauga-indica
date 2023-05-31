import Logo from "@/components/Logo";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ValidateNewUserPhone() {
  const router = useRouter();
  const { phoneNumber } = router.query;

  const [otp, setOtp] = useState("");

  async function handleVerifyOtp() {
    if (!otp) return;

    const response = await api.post("verify-code", {
      phone: `+55${phoneNumber}`,
      code: otp,
    });

    console.log(response.data);
  }

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
        <h1>This is the OTP validation page for: {phoneNumber}</h1>
      </div>
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
    </main>
  );
}
