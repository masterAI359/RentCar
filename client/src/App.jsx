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
import VendorSignin from "./pages/vendor/VendorSignin";
import VendorSignup from "./pages/vendor/VendorSignup";
import VendorPrivateRoute from "./components/VendorPrivateRoute";
import VendorDashboard from "./pages/vendor/VendorDashboard";

//admin
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import Layout from "./pages/admin/layouts/Layout";
import AddProductForm from "./pages/admin/dashboard/AddProductForm";
import AdminDashNew from "./pages/admin/dashboard/AdminDashNew";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
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
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* vendor private routes */}
            <Route element={<VendorPrivateRoute />}>
              <Route path="/vendorDashboard" element={<VendorDashboard />} />
            </Route>

            {/* admin private routes */}

            <Route element={<AdminPrivateRoutes />}>
              <Route element={<Layout />}>

                <Route path="/adminDashboard/*" element={<AdminDashNew />}/>


                <Route
                  path="/adminDashboard/addProduct"
                  element={<AddProductForm />}
                />
                <Route
                  path="/adminDashboard/editProduct"
                  element={<AddProductForm />}
                />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
