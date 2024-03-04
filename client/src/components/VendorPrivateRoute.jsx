import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function VendorPrivateRoute() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  return currentUser && currentUser.isVendor ? (
    <Outlet />
  ) : (
    <Navigate to={"/vendorSignin"} />
  );
}

export default VendorPrivateRoute;
