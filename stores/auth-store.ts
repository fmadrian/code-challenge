import { create } from 'zustand'
import {AuthStore} from "@/types/authStore.type";
/**
 * Store handles authentication state.
 * Whether a user is logged in, who is logged in and a list of the available users.
 */
export const useAuthStore = create<AuthStore>((set) => ({
    loggedIn: false,
    user:{
        name: '',
        password: ''
    },
    availableUsers: [
        {name: 'user1', password: '123'},
        {name: 'user2', password: '123'},
        {name: 'user3', password: '123'},
    ],

    login: (name: string, password:string) => set((state) => ({
        loggedIn: state.availableUsers.find(user => user.name === name && user.password === password) !== undefined,
        user: state.availableUsers.find(user => user.name === name && user.password === password) ? {
            name,
            password
        } : {
            name: '',
            password: ''
        }
    })),
    logout: () => set({
        loggedIn: false,
        user:{
            name: '',
            password: ''
        }
    }),
}))