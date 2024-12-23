import { redirect } from "next/navigation";
import { onBoardUser } from "@/services/userService";

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

function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export default Page;
