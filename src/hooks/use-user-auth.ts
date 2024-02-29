import { useEffect, useState } from "react";
// next imports
import { useRouter } from "next/navigation";
// swr
import useSWR from "swr";
import { UserService } from "@/services/user.service";
import { IUser } from "@/types/user.dt";
import { WorkspaceService } from "@/services/workspace.service";


const userService = new UserService();
const workspaceService = new WorkspaceService();

export const useUserAuth = (routeAuth: "sign-in" | "onboarding" | "admin" | null = "admin") => {

  console.log(routeAuth)
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

      console.log('user loading', )

      useEffect(() => {
        const handleWorkSpaceRedirection = async () => {
          workspaceService.userWorkspaces().then(async (userWorkspaces) => {
        const lastActiveWorkspace = userWorkspaces.find((workspace) => workspace.id === user?.last_workspace_id);
            console.log('user workp', lastActiveWorkspace,)
            console.log(userWorkspaces)
        if (lastActiveWorkspace) {
          console.log('last active============')
            router.push(`/workspaces/${lastActiveWorkspace.slug}`);
          return;
        } else if (userWorkspaces.length > 0) {
          router.push(`/workspaces/${userWorkspaces[0].slug}`);
          return;
        }

        
          else {
            localStorage.setItem('createWorkspace', 'create')
            router.push(`/onboarding`);
            return;
          }
         
          })

        }


        const handleUserRouteAuthentication = async () => {
          console.log('in route authentication');
          
          if (user && user.is_active) {
            if (routeAuth === "sign-in") {
              if (user.is_onboarded) handleWorkSpaceRedirection();
              else {
                router.push("/onboarding");
                return;
              }
            } else if (routeAuth === "onboarding") {
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

        if(user){
          console.log('user found')
          handleUserRouteAuthentication();
        }



      },[user, isLoading,])

      

       

      return {
         
        user: error ? undefined : user,
        mutateUser: mutate,
        // assignedIssuesLength: user?.assigned_issues ?? 0,
        // workspaceInvitesLength: user?.workspace_invites ?? 0,
      };
}