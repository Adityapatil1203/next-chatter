"use client";
import React, { useEffect, useState } from "react";
import { app, firestore } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Users from "@/components/Users";
import ChatRoom from "@/components/ChatRoom";
import { GiHamburgerMenu } from "react-icons/gi";

function page() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [selectedUsers,setSelectedUsers] = useState(true)

  useEffect(() => {
    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setUser(data);
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleUser = ()=>{
    setSelectedUsers(!selectedUsers)
  }

  if (user == null) return <div className="flex h-screen items-center justify-center " > <span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <>

    <div className="flex mt-1 font-bold text-3xl items-center  ">
       <span onClick={handleUser} className="ml-2 hover:cursor-pointer flex w-3/12 " >
         {selectedUsers ? "✕" : <GiHamburgerMenu />}
          </span>
        <span className="flex pl-19 items-center w-9/12 ">Let's Chat</span>
    </div>
    
     {/* <span className="flex mt-1 font-bold text-3xl items-center justify-evenly  sticky  ">
        
      </span> */}
    <div className="flex h-screen">
      
      {/* Left side users */}
    { selectedUsers && <div className="flex-shrink-0 w-4/12">
        <Users userData={user} setSelectedChatroom={setSelectedChatroom} />
      </div>
      }

      {/* Right side chat room */}
      <div className="flex-grow w-8/12">
        {selectedChatroom ? (
          <>
            <ChatRoom user={user} selectedChatroom={selectedChatroom} />
          </>
        ) : (
          <>
            <div className="flex items-center justify-center h-full">
              <div className="text-2xl text-gray-400">Select a chatroom</div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
   
  );
}

export default page;