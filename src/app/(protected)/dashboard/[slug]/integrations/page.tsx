import IntegrationCard from "@/app/(protected)/dashboard/[slug]/integrations/_component/IntegrationCard";
import { INTEGRATION_CARDS } from "@/constants/integrations";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col w-full lg:w-8/12 gap-y-5">
        {INTEGRATION_CARDS.map((card) => (
          <IntegrationCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Page;
