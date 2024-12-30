import React from "react";
import { BlueAddIcon } from "@/icons";
import PopoverCustom from "@/components/global/popover-custom";

type Props = {
  children: React.ReactNode;
  label: string;
};

const TriggerButton = ({ children, label }: Props) => {
  return (
    <PopoverCustom
      className="w-[400px]"
      trigger={
        <div className="border-2 border-dashed w-full border-[#3352cc] hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5 mt-4">
          <BlueAddIcon />
          <p className="text-[#768BDD] font-bold">{label}</p>
        </div>
      }
    >
      {children}
    </PopoverCustom>
  );
};

export default TriggerButton;
