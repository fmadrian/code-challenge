import {User} from "@/types/user.type";

/**
 * Definition for the AuthStore.
 */
export type AuthStore = {
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