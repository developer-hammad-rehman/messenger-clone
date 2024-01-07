import getConversationById from "@/app/action/getConversationById"
import getMessages from "@/app/action/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header  from "../Header";
import Body from "./Body";
import Form from "./Form";
interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId)
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full ">
      <div className="h-full flex flex-col">
       {/* @ts-ignore */}
        <Header  conversation={conversation}/>
        <Body/>
        <Form/>
      </div>
    </div>
  );
}

export default ChatId;