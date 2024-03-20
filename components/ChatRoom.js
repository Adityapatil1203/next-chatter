import { useState, useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const ChatRoom = ({ user, selectedChatroom }) => {
  console.log("from chatroom ",selectedChatroom);
    const me = selectedChatroom?.myData;
    const other = selectedChatroom?.otherData;
    const chatRoomId = selectedChatroom?.id;

    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([])
    const [image,setImage] = useState(null)
    const messagesContainerRef = useRef(null)

    
    useEffect(() => {
      // Scroll to the bottom when messages change
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, [messages]);

    useEffect(()=>{
        if(!chatRoomId){
            return;
        }
        const unsubscribe = onSnapshot(
            query(collection(firestore, 'messages'),where("chatRoomId","==",chatRoomId),orderBy('time', 'asc')),
            (snapshot) => {
              const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              //console.log(messages);
              setMessages(messages);
            }
          );
        
          return unsubscribe;
    },[chatRoomId])


    const sendMessage =async ()=>{
        const messageCollection = collection(firestore,'messages')
        if(message.trim()==='' && !image)
          return;

        try {

            const newMessage = {
                chatRoomId:chatRoomId,
                sender: me?.id,
                content: message,
                time: serverTimestamp(),
                image: image,
              };


            await addDoc(messageCollection,newMessage)
            setMessage('')
            setImage(null)

            //update chatroom last message
            const chatroomRef = doc(firestore,'chatrooms',chatRoomId)
            await updateDoc(chatroomRef,{
                lastMessage:message?message:'Image',
            })
        } catch (error) {
            console.log(error);
        }

    }

    console.log("image ",image);
   
  return (
    <div className='flex flex-col h-screen '>
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 md:p-10 ">
            {
                messages?.map((message)=>(
                    <MessageCard key={message.id} message={message} me={me} other={other} />
                ))
            }
        </div>
        <MessageInput sendMessage={sendMessage} message={message} setMessage={setMessage} image={image} setImage={setImage} />
    </div>
  )
};

export default ChatRoom;