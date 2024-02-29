"use client";
import React from "react";
import { useEffect, useState, ReactElement } from "react";
import OnboardingProfile from "../profile/page";
import WorkSpace from "../workspace/page";
import { useUserAuth } from "@/hooks/use-user-auth";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import VerifyEmail, {
  IVerificationCode,
} from "@/app/(authentication)/verify-email/page";
import { EmailService } from "@/services/email.service";
import { Toast } from "@/lib/toast/toast";
import { useMobxStore } from "@/store/store.provider";
import useSWR from "swr";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { UserService } from "@/services/user.service";

const OnBoarding = observer(() => {
  const emailService = new EmailService();
  const userService = new UserService();
  const [step, setStep] = useState<number | null>(null);

  const handleRequestNewCode = () => {
    return emailService.requestCode().then((response) => {
      console.log(response?.status_code);
    });
  };
  const { user, mutateUser } = useUserAuth("onboarding");

  //   const {
  //     user: { currentUser, updateCurrentUser },

  //   } = useMobxStore();
  //   const user = currentUser
  //   console.log(user)

  const {
    user: { currentUser, updateCurrentUser, updateUserOnBoard },
    workspace: workspaceStore,
  } = useMobxStore();
  const workspaces = workspaceStore.workspaces;
  const userWorkspaces = workspaceStore.workspacesCreateByCurrentUser;

  console.log(user, "ooooooooooooo");

  const finishOnboarding = async () => {
    if (!user) return;

    await updateUserOnBoard();
  };

  // handle step change
  const stepChange = async (steps: Partial<TOnboardingSteps>) => {
    if (!user) return;

    const payload: Partial<IUser> = {
      onboarding_step: {
        ...user.onboarding_step,
        ...steps,
      },
    };

    await updateCurrentUser(payload);
  };

  useEffect(() => {
    const handleStepChange = async () => {
      console.log("changin....................");
      if (localStorage.getItem("createWorkspace")) {
        setStep(3);
      }
      const onboardingStep = user?.onboarding_step;
      console.log(onboardingStep, "888888888");
      if (!onboardingStep?.email_verified) {
        console.log("email verification");

        setStep(1);

        return emailService.requestCode().then((response) => {
          toast.showToast("success", response?.message);
        });
      }
      if (onboardingStep?.email_verified) {
        if (!onboardingStep.profile_complete) {
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
      //   if (!onboardingStep?.profile_complete) setStep(2);

      //   if (onboardingStep?.profile_complete) {
      //     if (!onboardingStep.workspace_create) {
      //       setStep(3);
      //     }
      //   }
    };
    handleStepChange();
  }, [user, step]);

  const toast = new Toast();

  const submitCode = (formData: IVerificationCode) => {
    return emailService.verifyEmail(formData).then((response) => {
      if (response?.status_code == 200) {
        toast.showToast("success", response?.message);
      }

      if (response?.status_code == 405) {
        toast.showToast("error", response?.message);
      }
      console.log(response?.status_code);
    });
  };

  return (
    <>
      {step == 1 && (
        <div>
          <VerifyEmail
            handleRequestNewCode={handleRequestNewCode}
            onSubmit={submitCode}
          />
        </div>
      )}
      {step == 2 && (
        <div>
          <OnboardingProfile stepChange={stepChange} user={user} />
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
    </>
  );
});

export default OnBoarding;
