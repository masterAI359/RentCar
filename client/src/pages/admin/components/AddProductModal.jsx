import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicleClicked,
  // setEditData,
} from "../../../redux/adminSlices/actions";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import {
  setModelData,
  setCompanyData,
  setLocationData,
  setDistrictData,
} from "../../../redux/adminSlices/adminDashboardSlice/CarModelDataSlice";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { setWholeData } from "../../../redux/user/selectRideSlice";


export const fetchModelData = async (dispatch) => {
  try {
    const res = await fetch("/api/admin/getVehicleModels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();

      //getting models from data
      const models = data
        .filter((cur) => cur.type === "car")
        .map((cur) => cur.model);
      dispatch(setModelData(models));

      //getting comapnys from data
      const brand = data
        .filter((cur) => cur.type === "car")
        .map((cur) => cur.brand)
      const uniqueBrand = brand.filter((cur, index) => {
        return brand.indexOf(cur) === index;
      });
      dispatch(setCompanyData(uniqueBrand));

      //getting locations from data
      const locations = data
        .filter((cur) => cur.type === "location")
        .map((cur) => cur.location);
      dispatch(setLocationData(locations));

      //getting districts from data
      const districts = data
        .filter((cur) => cur.type === "location")
        .map((cur) => cur.district)
      const uniqueDistricts = districts.filter((cur,idx)=> {
        return districts.indexOf(cur) === idx
      })
      dispatch(setDistrictData(uniqueDistricts));

      //setting whole data
      const wholeData = data.filter(cur => cur.type==="location")
      dispatch(setWholeData(wholeData))
      

    } else {
      return "no data found";
    }
  } catch (error) {
    console.log(error);
  }
};

const AddProductModal = () => {
  
  const { register, handleSubmit, reset, control } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddVehicleClicked } = useSelector((state) => state.addVehicle);
  const { modelData, companyData, locationData, districtData } = useSelector((state) => state.modelDataSlice);
 

  useEffect(() => {
    fetchModelData(dispatch);
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("registeration_number", data.registeration_number);
      formData.append("company", data.company);
      formData.append("image", data.image[0]);
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("title", data.title);
      formData.append("base_package", data.base_package);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("year_made", data.year_made);
      formData.append("fuel_type", data.fuel_type);
      formData.append("seat", data.seat);
      formData.append("transmition_type", data.transmition_type);
      formData.append("insurance_end_date", data.insurance_end_date);
      formData.append("registeration_end_date", data.registeration_end_date);
      formData.append("polution_end_date", data.polution_end_date);
      formData.append("car_type", data.car_type);
      formData.append('location',data.location);
      formData.append('district',data.districts);

      let tostID;
      if (formData) {
        tostID = toast.loading("saving...", { position: "bottom-center" });
      }
      const res = await fetch("/api/admin/addProduct", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("error");
        toast.dismiss(tostID);
      }
      if (res.ok) {
        toast.success("added");
        toast.dismiss(tostID);
      }

      reset();
    } catch (error) {
      console.log(error);
    }
    dispatch(addVehicleClicked(false));
    navigate("/adminDashboard/allProduct");
    
  };

  return (
    <>
      <Toaster />
      {isAddVehicleClicked && (
        <Modal
          show={isAddVehicleClicked}
          onClose={() => dispatch(addVehicleClicked(false))}
          className="w-full backdrop-blur-md     p-20"
        >
          <Modal.Header className=" bg-blue-50 rounded-t-md ">
            Add Vehicle Details
          </Modal.Header>
          <Modal.Body className="bg-blue-100 px-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div>
                  <input
                    className="p-2"
                    type="file"
                    multiple
                    id="image"
                    {...register("image")}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="text"
                    placeholder="registeration_number"
                    id="registeration_number"
                    {...register("registeration_number")}
                  />
                </div>

                <div>
                  <label htmlFor="company">company</label>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <select {...field} id="company" className="p-2">
                        {companyData.map((cur, idx) => (
                          <option value={cur} key={idx}>
                            {cur}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="districts">districts</InputLabel>
                    <Controller
                      name="districts"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} id="districts" className="p-2">
                          {districtData.map((cur, idx) => (
                            <MenuItem value={cur} key={idx}>
                              {cur}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>

                <div>
                  <label htmlFor="location">location</label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <select {...field} id="location" className="p-2">
                        {locationData.map((cur, idx) => (
                          <option value={cur} key={idx}>
                            {cur}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="text"
                    placeholder="name"
                    id="name"
                    {...register("name")}
                  />
                </div>

                <div>
                  <label htmlFor="model">Model</label>
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                      <select {...field} id="model" className="p-2">
                        {modelData.map((cur, idx) => (
                          <option value={cur} key={idx}>
                            {cur}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="text"
                    placeholder="Title"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="text"
                    placeholder="Base package"
                    id="base_package"
                    {...register("base_package")}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="Number"
                    placeholder="Price"
                    id="price"
                    {...register("price")}
                  />
                </div>

                <div>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="Number"
                    placeholder="Year Made"
                    id="year_made"
                    {...register("year_made")}
                  />
                </div>

                <div>
                  <label htmlFor="fuel_type">Fuel type</label>
                  <Controller
                    name="fuel_type"
                    control={control}
                    defaultValue={"petrol"}
                    render={({ field }) => (
                      <select {...field} id="fuel_type" className="p-2">
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Disel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="seats">Number of seats</label>
                  <Controller
                    name="seat"
                    control={control}
                    defaultValue={"5"}
                    render={({ field }) => (
                      <select {...field} id="seats" className="p-2">
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="transmittion_type">Transmission Type</label>
                  <Controller
                    name="transmition_type"
                    control={control}
                    defaultValue={"manual"}
                    render={({ field }) => (
                      <select {...field} id="transmittion_type" className="p-2">
                        <option value="automatic">automatic</option>
                        <option value="manual">manual</option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="car_type">Select car type:</label>
                  <Controller
                    name="car_type"
                    control={control}
                    defaultValue="sedan"
                    render={({ field }) => (
                      <select {...field} id="car_type" className="p-2">
                        <option value="sedan">sedan</option>
                        <option value="suv">suv </option>
                        <option value="hatchback">hatchback </option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <textarea
                    className="mx-auto px-5 py-3 rounded-md"
                    placeholder="Description"
                    id="description"
                    {...register("description")}
                  />
                </div>

                <div>
                  <label htmlFor="insurance_end_date">Insurance end date</label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="Date"
                    placeholder="Insurance End date"
                    id="insurance_end_date"
                    {...register("insurance_end_date")}
                  />
                </div>

                <div>
                  <label htmlFor="registeration_end_date">
                    Registeration end date
                  </label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="Date"
                    placeholder="Registeration End date"
                    id="registeration_end_date"
                    {...register("registeration_end_date")}
                  />
                </div>

                <div>
                  <label htmlFor="polution_end_date">Polution end date</label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="Date"
                    placeholder="Poltion End date"
                    id="polution_end_date"
                    {...register("polution_end_date")}
                  />
                </div>

                <div>
                  <label htmlFor="insurance_image">Insurance Image</label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="file"
                    placeholder="Insurance Image"
                    id="insurance_image"
                    {...register("insurance_image")}
                  />
                </div>

                <div>
                  <label htmlFor="rc_book_image">Rc book Image</label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="file"
                    placeholder="Rc book Image"
                    id="rc_book_image"
                    {...register("rc_book_image")}
                  />
                </div>

                <div>
                  <label htmlFor="polution_image">
                    Polution certificate image
                  </label>
                  <input
                    className="mx-auto px-10 py-3 rounded-md"
                    type="file"
                    id="polution_image"
                    {...register("polution_image")}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <Button
                  onClick={() => dispatch(addVehicleClicked(false))}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  className="bg-blue-700 rounded-md text-white px-3 py-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddProductModal;
