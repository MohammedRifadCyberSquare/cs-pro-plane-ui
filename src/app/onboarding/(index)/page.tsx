"use client"
import React from "react";
import { Input, } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import CustomDropdown from "../_components/custom-dropdown";


const OnBoardingIndex = () => {
  const dropDownItems:any = [
    "just myself",
    "1-20",
    "21-50",
    "51-200",
    "201-500",
    "500+"
  ]
  return (
    <div className="flex h-[70vh] mt-4 ml-20">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">
          What will your workspace be?
        </h1>
        <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          Name it.
        </p>

        <div className="mb-3">
          <Input
            type="text"
            placeholder="enter wokspace name..."
            className="px-4 text-gray-500 w-full"
            readOnly
          />
        </div>
        <span className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
        
          You can edit the slug.
        </span>
        <div className="mb-3">
          <Input
            type="text"
            value="plane.pro.cybersquare.org/"
            className="px-4 text-gray-500 w-full"
            readOnly
          />
        </div>
        
        
        
        <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          What size is your organisation?
        </p>
        <div className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
        <CustomDropdown  dropDownTitle="Select organisation size" dropDownItems={dropDownItems}/>   


      </div>
        
        <Button className="w-full mb-3">Make it live</Button>
      </div>
    </div>


  );
};

export default OnBoardingIndex;