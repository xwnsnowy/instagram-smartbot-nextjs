"use client";

import ActivateAutomationButton from "@/components/global/button-custom/ActiveAutomationButton";
import SheetCustom from "@/components/global/sheet-custom";
import SidebarContent from "@/components/global/sidebar/SidebarContent";
import { Input } from "@/components/ui/input";
import { useEditAutomation } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { usePaths } from "@/hooks/use-paths";
import { useQueryAutomationById } from "@/hooks/use-queries";
import { ChevronRight, Menu, PencilIcon } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const AutomationsBreadCrumb = ({ id }: Props) => {
  const { page } = usePaths();

  const { data } = useQueryAutomationById(id);

  const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id);

  const { latestVariable } = useMutationDataState(["update-automation"]);

  return (
    <div className="rounded-full w-full p-5 bg-[#29292c1a] flex items-center">
      <div className="flex items-center gap-x-3 min-w-0">
        <div className="lg:hidden flex items-center flex-1 gap-x-2">
          <SheetCustom trigger={<Menu />} className="lg:hidden" side="left">
            <SidebarContent currentPage={page} />
          </SheetCustom>
        </div>
        <p className="text-[#9B9CA0] truncate">Automations</p>
        <ChevronRight color="#9B9CA0" className="flex-shrink-0" />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              placeholder={
                isPending ? latestVariable.variables : "Add a new name"
              }
              className="bg-transparent h-auto outline-none text-base border-none p-0"
            />
          ) : (
            <p className="text-[#9B9CA0] truncate">
              {latestVariable?.variables
                ? latestVariable?.variables.name
                : data?.data?.name}
            </p>
          )}
          {edit ? (
            <></>
          ) : (
            <span
              className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4"
              onClick={enableEdit}
            >
              <PencilIcon size={14} />
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
          All states are automatically saved
        </p>
        <div className="flex gap-x-5 flex-shrink-0">
          <p className="text-text-secondary text-sm truncate min-w-0">
            Changes Saved
          </p>
        </div>
      </div>

      <ActivateAutomationButton id={id} />
    </div>
  );
};

export default AutomationsBreadCrumb;
