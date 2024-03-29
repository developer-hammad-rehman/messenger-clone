import getConversations from "@/app/action/getConversation";
import getUsers from "../action/getUser";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}