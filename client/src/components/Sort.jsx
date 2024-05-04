import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { setData, setPriceHightoLow, setPriceLowtoHigh, setYearAscending, setYearDecending } from "../redux/user/sortfilterSlice";

const Sort = () => {
  const {userAllVehicles} = useSelector(state => state.userListVehicles)
  const dispatch = useDispatch();
  const { handleSubmit, control  } = useForm();

  const handleInputChange = (e) => {

    if (e === "undefined") {
      dispatch(setData(userAllVehicles))
    }
    else if(e === "lowtohigh"){
        dispatch(setPriceLowtoHigh())
    }
    else if(e ===  "hightolow"){
        dispatch(setPriceHightoLow())
    }
    else if(e === "yearAscending"){
        dispatch(setYearAscending())
    }
    else if(e === "yearDecending"){
        dispatch(setYearDecending())
    }

    




  };

  useEffect(()=> {
    dispatch(setData(userAllVehicles))
  },[])

  return (
    <div className=" drop-shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="price"
                  select
                  label="Price"
                  error={Boolean(field.value == "")}
                  sx={{ m: 1, width: 150 ,borderRadius:"400px"}}
                  
                  onChange={(event) => {
                    field.onChange(event); // Trigger react-hook-form's onChange function
                    handleInputChange(event.target.value); // Custom function to handle select change
                  }}
                >
                  <MenuItem className="bg-gray-100">None</MenuItem>
                  <MenuItem value={"lowtohigh"}>Low to High</MenuItem>

                  <MenuItem value={"hightolow"}>High to Low</MenuItem>
                </TextField>
              )}
            ></Controller>

            <Controller
              control={control}
              name="year"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="year"
                  select
                  label="Year"
                  error={Boolean(field.value == "")}
                  sx={{ m: 1, width: 150 }}
                  onChange={(event) => {
                    field.onChange(event); // Trigger react-hook-form's onChange function
                    handleInputChange(event.target.value); // Custom function to handle select change
                  }}
                >
                  <MenuItem className="bg-gray-100" >None</MenuItem>
                  <MenuItem value={"yearAscending"}>low to high</MenuItem>

                  <MenuItem value={"yearDecending"}>high to low</MenuItem>
                </TextField>
              )}
            ></Controller>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sort;
