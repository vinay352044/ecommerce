import { NavLink } from 'react-router-dom';

const AdminLinks = () => {
    return (
      <>
        <li>
          <NavLink
            to="/admin/create-products"
            className={({ isActive }) =>
            `${
              isActive ? '' : "text-white"
            } text-lg block py-1  md:hover:text-black`
          }
          >
            Add Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/createUser"
            className={({ isActive }) =>
            `${
              isActive ? '' : "text-white"
            } text-lg block py-1 md:hover:text-black`
          }
          >
            Add Users
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/business/register"
            className={({ isActive }) =>
            `${
              isActive ? '' : "text-white"
            } text-lg block py-1 hover:text-black`
          }
          >
            Add Categories
          </NavLink>
        </li> */}
      </>
    );
  };

export default AdminLinks
