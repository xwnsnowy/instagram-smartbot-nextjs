"use client";

import Sheet from "@/components/global/sheet-custom";
import SidebarContent from "@/components/global/sidebar/SidebarContent";
import { PAGE_BREAD_CRUMBS } from "@/constants/page";
import { usePaths } from "@/hooks/use-paths";
import { Menu } from "lucide-react";
import React from "react";

type Props = {
  slug: string;
};

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths();

  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;

  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet trigger={<Menu />} className="lg:hidden" side="left">
              <SidebarContent currentPage={page} slug={slug} />
            </Sheet>
          </span>
        </div>
      </div>
    )
  );
};

export default InfoBar;
