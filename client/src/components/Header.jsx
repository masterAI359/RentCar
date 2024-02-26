import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div
      className={`w-full py-6 flex justify-between items-center ${styles.paddingX} pt-10  `}
    >
      <Link to="/">
        <div className={` text-[16px] md:text-[28px] ${styles.heading2}`}>
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
          <Link to={'/signIn'}>
          <button id="signIn" className={`${styles.button} `}>
            Sign In
          </button>
          </Link>
        </div>
        <div>
          <Link to={'/signUp'}>
          <button id="signUp" className={`${styles.button} `}>
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
