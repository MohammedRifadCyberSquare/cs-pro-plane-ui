"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { AuthService } from "@/services/auth.service";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "@/lib/toast/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
const SignUp = () => {
  const router = useRouter();
  const authService = new AuthService();
  const toast = new Toast();
  const email = useSearchParams().get("email") || "";

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<TPasswordValidator>({
  //   resolver: zodResolver(PasswordValidator),
  // });

  // const onFormSubmit = ({ password }: TPasswordValidator, ) => {
  //   console.log(password);

  //   return authService.setPassword(password)
  //   .then((response) => {
  //     console.log(response?.message,'9090')
  //     toast.showToast('success', response?.message);
  //   })
  //   .catch(()=>{})

  // };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex items-center justify-center h-[70vh] mt-4">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-1">Set your password</h1>
          <p className="mt-3 text-sm max-w-prose text-muted-foreground">
            If you'd like to do away with codes, set a password here
          </p>

          <div className="mb-6">
            <Input
              type="text"
              value={email}
              className="px-4 text-gray-500 w-full"
              readOnly
            />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SignUp;
