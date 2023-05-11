import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default async function sendVerificationCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone } = req.body;

  console.log(process.env.TWILIO_ACCOUNT_SID);
  console.log(process.env.TWILIO_AUTH_TOKEN);
  console.log(process.env.TWILIO_SERVICE);

  try {
    // Create a Twilio client instance
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Use the Twilio Verify API to send a verification code
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE!)
      .verifications.create({ to: phone, channel: "sms" });

    // Return a success response
    res.status(200).json({ success: true, message: "Verification code sent" });
  } catch (error) {
    console.error(error);
    // Return an error response
    res
      .status(500)
      .json({ success: false, message: "Failed to send verification code" });
  }
}
