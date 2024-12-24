"use server";

import { prisma } from "@/lib/prisma";

export const getQueries = async () => {
  return null;
};

export const getAutomations = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: { clerkId },
    select: {
      automations: {
        orderBy: {
          createdAt: "asc"
        },
        include: {
          keywords: true,
          listener: true,
        }
      }
    }
  });
};