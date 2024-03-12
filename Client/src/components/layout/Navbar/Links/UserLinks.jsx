import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const UserLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/buisness/register"
          className={({ isActive }) =>
            `${
              isActive ? "text-black dark:text-black" : "text-white"
            } text-lg block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
          }
        >
          Whishlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/buisness/register"
          className={({ isActive }) =>
            `${
              isActive ? "text-black dark:text-black" : "text-white"
            } text-lg block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
          }
        >
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/buisness/register"
          className={({ isActive }) =>
            `${
              isActive ? "text-black dark:text-black" : "text-white"
            } text-xl block py-2 px-3 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
          }
        >
          <FaUserAlt />
        </NavLink>
      </li>
    </>
  );
};

export default UserLinks;
