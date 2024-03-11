import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setEditData } from "../../../redux/adminSlices/actions";

function AddProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.addVehicle.editData);
  console.log(editData)

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const vehicle_id = queryParams.get('vehicle_id');
  


  const onSubmit = async (formData, e) => {
    e.preventDefault();
    try {
      if (editData) {
        dispatch(setEditData({ _id:vehicle_id,...formData }));
        await fetch(`/api/admin/editVehicle/${editData._id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ formData }),
        })
        
      } else {
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

  return (
    <>
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
        <button type="submit">{editData ? 'Edit' : 'Add'}</button>
      </form>
    </>
  );
}

export default AddProductForm;
