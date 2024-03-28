import { useSelector } from "react-redux";

import UserProfileSidebar from "../../components/UserProfileSidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import UserProfileContent from "../../components/UserProfileContent";
import Favorites from "./Favorites";

function Profile() {
  const { isError } = useSelector((state) => state.user);

  return (
    <div>
      <div className="text-red-500">{isError ? isError.message : " "}</div>

      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-200 hover:radius text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg">
            <UserProfileSidebar />
          </div>

          <div className={`dark:bg-white bg-white min-h-screen w-full ml-72 `}>
            <div className={`fixed md:static bg-white  w-full   `}></div>

            <div className="main_section mx-8  ">
              <Routes>
                <Route path="/profiles" element={<UserProfileContent />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
