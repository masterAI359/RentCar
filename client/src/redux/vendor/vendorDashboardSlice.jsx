import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorVehilces : [],
    vendorVehicleApproved:[]
}

export const VendorDashboardSlice = createSlice({
    name: "modelDataSlice",
    initialState: initialState,
    reducers: {
      setVenodrVehilces: (state, action) => {
        state.vendorVehilces = action.payload;
      },
      setUniqueVal:(state,action)=> {
        state.vendorVehicleApproved.push({_id:action.payload,status:false})
      },
      setApproveVendorVehilce:(state,action) => {
        state.vendorVehicleApproved = action.payload
      },
      setRejectVendorVehicle:(state,action) => {
        state.vendorVehicleApproved = action.payload
      }
    },
  });
  
  export const { setVenodrVehilces , setApproveVendor , setRejectVendor , setUniqueVal } = VendorDashboardSlice.actions;
  export default VendorDashboardSlice.reducer;
  