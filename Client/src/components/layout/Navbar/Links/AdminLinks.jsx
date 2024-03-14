import { NavLink } from 'react-router-dom';

const AdminLinks = () => {
    return (
      <>
        <li>
          <NavLink
            to="/admin-createCategories"
            className={({ isActive }) =>
            `${
              isActive ? '' : "text-white"
            } text-lg block py-1  md:hover:text-black`
          }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-users"
            className={({ isActive }) =>
            `${
              isActive ? '' : "text-white"
            } text-lg block py-1 md:hover:text-black`
          }
          >
          Users
          </NavLink>
        </li>
      </>
    );
  };

export default AdminLinks
