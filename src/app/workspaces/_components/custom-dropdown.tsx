import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
type Props = {
    dropDownTitle:string,
    
    dropDownItems:[]
}

const CustomDropdown:React.FC<Props> = ({dropDownTitle,dropDownItems}) => {
  return (
   <>
   
<DropdownMenu>
  <DropdownMenuTrigger className="ml-4">{dropDownTitle}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuSeparator />
    {dropDownItems.map((item,index) => ( 
        <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
    ) )}
    
  </DropdownMenuContent>
</DropdownMenu>

   </>
  )
}

export default CustomDropdown