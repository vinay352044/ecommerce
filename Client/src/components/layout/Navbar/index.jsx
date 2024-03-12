import { useState } from "react";
import Button from "../../common/Button";
import "./navbar.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav className="bg-white border-gray-200 dark:bg-[#0295db]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-10">
        <NavLink to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            logo
          </span>
        </NavLink>
        <Button
          handleClick={() => setShow(!show)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </Button>
        <div
          className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium text-lg flex flex-col items-center p-4 md:p-0 mt-4 bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white dark:bg-[#0295db] md:dark:bg-[#0295db]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black dark:text-black" : "text-white"
                  } text-lg block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black dark:text-black" : "text-white"
                  } text-lg block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-black dark:hover:text-black`
                }
              >
                About
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
                Become Seller
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${isActive ? 'border-black text-black bg-transparent' : 'border-transparent bg-white '} px-6 py-1 flex items-center gap-2 text-lg  text-[#0295db] rounded border-[2px] transition-all duration-300 ease-in-out hover:border-[2px] hover:border-white hover:bg-transparent hover:text-white`
                }
              >
                {/* <Button className=""> */}
                <FaRegCircleUser />
                Log In
                {/* </Button> */}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


