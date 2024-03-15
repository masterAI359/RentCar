import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { links } from "../data/SidebarContents.jsx";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux/user/userSlice.jsx";


const SideBar = () => {

  const navigate = useNavigate();
  const dispatch  = useDispatch();

  let activeMenu = useSelector((state)=> state.isActive)
  console.log(activeMenu)
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-slate-100 m-2";


    //SignOut
    const handleSignout = async () => {
      const res = await fetch("/api/admin/signout", {
        method: "GET",
      });
      const data = await res.json();
      if (data) {
        dispatch(signOut());
        navigate("/signin");
      }
    };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to={`/allProduct`}
              onClick={() => {}}
              className="items-center flex gap-3 mt-4 ml-3 text-xl font-extrabold tracking-tight "
            >
              <SiShopware />
              shopy
            </Link>
            <TooltipComponent content={"menu"} position="BottomCenter">
              <button className="text-xl rounded-full p-3 mt-4 block md:hidden hover:bg-gray-50">
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((cur, idx) => (
              <div key={idx}>
                <p className="text-gray-700 m-3 mt-4 uppercase">{cur.title} </p>
                {cur.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={() => {}}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalise">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="flex items-center mt-10 gap-2">
           
            <button type="button" className="ml-4 text-red-400" onClick={handleSignout}>
              SignOut
            </button>
            <CiLogout/>
            </div>
           
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
