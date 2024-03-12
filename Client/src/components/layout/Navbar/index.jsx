import Button from "../../common/Button";
import "./navbar.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-medium">logo</h1>
      <div className="flex justify-between items-center gap-8">
        <ul className="flex gap-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About US</NavLink>
          </li>
          <li>
            <NavLink to="/buisness/register">Become Seller</NavLink>
          </li>
        </ul>
        <div className="flex items-center">
          <FaRegCircleUser />
          <NavLink to='/login'>
            <Button buttonText="LogIn" className="px-3 py-[5px] border-black" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
