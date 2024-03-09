import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";

function AddProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      reset();
    } catch (error) {
      console.log(error);
    }
    navigate('/adminDashboard')
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
        <button type="submit">add</button>
      </form>
    </>
  );
}

export default AddProductForm;
