"use client";
import React from 'react'

import {Accordion, AccordionItem} from "@nextui-org/accordion";

export { Select } from "@nextui-org/select";
import { Settings } from "lucide-react";
import { Contrast } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Layers3 } from 'lucide-react';
import { FileVideo } from 'lucide-react';
import { Dice4 } from 'lucide-react';
import { Avatar } from '@nextui-org/react';
import { ReactSVG } from 'react';

const ProjectsList: React.FC = () => {
  const content="test project"
  const Accordionitems: { icon: JSX.Element, title: string }[] = [
    
    { icon: <Layers3 size={20}/>, title: "Issues" },
    { icon: <Contrast size={20}  />, title: "Cycles" },
    { icon: <Dice4 size={20}/>, title: "Modules" },
    { icon: <FileVideo size={20}/>, title: "Views" },
    { icon: <FileText size={20}/>, title: "Pages" },
    { icon: <Settings size={20}/>, title: "Settings" }
  ];

  return (
    <>
    <h3 className='text-muted-foreground '>Your Projects</h3>

      <Accordion className="text-sm ">
      <AccordionItem title="test project">
       <Accordion className=" text-xs ">
       {
       Accordionitems.map((item, index )=> (
          <AccordionItem key={index} title={item.title}
          startContent={item.icon}
         hideIndicator={true}
        
         />    
        ))}

      </Accordion>
       </AccordionItem>
    </Accordion>

{/* <Accordion className="text-sm ">
<AccordionItem title="Your project">
 <Accordion className=" text-xs ">
 {
 Accordionitems.map((item, index )=> (
    <AccordionItem key={index} title={item.title}
    startContent={item.icon}
   hideIndicator={true}
  
   />    
  ))}

</Accordion>
 </AccordionItem>
</Accordion> */}
</>
  );
}

   
export default ProjectsList;