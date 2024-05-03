import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    price:0,
    data:null
}


const sortfilterSlice = createSlice({
  name: "sortfilterSlice",
  initialState,
  reducers: {
    userData:(state,action)=> {
        state.data = action.payload
    },
    setPriceLowtoHigh: (state) => {
      state.data = state.data.sort((a,b)=> a.price - b.price)
    },
    setPriceHightoLow:(state) => {
        state.data = state.data.sort((a,b) => b.price - a.price)
    },
    setYearAscending:(state) => {
        state.data = state.data.sort((a,b)=> a.year_made - b.year_made)
    },
    setYearDecending:(state) => {
        state.data = state.data.sort((a,b)=> b.year_made - a.year_made)
        console.log(state.data.year_made)
    }
  },
});


export const { setPriceLowtoHigh,setPriceHightoLow,setYearAscending,setYearDecending,userData } = sortfilterSlice.actions;
export default sortfilterSlice.reducer;
