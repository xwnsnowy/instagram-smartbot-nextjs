import { SIDEBAR_MENU } from "@/constants/sidebarMenu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage: string;
  slug: string;
};

const Items = ({ currentPage, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${item.label === "home" ? "/" : item.label}`}
      className={cn(
        "capitalize flex gap-x-2 rounded-full p-3",
        currentPage === item.label && "bg-[#0f0f0f]",
        currentPage === slug && item.label === "home"
          ? "bg-[#0f0f0f]"
          : "text-[#9B9CA0]"
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  ));
};

export default Items;
