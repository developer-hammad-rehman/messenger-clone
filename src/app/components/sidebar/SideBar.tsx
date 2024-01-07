import getCurrentUser from "@/app/action/getCurrentUser";
import DeskTopSideBar from "@/app/users/component/DeskTopSideBar";
import MobileFooter from "@/app/users/component/MobileFooter";

export default async function SideBar({children} : {children : React.ReactNode}){
const currentUser = await getCurrentUser()
return(
    <div className="h-full">
        <DeskTopSideBar currentUser={currentUser!}/>
        <MobileFooter/>
       <main className="lg:pl-20 h-full">
       {children}
       </main>
    </div>
)
}