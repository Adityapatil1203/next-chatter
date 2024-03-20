import React from "react";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { doc ,deleteDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

const MessageCard = ({ message, me, other }) => {
  const isMessageFromMe = message.sender === me?.id;

    console.log("message ",message);

    const timeAgo = (time)=>{
      const date = time?.toDate();
      const momentDate = moment(date)
      return momentDate.fromNow()
    }

    const handleDelete =async ()=>{
      if (typeof window !== 'undefined') {
        // Code that uses window
        const confirmed = window.confirm('Are you sure you want to delete this message? This action cannot be undone.');
        if (!confirmed) {
          return; // If user cancels, do nothing
        }
    }
     
      try {
        const messageRef = doc(firestore, 'messages', message.id);
        await deleteDoc(messageRef);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    };


  return (
    <div className={`flex mb-4 ${isMessageFromMe?'justify-end':'justify-start'} `}>
        <div className={`flex gap-2 ${isMessageFromMe?'md:ml-2 ml-1 md:mr-2 mr-1 ':'md:mr-2 mr-1'} `}>
          {
            !isMessageFromMe && (
              <img src={other.avatarUrl}
              alt="avatar"            
             className='md:h-11 h-9 md:w-11 w-9 rounded-full object-cover '
              />
            )
          }
          {
            isMessageFromMe && (
              <img src={me.avatarUrl}
              alt="avatar"            
             className='md:h-11 h-9 md:w-11 w-9 rounded-full object-cover '
              />
            )
          }
           

            <div className={`text-white md:p-2 p-1 rounded-md ${isMessageFromMe?'bg-blue-500 self-end':'bg-[#19D39E] self-start'} `}>
              {
                message.image && (
                  <img 
                  src={message.image} 
                  alt="image"
                  className='md:w-60 w-50 md:h-40 h-20 object-cover rounded-md '
                  />
                )
              }
                <p className='md:text-xl text-xs'>{message.content}</p>
                <div className="text-xs text-gray-300">{timeAgo(message.time)}</div>
                {isMessageFromMe && (
                    <button onClick={handleDelete} className="ml-2 mt-2 text-xl text-red-500 cursor-pointer">
                      <FaTrash />
                    </button>
                  )}
              
            </div>
           
        </div>
    </div>
  )
};

export default MessageCard;