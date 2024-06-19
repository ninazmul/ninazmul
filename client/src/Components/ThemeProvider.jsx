import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="bg-white text-[#2e1757] dark:text-[#daebff] dark:bg-gradient-to-r from-[#100518] to-[#2c1356] ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
