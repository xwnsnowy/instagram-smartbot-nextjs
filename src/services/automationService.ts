"use server";

import { createAutomation, findAutomation, getAutomations, updateAutomation } from "@/actions/automations";
import { getCurrentUser } from "@/services/userService";
import { UpdateAutomationParams } from "@/types/automation";

export const createNewAutomation = async (id?: string) => {
  const user = await getCurrentUser();
  try {
    const create = await createAutomation({ clerkId: user.id, id });
    if (create) return { status: 200, data: "Automation created", res: create };

    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    console.error("createNewAutomation error:",
      error,
      user,
    );
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getAllAutomations = async () => {
  const user = await getCurrentUser();
  try {
    const automations = await getAutomations(user.id);
    if (automations)
      return {
        status: 200,
        data: automations.automations
      }
    return { status: 404, data: [] };
  } catch (error) {
    console.error("getAllAutomations error:",
      error,
      user,
    );
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await getCurrentUser();

  try {
    const automation = await findAutomation(id);
    if (automation) {
      return { status: 200, data: automation };
    }
    return { status: 404, message: "Automation not found" };
  } catch (error) {
    console.error("getAutomationInfo error:",
      error,
    );
  } return { status: 500, message: "Internal Server Error" }
};

export const updateAutomationName = async (
  automationId: string,
  data: UpdateAutomationParams
) => {
  await getCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if (update) {
      return { status: 200, data: 'Automation successfully updated' }
    }
    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    console.error("updateAutomationName error:",
      error,
    );
  } return { status: 500, message: "Internal Server Error" }
};