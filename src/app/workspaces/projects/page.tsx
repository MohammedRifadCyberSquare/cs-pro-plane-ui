import React from 'react'
import DashboardHeader from '../_components/workspace-header'
import { BaggageClaim } from 'lucide-react'

const WorkSpaceProjects = () => {
  return (
    <div className="h-full">
    <DashboardHeader icon = {BaggageClaim} title="Projects"/>
    
    </div>
  )
}

export default WorkSpaceProjects