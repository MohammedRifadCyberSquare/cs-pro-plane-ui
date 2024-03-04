import { useEffect, useState } from "react";
// next imports
import { useRouter } from "next/navigation";
// swr
import useSWR from "swr";
import { UserService } from "@/services/user.service";
import { IUser, IUserSettings } from "@/types/user.dt";
import { WorkspaceService } from "@/services/workspace.service";
import { useMobxStore } from "@/store/store.provider";


const userService = new UserService();
const workspaceService = new WorkspaceService();

export const useUserAuth = (routeAuth: "sign-in" | "onboarding" | "admin" | null = "admin") => {

  console.log('1111111111111112222222222222222222333333333333333333')
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<IUser>('CURRENT_USER', () => userService.currentUser(), {
    refreshInterval: 0,
    shouldRetryOnError: false,
  });

  const {
    user: { fetchCurrentUser, fetchCurrentUserSettings },

  } = useMobxStore();



  useEffect(() => {

    const handleWorkSpaceRedirection = async () => {
      fetchCurrentUserSettings()
        .then((userSettings: IUserSettings) => {
          const workspaceSlug =
            userSettings?.workspace?.last_workspace_slug || userSettings?.workspace?.fallback_workspace_slug;
          if (workspaceSlug) router.push(`/workspaces/${workspaceSlug}`);
        }
          // workspaceService.userWorkspaces().then(async (userWorkspaces) => {
          // const userWorkspaces = response.data
          // const lastActiveWorkspace = userWorkspaces.find((workspace:any) => workspace.id === user?.last_workspace_id);
          //     console.log('user workp', lastActiveWorkspace,)
          //     console.log(userWorkspaces)
          //     alert('userWorkspaces')
          // if (lastActiveWorkspace) {
          //   alert('last active============')
          //     router.push(`/workspaces/${lastActiveWorkspace.slug}`);
          //   return;
          // } else if (userWorkspaces.length > 0) {
          //    alert('workspace>0')
          //   router.push(`/workspaces/${userWorkspaces[0].slug}`);
          //   return;
          // }


          // else {
          //   localStorage.setItem('createWorkspace', 'create')
          //   router.push(`/onboarding`);
          //   return;
          // }

          // }

        )

    }


    const handleUserRouteAuthentication = async () => {
      console.log('in route authentication');

      if (user && user.is_active) {

        if (routeAuth === "sign-in") {
          if (user.is_onboarded) {
            alert('user is onbarded')
            handleWorkSpaceRedirection();
          }

          else {
            alert('user is not onboarded')
            router.push("/onboarding");
            return;
          }
        } 
        
        else if (routeAuth === "onboarding") {
          if (user.is_onboarded) handleWorkSpaceRedirection();
          else {
            // setIsRouteAccess(() => false);
            return;
          }
        } else {
          if (!user.is_onboarded) {
            router.push("/onboarding");
            return;
          } else {
            // setIsRouteAccess(() => false);
            return;
          }
        }
      } else {
        // user is not active and we can redirect to no access page
        // router.push("/no-access");
        // remove token
        return;
      }
    };

    if (user) {
     
      console.log('user found')
      handleUserRouteAuthentication();
    }
    // else{
    //   router.push('/')
    // }



  }, [user, isLoading,])





  return {

    user: error ? undefined : user,
    mutateUser: mutate,
    // assignedIssuesLength: user?.assigned_issues ?? 0,
    // workspaceInvitesLength: user?.workspace_invites ?? 0,
  };
}