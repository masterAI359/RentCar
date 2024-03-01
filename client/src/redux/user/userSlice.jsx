import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    isLoading:false,
    isError:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart : (state) => {
            state.isLoading = true;
        },
        signInSuccess : (state , action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.isError = false
        },
        signInFailure : (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        },
        deleteUserStart:(state)=> {
            state.isLoading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null,
            state.isLoading  = false,
            state.isError = false
        },
        deleteUserFailure : (state,action)=> {
            state.isLoading = false
            state.isError = action.payload
            
        },
        signOut:(state)=> {
            state.currentUser = null
            state.isLoading=false
            state.isError = false
        }
    }

})

export const {
    signInFailure,
    signInStart,
    signInSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOut,

} = userSlice.actions

export default userSlice.reducer