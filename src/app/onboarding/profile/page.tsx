"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import { AuthService } from "@/services/auth.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/lib/toast/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, WavesIcon } from "lucide-react";
import {
  TSignUpValidator,
  SignUpValidator,
} from "@/lib/validator/signup.validator";
import CustomDropdown from "../_components/custom-dropdown";
import { ProfileValidator, TProfileValidator } from "@/lib/validator/profile.validator";
import { IUser } from "@/types/user.dt";
import { useMobxStore } from "@/store/store.provider";
const dropDownItems:any = [
  "Product/Project Manager",
  "Development/Engineering",
  "Founder/Executive",
  "Freelancer/Consultant",
  "Marketting /Growth",
  "Sales/Business Development"

]

const OnboardingProfile = () => {
  const router = useRouter();
  const { user: userStore } = useMobxStore();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileValidator>({
    resolver: zodResolver(ProfileValidator),
  });
  const toast = new Toast();
  const onFormSubmit = async ({ firstName, lastName  }: TProfileValidator) => {
    
    const payload: Partial<IUser> = {
      
     first_name: firstName,
     last_name: lastName,
     role: selectedRole
    }
     console.log(firstName, lastName,  selectedRole)
     await userStore.updateCurrentUser(payload);
  };
 
 

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
          <form onSubmit={handleSubmit(onFormSubmit)}>
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          First Name:
        </p>
          <div className="w-full">
            <Input
              type="text"
              placeholder="enter your first name"
              className="px-4 text-gray-500 w-[100%]"
              {...register("firstName")}
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
              {...register("lastName")}
               
            />
          </div>
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          What's your role:
        </p>
        <div className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
             
        <CustomDropdown 
       
         onSelect={(selectedItem) => setSelectedRole(selectedItem)}
          dropDownTitle="select your role"
           dropDownItems={dropDownItems}/>   


      </div>
      <Button type="submit" className="w-hlaf mb-3">Continue</Button>
       </form>
          </div>

     
    
    </>
  );

};

export default OnboardingProfile;
