"use client";
import React from "react";
import ProductTour from "../_components/product-tour";
import { useState } from "react";

const DashBoard = () => {
  const [productTour, showProductTour] = useState(true);

  return (
    <>
      <div>
        {productTour && (
          <ProductTour
            userName="Rifad"
            handleModalClose={() => showProductTour(false)}
          />
        )}
      </div>

      <div>
        
      </div>
    </>
  );
};

export default DashBoard;
