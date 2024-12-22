"use client";

import MainBreadCrumb from "@/components/global/bread-crumbs/main-bread-crumb";
import CreateAutomation from "@/components/global/create-automation";
import { Notifications } from "@/components/global/infobar/notification";
import Search from "@/components/global/infobar/search";
import SheetCustom from "@/components/global/sheet-custom";
import SidebarContent from "@/components/global/sidebar/SidebarContent";
import { PAGE_BREAD_CRUMBS } from "@/constants/pages";
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
          <div className="lg:hidden flex items-center flex-1 gap-x-2">
            <SheetCustom trigger={<Menu />} className="lg:hidden" side="left">
              <SidebarContent currentPage={page} slug={slug} />
            </SheetCustom>
          </div>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb
          currentPage={page === slug ? "Home" : page}
          slug={slug}
        />
      </div>
    )
  );
};

export default InfoBar;
