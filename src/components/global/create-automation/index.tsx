"use client";

import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateAutomation } from "@/hooks/use-automations";
import { AutomationDuoToneWhite } from "@/icons";
import { useMemo } from "react";
import { v4 } from "uuid";

const CreateAutomation = () => {
  const mutationId = useMemo(() => v4(), []);

  const { mutate, isPending } = useCreateAutomation(mutationId);

  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] via-[#CC3BD4] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium"
      onClick={() =>
        mutate({
          name: "Untitlled",
          id: mutationId,
          createdAt: new Date(),
          keywords: [],
        })
      }
    >
      <Loader state={isPending}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create an Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
