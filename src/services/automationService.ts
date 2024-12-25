"use server";

import { createAutomation, getAutomations } from "@/actions/automations";
import { getCurrentUser } from "@/services/userService";

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