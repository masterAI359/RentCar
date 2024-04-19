import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorVehilces : []
}

export const VendorDashboardSlice = createSlice({
    name: "modelDataSlice",
    initialState: initialState,
    reducers: {
      setVenodrVehilces: (state, action) => {
        state.vendorVehilces = action.payload;
      }
    },
  });
  
  export const { setVenodrVehilces } = VendorDashboardSlice.actions;
  export default VendorDashboardSlice.reducer;
  