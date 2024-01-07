'use client'
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'
interface IUserList{
    items:User[]
}
const UserList = ({items}:IUserList ) => {
  return (
    <aside className='fixed inset-0 pb-20 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0 '>
   <div className='px-5 '>
   <div className='flex-col'>
    <div className='text-2xl font-bold text-neutral-800 py-4 '>
        People
    </div>
   </div>
   {items.map((items) => (
       <UserBox key={items.id} data={items} />
   ))}
   </div>
    </aside>
  )
}

export default UserList