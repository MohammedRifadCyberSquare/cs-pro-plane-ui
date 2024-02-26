import { Layout, CheckCircle, BarChart2, Columns4Icon, Bell,LayoutGrid } from "lucide-react";

export const RouteList = [
    {
        icon: LayoutGrid,
        label: 'Dashboard',
        href: '/'
    },
    {
        icon: BarChart2,
        label: 'Analytics',
        href: '/analytics'
    },
    // {
    //     icon: Columns4Icon,
    //     label: 'Analytics',
    //     href: '/search'
    // },
    {
        icon: CheckCircle,
        label: 'All Issues',
        href: '/issues'
    },
    {
        icon: Bell,
        label: 'Notifications',
        href: '/notification'
    }
]
 