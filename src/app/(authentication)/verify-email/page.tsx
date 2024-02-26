"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import { EmailService } from "@/services/email.service";
import { UserService } from "@/services/user.service";

const SignUp = () => {
  const [timer, setTimer] = useState(10);
  const userService = new UserService();
  const [userEmail, setUserEmail] = useState('');
   
  const startTimer = () => {
    useEffect(() => {
      let interval: any;

      // Start the timer
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }

      // Clear the interval when the component unmounts or the timer reaches 0
      return () => clearInterval(interval);
    }, [timer]);
  };

  const handleRequestNewCode = () => {
    setTimer(10);
  };

  const fetchEmail = () => {
    return userService.fetchUserEmail().then((response)=>{
      console.log(response?.status_code)
      response?.status_code == 200? setUserEmail(response?.email) : ''
    })
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  startTimer();
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center h-[70vh]  mt-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-1">Moving to the runway</h1>
          <p className="mt-3  max-w-prose text-muted-foreground">
            Paste the code you got at
          </p>

          <p className="mb-1  max-w-prose text-muted-foreground">
            <span className="text-blue-400">{ userEmail } </span> below
          </p>

          <div className="mb-6">
            <Input
              type="text"
              value= {userEmail }
              className="px-4   border border-white rounded-md w-full"
              readOnly
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="gets-sets-flys"
              className="px-4 border border-white rounded-md w-full"
            />
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
                Request new code
              </span>
            )}
          </div>

          {/* Button */}
          <Button type="button" className="w-full mb-3">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
