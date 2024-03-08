"use client"
import React, { FC } from 'react'
import { Compass, Layout } from 'lucide-react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
import { RouteList } from '@/constants/sidebar'



type Props = {
  dashboardLink?: string,
  isDisabled?: boolean
}
const SidebarRoutes:FC<Props> = (props) => {
   
  const {dashboardLink, isDisabled} = props

    const routes = RouteList

    const dashboardItem = RouteList.find((route) => route.label === 'Dashboard');
    if (dashboardItem) {
      dashboardItem.href = `/workspaces/${dashboardLink}`;
    }
  
    
  return (
    <div className='flex flex-col w-full'>
        {
            routes.map((route) => (
                <SidebarItem
                key = { route.href }
                icon = { route.icon }
                label = { route.label }
                href = { route.href }
                />
            ))
        }
    </div>
  )
}

export default SidebarRoutes