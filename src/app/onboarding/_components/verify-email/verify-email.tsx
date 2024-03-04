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
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { Toast } from "@/lib/toast/toast";
import { ToastContainer } from "react-toastify";

export interface IEmailVerificationForm {

  stepChange: (steps: Partial<TOnboardingSteps>) => Promise<void>;

}

export interface IVerificationCode {
  code: string
}

const VerifyEmail: React.FC<IEmailVerificationForm> = observer((props) => {
  const { stepChange } = props;
  const userService = new UserService();
  const [userEmail, setUserEmail] = useState("");
  const emailService = new EmailService()
  const toast = new Toast();

  const handleRequestNewCode = () => {

    return emailService.requestCode().then((response) => {
      console.log(response?.status_code)
      if (response?.status_code == 200) {
        toast.showToast("success", response?.message);
      }
    })
  }

  const submitCode = async (formData: IVerificationCode) => {
    return emailService.verifyEmail(formData).then(async (response) => {
      if (response?.status_code == 200) {
        toast.showToast("success", response?.message);

        await stepChange({ email_verified: true });

      }

      if (response?.status_code == 405) {
        toast.showToast("error", response?.message);
      }

    });
  };

  const fetchEmail = () => {
    return userService.fetchUserEmail().then((response) => {

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


      <div className=" flex justify-center flex-col text-center s] h-[80%] w-[50%] shadow-lg text-slate-900 ">
        <h3 className="md:text-3xl sm:text-2xl xs: text-xl font-semibold mb-1">Moving to the runway</h3>
        <p className="  mt-3 ms-5 max-w-prose text-muted-foreground sm:text-base xs: text-xs">
          Paste the code you got at
        </p>

        <p className="mb-4 ms-5  max-w-prose text-muted-foreground sm:text-base xs: text-xs">
          <span className="text-blue-400">abc@test.com </span> below
        </p>
        <form onSubmit={handleSubmit(submitCode)}>
          <div className="mb-6 flex justify-center">


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
                  className="px-4 text-gray-500 w-[60%] "
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


          <div className="flex w-[80%] justify-end my-3">
            <span
              className=" text-sm max-w-prose text-muted-foreground cursor-pointer  hover:text-slate-800"
              onClick={handleRequestNewCode}
            >
              Request code
            </span>
          </div>

          <Button type="submit" className="w-[60%] mb-3">
            Continue
          </Button>
        </form>
      </div>



    </>
  );
});

export default VerifyEmail;
