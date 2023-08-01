import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";


const authContext = createContext();

export default function useAuth(){
    return useContext(authContext);
}

export function AuthProvider(props){
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const loginWithPassword = async()=>{
        const {error, user} = AuthService.handleSignIn
        setUser(user ?? null);
        setError(error ?? "");
    };

    const signUpWithPassword = async()=>{
        const {error, user} = AuthService.handleSignUp();
        setUser(user ?? null);
        setError(error ?? "");
    };

    const logout = async()=>{
        AuthService.handleSignOut();
        setUser(null);
    };

    const value={ user, error, loginWithPassword, signUpWithPassword, logout, setUser};

    return <authContext.Provider value={value} {...props}/>
}