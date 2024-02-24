import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div
      className={`w-full py-6 flex justify-between items-center ${styles.paddingX} ${styles.paddingY} `}
    >
      <Link to="/">
      <div className={`${styles.heading2} `}>Rent a ride</div>
      </Link>
      
      <div className="">
        <ul className="flex list-none">
          {navLinks.map((navlink, index) => (
            <li
              key={index}
              className={`${index != navLinks.length - 1 ? "mx-4" : "mx-0"}`}
            >
              <Link
                to={navlink.path}
                className={`text-black  font-poppins font-semibold`}
              >
                {navlink.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
