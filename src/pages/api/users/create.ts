import { prisma } from "@/database/prisma";
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
    try {
      const newUser = await prisma.user.create({
        data: { name, email, phone, userType: "user", password: hashPassword },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: "Something wrong with database" });
    }
  }
  res.status(400).json({ message: `method ${method} correct!` });
}
