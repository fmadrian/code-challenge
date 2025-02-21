import { create } from 'zustand'

/**
 * Definition for a User.
 */
type User = {
    name: string,
    password: string
}
/**
 * Definition for the AuthStore.
 */
type AuthStore = {
    // Is a user logged in?
    loggedIn: boolean,
    // Currently logged-in user's information.
    user: User,
    // List of available users inside application.
    availableUsers: User[],
    // Search a user in the available list, and use its information if the password is correct.
    login : (name: string, password:string) => void,
    // Log out a user and reset state.
    logout : () => void,
};

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