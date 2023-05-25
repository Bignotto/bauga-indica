import * as encrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<User | null>
) {
  const { name, email, phone, password } = req.body;
  const method = req.method;

  const hashPassword = await encrypt.hash(password, 8);

  if (method === "POST") {
    console.log({ message: "correct method" });
    console.log({ name, email, phone, hashPassword });
    //NEXT: save user to database
    return res.status(200).json({ message: "method POST correct!" });
  }
  res.status(400).json({ message: `method ${method} correct!` });
}
