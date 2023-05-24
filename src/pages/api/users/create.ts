import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

//NEXT: save user to database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {}
