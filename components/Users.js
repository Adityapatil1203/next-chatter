"use client";
import { useEffect, useState } from "react";
import { firestore, app } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import UsersCard from "./UsersCard";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Users = ({ userData, setSelectedChatroom }) => {
  const [activeTab,setActiveTab] = useState('users')
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
   const [users,setUsers] = useState([])
   const [userChatrooms,setUserChatrooms] = useState([])
   const auth = getAuth(app)
   const router = useRouter()


    const handleTab=(tab)=>{
        setActiveTab(tab)
    }

  //get all user
  useEffect(()=>{
   setLoading(true)
   const taskQuery = query(collection(firestore,'users'))
   const unsubscribe = onSnapshot(taskQuery,(querySnapshot)=>{
      const users = querySnapshot.docs.map((doc)=>(
         {
            id:doc.id,
            ...doc.data()
         }
      ));
      setUsers(users)
      setLoading(false)
   })

   return unsubscribe;

  },[])

  console.log(users);

  const handleLogout = ()=>{
   signOut(auth).then(()=>{
     toast.success('Logout successful')
     router.push('/login')
   }).catch((err)=>{
      toast.error(err.message)
   })
  }

  //get users chatrooms
  useEffect(() => {
   setLoading2(true)
   if(!userData)
   {
      return;
   }

  const chatroomsQuery = query(collection(firestore,'chatrooms'),where('users','array-contains',userData?.id))

   const unsubscribe = onSnapshot(chatroomsQuery,(querySnapshot)=>{
      const chatrooms = querySnapshot.docs.map((doc)=>({
         id:doc.id,
         ...doc.data()
      }));
      setUserChatrooms(chatrooms)
      setLoading2(false)
   })

   return unsubscribe;

  }, [userData])

  console.log(userChatrooms);
  

  //chat creation
  const createChat = async (user)=>{
      //check if chatroom already exist
      const existingChatroom = query(collection(firestore,'chatrooms'),where('users','==',[userData.id,user.id]))

      try {
         const existingChatroomSnapshot = await getDocs(existingChatroom)
         if(existingChatroomSnapshot.docs.length > 0)
         {
            toast.error('Chatroom already exists')
            return
         }

         //chatroom doesnt exist
         const userDataObj = {
            [userData.id]:userData,
            [user.id]:user
         }

        

         const chatroomData = {
            users:[userData.id,user.id],
            userData:userDataObj,
            timestamp:serverTimestamp(),
            lastMessage:null
         }

         const chatroomRef = await addDoc(collection(firestore,'chatrooms'),chatroomData);
         console.log('chatroom created with id ',chatroomRef.id);
         setActiveTab('Chatrooms')

      } catch (error) {
         toast.error(error.message)
      }
  
   }


   //open chat
   const openChat = (chatroom)=>{
      const data ={
         id:chatroom.id,
         myData:userData,
         otherData:chatroom.userData[chatroom.users.find((id)=>id!==userData?.id)]
      }
      setSelectedChatroom(data)
   }

  return (
    <div className='shadow-lg h-screen overflow-auto mt-4 mb-20 '>
     <div className='flex flex-col p-4 gap-2 '>
        <button onClick={()=>handleTab('users')} className={`btn btn-outline ${activeTab==='users'?'btn-primary':''}`}>
            Users
        </button>
        <button onClick={()=>handleTab('Chatrooms')} className={`btn btn-outline ${activeTab==='Chatrooms'?'btn-primary':''}`}>
            Chatroom
        </button>
        <button onClick={handleLogout} className={`btn btn-outline`}>
           Logout
        </button>
     </div>
   <div>
     {
        activeTab==="Chatrooms" && (<>
         <h1 className='px-4 text-base font-bold '>ChatRooms</h1>
         {
            userChatrooms.map((chatroom)=>(
               <div key={chatroom.id} onClick={()=>{openChat(chatroom)}} >
                   <UsersCard 
                   name={chatroom.userData[chatroom.users.find((id)=>id!==userData?.id)].name}
                   avatarUrl={chatroom.userData[chatroom.users.find((id)=>id!==userData?.id)].avatarUrl}
                  latestMessageText = {chatroom.lastMessage}
                   type={'chat'}
                  />
               </div>
            ))
         }
        
        </>
        )
     }
  </div>   

  <div>
     {
        activeTab==="users" && (<>
         <h1 className='px-4 text-base font-bold my-3'>Users</h1>
       
         {
            
            loading ?
             <div>
               <div className="flex  gap-4 w-52">
                   <div className="skeleton ml-2 h-10 w-10"></div>
                  <div className="skeleton h-6 w-full"></div>
               </div>
               <div className="flex  gap-4 w-52">
                   <div className="skeleton ml-2 h-10 w-10"></div>
                  <div className="skeleton h-6 w-full"></div>
               </div>
               <div className="flex  gap-4 w-52">
                   <div className="skeleton ml-2 h-10 w-10"></div>
                  <div className="skeleton h-6 w-full"></div>
               </div>
               <div className="flex  gap-4 w-52">
                   <div className="skeleton ml-2 h-10 w-10"></div>
                  <div className="skeleton h-6 w-full"></div>
               </div>
              </div>:
            users.map((user)=>(
               user.id !== userData?.id 
               &&
               <div className='' key={user.id} onClick={()=>{createChat(user)}} >
               <UsersCard 
               key={user.id}
               name={user.name}
               avatarUrl={user.avatarUrl}
               type='user'
              />
              </div>
            ))
         }
        
        
        </>
        )
     }
     </div>  
    </div>
  )
};

export default Users;