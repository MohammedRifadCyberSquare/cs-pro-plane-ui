"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import CustomDropdown from "../_components/custom-dropdown";
import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TWorkspaceValidator,
  WorkspaceValidator,
} from "@/lib/validator/workspace.validator";
import { WorkspaceService } from "@/services/workspace.service";
import { IWorkspace } from "@/types/workspace";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { CreateWorkspaceForm } from "../_components/create-workspace-form";


type Props = {
  finishOnboarding: () => Promise<void>;
  stepChange: (steps: Partial<TOnboardingSteps>) => Promise<void>;

  user: IUser | undefined;
  workspaces: IWorkspace[] | undefined;
}

const Workspace: React.FC<Props> = (props) => {
  const { finishOnboarding, stepChange, user, workspaces  } = props;
  const dropDownItems: any = [
    "just myself",
    "1-20",
    "21-50",
    "51-200",
    "201-500",
    "500+",
  ];
  const [workspaceName, setWorkspaceName] = useState(
    "http://localhost:3000/workspace/"
  );
  const [workspaceSlug, setWorkspaceSlug] = useState(
    "http://localhost:3000/workspace/"
  );

  const handleWorkspaceNameChange = (event: any) => {
    const newName = event.target.value;
    const updatedName = newName.replace(/\s+/g, "-");
    console.log("eee");
    setWorkspaceName(updatedName);

    // Append the workspace name to the default slug
    setWorkspaceSlug(`http://localhost:3000/workspace/${updatedName}`);
  };

  const [invalidSlug, setInvalidSlug] = useState(false);
  const workspaceService = new WorkspaceService();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
 
  
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IWorkspace>({
    defaultValues: {
      name: "",
      slug: "",
      organization_size: "",
    },
  });

  const onFormSubmit = (formData: IWorkspace) => {
    console.log(formData);
    return workspaceService.createWorkspace(formData).then((res) =>{

    })
  };



  const completeStep = async () => {
    if (!user) return;

    const payload: Partial<TOnboardingSteps> = {
      workspace_create: true,
    };

    await stepChange(payload);
 
  };


  return (
     <CreateWorkspaceForm
     onSubmit={completeStep}
     />
  );
};

export default Workspace;
