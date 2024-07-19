import { defineStore } from "pinia";


export const useAuthUser = defineStore('useAuth',{
    state: () =>({
        isAuthUser:false,
        name:"",
        users:[]
    }),
    actions: {
        setAuthUser(){
            this.isAuthUser = true
        },
        setNotAuthUser(){
            this.isAuthUser = false
        },
       
    }
}) 