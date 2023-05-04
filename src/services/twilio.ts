import axios from "axios";

const twilioRest = axios.create({
  baseURL:
    "https://verify.twilio.com/v2/Services/VA3461386f68743672844ff4a887a57f42/",
});

export { twilioRest };

/*

curl -X POST "https://verify.twilio.com/v2/Services/VA3461386f68743672844ff4a887a57f42/Verifications" \
  --data-urlencode "To=+5519982287773" \
  --data-urlencode "Channel=sms" \
  -u "AC323036e5866793af1f500f4f6b3c88ac:56c3b13ce915376646fc53cff586160b"

echo
echo -n "Please enter the OTP:"
read OTP_CODE

curl -X POST "https://verify.twilio.com/v2/Services/VA3461386f68743672844ff4a887a57f42/VerificationCheck" \
  --data-urlencode "To=+5519982287773" \
  --data-urlencode "Code=$OTP_CODE" \
  -u "AC323036e5866793af1f500f4f6b3c88ac:56c3b13ce915376646fc53cff586160b"

*/
