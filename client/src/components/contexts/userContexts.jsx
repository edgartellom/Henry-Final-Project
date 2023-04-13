import React, { useState, useContext, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const[user,setUser]=useState(null);

   useEffect(() => {
      onAuthStateChanged(auth, currentUser =>{
        //setUser(currentUser);
         if (currentUser) setUser(currentUser);
         if (!currentUser) setUser(null);
      })
    
    
    }, []) 

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext=()=>{
    const context=useContext(UserContext);
    if(!context) throw new Error("useUserContext must be used within a UserContextProvider");
    return context;
}
