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

const Index = () => {
  const router = useRouter();
  const authService = new AuthService();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(email);
    e.preventDefault();

    return authService.authenticateUser(email).then((response) => {
      let statusCode = response?.statusCode;
      let accountStatus = response?.accountStatus
      let userEmail = response?.userEmail
      console.log(response?.statusCode, response?.accountStatus);
      if (statusCode == 201) router.push("/verify-email");
      if (statusCode == 409 && accountStatus == 'password set') setShowPasswordInput(true)
      if (statusCode == 409 && accountStatus == 'password not set') 
      router.push(
        '/set-password?email='+ userEmail,
       
      )

      console.log("success", response?.statusCode);
    });

    // router.push('/verify-email');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(newEmail));
    console.log(newEmail);
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center h-[70vh] mt-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">
            Welcome Back, let's get you on board
          </h1>

          <p className="mb-4  max-w-prose text-muted-foreground">
            Get back your issues, projects and workspaces.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                type="text"
                placeholder="enter your email"
                className="px-4 py-2 border border-white rounded-md w-full"
                onChange={handleEmailChange}
              />
            </div>
           
              <div className="mb-6">
                <Input
                  type="password"
                  placeholder="enter password"
                  className="px-4 py-2 border border-white rounded-md w-full"
                  onChange={handleEmailChange}
                />
              </div>
             

            {/* Button */}
            <Button
              className="w-full mb-3"
              disabled={!isEmailValid}
              type="submit"
            >
              Login
            </Button>
          </form>

          <div className="mt-4">
            <span> Don't have an account?</span>
            <Link href="/sign-up"> Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
