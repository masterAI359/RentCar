import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorVehilces : [],
    vendorVehicleApproved:[],
    adminVenodrRequest:[],
}

export const VendorDashboardSlice = createSlice({
    name: "modelDataSlice",
    initialState: initialState,
    reducers: {
      setVenodrVehilces: (state, action) => {
        state.vendorVehilces = action.payload;
      },
      setUpdateRequestTable:(state,action) =>  {
        state.adminVenodrRequest = state.adminVenodrRequest.filter((cur)=> cur._id !== action.payload)
      },
    
      setadminVenodrRequest:(state,action) => {
        state.adminVenodrRequest = action.payload
      }
    },
  });
  
  export const { setVenodrVehilces , setApproveVendor , setRejectVendor , setUniqueVal,setadminVenodrRequest,setUpdateRequestTable } = VendorDashboardSlice.actions;
  export default VendorDashboardSlice.reducer;
  