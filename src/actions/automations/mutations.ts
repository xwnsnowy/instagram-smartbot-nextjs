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

export const addListener = async (
  automationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string
) => {
  return await prisma.automation.update({
    where: {
      id: automationId,
    },
    data: {
      listener: {
        create: {
          listener,
          prompt,
          commentReply: reply,
        },
      },
    },
  })
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await prisma.automation.update({
      where: { id: automationId },
      data: {
        trigger: {
          createMany: {
            data: [{ type: trigger[0] }, { type: trigger[1] }],
          },
        },
      },
    })
  }
  return await prisma.automation.update({
    where: {
      id: automationId,
    },
    data: {
      trigger: {
        create: {
          type: trigger[0],
        },
      },
    },
  })
}