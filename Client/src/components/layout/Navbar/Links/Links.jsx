import { NavLink } from "react-router-dom";

const Links = ({ children, linksToRender , toggleNavbar }) => {
  return (
    <>
      <ul className="font-medium text-base flex flex-col items-center gap-3 md:p-0 md:flex-row">
        {linksToRender.map((element, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={element.slug}
                onClick={() => toggleNavbar()}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black" : "text-white"
                  } flex items-center gap-1 text-[1.1rem] py-1 hover:text-black`
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

export default Links;
