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
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/lib/toast/toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { observe } from "mobx";
import { useMobxStore } from "@/store/store.provider";
import { IUser, IUserSettings } from "@/types/user.dt";

export interface EmailPasswordFormValues {
  email: string;
  password: string;
}

const Index = observer(() => {
  const router = useRouter();
  const authService = new AuthService();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
 

  const [email, setEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPasswordFormValues>();
  const toast = new Toast();

  const {
    user: { fetchCurrentUser, fetchCurrentUserSettings },
   
  } = useMobxStore();

  const handleLoginRedirection = useCallback(
    (user: IUser) => {
      console.log('rediretion...')
      // if(!user.onboarding_step.email_verified){
      //   console.log('email verification')
      //   localStorage.setItem('showVerification', 'show')
      //   // router.push("/sign-up");
      //   return;
      // }
      if (!user.is_onboarded) {
        console.log('onboardng failed')

         router.push("/onboarding");
        return;
      }

      fetchCurrentUserSettings()
        .then((userSettings: IUserSettings) => {
          console.log('user not onboarder', userSettings);
          
          const workspaceSlug =
            userSettings?.workspace?.last_workspace_slug || userSettings?.workspace?.fallback_workspace_slug;
          console.log(workspaceSlug,'////////////////')
            if (workspaceSlug) router.push(`/workspaces/${workspaceSlug}`);
          else if (userSettings.workspace.invites > 0) router.push("/invitations");
          // else router.push("/create-workspace");
        })
        .catch(() => {
          // setLoading(false);
          console.log('failed');

        });
    },[ router, ]
  )
  const mutateUserInfo = useCallback(() => {
    
    fetchCurrentUser().then((user) => {
      console.log('user is ', user)
      handleLoginRedirection(user);
    });
  }, [fetchCurrentUser, handleLoginRedirection]);

 

  const onFormSubmit = ({ email, password }: EmailPasswordFormValues) => {
    console.log(email, password);
    return authService.userSignIn(email, password).then((response) => {
      let statusCode = response?.status_code;
      let isEmailVerified = response?.is_email_verified
       

      console.log('res', statusCode)

      if (statusCode == 200){
         console.log('user found...........')
        mutateUserInfo();
      }
      else{
        console.log('error')
        toast.showToast('error', response?.message);

      }

    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center h-[70vh] mt-15 bg-slate-50 ">
        <div className="text-center">
          <h1 className=" font-semibold text-3xl mb-4">
            Welcome Back, let's get you on board
          </h1>

          <p className="mb-4 text-sm max-w-prose text-foreground">
            Get back to your issues, projects and workspaces.
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="mb-6 ml-8 mr-8 ">
              <Input
                required
                type="text"
                {...register("email")}
                placeholder="enter your email"
                className="px-4 py-2 border border-white rounded-md w-full bg-white"
              />
            </div>

            <div className="mb-6 ml-8 mr-8 bg-white">
              <Input
                required
                type="password"
                {...register("password")}
                placeholder="enter password"
                className="px-4 py-2 border  rounded-md w-full bg-white  "
              />
            </div>


            {/* Button */}
            <div className="flex items-end justify-center">
            <Button className="w-full mb-6 ml-8 mr-8 border-radius:0.25rem" type="submit">
              Login
            </Button>
            </div>
          </form>
       
          <div className="mt-4 bg-slate-50 text-sm ">
            <span className="bg-slate-50"> Don't have an account?</span>
            <Link href="/sign-up"> Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
});

export default Index;
