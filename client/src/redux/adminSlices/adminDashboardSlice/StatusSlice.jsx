import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    adminEditVehicleSuccess:false,
    adminEditVehicleError:false,
    adminEditVehicleLoading:false,
}

export const StatusSlice = createSlice({
    name: "statusSlice",
    initialState: initialState,
    reducers: {
      setadminEditVehicleSuccess: (state, action) => {
        state.adminEditVehicleSuccess = action.payload;
      },
      clearAdminVehicleToast: (state) => {
        state.adminEditVehicleSuccess = false;
        state.adminEditVehicleError = false;
      },
     
    },
  });
  
  export const {setadminEditVehicleSuccess,clearAdminVehicleToast } = StatusSlice.actions;
  export default StatusSlice.reducer;
  