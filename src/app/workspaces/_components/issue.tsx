"use client";
import React, { useState } from 'react';

interface IssuestateProps {
  title: string;
}

const Issuestate: React.FC<IssuestateProps> = ({ title }) => {
  

 
  return (
    <div className='bg-[#ffffff] rounded-xl border-[0.5px]  w-full hover:shadow-md duration-300 flex flex-col min-h-96'>

        <div className='flex items-center justify-between gap-2 p-6 pl-7'>
            <a href="#" className='text-lg font-semibold text-custom-text-300 hover:underline'>      {title}</a>
            <div className='relative w-min text-left flex-shrink-0'>
                dropbtn
               
            </div>

        </div>
      
       <div className="h-full">

        <div className="h-full flex flex-col" id="headlessui-tabs-panel-:ru:" >

            <div className="h-full">
             <div className="h-full grid place-items-center">
                <div className="text-center space-y-6 flex flex-col items-center">

                 <div className="h-24 w-24">

                    {/* <img alt="Assigned issues" loading="lazy" width="94" height="94" decoding="async" data-nimg="1" className="w-full h-full" src=" " style={{color: "transparent"}}/> */}
                </div>
                <p className="text-sm font-medium text-custom-text-300 whitespace-pre-line">Issues assigned to you that are pending will show up here.</p>
        </div>
       </div>

    </div>   
    </div>
    </div>
    </div>


   
  );
};

export default Issuestate;