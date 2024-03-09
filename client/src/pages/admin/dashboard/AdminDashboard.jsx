import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../redux/user/userSlice";
import { useEffect, useState } from "react";
import { addVehicleClicked } from "../../../redux/adminSlices/actions";

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddVehicle = useSelector(
    (state) => state.addVehicle.isAddVehicleClicked
  );

  const [allVehicles, setVehicles] = useState([]);

  const handleSignout = async () => {
    const res = await fetch("/api/admin/signout", {
      method: "GET",
    });
    const data = await res.json();
    if (data) {
      dispatch(signOut());
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (isAddVehicle) {
      navigate("/adminDashboard/addProduct");
      dispatch(addVehicleClicked(false));
    }
  }, [isAddVehicle, dispatch]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/admin/showVehicles", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <>
      <div>AdminDashboard</div>
      <div>
        <button type="button" onClick={handleSignout} className="text-red-400">
          SignOut
        </button>
      </div>

      <div className="w-[300px]">
        {allVehicles.map((cur) => (
         
          <li key={cur.registeration_number} className="flex justify-between">
            <div>{cur.name}</div>
            <div>{cur.registeration_number}</div>
            <div>{cur.company}</div>
          </li>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
