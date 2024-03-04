import { useSelector } from "react-redux";
import { Outlet ,Navigate} from "react-router-dom";


function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  //i should make a isUser field or this will become so messy in future
  const isUserOnly = currentUser && !currentUser.isAdmin && !currentUser.isVendor
  return isUserOnly ? <Outlet /> : <Navigate to={'/signin'}/>;
}

export default PrivateRoute;
