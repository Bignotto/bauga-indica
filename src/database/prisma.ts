import { PrismaClient } from "@prisma/client";

//TODO: fix prisma client more than 10 instances
export const prisma = new PrismaClient();
