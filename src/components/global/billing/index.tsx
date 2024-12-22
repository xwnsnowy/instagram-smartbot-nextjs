"use client";
import PaymentCard from "@/components/global/billing/PaymentCard";
import React from "react";

const Billing = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard current="PRO" label="PRO" />
      <PaymentCard current="FREE" label="FREE" />
    </div>
  );
};

export default Billing;
