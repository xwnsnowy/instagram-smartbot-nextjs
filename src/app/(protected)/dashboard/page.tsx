import { redirect } from "next/navigation";
import { onBoardUser } from "@/services/userService";
import { removeAccents } from "@/lib/utils";

const Page = async () => {
  const user = await onBoardUser();

  if (user.status === 200 || user.status === 201) {
    const { firstname, lastname } = user.data as {
      firstname: string;
      lastname: string;
    };

    const encodedFirstName = removeAccents(firstname);
    const encodedLastName = removeAccents(lastname);
    return redirect(`/dashboard/${encodedFirstName}${encodedLastName}`);
  }

  return redirect("/sign-in");
};

export default Page;
