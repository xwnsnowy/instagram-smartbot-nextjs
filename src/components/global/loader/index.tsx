import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "./spinner";

type LoaderProps = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const Loader = ({ children, state, className, color }: LoaderProps) => {
  return state ? (
    <div className={cn(className)} role="alert" aria-busy="true">
      <Spinner color={color} />
    </div>
  ) : (
    <div role="alert" aria-busy="false" className="flex gap-2 items-center">
      {children}
    </div>
  );
};

export default Loader;
