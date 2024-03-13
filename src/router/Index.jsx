import React from 'react'
import { Login } from '../components/auth/Login'
import { NavBar } from '../components/home/NavBar'
import { Repairman } from '../components/home/Repairman'
import { RepairmanFinder } from '../components/home/RepairmanFinder'
import { Service } from '../components/home/Service'

export const Index = () => [
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/admin/manage",
        element:<NavBar/>,
        children:[
            {
                path:"repairman",
                element:<Repairman/>
            },
            {
                path:"repairman_finder",
                element:<RepairmanFinder/>
            },
            {
                path:"service",
                element:<Service/>
            }
        ]
    }
]