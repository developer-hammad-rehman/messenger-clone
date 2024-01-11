import React from 'react'
import { LuLoader2 } from "react-icons/lu";
const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <LuLoader2 className="animate-spin text-sky-500 mx-auto my-auto" size={70}/>
    </div>
  )
}

export default Loading