"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomDropdown from "../_components/custom-dropdown";
import { useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { WorkspaceService } from "@/services/workspace.service";
import { IWorkspace } from "@/types/workspace";
import { IUser, TOnboardingSteps } from "@/types/user.dt";
import { RESTRICTED_URLS } from "@/constants/workspace";
import { Toast } from "@/lib/toast/toast";
import { useMobxStore } from "@/store/store.provider";
 

type Props = {
  finishOnboarding: () => Promise<void>;
  stepChange: (steps: Partial<TOnboardingSteps>) => Promise<void>;
  user: IUser | undefined;
  workspaces: IWorkspace[] | undefined;
};

const WorkSpace: React.FC<Props> = (props) => {
  const { finishOnboarding, stepChange, user, workspaces } = props;
  const dropDownItems: any = [
    "just myself",
    "1-20",
    "21-50",
    "51-200",
    "201-500",
    "500+",
  ];
  const [workspaceSlug, setWorkspaceSlug] = useState(
    "http://localhost:3000/workspace/"
  );
  const toast = new Toast();
  const workspaceService = new WorkspaceService();

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

  const { workspace: workspaceStore } = useMobxStore();

  const handleCreateWorkspace = async (formData: IWorkspace) => {
    if (RESTRICTED_URLS.includes(formData.slug)) {
      toast.showToast("error", "Invalid Workspace name");
      return;
    }
    await workspaceService
      .workspaceSlugCheck(formData.slug)
      .then(async (response) => {
        if (response.status === true) {
          await workspaceStore
            .createWorkspace(formData)
            .then(async (response: any) => {
              toast.showToast("success", "Workspace Created");
              await stepChange({ workspace_create: true });
            });
        } else {
          toast.showToast("error", "Workspace Exists");
        }
      });
  };

  return (
    <div className=" flex justify-center flex-col text-center s] h-[90%] w-[50%] shadow-lg text-slate-900 ">
      <h2 className="flex justify-start text-sm md:text-2xl lg:text-3xl sm:text-lg font-semibold">
        What will your workspace be?
      </h2>
      <p className="mt-3 flex justify-start ms-2 my-3 text-xs sm:text-sm md:text-sm lg:text-sm max-w-prose text-muted-foreground">
        Name it.
      </p>
      <form onSubmit={handleSubmit(handleCreateWorkspace)}>
        <div className="mb-3">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                type="text"
                onChange={(e) => {
                  const updatedSlug = e.target.value.replace(/\s+/g, "-");
                  setWorkspaceSlug(
                    `http://localhost:3000/workspace/${updatedSlug}`
                  );
                  setValue("name", e.target.value);
                  setValue("slug", updatedSlug);
                }}
                placeholder="enter workspace name..."
                className="px-4 text-gray-500 w-full"
                required
              />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <span className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          You can edit the slug.
        </span>
        <div className="mb-3">
          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <Input
                type="text"
                value={workspaceSlug}
                className="px-4 text-gray-500 w-full"
                required
                onChange={(e) => {
                  setValue("slug", "hello");
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>

        <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          What size is your organisation?
        </p>
        <div className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          <Controller
            control={control}
            name="organization_size"
            render={({ field }) => (
              <CustomDropdown
                onSelect={(selectedItem) =>
                  setValue("organization_size", selectedItem)
                }
                dropDownTitle="Select organisation size"
                dropDownItems={dropDownItems}
              />
            )}
          />
          {errors.organization_size && (
            <p className="text-red-500">{errors.organization_size.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full mb-3">
          Make it live
        </Button>
      </form>
    </div>
  );
};

export default WorkSpace;
