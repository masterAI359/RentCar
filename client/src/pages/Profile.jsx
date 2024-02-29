import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOut,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser, isError, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  //delete
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

  //signout
  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
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
