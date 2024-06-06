import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-white border-white dark:border-green-200 border-green-900 border-b-2 transition cursor-pointer font-bold"
          : "font-bold text-white"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
