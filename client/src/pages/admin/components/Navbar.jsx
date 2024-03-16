import { useDispatch, useSelector } from "react-redux";
import { openPages, setScreenSize, showSidebarOrNot, toggleSidebar } from "../../../redux/adminSlices/adminDashboardSlice/DashboardSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { CartHead, Chat, Notification, UserProfile } from ".";
import profiile from "../../../Assets/profile dummy image.png";
import { useEffect } from "react";




const Navbar = () => {
  const dispatch = useDispatch();
  const {cart,chat,notification,userProfile,screenSize} = useSelector((state)=> state.adminDashboardSlice)

  useEffect(()=> {
    const handleResize =()=>  dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize',handleResize)

    handleResize()

    return ()=> window.removeEventListener('resize',handleResize)

  },[])

  useEffect(()=> {
   if(screenSize<=900){
    dispatch(showSidebarOrNot(false))
   }
   else{
    dispatch(showSidebarOrNot(true))
   }
  },[screenSize])

  const NavButton = ({ title, customFunc, icon, color,dotColor }) => (
    <TooltipComponent content={title} position={"BottomCenter"}>
      <button
        type="button"
        onClick={customFunc}
        style={{ color ,dotColor}}
        className="relative text-xl p-3  hover:bg-gray-100  rounded-full mb-2"
      >
        <span className="absolute inline-flex rounded-full top-[3px] left-2 h-2 w-2">
          {icon}
        </span>
      </button>
    </TooltipComponent> 
  );

  return (

   
    <div className="flex justify-between p-2 md:mx-6 relative">

      <div>
      <NavButton
        title="Menu"
        customFunc={() => dispatch(toggleSidebar())}
        color={"blue"}
        icon={<AiOutlineMenu />}
      />
      </div>
     
     

     <div className="flex justify-between">

      <NavButton
        title="Cart"
        customFunc={() => dispatch(openPages('cart'))}
        color={"blue"}
        icon={<FiShoppingCart />}
      />

      <NavButton
        title="Chat"
        customFunc={() => dispatch(openPages('chat'))}
        color={"blue"}
        dotColor={"blue"}
        icon={<BsChatLeft />}
      />

      <NavButton
        title="Notification"
        customFunc={() => dispatch(openPages('notification'))}
        color={"blue"}
        dotColor={"blue"}
        icon={<RiNotification3Line />}
      />
      <TooltipComponent content="profile" position="BottomCenter">
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-lg" onClick={()=>dispatch(openPages('userProfile'))}>
          <img src={profiile} alt="" className="w-4 h-4 rounded-full " />
          <p>
            <span className="text-[12px] text-gray-400">Hi,</span>{" "}
            <span className="text-gray-400 font-semi-bold  text-[12px]">Jeevan</span>
          </p>
          <MdKeyboardArrowDown/>
        </div>
      </TooltipComponent>

      {cart&&<CartHead/>}
      {chat&&<Chat/>}
      {notification&&<Notification/>}
      {userProfile&&<UserProfile/>}
  
      </div>
    </div>
  );
};



export default Navbar;
