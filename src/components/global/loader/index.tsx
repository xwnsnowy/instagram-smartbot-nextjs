import { Spinner } from "@/components/global/loader/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  state: boolean;
  classname?: string;
  children?: React.ReactNode;
  color?: string;
};

const Loader = ({ state, classname, children, color }: Props) => {
  return state ? (
    <div className={cn(classname)}>
      <Spinner color={color} />
    </div>
  ) : (
    ""
  );
};

export default Loader;
