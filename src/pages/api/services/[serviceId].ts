// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Service } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | null>
) {
  const { serviceId } = req.query;

  if (!Array.isArray(serviceId)) return;

  const id = parseInt(`${serviceId}`);
  if (isNaN(id)) return;

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      provider: true,
      serviceType: true,
    },
  });

  if (!service) return res.status(404);

  res.status(200).json(service);
}

//NEXT: FIX cache
