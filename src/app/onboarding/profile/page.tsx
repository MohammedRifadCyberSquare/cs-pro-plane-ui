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
import { IUser } from "@/types/user.dt";
import { useMobxStore } from "@/store/store.provider";

export interface IProfile {
  first_name: string;
  last_name: string;
  role: string;
}

const dropDownItems: any = ["Engineering/Development", "Freelance", "Student"];
const OnboardingProfile = observer((props: any) => {
  const { user } = props;
 

  const router = useRouter();
  const { user: userStore } = useMobxStore();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const toast = new Toast();
  const onFormSubmit = async(formData: IProfile) => {
    const payload: Partial<IUser> = {
      ...formData,
      onboarding_step: {
        ...user.onboarding_step,
        profile_complete: true,
      },
    };
   
    console.log(payload);
    await userStore.updateCurrentUser(payload);
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
      <div className="h-[25vh] mt-4  px-20  w-[50%]">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Set up your profile</h2>
          <p>
            <WavesIcon />
          </p>
        </div>

        <div>
          <User />
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
            First Name:
          </p>
          <div className="w-full">
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
                  className="px-4 text-gray-500 w-full"
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

          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
            Last Name:
          </p>
          <div className="w-full">
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
                  className="px-4 text-gray-500 w-full"
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
          <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
            What's your role:
          </p>
          <div className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <CustomDropdown
                  onSelect={(selectedItem) => setValue("role", selectedItem)}
                  dropDownTitle="Select organisation size"
                  dropDownItems={dropDownItems}
                />
              )}
            />
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}

             
          </div>
          <Button type="submit" className="w-hlaf mb-3">
            Continue
          </Button>
        </form>
      </div>
    </>
  );
});

export default OnboardingProfile;
