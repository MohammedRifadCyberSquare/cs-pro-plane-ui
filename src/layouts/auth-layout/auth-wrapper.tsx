import { useMobxStore } from "@/store/store.provider";
import { Spinner } from "@nextui-org/react";
import React, { FC, ReactNode } from "react";
import useSWR from "swr";
export interface IUserAuthWrapper {
  children: ReactNode;
}

const UserAuthWrapper: FC<IUserAuthWrapper> = (props) => {
  const { children } = props;

  const {
    user: { fetchCurrentUser, fetchCurrentUserSettings },
  } = useMobxStore();

  const { data: currentUser, error } = useSWR(
    "CURRENT_USER",
    () => fetchCurrentUser(),
    {
      shouldRetryOnError: false,
    }
  );

  console.log("current uer", currentUser);
  if (!currentUser && !error) {
    return (
      <div className="">
        <div className="flex gap-4">
          <Spinner size="sm" color="danger" />
          <Spinner size="md" />
        </div>
      </div>
    );
  }
  return (
    <>
       {children}
    </>
  );
};

export default UserAuthWrapper;
