import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
    isActiveMenu:true,
};

export const adminDashboardSlice = createSlice({
    name: "adminDashboardSlice",
    initialState,
    reducers: {
        hideSidebar: (state) => {
           state.isActiveMenu=false
        },

        

    }
});

export const { showSidebar } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
