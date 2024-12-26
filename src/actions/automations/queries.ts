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

export const findAutomation = async (id: string) => {
  return await prisma.automation.findUnique({
    where: {
      id
    },
    include: {
      keywords: true,
      listener: true,
      posts: true,
      trigger: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        }
      }
    }
  },
  );
};