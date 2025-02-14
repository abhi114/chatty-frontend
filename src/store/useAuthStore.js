import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingIn:false,
    isUpdatingProfile:false,
    checkAuth:async()=>{
        try {
            const response = await axiosInstance.get("/auth/check");
            set({authUser:response.data})
        } catch (error) {
            console.log("error in checkAuth:",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async (data)=>{
        set({isSigningUp:true});
        try {
          const res =   await axiosInstance.post("/auth/signup",data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },
    logout:async ()=>{
        try {
            await axiosInstance.post("auth/logout");
            set({authUser:null});
            toast.success("Logged out Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))