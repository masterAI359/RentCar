import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setEditData } from "../../../redux/adminSlices/actions";

function AddProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.addVehicle.editData);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicle_id = queryParams.get("vehicle_id");

  //converting image file to base64 format
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (formdata, e) => {
    e.preventDefault();

    try {
      if (editData) {
        const formData = formdata;
        dispatch(setEditData({ _id: vehicle_id, ...formData }));
        await fetch(`/api/admin/editVehicle/${editData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });
        dispatch(setEditData(null));
      } else {
        const file = formdata.image[0];
        const base64 = await convertBase64(file);
        const formData = {
          ...formdata,
          image: base64,
        };

        await fetch("/api/admin/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      reset();
    } catch (error) {
      console.log(error);
    }
    navigate("/adminDashboard");
  };

  const handleClose = () => {
    navigate("/adminDashboard");
    dispatch(setEditData(null));
  };

  return (
    <>
      <button onClick={handleClose}>x</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="registeration_number"
            id="registeration_number"
            {...register("registeration_number")}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="company"
            id="company"
            {...register("company")}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="name"
            id="name"
            {...register("name")}
          />
        </div>

        <div>
          <input type="file" id="image" {...register("image")} />
        </div>

        <button type="submit">{editData ? "Edit" : "Add"}</button>
      </form>
    </>
  );
}

export default AddProductForm;
