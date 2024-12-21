import React from "react";
import { SignOutButton } from "@clerk/nextjs";

const Page = async () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton />
    </div>
  );
};

export default Page;
