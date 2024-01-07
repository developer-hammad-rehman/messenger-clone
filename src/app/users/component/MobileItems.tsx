'use client'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
interface IMobileItemsProps{
    href:string
    icon:any
    onClick?: () => void
    active?:boolean
}
const MobileItems = ({href , icon:Icon , onClick , active}:IMobileItemsProps) => {
    const handleClick = () => {
        if(onClick){
            return onClick()
        }
    }
  return (
    <Link href={href}
    onClick={handleClick}
    className={clsx('group flex gap-x-3 leading-6 text-sm font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100' , active && 'bg-gray-100 text-black')}
    >
        <Icon/>
    </Link>
  )
}

export default MobileItems