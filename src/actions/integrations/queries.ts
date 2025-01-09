"use server";

import { prisma } from "@/lib/prisma";

export const getIntegration = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: 'INSTAGRAM',
        },
      },
    },
  })
}

