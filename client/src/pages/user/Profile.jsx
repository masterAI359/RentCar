import { useSelector } from "react-redux";

import UserProfileSidebar from "../../components/UserProfileSidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { Link, Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import UserProfileContent from "../../components/UserProfileContent";
import Favorites from "./Favorites";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Profile() {
  const { isError } = useSelector((state) => state.user);

  return (
    <div>
      <div className="text-red-500">{isError ? isError.message : " "}</div>
      <div className="fixed top-4 right-5 md:right-10 z-10">
                 <TooltipComponent content={"back"} position="BottomCenter">
                      <Link to={'/'} ><IoArrowBackCircleSharp style={{fontSize:'40', hover:"fill-red-700"}} className="hover:fill-blue-500"/></Link>
                      </TooltipComponent>
                    
                </div>

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
                <Route path="/" element={<UserProfileContent />} />
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
