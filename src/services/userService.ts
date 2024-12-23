import { updateIntegration } from "@/actions/integrations"
import { createUser, findUser } from "@/actions/users"
import { refreshToken } from "@/lib/fetch"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect('/sign-in');

  return user
}

export const onBoardUser = async () => {
  const user = await onCurrentUser();

  try {
    const foundUser = await findUser(user.id);

    if (foundUser) {
      if (foundUser.integrations.length > 0) {
        const integration = foundUser.integrations[0];

        if (integration.expiresAt) {
          const today = new Date();
          const timeLeft = integration.expiresAt.getTime() - today.getTime();
          const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

          if (daysLeft < 5) {
            console.log("Refreshing token...");

            const refresh = await refreshToken(integration.token);
            const expireDate = new Date(today.setDate(today.getDate() + 60));

            const updateToken = await updateIntegration({
              token: refresh.access_token,
              expire: expireDate,
              id: integration.id,
            });

            if (!updateToken) {
              console.log("Update token failed");
            }
          }
        }
      }
      return {
        status: 200,
        data: {
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
        },
      };
    }

    const newUser = await createUser({
      clerkId: user.id,
      firstname: user.firstName!,
      lastname: user.lastName!,
      email: user.emailAddresses[0].emailAddress,
    });

    return {
      status: 201,
      data: newUser,
    };
  } catch (error) {
    console.error("Lỗi trong quá trình onboarding:", error, {
      user,
    });
    return { status: 500, message: "Internal Server Error" };
  }
};
