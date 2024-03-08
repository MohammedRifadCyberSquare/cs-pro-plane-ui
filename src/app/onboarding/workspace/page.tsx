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
import { OrgSizeDropDownItems } from "@/constants/dropdown-items";
 
type Props = {
  finishOnboarding: () => Promise<void>;
  stepChange: (steps: Partial<TOnboardingSteps>) => Promise<void>;
  user: IUser | undefined;
  workspaces: IWorkspace[] | undefined;
};

const WorkSpace: React.FC<Props> = (props) => {
  const { finishOnboarding, } = props;
   console.log('netx ', process.env.NEXT_PUBLIC_BASE_URL)
  const [workspaceSlug, setWorkspaceSlug] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/workspace/`
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const toast = new Toast();
  const workspaceService = new WorkspaceService();

  const {
    handleSubmit,
    control,
    setValue,
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
              await finishOnboarding()
              toast.showToast("success", "Workspace Created");
             
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
                 
                    `${process.env.NEXT_PUBLIC_BASE_URL}/workspace/${updatedSlug}`
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
                  {setValue("organization_size", selectedItem),setSelectedRole(selectedItem)}   
                }
                dropDownTitle= {selectedRole?selectedRole:"Select organisation size"}
                dropDownItems={OrgSizeDropDownItems}
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
