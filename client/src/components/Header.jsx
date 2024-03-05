import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div
      className={`w-full py-6 flex justify-between items-center ${styles.paddingX} pt-10  `}
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
        <div>
          <Link to={"/signIn"}>
            {currentUser && !currentUser.isAdmin && !currentUser.isVendor  ? (
              ""
            ) : (
              <button
                id="signin"
                className={`border-[1px] border-green-500 py-1 text-[12px] md:text-[14px] sm:py-[7px] px-2 sm:px-4 font-normal sm:font-semibold rounded-md `}
              >
                Sign In
              </button>
            )}
          </Link>
        </div>
        <div className="flex items-center justify-center">
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
            <Link to={"/signup"}>
              <button id="signup" className={`${styles.button} `}>
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
