import { NavLink } from "react-router-dom";

const CommonLinks = ({ children, linksToRender }) => {
  return (
    <>
      <ul className="font-medium text-base flex flex-col items-center gap-4 md:p-0 md:flex-row">
        {linksToRender.map((element, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={element.slug}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black" : "text-white"
                  } flex items-center gap-2 text-lg py-1 hover:text-black`
                }
              >
                {element.icon}
                {element.label}
              </NavLink>
            </li>
          );
        })}
        {children}
      </ul>
    </>
  );
};

export default CommonLinks;
