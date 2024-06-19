import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-[#2e1757] dark:text-[#daebff] border-[#2e1757] dark:border-[#daebff] border-b-2 transition cursor-pointer font-bold"
          : "font-bold text-[#2e1757] dark:text-[#daebff]"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
