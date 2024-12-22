import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  type: "BUTTON" | "LINK";
  href?: string;
  className?: string;
};

const GradientButton = ({ children, type, className, href }: Props) => {
  const gradients =
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]";

  if (type === "BUTTON") {
    return (
      <div className={gradients}>
        <Button className={cn(className, "rounded-xl")}>{children}</Button>
      </div>
    );
  }

  if (type === "LINK" && href) {
    return (
      <div className={gradients}>
        <Link href={href} className={cn(className, "rounded-xl")}>
          {children}
        </Link>
      </div>
    );
  }

  return null;
};

export default GradientButton;
