import getUsers from "../action/getUser"
import SideBar from "../components/sidebar/SideBar"
import UserList from "./component/UserList"

export default async function UserLayout({
    children
}:{
    children:React.ReactNode
}){
    const users = await getUsers()
    return(
       <SideBar>
         <div className="h-full">
            {/* @ts-ignore */}
            <UserList items={users}/>
            {children}
        </div>
       </SideBar>
    )
}