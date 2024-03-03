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
import {
  TSignUpValidator,
  SignUpValidator,
} from "@/lib/validator/signup.validator";
import VerifyEmail, { IEmailVerificationForm, IVerificationCode } from "../verify-email/page";
import { EmailService } from "@/services/email.service";
import { useMobxStore } from "@/store/store.provider";
import { IUser } from "@/types/user.dt";

const SignUp = () => {
  const router = useRouter();
  const authService = new AuthService();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [verifyEmail, showVerifyEmail] = useState(false);



  
  const {
    user: { fetchCurrentUser },
   
  } = useMobxStore();
  

  const handleLoginRedirection = useCallback(

    (user: IUser) => {
      console.log('reeeeeeeeeeeeeeeeeeeeeeee')
      if(!user.onboarding_step.email_verified){
        localStorage.setItem('showVerification', 'show')
        router.push("/sign-up");
        return;
      }
      if (!user.is_onboarded) {
        router.push("/onboarding");
        return;
      }
    },[ router, ]
  )
  const mutateUserInfo = useCallback(() => {
    
    fetchCurrentUser().then((user) => {
      console.log('user is ', user)
      handleLoginRedirection(user);
    });
  }, [fetchCurrentUser, handleLoginRedirection]);

  useEffect(() => {
    const verifyUser = localStorage.getItem("showVerification") || null;
    if (verifyUser) {
      console.log('kkk')
      showVerifyEmail(true);
      localStorage.removeItem("showVerification");
    }
    else{
      console.log('jjjjjj')
    }
  }, []);
  const emailService = new EmailService()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
  });

  const toast = new Toast();
  const onFormSubmit = ({ email, password }: TSignUpValidator) => {
    console.log(email, password, "kkk");
    return authService.userSignUp(email, password).then((response) => {
      console.log(response?.status_code);
      if (response?.status_code == 201) {
        showVerifyEmail(true);
        toast.showToast("success", response?.message);
      }
      if (response?.status_code == 409) {
        toast.showToast("error", response?.message);
      }
    });
  };

  const handleRequestNewCode = () => {
      
    return emailService.requestCode().then((response) => {
      console.log(response?.status_code)
      if (response?.status_code == 200) {
        toast.showToast("success", response?.message);
      }
    })
  }

  const submitCode = (formData: IVerificationCode) =>  {
     
      
    return emailService.verifyEmail(formData).then((response) => {
      if (response?.status_code == 200) {
         mutateUserInfo()
        router.push("/onboarding");
        toast.showToast("success", response?.message);
      }

      if (response?.status_code == 405) {
        toast.showToast("error", response?.message);
      }
      console.log(response?.status_code)
    })
  }




  return (
    <>
      <Navbar />
      <ToastContainer />
      {!verifyEmail ? (
        <div className="flex items-center justify-center h-[70vh] mt-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">Sign Up On Plane</h1>

            <p className="mb-4  max-w-prose text-muted-foreground">
              Create an account and track your issues, projects and workspaces.
            </p>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-6">
                <Input
                  {...register("email")}
                  type="text"
                  placeholder="enter your email"
                  className={cn({
                    "focus-visible:ring-red-500 px-4 py-2 border border-white rounded-md w-full":
                      errors.password,
                  })}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 mt-3">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="enter password"
                  className={cn({
                    "focus-visible:ring-red-500 px-4 py-2 border border-white rounded-md w-full":
                      errors.password,
                  })}
                />
                {errors?.password && (
                  <p className="text-sm text-red-500 mt-3">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="re type password"
                  className={cn({
                    "focus-visible:ring-red-500 px-4 py-2 border border-white rounded-md w-full":
                      errors.confirmPassword,
                  })}
                />
                {errors?.confirmPassword && (
                  <p className="text-sm text-red-500 mt-3">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              {/* Button */}
              <Button className="w-full mb-3" type="submit">
                Sign up
              </Button>
              <div className="mt-4">
                <span>Already have an account?</span>
                <Link href="/"> Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <VerifyEmail handleRequestNewCode = {handleRequestNewCode} onSubmit={submitCode} />
      )}
    </>
  );
};

export default SignUp;
