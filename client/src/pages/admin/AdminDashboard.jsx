import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";


function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleCreate = async ()=> {
    
    
  }
  return (
    <>
      <div>AdminDashboard</div>
      <div>
        <button type="button" onClick={handleSignout} className="text-red-400">
          SignOut
        </button>
        <button type="button" onClick={handleCreate}>
          create
        </button>
      </div>
    </>
  );
}

export default AdminDashboard;
