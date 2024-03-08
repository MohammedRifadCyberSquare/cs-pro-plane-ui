"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useCallback } from "react";
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
import { useMobxStore } from "@/store/store.provider";
import { IUser } from "@/types/user.dt";

const SignUp = () => {

  const router = useRouter();
  const authService = new AuthService();
  const toast = new Toast();

  const {
    user: { fetchCurrentUser },
   
  } = useMobxStore();

  const handleLoginRedirection = useCallback(

    (user: IUser) => {
      
      if (!user.is_onboarded) {
        router.push("/onboarding");
        return;
      }
    },[router, ]
 )
  
  const mutateUserInfo = useCallback(() => {
    
    fetchCurrentUser().then((user) => {
      handleLoginRedirection(user);
    });
  }, [fetchCurrentUser, handleLoginRedirection]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
  });
 
  const onFormSubmit = ({ email, password }: TSignUpValidator) => {
    return authService.userSignUp(email, password).then((response) => {
       
      if (response?.status_code == 201) {
        toast.showToast("success", response?.message);
        mutateUserInfo()
        
      }
      if (response?.status_code == 409) {
        toast.showToast("error", response?.message);
      }
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
       
      <div className="flex items-center justify-center h-[70vh] mt-15 bg-slate-50">
          <div className="text-center">
            <h1 className="font-semibold text-3xl mb-4">Sign Up On Plane</h1>

            <p className="mb-4 text-sm max-w-prose text-foreground">
              Create an account and track your issues, projects and workspaces.
            </p>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-6 ml-8 mr-8">
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

              <div className="mb-6 ml-8 mr-8">
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

              <div className="mb-6 ml-8 mr-8">
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
              <div className="flex items-end justify-center">
              <Button className="w-full mb-6 ml-8 mr-8 border-radius:0.25rem"  type="submit">
                Sign up
              </Button>
              </div>
          <div className="mt-4 bg-slate-50 text-sm ">
            
                <span className="bg-slate-50">Already have an account?</span>
                <Link href="/"> Sign in</Link>
              </div>
            </form>
          </div>
        </div>   
        
    </>
  );
};

export default SignUp;
