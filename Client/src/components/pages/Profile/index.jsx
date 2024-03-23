import { useDispatch, useSelector } from "react-redux";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { updateSeller, updateUser } from "../../../utils/axios-instance";
import { setRole } from "../../../redux/actions/roleAction";
import { toast } from "react-toastify";
import SellerDetails from "./SellerDetails";
import placeholder from "/images/profileImg.gif";
import ButtonComponent from "../../common/ButtonComponent";
import { setLoader } from "../../../redux/actions/appActions";
import Loader from "../../common/Loader";

const Profile = () => {
  const role = useSelector((state) => state.role);
  const [showPass, setShowPass] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [user, setUser] = useState(role.user);
  const [seller, setSeller] = useState(role.seller);
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.app);

  const scrollToTop = () => {
    window.scrollTo({ top, behavior: "smooth" });
  };

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
        dispatch(setLoader(true));
        const res = await updateUser(user);
        if (res.sucess) {
          dispatch(setRole("user", user));
          toast.success("Profile Updated !!");
          return;
        } else {
          dispatch(setLoader(false));
          toast.error("Something went wrong. Try again later!");
          setUser(role.user);
        }
        setReadOnly(!readOnly);
      } catch (error) {
        toast.error("Something went wrong. Try again later!");
      } finally {
        dispatch(setLoader(false));
        setReadOnly(!readOnly);
      }
    }

    if (seller !== null) {
      try {
        dispatch(setLoader(true));
        const res = await updateSeller(seller);
        if (res.sucess) {
          dispatch(setRole("seller", seller));
          toast.success("Profile Updated !!");
        } else {
          dispatch(setLoader(false));
          toast.error("Something went wrong. Try again later!");
          setSeller(role.seller);
        }
        setReadOnly(!readOnly);
      } catch (error) {
        toast.error("Something went wrong. Try again later!");
      } finally {
        dispatch(setLoader(false));
        setReadOnly(!readOnly);
      }
    }
    setShowPass(false);
  };

  const linkClass =
    "size-[4rem] text-white flex flex-col items-center justify-center font-medium text-[.95rem] transition-all duration-250 ease-in-out bg-[#2590db] rounded";
  const labelClass =
    "mr-2 font-bold text-2xl md:text-3xl text-[#2590db] flex items-center gap-2";
  const inputClass = `p-1 w-full text-lg md:text-xl font-medium border-none bg-transparent focus:outline-none`;
  const infoWrapperClass = `flex px-2 py-1 rounded-md items-center w-full ${
    readOnly
      ? "border-[2px] border-transparent"
      : "border-[2px] border-[#2590db] focus:border-black"
  }`;

  return (
    <>
      {loader && <Loader />}
      <div className="py-4 px-4 md:px-8 w-full h-[85vh] flex items-center">
        <div className="w-full h-fit flex items-center gap-4 ">
          <div className="hidden w-full h-full overflow-hidden rounded-md md:block">
            <img
              src={placeholder}
              alt="placeholder"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-full px-2 md:p-6 py-8 flex flex-col gap-4">
            <div>
              <h1 className=" text-2xl md:text-3xl px-2 font-semibold text-slate-700 text-center md:text-left">
                Welcome {user ? role?.user?.name : role?.seller?.name} !
              </h1>
            </div>
            <div className="w-full flex justify-center md:hidden">
              <div className="w-full flex items-center justify-center gap-5">
                {user ? (
                  <>
                    <NavLink
                      to="/cart"
                      className={linkClass}
                      onClick={scrollToTop}
                    >
                      <FaShoppingCart />
                      Cart
                    </NavLink>
                    <NavLink
                      to="/wishlist"
                      className={linkClass}
                      onClick={scrollToTop}
                    >
                      <FaHeart />
                      Wishlist
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className={linkClass}
                      onClick={scrollToTop}
                    >
                      <FaBoxOpen />
                      Orders
                    </NavLink>
                  </>
                ) : null}
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full flex flex-col gap-2"
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
              <div
                className={`${infoWrapperClass} ${
                  readOnly ? "" : "bg-gray-200 border-[#2590db]"
                }`}
              >
                <label htmlFor="password" className={labelClass}>
                  <RiLockPasswordFill /> :
                </label>
                <div className="flex items-center w-full">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={user ? user?.password : seller?.password}
                    readOnly={true}
                    className={`${inputClass} w-[70%]`}
                    required
                  />
                  {readOnly ? null : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
              {console.log(readOnly)}
              {role.seller !== null ? (
                <SellerDetails
                  seller={seller}
                  handleChange={handleChange}
                  readOnly={readOnly}
                  infoWrapperClass={infoWrapperClass}
                />
              ) : null}
              <div className="w-full flex gap-4">
                <ButtonComponent
                  handleClick={handleClick}
                  buttonStyle="flex gap-2 text-[white!important] mt-[0!important] hover:text-[#2590db!important] focus:outline-none"
                >
                  {readOnly ? "Edit" : "Update"}
                </ButtonComponent>
                {readOnly ? null : (
                  <ButtonComponent
                    handleClick={() => setReadOnly(!readOnly)}
                    buttonStyle="flex gap-2 text-[white!important] mt-[0!important] hover:text-[#2590db!important] focus:outline-none"
                  >
                    Cancel
                  </ButtonComponent>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
