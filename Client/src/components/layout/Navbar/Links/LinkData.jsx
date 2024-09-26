import { FaHeadphonesAlt, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

export const publicLinks = [
  {
    label: "Home",
    slug: "/",
    icon: null,
  },
  {
    label: "Become Seller",
    slug: "/business/register",
    icon: <HiHomeModern />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];

export const sellerLinks = [
  {
    label: "Pending Orders",
    slug: "/seller-dashboard/pendingorders",
    icon: null,
  },
  {
    label: "Accepted Orders",
    slug: "/seller-dashboard/acceptedorders",
    icon: null,
  },
  {
    label: "Your Products",
    slug: "/seller-products",
    icon: null,
  },
  {
    label: "Add Products",
    slug: "/seller-create-products",
    icon: null,
  },
  {
    label: "Profile",
    slug: "/seller/profile",
    icon: <FaRegCircleUser />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];

export const adminLinks = [
  {
    label: "Products",
    slug: "/admin",
    icon: null,
  },
  {
    label: "Categories",
    slug: "/admin-categories",
    icon: null,
  },
  {
    label: "Users",
    slug: "/admin-users",
    icon: null,
  },
];

export const userLinks = [
  {
    label: "Home",
    slug: "/",
    icon: null,
  },
  {
    label: "Wishlist",
    slug: "/wishlist",
    icon: <FaHeart />,
  },
  {
    label: "Cart",
    slug: "/cart",
    icon: <FaShoppingCart />,
  },
  {
    label: "Profile",
    slug: "/profile",
    icon: <FaUserAlt />,
  },
  {
    label: "Contact Us",
    slug: "/contact",
    icon: <FaHeadphonesAlt />,
  },
];
