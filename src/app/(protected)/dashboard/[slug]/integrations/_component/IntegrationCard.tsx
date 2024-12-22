"use client";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  return (
    <div className="border-2 border-[#3352CC] rounded-2xl gap-x-5 p-5 flex items-center justify-between">
      {icon}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl"> {title}</h3>
        <p className="text-[#9D9D9D] text-base ">{description}</p>
      </div>
      <Button className="bg-gradient-to-br text-white rounded-full text-base from-[#3352CC] to-[#1C2D70]  font-medium hover:opacity-70 transition duration-100">
        Connect
      </Button>
    </div>
  );
};

export default IntegrationCard;
