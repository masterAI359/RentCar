import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GoPlus } from "react-icons/go";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { setFilter, setfilterData } from "../redux/user/sortfilterSlice";
import { setFilteredData } from "../redux/user/sortfilterSlice";

const Filter = () => {
  const { control, handleSubmit } = useForm();
  const { userAllVehicles } = useSelector((state) => state.userListVehicles);

  const dispatch = useDispatch();
  let transformedData = [];

  const handleData = async (data) => {
    const typeMapping = {
      suv: "car_type",
      sedan: "car_type",
      hatchback: "car_type",
      automatic: "transmition",
      manual: "transmition",
    };

    // Transform the form data object into an array of objects with the desired structure
    transformedData = Object.entries(data)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => value == true)
      .map(([key, value]) => ({ [key]: value, type: typeMapping[key] }));

    if (transformedData && transformedData.length<=0 ) {
      dispatch(setFilteredData(userAllVehicles));
    } else if (transformedData && transformedData.length > 0) {
      try {
        const res = await fetch("api/user/filterVehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        });

        if (res.ok) {
          const data = await res.json();
          const filtData = data.data.filteredVehicles;
          dispatch(setFilteredData(filtData));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white sticky top-5 scroll-m-9">
      <div className="sticky top-0 left-0 right-0  ">
        <div className=" flex h-full w-full lg:max-w-[350px]  flex-col  bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="-mr-2 md:hidden flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* <!-- Filters  form --> */}
          <div className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>

            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex flex-col justify-center  items-start gap-y-4 w-full">
                <form className="w-full" onSubmit={handleSubmit(handleData)}>
                  <div className="w-full mb-7 ">
                    <div className="mb-5 flex justify-between items-center">
                      <div>Type</div>{" "}
                      <div>
                        <GoPlus color="gray" />
                      </div>
                    </div>
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Controller
                              name="suv"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={field["value"] ?? false}
                                />
                              )}
                            />
                          }
                          label="Suv"
                        />
                        <FormControlLabel
                          control={
                            <Controller
                              name="sedan"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={field["value"] ?? false}
                                />
                              )}
                            />
                          }
                          label="Sedan"
                        />
                        <FormControlLabel
                          control={
                            <Controller
                              name="hatchback"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={field["value"] ?? false}
                                />
                              )}
                            />
                          }
                          label="Hatchback"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="w-full border-t border-t-gray-300 pt-7">
                    <div className="mb-5 flex justify-between items-center">
                      <div>Transmission</div>
                      <div>
                        <GoPlus color="gray" />
                      </div>
                    </div>
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Controller
                              name="automatic"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={field["value"] ?? false}
                                />
                              )}
                            />
                          }
                          label="Automatic"
                        />
                        <FormControlLabel
                          control={
                            <Controller
                              name="manual"
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={field["value"] ?? false}
                                />
                              )}
                            />
                          }
                          label="Manual"
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="mt-7 pt-7 border-t border-t-gray-300">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
