"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CsProLogo from "./cs-pro-logo";

type Props = {
  isOnBoarding?: boolean;
};

const Navbar: React.FC<Props> = ({ isOnBoarding = false }) => {
  return (
    <div className="container sticky z-50 flex top-0 inset-x-0 rounded">
      <header>
        <Link href="">
          <CsProLogo />
        </Link>
      </header>
      {isOnBoarding && (
        <div className="flex w-full justify-end items-center">
          <span><Link href="">mohammed@gmail.com</Link></span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
