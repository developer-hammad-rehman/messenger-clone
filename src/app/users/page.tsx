import EmptyState from "../components/EmptyState"
import getSession from "../action/getSession"
import { redirect } from "next/navigation"
const Users = async () => {
  const res = await getSession()
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState/>
      {res == null ? redirect('/'):null}
    </div>
  )
}

export default Users