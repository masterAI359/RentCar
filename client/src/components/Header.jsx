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
            {currentUser&& !currentUser.isAdmin ?  (
              ""
            ) : (
              <button id="signin" className={`${styles.button}  `}>
                Sign In
              </button>
            )}
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to={"/profile"}>
           
            {currentUser && !currentUser.isAdmin ? (
              <img
                src={`${currentUser.profilePicture}`}
                alt="fsd"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-[50%] object-cover"
              />
            ) : (
              <Link to={'/signup'}>
              <button id="signup" className={`${styles.button} `}>
                Sign Up
              </button>
              </Link>
              
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
