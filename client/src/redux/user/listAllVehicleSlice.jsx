import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAllVehicles :[],
    singleVehicleDetail:''
}

const listAllVehicles = createSlice({
    name:"userListVehicles",
    initialState,
    reducers:{
        showVehicles:(state,action)=> {
            state.userAllVehicles = action.payload
        },
        setVehicleDetail:(state,action)=> {
            state.singleVehicleDetail = action.payload
        }
    }
   


})
export const  {showVehicles,setVehicleDetail} =  listAllVehicles.actions
export default listAllVehicles.reducer