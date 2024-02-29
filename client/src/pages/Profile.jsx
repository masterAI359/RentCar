import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser, isError, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.succes === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    if (currentUser) {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "applicatoin/json",
        },
        body: JSON.stringify({
          access_token: currentUser.access_token,
        }),
      });
      const data = await res.json();
      console.log(data);
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <div className="flex justify-center items-center gap-20">
        <button className="text-red-400" onClick={handleDelete} type="button">
          {isLoading ? "Loading..." : "Delete User"}
        </button>
        <button className="text-red-400" onClick={handleSignOut} type="button">
          Sign out
        </button>
      </div>
      <div className="text-red-500">{isError ? isError.message : " "}</div>
    </div>
  );
}

export default Profile;
