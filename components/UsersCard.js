import React from "react";

const UsersCard = ({ avatarUrl, name, latestMessageText, time, type }) => {
  return (
    <div className='flex flex-col md:flex-row items-center p-4 border-b border-gray-500 relative hover:cursor-pointer '>
        <div className='flex-shrink-0 mr-4 relative '>
            <div className="w-12 h-12 rounded-full overflow-hidden ">
                <img src={avatarUrl} alt="avatar" className='w-full h-full object-cover ' />
            </div>
        </div>
        {
            type==='chat' && (
                <>
                <div className='flex-1 '>
                    <div className="flex items-center justify-between ">
                        <h2 className='text-md md:text-lg font-semibold '>{name}</h2>
                        <span className='text-xs text-gray-500 '>{time}</span>
                    </div>
                    <p className='text-sm text-gray-500 truncate'>
                        {latestMessageText}
                    </p>
                </div>
                </>
            )
        }
         {
            type==='user' && (
                <>
                <div className='flex-1 '>
                    <div className="flex items-center justify-between ">
                        <h2 className='text-md md:text-lg font-semibold '>{name}</h2>             
                    </div>
                
                </div>
                </>
            )
        }
    </div>
  )
};

export default UsersCard;