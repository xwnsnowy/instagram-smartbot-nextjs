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

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  return await prisma.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          token,
          expiresAt: expire,
          instagramId: igId,
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  })
}