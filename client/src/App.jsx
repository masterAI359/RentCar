import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import styles from ".";
import With_nav from "./components/Layout/With_nav";
import PrivateRoute from "./components/PrivateRoute";
import { PrivateSignin } from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrivateRoutes from "./components/AdminPrivateRoutes";
import Enterprise from "./pages/Enterprise";
import Contact from "./pages/Contact";
import VendorSignin from "./pages/vendor/VendorSignin";
import VendorSignup from "./pages/vendor/VendorSignup";
import VendorPrivateRoute from "./components/VendorPrivateRoute";
import VendorDashboard from "./pages/vendor/VendorDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className={`${styles.paddingX}  `}>
          <Routes>
            {/* components with Navbar */}
            <Route element={<With_nav />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
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
              <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
