import React from 'react'
import DashboardHeader from '../_components/workspace-header'
import { BarChart } from 'lucide-react'

const Analytics = () => {
  
  return (
    <div className="h-full">
    <DashboardHeader icon = {BarChart} title="Analytics"/>
    
    </div>
  )
}

export default Analytics