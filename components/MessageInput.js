import React, { useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  sendMessage,
  message,
  setMessage,
  image,
  setImage,
}) => {
  const storage = getStorage(app)
  const [file,setFile] = useState(null)
  const [uploadProgress,setUploadProgress] = useState(null)
  const [imagePreview,setImagePreview] = useState(null)
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    if(file){
      setFile(file)
      const reader = new FileReader();
      reader.onloadend = ()=>{
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }


  const handleUpload = async ()=>{
    if(!file){
      return;
    }

    const storageRef = ref(storage,`chatroom_images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setUploadProgress(progress)
    },(error)=>{
      console.log(error);
    },()=>[
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImage(downloadURL)
        setUploadProgress(null)
        setImagePreview(null)
        document.getElementById('my_modal_3').close()
      })
    ]
    )
  }


  const handleEmojiClick = (emojiData,event)=>{
    setMessage((prevMessage)=>prevMessage+emojiData.emoji)
  }


  return (
    <div className='flex items-center p-4 border-gray-300 '>
       {/* attach file */}
       <FaPaperclip onClick={()=>{document.getElementById('my_modal_3').showModal()}} className={`  ${image? 'text-blue-500':"text-gray-500 "} mr-2 cursor-pointer `} />

        {/* emoji picker */}
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        😊
        {console.log("show ",showEmojiPicker)}
      </button>

       {/* input */}
       <input
        type="text"
        value={message}
        placeholder='Type a message'
         className='flex-1 w-full border-none p-2 outline-none'
         onChange={(e)=>setMessage(e.target.value)}
          />

       <FaPaperPlane onClick={()=>sendMessage()} className="text-gray-500 ml-2 cursor-pointer " />

       {showEmojiPicker && (
        <div className='right-0 bottom-full p-2'>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            disableAutoFocus={true}
          />
        </div>
      )}

        {/* Image Upload Modal */}
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            {imagePreview && <img src={imagePreview} alt='Uploaded' className='max-h-60 w-60 mb-4' />}
            <input type='file' accept='image/*' onChange={handleFileChange} />
            <div onClick={()=>{handleUpload()}} className='btn btn-sm btn-primary'>
              Upload
            </div>
            <progress value={uploadProgress} max='100'></progress>
          </form>
                {typeof window !== 'undefined' && (
            <button
              onClick={() => document.getElementById('my_modal_3').close()}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
          )}
        </div>
      </dialog>

    </div>
  )
};

export default MessageInput;