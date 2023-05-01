import { Service } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | null>
) {
  const { serviceId } = req.query;

  const service = await prisma.service.findUnique({
    where: { id: Array.isArray(serviceId) ? serviceId[0] : `${serviceId}` },
    include: {
      provider: true,
      serviceType: true,
    },
  });

  if (!service) return res.status(404).send(null);

  return res.status(200).send(service);
}
