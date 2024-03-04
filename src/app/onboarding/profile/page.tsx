"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/lib/toast/toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import { AuthService } from "@/services/auth.service";
import { ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, WavesIcon } from "lucide-react";
import { observer } from "mobx-react-lite";

import {
  TSignUpValidator,
  SignUpValidator,
} from "@/lib/validator/signup.validator";
import CustomDropdown from "../_components/custom-dropdown";
import {
  ProfileValidator,
  TProfileValidator,
} from "@/lib/validator/profile.validator";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { useMobxStore } from "@/store/store.provider";
import { SelectItem } from "@nextui-org/react";

type Props = {
  stepChange: (steps: Partial<TOnboardingSteps>, formData: IProfile) => Promise<void>;

}
export interface IProfile {
  first_name: string;
  last_name: string;
  role: string;
}

const dropDownItems: any = ["Engineering/Development", "Freelance", "Student"];
const OnboardingProfile: React.FC<Props> = observer((props) => {
  const { stepChange } = props;


  const router = useRouter();
  const { user: userStore } = useMobxStore();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const toast = new Toast();
  const onFormSubmit = async (formData: IProfile) => {


    await stepChange({ profile_complete: true }, formData)
    toast.showToast('success', 'Profile Updated')

  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IProfile>({
    defaultValues: {
      first_name: "",
      last_name: "",
      role: "",
    },
  });

  return (
    <>

      <div className=" flex justify-center flex-col text-center s] h-[90%] w-[50%] shadow-lg text-slate-900 ">
        <div className="flex justify-between ms-2 me-5 mb-6">
          <h2 className=" text-sm md:text-3xl lg:text-3xl sm:text-lg font-semibold">Set up your profile</h2>
          <p>
            <WavesIcon className="md:w-6 lg:w-8 sm:w-4 w-3" />
          </p>
        </div>
        <div className="flex flex-col justify-center w-full ">
          <div>
            <User className="ms-3 mb-3 " />
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col justify-center ms-5 me-5 ">
            <p className="mt-3 flex justify-start my-3 text-xs sm:text-sm md:text-sm lg:text-sm max-w-prose text-muted-foreground">
              First Name:
            </p>
            <div className="w-full flex justify-items-start">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("first_name", e.target.value);
                    }}
                    placeholder="first name"
                    className="px-4 text-gray-500 w-[80%] ms-2 text-xs sm:text-sm md:text-sm lg:text-sm placeholder:text-xs placeholder:sm:text-sm placeholder:md:text-sm placeholder:lg:text-sm"
                    required
                  />
                )}
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
              {/* <Input
              type="text"
              placeholder="enter your first name"
              className="px-4 text-gray-500 w-[100%]"
              {...register("firstName")}
            /> */}
            </div>

            <p className="mt-3 flex justify-start my-3 text-xs sm:text-sm md:text-sm lg:text-sm max-w-prose text-muted-foreground">
              Last Name:
            </p>
            <div className="w-full flex justify-items-start">
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("last_name", e.target.value);
                    }}
                    placeholder="last name"
                    className="px-4 text-gray-500 w-[80%] ms-2 text-xs sm:text-sm md:text-sm lg:text-sm placeholder:text-xs placeholder:sm:text-sm placeholder:md:text-sm placeholder:lg:text-sm"
                    required
                  />
                )}
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name.message}</p>
              )}

              {/* 

            <Input
              type="text"
              placeholder="enter your last name"
              className="px-4 text-gray-500 w-[100%]"
              {...register("lastName")}
               
            /> */}
            </div>
            <p className="mt-3 flex justify-start my-2 text-xs sm:text-sm md:text-sm lg:text-sm max-w-prose text-muted-foreground">
              What&apos;s your role:
            </p>
            <div className="mt-3 ms-2 flex justify-start my-3 text-xs sm:text-sm md:text-sm lg:text-sm max-w-prose text-muted-foreground">
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <CustomDropdown
                    onSelect={(selectedItem) => {setValue("role", selectedItem) , setSelectedRole(selectedItem)}}
                    dropDownTitle={selectedRole?selectedRole:"Select your role:"}
                    dropDownItems={dropDownItems}
                  />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}



            </div>
            <div>

            </div>
            <Button type="submit" className="w-[80%] mb-3 mt-4 ms-2 ">
              Continue
            </Button>

          </form>
        </div>


      </div>

    </>
  );
});

export default OnboardingProfile;