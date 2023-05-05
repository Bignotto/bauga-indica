import axios from "axios";

const twilioRest = axios.create({
  baseURL: `https://verify.twilio.com/v2/Services/${process.env.TWILIO_ACCOUNT_SID}/`,
});

export { twilioRest };
