import {createContext,useContext,useState} from "react";

const stateContext = createContext()

const initialState = {
    chat:false,
    cart:false,
    userProfile:false,
    notification:false,
}

export const ContextProvider = ({children}) => {
    
}
