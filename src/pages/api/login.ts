import { prisma } from "@/database/prisma";
import * as encrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res
      .status(400)
      .json({ message: `method ${req.method} not allowed!` });

  const { email, password } = req.body;

  console.log({ email, password });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(404).json({ message: "no user found" });

  const passwordCorrect = encrypt.compare(user?.password, password);

  console.log({ passwordCorrect });
}
