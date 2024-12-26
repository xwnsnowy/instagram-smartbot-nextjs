"use server";

import { prisma } from "@/lib/prisma";
import { CreateUserParams, UpdateUserParams } from "@/types/user";

export const createUser = async ({
  clerkId,
  firstname,
  lastname,
  email
}: CreateUserParams) => {
  const newUser = await prisma.user.create({
    data: {
      clerkId,
      firstname,
      lastname,
      email,
      subscription: {
        create: {}
      },
    },
    select: {
      firstname: true,
      lastname: true,
    }
  });

  return newUser;
}

export const updateUser = async ({
  userId,
  data
}: UpdateUserParams) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}