import { useState } from "react";
import Button from "../../common/Button";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/png/logo-no-background.png";
import { useDispatch, useSelector } from "react-redux";
import { removeRole } from "../../../redux/actions/roleAction";
import { toast } from "react-toastify";
import Links from "./Links/Links";
import {
  adminLinks,
  publicLinks,
  sellerLinks,
  userLinks,
} from "./Links/LinkData";

const Navbar = () => {
  const { isAuth, user, seller, admin } = useSelector((state) => state.role);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(removeRole());
    toast.success("Logout Successful !!");
    navigate("/");
  };

  return (
    <nav className="bg-[#0295db] sticky top-0 left-0 z-50 ">
      <div className="flex flex-wrap items-center justify-between mx-auto py-2 px-6 md:px-8">
        <NavLink
          to={
            admin ? "/admin" : seller ? "/seller-dashboard/pendingorders" : "/"
          }
          className="flex items-center space-x-3"
        >
          <div className="w-[110px]">
            <img src={logo} alt="logo" className="w-full" />
          </div>
        </NavLink>
        <Button
          handleClick={() => setShow(!show)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center w-5 h-5 justify-center rounded-sm md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-full h-full text-white hover:text-black"
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
          <Links
            linksToRender={
              user
                ? userLinks
                : seller
                ? sellerLinks
                : admin
                ? adminLinks
                : publicLinks
            }
          >
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
          </Links>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
