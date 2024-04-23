import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import SignUp from "./pages/user/SignUp";
import SignIn from "./pages/user/SignIn";
import Vehicles from "./pages/user/Vehicles";
import Profile from "./pages/user/Profile";
import With_nav from "./components/Layout/WithNav";
import PrivateRoute from "./components/PrivateRoute";
import { PrivateSignin } from "./components/PrivateRoute";

import AdminPrivateRoutes from "./components/AdminPrivateRoutes";
import Enterprise from "./pages/user/Enterprise";
import Contact from "./pages/user/Contact";
import VendorSignin from "./pages/vendor/pages/VendorSignin";
import VendorSignup from "./pages/vendor/pages/VendorSignup";
import VendorPrivateRoute from "./components/VendorPrivateRoute";
import VendorDashboard from "./pages/vendor/Dashboard/VendorDashboard";

import Layout from "./pages/admin/layouts/Layout";
// import AddProductForm from "./pages/admin/dashboard/AddProductForm";
import AdminDashNew from "./pages/admin/dashboard/AdminDashNew";
import VehicleDetails from "./pages/user/VehicleDetails";
import EditProductComponent from "./pages/admin/components/EditProductComponent";
import Orders from "./pages/user/Orders";
import AvailableVehicles from "./pages/user/AvailableVehiclesAfterSearch";
import VendorEditProductComponent from "./pages/vendor/Components/VendorEditProductComponent";
import VendorDeleteVehicleModal from "./pages/vendor/Components/VendorDeleteVehicleModal";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <ThemeProvider theme={theme}> */}
        <Routes>
          {/* components with Navbar */}
          <Route element={<With_nav />}>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* components without Navbar */}
          <Route>
            {/* Signin not accesible if logedin */}
            <Route element={<PrivateSignin />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/vendorSignin" element={<VendorSignin />} />
              <Route path="/vendorSignup" element={<VendorSignup />} />
            </Route>
          </Route>

          {/* user private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/vehicleDetails" element={<VehicleDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/availableVehicles" element={<AvailableVehicles/>}/>
          </Route>

          {/* vendor private routes */}
          <Route element={<VendorPrivateRoute />}>
            <Route path="/vendorDashboard/*" element={<VendorDashboard />} />
            <Route
                path="/vendorDashboard/vendorEditProductComponent"
                element={<VendorEditProductComponent />}
              />
            <Route    path="/vendorDashboard/vendorDeleteVehicleModal" element={<VendorDeleteVehicleModal/>} />
          </Route>

          {/* admin private routes */}

          <Route element={<AdminPrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/adminDashboard/*" element={<AdminDashNew />} />

              <Route
                path="/adminDashboard/editProducts"
                element={<EditProductComponent />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
