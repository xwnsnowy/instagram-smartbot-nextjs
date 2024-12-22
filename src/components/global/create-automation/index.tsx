"use client";

import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { AutomationDuoToneWhite } from "@/icons";

const CreateAutomation = () => {
  return (
    <Button className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] via-[#CC3BD4] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium">
      <Loader state={false}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create an Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
