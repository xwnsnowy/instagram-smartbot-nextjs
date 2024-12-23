"use server";

import { createAutomation } from "@/actions/automations";
import { onCurrentUser } from "@/services/userService";

export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation({ clerkId: user.id });
    if (create) return { status: 200, data: "Automation created" };

    return { status: 404, data: "Automation not found" };
  } catch (error) {
    console.error("getAllAutomations error:",
      error,
      user,
    );
    return { status: 500, message: "Internal Server Error" };
  }
};