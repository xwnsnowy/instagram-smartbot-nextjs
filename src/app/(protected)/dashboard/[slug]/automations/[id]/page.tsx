import Trigger from "@/components/global/automations/trigger";
import AutomationsBreadCrumb from "@/components/global/bread-crumbs/automations";
import { Warning } from "@/icons";
import { prefetchUserAutomation } from "@/react-query/prefetch";
import { getAutomationInfo } from "@/services/automationService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const info = await getAutomationInfo(id);
  return {
    title: info.data?.name,
  };
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient();
  const id = (await params).id;
  await prefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationsBreadCrumb id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2 items-center py-2 pl-2">
            <Warning />
            <span>When...</span>
          </div>
          <Trigger id={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
