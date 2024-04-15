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

//reducers
import {
  setLocationsOfDistrict,
  setSelectedDistrict,
} from "../../redux/user/selectRideSlice";

const CarSearch = () => {
  const { handleSubmit, control } = useForm();
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

  const hanldeData = (data) => {
    try {
      if (data) {
        console.log(data)
        
      }  
    } catch (error) {
      console.log(error);
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
          <div className="book-content sm:px-[0px] md:px-[55px] ">
            <div className="book-content__box">
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
                      <IconMapPinFilled className="input-icon"/> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name="pickup_district"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="pickup_district"
                          className="p-2 capitalize"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            dispatch(setSelectedDistrict(e.target.value));
                          }}
                        >
                          <option value="">Select a Place</option>
                          {uniqueDistrict.map((cur, idx) => (
                            <option value={cur} key={idx}>
                              {cur}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div className="box-form__car-type">
                    <label htmlFor="pickup_location">
                      <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name="pickup_location"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="pickup_location"
                          className="md:mb-10 capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">Select a specific location</option>
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict
                            ? locationsOfDistrict.map(
                                (availableLocations, idx) => (
                                  <option value={availableLocations} key={idx}>
                                    {availableLocations}
                                  </option>
                                )
                              )
                            : uniqueDistrict.map((cur, idx) => (
                                <option value={cur} key={idx}>
                                  {cur}
                                </option>
                              ))}
                        </select>
                      )}
                    />
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
                        <select
                          {...field}
                          id="dropoff_location"
                          className="md:mb-10 capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">
                            Select a specific location to dropoff
                          </option>
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict
                            ? locationsOfDistrict.map(
                                (availableLocations, idx) => (
                                  <option value={availableLocations} key={idx}>
                                    {availableLocations}
                                  </option>
                                )
                              )
                            : ""}
                        </select>
                      )}
                    />
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
                              label="when you want to pickup the vehicle"
                              {...field}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
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
                              label="when will you return the vehicle"
                             
                              {...field}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                  </div>


                  <button type="submit" className="book-content__box_button"   >Search</button>
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
