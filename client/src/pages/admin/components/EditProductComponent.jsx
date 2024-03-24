import { Button } from "@mui/base";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditProductComponent() {
  const { register, handleSubmit, control } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          console.log(data);
        })}
      >
        <div className="bg-white -z-10 max-w-[1000px] mx-auto">
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 4,
                width: "25ch",
                color: "black", // Set text color to black
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Set outline color to black
                },
                '@media (max-width: 640px)': {
                 width:'30ch',
                },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="registeration_number"
                label="registeration_number"
                {...register("registeration_number")}
              />
              <TextField
                required
                id="company"
                label="company"
                {...register("company")}
              />
              <TextField
                required
                id="name"
                label="name"
                {...register("name")}
              />
              <TextField id="model" label="model" {...register("model")} />
              <TextField id="title" label="title" {...register("title")} />
              <TextField
                id="base_package"
                label="base_package"
                {...register("base_package")}
              />
              <TextField
                id="price"
                type="number"
                label="Price"
                {...register("price")}
              />

              <TextField
                required
                id="year_made"
                type="number"
                label="year_made"
                {...register("year_made")}
              />
            </div>

            <div>
              <Controller
                name="carType"
                control={control}
                defaultValue={""} // Set default value to an empty string
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    id="car_type"
                    select
                    label="Car Type"
                    error={Boolean(field.value === "")} // Add error handling for empty value
                  >
                    <MenuItem value="sedan">Sedan</MenuItem>
                    <MenuItem value="suv">SUV</MenuItem>
                    <MenuItem value="hatchback">Hatchback</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                control={control}
                defaultValue={""}
                name="Seats"
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    id="seats"
                    select
                    label="Seats"
                    error={Boolean(field.value === "")}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                  </TextField>
                )}
              ></Controller>

              <Controller
                control={control}
                name="transmitionType"
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    id="transmittion_type"
                    select
                    label="transmittion_type"
                    error={Boolean(field.value == "")}
                  >
                    <MenuItem value={"automatic"}>automatic</MenuItem>
                    <MenuItem value={"manual"}>manual</MenuItem>
                  </TextField>
                )}
              ></Controller>

              <TextField
                id="description"
                label="description"
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  "@media (min-width: 1280px)": {
                    // for large screens (lg)
                    minWidth: 565,
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name="insurance_end_date"
                control={control}
                defaultValue={""} // Set the default value of your date field
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Insurance end Date"
                      inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                      value={field.value || null} // Ensure value is null if empty string or undefined
                      onChange={(date) => field.onChange(date)}
                      textField={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                )}
              />

              <Controller
                control={control}
                name="Registeration_end_date"
                defaultValue={""}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="registeration end Date"
                      inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                      value={field.value || null} // Ensure value is null if empty string or undefined
                      onChange={(date) => field.onChange(date)}
                      textField={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                )}
              ></Controller>

              <Controller
                control={control}
                name="polution_end_date"
                defaultValue={""}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="polution end Date "
                      inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                      value={field.value || null} // Ensure value is null if empty string or undefined
                      onChange={(date) => field.onChange(date)}
                      textField={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                )}
              ></Controller>

              {/* file upload section */}
              <div className="lg:flex gap-4 ml-7">
                <div className="max-w-[300px] sm:max-w-[600px]">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="insurance_image"
                  >
                    Upload insurance image
                  </label>
                  <input
                    className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="insurance_image"
                    type="file"
                    multiple
                    {...register("insurance_image")}
                  />
                </div>

                <div className="max-w-[300px] sm:max-w-[600px]">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="rc_book_image"
                  >
                    Upload rc book image
                  </label>
                  <input
                    className="block w-full p-2  text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="rc_book_image"
                    type="file"
                    multiple
                    {...register("rc_book_image")}
                  />
                </div>
                <div className="max-w-[300px] sm:max-w-[600px]">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="polution_image"
                  >
                    Upload polution image
                  </label>
                  <input
                    className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-900"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    multiple
                    {...register("polution_image")}
                  />
                </div>

                <div className="max-w-[300px] sm:max-w-[600px]">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="image"
                  >
                    Upload vehicle image
                  </label>
                  <input
                    className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-900"
                    aria-describedby="user_avatar_help"
                    id="image"
                    type="file"
                    multiple
                    {...register("image")}
                  />
                </div>
              </div>
            </div>
            <Button type="submit">submit</Button>
          </Box>
        </div>
      </form>
    </div>
  );
}
