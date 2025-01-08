"use client";

import PaymentCard from "@/components/global/billing/PaymentCard";
import { useQueryUser } from "@/hooks/use-queries";
import React from "react";

const Billing = () => {
  const { data } = useQueryUser();

  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard
        current={data?.data?.subscription?.plan || "PRO"}
        label="PRO"
      />
      <PaymentCard
        current={data?.data?.subscription?.plan || "FREE"}
        label="FREE"
      />
    </div>
  );
};

export default Billing;
