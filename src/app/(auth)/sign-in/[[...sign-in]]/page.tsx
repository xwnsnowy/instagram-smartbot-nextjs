"use client";

import React from "react";
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect the user if they're already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); // Replace "/dashboard" with your desired URL
    }
  }, [isSignedIn, router]);

  // Render the SignIn component if the user is not signed in
  return !isSignedIn ? <SignIn /> : null;
};

export default Page;
