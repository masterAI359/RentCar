import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdMenuOpen } from "react-icons/md";
import { useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [nav, setNav] = useState(false);

  return (
    <div
      className={`w-full   flex justify-between items-center px-6 sm:px-12 md:px-18 lg:py-6 lg:px-28 pt-10 mt-5 md:mt-10 sm:max-w-[900px] lg:max-w-[1500px] mx-auto `}
    >
      <Link to="/">
        <div
          className={` text-[16px] md:text-[18px] lg:text-[20px] font-poppins font-bold`}
        >
          Rent a Ride
        </div>
      </Link>

      <div className="hidden lg:block">
        <ul className="flex list-none">
          {navLinks.map((navlink, index) => (
            <li
              key={index}
              className={`${index != navLinks.length - 1 ? "mx-4" : "mx-0"}`}
            >
              <Link
                to={navlink.path}
                className={`text-black  font-poppins cursor-pointer font-semibold`}
              >
                {navlink.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <div className="hidden md:inline-flex">
          <Link to={"/signIn"}>
            {currentUser && !currentUser.isAdmin && !currentUser.isVendor ? (
              ""
            ) : (
              <button
                id="signin"
                className={`border-[1px] hidden lg:inline-flex border-green-500 py-1 text-[12px] md:text-[14px] sm:py-[7px] px-2 sm:px-4 font-normal sm:font-semibold rounded-md `}
              >
                Sign In
              </button>
            )}
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          {currentUser && !currentUser.isAdmin && !currentUser.isVendor ? (
            <Link to={"/profile"}>
              <img
                src={`${currentUser.profilePicture}`}
                alt="fsd"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-[50%] object-cover"
              />
            </Link>
          ) : (
            <div className="hidden lg:inline-flex">
              <Link to={"/signup"}>
                <button id="signup" className={`${styles.button} `}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/*  Mobile Menu */}
        <div className="relative lg:hidden flex justify-center items-center">
          <button onClick={() => setNav(!nav)}>
            <div>{nav ? <MdMenuOpen /> : <RxHamburgerMenu />}</div>
          </button>
          {nav && (
            <div>
              <div className="absolute top-6 z-10 right-0  ">
                <Link to={"/signIn"}>
                  {currentUser &&
                  !currentUser.isAdmin &&
                  !currentUser.isVendor ? (
                    ""
                  ) : (
                    <button
                      id="signin"
                      className={`border-[1px] w-[80px]  border-green-500 bg-green-500  py-1 text-[10px]   px-2  font-normal sm:font-semibold  `}
                    >
                      Sign In
                    </button>
                  )}
                </Link>
              </div>
              <ul className="flex flex-col  gap-y-1   items-center justify-start  absolute top-[52px] right-0  overflow-hidden z-20 md:z-10  list-none max-w-20  ">
                {navLinks.map((navlink, index) => (
                  <li key={index} className="rounded-lg px-10">
                    {index != 3 && (
                      <Link
                        to={navlink.path}
                        className={`text-white bg-black text-[8px]   rounded-lg px-10 py-2  font-poppins cursor-pointer font-semibold  text-center `}
                        onClick={() => setNav(false)}
                      >
                        {navlink.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div>
                {currentUser &&
                !currentUser.isAdmin &&
                !currentUser.isVendor ? (
                  <Link to={"/profile"}>
                    <div className="text-white z-20  absolute top-[110px] right-0 text-[9px] hover:text-red-200 px-[26px] py-[5px] rounded-sm bg-black">
                      Profile
                    </div>
                  </Link>
                ) : (
                  <div className="hidden lg:inline-flex">
                    <Link to={"/signup"}>
                      <button id="signup" className={`${styles.button} `}>
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
