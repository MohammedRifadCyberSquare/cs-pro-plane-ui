"use client";

import React from "react";

interface ActiveMembersProps {
  title: string;
}

const ActiveMembers: React.FC<ActiveMembersProps> = ({ title }) => {
  return (
    <>
      <div className="bg-[#ffffff]  rounded-xl border-[0.5px] w-full hover:shadow duration-300">
        <div className="px-7 pt-6">
          <h4 className="text-lg font-semibold ">{title}</h4>
          <p className="mt-2 text-xs font-medium ">
          Top eight active members in your project by last activity.
          </p>
        </div>

        <div className="h-full grid place-items-center">
          <div className="mt-7 mb-16 px-36 flex flex-col lg:flex-row items-center justify-between gap-x-24 gap-y-16">
            <p className="text-sm font-thin lg:w-2/5 flex-shrink-0 text-center lg:text-left">
              Comapare your projects with the top            
              seven in your projects...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveMembers;
