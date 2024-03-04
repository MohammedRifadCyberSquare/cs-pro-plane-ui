import React, { FC } from "react";
import SidebarRoutes from "./sidebar-routes";

type Props = {
  dashboardLink?: string
}
const SideBar:FC<Props> = (props) => {
  const {dashboardLink} = props
  return (
    <div>
 <SidebarRoutes dashboardLink= {dashboardLink}/>
    </div>
 
  );
};

export default SideBar;
