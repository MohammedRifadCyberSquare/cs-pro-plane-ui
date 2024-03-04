"use client";
import React, { FC } from "react";
import ProductTour from "../../_components/product-tour";
import { useState } from "react";
import DashboardOverView from "../../_components/dashboard-over-view";
import DashboardHeader from "../../_components/workspace-header";
import { GridIcon, LucideIcon, Projector } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  icon: LucideIcon
}
const DashBoard: FC<Props>= (props ) => {
  const [productTour, showProductTour] = useState(true);

  const router = useRouter();
  const { icon } = props
  // let slug = decodeURIComponent(params);
  // console.log('000', props.params)
  // const { slug } = router.query;
  return (
    <>
      
        {/* {productTour && (
          <ProductTour
            userName="Rifad"
            handleModalClose={() => showProductTour(false)}
          />
        )} */}

        <div className="h-full">
        <DashboardHeader icon = {GridIcon} title="Dashboard"/>
        <DashboardOverView />
        </div>
     
    </>
  );
};

export default DashBoard;
