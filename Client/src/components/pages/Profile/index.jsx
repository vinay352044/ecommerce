import { useDispatch, useSelector } from "react-redux";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import Button from "../../common/Button";
import { AiFillEdit } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import placeholder from "/images/profileImg.gif";
import { NavLink } from "react-router-dom";
import { updateSeller, updateUser } from "../../../utils/axios-instance";
import { setRole } from "../../../redux/actions/roleAction";
import SellerDetails from "./SellerDetails";
import { toast } from "react-toastify";

const Profile = () => {
  const role = useSelector((state) => state.role);
  const [showPass, setShowPass] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [user, setUser] = useState(role.user);
  const [seller, setSeller] = useState(role.seller);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (user !== null) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    if (seller !== null) {
      setSeller({
        ...seller,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (readOnly) {
      setReadOnly(!readOnly);
      return;
    }

    if (user !== null) {
      try {
        await updateUser(user);
        dispatch(setRole("user", user));
        setReadOnly(!readOnly);
        toast.success('Profile Updated !!')
      } catch (error) {
        console.log(error);
      }
    }
    if (seller !== null) {
      try {
        await updateSeller(seller);
        dispatch(setRole("seller", seller));
        setReadOnly(!readOnly);
        toast.success('Profile Updated !!')
      } catch (error) {
        console.log(error);
      }
    }
  };

  const linkClass =
    "w-full border-[1px] border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out basis-[48%]";
  const labelClass =
    "mr-2 font-bold text-3xl text-[#2590db] flex items-center gap-2";
  const inputClass =
    `px-3 py-2 w-[65%] text-xl font-medium border-none bg-transparent focus:outline-none`;
  const infoWrapperClass =
    `flex items-center w-[85%] ${readOnly ? 'border-b-[1px] border-transparent' : 'border-b-[1px] border-[#2590db]'}`;


  return (
    <div className="py-4 px-8 w-full h-[100%]">
      <div className="w-full flex items-center gap-4 shadow-2xl">
        <div className="hidden w-full h-full overflow-hidden rounded-md md:block">
          <img src={placeholder} alt="placeholder" className="w-full h-full" />
        </div>
        <div className="w-full h-full p-6 py-8 flex justify-between flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-700 text-center">
              Welcome {user ? user.name : seller.name} !
            </h1>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col gap-2"
          >
            <div className={infoWrapperClass}>
              <label htmlFor="name" className={labelClass}>
                <FaUser />:
              </label>
              <input
                type="text"
                name="name"
                value={user ? user?.name : seller?.name}
                readOnly={readOnly}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div className={infoWrapperClass}>
              <label htmlFor="email" className={labelClass}>
                <IoIosMail /> :
              </label>
              <input
                type="email"
                name="email"
                value={user ? user?.email : seller?.email}
                readOnly={readOnly}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div className={`${infoWrapperClass} border-none`}>
              <label htmlFor="password" className={labelClass}>
                <RiLockPasswordFill /> :
              </label>
              <div className="flex items-center w-full">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={user ? user?.password : seller?.password}
                  readOnly={true}
                  className={`${inputClass} text-red-600`}
                  required
                />
                {!showPass ? (
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
            {role.seller !== null ? (
              <SellerDetails
                labelClass={labelClass}
                seller={seller}
                handleChange={handleChange}
                readOnly={readOnly}
                className={inputClass}
                infoWrapperClass={infoWrapperClass}
              />
            ) : null}
            <div className="mt-4 mr-auto">
              <Button
                handleClick={handleClick}
                className="px-4 py-2 border-none font-medium flex gap-2 bg-[#0295db] text-white focus:outline-none hover:bg-blue-500"
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
          <div className="mt-6 w-full flex justify-center">
            <div className="w-full flex items-center gap-2 flex-col md:flex-row">
              {user ? (
                <>
                  <NavLink to="/cart" className={linkClass}>
                    <FaShoppingCart />
                    Cart
                  </NavLink>
                  <NavLink to="/wishlist" className={linkClass}>
                    <FaHeart />
                    Wishlist
                  </NavLink>
                  <NavLink to="/orders" className={linkClass}>
                    <FaBoxOpen/>
                    Orders
                  </NavLink>
                </>
              ) : (
                <>
                 <NavLink to='/seller-products' className={linkClass}>
                    Your Products
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
