import AutomationsBreadCrumb from "@/components/global/bread-crumbs/automations";
import Trigger from "@/components/global/bread-crumbs/automations/trigger";
import { Warning } from "@/icons";
import { prefetchUserAutomation } from "@/react-query/prefetch";
import { getAutomationInfo } from "@/services/automationService";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const info = await getAutomationInfo(params.id);
  return {
    title: info.data?.name,
  };
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient();
  await prefetchUserAutomation(query, params.id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationsBreadCrumb id={params.id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <Trigger id={params.id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
