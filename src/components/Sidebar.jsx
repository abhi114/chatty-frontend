import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';

export const Sidebar = () => {
   const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading} =useChatStore();
   const onlineUsers = [];
   useEffect(()=>{
        getUsers();
   },[getUsers])
   if(true) return <SidebarSkeleton/>
  return (
    <div>Sidebar</div>
  )
}
