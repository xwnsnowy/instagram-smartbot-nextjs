"use server";

import { UpdateIntegrationParams } from "@/actions/integrations/integrationTypes";
import { prisma } from "@/lib/prisma";

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