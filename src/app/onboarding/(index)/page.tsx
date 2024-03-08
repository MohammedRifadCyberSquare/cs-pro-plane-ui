"use client";
import React from "react";
import { useEffect, useState } from "react";
import OnboardingProfile, { IProfile } from "../profile/page";
import { useUserAuth } from "@/hooks/use-user-auth";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import { Toast } from "@/lib/toast/toast";
import { useMobxStore } from "@/store/store.provider";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import VerifyEmail  from "../_components/verify-email";
import { ToastContainer } from "react-toastify";
import WorkSpace from "../workspace/page";
import UserAuthWrapper from "@/layouts/auth-layout/auth-wrapper";

const OnBoarding = observer(() => {

  const [step, setStep] = useState<number | null>(null);
  
    const {
      user: { currentUser, updateCurrentUser, updateUserOnBoard },
      workspace: workspaceStore,
    } = useMobxStore();

  const {} = useUserAuth("onboarding");
  const user = currentUser ?? undefined;
  
  const workspaces = workspaceStore.workspaces;

  const finishOnboarding = async () => {
    if (!user) return;

    await updateUserOnBoard();
  };

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

  

  useEffect(() => {
    const handleStepChange = async () => {
      const onboardingStep = user?.onboarding_step;

      if (!onboardingStep?.email_verified) {
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
    <UserAuthWrapper>
      {step == 1 && (
        <div>
          <VerifyEmail stepChange={stepChange} />
        </div>
      )}
      {step == 2 && (
        <div>
          <OnboardingProfile  stepChange = {stepChange}/>
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
      </UserAuthWrapper>
    </>
  );
});

// OnBoarding.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <UserAuthWrapper>
//       <DefaultLayout>{page}</DefaultLayout>
//     </UserAuthWrapper>
//   );
// };

export default OnBoarding;


