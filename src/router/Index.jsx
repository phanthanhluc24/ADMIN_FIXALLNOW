import React from 'react'
import { Login } from '../components/auth/Login'
import { NavBar } from '../components/home/NavBar'

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
                path:"/repairman",
                element:""
            },
            {
                path:"/repairman_finder",
                element:""
            },
            {
                path:"/service",
                element:""
            }
        ]
    }
]