import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const UserLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/buisness/register"
          className={({ isActive }) =>
          `${
            isActive ? '' : "text-white"
          } flex items-center gap-2 text-lg py-1 hover:text-black`
        }
        >
          <FaHeart/>
          Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
          `${
            isActive ? '' : "text-white"
          } flex items-center gap-2 text-lg py-1  hover:text-black`
        }
        > 
          <FaShoppingCart />
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
          `${
            isActive ? '' : "text-white"
          } flex items-center gap-2 text-lg py-1 hover:text-black`
        }
        >
          <FaUserAlt />
          Profile
        </NavLink>
      </li>
    </>
  );
};

export default UserLinks;
