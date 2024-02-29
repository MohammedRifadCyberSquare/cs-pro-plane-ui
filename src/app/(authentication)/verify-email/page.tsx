"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import { EmailService } from "@/services/email.service";
import { UserService } from "@/services/user.service";
import { useMobxStore } from "@/store/store.provider";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user.dt";

export interface IEmailVerificationForm {
  handleRequestNewCode: () => Promise<void>;
  onSubmit: (formData:IVerificationCode ) => Promise<void>;
}

export interface IVerificationCode{
  code: string
}

const VerifyEmail: React.FC<IEmailVerificationForm> = observer((props) => {
  const { handleRequestNewCode, onSubmit } = props;

  const [timer, setTimer] = useState(0);
  const userService = new UserService();
  const [userEmail, setUserEmail] = useState("");

  const {
    user: { fetchCurrentUser },
  } = useMobxStore();
  const router = useRouter();


  const startTimer = () => {
    useEffect(() => {
      let interval: any;

      // Start the timer
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [timer]);
  };
  

  const handleLoginRedirection = useCallback((user: IUser) => {
    if (!user.is_onboarded) {
      localStorage.setItem("showVerification", "true");
      router.push("/sign-up");
    }
  },[router]);
   

  const mutateUserInfo = useCallback(() => {
  
    fetchCurrentUser().then((user) => {
     
      handleLoginRedirection(user);
    });
  }, [fetchCurrentUser, handleLoginRedirection]);


  const fetchEmail = () => {
    return userService.fetchUserEmail().then((response) => {
      console.log(response?.status_code);
      response?.status_code == 200 ? setUserEmail(response?.email) : "";
    });
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  // startTimer();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IVerificationCode>({
    defaultValues: {
      code: ''
    },
  });
  return (
    <>
      <div className="flex items-center justify-center h-[70vh]  mt-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-1">Moving to the runway</h1>
          <p className="mt-3  max-w-prose text-muted-foreground">
            Paste the code you got at
          </p>

          <p className="mb-1  max-w-prose text-muted-foreground">
            <span className="text-blue-400">{userEmail} </span> below
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              

              <Controller
                control={control}
                name="code"
                rules={{
                  required: "Code is required",
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    onChange={(e) => {
                      console.log('eeee')
                      setValue("code", e.target.value);
                     
                    }}
                    placeholder="get-set-fly"
                    className="px-4 text-gray-500 w-full"
                    required
                  />
                )}
              />
                {errors?.code && (
                  <p className="text-sm text-red-500 mt-3">
                    {errors.code?.message}
                  </p>
                )}
            </div>
            

            <div className="flex justify-end my-3">
              {timer > 0 ? (
                <span className="text-sm max-w-prose text-muted-foreground">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              ) : (
                <span
                  className=" text-sm max-w-prose text-muted-foreground cursor-pointer"
                  onClick={handleRequestNewCode}
                >
                  Request code
                </span>
              )}
            </div>

            {/* Button */}
            <Button type="submit" className="w-full mb-3">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
});

export default VerifyEmail;
