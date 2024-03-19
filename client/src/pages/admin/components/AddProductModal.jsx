import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicleClicked,
  setEditData,
} from "../../../redux/adminSlices/actions";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddProductModal = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAddVehicleClicked, editData } = useSelector(
    (state) => state.addVehicle
  );

  //get vehicle id from request
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicle_id = queryParams.get("vehicle_id");

  useEffect(() => {}, [isAddVehicleClicked]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (editData) {
        const formData = data;
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
        const formData = new FormData();

        formData.append("registeration_number", data.registeration_number);
        formData.append("company", data.company);
        formData.append("image", data.image[0]);
        formData.append("name", data.name);

        await fetch("/api/admin/addProduct", {
          method: "POST",
          body: formData,
        });
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
      {isAddVehicleClicked && (
        <Modal
          show={isAddVehicleClicked}
          onClose={() => dispatch(addVehicleClicked(false))}
          className="w-full backdrop-blur-sm    p-20"
        >
          <Modal.Header className="bg-blue-100">
            Add Vehicle Details
          </Modal.Header>
          <Modal.Body className="bg-blue-100">
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
