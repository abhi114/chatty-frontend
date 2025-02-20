import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5001";
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers:[],
  socket:null,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("logged in Successfully");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile:true})
    try {
        const res = await axiosInstance.put("/auth/update-profile",data);
        set({authUser:res.data});
        toast.success("Profile Updated Successfully");
    } catch (error) {
        console.log("error in update Profile",error);
        toast.error(error.response.data.message);
    }finally{
        set({isUpdatingProfile:false});
    }
  },
  connectSocket: ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected)return;
      const socket = io(BASE_URL)
      socket.connect()
      set({socket:socket})
  },
  disconnectSocket:()=>{
      if(get().socket?.connected) {
        get().socket.disconnect();
      }
  }
}));