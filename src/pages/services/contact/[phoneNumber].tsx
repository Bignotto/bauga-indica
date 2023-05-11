import Logo from "@/components/Logo";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter();
  const { phoneNumber } = router.query;

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col min-h-screen w-4/5 px-6 py-6">
        <div className="flex">
          <Logo />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(
    `https://verify.twilio.com/v2/Services/${process.env.TWILIO_ACCOUNT_SID}/Verifications`
  );

  const twilioResponse = await axios.post(
    `https://verify.twilio.com/v2/Services/${process.env.TWILIO_ACCOUNT_SID}/Verifications`,
    new URLSearchParams({
      To: "+5519982287773",
      Channel: "sms",
    }),
    {
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID!,
        password: process.env.TWILIO_AUTH_TOKEN!,
      },
    }
  );
  console.log({ twilioResponse });
  return { props: {} };
};
