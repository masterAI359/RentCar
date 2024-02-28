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
        }
    }

})

export const {signInFailure,signInStart,signInSuccess} = userSlice.actions

export default userSlice.reducer