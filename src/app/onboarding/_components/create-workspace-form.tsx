//   import { IWorkspace } from "@/types/workspace";
// import { FC, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { useRouter } from "next/navigation";
// import { useMobxStore } from "@/store/store.provider";
// import { useForm, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button, buttonVariants } from "@/components/ui/button";
// import CustomDropdown from "../_components/custom-dropdown";
// import { WorkspaceService } from "@/services/workspace.service";

// type Props = {
//     onSubmit?: (res: IWorkspace) => Promise<void>;

// }

// const dropDownItems: any = [
//     "just myself",
//     "1-20",
//     "21-50",
//     "51-200",
//     "201-500",
//     "500+",
//   ];
// export const CreateWorkspaceForm: FC<Props> = observer((props) => {

//     const { onSubmit } = props
//     const [slugError, setSlugError] = useState(false);
//     const [invalidSlug, setInvalidSlug] = useState(false);

//     const router = useRouter();
//     const { workspace: workspaceStore, user:{updateUserOnBoard} } = useMobxStore();


//     const {
//         handleSubmit,
//         control,
//         setValue,
//         getValues,
//         formState: { errors, isSubmitting, isValid },
//       } = useForm<IWorkspace>({
//         defaultValues: {
//           name: "",
//           slug: "",
//           organization_size: "",
//         },
//       });
//       const workspaceService = new WorkspaceService();
//       const [workspaceName, setWorkspaceName] = useState(
//         "http://localhost:3000/workspace/"
//       );
//       const [workspaceSlug, setWorkspaceSlug] = useState(
//         "http://localhost:3000/workspace/"
//       );

//       const onFormSubmit = (formData: IWorkspace) => {
//         console.log(formData);
//         return workspaceService.createWorkspace(formData).then((res) =>{
    
//         })
//       };

      
  

     
//       return (
        
//       )
    

// })