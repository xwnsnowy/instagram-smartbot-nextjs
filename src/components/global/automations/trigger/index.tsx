"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useQueryAutomationById } from "@/hooks/use-queries";
import ActiveTrigger from "@/components/global/automations/trigger/active";
import ThenAction from "@/components/global/automations/then/then-action";
import TriggerButton from "@/components/global/automations/trigger-button";
import { AUTOMATION_TRIGGERS } from "@/constants/automation";
import { cn } from "@/lib/utils";
import { useTriggers } from "@/hooks/use-automations";

type Props = {
  id: string;
};
const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger } = useTriggers(id);
  const { data } = useQueryAutomationById(id);

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col ga-y-6 items-center">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-6/12 my-4">
              <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                or
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[1].type}
              keywords={data.data.keywords}
            />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    );
  }
  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2",
              !types?.find((t) => t === trigger.type)
                ? "bg-background-80"
                : "bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
      </div>
    </TriggerButton>
  );
};

export default Trigger;
