import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {Routes,Route} from 'react-router-dom'

function AdminDashNew() {
  const isActiveMenu = false;

  return (
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
        {isActiveMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg">
            sidebar
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">sidebar</div>
        )}

        <div
          className={`dark:bg-white bg-white min-h-screen w-full ${isActiveMenu ? 'md:ml-72': "flex-2"}`}
        >
          <div className="fixed md:static bg-white  w-full">
            Navbar
          </div>
        </div>

        <Routes>
          <Route path="/allProduct" element="allProducts"></Route>
          <Route path="allUsers" element="allUsers"></Route>
          <Route path="allVendors" element="allVendors"></Route>

        </Routes>
        
      </div>
 
    </div>
  );
}

export default AdminDashNew;
