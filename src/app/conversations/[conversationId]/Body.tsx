"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
// import axios from "axios";
import { find } from "lodash";
import { pusherClient } from "@/lib/pusher";

interface BodyProps{
  initialMessages:FullMessageType[]
  id: string
}
const Body = ({initialMessages , id} :BodyProps) => {
  const [messages , setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {conversationId} = useConversation()
  // useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`);
  // }, [conversationId]);
   useEffect(() =>{
    pusherClient.subscribe(id)
    bottomRef?.current?.scrollIntoView();
        // @ts-ignore
    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };
  

    pusherClient.bind('messages:new', messageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId as string)
      pusherClient.unbind('messages:new', messageHandler)
    }
   })  
  return( 
  <div className="flex-1 overflow-y-auto">
    {messages.map((message , i) => (
     <MessageBox isLast={i == messages.length - 1} key={message.id} data={message}/>
    ))}
   <div ref={bottomRef} className="pt-24"/>
    </div>
    );
};

export default Body;
