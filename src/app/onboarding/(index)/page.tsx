"use client";
import React from "react";
import { useEffect, useState, ReactElement } from "react";
import OnboardingProfile, { IProfile } from "../profile/page";
import { useUserAuth } from "@/hooks/use-user-auth";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import { EmailService } from "@/services/email.service";
import { Toast } from "@/lib/toast/toast";
import { useMobxStore } from "@/store/store.provider";
import useSWR from "swr";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { UserService } from "@/services/user.service";
import VerifyEmail, {
  IVerificationCode,
} from "../_components/verify-email/verify-email";
import { ToastContainer } from "react-toastify";
import WorkSpace from "../workspace/page";

const OnBoarding = observer(() => {
  const emailService = new EmailService();
  const userService = new UserService();
  const [step, setStep] = useState<number | null>(null);

  // const handleRequestNewCode = () => {
  //   return emailService.requestCode().then((response) => {
  //     console.log(response?.status_code);
  //   });
  // };

  const {
    user: { currentUser, updateCurrentUser, updateUserOnBoard },
    workspace: workspaceStore,
  } = useMobxStore();

  const {} = useUserAuth("onboarding");
  const user = currentUser ?? undefined;

  console.log(user,'current user')
  
  const workspaces = workspaceStore.workspaces;
  // const userWorkspaces = workspaceStore.workspacesCreateByCurrentUser;

  console.log(user, "ooooooooooooo");

  const finishOnboarding = async () => {
    if (!user) return;

    await updateUserOnBoard();
  };

  // const updateLastWorkspace = async () => {
  //   if (!workspaces) return;

  //   await updateCurrentUser({
  //     last_workspace_id: workspaces[0]?.id,
  //   });
  // };


  // handle step change
  const stepChange = async (
    steps: Partial<TOnboardingSteps>,
    formData?: IProfile
  ) => {
     
    
    if (!user) return;

    const updatedOnboardingSteps: Partial<TOnboardingSteps> = {
      ...user.onboarding_step,
      ...steps,
    };

    const payload: Partial<IUser> = {
      onboarding_step: updatedOnboardingSteps,
      ...(formData && { ...formData }),
    };

    
   

    await updateCurrentUser(payload);
 
  };

  // const stepChange = async (steps: Partial<TOnboardingSteps>) => {

  //   if (!user) return;

  //   const payload: Partial<IUser> = {
  //     onboarding_step: {
  //       ...user.onboarding_step,
  //       ...steps,
  //     },
  //   };

  //   console.log('after step chng', user)

  //   await updateCurrentUser(payload);
  //    console.log('user sssssssssssssssssssssssssssssssssssss',user)
  // };

  useEffect(() => {
    const handleStepChange = async () => {
      console.log("*****************************************now handlespep");

      const onboardingStep = user?.onboarding_step;
      console.log(onboardingStep, "888888888");
      if (!onboardingStep?.email_verified) {
        console.log("email verification");

        setStep(1);
        return;
      }

      if (!user?.is_onboarded) {
        if (!onboardingStep?.profile_complete) {
          setStep(2);
          return;
        }

        if (
          onboardingStep?.email_verified &&
          onboardingStep.profile_complete &&
          !onboardingStep.workspace_create
        ) {
          setStep(3);
          return;
        }
      }
    };
    handleStepChange();
  }, [user, step]);

  const toast = new Toast();
  console.log("step is ", step);

  return (
    <>
      {step == 1 && (
        <div>
          <VerifyEmail stepChange={stepChange} />
        </div>
      )}
      {step == 2 && (
        <div>
          <OnboardingProfile stepChange={stepChange} />
        </div>
      )}

      {step == 3 && (
        <div>
          <WorkSpace
            finishOnboarding={finishOnboarding}
            stepChange={stepChange}
            user={user}
            workspaces={workspaces}
          />
        </div>
      )}

      <ToastContainer />
    </>
  );
});

export default OnBoarding;
