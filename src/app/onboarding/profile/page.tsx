import React from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { User, WavesIcon } from "lucide-react";
import CustomDropdown from "../_components/custom-dropdown";


const OnBoardingProfile = () => {
 
    const dropDownItems:any = [
      "Product/Project Manager",
      "Development/Engineering",
      "Founder/Executive",
      "Freelancer/Consultant",
      "Marketting /Growth",
      "Sales/Business Development"
  
    ]
  return (
    <>
   
      <div className="h-[25vh] mt-4  px-20  w-[50%] ">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Set up your profile</h2>
          <p>
            <WavesIcon />
          </p>
        </div>

        {/* <div className="flex gap-3 items-center"> */}
          <div>
            <User />
          </div>
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          First Name:
        </p>
          <div className="w-full">
            <Input
              type="text"
              placeholder="enter your first name"
              className="px-4 text-gray-500 w-[100%]"
              readOnly
            />
          </div>
          
        {/* </div> */}
  
      <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          Last Name:
        </p>
          <div className="w-full">
            <Input
              type="text"
              placeholder="enter your last name"
              className="px-4 text-gray-500 w-[100%]"
              readOnly
            />
          </div>
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          What's your role:
        </p>
        <div className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
        <CustomDropdown dropDownTitle="select your role" dropDownItems={dropDownItems}/>   


      </div>
      <Button className="w-hlaf mb-3">Continue</Button>

          </div>

      {/* <div className="">
        <h3 className="text-2xl font-semibold text-muted-foreground mb-4 px-20">
          How you will use the app?
        </h3>
        <p className="text-muted-foreground px-20">Choose just one.</p>

        <div className="flex gap-4 my-4 px-20">
          <p>Buid products</p>
          <p>Manage feedbacks</p>
          <p>Buid products</p>
        </div>

        <div className="flex  gap-4 my-4 px-20">
          <p>Field force management</p>
          <p>Code repository integration</p>
          <p>Bug tracking</p>
        </div>
      </div>
      <div className="px-20"  >
            <Button >Continue</Button>
      </div> */}
    
    </>
  );
};

export default OnBoardingProfile;