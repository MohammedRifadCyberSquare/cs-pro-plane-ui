import { IWorkspace } from "@/types/workspace";
import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useMobxStore } from "@/store/store.provider";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import CustomDropdown from "../_components/custom-dropdown";
import { WorkspaceService } from "@/services/workspace.service";

type Props = {
    onSubmit?: (res: IWorkspace) => Promise<void>;

}

const dropDownItems: any = [
    "just myself",
    "1-20",
    "21-50",
    "51-200",
    "201-500",
    "500+",
  ];
export const CreateWorkspaceForm: FC<Props> = observer((props) => {

    const { onSubmit } = props
    const [slugError, setSlugError] = useState(false);
    const [invalidSlug, setInvalidSlug] = useState(false);

    const router = useRouter();
    const { workspace: workspaceStore, user:{updateUserOnBoard} } = useMobxStore();


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
      const workspaceService = new WorkspaceService();
      const [workspaceName, setWorkspaceName] = useState(
        "http://localhost:3000/workspace/"
      );
      const [workspaceSlug, setWorkspaceSlug] = useState(
        "http://localhost:3000/workspace/"
      );

      const onFormSubmit = (formData: IWorkspace) => {
        console.log(formData);
        return workspaceService.createWorkspace(formData).then((res) =>{
    
        })
      };

      
  

      const handleCreateWorkspace = async (formData: IWorkspace) => {

        console.log('creating workspace....')
        await updateUserOnBoard();
        await workspaceStore
            .createWorkspace(formData)
            .then(async (response) => {
                console.log('successs....')
                
                localStorage.removeItem('createWorkspace')
                   await updateUserOnBoard();
                if (onSubmit) await onSubmit(response);
            })
      }
       
      return (
        <div className="flex h-[70vh] mt-4 ml-20">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">
          What will your workspace be?
        </h1>
        <p className="mt-3 flex justify-start my-3 text-sm max-w-prose text-muted-foreground">
          Name it.
        </p>
        <form onSubmit = {handleSubmit(handleCreateWorkspace)}>
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
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
            {errors.slug && (
              <p className="text-red-500">{errors.slug.message}</p>
            )}
             
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
    </div>
      )
    

})