import {
  IconCalendarEvent,
  IconMapPinFilled,
  IconX,
} from "@tabler/icons-react";
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

  return (
    <>
      <section
        id="booking-section"
        className="book-section relative z-10 mt-[50px] sm:mt-[-100px] lg:mt-[80px] bg-white"
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

              <form onSubmit={handleSubmit}>
                <div className="box-form">
                  <div className="box-form__car-type">
                    <label htmlFor="company">
                      <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="company"
                          className="p-2 capitalize"
                          onChange={(e) =>
                            dispatch(setSelectedDistrict(e.target.value))
                          }
                        >
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
                    <label>
                      <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <select
                      className="md:mb-10 capitalize"
                      placeholder={"pick up location"}
                      
                    >
                        {/* conditionaly rendering options based on district selected or not */}
                      {locationsOfDistrict
                        ? locationsOfDistrict.map((availableLocations, idx) => (
                            <option value={availableLocations} key={idx}>
                              {Object.keys(availableLocations)+ " : " + Object.values(availableLocations)}
                            
                            </option>
                          ))
                        : uniqueDistrict.map((cur, idx) => (
                            <option value={cur} key={idx}>
                              {cur}
                            </option>
                          ))}
                    </select>
                  </div>

                  <div className="box-form__car-type">
                    <label>
                      <IconMapPinFilled className="input-icon" /> &nbsp; Drop-of{" "}
                      <p className="text-red-500">*</p>
                    </label>
                    <select></select>
                  </div>

                  <div className="box-form__car-time">
                    <label htmlFor="picktime" className="flex items-center">
                      <IconCalendarEvent className="input-icon" /> &nbsp;
                      Pick-up <p className="text-red-500">*</p>
                    </label>
                    <input id="picktime" type="date"></input>
                  </div>

                  <div className="box-form__car-time">
                    <label htmlFor="droptime" className="flex items-center">
                      <IconCalendarEvent className="input-icon" /> &nbsp;
                      Drop-of <p className="text-red-500">*</p>
                    </label>
                    <input id="droptime" type="date"></input>
                  </div>

                  <button type="submit">Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal `}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>Upon completing this reservation enquiry, you will receive:</h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    / <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    / <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>Pick up</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>dropp off</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> car types
            </h5>
          </div>
        </div>
        {/* personal info */}
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input type="text" placeholder="Enter your last name"></input>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input type="tel" placeholder="Enter your phone number"></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input type="number" placeholder="18"></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input type="text" placeholder="Enter your city"></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input type="text" placeholder="Enter your zip code"></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>

            <div className="reserve-button">
              <button>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CarSearch;
