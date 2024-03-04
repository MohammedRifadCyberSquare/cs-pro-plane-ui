"use client";
import React, { FC } from "react";
import ProductTour from "../_components/product-tour";
import { useState } from "react";
import DashboardOverView from "../_components/dashboard-over-view";
import DashboardHeader from "../_components/header";
import { GridIcon, LucideIcon, Projector } from "lucide-react";

type Props = {
  icon: LucideIcon
}
const DashBoard: FC<Props> = (props) => {
  const [productTour, showProductTour] = useState(true);

  const { icon } = props

  return (
    <>
      
        {/* {productTour && (
          <ProductTour
            userName="Rifad"
            handleModalClose={() => showProductTour(false)}
          />
        )} */}

        <div className="h-full">
        <DashboardHeader icon = {GridIcon} />
        <DashboardOverView />
        </div>
     
    </>
  );
};

export default DashBoard;
