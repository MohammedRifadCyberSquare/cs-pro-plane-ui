import React, { FC } from "react";
import SidebarRoutes from "./sidebar-routes";

type Props = {
  dashboardLink?: string;
  isDisabled?: boolean
};
const SideBar: FC<Props> = (props) => {
  const { dashboardLink, isDisabled } = props;
  return (
    <>
      <SidebarRoutes dashboardLink={dashboardLink} isDisabled = {isDisabled}  />
    </>
  );
};

export default SideBar;
