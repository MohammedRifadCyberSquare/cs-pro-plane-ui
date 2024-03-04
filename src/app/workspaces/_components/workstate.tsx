"use client";
import React, { useState } from 'react';
import CustomDropdown from './custom-dropdown';

interface WorkstateProps {
  title: string;
}

const Workstate: React.FC<WorkstateProps> = ({ title }) => {
  
 
  return (
    <div className='bg-[#ffffff] rounded-xl border-[0.5px]  w-full hover:shadow-md duration-300 flex flex-col min-h-96'>

        <div className='flex items-center justify-between gap-2 p-6 pl-7'>
            <a href="#" className='text-lg font-semibold  hover:underline'>      {title}</a>
            <div className='relative w-min text-left font-normal flex-shrink-0'>
               <CustomDropdown dropDownTitle="None" dropDownItems={[]}/>
               
            </div>

        </div>
        <div className='h-full flex flex-col'>
            <div className='px-6'>

            <div className="relative border-[0.5px] rounded  p-[1px] grid" role="tablist" aria-orientation="horizontal" style={{gridTemplateColumns:` repeat(2,1fr)`}}>

                <div className="absolute top-1/2 left-[1px] rounded-[3px] transition-all duration-500 ease-in-out shadow-[2px_0_8px_rgba(167,169,174,0.15)]" style={{height: `calc(100% - 2px)` ,width: `calc(50% - 1px)`, transform: `translate(0%, -50%)`}}> </div>

               <button className="relative z-[1] font-semibold text-xs rounded-[3px] py-1.5 focus:outline-none transition duration-500  " role="tab" type="button" aria-selected="true" >

                      <span className="scale-110">Pending</span>                
                </button>


               <button className="relative z-[1] font-semibold text-xs rounded-[3px] py-1.5 bg-slate-100 focus:outline-none transition duration-500  text-zinc-400 hover:text-zinc-500" role="tab" type="button" aria-selected="false">
    
                    <span className="scale-110">Marked completed</span>
    
                   </button>



                </div>
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

export default Workstate;