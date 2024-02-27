import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";

import styles from ".";
import With_nav from "./components/Layout/With_nav";

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
              <Route path="/contact" element={<contact />} />
            </Route>

            {/* components without Navbar */}
            <Route>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
