'use client'
import useRoutes from "@/app/hooks/useRoutes"
import { useState } from "react"
import DeskTopIcons from "./DeskTopIcons"
import { User } from "@prisma/client"
import Avatar from "@/app/components/sidebar/Avatar"
interface IDeskTopSideBarProps{
  currentUser: User
}
const DeskTopSideBar = ({currentUser}:IDeskTopSideBarProps) => {
  const routes = useRoutes()
 const [isOpen , setIsOpen]= useState(false)
 console.log({currentUser} ,'TEST')
  return (
    <div className="hidden lg:fixed lg:inset-0 lg:z-40 lg:left-0 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
    <ul role="list" className="flex flex-col items-center space-y-1">
 {routes.map((items) => {
   return(
    <DeskTopIcons key={items.label} href={items.href} active={items.active} onClick={items.onClick} label={items.label} icons={items.icon}/>
   )
 })}
    </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div className="cursor-pointer hover:opacity-75 transition" onClick={() => setIsOpen(true)}>
      <Avatar user={currentUser}/>
        </div>
      </nav>
    </div>
  )
}

export default DeskTopSideBar