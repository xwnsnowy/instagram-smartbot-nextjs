"use server";

import { CreateAutomationParams } from "@/actions/automations";
import { prisma } from "@/lib/prisma";

export const createAutomation = async ({ clerkId, id }: CreateAutomationParams) => {
  return await prisma.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {
          ...(id && { id })
        }
      }
    }
  })
};