import axios from "axios";

const twilioRest = axios.create({
  baseURL: `https://verify.twilio.com/v2/Services/${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID}/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export { twilioRest };
