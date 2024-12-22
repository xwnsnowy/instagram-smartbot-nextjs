import { PAGE_ICON } from "@/constants/pages";
import React from "react";

type Props = {
  currentPage: string;
  slug?: string;
};

const MainBreadcrumb = ({ currentPage, slug }: Props) => {
  return (
    <div className="flex flex-col items-start">
      {currentPage === "Home" && (
        <div className="flex justify-center w-full">
          <div className="radial--gradient w-4/12 py-5 lg:py-10 flex flex-col items-center">
            <p className="text-text-secondary text-lg">Welcome back</p>
            <h2 className="capitalize text-4xl font-medium">{slug}!</h2>
          </div>
        </div>
      )}
      <span className="radial--gradient inline-flex py-5 lg:py-10 pr-12 gap-x-2 items-center">
        {PAGE_ICON[currentPage.toUpperCase()]}
        <h2 className="font-semibold text-3xl capitalize">{currentPage}</h2>
      </span>
    </div>
  );
};

export default MainBreadcrumb;
