import {
  IconCalendarEvent,
  IconMapPinFilled,
  IconX,
} from "@tabler/icons-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelData } from "../admin/components/AddProductModal";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

//reducers
import {
  setAvailableCars,
  setLocationsOfDistrict,
  setSelectedDistrict,
} from "../../redux/user/selectRideSlice";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setSelectedData } from "../../redux/user/BookingDataSlice";

const schema = z.object({
  dropoff_location: z.string().min(1, { message: "Dropoff location needed" }),
  pickup_district: z.string().min(1, { message: "Pickup District needed" }),
  pickup_location: z.string().min(1, { message: "Pickup Location needed" }),

  pickuptime: z.object(
    {
      $L: z.string(), // Language code
      $d: z.date(), // Date object
      $y: z.number(), // Year
      $M: z.number(), // Month (0-indexed)
      $D: z.number(), // Day of month
      $W: z.number(), // Day of week (0-indexed, starting from Sunday)
      $H: z.number(), // Hour
      $m: z.number(), // Minute
      $s: z.number(), // Second
      $ms: z.number(), // Millisecond
      $isDayjsObject: z.boolean(), // Indicator for Day.js object
    },
    { message: "pickup time is required" }
  ),

  dropofftime: z.object(
    {
      $L: z.string(), // Language code
      $d: z.date(), // Date object
      $y: z.number(), // Year
      $M: z.number(), // Month (0-indexed)
      $D: z.number(), // Day of month
      $W: z.number(), // Day of week (0-indexed, starting from Sunday)
      $H: z.number(), // Hour
      $m: z.number(), // Minute
      $s: z.number(), // Second
      $ms: z.number(), // Millisecond
      $isDayjsObject: z.boolean(), // Indicator for Day.js object
    },
    { message: "drop-off time is required" }
  ),
});

const CarSearch = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { districtData } = useSelector((state) => state.modelDataSlice);
  const uniqueDistrict = districtData.filter((cur, idx) => {
    return cur !== districtData[idx + 1];
  });
  const { selectedDistrict, wholeData, locationsOfDistrict } = useSelector(
    (state) => state.selectRideSlice
  );
  const dispatch = useDispatch();

  //useEffect to fetch data from backend for locations
  useEffect(() => {
    fetchModelData(dispatch);
  }, []);

  //for showing appropriate locations according to districts
  useEffect(() => {
    if (selectedDistrict !== null) {
      const showLocationInDistrict = wholeData
        .filter((cur) => {
          return cur.district === selectedDistrict;
        })
        .map((cur) => cur.location);
      dispatch(setLocationsOfDistrict(showLocationInDistrict));
    }
  }, [selectedDistrict]);

  //search cars
  const hanldeData = async (data) => {
    try {
      if (data) {
        navigate("/availableVehicles");

        //preserving the selected data for later use
        dispatch(setSelectedData(data))
       

        const res = await fetch("api/user/searchCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if(res.ok){
          const result = await res.json();
          dispatch(setAvailableCars(result))
          console.log("success", result);
        }
        


        if (res.ok) {
          reset({
            pickuptime: null, // Reset pickuptime to null
            dropofftime: null, // Reset dropofftime to null
          });

          const pickupDistrictElement =
            document.getElementById("pickup_district");
          const pickupLocationElement =
            document.getElementById("pickup_location");
          const dropoffLocationElement =
            document.getElementById("dropoff_location");

          if (pickupDistrictElement) {
            pickupDistrictElement.innerHTML = "";
          }
          if (pickupLocationElement) {
            pickupLocationElement.innerHTML = "";
          }
          if (dropoffLocationElement) {
            dropoffLocationElement.innerHTML = "";
          }
        }
      }
    } catch (error) {
      console.log("Error  : ", error);
    }
  };

  return (
    <>
      <section
        id="booking-section"
        className="book-section relative z-10 mt-[50px]  mx-auto max-w-[1500px] bg-white"
      >
        {/* overlay */}

        <div className="container bg-white">
          <div className="book-content   ">
            <div className="book-content__box ">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <IconX width={20} height={20} />
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <IconX width={20} height={20} />
              </p>

              <form onSubmit={handleSubmit(hanldeData)}>
                <div className="box-form">
                  <div className="box-form__car-type">
                    <label htmlFor="pickup_district">
                      <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name="pickup_district"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="pickup_district"
                          className="p-2 capitalize"
                          select
                          // required
                          error={Boolean(errors.pickup_district)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            dispatch(setSelectedDistrict(e.target.value));
                          }}
                        >
                          <MenuItem value="">Select a Place</MenuItem>
                          {uniqueDistrict.map((cur, idx) => (
                            <MenuItem value={cur} key={idx}>
                              {cur}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    {errors.pickup_district && (
                      <p className="text-red-500">
                        {errors.pickup_district.message}
                      </p>
                    )}
                  </div>

                  <div className="box-form__car-type ">
                    <label htmlFor="pickup_location">
                      <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name="pickup_location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="pickup_location"
                          select
                          // required
                          className="md:mb-10 capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                          error={Boolean(errors.pickup_location)}
                        >
                          <MenuItem value="">
                            Select a specific location
                          </MenuItem>
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict &&
                            locationsOfDistrict.map(
                              (availableLocations, idx) => (
                                <MenuItem value={availableLocations} key={idx}>
                                  {availableLocations}
                                </MenuItem>
                              )
                            )}
                        </TextField>
                      )}
                    />
                    {errors.pickup_location && (
                      <p className="text-red-500">
                        {errors.pickup_location.message}
                      </p>
                    )}
                  </div>

                  <div className="box-form__car-type">
                    <label>
                      <IconMapPinFilled className="input-icon" /> &nbsp; Drop-of{" "}
                      <p className="text-red-500">*</p>
                    </label>

                    <Controller
                      name="dropoff_location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          // required
                          error={Boolean(errors.dropoff_location)}
                          id="dropoff_location"
                          className="md:mb-10 capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <MenuItem value="">
                            Select a specific location
                          </MenuItem>
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict &&
                            locationsOfDistrict.map(
                              (availableLocations, idx) => (
                                <MenuItem value={availableLocations} key={idx}>
                                  {availableLocations}
                                </MenuItem>
                              )
                            )}
                        </TextField>
                      )}
                    />
                    {errors.dropoff_location && (
                      <p className="text-red-500">
                        {errors.dropoff_location.message}
                      </p>
                    )}
                  </div>

                  <div className="box-form__car-time">
                    <label htmlFor="picktime" className="flex items-center">
                      <IconCalendarEvent className="input-icon" /> &nbsp;
                      Pick-up <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name={"pickuptime"}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Pickup time"
                              {...field}
                              value={field.value}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                    {errors.pickuptime && (
                      <p className="text-red-500">
                        {errors.pickuptime.message}
                      </p>
                    )}
                  </div>

                  <div className="box-form__car-time">
                    <label htmlFor="droptime" className="flex items-center">
                      <IconCalendarEvent className="input-icon" /> &nbsp;
                      Drop-of <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name={"dropofftime"}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Dropoff time"
                              {...field}
                              value={field.value}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                    {errors.dropofftime && (
                      <p className="text-red-500">
                        {errors.dropofftime.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="book-content__box_button">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarSearch;
