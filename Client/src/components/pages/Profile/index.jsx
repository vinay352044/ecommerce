import { useSelector } from "react-redux";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import Button from "../../common/Button";
import { AiFillEdit } from "react-icons/ai";
import placeholder from "/images/profileImg.jpg";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const role = useSelector((state) => state.role);
  const [showPass, setShowPass] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [user, setUser] = useState(role.user);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (readOnly) {
      setReadOnly(!readOnly);
      return;
    }
    // code to patch updated fields
    console.log("updating...");
  };

  return (
    <div className="py-4 px-8 w-full h-fit border-[3px] border-red-500">
      <div className="w-full flex items-center gap-4">
        <div className="w-full overflow-hidden rounded-md">
          <img src={placeholder} alt="placeholder" className="w-full h-full" />
        </div>
        <div className="w-full h-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto flex flex-col gap-2"
          >
            <div className="flex items-center">
              <label htmlFor="name" className="mb-1">
                Name :
              </label>
              <input
                type="text"
                name="name"
                value={user?.name}
                readOnly={readOnly}
                onChange={handleChange}
                className="px-3 py-2 border-none rounded-lg bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="email" className="mb-1">
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly={readOnly}
                onChange={handleChange}
                className="px-3 py-2 border-none rounded-lg bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="password" className="mb-1">
                Password :
              </label>
              <div className="flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={user?.password}
                  readOnly={true}
                  className="px-3 py-2 border-none rounded-lg bg-transparent focus:outline-none focus:border-blue-500 mr-2 flex-grow"
                />
                {showPass ? (
                  <GoEye
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <GoEyeClosed
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <Button
                handleClick={handleClick}
                className="px-4 py-2 border-none font-medium flex items-center gap-2 bg-[#0295db] text-white rounded-md focus:outline-none hover:bg-blue-600"
              >
                {readOnly ? (
                  <>
                    Edit Profile
                    <AiFillEdit className="text-xl" />
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
          <div className="mt-6 w-full flex flex-col gap-4">
          <div className="flex items-center gap-4">
          <NavLink
              to="/cart"
              className="w-full border-[1px] border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out "
            >
              <FaShoppingCart />
              Cart
            </NavLink>
            <NavLink
              to="/cart"
              className="w-full border-[1px] border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out "
            >
              <FaBoxOpen />
              Orders
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
          <NavLink
              to="/cart"
              className="w-full border-[1px] border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out "
            >
              <FaShoppingCart />
              Cart
            </NavLink>
            <NavLink
              to="/cart"
              className="w-full border-[1px] border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out "
            >
              <FaBoxOpen />
              Orders
            </NavLink>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
