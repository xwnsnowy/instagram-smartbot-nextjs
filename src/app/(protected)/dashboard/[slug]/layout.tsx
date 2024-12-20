import React from "react";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const layout = ({ children, params }: Props) => {

  //Query
  return <div>layout</div>;
};

export default layout;
