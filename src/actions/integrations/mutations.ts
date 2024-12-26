"use server";

import { prisma } from "@/lib/prisma";
import { UpdateIntegrationParams } from "@/types/integration";

export const updateIntegration = async (
  {
    token,
    expire,
    id,
  }: UpdateIntegrationParams
) => {
  return await prisma.integrations.updateMany({
    where: { id },
    data: {
      token,
      expiresAt: expire,
    }
  });
};