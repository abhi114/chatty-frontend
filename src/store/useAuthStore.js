import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

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
    }
}))