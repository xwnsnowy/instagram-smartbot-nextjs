import ClerkAuthState from "@/components/global/clerk-auth-state";
import Items from "@/components/global/sidebar/Items";
import UpgradeCard from "@/components/global/sidebar/Upgrade";
import { SubscriptionPlan } from "@/components/global/subscription-plan";
import { Separator } from "@/components/ui/separator";
import { HelpDuoToneWhite } from "@/icons";
import { LogoSidebar } from "@/svgs/logo-sidebar";
import React from "react";

type Props = {
  currentPage: string;
  slug: string;
};

const SidebarContent = ({ currentPage, slug }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
        <div className="flex gap-x-2 items-center p-5 justify-center">
          <LogoSidebar />
        </div>
        <div className="flex flex-col py-3">
          <Items currentPage={currentPage} slug={slug} />
        </div>
        <div className="px-12">
          <Separator orientation="horizontal" className="bg-[#333336]" />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </>
  );
};

export default SidebarContent;
