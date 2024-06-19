import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import lightLogo from "/public/N.I. Logo croped.png";
import darkLogo from "/public/N.I. Logo croped dark.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navBtn = (
    <ul className="md:flex md:gap-4 lg:gap-10 font-bold uppercase">
      <ActiveLink spy="true" smooth="true" to="/">
        <li>Home </li>
      </ActiveLink>

      <ActiveLink spy="true" smooth="true" to="/projects">
        <li>Projects</li>
      </ActiveLink>

      <ActiveLink spy="true" smooth="true" to="/about">
        <li>About Me</li>
      </ActiveLink>
    </ul>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const logo = theme === "dark" ? lightLogo : darkLogo;

  return (
    <Navbar
      fluid
      className=" rounded-none dark:bg-gradient-to-r from-[#100518] to-[#2c1356]"
    >
      <Link to="/">
        <img
          src={logo}
          alt="ninazmul"
          className={`h-9 sm:h-12 ${
            theme === "dark" ? "dark-class" : "light-class"
          }`}
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="flex md:order-2 gap-4">
        <Button
          className=""
          color="none"
          pill
          onClick={() => dispatch(toggleTheme())}
          rounded
        >
          {theme === "light" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </Button>
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                currentUser.isAdmin ? (
                  <div className="relative">
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                    />
                    <HiBadgeCheck className="absolute bottom-[-10%] right-[-10%] text-blue-500 text-xl" />
                  </div>
                ) : (
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                )
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              {currentUser.isAdmin && (
                <Link to="/dashboard?tab=dash">
                  <Dropdown.Item as="div">Dashboard</Dropdown.Item>
                </Link>
              )}
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button
                  onClick={handleSignout}
                  outline
                  gradientDuoTone="purpleToBlue"
                  className="text-xl font-semibold w-full"
                >
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                className="font-semibold"
                size="sm"
              >
                Sign In
              </Button>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{navBtn}</Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
