import { NavLink } from "react-router-dom";

const SellerLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/buisness/register"
          className={({ isActive }) =>
          `${
            isActive ? '' : "text-white"
          } text-lg block py-1 hover:text-black`
        }
        >
          yet to add
        </NavLink>
      </li>
    </>
  );
};

export default SellerLinks;
