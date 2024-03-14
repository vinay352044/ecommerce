import { FaHeadphonesAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CommonLinks = ({ children, handleLogOut }) => {
  const { isAuth, user, seller, admin } = useSelector((state) => state.role);
  return (
    <>
      <ul className="font-medium text-lg flex flex-col items-center md:p-0 md:flex-row md:space-x-8">
        <li>
          <NavLink
            to={admin ? "/admin" : seller ? "/seller-dashboard" : "/"} // seller to change
            className={({ isActive }) =>
              `${
                isActive ? "" : "text-white"
              } text-lg block py-1 hover:text-black`
            }
          >
            Home
          </NavLink>
        </li>
        {admin ? null : (
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive ? "" : "text-white"
                } flex items-center gap-2 text-lg py-1 hover:text-black`
              }
            >
              <FaHeadphonesAlt />
              Contact Us
            </NavLink>
          </li>
        )}
        {isAuth ? (
          children
        ) : (
          <>
            <li>
              <NavLink
                to="/business/register"
                className={({ isActive }) =>
                  `${
                    isActive ? "" : "text-white"
                  } flex items-center gap-2 text-lg py-1 hover:text-black`
                }
              >
                <HiHomeModern />
                Become Seller
              </NavLink>
            </li>
          </>
        )}
        <li>
          {isAuth ? (
            <NavLink
              onClick={(e) => handleLogOut(e)}
              className="border-transparent bg-white px-6 py-1 my-1 flex items-center gap-2 text-lg  text-[#0295db] rounded border-[2px] transition-all duration-300 ease-in-out hover:border-[2px] hover:border-white hover:bg-transparent hover:text-white"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="border-transparent bg-white px-6 py-1 my-1 flex items-center gap-2 text-lg  text-[#0295db] rounded border-[2px] transition-all duration-300 ease-in-out hover:border-[2px] hover:border-white hover:bg-transparent hover:text-white"
            >
              <FaRegCircleUser />
              Log In
            </NavLink>
          )}
        </li>
      </ul>
    </>
  );
};

export default CommonLinks;
