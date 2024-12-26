"use server";

import { CreateAutomationParams } from "@/actions/automations";
import { prisma } from "@/lib/prisma";
import { UpdateAutomationParams } from "@/types/automation";

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

export const updateAutomation = async (
  id: string,
  data: UpdateAutomationParams
) => {
  return await prisma.automation.update({
    where: { id },
    data: {
      name: data.name,
      active: data.active,
    },
  })
}
